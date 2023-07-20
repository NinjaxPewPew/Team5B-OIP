const express = require("express")
    // mysql = require("mysql2"),
    // path = require("path"),
    // route = require("./routes"),
    // expressLayouts = require("express-ejs-layouts");
    
const app = express();

app.use(express.urlencoded({ extended: true }));
//connect to public folder holding css
app.use(express.static(__dirname + "/public"));
// app.use(expressLayouts);

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
//render home page
app.get("/", (req, res) => {
        res.render("home");
})


// run app on port 8000
app.listen(process.env.PORT || 8000, function () {
    console.log("Listening on port 8000")
})
console.log('Server is listening on port 8080');



function scrollToSection() {
const section = document.querySelector('#service');
section.scrollIntoView({ behavior: 'smooth' });
}
