const Repository = require("../models/Repository");
const fetchRepository = require("../services/github/fetchRepository");
const cloneRepository = require("../services/github/cloneRepository");
const parseRepository = require("../services/github/parseRepository");
const chunkFiles = require("../services/ai/chunkFiles");
const analyzeCode = require("../services/ai/analyzeCode");
const Review = require("../models/Review");

const analyzeRepository = async (req, res) => {
  try {
    const { url } = req.body;


    if (!url) {
      return res.status(400).json({
        success: false,
        message: "GitHub repository URL is required.",
      });
    }


    // Basic GitHub url validation
    const githubRegex = /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/?$/;

    if (!githubRegex.test(url)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid GitHub repository URL.",
      });
    }

  const [owner, repo] = url
  .replace("https://github.com/", "")
  .split("/");

console.log("1. Fetching repository...");
const repository = await fetchRepository(owner, repo);

console.log("2. Repository fetched");
const existingRepository = await Repository.findOne({
  githubUrl: url,
});


console.log("3. Database checked");
if (existingRepository) {
  return res.status(200).json({
    success: true,
    message: "Repository already exists in database.",
    repository: existingRepository,
  });
}


//Save new repository
console.log("4. Creating repository...");

const savedRepository = await Repository.create({
  githubUrl: url,
  owner: repository.owner.login,
  name: repository.name,
  description: repository.description,
  language: repository.language,
  stars: repository.stargazers_count,
  forks: repository.forks_count,
  defaultBranch: repository.default_branch,
  isPrivate: repository.private,
});

console.log("5. Repository saved");

const localPath = await cloneRepository(
  url,
  savedRepository._id
);

console.log("6. Repository cloned");
const parsedRepository = parseRepository(localPath);

console.log("7. Repository parsed");
console.log("Total source files:", parsedRepository.sourceFiles.length);


const chunks = chunkFiles(
  parsedRepository.sourceFiles
);

const MAX_CHUNKS = 25;

const limitedChunks = chunks.slice(0, MAX_CHUNKS);

console.log("8. Files chunked");
console.log("Total chunks:", chunks.length);


const reviews = [];

for (const chunk of limitedChunks) {
  console.log(`Analyzing: ${chunk.path}`);

  
  console.log("Sending code to AI...");

const reviewResult = await analyzeCode(chunk);

console.log("AI response received:", reviewResult);

  const savedReview = await Review.create({
    repository: savedRepository._id,
    filePath: chunk.path,
    chunkNumber: chunk.chunkNumber || 1,
    review: reviewResult.review,
  });
  console.log("Review saved:", savedReview._id);

  reviews.push(savedReview);
}


return res.status(201).json({
  success: true,
  message: "Repository analyzed successfully",
  repository: savedRepository,
  totalFiles: parsedRepository.totalFiles,
  totalChunks: limitedChunks.length,
  reviews,
});




  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};


const getRepositoryDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const repository = await Repository.findById(id);

    if (!repository) {
      return res.status(404).json({
        success: false,
        message: "Repository not found",
      });
    }

    return res.status(200).json({
      success: true,
      repository,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch repository details",
    });
  }
};

const getRepositoryReviews = async (req, res) => {
  try {
    const { id } = req.params;

    const reviews = await Review.find({
      repository: id,
    }).sort({ filePath: 1, chunkNumber: 1 });

    return res.status(200).json({
      success: true,
      totalReviews: reviews.length,
      reviews,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch repository reviews",
    });
  }
};
module.exports = {
  analyzeRepository,
  getRepositoryReviews,
  getRepositoryDetails,
};