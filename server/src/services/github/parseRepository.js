
const buildFolderTree = require("../parser/folderTree");
const readSourceFiles = require("../parser/fileReader");

const parseRepository = (repositoryPath) => {
  try {
    const folderTree = buildFolderTree(repositoryPath);

    const sourceFiles = readSourceFiles(repositoryPath);

    return {
      folderTree,
      sourceFiles,
      totalFiles: sourceFiles.length,
    };
  } catch (error) {
    console.error("Repository parsing failed:", error.message);
    throw error;
  }
};

module.exports = parseRepository;