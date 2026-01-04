require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// ROUTES
const messageRoutes = require("./routes/messageRoutes");
const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// --------------------
// MIDDLEWARE
// --------------------
app.use(cors());
app.use(express.json());

// --------------------
// MONGODB CONNECTION
// --------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// --------------------
// USER MODEL (TEMP / TEST)
// --------------------
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", UserSchema);

// --------------------
// USER ROUTES (TEST)
// --------------------
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

app.get("/add", async (req, res) => {
  await User.create({ name: "Test User", email: "test@gmail.com" });
  res.send("User added");
});

// --------------------
// MAIN ROUTES
// --------------------
app.use("/api/messages", messageRoutes); // ✅ IMPORTANT
app.use("/projects", projectRoutes);
app.use("/auth", authRoutes);

// --------------------
// START SERVER
// --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
