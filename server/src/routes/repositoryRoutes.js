const express = require("express");

const {
    analyzeRepository,
     getRepositoryReviews,
     getRepositoryDetails,
} = require("../controllers/repositoryController");

const router = express.Router();

router.post("/analyze",analyzeRepository);
router.get("/:id", getRepositoryDetails);
router.get("/:id/reviews", getRepositoryReviews,)

module.exports = router;