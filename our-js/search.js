//my back up code
// $("#find-beer").on("click", function(event) {
// 	event.preventDefault();
// 	var beer = $("#beer-input").val();
// 	console.log("beer = " + beer);
//end of the 1 st part

//MIGHT USE LATER OR NAW
// if (beer === ""){
// var queryURL = "https://api.punkapi.com/v2/beers/?page=2&per_page=60&"+beer
// console.log("no beer entered but here's a random beer " + beer)
// }
// else {
// var queryURL = "https://api.punkapi.com/v2/beers/?beer_name=" + beer ;
// console.log("user chosen beer " + beer)
// }
// $.ajax({
// url: queryURL,
// method: "GET"
// }).done(function(response) {
// console.log(response);
// for (var i = 0; i < response.length; i++) {
// var beerName = response[i].name;
// var beerTagline = response[i].tagline;
// var beerDescription = response[i].description;
// var beerImage = response[i].image_url;
// var beerAbv = response[i].abv;
// var beerFood = response[i].food_pairing[0];
// var malt = response[i].ingredients.malt;
// var hops = response[i].ingredients.hops;
// var yeast = response[i].ingredients.yeast;
// var beerBrewed = response[i].first_brewed;
// var beerBrewery = response[i].withBreweries;
// var beerOrganic = response[i].isOrganic;
// var convertSearchterm = JSON.stringify(response);
// for (var j = 0; j < malt.length; j++) {
// console.log( "ingredient " + malt[i].name + "value: " + malt[i].amount.value + "unit: " + malt[i].amount.unit)
// }
// for (var k = 0; k < hops.length; k++) {
// console.log( "ingredient " + hops[i].name + "value: " + hops[i].amount.value + "unit: " + hops[i].amount.unit)
// }
// for (var m = 0; m < yeast.length; m++) {
// console.log( "ingredient " + yeast)
// }
// } //loop
// document.getElementById(response.name);
// var beerDiv= $("#beer-view").html(response.name);
// beerDiv.append( "<h3>" + "NAME: " + beerName + "</h3>" + "<hr>" +  "TAGLINE: " + beerTagline + "<hr>" +  "LABEL: " + beerImage + "<hr>" + "DESCRIPTION: " + beerDescription + "<hr>" + "ALCHOHOL CONTENT: " + beerAbv + "<hr>" +  "FOOD PAIRINGS: " + beerFood + "<hr>" + "YEAR BREWED: " + beerBrewed + "<hr>" + "BREWERY: " + beerBrewery + "<hr>" + "ORGANIC: " + beerOrganic + "<hr>" + "INGREDIENTS: " );
// $("#beer-view").html("<hr>");

// moi code
// var beerCard = $("<div>");
// var beerContent = $("<div>");
// beerContent.addClass("card-content white-text");
// var cardSpan = $("<span>");
// cardSpan.addClass("card-title"); //RESPONSE.NAME
// cardSpan.html(beer);
// beerContent.prepend(cardSpan);
// var cardText = $("<p>");
// cardText.addClass("card-text");
// cardText.append("TAGLINE HERE");
// beerContent.append(cardText);
// beerCard.append(beerContent);
// $("#dynoCard").append(beerCard);
// beerCard.addClass("card blue-grey darken-1").addClass("col s12 m6 l3");

//new
$(document).ready(function() {
	$(".modal").modal();
	    $(document).ready(function(){
      $('.parallax').parallax();
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

				// for (var j = 0; j < malt.length; j++) {
				// console.log( "ingredient " + malt[i].name + "value: " + malt[i].amount.value + "unit: " + malt[i].amount.unit)
				// }
				// for (var k = 0; k < hops.length; k++) {
				// console.log( "ingredient " + hops[i].name + "value: " + hops[i].amount.value + "unit: " + hops[i].amount.unit)
				// }
				// for (var m = 0; m < yeast.length; m++) {
				// console.log( "ingredient " + yeast)
				// }

				var beerCard = $("<div>");
				var beerContent = $("<div>");

				beerCard.addClass("card").addClass("col s12 m6 l3").css("margin", "auto");
				beerContent.addClass("card-content gray-text").css("padding", "10px");

				var cardSpan = $("<span>");
				cardSpan.addClass("card-title"); 

				var cardText = $("<p>");
				cardText.addClass("card-text");
				cardText.append("<i>" + beerTagline).css({color: "#a8a4b0", margin: "auto", padding: "5px"});
				cardSpan.html(beer);

				var cardImage = $("<img>");
				cardImage.addClass("card-image");
				cardImage.css({height: "250px", display: "block", margin: "auto", padding: "4px"});
				cardImage.attr("src", beerImage);
				beerContent.append(cardImage);

				cardSpan.addClass("card-title").text(beerName + beerTagline);
				beerContent.prepend(cardSpan);

				// var foodIcon = $("<i>").addClass("material-icons").text("add"); 
				// cardText.append(foodIcon + "Great with: " + beerFood + "<br>").attr("material-icons", "local_dining");
				
				beerContent.append(cardText)
				beerCard.append(beerContent);
				$("#dynoCard").append(beerCard);
				beerCard.addClass("card").addClass("col s12 m6 l3").append(beerContent);

				//module trigger and adding the card classes
				var trigger = $("<button>");
				trigger.addClass("waves-effect waves-light btn");
				trigger.attr("id", "trigger");
				trigger.attr("data-target", "modal1");
				trigger.text("More Info").css({
					 display: "block", margin: "auto"});
				beerContent.append(trigger);

				$(".card").on("click", "button", function(event) {
					$("#modal1").modal("open");
				});
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
