'use strict';
/** 
 * controllers used for the login
 */
app.controller('homeCtrl', function ($rootScope, $scope, $http, $location,$timeout) {

    $scope.special_promo_show = 1;
    $scope.last_promo_show = 1;
    $scope.all_promo_show = 1;
    $scope.new_promo_show = 1;
    $scope.hot_promo_show = 1;
    $scope.res_promo_show = 1;
    $scope.showslider = false;

    $scope.fads = false;

    $scope.goto_page = function(t)
    {
        if(t)
            $location.path('/' + t);
        else
            $location.path('/');
    }
    $scope.lastShowHide = function () {
        if($scope.last_promo_show == 1){
            $scope.last_promo_show = 0;
        }else{
            $scope.last_promo_show = 1;
        }
    }

    $scope.redirectto = function (id) {
        console.log(id);
        $location.path('/promodetails/' + id);
    }

    $scope.specialShowHide = function () {
        if($scope.special_promo_show == 1){
            $scope.special_promo_show = 0;
        }else{
            $scope.special_promo_show = 1;
        }

    }
    $scope.allShowHide = function () {
        if($scope.all_promo_show == 1){
            $scope.all_promo_show = 0;
        }else{
            $scope.all_promo_show = 1;
        }
    }
    $scope.newShowHide = function () {
        if($scope.new_promo_show == 1){
            $scope.new_promo_show = 0;
        }else{
            $scope.new_promo_show = 1;
        }
    }
    $scope.hotShowHide = function () {
        if($scope.hot_promo_show == 1){
            $scope.hot_promo_show = 0;
        }else{
            $scope.hot_promo_show = 1;
        }
    }
    $scope.resShowHide = function () {
        if($scope.res_promo_show == 1){
            $scope.res_promo_show = 0;
        }else{
            $scope.res_promo_show = 1;
        }
    }

    $scope.adDetailPage = function(id){
        $location.path('/frontend/advertisedetail/' + id);
    }
    $scope.showAll = false;
    $scope.showAllFunc = function() {
        $scope.catList = function () {

            $http({
                method: "GET",
                url: $rootScope.serviceurl + "getCategories",
            }).success(function (data) {
                $scope.catInfo = data.category;
                console.log($scope.catInfo);

            });
        }
        $scope.catList();

        $scope.featuredPromoList = function () {

            $http({
                method: "GET",
                url: $rootScope.serviceurl+"websiteVisit",
                headers: {'Content-Type': 'application/json'},
            }).success(function(data) {
                //alert(data);

            });

            $http({
                method: "GET",
                url: $rootScope.serviceurl + "getFeaturedCategories",
            }).success(function (data) {
                $scope.featuredCatInfo = data.featuredcat;
                $scope.showslider = true;
                //console.log($scope.featuredCatInfo);
                $timeout(function(){
                   // $('#ca-container').contentcarousel();
                    var carousal = $('.owl-carousel');
                    carousal.owlCarousel({
                        autoplay:true,
                        touchDrag:false,
                        loop:($scope.featuredCatInfo && $scope.featuredCatInfo.length>1?true:false),
                        dots:true,
                        nav:true,
                        navContainerClass:"ca-nav",
                        navText:false,
                        autoplayTimeout:5000,
                        autoplayHoverPause:true,
                        singleItem:true,
                        responsive:{
                            0:{
                                items:1
                            },
                            600:{
                                items:1
                            },
                            1000:{
                                items:1
                            }
                        }
                    });
				$timeout(function(){$('.owl-carousel').trigger('next.owl.carousel');},6000);
                },3000);
                

                $timeout(function(){
                    // $('#ca-container').contentcarousel();
                    var carousal = $('.owl-carousel-mob');
                    carousal.owlCarousel({
                        autoplay:true,
                        touchDrag:false,
                        loop:($scope.featuredCatInfo && $scope.featuredCatInfo.length>1?true:false),
                        dots:true,
                        nav:true,
                        navContainerClass:"ca-nav",
                        navText:false,
                        autoplayTimeout:5000,
                        autoplayHoverPause:true,
                        singleItem:true,
                        responsive:{
                            0:{
                                items:1
                            },
                            600:{
                                items:1
                            },
                            1000:{
                                items:1
                            }
                        }
                    });
                    $timeout(function(){$('.owl-carousel-mob').trigger('next.owl.carousel');},6000);
                },3000);



            });
        }
        $scope.featuredPromoList();

        /*$scope.featuredAdvertiseList = function () {

            $http({
                method: "GET",
                url: $rootScope.serviceurl + "getActiveAdsByLocation/1",
            }).success(function (data) {
                $scope.featuredAdsInfo = data.ads;
                //console.log($scope.featuredCatInfo);
                $timeout(function(){
                    $scope.fads = true;
                    // $('#ca-container').contentcarousel();
                    var carousal = $('.owl-carousel');
                    carousal.owlCarousel({
                        autoplay:true,
                        touchDrag:false,
                        loop:true,
                        dots:true,
                        nav:true,
                        navContainerClass:"ca-nav",
                        navText:false,
                        autoplayTimeout:5000,
                        autoplayHoverPause:true,
                        responsive:{
                            0:{
                                items:1
                            },
                            600:{
                                items:1
                            },
                            1000:{
                                items:1
                            }
                        }
                    });
                    //$('.item,.ca-item-main,.desc,.desc.txt,.desc.view-btn').on('mouseout', function (e){
                    //    console.log('hii');
                    //    carousal.trigger('play.owl.autoplay',[5000]);
                    //});
                    //$('.item,.ca-item-main,.desc,.desc.txt,.desc.view-btn').on('mouseover', function (e){
                    //    carousal.trigger('stop.owl.autoplay');
                    //});
                    //
                    //$('.item,.ca-item-main,.desc,.desc.txt,.desc.view-btn').on('mouseleave', function (e){
                    //    carousal.trigger('play.owl.autoplay');
                    //});
                },3000);



            });
        }
        $scope.featuredAdvertiseList();*/

        $scope.newPromoList = function () {

            $http({
                method: "GET",
                url: $rootScope.serviceurl + "getLaunchTodayPromo",
            }).success(function (data) {
                $scope.newPromoInfo = data.todayPromo;
                $scope.newPromoCount = data.count;
                //console.log($scope.newPromoInfo);

            });
        }
        $scope.newPromoList();

        $scope.hotSellingList = function () {

            $http({
                method: "GET",
                url: $rootScope.serviceurl + "getHotSellingPromo",
            }).success(function (data) {
                $scope.hotSellingInfo = data.getHotSellingPromo;
                //console.log($scope.newPromoInfo);

            });
        }
        $scope.hotSellingList();

        $scope.lastDayPromoList = function () {

            $http({
                method: "GET",
                url: $rootScope.serviceurl + "getLastdayPromo",
            }).success(function (data) {
                $scope.lastDayPromoInfo = data.lastdayPromo;
                //console.log($scope.newPromoInfo);

            });
        }
        $scope.lastDayPromoList();

        $scope.getAds = function () {

            $http({
                method: "GET",
                url: $rootScope.serviceurl + "getActiveAdsByLocation/1",
            }).success(function (data) {
                $scope.ads = data.ads;
                $scope.fads = true;
                $timeout(function(){

                    // $('#ca-container').contentcarousel();
                    var carousal = $('.owl-carousel1');
                    carousal.owlCarousel({
                        autoplay:true,
                        touchDrag:false,
                        loop:true,
                        dots:true,
                        nav:true,
                        navContainerClass:"ca-nav",
                        navText:false,
                        autoplayTimeout:5000,
                        autoplayHoverPause:true,
                        responsive:{
                            0:{
                                items:1
                            },
                            600:{
                                items:1
                            },
                            1000:{
                                items:1
                            }
                        }
                    });
                    
                    $timeout(function(){$('.owl-carousel1').trigger('next.owl.carousel');},6000);
                },3000);
                //console.log($scope.newPromoInfo);

            });
        }
        $scope.getAds();


        $scope.restaurantList = function () {

            $http({
                method: "GET",
                url: $rootScope.serviceurl + "getFeaturedResturantHome",
            }).success(function (data) {
                $scope.restaurantInfo = data.restaurants;
                //console.log($scope.restaurantInfo);featured_carousel
                $timeout(function(){
                    //$scope.fres = true;
                    // $('#ca-container').contentcarousel();
                    var fcarousal = $('.featured_carousel');
                    fcarousal.owlCarousel({
                        autoplay:true,
                        touchDrag:false,
                        loop:true,
                        dots:true,
                        nav:true,
                        navContainerClass:"ca-nav",
                        navText:false,
                        autoplayTimeout:5000,
                        autoplayHoverPause:true,
                        responsive:{
                            0:{
                                items:1
                            },
                            600:{
                                items:1
                            },
                            1000:{
                                items:3
                            }
                        }
                    });
                    $timeout(function(){$('.featured_carousel').trigger('next.owl.carousel');},6000);
                },3000);
                $timeout(function(){
                    //$scope.fres = true;
                    // $('#ca-container').contentcarousel();
                    var fcarousal = $('.featured_carousel-mob');
                    fcarousal.owlCarousel({
                        autoplay:true,
                        touchDrag:false,
                        loop:true,
                        dots:true,
                        nav:true,
                        navContainerClass:"ca-nav",
                        navText:false,
                        autoplayTimeout:5000,
                        autoplayHoverPause:true,
                        responsive:{
                            0:{
                                items:1
                            },
                            600:{
                                items:1
                            },
                            1000:{
                                items:3
                            }
                        }
                    });
                    $timeout(function(){$('.featured_carousel-mob').trigger('next.owl.carousel');},6000);
                },3000);

            });
        }
        $scope.restaurantList();

        $scope.specialList = function () {

            $http({
                method: "GET",
                url: $rootScope.serviceurl + "getSpecialPromo",
            }).success(function (data) {
                $scope.specialInfo = data.getSpecialPromo;
                $scope.specialTitle = data.site_setting.special_promo_title;
                //console.log($scope.specialInfo);

            });
        }
        $scope.specialList();

        $scope.getBanners = function(){
            $http({
                method: "GET",
                url: $rootScope.serviceurl + "getActiveBanner",
            }).success(function (data) {
                $scope.banners = data.banner;
                $scope.bcar = true;
                //console.log($scope.specialInfo);
                $timeout(function(){
                    
                    // $('#ca-container').contentcarousel();
                    var banner_carousal = $('.banner_carousel');
                    banner_carousal.owlCarousel({
                        autoplay:true,
                        touchDrag:false,
                        loop:true,
                        dots:true,
                        nav:true,
                        navContainerClass:"ca-nav",
                        navText:false,
                        autoplayTimeout:6000,
                        autoplayHoverPause:true,
                        responsive:{
                            0:{
                                items:1
                            },
                            600:{
                                items:1
                            },
                            1000:{
                                items:1
                            }
                        }
                    });
                    $timeout(function(){$('.banner_carousel').trigger('next.owl.carousel');},6000);
                },3000);
            });
        }
        $scope.getBanners();

        $scope.menuPromoList = function () {

            $http({
                method: "GET",
                url: $rootScope.serviceurl + "getMenuPromo",
            }).success(function (data) {
                $scope.menuPromoInfo = data.getMenuPromo;
                //console.log($scope.menuPromoInfo);

            });
        }
        $scope.menuPromoList();

        $scope.paymentPromoList = function () {

            $http({
                method: "GET",
                url: $rootScope.serviceurl + "getPaymentPromo",
            }).success(function (data) {
                $scope.paymentPromoInfo = data.getPaymentPromo;
                //console.log($scope.menuPromoInfo);

            });
        }
        $scope.paymentPromoList();

        $scope.merchamtMembershipPromoList = function () {

            $http({
                method: "GET",
                url: $rootScope.serviceurl + "getMerchantPromo",
            }).success(function (data) {
                $scope.merchantMembershipPromoInfo = data.getMerchantPromo;
                //console.log($scope.menuPromoInfo);

            });
        }
        $scope.merchamtMembershipPromoList();
        $scope.showAll = true;
    }
    $scope.showAllFunc();
    $scope.viewIcon = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getIconList",
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            $scope.allicons = data.icon;
            $rootScope.allicontext = $scope.allicons;
            //console.log($rootScope.allicontext);
            //$rootScope.$broadcast('eventtName', { message: $scope.allicons });
            //localStorage.setItem('icontext', $scope.allicons);

            //console.log($scope.allicons);

        });
    }

    $scope.viewIcon();
   
});

