const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const User = require("./models/User");          // ✅ ADD THIS
const bcrypt = require("bcryptjs");             // ✅ ADD THIS

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Lab 07 Backend Running Successfully");
});

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});


// ✅ SUPER_ADMIN SEED FUNCTION (MANDATORY FOR LAB 7)
const seedSuperAdmin = async () => {
  try {
    const existing = await User.findOne({ email: "superadmin@test.com" });

    if (!existing) {
      const hashedPassword = await bcrypt.hash("123456", 10);

      await User.create({
        name: "Super Admin",
        email: "superadmin@test.com",
        password: hashedPassword,
        role: "SUPER_ADMIN",
      });

      console.log("✅ SUPER_ADMIN created");
    } else {
      console.log("ℹ️ SUPER_ADMIN already exists");
    }
  } catch (error) {
    console.log("❌ Error seeding SUPER_ADMIN:", error);
  }
};


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected Successfully");

    // ✅ CALL SEED FUNCTION HERE
    await seedSuperAdmin();

    app.listen(process.env.PORT, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });