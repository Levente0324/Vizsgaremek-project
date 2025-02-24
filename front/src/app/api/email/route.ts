import { Resend } from "resend";
import WelcomeEmail from "../emails/welcome";

const resend = new Resend(String(process.env.RESEND_API_KEY));

export async function POST(request: Request) {
  const { email } = await request.json();

  const results = await resend.emails.send({
    from: "Levente <rentcar@resend.dev>",
    to: "leventedukay@gmail.com",
    subject: "Welcome!",
    html: "<strong>Welcome to our platform!</strong><br><h2>Thank you for signing up! Hope you enjoy your time!</h2>",
  });

  return Response.json({
    data: results,
  });
}
