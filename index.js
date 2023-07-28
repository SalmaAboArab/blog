import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import initApp from './src/app.router.js';
const app = express()
const port = process.env.PORT

console.log({DB:process.env.DB_LOCAL},{PORT:process.env.PORT});
initApp(app, express)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))