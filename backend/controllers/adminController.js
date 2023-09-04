import bcrypt from 'bcryptjs'

const admiLogin = async (req,res)=>{
    const {username,password} = req.body;
    const passwordCheck =  await bcrypt.compare(password,process.env.ADMIN_PASSWORD);
    if(passwordCheck && username===process.env.ADMIN_USERNAME){
        res.status(200).json({
            message: "Login Success"
        })
    }
    else{
        res.status(401).json({
            message: "Login Failed"
        })
    }
};

export  {admiLogin};