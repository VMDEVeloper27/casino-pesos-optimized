import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    rules: {
      // Next.js specific rules
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-img-element": "warn",
      
      // React specific rules
      "react/no-unescaped-entities": "off",
      "react/prop-types": "off",
      "react-hooks/exhaustive-deps": "warn",
      
      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-require-imports": "off",
      
      // General code quality rules
      "prefer-const": "off",
      "no-var": "error",
      "no-console": "off",
      "eqeqeq": ["error", "always"],
      "curly": "off",
      
      // Import rules
      "sort-imports": "off"
    }
  }
];

export default eslintConfig;
