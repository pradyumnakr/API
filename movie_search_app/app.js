var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("search");
});


app.get("/results", function (req, res) {
    var query = req.query.search;
    var url = "http://omdbapi.com/?s=" + query + "&apikey=thewdb";
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            // Handle case when no movies are found
            if (!data.Search) {
                data.Search = [];
            }
            res.render("results", { data: data, query: query });
        }
    });
});




















var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Movie App has started on port " + port + "!");
});