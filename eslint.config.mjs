import globals from "globals";
import js from "@eslint/js";
import * as tsEslint from "@typescript-eslint/eslint-plugin";
import * as tsParser from "@typescript-eslint/parser";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      parser: tsParser, // Use TypeScript parser
      globals: {
        ...globals.browser,
        ...globals.node,
        process: "readonly",
      },
    },
    rules: {
      // JavaScript recommended rules
      ...js.configs.recommended.rules,
      // TypeScript recommended rules
      ...tsEslint.configs.recommended.rules,
      // Custom rules
      "no-unused-vars": "error",
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-console": "warn",
      "no-undef": "error",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  {
    ignores: ["node_modules", "dist"], // Ignore unnecessary directories
  },
];
