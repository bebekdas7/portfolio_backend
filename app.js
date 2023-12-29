import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
const router = express.Router();
const port = process.env.PORT || 8400;

app.use(cors());
app.use(express.json());
app.use("/", router);

router.post("/send", async (req, res) => {
  try {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "bebekdas7@gmail.com",
        pass: "tvkstporwtkbnpgb",
      },
    });

    const mailOptions = {
      from: {
        name: req.body.name,
        address: req.body.email, // Assuming 'email' is the user's email address
      },
      to: "bebekdas7@gmail.com",
      subject: "Contact Form Submission",
      text: req.body.message,
      html: `<p>${req.body.message}</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent");

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
