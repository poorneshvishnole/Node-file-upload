//instance of server created and store it in app
const express = require("express");
const app = express();

//import our routes
const Upload = require("./routes/fileUploadRoutes");

//env variable access
require("dotenv").config();

//databse or cloudinary  connection
const { dbConnect } = require("./config/database");
dbConnect();

const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//middlewares
app.use(express.json());
const fileupload = require("express-fileupload");

app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/upload", Upload);

//server running
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
