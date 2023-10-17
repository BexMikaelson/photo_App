require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.APP_PORT;
const userRouter = require('./api/users/user.router');
const albumsRouter = require('./api/albums/albums.router');
const photosRouter = require('./api/photos/photos.router');
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/albums', albumsRouter);
app.use('/api/photos', photosRouter);



 /* app.get('/api', (req, res) => {
     res.json({
         success: 1,
         message: "Rest api is working properly"
     });
 }); */

app.listen(PORT, () => {
    console.log('Server up and running, listening on port', process.env.APP_PORT );
})