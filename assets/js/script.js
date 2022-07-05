var citySearch = $('.form-control')
var test = $('h1');

// Executing the search when enter is pressed
citySearch.keyup(function(event) {
    if (event.which == 13) {
        test.text('hi');
    }
});

