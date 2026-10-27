import express from "express";
import nodemailer from "nodemailer";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = Number(process.env.PORT) || 3001;
const directory = path.dirname(fileURLToPath(import.meta.url));
const contactEmail = process.env.CONTACT_EMAIL || "sivaprasadgogisetty315@gmail.com";
const gmailUser = process.env.GMAIL_USER || contactEmail;
const gmailTransport = gmailUser && process.env.GMAIL_APP_PASSWORD
  ? nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: process.env.GMAIL_APP_PASSWORD.replace(/\s/g, ""),
      },
    })
  : null;
const contactRateLimits = new Map();
const contactRateLimitWindow = 15 * 60 * 1000;
const maxContactSubmissions = 5;

const allowedServices = new Set([
  "Video editing",
  "Video shoot",
  "Product shoot",
  "Website development",
  "Social media campaigns",
  "Facebook & Instagram ads",
  "Google Ads",
  "Multiple services",
  "Other project",
]);

app.use(express.json({ limit: "10kb" }));

app.post("/api/contact", (request, response, next) => {
  const now = Date.now();
  const clientIp = request.ip;
  const previous = contactRateLimits.get(clientIp);
  const current = previous && previous.expiresAt > now
    ? previous
    : { count: 0, expiresAt: now + contactRateLimitWindow };

  if (current.count >= maxContactSubmissions) {
    response.status(429).json({
      error: "Too many inquiries were sent. Please wait a little and try again.",
    });
    return;
  }

  current.count += 1;
  contactRateLimits.set(clientIp, current);
  if (contactRateLimits.size > 10000) {
    for (const [ip, limit] of contactRateLimits) {
      if (limit.expiresAt <= now) contactRateLimits.delete(ip);
    }
  }

  next();
}, async (request, response) => {
  const { name, email, service, details } = request.body ?? {};
  const trimmedName = typeof name === "string" ? name.trim() : "";
  const trimmedEmail = typeof email === "string" ? email.trim() : "";
  const trimmedService = typeof service === "string" ? service.trim() : "";
  const trimmedDetails = typeof details === "string" ? details.trim() : "";

  if (
    trimmedName.length < 2 ||
    trimmedName.length > 100 ||
    trimmedEmail.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail) ||
    !allowedServices.has(trimmedService) ||
    trimmedDetails.length < 10 ||
    trimmedDetails.length > 5000
  ) {
    response.status(400).json({
      error: "Please check your details and try submitting the form again.",
    });
    return;
  }

  if (!gmailTransport || !contactEmail) {
    response.status(503).json({
      error: "Email delivery is not configured yet. Please email directly instead.",
    });
    return;
  }

  try {
    await gmailTransport.sendMail({
      from: { name: "GSPD Portfolio", address: gmailUser },
      to: contactEmail,
      replyTo: { name: trimmedName, address: trimmedEmail },
      subject: `New portfolio inquiry: ${trimmedService}`,
      text: [
        "You received a new inquiry from your portfolio.",
        "",
        `Name: ${trimmedName}`,
        `Email: ${trimmedEmail}`,
        `Service: ${trimmedService}`,
        "",
        "Project details:",
        trimmedDetails,
      ].join("\n"),
    });
    response.status(200).json({ message: "Your inquiry was sent successfully." });
  } catch (error) {
    console.error("Could not send portfolio inquiry:", error);
    response.status(502).json({
      error: "The email could not be sent right now. Please email directly instead.",
    });
  }
});

app.get("/api/portfolio", (_request, response) => {
  response.json({
    name: "Siva Prasad Gogisetty",
    firstName: "Siva",
    role: "AI web developer & video editor",
    email: "sivaprasadgogisetty315@gmail.com",
    introduction:
      "I bring ideas to life on screen — building for the web and shaping stories through video.",
    skills: [
      "AI-assisted web development",
      "Frontend development",
      "Creative coding",
      "Video editing",
      "Visual storytelling",
      "Motion & transitions",
    ],
    projects: [
      {
        number: "01",
        title: "AI web concepts",
        category: "WEB DEVELOPMENT",
        description:
          "Fresh digital experiences, thoughtfully designed and built with AI in the creative toolkit.",
        color: "lilac",
        visual: "web",
      },
      {
        number: "02",
        title: "Stories in motion",
        category: "VIDEO EDITING",
        description:
          "A space for expressive edits, intentional pacing, and the little details that make a story land.",
        color: "peach",
        visual: "video",
      },
      {
        number: "03",
        title: "A little bit of Siva",
        category: "PERSONAL PROJECT",
        description:
          "This portfolio: one place for the ideas, experiments, and creative work I'm growing.",
        color: "lime",
        visual: "portfolio",
      },
    ],
  });
});

app.use(express.static(path.resolve(directory, "../dist")));

app.get("/{*splat}", (_request, response, next) => {
  response.sendFile(path.resolve(directory, "../dist/index.html"), (error) => {
    if (error) next();
  });
});

app.listen(port, () => {
  console.log(`Portfolio server running at http://localhost:${port}`);
});
