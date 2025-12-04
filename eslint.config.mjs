import js from "@eslint/js";

export default [
  {
    ignores: ["**/node_modules/**", ".next/**", "out/**", "build/**"],
  },

  js.configs.recommended,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      next: nextPlugin,
    },
    rules: {
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
];
