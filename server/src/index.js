import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: "./.env",
});

connectDB()
.then(()=>{
    const port = process.env.PORT;
    app.listen(port, ()=>{
        console.log(`Server is running on PORT : ${port}`);
    })
})
.catch((err)=>{
    console.log("Error in DB connection : ", err);
});