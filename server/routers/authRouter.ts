import express from "express";
const validateForm = require("../controllers/validateForm");
const router = express.Router();

//Server side form validation
router.post("/login", (req, res) => {
  validateForm(req, res);
});

router.post("/signup", (req, res) => {
  validateForm(req, res);
});

module.exports = router;
