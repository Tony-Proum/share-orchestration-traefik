(function () {

    'use strict';

    var Reveal = require('reveal.js');

    module.exports = {
        goToSlide: function (number) {
            Reveal.slide(number);
        }
    };

})();