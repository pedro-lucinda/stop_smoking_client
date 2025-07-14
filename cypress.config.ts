// cypress.config.ts
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // assumes your dev server runs at localhost:3000
    baseUrl: "http://localhost:3000",
    // where your spec files live
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    // path to your support file (below)
    supportFile: "cypress/support/e2e.ts",
  },
  // (optional) component testing config:
  // component: { /* if you later want to use Cypress Component Testing */ }
});
