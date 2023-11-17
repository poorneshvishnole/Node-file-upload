const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
  try {
    //fetch file
    const file = req.files.file;

    //create path where file needs to be store on server
    const path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;

    // give path to the move function
    file.mv(path, (err) => {
      console.log(err);
    });

    //sent response
    res.status(200).json({
      success: true,
      message: "Local file upload successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

const uploadFileToCloudinary = async (file, folder, quality) => {
  const options = { folder };
  options.resource_type = "auto";

  if (quality) {
    options.quality = quality;
  }

  return await cloudinary.uploader.upload(file.tempFilePath, options);
};

const isFileTypeSupported = (type, suppportedTypes) => {
  return suppportedTypes.includes(type);
};

//image upload
exports.imageUpload = async (req, res) => {
  try {
    //data fetch
    const { name, email, tags } = req.body;

    //get file from req
    const file = req.files.imageFile;
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    //check for file supported or not
    const supported = isFileTypeSupported(fileType, supportedTypes);

    //if not supported
    if (!supported) {
      return res.status(400).json({
        success: false,
        error: "File type is not supported ",
      });
    }

    //if supported
    const response = await uploadFileToCloudinary(file, "FileUpload");

    const fileData = await File.create({
      name,
      email,
      tags,
      imageUrl: response.secure_url,
    });

    res.status(200).json({
      success: true,
      imageUrl: response.secure_url,
      message: "File uploaded successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Something went wrong ! while uploading the image",
    });
  }
};

//video upload
exports.videoUpload = async (req, res) => {
  try {
    const { email, tags, name } = req.body;

    const file = req.files.videoFile;
    const supportedTypes = ["mp4", "mp3", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();

    const supported = isFileTypeSupported(fileType, supportedTypes);

    if (!supported) {
      return res.status(400).json({
        success: false,
        message: "Type of video file is not supported",
      });
    }

    const response = await uploadFileToCloudinary(file, "FileUpload");
    

    const videoData = await File.create({
      name,
      email,
      tags,
      videoUrl: response.secure_url,
    });

    res.status(200).json({
      success: true,
      videoUrl: response.secure_url,
      message: "Video uploaded successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Something went wrong ! while uploading the video .",
    });
  }
};

//image reducer upload

exports.imageSizeReducer = async (req, res) => {
  try {
    //data fetch
    const { name, email, tags } = req.body;

    //get file from req
    const file = req.files.imageFile;
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    //check for file supported or not
    const supported = isFileTypeSupported(fileType, supportedTypes);

    //if not supported
    if (!supported) {
      return res.status(400).json({
        success: false,
        error: "File type is not supported ",
      });
    }

    //if supported
    const response = await uploadFileToCloudinary(file, "FileUpload", 80);

    const fileData = await File.create({
      name,
      email,
      tags,
      imageUrl: response.secure_url,
    });

    res.status(200).json({
      success: true,
      imageUrl: response.secure_url,
      message: "File uploaded successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
