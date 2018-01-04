$(document).ready(function() {
	$(".modal").modal();

	$(document).ready(function() {
		$(".parallax").parallax();
	});
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
			for (var i = 0; i < response.length; i++) {
				var beerName = response[i].name;
				var beerTagline = response[i].tagline;
				var beerDescription = response[i].description;
				var beerImage = response[i].image_url;
				var beerAbv = response[i].abv;
				var beerFood = response[i].food_pairing[0];
				var malt = response[i].ingredients.malt;
				var hops = response[i].ingredients.hops;
				var yeast = response[i].ingredients.yeast;
				var beerBrewed = response[i].first_brewed;
				var beerBrewery = response[i].withBreweries;
				var beerOrganic = response[i].isOrganic;
				var convertSearchterm = JSON.stringify(response);

				var beerCard = $("<li>").css("float", "left");
				var beerContent = $("<div>").css("max-width", "300px");

				beerCard
					.addClass("collection-item")
					.css("width", "300px", "float", "left"); //.addClass("col s12 m6 l3").css("margin", "auto");
				beerContent
					.addClass("card-content gray-text")
					.css("padding", "10px");
				beerContent.css("overflow", "hidden");

				var cardDiv = $("<div>");
				cardDiv
					.addClass("card-title")
					.css(
						"line-height",
						"15px",
						"width",
						"10%",
						"font-family",
						"'Oswald', sans-serif"
					);

				var cardText = $("<p>");
				cardText.addClass("card-text");
				cardDiv.html(beer);

				var cardImage = $("<img>");
				cardImage.addClass("card-image");
				cardImage.css({
					height: "250px",
					display: "block",
					margin: "auto",
					padding: "4px"
				});
				cardImage.attr("src", beerImage);
				beerContent.append(cardImage);

				cardDiv.addClass("card-title").text(beerName);
				beerContent.prepend(cardDiv);
				// .append("<i>" + "<center>" + beerTagline).css({color: "gray", padding: "5px"});
			
				// var foodIcon = $("<i>").addClass("material-icons").text("add");
				// cardText.append(foodIcon + "Great with: " + beerFood + "<br>").attr("material-icons", "local_dining");

				beerContent.append(cardText);
				beerCard.append(beerContent);
				var dynamicCard = $("#list-stuff");
				$("#list-stuff").append(beerCard);
				beerCard.addClass("card").css("margin", "5px", "float", "left");
				//.addClass("col s10 m6 l3").append(beerContent).css("margin", "5px", "max-height", "350px", "min-height", "350px", "width", "30%", "overflow", "hidden", "position", "absolute", "left", "0px", "top", "0px");

				//module trigger and adding the card classes
				var trigger = $("<button>");
				trigger.addClass("waves-effect waves-light btn");
				trigger.attr("id", "trigger");
				trigger.attr("data-target", "modal1");
				trigger
					.text("More Info")
					.css({ display: "block", margin: "auto" });
				beerContent.append(trigger);

				// function makeTable(container, data) {
				//     var table = $("<table/>").addClass('CSSTableGenerator').css("max-width", "400px");
				//     $.each(data, function(rowIndex, r) {
				//         var row = $("<tr/>");
				//         $.each(r, function(colIndex, c) {
				//             row.append($("<t"+(rowIndex == 0 ?  "h" : "d")+"/>").text(c));
				//         });
				//         table.append(row);
				//     });
				//     return container.append(table);
				// }

				// $(document).ready(function() {
				//     var data = [[beerName], //headers
				//                 [beerTagline]];
				//     var cityTable = makeTable($(document.body), data);
				// });

				$(".card").on("click", "button", function(event) {
					// var modalAdd = $("<div>");
					// modalAdd.addClass("modal1");

					// $('#modal1').modalAdd.addclass('modal modal-fixed-footer').addClass('modal-content');
					// var descriptionPtag = $("<p>");

					$("#modal1").modal("open"); //to test how it should work, use this

					// NEED TO APPEND THIS  to the Container before the beer div <div id="modal1" class="modal modal-fixed-footer">
					//   <div class="modal-content">
					//     <h4>Modal Header</h4>
					//     <p>A bunch of text</p>
					//   </div>
					//   <div class="modal-footer">
					//     <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat "><i class="material-icons">close</i>Close</a>
					//   </div>
					// </div>
				});

				//FOR MAKING INVALID INPUTS:
				// if (response.indexOf(beer) == undefined){
				// var index = response.indexOf(beer)
				// var id = response.indexOf(beer) + 1
				// $("#beer-view").text("HA this exists at id# " + response.indexOf(beer) + 1 )
				/*  <div class="row">
                    <div class="col s12 m6">
                      <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                          <span class="card-title">Card Title</span>
                          <p>I am a very simple card. I am good at containing small bits of information.
                          I am convenient because I require little markup to use effectively.</p>
                        </div>
                        <div class="card-action">
                          <a href="#">This is a link</a>
                          <a href="#">This is a link</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  */
			}
		});
	});
});
