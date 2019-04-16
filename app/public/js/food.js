$(document).ready(function () {
    $("#find-food").on("click", function (event) {
        event.preventDefault();
        var food = $("#food-input").val();
        food = food.toString();
        food = food.split(/[ ,]+/);

        console.log("Food carried over: " + food);
        var proxy = "https://cors-anywhere.herokuapp.com/";
        var queryURL =
            "https://food2fork.com/api/search?key=f18f20279482aabaea4a0d26c8810819&q=" +
            food;

        $.ajax({
            url: proxy + queryURL,
            method: "POST"
        }).done(function (response) {

            var res = JSON.parse(response);
            var recipes = res.recipes;
            var count = res.count;
            console.log(count)

            if (count === 0) {
                //alert("try again")
                console.log("inside count === 0 try again not found");
                var noResults = $("<div>");
                noResults.text("Try Again");
                $("#food-view").append(noResults);
            } else {
                // for (var i = 0; i < recipes.length; i++) {
                    var foodPublisher = recipes[2].publisher;
                    var foodTitle = recipes[2].title;
                    var foodSourceURL = recipes[2].source_url;
                    var foodImage = recipes[2].image_url;
            
                console.log(foodTitle + foodPublisher)

            }
        });
    });
})