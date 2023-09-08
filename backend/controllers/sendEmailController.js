import { Email } from "../utils/Email.js";

const sendEmail = async (req, res) => {
    try {
        const email = req.body.email;
        const otp = Math.round(Math.random()*1000000);

        try {
            await Email(email, otp);
        } catch (error) {
            res.status(401).json({message:"Mail not sent",error:error.message});
        }
        res.status(200).json({message:"Mail sent",otp:otp});
         
    } catch (error) {
        res.status(401).json({message:"Mail not sent",error:error.message});
    }
   
};

export default sendEmail;