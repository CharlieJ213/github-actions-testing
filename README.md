# React + TypeScript + Vite

![Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/CharlieJ213/a1b4894b0f9c40bee92900225b43f0d8/raw/coverage.json)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## Setting up the Repository

### Branch Protection

1. Navigate to your repository’s main page on GitHub.
2. Click on “Settings” under your repository name.
3. In the left sidebar, click on “Branches” under “Code and automation”.
4. Under “Branch protection rules”, click “Add rule”.
5. Enter the branch name pattern (e.g., `main` for the main branch).
6. Configure the following settings:
   - Require pull request reviews before merging
   - Require status checks to pass before merging
   - Require signed commits
   - Include administrators
7. Click “Create” or “Save changes” to apply the rule.

### Dependabot Alerts and Updates

1. Go to your repository’s “Settings” page.
2. Click on “Code security” under the “Security” section.
3. Enable Dependabot alerts by clicking “Enable” next to “Dependabot alerts”.
4. Enable Dependabot security updates by clicking “Enable” next to “Dependabot security updates”.
5. Dependabot will now follow the update checks dictated in the [config](./.github/dependabot.yml)

## Github Secrets & Variables

Required Secrets:

- `secrets.AWS_ROLE_TO_ASSUME` - The OIDC role created for interactions between Github Actions and AWS
  - Required for [`Publish Build To App Runner`](./.github/workflows/publish-build-to-app-runner.yml) Workflow
  - Required for [`Build Web Docker Image`](./.github/workflows/build-web-docker.yml) Workflow
  - Required for [`Component Test Web Docker Image`](./.github/workflows/component-test-web-docker.yml) Workflow
- `secrets.AWS_APP_RUNNER_ROLE_TO_ASSUME` - The role for deploying an ECR container to App Runner, separate to the role mentioned above
  - Required for [`Publish Build To App Runner`](./.github/workflows/publish-build-to-app-runner.yml) Workflow
- Required for [`Update Coverage Badge`](./.github/workflows/update-coverage-badge.yml) Workflow
  - `secrets.GIST_SECRET` - Access Token for reaching the private Gist
  - `vars.GIST_ID` - ID for the Gist containing the coverage information
  - More information can be found in the [Setting Up Coverage Badge](#setting-up-coverage-badge) section

## Setting Up Coverage Badge

### Create a GitHub Gist <!-- omit in toc -->

- Go to GitHub Gists.
- Click on “New Gist.”
- Create a new file named `coverage.json` with the following content:

  ```json
  {
    "schemaVersion": 1,
    "label": "coverage",
    "message": "0%",
    "color": "red"
  }
  ```

- Click Create secret gist.
- Copy the URL of the Gist; it will look like this:

```txt
https://gist.github.com/<your-username>/<gist-id>
```

- The `<gist-id>` is the last part of the URL.

### Create a Personal Access Token <!-- omit in toc -->

- Go to GitHub Settings.
- Click Generate new token.
- Give it a name (e.g., “Gist Access Token”) and select the gist scope.
- Click Generate token and copy the generated token.

### Add the Secret and Variable to the Repository  <!-- omit in toc -->

- Go to your repository on GitHub.
- Navigate to Settings > Secrets and variables > Actions.
- Click New repository secret.
- Name it `GIST_SECRET` and paste your Personal Access Token as the value.
- Click Add secret.
- Click Variables.
- Click New repository variable.
- Name it `GIST_ID` and paste your `<gist-id>` (as [mentioned above](#create-a-github-gist)) as the value.
- Click Add variable.

### Reference the Badge in Your README.md  <!-- omit in toc -->

Add the following badge link to your README file:

```md
![Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/<your-username>/<your-gist-id>/raw/coverage.json)
```

Replace `<your-username>` and `<your-gist-id>` with your actual GitHub username and Gist ID.

### Validate this all works <!-- omit in toc -->

- Commit your changes and push them to the main branch.
- The GitHub Actions workflow will run automatically, generating the coverage report and updating the badge in your Gist.
