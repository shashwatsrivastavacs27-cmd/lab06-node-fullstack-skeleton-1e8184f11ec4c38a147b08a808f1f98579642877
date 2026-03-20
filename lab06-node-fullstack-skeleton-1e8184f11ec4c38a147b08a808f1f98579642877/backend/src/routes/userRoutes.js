const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();


// ✅ GET /api/users/me (USER)
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  res.json(user);
});


// ✅ GET /api/users (ADMIN + SUPER_ADMIN)
router.get("/", auth, role("ADMIN", "SUPER_ADMIN"), async (req, res) => {
  const users = await User.find();
  res.json(users);
});


// ✅ POST /api/users (ADMIN + SUPER_ADMIN)
router.post("/", auth, role("ADMIN", "SUPER_ADMIN"), async (req, res) => {
  const { name, email, password, role: newRole } = req.body;

  // ❗ ADMIN restriction (PDF rule)
  if (req.user.role === "ADMIN" && newRole !== "USER") {
    return res.status(403).json({ msg: "Forbidden" });
  }

  // ✅ HASH PASSWORD (MANDATORY)
  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    role: newRole,
  });

  res.status(201).json(user);
});


// ✅ PATCH /api/users/:id/role (SUPER_ADMIN ONLY)
router.patch("/:id/role", auth, role("SUPER_ADMIN"), async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role: req.body.role },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  res.json(user);
});


// ✅ DELETE /api/users/:id (ADMIN + SUPER_ADMIN)
router.delete("/:id", auth, role("ADMIN", "SUPER_ADMIN"), async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  // ❗ ADMIN restriction (PDF rule)
  if (req.user.role === "ADMIN" && user.role !== "USER") {
    return res.status(403).json({ msg: "Forbidden" });
  }

  await User.findByIdAndDelete(req.params.id);

  res.json({ msg: "Deleted successfully" });
});


module.exports = router;