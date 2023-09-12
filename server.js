require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const route = require('./route/route');

app.use(route);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})