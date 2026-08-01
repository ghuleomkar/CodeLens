const fs = require("fs");
const path = require("path");

const ignoredFolders = [
  "node_modules",
  ".git",
  "dist",
  "build",
  "coverage",
];

const buildFolderTree = (directoryPath) => {
  const items = fs.readdirSync(directoryPath);

  const tree = [];

  for (const item of items) {
    if (ignoredFolders.includes(item)) {
      continue;
    }

    const fullPath = path.join(directoryPath, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      tree.push({
        name: item,
        type: "folder",
        children: buildFolderTree(fullPath),
      });
    } else {
      tree.push({
        name: item,
        type: "file",
        extension: path.extname(item),
      });
    }
  }

  return tree;
};

module.exports = buildFolderTree;