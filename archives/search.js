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
				var beerFood = response[i].food_pairing;

				console.log('Foods are in an array ' + beerFood);
				beerFood = beerFood.toString();
				beerFood = beerFood.split(',').join(', ');

				//if we remove index, beerFood is now an array.
				//This means to diplay all foods we need a separate loop and some separate Jquery insode that loop
				//then we need to also get that into the modal, and we have packed it as a value in the data-food attribute
				//however, again, since it's an array, when you deal with it in the new modal, you may have to loop again

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
					.css("width", "300px", "float", "left"); 
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
				
				beerContent.append(cardText);
				beerCard.append(beerContent);
				var dynamicCard = $("#list-stuff");
				$("#list-stuff").append(beerCard);
				beerCard.addClass("card");
				//.addClass("col s10 m6 l3").append(beerContent).css("margin", "5px", "max-height", "350px", "min-height", "350px", "width", "30%", "overflow", "hidden", "position", "absolute", "left", "0px", "top", "0px");

								var trigger = $('<button>');
				trigger.addClass('waves-effect waves-light btn');
				trigger.attr('id', 'trigger');
				trigger.attr('data-target', 'modal1');
				trigger.text('More Info').css({ display: 'block', margin: 'auto' });
				beerContent.append(trigger);

				$('.card').on('click', 'button', function(event) {
					var dataName = $(this)
						.parent()
						.attr('data-name');
					var dataDescribe = $(this)
						.parent()
						.attr('data-describe');
					var dataAbv = $(this)
						.parent()
						.attr('data-abv');
					var dataYear = $(this)
						.parent()
						.attr('data-year');
					var dataFood = $(this)
						.parent()
						.attr('data-food');

					console.log('back of card beer ' + dataName);
					$('#modal1').modal('open');
					$('#modal-header').html(dataName);
					$('#modal-body').html(
						dataDescribe +
							' ' +
							'<hr>' +
							dataAbv +
							'%' +
							'<hr>' +
							'First Brewed on ' +
							dataYear +
							'<hr>' +
							'Goes best with ' +
							dataFood +
							'<hr>'
					);
					$('#food-input').val(dataFood);
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

				$('#find-food').on('click', function(event) {
					event.preventDefault();

					//now we've packed food array into value
					var food = $('#food-input').val();

					//loop through array to make dropdown

					food = food.toString();
					food = food.split(/[ ,]+/);

					console.log('Food carried over: ' + food);

					var proxy = 'https://cors-anywhere.herokuapp.com/';
					var queryURL = 'https://food2fork.com/api/search?key=f18f20279482aabaea4a0d26c8810819&q=' + food;

					$.ajax({
						url: proxy + queryURL,
						method: 'GET'
					}).done(function(response) {
						console.log(response);
						console.log('hi');

						var res = JSON.parse(response);
						var recipes = res.recipes;
						var count = res.count;
						console.log(count);

						if (count === 0) {
							//alert("try again")
							console.log('inside count === 0');
							var noResults = $('<div>');
							noResults.text('Try Again');
							$('#food-view').append(noResults);
						} else {
							for (var i = 0; i < recipes.length; i++) {
								var foodPublisher = recipes[i].publisher;
								var foodTitle = recipes[i].title;
								var foodSourceURL = recipes[i].source_url;
								var foodImage = recipes[i].image_url;

								// var foodDiv = $("#food-view");
								var listItem = $('<li>');
								listItem.addClass('food-item');
								listItem.append(
									'<h3>' + foodTitle + '</h3>' + '<hr>' + 'PUBLISHER: ' + foodPublisher + '<hr>'
									// + "DESCRIPTION: " + foodSourceURL + "<hr>"
								);

								var source = $('<a>');
								source.addClass('source');
								source.text('Click here to get recipes for: ' + foodTitle);
								source.attr('href', foodSourceURL);

								var image = $('<img>');
								image.addClass('food-image');
								image.attr('src', foodImage);

								listItem.append(image);
								listItem.append(source);

								$('#food-view').append(listItem);
							}
						}
					});
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
