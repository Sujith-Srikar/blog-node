const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const Blog = require("./models/blog");


const app = express();
const PORT = 8000;

mongoose
  .connect("mongodb://127.0.0.1:27017/blogapp") // instead of localhost use (127.0.0.1)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Use the authentication middleware
app.use(checkForAuthenticationCookie("token"));

// to make public static
app.use(express.static(path.resolve("./public")));


app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
