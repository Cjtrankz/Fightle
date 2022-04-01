const express = require("express");
const app = express();
const port = 8000;
const DB = "fighters_db"
const cors = require('cors')

app.use(express.json(), cors(), express.urlencoded({extended:true}));

require('./config/mongoose.config')(DB);

const FighterRoutes = require("./routes/fighters.routes");
FighterRoutes(app);

const AnswerRoutes = require("./routes/answer.routes");
AnswerRoutes(app);


app.listen(port, () => console.log(`Server started on port: ${port} and is listening for requests to respond to`))