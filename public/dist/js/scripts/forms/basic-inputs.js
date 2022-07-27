/*=========================================================================================
        File Name: basic-inputs.js
        Description: Input field js for label type
        ----------------------------------------------------------------------------------------
        Item Name: Chameleon Admin - Modern Bootstrap 4 WebApp & Dashboard HTML Template + UI Kit
        Version: 1.2
        Author: ThemeSelection
        Author URL: https://themeselection.com/
==========================================================================================*/

(function(window, document, $) {
    'use strict';
    var $html = $('html');

        //label Positions
    $(".labelUp").labelinplace();
    $(".labelDown").labelinplace({
        labelPosition: "down"
    });

    // Label Icons
    $(".labelIcon").labelinplace({
        labelArrowRight: ' <i class="icon-hand-o-right"></i> ',
        labelArrowDown: ' <i class="icon-hand-o-down"></i> ',
        labelArrowUp: ' <i class="icon-hand-o-up"></i> '
    });

    // Icons After Label
    $(".labelIconAfter").labelinplace({
        labelArrowRight: ' <i class="icon-caret-right"></i> ',
        labelArrowDown: ' <i class="icon-caret-down"></i> ',
        labelArrowUp: ' <i class="icon-caret-up"></i> ',
        labelIconPosition: "after",
        inputAttr: "id"
    });

})(window, document, jQuery);