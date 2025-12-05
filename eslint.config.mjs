import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  js.configs.recommended,
  nextPlugin.configs.recommended,
  {
    ignores: [
      "**/node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];
