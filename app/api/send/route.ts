// import { EmailTemplate } from '../../../components/EmailTemplate';
import { EmailTemplate } from '../../Components/email-template';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';


// Check for API key
const apiKey = process.env.NEXT_RESEND_API_KEY;
if (!apiKey) {
    console.error('❌ RESEND_API_KEY is not set in environment variables');
}
const resend = new Resend(process.env.NEXT_RESEND_API_KEY);

export async function POST(request: Request) {
    console.log('🚀 API Route Hit - POST /api/send');
    
    // Check if API key is available
    if (!apiKey) {
        return NextResponse.json(
            { 
                success: false, 
                error: 'Email service is not configured. Please check server configuration.'
            },
            { status: 500 }
        );
    }
    
    try {
        const body = await request.json();
        const { toEmail, subject, message, name } = body;

        console.log('📧 Email Details:', { toEmail, subject, message, name });

        if (!toEmail) {
            return NextResponse.json(
                { success: false, error: 'Email address is required' },
                { status: 400 }
            );
        }

        const { data, error } = await resend.emails.send({
            from: 'Quiz App <onboarding@resend.dev>',
            to: [toEmail],
            subject: subject || 'Your Quiz Results',
            react: await EmailTemplate({ 
                firstName: name,
                message: message
            }),
        });

        if (error) {
            console.error('❌ Email sending error:', error);
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 500 }
            );
        }

        console.log('✅ Email sent successfully:', data);
        return NextResponse.json({ 
            success: true, 
            data,
            message: 'Email sent successfully'
        });
    } catch (error: any) {
        console.error('❌ Error in API route:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: error.message || 'Failed to send email'
            },
            { status: 500 }
        );
    }
}