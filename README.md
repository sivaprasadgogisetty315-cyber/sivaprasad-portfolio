# Siva Prasad Gogisetty — Portfolio

A creative portfolio built with React, Vite, and a Node.js/Express API.
Framer Motion powers the UI transitions, scroll progress indicator, and project
filter animations. The cartoon sidekick is interactive, and the portfolio uses
animated scroll reveals, glassmorphism details, and reduced-motion support.
The GSPD-branded portfolio also includes category-aware project filtering and
an accessible horizontal project slider with previous/next controls.

The contact area includes GitHub, WhatsApp, and LinkedIn links plus a service
inquiry form for video editing, video and product shoots, website development, social
media campaigns, Facebook and Instagram ads, and Google Ads. Service cards
preselect the inquiry form. The selected-work section can be filtered by
category, and visitors can copy the contact email. Contact form submissions
are sent through EmailJS to the recipient configured in the EmailJS template.

## Run locally

```powershell
npm.cmd install
npm.cmd run dev
```

Before testing the contact form, create `.env` from the example:

```powershell
Copy-Item .env.example .env
```

Set `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and
`VITE_EMAILJS_PUBLIC_KEY` to the values from your EmailJS account. In the
EmailJS template, set the recipient to `sivaprasadgogisetty315@gmail.com` and
use these template variables: `{{name}}`, `{{email}}`, `{{service}}`, and
`{{message}}`. Set Reply-To to `{{reply_to}}` so you can reply to the visitor.

The form sends name, email, service, and project details as `message`; it has
no phone field. Required fields and email format are validated in the browser.
Keep `.env` private; it is excluded from version control. Vite embeds variables
prefixed with `VITE_` into the built website, so these EmailJS values are
visible to visitors. The EmailJS public key is intended for browser use; never
put your Gmail password, an EmailJS private key, or other server secrets in a
`VITE_` variable. Restrict the EmailJS service to your website domain and
configure the recipient in the EmailJS template.

Open the Vite URL printed in the terminal. The development server proxies `/api` requests to Express on port 3001.

## Deploy a static site to Hostinger

The portfolio can be hosted as a static Vite build on Hostinger web hosting.
The form sends through EmailJS, and the portfolio has saved fallback content,
so a Node.js server is not required for this deployment. Build with the API
disabled to avoid requesting the Express-only `/api/portfolio` endpoint:

```powershell
$env:VITE_PORTFOLIO_API_ENABLED = "false"
npm.cmd run build
Remove-Item Env:VITE_PORTFOLIO_API_ENABLED
```

The EmailJS `VITE_EMAILJS_*` values must be present in `.env` when you build.
In Hostinger hPanel, open File Manager for the domain and upload the **contents**
of `dist` into `public_html` so that `public_html/index.html` exists. If using
FTP, upload the same `dist` contents to the domain's document root. Make sure
the domain is assigned to that hosting website and its DNS points to Hostinger.

## Production

```powershell
npm.cmd run build
npm.cmd start
```

The Express server serves the built website and the portfolio API at `http://localhost:3001`.
For deployment, set the three `VITE_EMAILJS_*` variables in the hosting
provider's build environment and rebuild/redeploy the site after changing them.
The existing server-side `/api/contact` endpoint has separate Gmail settings:
`GMAIL_USER`, `GMAIL_APP_PASSWORD`, and optionally `CONTACT_EMAIL`. These are
not used by the EmailJS-powered form. Keep any Gmail App Password server-side
only; never put it in a `VITE_` variable.

## Deploy on Render

The included `render.yaml` configures the Node.js web service, production build,
and health check. Push this repository to GitHub, then in
Render choose **New → Blueprint** and connect the repository. During setup,
set the three `VITE_EMAILJS_*` variables in the service's environment before
building. Never commit `.env` or put an EmailJS private key or Gmail password
in a `VITE_` variable.
After the deploy completes, use the `onrender.com` URL shown in the Render
dashboard to open the live site.

## Customize

Update the portfolio content returned from `GET /api/portfolio` in `server/index.js`. The React app includes a matching preview in `src/App.jsx` for when the API is unavailable.
