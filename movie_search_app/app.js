const express = require("express");
const axios = require("axios");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("search");
});

app.get("/results", async function (req, res) {
    const query = req.query.search;
    const url = `http://omdbapi.com/?s=${encodeURIComponent(query)}&apikey=thewdb`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        // Handle case when no movies are found
        if (!data.Search) {
            data.Search = [];
        }
        res.render("results", { data: data, query: query });
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.render("results", { data: { Search: [] }, query: query });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Movie App has started on port " + port + "!");
});