$(document).ready(function() {

	// ** Materialize modals and parallax need to be initiated for use **
	$(".modal").modal(); $(".parallax").parallax();

	$("#find-beer").on("click", function(event) {
		event.preventDefault();

		var beer = $("#beer-input").val();
		console.log("beer = " + beer);
		if (beer === "") {
			var queryURL =
				"https://api.punkapi.com/v2/beers/?page=2&per_page=60&" + beer;
			console.log("no beer entered but here's a random beer " + beer);
		} else {
			var queryURL =
				"https://api.punkapi.com/v2/beers/?beer_name=" + beer;
			console.log("user chosen beer " + beer);
			$("#beer-input").empty();
		}

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			console.log(response);
				if (response.indexOf(beer) == undefined){
				var index = response.indexOf(beer)
				var id = response.indexOf(beer) + 1
				$("#beer-view").text("HA this exists at id# " + response.indexOf(beer) + 1 )}
			for (var i = 0; i < response.length; i++) {
				var beerName = response[i].name;
				var beerTagline = response[i].tagline;
				var beerDescription = response[i].description;
				var beerImage = response[i].image_url;
				var beerAbv = response[i].abv;
				var beerFood = response[i].food_pairing;

				console.log("Foods are in an array " + beerFood);
				beerFood = beerFood.toString();
				beerFood = beerFood.split(",").join(", ");

				//if we remove index, beerFood is now an array.
				//This means to diplay all foods we need a separate loop and some separate Jquery insode that loop
				//then we need to also get that into the modal, and we have packed it as a value in the data-food attribute
				//however, again, since it's an array, when you deal with it in the new modal, you may have to loop again

				var beerBrewed = response[i].first_brewed;
				var beerBrewery = response[i].withBreweries;
				var beerOrganic = response[i].isOrganic;
				var convertSearchterm = JSON.stringify(response);
			
				var beerCard = $("<li>").css("display", "inline-flex", "float", "relative");
				var beerContent = $("<div>").css("width", "250px", "height", "250px");

				beerCard.addClass("collection-item").css("margin", "20px");
				beerContent.addClass("card-content gray-text")
					.css("padding", "10px", "overflow", "hidden")
					.attr("data-name", beerName)
					.attr("data-describe", beerDescription)
					.attr("data-abv", beerAbv)
					.attr("data-year", beerBrewed)
					.attr("data-brewery", beerBrewery)
					.attr("data-food", beerFood);

					//building out the cards:
				var cardSpan = $("<span>").addClass("card-title").append("<i>" + beerTagline)
					.css({ color: "#1C1C1C", margin: "auto", padding: "5px" });

				var cardText = $("<p>").addClass("card-text");
				cardSpan.html(beer);

				var cardImage = $("<img>").addClass("card-image").attr("src", beerImage);
				cardText.append(cardImage);

				cardSpan.addClass("card-title").text(beerName);
				beerContent
					.prepend(cardSpan)
					.append("<i>" + beerTagline)
					.css({ color: "#a8a4b0", margin: "auto", padding: "5px" });

				beerContent.append(cardText);
				beerCard.append(beerContent);
				var dynamicCard = $("#list-stuff").append(beerCard);
				beerCard.addClass("card")

				//module trigger and adding the card classes
				var trigger = $("<button>").addClass("waves-effect waves-light btn").attr("id", "trigger", "data-target", "modal1");
				trigger.text("More Info").css({ display: "block", margin: "auto" });
				beerContent.append(trigger);

				//Attaching the data of each beer found to pair with a card and modal:
				$(".card").on("click", "button", function(event) {
					// var dataName = $(this).parent().attr("data-name");
					// var dataDescribe = $(this).parent().attr("data-describe");
					// var dataAbv = $(this).parent().attr("data-abv");
					// var dataYear = $(this).parent().attr("data-year");
					// var dataFood = $(this).parent().attr("data-food");
					// var dataBrewery = $(this).parent().attr("data-brewery");

					var beerInfo = {
						dataName: $(this).parent().attr("data-name"),
						dataDescribe: $(this).parent().attr("data-describe"),
						dataAbv: $(this).parent().attr("data-abv"),
						dataYear: $(this).parent().attr("data-year"),
						dataFood: $(this).parent().attr("data-food"),
						dataBrewery: $(this).parent().attr("data-brewery")
					}

					$("#modal1").modal("open");
					$("#modal-header").html(beerInfo.dataName);	

					//And finally, adding the data to the modal of each beer listed:
					$("#modal-body").html( `${beerInfo.dataDescribe} <h5>Alcohol by Volume</h5> ${beerInfo.dataAbv}% </div> 
					<h5>First Brewed On</h5> ${beerInfo.dataYear} <h5>Brewery</h5> ${beerInfo.dataBrewery} <h5>Goes Great With</h5> ${beerInfo.dataFood}`
					);

				});
			}
		});
	});
});
