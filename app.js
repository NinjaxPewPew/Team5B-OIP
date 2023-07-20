const express = require("express"),
    expressLayouts = require("express-ejs-layouts");
    // mysql = require("mysql2"),
    // path = require("path"),
    // route = require("./routes"),

    
const app = express();

app.use(express.urlencoded({ extended: true }));
//connect to public folder holding css
app.use(express.static(__dirname + "/public"));
app.use(expressLayouts);

// set the view engine to ejs
app.set('view engine', 'ejs');

//render home page
app.get("/", (req, res) => {
        res.render("home");
})

//render about us page
app.get("/aboutUs", (req, res) => {
        res.render("aboutUs");
})

//render history page
app.get("/history", (req, res) => {
        res.render("history");
})

//render art page
app.get("/art", (req, res) => {
        res.render("art");
})

//render event page
app.get("/event", (req, res) => {
        res.render("event");
})

//render forum page
app.get("/forum", (req, res) => {
        res.render("forum");
})

//render classes page
app.get("/classes", (req, res) => {
        res.render("classes");
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
