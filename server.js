const express = require('express');
const app = express();
var path = require('path');

const port = 5200;

app.use(express.static(path.join(__dirname + "/public/dist/public")));

app.all("*", (req, res, next) => {
    console.log("catch all path");
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});

app.listen(port, () => {
    console.log(`Listening on localhost ${port}`);
})