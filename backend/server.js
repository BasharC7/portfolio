import dotenv from 'dotenv';

dotenv.config({ path: `./config.env` });
import app from './app.js';

//const db = process.env.DATABASE.replace('<PASSWORD>',process.env.password)

const port = process.env.port || 3000;

import cloudinary from 'cloudinary';
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(port, () => {
  console.log('the server is running');
});
