import mongoose from "mongoose";

export const  connectDB = async () =>{

    await mongoose.connect('mongodb+srv://aononwara39:aon2311@cluster0.8wvvaz3.mongodb.net/So-Food');
   
}


// add your mongoDB connection string above.
// Do not use '@' symbol in your databse user's password else it will show an error.