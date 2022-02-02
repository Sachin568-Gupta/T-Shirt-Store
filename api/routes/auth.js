const express = require("express");
const router = express.Router();
const { signUp, signIn, signOut } = require("../controllers/auth");

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.get("/signOut", signOut);

module.exports = router;
