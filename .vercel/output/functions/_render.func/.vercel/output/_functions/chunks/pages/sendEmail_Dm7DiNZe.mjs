import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
async function sendPasswordResetEmail(email, verificationLink) {
  try {
    const send = await resend.emails.send({
      from: "Swifly@swifly.app",
      to: email,
      subject: "Swifly | Password reset verification token",
      html: `<p>Para restablecer tu contraseña, por favor haz click en el siguiente enlace: <a href="${verificationLink}">Restablecer Contraseña</a></p>`,
      text: `Para restablecer tu contraseña, por favor haz click en el siguiente enlace: ${verificationLink}`
    });
    if (!send.data) {
      console.error(send.error);
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export { sendPasswordResetEmail };
