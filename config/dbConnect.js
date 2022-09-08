import mongoose from "mongoose";

mongoose.connect("mongodb+srv://Luiza:1234@api.yz4wf2f.mongodb.net/API");

let db = mongoose.connection;

export default db;