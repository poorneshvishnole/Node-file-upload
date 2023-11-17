const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

fileSchema.post("save", async (doc) => {
  try {
    console.log(doc);

    //transpoter
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // send mail

    let info = transporter.sendMail({
      from: "Codehelp",
      to: doc.email,
      subject: " New file uploaded successfully",
      html: `<h2> HEllO JEE</h2> <p>File uploaded , view here : <a href="${doc.imageUrl}">${doc.imageUrl}</a> </p> `,
    });
  } catch (err) {
    console.log(err);
  }
});
const File = mongoose.model("File", fileSchema);
module.exports = File;
