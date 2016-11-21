(function () {

    'use strict';

    var HighLight = require('highlight.js');
    var Utils = require('./lib/utils');
    var Reveal = require('reveal.js');
    require('./style.scss');

    Reveal.initialize({
        transition:'slide',
        backgroundTransition:'zoom'
    });
    HighLight.initHighlightingOnLoad();

    module.exports = Utils;

})();
