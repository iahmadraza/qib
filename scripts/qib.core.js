// qib.core.js
(function ($) {
    var filePath = "../styles/qib.main.ie.css";
    // var filePath = "assets/css/qib.main.css";
    //IE fixes.
    if (navigator.userAgent.match(/msie/i) || navigator.userAgent.match(/trident/i) || navigator.userAgent.match(/edge/i)){
        ie1011fix();
        loadCssInIE();
    }

    //ios global navigation more menu
    $('body').on('click', 'nav.ios-global-nav .lst-ios-nav li a.initem-more', function () {
        if ( !$(this).hasClass('iosmore-active') ) {
            $(this).addClass('iosmore-active');
            $('div.ios-nav-morelist').addClass('ioslist-active');
        } else {
            $(this).removeClass('iosmore-active');
            $('div.ios-nav-morelist').removeClass('ioslist-active');
        }
    });

    //global navigation
    $('body').on('click', 'header.global-header a.btn-global-nav', function () {
        $('body').addClass('bglnav-active');
    });
    $('body').on('click', 'div.nav-overlay, div.header-overlay', function () {
        $('body').removeClass('bglnav-active');
    });
    $(window).on('resize', function (e) {
        if ( $(window).width() > 992 ) {
            $('body').removeClass('bglnav-active');
        }
    });

   //close alert message
   $('body').on('click', 'div.alert-message a.alert-close', function (e) {
        setTimeout(function () {
            $( 'div.alert-messages' ).find( '.alert-message' ).removeClass( 'alert-showing' );
        }, 300);
        setTimeout( function () {
            $( 'div.alert-messages' ).html( '' );
        }, 500 );
    });

    //menu tabs tertiary
    $('body').on('click', 'div.menu-tabs ul.lst-menu-tabs>li>a', function () {
        if ( !$(this).hasClass('tab-selected') ) {
            var seltabindex = $(this).parent('li').index();
            $(this).closest('div.menu-tabs').find('ul.lst-menu-tabs>li>a').removeClass('tab-selected');
            $(this).closest('div.menu-tabs').find('div.menutabs-content').removeClass('showing');
            $(this).addClass('tab-selected');
            $(this).closest('div.menu-tabs').find('div.menutabs-content').eq(seltabindex).addClass('showing');
        }
    });

    //spacer for fixed header/footer
   var glhheight = $('header.global-header.sticky-header').height(),
       // glfheight = $('footer.global-footer.sticky-footer').height(),
       gliosfooter = $('nav.ios-global-nav').height();
   // pageContainerSpacing(glhheight, glfheight, gliosfooter);
   pageContainerSpacing(glhheight, gliosfooter);

   //on window resize
   $(window).on('resize', function (e) {
       var glhheightr = $('header.global-header.sticky-header').height(),
           // glfheightr = $('footer.global-footer.sticky-footer').height(),
           gliosfooterr = $('nav.ios-global-nav').height();
       // pageContainerSpacing(glhheightr, glfheightr, gliosfooterr);
       pageContainerSpacing(glhheightr, gliosfooterr);
   });

    //Password strength meter
    var options = {
        onLoad: function () {
            $("#pwd-message").text("Security of the password is: ");
        },
        onKeyUp: function (evt) {
           if(evt.target.value.length > 0){
               $(evt.target).pwstrength("outputErrorList");
           }
           else{
            $(evt.target).siblings('.progress').find('.bar').css("width","0%");
            $(evt.target).siblings("ul.error-list").remove();
            $(evt.target).siblings(".password-verdict").css("color","#898989").html("Please enter password");
           }
       }
    };
    $('#validatePwd').pwstrength(options);

    /* -- form control for input password in Change Password page */
    $( 'body' ).on( 'keypress', 'div.form-controller input', function ( e ) {
        if ( $( this ).parent().hasClass( 'success' ) ) {
            $( this ).parent().removeClass( 'success' );
        }
    } );
})(jQuery); //document ready complete

// calculate spacing for fixed header/footer with container
function pageContainerSpacing (hh, iosf) {
/*if( $('nav.ios-global-nav:visible').length === 0 ) {
    iosf = 0;
}
$('div.page-container').css({
    'padding-top': 15 + hh + 'px',
    'padding-bottom': 15 + iosf + 'px'
});*/

// //adjsuting height as per header and footer
// var hh_ht = $(".global-header").height();
// var ff_ht = $(".global-footer").height();

// $('div.page-container').height($(window).height() - hh_ht - ff_ht - 30);
// console.log($('div.page-container').height());
}

//Alerts
var autoCloseToast, emptyToast;
function showAlertMessage ( alertHeading, alertMessage, alertType, autoDismiss ) {
    clearAutoCloseToast();clearEmptyToast();
    $( 'div.alert-messages' ).remove();
    var dismissDuration = 5000;

    if ( typeof alertType === "undefined" || alertType === null )
        alertType = 'error';
    if ( typeof autoDismiss === "undefined" || autoDismiss === null )
        autoDismiss = false;
    //var messageHTML = '<div class="msg-toast msg-'+ messageType +'"><em>'+ messageText +'</em></div>';
    var messageHTML = '<div class="alert-message '+ alertType +'">'
                    + '<span></span>'
                    + '<a href="javascript:;" class="alert-close">x</a>'
                    + '<h5>' + alertHeading + '</h5>'
                    + '<p>' + alertMessage + '</p>'
                    + '</div>';
    $( 'body' ).append( '<div class="alert-messages"></div>' );
    $( 'div.alert-messages' ).html( messageHTML );
    setTimeout( function () {
        $( 'div.alert-messages' ).find( '.alert-message' ).addClass( 'alert-showing' );
    }, 300 );
    autoDismiss= false;
    if ( autoDismiss ) {
        autoCloseToast = setTimeout( function () {
            $( 'div.alert-messages' ).find( '.alert-message' ).removeClass( 'alert-showing' );
        }, dismissDuration );
        emptyToast = setTimeout( function () {
            $( 'div.alert-messages' ).html( '' );
        }, dismissDuration + 400 );
    }
}
function clearAutoCloseToast () {
clearTimeout( autoCloseToast );
}
function clearEmptyToast () {
clearTimeout( emptyToast );
}

function createGlanceCarousel() {
    // dashboard amount carousel
    $('.glance-carousel').owlCarousel({
        loop: false,
        margin: 10,
        responsiveClass: true,
        responsive: {
            0: {
                items: 2,
                nav: true,
                dots: true
            },
            600: {
                items: 3,
                nav: false,
                dots: true
            },
            1000: {
                items: 4,
                nav: true,
                loop: false,
                dots: false,
            }
        }
    });
  
}
 


function quickPaymentCarousel() {
    // quick payment carousel
    $('.quick-pmt-carousel').owlCarousel({
        loop: false,
        margin: 10,
        responsiveClass: true,
        responsive: {
            0: {
                items: 3,
                nav: true,
                dots: true
            },
            600: {
                items: 4,
                nav: false,
                dots: true
            },
            1000: {
                items: 4,
                nav: true,
                loop: false,
                dots: false
            }
        }
    });
}

function upcomingPaymentCarousel() {
    // upcoming payment carousel
    $('.upcoming-pmt-carousel').owlCarousel({
        loop: false,
        margin: 10,
        responsiveClass: true,
        responsive: {
            0: {
                items: 2,
                nav: true,
                dots: true
            },
            600: {
                items: 2,
                nav: false,
                dots: true
            },
            1000: {
                items: 3,
                nav: true,
                loop: false,
                dots: false
            }
        }
    });
}

$(".show-pwd").on('click',function(){
    if($(this).siblings("input").attr('type')=='password') {
     //   if($(this).siblings("input").val() !== ""){
            $(this).siblings("input").attr('type','text');
            $(this).addClass("showing");
          //  $(this).find('i').removeClass('fa-eye').addClass('fa-eye-slash');
      //  }
    }
    else {
        $(this).siblings("input").attr('type','password');
        $(this).removeClass("showing");
      //  $(this).find('i').addClass('fa-eye').removeClass('fa-eye-slash');
    }
});

/* -- form control for input password in Login tab */
$( 'body' ).on( 'focus', 'div.ux-input .input-group input', function ( e ) {
    if ( !$( this ).parent().parent().hasClass( 'control-active' ) ) {
        $( this ).parent().parent().addClass( 'control-active' );
    }
});
$( 'body' ).on( 'blur', 'div.ux-input .input-group input', function ( e ) {
    $( this ).parent().parent().removeClass( 'control-active' );
    if($( this ).parent( 'div.ux-input' ).hasClass('control-complete')){
        if($( this ).val().length == 0){
            $( this ).parent().parent().removeClass( 'control-complete' );
        }
    }
    else{
        if($( this ).val().length != 0){
            $( this ).parent().parent().addClass( 'control-complete' );
        }
    }
});

/* -- form control for input password in Login tab */
$( 'body' ).on( 'focus', 'div.ux-input input', function ( e ) {
    if ( $( this ).parent().hasClass( 'control-complete' ) ) {
        $( this ).parent().removeClass( 'control-complete' );
    }
    if ( !$( this ).parent().hasClass( 'control-active' ) ) {
        $( this ).parent().addClass( 'control-active' );
    }
});
$( 'body' ).on( 'blur', 'div.ux-input input', function ( e ) {
    $( this ).parent().removeClass( 'control-active ' );
    if($( this ).parent( ).hasClass('control-complete')){
        if($( this ).val().length == 0){
            $( this ).parent().removeClass( 'control-complete' );
        }
    }
    else{
        if($( this ).val().length != 0){
            $( this ).parent().addClass( 'control-complete' );
        }
    }
});

/* Datepicker in registration */
$("a.calender").on("click",function(){
    $("#datepicker").focus();
    if ( $(window).width() > 992 ){
     //   $("#ui-datepicker-div table.ui-datepicker-calendar").width($(".login-container .form-controller input#datepicker").width() +13+ "px");
     //   $("#ui-datepicker-div ").width($(".login-container .form-controller input#datepicker").width() +13 + "px");
    }
    else{
        $("#ui-datepicker-div ").width($(".login-container .form-controller input#datepicker").width()  + "px");
        var parentDatePickerWidth = $(".login-container .form-controller input#datepicker").width();
        $("#ui-datepicker-div table.ui-datepicker-calendar").width(parentDatePickerWidth  + "px");
    }
});
    $( "#datepicker" ).datepicker({
      dateFormat: "dd/mm/yy",
      changeYear: true,
      changeMonth: true,
      yearRange: "-100:+0",
      maxDate: new Date(),
    //    onSelect: function(dateText) {
    //     $(this).parent().addClass("success");
    //    }
    beforeShow: function (input, inst) { /* This enables the datepicker come up always below the input field. */
        setTimeout(function () {
            inst.dpDiv.css({
                top: $("#datepicker").offset().top + 35,
                left: $("#datepicker").offset().left
            });
        }, 0);
    }
    });

    /*Hide face and touch login on registration tab*/
    $("a.tab-register").on("click", function(){
        $(".login-types").removeClass("d-block d-sm-block d-md-block").css("display", "none");
        $(".footer-nav ").css("display", "none");
    });
    $("a.tab-login").on("click", function(){
        $(".login-types").addClass("d-block d-sm-block d-md-block").css("display", "block");
        $(".footer-nav ").css("display", "block");
    });

function ie1011fix () {
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);
    // Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E)
    /* toggle switch fix */
    $('label.toggle').children('input').css({'opacity':'0'});
    $('label.toggle').append("<span></span>"); //adds style for toggle switch

    //checkbox fix
    $('.custom-checkbox label').children('input').css({'opacity':'0'});
    $("<span class='spanbox'></span>").insertAfter('.custom-checkbox label input'); //adds style for checkbox in IE
}

function loadCssInIE(){
    var filePath = "styles/qib.main.ie.css";
    $("<link/>", {
        rel: "stylesheet",
        type: "text/css",
        href: filePath
     }).appendTo("head");
}

//AUTHENTICATION PAGE
var mPINEntering = [];
   function getmPINEntered() {
       if (mPINEntering.length == 6) {
        //   alert('Your Entered PIN is = ' + mPINEntering);
       } else {
         //  alert('please fill all 6');
       }
   }

    // numeric keypad script start
   //mPIN 4 digit - 4 input
   $('div.mpin-digits input:first').focus();
   $('body').on('keypress', 'div.mpin-digits input[type=password]', function (e) {
      // console.log('input = ' + e.which);
       // if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
       var keycode =  e.keyCode ? e.keyCode : e.which;
       if (keycode != 0 && (keycode < 48 || keycode > 57)) {
           return false;
       } else {
           var inputs = $(this).closest('div.mpin-digits').find(':input');
           inputs.eq(inputs.index(this) + 1).focus();
       }
       if (keycode == 8) {
           $(this).val('');
           var inputs = $(this).closest('div.mpin-digits').find(':input');
           inputs.eq(inputs.index(this) - 1).focus();
       }
   });

   $('body').on('click', 'div.btn-mpin-numbers button.btn-mpin-number', function(e) {
       if (mPINEntering.length == 6) {
         //  alert('mPINEntering DONE = ' + mPINEntering);
           $('.otp-field').parent().addClass("success");
       } else {
           mPINEntering.push($(this).html());
           $('.otp-field').val(mPINEntering.join(''));
           $('.otp-field').focus();
           //$('div.mpin-dots-line div.mpin-dot-' + mPINEntering.length).addClass('dot-filled');
           if (mPINEntering.length == 6){
              // $('div.mpin-dots-line').removeClass("input-active").addClass("input-success");
              $('.otp-field').parent().addClass("success");
           }
           else{
            $('.otp-field').focus();
            //    if(!$('div.mpin-dots-line').hasClass("input-active")){
            //        $('div.mpin-dots-line').addClass("input-active");
            //    }
           }

       }
   });
   $('body').on('click', 'div.btn-mpin-numbers div div button.btn-mpin-fill.btn-mpin-clear', function(e) {
       if (mPINEntering.length == 0) {
         //  alert('ALL CLEARED');
           if($('.otp-field').parent().hasClass("success")){
            $('.otp-field').parent().removeClass("success");
            $('.otp-field').focus();
           }
        //    else if($('div.mpin-dots-line').hasClass("input-active")){
        //        $('div.mpin-dots-line').removeClass("input-active");
        //    }
       } else {
          // $('div.mpin-dots-line div.mpin-dot-' + mPINEntering.length).removeClass('dot-filled');
           mPINEntering.pop();
           $('.otp-field').val(mPINEntering.join(''));

           if (mPINEntering.length == 0){
               if($('.otp-field').parent().hasClass("success")){
                $('.otp-field').parent().removeClass("success");
               }
           }
           else{
            //    if($('div.mpin-dots-line').hasClass("input-success")){
            //        $('div.mpin-dots-line').removeClass("input-success");
            //        $('div.mpin-dots-line').addClass("input-active");
            //    }
            $('.otp-field').parent().removeClass("success");
            $('.otp-field').focus();
           }
       }
      // console.log($('.otp-field').val());
   });

   //The following function clears all dots from input from OTP field
   function clearAll(){
    $('.otp-field').val('');
    if($('.otp-field').parent().hasClass("success")){
        $('.otp-field').parent().removeClass("success");
       }
    //$('div.mpin-dots-line').find('.mpin-dot').removeClass('dot-filled');
   }


   $('body').on('click', 'div.btn-mpin-numbers button.btn-mpin-fill.btn-checknow', function(e) {
       getmPINEntered();
   });

   // numeric keypad script end

   /* My Accounts */
   // my account main carousel
function myaccAccountCarosel () {
    $('div.wc-accountlist').owlCarousel({
        margin: 20,
        nav: true,
        responsive :{
            0:{
                items:1
            },
            600:{
                items: 2
            },
            1000:{
                items: 3
            },
            1400:{
                items: 4
            }
        }
    });
}

function sideModalAccount () {    /* -- side modal account */
    $( 'body' ).on( 'click', 'a.btn-viewallacc, a.btn-viewallacc-sm', function () {
        $( 'div#sm-accountlist' ).show(1);
        $( 'div#sm-accountlist' ).addClass( 'sidemodal-showing' );
        $( 'body' ).addClass( 'bsm-active' );
    });
    $( 'body' ).on( 'click', 'div#sm-accountlist a.btn-smclose', function () {
        $( 'div#sm-accountlist' ).removeClass( 'sidemodal-showing' ).hide();
        $( 'body' ).removeClass( 'bsm-active' );
    });
}

function displayYearlyStatement() {    /* -- side modal account */
    $( 'body' ).on( 'click', 'button.btn-detail-stmt, button.btn-detail-stmt-sm', function () {
        $( 'div#sm-statement' ).show(1);
        $( 'div#sm-statement' ).addClass( 'sidemodal-showing' );
        $( 'body' ).addClass( 'bsm-active' );
        /* The following enables to change year with previous and next arrows. */
        $('div.datepicker-div input').monthpicker();
        $("body.bsm-active .ui-datepicker").css("width", $('div.datepicker-div input').width() + "px");
//$('div#year-stmt .month-picker .month-picker-header .month-picker-year-table .month-picker-previous a').removeClass("ui-state-disabled");

    });
    $( 'body' ).on( 'click', 'div#sm-statement a.btn-smclose', function () {
        $( 'div#sm-statement' ).removeClass( 'sidemodal-showing' );
        $( 'body' ).removeClass( 'bsm-active' );
    });
}

function showAccDetails(){
    $('body').on('click','#sm-accountlist .account-card', function(){
        $(this).parent().children('.account-card').removeClass('selected-account');
        if(!$(this).hasClass('selected-account')){
            $(this).addClass('selected-account');
        }
        else{
            $(this).removeClass('selected-account');
        }
    } );
}

    $('body').on('click','#sm-cardlist div.all-cards-list .credit-card', function(){
        $(this).parent().parent().parent().find('.credit-card').removeClass('acard-selected');
        if(!$(this).hasClass('acard-selected')){
            $(this).addClass('acard-selected');
        }
        else{
            $(this).removeClass('acard-selected');
        }
    } );

function selectAccount(){
    $( 'body' ).on( 'click', 'div.no-info, div.edit-transfer-account', function () {
        if($(this).hasClass('no-info')){
            $(this).removeClass('no-info');
        }
        $( 'div#sm-transfer-to-acc' ).show(1);
        $( 'div#sm-transfer-to-acc' ).addClass( 'sidemodal-showing' );
        $( 'body' ).addClass( 'bsm-active' );
    });
    $( 'body' ).on( 'click', 'div#sm-transfer-to-acc a.btn-smclose', function () {
        $( 'div#sm-transfer-to-acc' ).removeClass( 'sidemodal-showing' ).hide();
        $( 'body' ).removeClass( 'bsm-active' );
    });
}

$( 'body' ).on( 'click', 'div#sm-transfer-to-acc a.account-card', function () {
    $(this).parent().children('a.account-card').removeClass('selected-account');
    if(!$(this).hasClass('selected-account')){
        $(this).addClass('selected-account');
    }
    else{
        $(this).removeClass('selected-account');
    }
});

function shareAccountInfo(){
    $( 'div#share-acc-info' ).show(1);
            $( 'div#share-acc-info' ).addClass( 'receiptmodal-showing' );
            $( 'body' ).addClass('brm-active');
}

$('div#share-acc-info a.btn-rm-close').on('click', function () {
            $( 'div#share-acc-info' ).removeClass( 'receiptmodal-showing' );
            $( 'body' ).removeClass('brm-active');
        });

 // account card selected class add remove
 $('body').on('click', 'div.owl-carousel a.account-card', function (e) {
    if ( !$(this).hasClass('acard-selected') ) {
        $(this).closest('div.owl-stage-outer').find('a.account-card').removeClass('acard-selected');
        $(this).addClass('acard-selected');
    }
});

//Dashboard
$('.rm-contact').on('click', function(){
    $("#rm-card").show(1);
    $('#loader').fadeOut(2000);
    $('#loader-overlay1').fadeOut(2000);
});

$('.close-card').on('click', function(){
    $("#rm-card").hide(1);
});


/* -- on window scroll */
$( window ).on( 'scroll', function ( e ) {
    // console.log( '$( window ).scrollTop() = ' + $( window ).scrollTop() );
    if ( $( window ).scrollTop() > 10 ) {
        $( 'header.global-header' ).addClass( 'tiny-header' );
    } else {
        $( 'header.global-header' ).removeClass( 'tiny-header' );
    }
});

 
 

// $('#monthpicker').MonthPicker({Disabled: false, MaxMonth:0, SelectedMonth:0, StartYear:2020 });

//Settings in Dashboard
/* -- global header items - user settings popup show/hide */
$( 'body' ).on( 'click', 'div.header-items ul.lst-header-items li a.hsettings', function ( e ) {
    if ( !$( this ).parent().hasClass( 'item-selected' ) ) {
        $( this ).parent().addClass( 'item-selected' );
        $( this ).next().find(".lst-user-settings li a").css("display","block");
        $( this ).next().addClass( 'showing' ).css("z-index","100");
        $("header.global-header .in-global-header .page-header").css("z-index","99");
    }
    else {
        $( this ).parent().removeClass( 'item-selected' );
        $( this ).next().removeClass( 'showing' ).css("z-index","99");
        $( this ).next().find(".lst-user-settings li a").css("display","none");
        $("header.global-header .in-global-header .page-header").css("z-index","100");
    }
    e.stopImmediatePropagation();
} );

$('body').click( function() {
    $( ' div.header-items ul.lst-header-items li a.hsettings ' ).parent().removeClass( 'item-selected' );
    $( ' div.header-items ul.lst-header-items li a.hsettings ' ).next().find(".lst-user-settings li a").css("display","none");
        $( ' div.header-items ul.lst-header-items li a.hsettings ' ).next().removeClass( 'showing' ).css("z-index","99");
        $("header.global-header .in-global-header .page-header").css("z-index","100");

         if($(".lst-global-navigation li.more-link-li  ul.lst-global-submenu").is(":visible")){
             $(".lst-global-navigation li a.more-link").removeClass('item-selected');
		 	$('i.arrow, .lst-global-submenu').hide();
         }
});

//Send money
$( 'body' ).on('click', 'img.clearImg', function(e){
    $(this).siblings('input').val("");
});

//Cards
function mycardCarousel () {
    $('div.wc-cardlist').owlCarousel({
         margin: 20,
        nav: true,
        
        responsive : {
            0: {
                items:1
            },
            650: {
                items: 2
            },
            1000: {
                items: 3
            },
            1400: {
                items: 3
            }
        }
    });
}

 // credit/debit card selected class add remove
 $('body').on('click', 'div.owl-carousel a.credit-card', function (e) {
    if ( !$(this).hasClass('acard-selected') ) {
        $(this).closest('div.owl-stage-outer').find('a.credit-card').removeClass('acard-selected');
        $(this).addClass('acard-selected');
    }
});

function sideModalCards () {
    /* -- side modal account */
    $( 'body' ).on( 'click', 'a.btn-viewallcards, a.btn-viewallcards-sm', function () {
        $( 'div#sm-cardlist' ).show(1);
        $( 'div#sm-cardlist' ).addClass( 'sidemodal-showing' );
        $( 'body' ).addClass( 'bsm-active' );
    });
    $( 'body' ).on( 'click', 'div#sm-cardlist a.btn-smclose', function () {
        $( 'div#sm-cardlist' ).removeClass( 'sidemodal-showing' ).hide();
        $( 'body' ).removeClass( 'bsm-active' );
    });
}

//Show debit ard pin
$('body').on('click', 'div.card-details ul.lst-cards li .account-info a.show-card-pin', function (e) {
    var pinText = $(this).text();
    if(pinText == "Show PIN"){
        $(this).text("Hide PIN");
        $(this).next().text("123456789");
    }
    else{
        $(this).text("Show PIN");
        $(this).next().text("x x x x");
    }
});

$("div.mb-card-info").on('click', 'a.show-card-pin', function (e) {
    var pinText = $(this).text();
    if(pinText == "Show PIN"){
        $(this).text("Hide PIN");
        $("div.mb-card-info").find(".hidden-pin").text("123456789");
    }
    else{
        $(this).text("Show PIN");
        $("div.mb-card-info").find(".hidden-pin").text("x x x x");
    }
});

//Notifications side-modal
function showNotification () {
    $( 'body' ).on( 'click', 'a.view-notification', function () {
        $( 'div#sm-notifylist' ).show(1);
        $( 'div#sm-notifylist' ).addClass( 'sidemodal-showing' );
        $( 'body' ).addClass( 'bsm-active' );
        $(' div.header-items ul.lst-header-items li a.hsettings').parent().removeClass('item-selected');
        $( ' div.header-items ul.lst-header-items li a.hsettings' ).next().removeClass( 'showing' );

    });
    $( 'body' ).on( 'click', 'div#sm-notifylist a.btn-smclose', function () {
        $( 'div#sm-notifylist' ).removeClass( 'sidemodal-showing' ).hide();
        $( 'body' ).removeClass( 'bsm-active' );
    });
}

//selecting card in carousel on swiping
var drag='';

function creditCardSelection () {
    $('div.wc-cardlist').on('changed.owl.carousel', function (e) {
      $(".owl-carousel.owl-drag .owl-item .item>a.credit-card").removeClass("acard-selected");
      $('div.wc-cardlist').trigger('to.owl.carousel', [3, 10]);
      $(this).find('.owl-item').eq(e.item.index).find('.item>a').addClass('acard-selected');
      // card active add remove class mobile view end
  });
}

function accountCardSelection(){
    $('div.wc-accountlist').on('changed.owl.carousel', function (e) {
        $(".owl-carousel.owl-drag .owl-item .item>a.account-card").removeClass("acard-selected");
      //  $('div.wc-cardlist').trigger('to.owl.carousel', [3, 10]);
        $(this).find('.owl-item').eq(e.item.index).find('.item>a').addClass('acard-selected');
        // card active add remove class mobile view end
    });
}

function chkWindow () {
  if($(window).width() <= 650){
    creditCardSelection();
    accountCardSelection();
  }
}

//open update profile modal
//update-profile-image
$('a.editProfile').on('click', function () {
    $( 'div#update-profile-image' ).show(1);
    $( 'div#update-profile-image' ).children(".rm-icon").show();
    $( 'div#update-profile-image' ).addClass( 'receiptmodal-showing' );
    $( 'body' ).addClass('brm-active');
});
$('div#update-profile-image a.btn-rm-close').on('click', function () {
    $( 'div#update-profile-image' ).children(".rm-icon").hide();
    $( 'div#update-profile-image' ).removeClass( 'receiptmodal-showing' );
    $( 'body' ).removeClass('brm-active');
});

//Beneficiaries
$('body').on('click', 'a.beneficiary-card', function(){
    if ( !$(this).hasClass('bcard-selected') ) {
        $(this).parents('div.benef-list').find('.beneficiary-card').removeClass('bcard-selected');
        $(this).addClass('bcard-selected');
    }
});

$( 'div.add-new-benef-info' ).on( 'click', '.editBenefInfo', function () {
    $(this).hide();
 //  $('div.add-new-benef-info ').children('.form-controller').find('input').removeAttr("disabled");
   $('div.add-new-benef-info  .updateBenefInfo').show();
   $('div.add-new-benef-info  .cancelEditBenefInfo').show();
   $('div.add-new-benef-info  .deleteBenefInfo').hide();
});

$( 'div.add-new-benef-info' ).on( 'click', '.cancelEditBenefInfo', function () {
    $(this).hide();
   //$('#sm-view-benef-details .sidemodal-content div.view-benef-info').children('.form-controller').find('input').attr("disabled", "disabled");
   $('div.add-new-benef-info .updateBenefInfo').hide();
   $('div.add-new-benef-info  .editBenefInfo').show();
   $('div.add-new-benef-info  .deleteBenefInfo').show();
});

$( 'div.add-new-benef-info' ).on( 'click', '.updateBenefInfo', function () {
    $(this).hide();
   // $('div.add-new-benef-info .sidemodal-content div.view-benef-info').children('.form-controller').find('input').attr("disabled", "disabled");
    showAlertMessage ( "Success", "Beneficiary updated successfully!", 'success', true );
    $('div.add-new-benef-info  .editBenefInfo').show();
    $('div.add-new-benef-info  .deleteBenefInfo').show();
    $('div.add-new-benef-info .cancelEditBenefInfo').hide();
    //$( 'div#sm-view-benef-details' ).removeClass( 'sidemodal-showing' );
  //  $( 'body' ).removeClass( 'bsm-active' );
});

//Close side-modal on click anywhere outside modal
$('.sidemodal-overlay').on('click', function(){
    if($(this).parent().attr("id") == "sm-send-new-message"){
      //  $( 'div#check-discard-message' ).show(1);
      //  $( 'div#check-discard-message' ).addClass( 'receiptmodal-showing' );
      //  $( 'body' ).addClass('brm-active');
    }
    else{
        $(this).parent().removeClass("sidemodal-showing");
        $('body').removeClass("bsm-active");
    }
});

$('div#check-discard-message a.btn-rm-close').on('click', function () {
    $( 'div#check-discard-message' ).removeClass( 'receiptmodal-showing' );
    $( 'body' ).removeClass('brm-active');
});

function discardNewMessage(){
    $( 'div#check-discard-message' ).removeClass( 'receiptmodal-showing' );
    $( 'body' ).removeClass('brm-active');
    $("div#sm-send-new-message").removeClass("sidemodal-showing");
    $('body').removeClass("bsm-active");
}

$('div#check-discard-message a.cancelDiscard').on('click', function () {
    $( 'div#check-discard-message' ).removeClass( 'receiptmodal-showing' );
    $( 'body' ).removeClass('brm-active');
});

//Equal height of both div on accounts page
$(".acc-details").height($("div.recent-tr").height() + "px");
$(".card-banner").height($("div.card-details").height() + "px");
$(".dashboard-activities").height($("div.quick-payment").height() + "px");

//Open message in inbox - mobile version
function openMessage(){
    $(".secured-msg-div").on("click", function(){
        $(".menutabs-container").find(".secured-msg-div").removeClass("opened-msg");
        if($(this).hasClass("unread-msg")){
            $(this).removeClass("unread-msg");
        }
        $(this).addClass("opened-msg");
        if ( $(window).width() < 992 ){
            $(".msg-detail-part").parent().removeClass("d-none d-lg-block");
            $(".msg-detail-part").prev().show();
            $(".msg-detail-part").show();

            $(".msg-detail-part .close-mg-details").show();
            $(".msg-detail-part").show().css({
          //  'opacity' : 1,
            'background-color': '#fff',
            'position': 'fixed',
            'top': 0,
            'width': '95%',
            'height': "98%",
            'overflow':'auto',
           // 'margin':'9px auto',
            'z-index': 1065});
        }
    });

    $(".close-msg-details").on("click", function(){
      //  $(".menutabs-container").find(".secured-msg-div").removeClass("opened-msg");
        $(".msg-detail-part").prev().hide();
        $(".msg-detail-part").parent().addClass("d-none d-lg-block");
        $(".msg-detail-part").hide();
        $(".msg-detail-part").css({
            'background-color': '#fff',
            'position': 'relative',
            'top': 0,
           // 'left': 0,
            'width': 'auto',
            'margin':'9px auto',
            'z-index': 'inherit'});

            $(window).on('resize', function (e) {
                if ( $(window).width() > 992 ) {
                    $(".inbox-page .msg-detail-part").parent().addClass("d-none d-lg-block");
                    $(".msg-detail-part").show();
                }
                // else{
                //     $(".inbox-page .menutabs-container").find(".secured-msg-div").removeClass("opened-msg");
                // }
            });
    });
}

$(window).on('resize', function (e) {
    if ( $(window).width() > 992 ) {
        $(".inbox-page .msg-detail-part").parent().addClass("d-none d-lg-block");
    }
});

//Write new message in modal
function writeNewMessage(){
    $( 'body' ).on( 'click', 'button.write-new-message', function () {
        $( 'div#sm-send-new-message' ).show(1);
        $( 'div#sm-send-new-message' ).addClass( 'sidemodal-showing' );
        $( 'body' ).addClass( 'bsm-active' );
    });
    $( 'body' ).on( 'click', 'div#sm-send-new-message a.btn-smclose', function () {
        $( 'div#check-discard-message' ).show(1);
        $( 'div#check-discard-message' ).addClass( 'receiptmodal-showing' );
        $( 'body' ).addClass('brm-active');
      //  $( 'div#sm-send-new-message' ).removeClass( 'sidemodal-showing' );
      //  $( 'body' ).removeClass( 'bsm-active' );
    });
}

//Add reply box in message details
function sendReply(){
$(".inbox-page a.printMessage").hide();
$(".inbox-page a.cancelReply").show();
var reply_area = document.createElement("textarea");
var attachFileInReply = "<div class='row'><div class='col-11 col-lg-5 col-md-5'><div class='form-controller'>" + "<label>Attachment</label> <input type='file' id='replyfileinput'/>" +
                        "<input type='text' placeholder='Upload file' class='hide-file-input'>" +
                        "<span>You can upload JPEG, PDF, or TEXT files.</span> <p class='show-uploaded-file' id='selected_filename_reply'></p></div></div></div>" ;
$(reply_area).addClass("write-reply");
$("div.msg-detail-part div.latest-msg").prev().find("div.reply-section").append("<div class='col-12'><div class='reply_parent'></div></div>");
$("div.msg-detail-part div.latest-msg").prev().find(".reply_parent").append(attachFileInReply).append(reply_area);
$("div.msg-detail-part .md-part-heading .linkbutton.replybutton").hide();
$("div.msg-detail-part .md-part-heading .sendMessage").show();
}

//Upload files in new message - inbox
function uploadFile(){
    $(document).on("focus", "input.hide-file-input", function(){ // if text input is used to hide file input
        $(this).prev().focus();
    });

    $(document).on("change", "input[type=file]", function(){
        var attached_file = $(this)[0].files[0].name.substring(0, 80);
        $(this).next().addClass("file-uploaded");
        $(this).next().find("span").html(attached_file + "<a href='javascript:;' class='remove-file' title='Remove'><img src='images/icon/close_search.png'></a>"); //+ );
        //$(this).siblings("p.show-uploaded-file").html(attached_file + "<a href='javascript:;' class='remove-file' title='Remove'><img src='images/icon/close_search.png'></a>");
    });

}

function removeFile(){
    $(document).on("click", "a.remove-file", function(){
        var file_input = $(this).parent().parent().find("input[type=file]");
        file_input.replaceWith(file_input.val('').clone(true));
    $(this).parent().html("");
    });
}

$(document).on("click", "div.alert.alert-dismissible .close", function(){
    if($(this).parent().hasClass("show")){
        $(this).parent().removeClass("show");
    }
});

function countCharacters(){
    $('textarea.new-message').keyup(function() {
        var length = $(this).val().length;
        var mLength = $(this).attr("maxlength");
        var allowed_length = mLength-length;
        $(this).prev().find("span.char-limit span").text(allowed_length);
        // if(allowed_length < 11){
        //     $(this).next().find("span").addClass("less-char");
        // }
        // else{
        //     $(this).next().find("span").removeClass("less-char");
        // }
      });
}

function sendNewMessage(type){
    if(type=="reply"){
        $("div.msg-detail-part div.latest-msg").prev().find(".reply_parent").parent().remove();
        $("div.msg-detail-part .md-part-heading .sendMessage").hide();
        $("div.msg-detail-part .md-part-heading .linkbutton.replybutton").show();
        $(".inbox-page a.printMessage").show();
        $(".inbox-page a.cancelReply").hide();
        $('div.msg-detail-part .md-part-heading .alert.sent-msg-success').addClass("show");
    }
    else{
       // $('.alert.sent-msg-success').alert(); //$().alert('close')
        $( 'div#sm-send-new-message' ).removeClass( 'sidemodal-showing' ).hide();
        $( 'body' ).removeClass( 'bsm-active' );
       showAlertMessage ( "Success", "Message sent successfully!", 'success', true );
    }
}

function collapseTrail(){
    $("div.msg-detail-part div.open-full-msg div.trail-message div.trailmsg-text").hide();

    $(document).on("click", "div.msg-detail-part div.open-full-msg div.trail-message div.open-msg-details a.show_more", function(){
        var showLinkText = $(this).text();
        if(showLinkText == "Show more"){
            $(this).parents("div.open-msg-details").next().show();
            $(this).text("Hide");
        }
        else{
            $(this).parents("div.open-msg-details").next().hide();
            $(this).text("Show more");
        }
    });
}

function cancelmyreply(){
$(document).on("click", "a.cancelReply", function(){
    $("div.msg-detail-part div.latest-msg").prev().find(".reply_parent").parent().remove();
    $("div.msg-detail-part .md-part-heading .sendMessage").hide();
    $("div.msg-detail-part .md-part-heading .linkbutton.replybutton").show();
    $(".inbox-page a.printMessage").show();
    $(".inbox-page a.cancelReply").hide();
});
}

//View direct debit details
function viewDebitDetails(){
    $( 'body' ).on( 'click', 'div.direct-debit-list ul.lst-direct-debit li div.direct-debit-details', function () {
        $( 'div#view-directdebit-details' ).show(1);
        $( 'div#view-directdebit-details' ).addClass( 'sidemodal-showing' );
        $( 'body' ).addClass( 'bsm-active' );
    });
    $( 'body' ).on( 'click', 'div#view-directdebit-details a.btn-smclose', function () {
        $( 'div#view-directdebit-details' ).removeClass( 'sidemodal-showing' ).hide();
        $( 'body' ).removeClass( 'bsm-active' );
    });
}

//Standing Orders
function confirmCancelStOrder(){
    $( 'div#confirm-remove-st-order' ).show(1);
    $( 'div#confirm-remove-st-order' ).addClass( 'receiptmodal-showing' );
    $( 'body' ).addClass('brm-active');
}

$('div#confirm-remove-st-order a.btn-rm-close').on('click', function () {
    $( 'div#confirm-remove-st-order' ).removeClass( 'receiptmodal-showing' );
    $( 'body' ).removeClass('brm-active');
});

$('div#confirm-remove-st-order a.cancelDebit').on('click', function () {
    $( 'div#confirm-remove-st-order' ).removeClass( 'receiptmodal-showing' );
    $( 'body' ).removeClass('brm-active');
});

function CancelStandingOrder(){
    $( 'div#confirm-remove-st-order' ).removeClass( 'receiptmodal-showing' );
    $( 'body' ).removeClass('brm-active');
    $( 'div#standing-order-success' ).show(1);
    $( 'div#standing-order-success' ).addClass( 'receiptmodal-showing' );
    $( 'body' ).addClass('brm-active');
    $('div#standing-order .rm-icon').css('visibility','visible');
}

$('div#standing-order-success a.btn-rm-close').on('click', function () {
    $( 'div#standing-order-success' ).removeClass( 'receiptmodal-showing' );
    $( 'body' ).removeClass('brm-active');
    $('div#standing-order-success .rm-icon').css('visibility','hidden');
});

//New standing Order
$("a.so-calender").on("click",function(){ 
    $("#startdatepicker").focus();
    if ( $(window).width() > 992 ){
     //   $("#ui-datepicker-div table.ui-datepicker-calendar").width($(".login-container .form-controller input#startdatepicker").width() +13+ "px");
     //   $("#ui-datepicker-div ").width($(".login-container .form-controller input#startdatepicker").width() +13 + "px");
    }
    else{
        $("#ui-datepicker-div ").width($("div.st-order .form-controller input#startdatepicker").width()  + "px");
        var parentDatePickerWidth = $("div.st-order .form-controller input#startdatepicker").width();
        $("#ui-datepicker-div table.ui-datepicker-calendar").width(parentDatePickerWidth  + "px");
    }
});  

$( "#startdatepicker, #startSOdatepicker, #so_fpdatepicker" ).datepicker({
      dateFormat: "dd/mm/yy",
      changeYear: true,
      changeMonth: true,
      yearRange: "-100:+0",
      minDate: new Date(),

    beforeShow: function (input, inst) { /* This enables the datepicker come up always below the input field. */
        setTimeout(function () {
            inst.dpDiv.css({
                top: $("#startdatepicker").offset().top + 35,
                left: $("#startdatepicker").offset().left
            });
        }, 0);
    }
    });

     $("a.calender").on("click",function(){ 
        $(this).prev().focus();
        if ( $(window).width() > 992 ){ }
        else{
            $("#ui-datepicker-div ").width($(this).prev().width()  + "px");
            var parentDatePickerWidth = $(this).prev().width();
            $("#ui-datepicker-div table.ui-datepicker-calendar").width(parentDatePickerWidth  + "px");
        }
    }); 

function selectRadioButton(){
    $("body").on("focus", "div.st-order .form-controller input#fpdatepicker", function(){
        $(this).prev().prev().click();
    });
    $("body").on("focus", "div.st-order .form-controller input.noOfStPayments", function(){
        $(this).prev().prev().click();
    });
}
// ===== Scroll to Top ==== 
if($(window).width() > 992){
    $("#terms-modal").scroll(function() {
        if ($(this).scrollTop() >= 950) {        // If page is scrolled more than 50px
            $('#return-to-top').fadeIn(200);    // Fade in the arrow
        } else {
            $('#return-to-top').fadeOut(200);   // Else fade out the arrow
        }
    });
    $('#return-to-top').click(function() {      // When arrow is clicked
        $('#terms-modal').animate({
            scrollTop : 0                       // Scroll to top of body
        }, 500);
    });
}
else{
    $("#terms-modal .bs-content").scroll(function() {
        if ($(this).scrollTop() >= 850) {        // If page is scrolled more than 50px
            $('#return-to-top').fadeIn(200);    // Fade in the arrow
        } else {
            $('#return-to-top').fadeOut(200);   // Else fade out the arrow
        }
    });
    $('#return-to-top').click(function() {      // When arrow is clicked
        $('#terms-modal .bs-content').animate({
            scrollTop : 0                       // Scroll to top of body
        }, 500);
    });
}

$('div#standing-order-success a.btn-rm-close').on('click', function () {
    $( 'div#standing-order-success' ).removeClass( 'receiptmodal-showing' );
    $( 'body' ).removeClass('brm-active');
});


$('.mycarousel1').carousel({
     autoplay:false,
     interval:false  
  }); 

 

$("#owl-example1").owlCarousel({
    loop:false,
    nav:true,
    responsive:{
        0:{
            items:1
        },
         600:{
           items:1
         },
         768:{
            items:2
          },
        1000:{
            items:3
        }
    },
    lazyLoad: true,
    navigationText: [
   "<i class='icon-angle-left '></i>",
   "<i class='icon-angle-right '></i>"
  ]
});

