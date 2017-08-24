(function() {
    var quotes;

    function quotesPetitioner() {
        return $.getJSON(
            './build/quotes.json'
        )
    }

    function quotesSucces(quotesResponse) {
        quotes =  quotesResponse.quotes;
        bindEvents();
    }

    function quotesFail(err) {debugger
        window.console.warn('Quotes not loaded because of an error');
    }

    function getRandomQuote() {
        return quotes[getRandomNumberBetween(quotes.length - 1)];
    }

    function getRandomNumberBetween(listSize) {
        return Math.floor(Math.random() * (listSize - 0 + 1))
    }

    function setRandomQuote() {
        $('.quote').text(getRandomQuote());
    }

    function start() {
        var petitioner = quotesPetitioner();

        $.when(petitioner)
            .done(quotesSucces)
            .fail(quotesFail);

        $.ajax({async: false});
    }

    function bindEvents() {
        $('.another-cta').on('click', setRandomQuote);
        setRandomQuote();
    }

    start();
}())