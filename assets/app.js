var topics = ["greta van fleet", "kaleo", "tool", "five finger death punch", "mitch king", "the dead south", "the civil wars", "josh garrels"];

for (var i = 0; i < topics.length; i++) {
   // $("#buttons").append("<button data-band = ' "+topics[i]+" ' class = 'newbutton'>" + topics[i] + "</button>");

    // template literals ``

    $("#buttons").append(`
    <button data-band ='${topics[i]}' class = 'newbutton'> ${topics[i]} </button>
    `);

}

$(".submit").click(function() {
    var input = $("input").val();
    $("#buttons").append("<button data-band='"+input+"'class = 'newbutton'>" + input + "</button>");
});

$(".newbutton").click(function() {
    var x = $(this).data("band");
    console.log(x);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+x+"&api_key=0Wzzyx4KXQ1EmBZXDMxaPeAiLYUtvhfC&limit=10";
    $.ajax({
        url : queryURL,
        method : "GET"
    }).then(function(response) {
        $("#bands").empty();
        for (var i = 0; i < response.data.length; i++) {
            // var bandDiv = $("<div>");
            // var p = $("<p>").text("Rating: " + response.data[i].rating);
            // var bandImage = $("<img>");
            // bandImage.attr("src",response.data[i].images.fixed_height.url);
            // bandDiv.append(p);
            // bandDiv.append(bandImage);



            var bandDiv = $(`
            <div>
            <p>Rating: ${ response.data[i].rating}</p>
            <img src="${response.data[i].images.fixed_height.url}">
            </div>
            `)
            $("#bands").append(bandDiv);
        }
    })
})


