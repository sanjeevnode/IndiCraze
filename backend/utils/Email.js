
import nodemailer from 'nodemailer'

const Email = async (userEmail,otp) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host:'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD
        },
        secure: false,
    });

    const mailOptions = {
        
            from: process.env.GMAIL_EMAIL,
            to: userEmail,
            subject: 'OTP Verification',
            text: `Your OTP is ${otp}`

    };

    await transporter.sendMail(mailOptions);

}


export { Email}