const mongoose = require("mongoose");
const http = require("http");
const express = require("express");
const cors = require("cors");
require("dotenv").config();


const port = process.env.PORT || process.env.API_PORT;

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require("./routes/authRoutes");
const proudRoutes = require("./routes/products");
const cartRoutes = require('./routes/cart');

app.use('/uploads', express.static('./uploads'));

app.use("/api/auth", authRoutes);
app.use("/api/prod", proudRoutes);
app.use("/api/cart", cartRoutes);

const server = http.createServer(app);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is listening on ${port}`);
    });
  })
  .catch((err) => {
    console.log("database connection failed. Server not started");
    console.error(err);
  });