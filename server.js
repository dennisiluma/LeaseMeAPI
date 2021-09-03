const express = require('express');
const app = express();
const db = require('./models');
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const signUp = require("./routes/Signup");
app.use("/signup", signUp);

const home = require("./routes/Home");
app.use("/", home);

const login = require("./routes/Login");
app.use("/login", login);

const addProduct = require("./routes/Product");
app.use("/addProduct", addProduct);

try {
    db.sequelize.sync().then(() => {
      app.listen(PORT, () => {
        console.log(`listening on: http://localhost:${PORT}`);
      });
    });
    
} catch (error) {
    console.log(`E nr work ${error}`)
}