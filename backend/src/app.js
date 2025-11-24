const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();
const StatusCode = require("./utils/statusCode");
const ApiResponse = require("./utils/apiResponse");

// * ENVIRONMENT VARIABLES
const SERVER_PORT = process.env.SERVER_PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// * INITIALIZE APP
const app = express();

// * MIDDLEWARES
app.use("/api/public", express.static(path.join(__dirname, "public")));
// Working with body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// Allow domains can access to get data
// Cấu hình CORS chi tiết
app.use(
    cors({
        origin: process.env.CLIENT_URL, // Ví dụ: 'http://localhost:3000'
        credentials: true, // Cho phép gửi credentials (cookies, headers xác thực)
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        exposedHeaders: ["set-cookie"],
    })
);
// Thêm một số headers bảo mật
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// * ROUTER
app.use("/api/users", require("./routers/userRouter"));
app.use("/api/posts", require("./routers/postRouter"));
app.use("/api/comments", require("./routers/commentRouter"));
app.use((req, res) => {
    res.status(StatusCode.clientErrors.NOT_FOUND).json(
        ApiResponse.error(
            "Something went wrong",
            null,
            StatusCode.clientErrors.NOT_FOUND
        )
    );
});

// * START SERVER AND CONNECT DATABASE
const main = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        app.listen(SERVER_PORT, () => {
            console.clear();
            console.log(`Server is running on http://localhost:${SERVER_PORT}`);
        });
    } catch (err) {
        console.error(err);
    }
};
main();
