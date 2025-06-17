const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Set this in .env
    pass: process.env.EMAIL_PASSWORD, // Use app password
  },
});

const FRONTEND_URL = "https://evangadi-forum-beta7.vercel.app";

async function sendAnswerNotification(
  email,
  questionId,
  questionTitle = "your question"
) {
  const questionLink = `${FRONTEND_URL}/question-detail/${questionId}`;
  const mailOptions = {
    from: "Evangadi Q&A Forum <no-reply@qaapp.com>",
    to: email,
    subject: "Your question has been answered!",
    text: `Your question has been answered! Visit: ${questionLink}`,
    html: `
      <div style="background: rgba(255,255,255,0.7); backdrop-filter: blur(8px) saturate(180%); border-radius: 18px; box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15); padding: 32px 24px; max-width: 480px; margin: 32px auto; font-family: 'Segoe UI', Arial, sans-serif; color: #1e3a5f;">
        <div style="text-align:center; margin-bottom: 18px;">
          <img src="https://evangadi-forum-beta7.vercel.app/src/assets/imgs/logo.png" alt="Evangadi Logo" style="height:48px; margin-bottom: 8px;"/>
          <h2 style="margin:0; font-weight:700; letter-spacing:1px;">Evangadi Forum</h2>
        </div>
        <h3 style="margin-top:0;">Your question has a new answer!</h3>
        <p style="font-size:1.1rem;">Someone just answered <b>"${questionTitle}"</b> on Evangadi Forum.</p>
        <a href="${questionLink}" style="display:inline-block; margin: 24px 0 8px 0; padding: 12px 28px; background: linear-gradient(90deg, #1e3a5f 60%, #007bff 100%); color: #fff; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 1.1rem; box-shadow: 0 2px 8px rgba(30,58,95,0.10); transition: background 0.2s;">View Your Question</a>
        <p style="font-size:0.95rem; color:#555; margin-top:24px;">Thank you for being part of the Evangadi community!<br/>If you have any questions, just reply to this email.</p>
        <hr style="margin:24px 0; border:none; border-top:1px solid #eee;"/>
        <div style="font-size:0.85rem; color:#888; text-align:center;">&copy; 2025 Evangadi Forum. All rights reserved.</div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendAnswerNotification };
