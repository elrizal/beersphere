$(document).ready(function() {
$("#find-food").on("click", function(event) {
    event.preventDefault();
    //now we've packed food array into value
    var food = $("#food-input").val();

    //loop through array to make dropdown
    food = food.toString();
    food = food.split(/[ ,]+/);

    console.log("Food carried over: " + food);
    var proxy = "https://cors-anywhere.herokuapp.com/";
    var queryURL =
        "https://food2fork.com/api/search?key=f18f20279482aabaea4a0d26c8810819&q=" +
        food;

    $.ajax({
        url: proxy + queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response);
        console.log("hi");

        var res = JSON.parse(response);
        var recipes = res.recipes;
        var count = res.count;
        console.log(count);

        if (count === 0) {
            //alert("try again")
            console.log("inside count === 0");
            var noResults = $("<div>");
            noResults.text("Try Again");
            $("#food-view").append(noResults);
        } else {
            for (var i = 0; i < recipes.length; i++) {
                var foodPublisher = recipes[i].publisher;
                var foodTitle = recipes[i].title;
                var foodSourceURL = recipes[i].source_url;
                var foodImage = recipes[i].image_url;

                // var foodDiv = $("#food-view");
                var listItem = $("<li>");
                listItem.addClass("food-item");
                listItem.append(
                    "<h3>" +
                        foodTitle +
                        "</h3>" +
                        "<hr>" +
                        "PUBLISHER: " +
                        foodPublisher +
                        "<hr>"
                    // + "DESCRIPTION: " + foodSourceURL + "<hr>"
                );

                var source = $("<a>");
                source.addClass("source");
                source.text(
                    "Click here to get recipes for: " +
                        foodTitle
                );
                source.attr("href", foodSourceURL);

                var image = $("<img>");
                image.addClass("food-image");
                image.attr("src", foodImage);

                listItem.append(image);
                listItem.append(source);

                $("#food-view").append(listItem);
                                //FOR MAKING INVALID INPUTS:


            }
        }
    });
});
})