const base_url = window.location.origin;

"use strict";
$(document).ready(function () {

    $.fn.removeClassPrefix = function (prefix) {
        this.each(function (i, it) {
            var classes = it.className.split(" ").map(function (item) {
                return item.indexOf(prefix) === 0 ? "" : item;
            });
            it.className = classes.join(" ");
        });
        return this;
    };

    if (localStorage.getItem('temp') != null) {
        $('head').append('<link rel="stylesheet" class="layout-css" href="">');
        if (localStorage.getItem('temp') == "menu-dark") {
            console.log(localStorage)
            $('.pcoded-navbar').removeClassPrefix('menu-');
            $('.pcoded-navbar').removeClass('navbar-dark');

        } else if (localStorage.getItem('temp') == "menu-light") {
            $('.pcoded-navbar').removeClassPrefix('menu-');
            $('.pcoded-navbar').removeClass('navbar-dark');
            $('.pcoded-navbar').addClass(localStorage.getItem('temp'));

        } else if (localStorage.getItem('temp') == "dark") {
            $('.layout-type > a').removeClass('active');
            $('.pcoded-navbar').removeClassPrefix('navbar-image-');
            $(this).addClass('active');
            $('.pcoded-navbar').removeClassPrefix('menu-');
            $('.pcoded-navbar').addClass('navbar-dark');
            $('.layout-css').attr("href", base_url + "/static/assets/css/layout-dark.css");

        }
    }
    if (localStorage.getItem('temp2') != null) {
        if (localStorage.getItem('temp2') == 'background-default') {
            $('.pcoded-header').removeClassPrefix('header-');
        } else {
            $('body').removeClassPrefix('background-');
            $('body').addClass('background-' + localStorage.getItem('temp2').slice(11, localStorage.getItem('temp2').length));
        }
    }

    // =========================================================
    // =========    Menu Customizer [ HTML ] code   ============
    // =========================================================
    $('body').append('' +
        '<div id="styleSelector" class="menu-styler">' +
        '<div class="style-toggler">' +
        '<a href="#!"></a>' +
        '</div>' +
        '<div class="style-block">' +
        '<h4 class="mb-2">Preferences <small class="font-weight-normal">v1.0 Preferences</small></h4>' +
        '<hr class="">' +
        '<div class="m-style-scroller">' +
        '<h6 class="mt-2">Layouts</h6>' +
        '<div class="theme-color layout-type">' +
        '<a href="#!" class="" data-value="menu-dark" title="Default Layout"><span></span><span></span></a>' +
        '<a href="#!" class="" data-value="menu-light" title="Light"><span></span><span></span></a>' +
        '<a href="#!" class="" data-value="dark" title="Dark"><span></span><span></span></a>' +
        '<a href="#!" class="" data-value="reset" title="Reset">Reset</a>' +
        '</div>' +
        '<h6>background color</h6>' +
        '<div class="theme-color background-color flat">' +
        '<a href="#!" class="" data-value="background-blue"><span></span><span></span></a>' +
        '<a href="#!" class="" data-value="background-red"><span></span><span></span></a>' +
        '<a href="#!" class="" data-value="background-purple"><span></span><span></span></a>' +
        '<a href="#!" class="" data-value="background-info"><span></span><span></span></a>' +
        '<a href="#!" class="" data-value="background-green"><span></span><span></span></a>' +
        '<a href="#!" class="" data-value="background-dark"><span></span><span></span></a>' +
        '</div>' +
        '<h6>background Gradient</h6>' +
        '<div class="theme-color background-color gradient">' +
        '<a href="#!" class="" data-value="background-grd-blue"><span></span><span></span></a>' +
        '<a href="#!" class="" data-value="background-grd-red"><span></span><span></span></a>' +
        '<a href="#!" class="" data-value="background-grd-purple"><span></span><span></span></a>' +
        '<a href="#!" class="" data-value="background-grd-info"><span></span><span></span></a>' +
        '<a href="#!" class="" data-value="background-grd-green"><span></span><span></span></a>' +
        '<a href="#!" class="" data-value="background-grd-dark"><span></span><span></span></a>' +
        '</div>' +
        '<h6>background Image</h6>' +
        '<div class="theme-color background-color image">' +
        '<a href="#!" class="" data-value="background-img-1"><span></span><span></span></a>' +
        '<a href="#!" class="" data-value="background-img-2"><span></span><span></span></a>' +
        '<a href="#!" class="" data-value="background-img-3"><span></span><span></span></a>' +
        '<a href="#!" class="" data-value="background-img-4"><span></span><span></span></a>' +
        '<a href="#!" class="" data-value="background-img-5"><span></span><span></span></a>' +
        '<a href="#!" class="" data-value="background-img-6"><span></span><span></span></a>' +
        '</div>' +
        '<div class="form-group mb-2">' +
        '<div class="switch switch-primary d-inline m-r-10">' +
        '<input type="checkbox" id="theme-rtl">' +
        '<label for="theme-rtl" class="cr"></label>' +
        '</div>' +
        '<label>Right To Left</label>' +
        '</div>' +
        '<div class="form-group mb-2">' +
        '<div class="switch switch-primary d-inline m-r-10">' +
        '<input type="checkbox" id="menu-fixed" checked>' +
        '<label for="menu-fixed" class="cr"></label>' +
        '</div>' +
        '<label>Sidebar Fixed</label>' +
        '</div>' +
        '<div class="form-group mb-2">' +
        '<div class="switch switch-primary d-inline m-r-10">' +
        '<input type="checkbox" id="header-fixed" checked>' +
        '<label for="header-fixed" class="cr"></label>' +
        '</div>' +
        '<label>Header Fixed</label>' +
        '</div>' +
        '<div class="form-group mb-2">' +
        '<div class="switch switch-primary d-inline m-r-10">' +
        '<input type="checkbox" id="box-layouts">' +
        '<label for="box-layouts" class="cr"></label>' +
        '</div>' +
        '<label>Box Layouts</label>' +
        '</div>' +
        '<div class="form-group mb-2">' +
        '<div class="switch switch-primary d-inline m-r-10">' +
        '<input type="checkbox" id="breadcumb-layouts">' +
        '<label for="breadcumb-layouts" class="cr"></label>' +
        '</div>' +
        '<label>Breadcrumb sticky</label>' +
        '</div>' +
        '</div>' +
        '<a href="http://ableproadmin.com/doc-7.0/" target="_blank" class="btn btn-primary btn-block m-r-15 m-t-5 m-b-10 ">Online Documentation</a>' +
        '<div class="text-center">' +
        '<span class="text-center f-18 m-t-15 m-b-15 d-block">Contact Developer!</span>' +
        '<a href="https://www.facebook.com/Phoenixcoded/" target="_blank" class="btn text-white bg-facebook btn-icon m-b-20">' +
        '<i class="feather icon-facebook"></i>' +
        '</a>' +
        '<a href="https://twitter.com/phoenixcoded" target="_blank" class="btn text-white bg-twitter btn-icon m-l-20 m-b-20">' +
        '<i class="feather icon-twitter"></i>' +
        '</a>' +
        '</div>' +
        '</div>' +
        '</div>');
    setTimeout(function () {
        $('.m-style-scroller').css({ 'height': 'calc(100vh - 335px)', 'position': 'relative' });
        var px = new PerfectScrollbar('.m-style-scroller', {
            wheelSpeed: .5,
            swipeEasing: 0,
            suppressScrollX: !0,
            wheelPropagation: 1,
            minScrollbarLength: 40,
        });
    }, 400);
    // =========================================================
    // ==================    Menu Customizer Start   ===========
    // =========================================================
    // open Menu Styler
    $('#styleSelector > .style-toggler').on('click', function () {
        $('#styleSelector').toggleClass('open');
        $('#styleSelector').removeClass('prebuild-open');
    });
    // layout types
    $('.layout-type > a').on('click', function () {
        var temp = $(this).attr('data-value');
        $('.layout-type > a').removeClass('active');
        $('.pcoded-navbar').removeClassPrefix('navbar-image-');
        $(this).addClass('active');
        $('head').append('<link rel="stylesheet" class="layout-css" href="">');
        if (temp == "menu-dark") {
            $('.pcoded-navbar').removeClassPrefix('menu-');
            $('.pcoded-navbar').removeClass('navbar-dark');
            localStorage.setItem('temp', 'menu-dark');
        }
        if (temp == "menu-light") {
            $('.pcoded-navbar').removeClassPrefix('menu-');
            $('.pcoded-navbar').removeClass('navbar-dark');
            $('.pcoded-navbar').addClass(temp);
            localStorage.setItem('temp', 'menu-light');
        }
        if (temp == "reset") {
            location.reload();
            localStorage.clear();
        }
        if (temp == "dark") {
            $('.pcoded-navbar').removeClassPrefix('menu-');
            $('.pcoded-navbar').addClass('navbar-dark');
            $('.layout-css').attr("href", base_url + "/static/assets/css/layout-dark.css");
            localStorage.setItem('temp', 'dark');
        } else {
            $('.layout-css').attr("href", "");
        }
    });
    // background Color
    $('.background-color.flat > a').on('click', function () {
        var temp = $(this).attr('data-value');
        $('.background-color > a').removeClass('active');
        $('.pcoded-header').removeClassPrefix('brand-');
        $(this).addClass('active');
        if (temp == "background-default") {
            $('.pcoded-header').removeClassPrefix('header-');
            localStorage.setItem('temp2', 'background-default')
        } else {
            $('.pcoded-header').removeClassPrefix('header-');
            $('.pcoded-header').addClass('header-' + temp.slice(11, temp.length));
            $('body').removeClassPrefix('background-');
            $('body').addClass('background-' + temp.slice(11, temp.length));
            localStorage.setItem('temp2', temp)
        }
    });
    // background Color other
    $('.background-color.gradient > a').on('click', function () {
        var temp = $(this).attr('data-value');
        $('.background-color > a').removeClass('active');
        $('.pcoded-header').removeClassPrefix('brand-');
        $(this).addClass('active');
        if (temp == "background-default") {
            localStorage.setItem('temp2', 'background-default');
        } else {
            $('body').removeClassPrefix('background-');
            $('body').addClass('background-' + temp.slice(11, temp.length));
            localStorage.setItem('temp2', temp)
        }
    });
    // background Color other
    $('.background-color.image > a').on('click', function () {
        var temp = $(this).attr('data-value');
        $('.background-color > a').removeClass('active');
        $('.pcoded-header').removeClassPrefix('brand-');
        $(this).addClass('active');
        if (temp == "background-default") {
            localStorage.setItem('temp2', 'background-default');
        } else {
            $('body').removeClassPrefix('background-');
            $('body').addClass('background-' + temp.slice(11, temp.length));
            localStorage.setItem('temp2', temp)
        }
    });
    // rtl layouts
    $('#theme-rtl').change(function () {
        $('head').append('<link rel="stylesheet" class="rtl-css" href="">');
        if ($(this).is(":checked")) {
            $('.rtl-css').attr("href", base_url + "/static/assets/css/layout-rtl.css");
        } else {
            $('.rtl-css').attr("href", "");
        }
    });
    // Menu Fixed
    $('#menu-fixed').change(function () {
        if ($(this).is(":checked")) {
            $('.pcoded-navbar').addClass('menupos-fixed');
            setTimeout(function () {
                // $(".navbar-content").css({'overflow':'visible','height':'calc(100% - 70px)'});
            }, 400);
        } else {
            $('.pcoded-navbar').removeClass('menupos-fixed');
        }
    });
    // Header Fixed
    $('#header-fixed').change(function () {
        if ($(this).is(":checked")) {
            $('.pcoded-header').addClass('headerpos-fixed');
        } else {
            $('.pcoded-header').removeClass('headerpos-fixed');
        }
    });
    // breadcumb sicky
    $('#breadcumb-layouts').change(function () {
        if ($(this).is(":checked")) {
            $('.page-header').addClass('breadcumb-sticky');
        } else {
            $('.page-header').removeClass('breadcumb-sticky');
        }
    });
    // Box layouts
    $('#box-layouts').change(function () {
        if ($(this).is(":checked")) {
            $('body').addClass('container');
            $('body').addClass('box-layout');
        } else {
            $('body').removeClass('container');
            $('body').removeClass('box-layout');
        }
    });
    // ==================    Menu Customizer End   =============
    // =========================================================

    // ==================    Sign up next progress    =============
    // =========================================================
    $('#progresswizard').bootstrapWizard({
        withVisible: false,
        'nextSelector': '.button-next',
        'previousSelector': '.button-previous',
        'firstSelector': '.button-first',
        'lastSelector': '.button-last',
        onTabShow: function (tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index + 1;
            var $percent = ($current / $total) * 100;
            $('#progresswizard .progress-bar').css({
                width: $percent + '%'
            });
        }
    });
});

