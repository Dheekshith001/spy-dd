require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const logger = require("./utils/logger");
const errorHandler = require("./middleware/errorHandler");
const corsConfig = require("./middleware/corsConfig");

const predictionRoutes = require("./routes/predictionRoutes");
const chatRoutes = require("./routes/chatRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(corsConfig));
app.use(express.json({ limit: "10mb" }));
app.use(logger);

app.get("/", (req, res) => {
  res.json({ message: "Cleftix backend running" });
});

app.use("/api/predict", predictionRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/emergency", emergencyRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
