import mongoose from "mongoose";
import dns from "dns";

// Fix querySrv ECONNREFUSED error on Windows when resolving MongoDB Atlas SRV records
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  // Ignore fallback error
}

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database Connected successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Database Connection Error:", err);
    });

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "chat-app"
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
  }
};