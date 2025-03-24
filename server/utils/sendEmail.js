import nodeMailer from 'nodemailer';

export const sendEmail = async ({email, verificationCode, templateType}) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    service: process.env.SMTP_SERVICE,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    }
  });

  const options = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: templateType === 'resetMail' ? 'Reset Your Password' : 'Your Verification Code',
    html: templateType === 'resetMail' ? generateResetEmailTemplate(verificationCode) : generateEmailTemplate(verificationCode),
  };

  await transporter.sendMail(options);
}

function generateEmailTemplate(verificationCode) {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
    <h2 style="color: #4CAF50; text-align: center;">Verification Code</h2> 
    <p style="font-size: 16px; color: #333;">Dear User,</p> 
    <p style="font-size: 16px; color: #333;">Your verification code is:</p> 
    <div style="text-align: center; margin: 20px 0;">
      <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #4CAF50; padding: 10px 20px; border: 1px solid #4CAF50; border-radius: 5px; background-color: #e8f5e9;">
        ${verificationCode}
      </span>
    </div>
    <p style="font-size: 16px; color: #333;">Please use this code to verify your email address. The code will expire in 10 minutes.</p>
    <p style="font-size: 16px; color: #333;">If you did not request this, please ignore this email.</p>
    <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #999;"> 
      <p>Thank you,<br>Your Company Team</p>
      <p style="font-size: 12px; color: #aaa;">This is an automated message. Please do not reply to this email.</p>
    </footer>
  </div>
  `
}

function generateResetEmailTemplate(passwordResetLink) {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
    <h2 style="color: #4CAF50; text-align: center;">Reset Password URL</h2> 
    <p style="font-size: 16px; color: #333;">Dear User,</p> 
    <p style="font-size: 16px; color: #333;">Here is the reset password URL:</p> 
    <div style="text-align: center; margin: 20px 0;">
      <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #4CAF50; padding: 10px 20px; border: 1px solid #4CAF50; border-radius: 5px; background-color: #e8f5e9;">
        ${passwordResetLink}
      </span>
    </div>
    <p style="font-size: 16px; color: #333;">Please use this URL to reset your account password. The URL will expire in 15 minutes.</p>
    <p style="font-size: 16px; color: #333;">If you did not requested this mail, please ignore it.</p>
    <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #999;"> 
      <p>Thank you,<br>Your Company Team</p>
      <p style="font-size: 12px; color: #aaa;">This is an automated message. Please do not reply to this email.</p>
    </footer>
  </div>
  `
}