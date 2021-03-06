const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const db = require('./config/db.config');
const userRoutes = require("./routes/users.routes");
const orderRoutes = require("./routes/orders.routes");

const app = express();
const port = 8085;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(userRoutes);
app.use(orderRoutes);

app.get("/", (req, res) => {
    res.json({message: "Welcome to voosh assignment app"});
})

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
.then(() => {
    console.log("Connected to the database!");
})
.catch(err => {
    console.log("Cannot connect to the database!", err);
});

app.listen(port, () => {
    console.log(`App started at ${port} port`);
});