# Chart-Auditing-Frontend with Next JS 20+, and TypeScript 

<p align="center">
  <a href="https://creativedesignsguru.com/demo/nextjs-landing-page/"><img src="public/assets/images/nextjs-landing-page-banner.png?raw=true" alt="Next js starter banner"></a>
</p>

This project delivers a fully automated, end-to-end clinical documentation compliance system that transforms low-quality provider dictations (“shitty notes”) into fully compliant, audit-ready, CMS-safe, FDA-safe, LCD L36377-compliant medical records (“sexy notes”).
The system analyzes raw medical text, fills in required clinical details, enforces federal regulatory rules, calculates graft wastage, and generates a legally defensible EMR note and billing packet.

The solution consists of multiple AWS-hosted microservices backed by a central PostgreSQL database. It integrates with Google Cloud Healthcare NLP for clinical entity extraction, Keycloak + JWT for authentication, and our custom-built engines (LCD, CMS, WISER, FDA, JW, Enhancement Engine) for compliance intelligence.




### Included Components

- chart-header
- Autofill-banner
- Form-badge
- Form-button
- Form-input
- Form-number-input
- Form-search-select
- Form-select
- Product-usage-bar
- risk-guage
- structurted-info-card
- wounding-sparkline

Find more components in our [Project](https://github.com/Grelinhealth20/chart-auditing-frontend).

### Philosophy

- Minimal code
- SEO-friendly
- 🚀 Production-ready

### Requirements

- Node.js and npm

### Getting started

Run the following command on your local environment (for example, in [Warp](https://go.warp.dev/nextjs-bp)):

```
git clone --depth=1 https://github.com/Grelinhealth20/
chart-auditing-frontend my-project-name
cd my-project-name
npm install
```

Then, you can run locally in development mode with live reload (for example, in [Warp](https://go.warp.dev/nextjs-bp)):

```
npm run dev
```

Open http://localhost:3000 with your favorite browser to see your project. For your information, Next JS need to take some time to compile the project for your first time.

```
.
├── README.md                     # README file
├── next.config.js                # Next JS configuration
├── public                        # Public folder
├── app
│   ├── autofill-confirm          # Autofill confirm page
│   ├── cms-validation            # Cms validation page
│   ├── fda-language              # Fda language page
│   ├── final-note                # Final note page
│   ├── jw-wastage                # Jw wastage page
│   ├── lcd-compliance            # Lcd compliance page
│   ├── note-capture              # Note capture page
│   ├── structured-note           # Structured note page
│   ├── wiser-audit               # Wiser audit page
├── package.json                  # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```


### Deploy to production

You can see the results locally in production mode with:

```
$ npm run build
$ npm run start
```

The generated HTML and CSS files are minified (built-in feature from Next js). It will also removed unused CSS from [Tailwind CSS](https://tailwindcss.com).

You can create an optimized production build with:

```
npm run build-prod
```

Now, your theme is ready to be deployed. All generated files are located at `out` folder, which you can deploy with any hosting service.


### VSCode information (optional)

If you are VSCode users, you can have a better integration with VSCode by installing the suggested extension in `.vscode/extension.json`. The starter code comes up with Settings for a seamless integration with VSCode. The Debug configuration is also provided for frontend and backend debugging experience.

Pro tips: if you need a project wide type checking with TypeScript, you can run a build with <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd> on Mac.

