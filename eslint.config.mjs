import { defineConfig } from "eslint/config";
import tsParser from "@typescript-eslint/parser";
import tseslint from "typescript-eslint";

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
  plugins: {
    "@typescript-eslint": tseslint.plugin,
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "warn",
  },
});
