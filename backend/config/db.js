const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tlsInsecure: false,              // <== add this
      tlsAllowInvalidCertificates: false,
      ssl: true,
      sslValidate: true,
      serverSelectionTimeoutMS: 10000, // optional: for Windows SSL delay
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error}`.red.bold);
    process.exit(1);
  }
};

module.exports = connectDB;




