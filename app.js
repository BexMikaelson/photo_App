require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.APP_PORT;
const userRouter = require('./users/user.router');
const albumsRouter = require('./albums/albums.router');
const photosRouter = require('./photos/photos.router');
app.use(express.json());

app.use('/users', userRouter);
app.use('/albums', albumsRouter);
app.use('/photos', photosRouter);

app.listen(PORT, () => {
    console.log('Server up and running, listening on port', PORT );
})