import { ForgotPasswordEmail } from '@/components/template/forgotPasswordEmailTemplate';
import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);
interface sendEmailInterface{
    name:string,
    url:string,
    email:string
}

export const sendEmail=async({name,url,email}:sendEmailInterface)=>{
    const { data, error } = await resend.emails.send({
        from: 'My Editor <onboarding@resend.dev>',
        to: email,
        subject: 'Password Reset Request.',
        react:await ForgotPasswordEmail({ name,url }),
      });
  
      if (error) {
        return error;
      }
      return data;
}
