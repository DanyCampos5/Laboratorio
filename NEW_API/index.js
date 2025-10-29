const express = require('express');
const cors = require('cors');
const examesRoutes = require("./Controller/ExamesController/router");

const app = express();

app.use(cors());

app.use(express.json());

app.use('/exames', examesRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
