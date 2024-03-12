import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import EmailTemplate from '@/emails';

const resend = new Resend(process.env.NEXT_API_KEY);

export async function POST(req){
    const userData = await req.json();
    const result = userData.data;
    try{
        const data = await resend.emails.send({
            from: 'mylegend11.online',
            to: result.Email,
            subject: 'Doctor Appointment Booking',
            react: EmailTemplate({result}),
          });
        NextResponse(data)
    }catch(error){
        NextResponse({error})
    }
}