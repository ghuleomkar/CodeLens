const fs = require("fs");
const path = require("path");
const MAX_FILE_SIZE = 50 * 1024;

const IGNORED_DIRECTORIES = [
  "node_modules",
  ".git",
  "dist",
  "build",
  "coverage",
];

const ALLOWED_EXTENSIONS = [
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".py",
  ".java",
  ".cpp",
  ".c",
  ".html",
  ".css",
  ".json",
  ".md",
];
const IGNORED_FILES = [
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  "package.json",
  "README.md",
  ".env.example",
  "vite.config.js",
  "webpack.config.js",
];

const readSourceFiles = (directory, baseDirectory = directory) => {
  const sourceFiles = [];

  const items = fs.readdirSync(directory);

  for (const item of items) {
    const fullPath = path.join(directory, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      if (IGNORED_DIRECTORIES.includes(item)) {
        continue;
      }

      sourceFiles.push(
        ...readSourceFiles(fullPath, baseDirectory)
      );
    } else {

      if (stats.size > MAX_FILE_SIZE) {
      console.log(`Skipping large file: ${item}`);
      continue;
    }

    if (IGNORED_FILES.includes(item)) {
  continue;
}

      const extension = path.extname(item);

      if (!ALLOWED_EXTENSIONS.includes(extension)) {
        continue;
      }

      const content = fs.readFileSync(fullPath, "utf-8");

      const relativePath = path.relative(
        baseDirectory,
        fullPath
      );

      sourceFiles.push({
        path: relativePath,
        content,
        extension,
      });
    }
  }

  return sourceFiles;
};

module.exports = readSourceFiles;