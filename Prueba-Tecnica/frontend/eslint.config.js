import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    extends: [
      "plugin:react/recommended",
      "plugin:react/jsx-runtime",
    ],
  },
  {
    languageOptions: { globals: globals.browser }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "react/jsx-uses-react": "off",
      // "react/react-in-jsx-scope": "off",
      "react/jsx-uses-vars": "error",
      "react/jsx-no-undef": "error",
      "react/jsx-no-useless-fragment": "error",
    }
  }
];