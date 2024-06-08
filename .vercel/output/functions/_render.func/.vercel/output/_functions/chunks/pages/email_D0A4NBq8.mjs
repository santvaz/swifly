import { sendPasswordResetEmail } from './sendEmail_Dm7DiNZe.mjs';

async function POST(context) {
  try {
    const body = await context.request.json();
    const { email } = body;
    const verificationLink = `https://your-app.com/reset-password?token=generated-token`;
    const success = await sendPasswordResetEmail(email, verificationLink);
    if (success) {
      return context.redirect("/password-reset-sent");
    } else {
      return new Response(JSON.stringify({ message: "Failed to send email" }), { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}

export { POST };
