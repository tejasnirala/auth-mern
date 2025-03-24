import twilio from "twilio";

export const sendSMS = async ({phone, verificationCode}) => {
  try {
    const client = twilio(
      process.env.TWILIO_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    const body = generateSMSTemplate(verificationCode);
    const msgOptions = {
      from: process.env.TWILIO_FROM_PHONE_NUMBER,
      to: phone,
      body: body
    }

    await client.messages.create(msgOptions);
  } catch (error) {
    console.error(error);
  }
}

function generateSMSTemplate(verificationCode) {
  return `Dear user, your One Time Password (OTP) for verification is ${verificationCode}. It is valid for 5 minutes.`
}