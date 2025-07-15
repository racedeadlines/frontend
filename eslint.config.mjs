import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      "next", // incl: eslint-plugin-[react, react-hooks, jsx-a11y, import]
      "next/core-web-vitals",
      "next/typescript",
      "prettier",
    ],
    plugins: ["simple-import-sort"],
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Packages `react` related packages come first.
            ["^react", "^next", "^\\w"],
            // npm packages
            // Anything that starts with a letter (or digit or underscore), or `@` followed by a letter.
            ["^\\w"],
            // Internal packages.
            ["^@components(/.*|$)"],

            // specific to this website
            ["^@about(/.*|$)"],
            ["^@layout(/.*|$)"],
            ["^@projects(/.*|$)"],
            ["^@resume(/.*|$)"],

            ["^@lib(/.*|$)"],
            ["^@utils(/.*|$)"],
            ["^@hooks(/.*|$)"],
            // Side effect imports.
            ["^\\u0000"],
            // Parent imports. Put `..` last.
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // Other relative imports. Put same-folder imports and `.` last.
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // Style imports.
            ["^.+\\.?(css)$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
    },
  }),
];

export default eslintConfig;
