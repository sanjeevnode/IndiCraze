import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config();
import connectDB from './config/db.js';
import foodItemRouter from './routes/foodItemRoutes.js'
import adminRouter from './routes/aminRoutes.js'
import sendEmailRouter from './routes/sendemailRoutes.js'
import userRouter from './routes/userRoutes.js'

// import bcrypt from "bcryptjs"


// const pass = await  bcrypt.genSalt(10)
// const hash = await bcrypt.hash("admin@indicraze", pass);
// const compare = await bcrypt.compare("admin@indicraze","$2a$10$4IXiwuB692vzB6kv7viLKuh37ooEl3pMptKXiE7qp9KnWk9r3ggqu");

// console.log(compare);

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/fooditem',foodItemRouter);
app.use('/api/admin',adminRouter);
app.use('/api/sendemail',sendEmailRouter);
app.use('/api/user',userRouter);


app.get('/mail',async(req, res) => {
   const data=  await Email('me.sanjeevks@gmail.com')
   console.log(data.response);
    res.status(200).json({x:data.response});
})


app.listen(process.env.PORT,()=>console.log('listening on port '+process.env.PORT));