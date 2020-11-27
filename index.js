const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const SubjectRouter = require('./routes/subject');
const DefinitionRouter = require('./routes/definition');
const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use('/subjects', SubjectRouter);
app.use('/definitions', DefinitionRouter);
app.listen(3000, () => console.log("Listening"));