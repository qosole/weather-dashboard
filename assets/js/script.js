var citySearch = $('.form-control');
var btnSearch = $('#search-btn');
var test = $('h1');

// Executing the search when enter is pressed
citySearch.keyup(function(event) {
    if (event.which == 13) {
        test.text('hi');
    }
});

// Executing the search when search button is pressed
btnSearch.on('click', function() {
    test.text('hi');
})
