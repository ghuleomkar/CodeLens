const axios = require("axios");

const fetchRepository = async (owner, repo) => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    return response.data;

  } catch (error) {

    console.error(
      "GitHub API Error:",
      error.response?.data || error.message
    );

    throw new Error("Repository not found");
  }
};

module.exports = fetchRepository;