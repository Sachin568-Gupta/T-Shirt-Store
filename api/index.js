const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
require("./config/server");

//routes imports
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const paymentRoutes = require("./routes/paymentRoutes");
const orderRoutes = require("./routes/order");
// app initialization
const app = express();

// middlewares
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", paymentRoutes);
app.use("/api", orderRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server is started at port", PORT);
});
