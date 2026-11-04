# Siva Prasad Gogisetty — Portfolio

A React, Vite, and Node.js/Express portfolio for GSPD Creative Studio. It
uses Tailwind CSS 4 for utility styling and Framer Motion for reduced-motion-
aware interaction and scroll effects. It includes service and project sections,
an accessible work carousel, a keyboard-operable FAQ, social links, and project
links to [Gmark.agency](https://gmark.agency). There is no contact form; visitors
can also email or message Siva directly.

## Run locally

```powershell
npm.cmd install
npm.cmd run dev
```

Open the Vite URL printed in the terminal. The development server proxies API
requests to Express on port 3001.

## Production

```powershell
npm.cmd run build
npm.cmd start
```

The Express server serves the built website and portfolio content API at
`http://localhost:3001`.

## Deploy to Render

The included `render.yaml` configures the Node.js service and health check.
Connect the repository in Render as a Blueprint and deploy. No email service
credentials are required. The Render build enables the portfolio API.

The current `sivaprasad.space` domain is served by Vercel. Its production build
uses the saved portfolio content, while local development and Render can load
the Express API. The canonical URL and social-sharing metadata use
`https://www.sivaprasad.space/`, which is the domain's current redirect target.

## Deploy a static build

To host on static web hosting, disable the Express content API before building;
the React app will use its saved portfolio content:

```powershell
$env:VITE_PORTFOLIO_API_ENABLED = "false"
npm.cmd run build
Remove-Item Env:VITE_PORTFOLIO_API_ENABLED
```

Upload the contents of `dist` to the hosting provider's web root. The social
preview image is `public/social-preview.svg`.

## Customize

Update the portfolio content returned from `GET /api/portfolio` in
`server/index.js`. Update the matching saved preview in `src/App.jsx` if the
API is disabled for a static deployment. The title, description, and social
sharing metadata are in `index.html`.
