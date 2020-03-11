var topics = ["greta van fleet", "kaleo", "tool", "metallica", "mitch king", "the dead south", "the civil wars", "josh garrels"];

for (var i = 0; i < topics.length; i++) {
   $("#buttons").append("<button data-band = ' " + topics[i] + " ' class = 'newbutton'>" + topics[i] + "</button>");
}

$(".submit").on("click", function() {
    var input = $("input").val().trim();
    $("#buttons").append("<button data-band='"+ input +"'class = 'newbutton'>" + input + "</button>");
    topics.push(input);
})

$(document).on("click", ".newbutton", function() {
    var x = $(this).data("band");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+x+"&api_key=0Wzzyx4KXQ1EmBZXDMxaPeAiLYUtvhfC&limit=10";
    $.ajax({
        url : queryURL,
        method : "GET"
    }).then(function(response) {
        $("#bands").empty();
        for (var i = 0; i < response.data.length; i++) {
                var bandDiv = $("<div>");
                var p = $("<p>").text("Rating: " + response.data[i].rating);
                var bandImage = $("<img class = 'gif'>");
                bandImage.attr("src", response.data[i].images.fixed_height_still.url);
                bandImage.attr("data-animate", response.data[i].images.fixed_height.url);
                bandImage.attr("data-still", response.data[i].images.fixed_height_still.url);
                bandImage.attr("data-state", "still");
                bandDiv.append(bandImage);
                $("#bands").append(bandDiv).append(p); 
        }
    })
})

$(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
})    