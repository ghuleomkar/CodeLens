const simpleGit = require("simple-git");
const path = require("path");
const fs = require("fs");

const cloneRepository = async (repositoryUrl, repositoryId) => {
  try {
    const repositoriesPath = path.join(
      __dirname,
      "../../temp/repositories"
    );

    // Create directory if it doesn't exist
    if (!fs.existsSync(repositoriesPath)) {
      fs.mkdirSync(repositoriesPath, { recursive: true });
    }

    const localPath = path.join(repositoriesPath, repositoryId.toString());

    
    // Clone repository
    await simpleGit().clone(repositoryUrl, localPath);

    return localPath;
  } catch (error) {
    console.error("Repository cloning failed:", error.message);
    throw error;
  }
};

module.exports = cloneRepository;