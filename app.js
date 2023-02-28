const app = require('express')();
const PORT = 3000;

app.get('/api', (req, res) => {
    res.json({
        success: 1,
        message: "Rest api is working properly"
    });
});

app.listen(PORT, () => {
    console.log('Server up and running, listening on port 3000');
})