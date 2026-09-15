require("dotenv").config();

const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const searchRoutes = require("./routes/search.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "SIMORA backend is running"
    });
});

// Product API
app.use("/api/products", productRoutes);

// User Auth API
app.use("/api/auth", userRoutes);

// Search API
app.use("/api/search", searchRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`SIMORA server running on http://localhost:${PORT}`);
});