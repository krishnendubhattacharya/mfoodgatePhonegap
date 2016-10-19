'use strict';
/** 
 * controllers used for the login
 */
app.controller('refinerestaurentCtrl', function ($rootScope, $scope, $http, $location, $stateParams, $timeout) {

    $scope.catList = function(){

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getCategories",
        }).success(function (data) {
            $scope.catInfo =data.category;
            console.log($scope.catInfo);

        });
    }
    $scope.catList();


    $scope.restaurantList = function(){

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getResturantByCategory/"+$stateParams.categoryId,
        }).success(function (data) {
            $scope.restaurantInfo =data.restaurants;
            $scope.categoryInfo =data.category;
            //console.log($scope.restaurantInfo);

        });
    }
    $scope.restaurantList();

    $scope.getAds = function () {

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getActiveAdsByLocation/3",
        }).success(function (data) {
            $scope.ads = data.ads;
            $timeout(function(){
                //$scope.fads = true;
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
                    onInitialize: function (event) {
                        if ($('.item > img').length === 1) {
                            this.settings.loop = false;
                            this.settings.nav = false;
                        }},
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
            },30);
            //console.log($scope.newPromoInfo);

        });
    }
    $scope.getAds();

   
});

