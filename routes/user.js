const { Router } = require("express");
const router = new Router();
const User = require("../models/user");
const { createToken } = require("../services/authentication");

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      const token = createToken(user);
      return res.cookie("token", token).redirect("/");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect Email or Password",
    });
  }
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    await User.create({ fullName, email, password });
    res.redirect("/user/signin");
  } catch (error) {
    res.render("signup", {
      error: "Error creating account",
    });
  }
});

module.exports = router;