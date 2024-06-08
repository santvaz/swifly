import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
async function POST(context) {
  const formData = context.request.formData();
  const email = (await formData).get("email");
  const subject = (await formData).get("subject");
  const message = (await formData).get("message");
  if (typeof email !== "string" || email.length < 3) {
    return new Response("You did not meet the requirements for the 'email' input to be valid", { status: 400 });
  }
  if (typeof subject !== "string" || subject.length === 0 || subject.length > 40) {
    return new Response("You did not meet the requirements for the 'subject' input to be valid", { status: 400 });
  }
  if (typeof message !== "string" || message.length === 0 || message.length > 400) {
    return new Response("You did not meet the requirements for the 'message' input to be valid", { status: 400 });
  }
  const emailSent = await sendContactEmail(email, subject, message);
  if (!emailSent) {
    return new Response("Failed to send email", { status: 500 });
  }
  return context.redirect("/");
}
async function sendContactEmail(email, subject, message) {
  try {
    const send = await resend.emails.send({
      from: "Swifly@swifly.app",
      to: "Swifly@swifly.app",
      subject: `${email} quiere contactar contigo.`,
      html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <style>
            * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
      
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            background-color: #f3f4f6;
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }
      
          .container {
            margin-top: 100px;
            max-width: 800px;
            padding: 2rem;
            background-color: #fff;
            border-radius: 0.5rem;
            box-shadow: 0 3px 1px -2px rgb(0 0 0 / 16%), 0 2px 2px 0 rgb(0 0 0 / 11%), 0 1px 5px 0 rgb(0 0 0 / 10%);
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: center;
          }
      
          .container h1 {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 1rem;
          }
      
          .container p {
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
          }

          a {
            color: #7C3AED;
            font-weight: semibold;
            cursor: pointer;
          }

            </style>
            <body>
                <div class="container">
                    <h1>¡Hola! 🙌 Has recibido un nuevo formulario de contacto.</h1>
                    <p>Correo del remitente: <a href="${email}">${email}</a></p>
                    <p>Asunto: ${subject}</p>
                    <p>Mensaje: ${message}</p>
                </div>
            </body>
            </html>
            `,
      text: `Correo de: ${email}, Asunto: ${subject}, Mensaje: ${message}`
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

export { POST, sendContactEmail };
