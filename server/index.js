import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = Number(process.env.PORT) || 3001;
const directory = path.dirname(fileURLToPath(import.meta.url));

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
