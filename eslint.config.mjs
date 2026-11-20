import { defineConfig } from "eslint/config";
import tsParser from "@typescript-eslint/parser";

export default defineConfig({
  files: ["**/*.ts", "**/*.tsx"],
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser: tsParser,
    parserOptions: {
      ecmaFeatures: { jsx: true },
    },
  },
  rules: {
    "no-unused-vars": "warn",
  },
});