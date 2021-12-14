require("dotenv").config();


module.exports = {
    DB: {
        DATABASE_NAME: process.env.DB_NAME,
        DB_USERNAME: process.env.DB_USERNAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_HOST: process.env.HOST,
        DB_DIALECT: process.env.DIALECT,
        DB_PASSWORD: process.env.DB_PASSWORD
    },
    JWT_SECRET: process.env.JWT_SECRET,


}