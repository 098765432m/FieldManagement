const app = require("./");
const config = require("./app/config/config.js");
const MongoDB = require("./app/utils/mongodb.util.js");
const mongoose = require("mongoose");

async function startServer(){
    try{
        await mongoose.connect(config.db.uri); 
        console.log("Kết nối với cơ sơ dữ liệu thành công!");

        const PORT = config.app.port;
        app.listen(PORT, () => {
            console.log(`Server đang chạy trên cổng: ${PORT}`);
        })
    } catch(err){
        console.log("Không thể kết nối với cơ dữ liệu!");
        process.exit();
    }
}

startServer();