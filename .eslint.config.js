/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  ignorePatterns: [
    "node_modules/",
    ".next/",
    "out/",
    "build/",
    "coverage/",
    "dist/",
  ],
  extends: ["next/core-web-vitals", "next/typescript"],
  rules: {
    // Keep CI strict, but don't block common logging.
    "no-console": ["warn", { allow: ["warn", "error", "info"] }],
  },
};

