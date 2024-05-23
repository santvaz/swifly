import type { APIContext } from "astro";
import { sendPasswordResetEmail } from "./sendEmail.json";

export async function POST(context: APIContext) {
    try {
        const body = await context.request.json();
        const { email } = body;

        // Genera el enlace de verificación de restablecimiento de contraseña
        const verificationLink = `https://your-app.com/reset-password?token=generated-token`;

        const success = await sendPasswordResetEmail(email, verificationLink);

        if (success) {
            // Redirigir al usuario a una página de confirmación
            return context.redirect('/password-reset-sent');
        } else {
            // Devuelve un error si el correo electrónico no se pudo enviar
            return new Response(JSON.stringify({ message: "Failed to send email" }), { status: 500 });
        }
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}
