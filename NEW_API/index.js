const express = require('express');
const examesRouter = require("./Controller/ExamesController/router");

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/exames');

const PORT = 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
