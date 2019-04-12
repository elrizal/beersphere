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
		} else {
			var queryURL =
				"https://api.punkapi.com/v2/beers/?beer_name=" + beer;
			$("#beer-input").empty();
		}

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
				if (response.indexOf(beer) == undefined){
					var index = response.indexOf(beer)
					var id = response.indexOf(beer) + 1
					$("#beer-view").text("this exists at id# " + response.indexOf(beer) + 1 )
			}
			for (var i = 0; i < response.length; i++) {
				var beerRes = {
					beerName : response[i].name,
					beerTagline : response[i].tagline,
					beerDescription : response[i].description,
					beerImage : response[i].image_url,
					beerAbv : response[i].abv,
					beerFood : response[i].food_pairing.toString().split(",").join(", "),
					beerBrewed : response[i].first_brewed,
				}

				//Card UI building: tacking on the css is just a matter of preference here
				var beerCard = $("<li id='beercard' class='collection-item animated fadeIn'>")
				var beerContent = $("<div class='card-content gray-text'>")
					.attr("data-name", beerRes.beerName)
					.attr("data-describe", beerRes.beerDescription)
					.attr("data-img", beerRes.beerImage)
					.attr("data-abv", beerRes.beerAbv)
					.attr("data-year", beerRes.beerBrewed)
					.attr("data-food", beerRes.beerFood);

				var cardSpan = $("<span>").addClass("card-title").append(`<i> ${beerRes.beerTagline}`)
					.html(beer);

				var cardText = $("<p>").addClass("card-text");
				var cardImage = $(`<img class='card-image'>`).attr("src", beerRes.beerImage);
				cardText.append(cardImage);

				cardSpan.addClass("card-title").text(beerRes.beerName);
				beerContent.prepend(cardSpan)
					.append(`<i> ${beerRes.beerTagline}</i>`)

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
					var beerInfo = {
						dataName: $(this).parent().attr("data-name"),
						dataDescribe: $(this).parent().attr("data-describe"),
						dataAbv: $(this).parent().attr("data-abv"),
						dataYear: $(this).parent().attr("data-year"),
						dataFood: $(this).parent().attr("data-food"),
						dataImage: $(this).parent().attr("data-img")
					}
					$("#modal1").modal("open");
					$("#modal-header").empty();	
					//And finally, adding the data to the modal of each beer listed:
					$("#modal-body").html(`
					<div class="row">
						<div class="col l4 m5 s12" align="center"> 
							<img src='${beerInfo.dataImage}' class='modalimg'>
						</div> 
						<div class="col l8 m7 s12"> <h4>${beerInfo.dataName}</h4> ${beerInfo.dataDescribe} <h5>Alcohol by Volume</h5> ${beerInfo.dataAbv}% 
							<h5>First Brewed On</h5> ${beerInfo.dataYear} <h5>Goes Great With</h5> ${beerInfo.dataFood}
							</div> 
						</div>
					</div>`
					);

				});
			}
		});
	});
});
