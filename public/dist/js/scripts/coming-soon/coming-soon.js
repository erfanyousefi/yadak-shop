/*=========================================================================================
    File Name: coming-soon.js
    Description: Coming Soon
    ----------------------------------------------------------------------------------------
    Item Name: Chameleon Admin - Modern Bootstrap 4 WebApp & Dashboard HTML Template + UI Kit
    Version: 1.2
    Author: ThemeSelection
    Author URL: https://themeselection.com/
==========================================================================================*/

/*******************************
*       js of Countdown        *
********************************/

$(document).ready(function() {

    var todayDate = new Date();
    var dd = todayDate.getDate();
    var mm = todayDate.getMonth() + 1;
    var yy = todayDate.getFullYear();
    var currentDate = yy + "/" + (mm+2) + "/" + dd;

    $('#clockImage').countdown(currentDate).on('update.countdown', function(event) {
      var $this = $(this).html(event.strftime(''
        + '<div class="clockCard p-2 mr-1 mb-3 bg-cyan bg-darken-4 box-shadow-2"> <span class="font-large-3">%-w</span> <br> <p class="lead mb-0">هفته </p> </div>'
        + '<div class="clockCard p-2 mr-1 mb-3 bg-cyan bg-darken-4 box-shadow-2"> <span class="font-large-3">%d</span> <br> <p class="lead mb-0">روز </p> </div>'
        + '<div class="clockCard p-2 mr-1 mb-3 bg-cyan bg-darken-4 box-shadow-2"> <span class="font-large-3">%H</span> <br> <p class="lead mb-0">ساعت </p> </div>'
        + '<div class="clockCard p-2 mr-1 mb-3 bg-cyan bg-darken-4 box-shadow-2"> <span class="font-large-3">%M</span> <br> <p class="lead mb-0">دقیقه </h5> </div>'
        + '<div class="clockCard p-2 mb-3 bg-cyan bg-darken-4 box-shadow-2"> <span class="font-large-3">%S</span> <br> <p class="lead mb-0"> ثانیه </p> </div>'))
    });

    $('#clockFlat').countdown(currentDate).on('update.countdown', function(event) {
      var $this = $(this).html(event.strftime(''
        + '<div class="clockCard p-1"> <span class="font-large-3">%-w</span> <br> <p class="bg-transperant warning lighten-3 clockFormat lead p-1  "> هفته </p> </div>'
        + '<div class="clockCard p-1"> <span class="font-large-3">%d</span> <br> <p class="bg-transperant warning lighten-3 clockFormat lead p-1 "> روز </p> </div>'
        + '<div class="clockCard p-1"> <span class="font-large-3">%H</span> <br> <p class="bg-transperant warning lighten-3 clockFormat lead p-1 "> ساعت </p> </div>'
        + '<div class="clockCard p-1"> <span class="font-large-3">%M</span> <br> <p class="bg-transperant warning lighten-3 clockFormat lead p-1 "> دقیقه </p> </div>'
        + '<div class="clockCard p-1"> <span class="font-large-3">%S</span> <br> <p class="bg-transperant warning lighten-3 clockFormat lead p-1 "> ثانیه </p> </div>'))
    });

    $('#clockMinimal').countdown(currentDate).on('update.countdown', function(event) {
      var $this = $(this).html(event.strftime(''
        + '<div class="clockCard white p-2"> <span class="font-large-3">%-w</span> <br> <p class="lead white"> هفته </p> </div>'
        + '<div class="clockCard white p-2"> <span class="font-large-3">%d</span> <br> <p class="lead white"> روز </p> </div>'
        + '<div class="clockCard white p-2"> <span class="font-large-3">%H</span> <br> <p class="lead white"> ساعت </p> </div>'
        + '<div class="clockCard white p-2"> <span class="font-large-3">%M</span> <br> <p class="lead white"> دقیقه </p> </div>'
        + '<div class="clockCard white p-2"> <span class="font-large-3">%S</span> <br> <p class="lead white"> ثانیه </p> </div>'))
    });

    // YouTube video
    // Uncomment following code to enable YouTube background video
    if($('.comingsoonVideo').length > 0){
        $('.comingsoonVideo').tubular({videoId: 'iGpuQ0ioPrM'});
    }

    // Custom Video
    // Comment / Uncomment to show / hide your custom video. Please exchange your video name and paths accordingly.
    // var BV = new $.BigVideo({useFlashForFirefox:false});
    // BV.init();
    // BV.show([
    //     { type: "video/mp4",  src: "../../../app-assets/videos/481479901.mp4" },
    //     { type: "video/webm", src: "../../../app-assets/videos/481479901.webm" },
    //     { type: "video/ogg",  src: "../../../app-assets/videos/481479901.ogv" }
    // ]);
});
