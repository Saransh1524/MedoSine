import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {

    mongoose.set('strictQuery' , true); // WHAT IS THIS ?

    if(!process.env.MONGODB_URI) return console.log("MONGODB_URI is not defined")
  if (isConnected) {
    console.log('MongoDB connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
  } catch (error) {
    console.log(error)
  }
};
