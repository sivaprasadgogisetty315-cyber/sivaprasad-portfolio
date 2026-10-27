# Siva Prasad Gogisetty — Portfolio

A creative portfolio built with React, Vite, and a Node.js/Express API.
Framer Motion powers the UI transitions, scroll progress indicator, and project
filter animations. The cartoon sidekick is interactive, and the portfolio uses
animated scroll reveals, glassmorphism details, and reduced-motion support.
The GSPD-branded portfolio also includes category-aware project filtering and
an accessible horizontal project slider with previous/next controls.

The contact area includes WhatsApp and LinkedIn links plus a service inquiry
form for video editing, video and product shoots, website development, social
media campaigns, Facebook and Instagram ads, and Google Ads. Service cards
preselect the inquiry form. The selected-work section can be filtered by
category, and visitors can copy the contact email. Contact form submissions
are sent to the configured Gmail inbox by the Express API.

## Run locally

```powershell
npm.cmd install
npm.cmd run dev
```

Before testing email, create `.env` from the example:

```powershell
Copy-Item .env.example .env
```

Set `GMAIL_APP_PASSWORD` to a Google App Password for the Gmail account. Keep
`.env` private; it is excluded from version control. Google requires
2-Step Verification before an App Password can be created. Use the same Gmail
address for `GMAIL_USER` and `CONTACT_EMAIL`, or set `CONTACT_EMAIL` to another
inbox where inquiries should arrive. Do not use your regular Gmail password.

Open the Vite URL printed in the terminal. The development server proxies `/api` requests to Express on port 3001.

## Production

```powershell
npm.cmd run build
npm.cmd start
```

The Express server serves the built website and the portfolio API at `http://localhost:3001`.
Set `GMAIL_USER`, `GMAIL_APP_PASSWORD`, and optionally `CONTACT_EMAIL` in the
production environment before deploying to enable email delivery.

## Deploy on Render

The included `render.yaml` configures the Node.js web service, production build,
health check, and Gmail recipient. Push this repository to GitHub, then in
Render choose **New → Blueprint** and connect the repository. During setup,
enter a Google App Password for `GMAIL_APP_PASSWORD` in Render's environment
secrets. Never commit the `.env` file or paste the App Password into GitHub.
After the deploy completes, use the `onrender.com` URL shown in the Render
dashboard to open the live site.

## Customize

Update the portfolio content returned from `GET /api/portfolio` in `server/index.js`. The React app includes a matching preview in `src/App.jsx` for when the API is unavailable.
