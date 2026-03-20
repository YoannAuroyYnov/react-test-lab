import { defineConfig } from "cypress";

module.exports = defineConfig({
  allowCypressEnv: true,
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
