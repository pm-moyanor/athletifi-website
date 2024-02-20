# AthletiFi Website

This is the repository for the athleti.fi website.

Our mission at AthletiFi is to redefine the way soccer fans engage with and support emerging talent in the world of soccer. We do this by creating digital sports trading cards that dynamically display a player's latest performance stats using AI-assisted video recognition technology.

Each card represents a young player from elite soccer academies with whom we've partnered. By acquiring these player cards, fans can follow and support promising young athletes and follow their journey in a unique and engaging way. Additionally, the cards will be usable in an upcoming Web3 game, adding an extra layer of interactivity and fun.

Our project is about more than just player cards - it's about building a sustainable ecosystem that benefits players, academies, and communities. AthletiFi employs a revenue-sharing model where proceeds from the platform go directly back to supporting the young players.

## Technology Stack

### Front-End Tools

- **Framework**: Next.js
- **Programming Language**: TypeScript
- **CSS Framework**: Tailwind
- **Code Formatting**: ESLint and Prettier

### Back-End Tools

- **CMS**: Strapi
- **Database**: PostgreSQL hosted on AWS RDS
- **Serverless Functions**: AWS Lambda
- **API Management**: AWS API Gateway

## Getting Started

1. Clone the repository and navigate to the project directory.
2. Install dependencies:

   ```bash
   yarn install
   ```

3. Run the development server:

   ```bash
   yarn dev
   ```

4. Open `http://localhost:3000` with your browser to see the result.

You can start editing the page by modifying pages/index.tsx. The page auto-updates as you edit the file.

### Back-End Installation

1. Strapi is a next-gen headless CMS that allows for content-rich experiences.
2. Create a new Strapi app:

   ```bash
   yarn create strapi-app my-project --quickstart
   ```

3. Run the development server:

   ```bash
   yarn run development
   ```

## ESLint and Prettier Setup for VS Code

For maintaining consistent code quality and formatting, we use `eslint-config-next` along with `prettier` for code formatting. In order for this setup to work seamlessly in VS Code, some additional setup is required.

### Configuration Steps

Assuming you have already run `yarn install` which installs all the dependencies listed in `package.json`, including ESLint and Prettier configurations, follow these steps to configure your VS Code:

1. Please install the following extensions in VS Code:

   1. ESLint (`dbaeumer.vscode-eslint`)
   2. Prettier - Code formatter (`esbenp.prettier-vscode`)

2. To automatically format and lint your code on save, add the following settings to your `settings.json` file in VS Code:

   ```json
   {
     "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit"
     },
     "editor.formatOnSave": true,
     "[javascript]": {
       "editor.defaultFormatter": "dbaeumer.vscode-eslint"
     },
     "[javascriptreact]": {
       "editor.defaultFormatter": "dbaeumer.vscode-eslint"
     },
     "[typescript]": {
       "editor.defaultFormatter": "dbaeumer.vscode-eslint"
     },
     "[typescriptreact]": {
       "editor.defaultFormatter": "dbaeumer.vscode-eslint"
     }
   }
   ```
