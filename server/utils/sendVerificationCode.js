import { sendEmail } from "./sendEmail.js";
import { sendSMS } from "./sendSMS.js";

export const sendVerificationCode = async function (verificationMethod, verificationCode, email, phone, res) {
  try {
    if(verificationMethod === 'email') {
      sendEmail({email, verificationCode, templateType: 'registration'});
      res.status(200).json({
        success: true,
        message: `Verification email successfully sent to ${email}`
      });
    } else if (verificationMethod === 'phone') {
      await sendSMS({phone, verificationCode});
      res.status(200).json({
        success: true,
        message: `OTP successfully sent to ${phone}`
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Invalid verification method'
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to send verification code'
    })
  }
}