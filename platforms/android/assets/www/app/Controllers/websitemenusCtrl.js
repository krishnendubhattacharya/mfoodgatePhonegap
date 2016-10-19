app.controller('websitemenusCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth,$timeout) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    $scope.voucherInfo;
    if(!$scope.loggedindetails){

        $location.path("/login");
    }

    $scope.res_id = $stateParams.res_id;
    $scope.getFeatureds = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl+"getActiveWebsiteMenus/"+$scope.res_id,
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            $scope.featuredMenus = data.data;
        })
    }
    $scope.getFeatureds();


    $scope.getSliderImages = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl+"getWebsiteMenuSliderImages/"+$scope.res_id,
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            $scope.sliderImages = data.data;
            $timeout(function(){
                // $('#ca-container').contentcarousel();
                var carousal = $('.newcar');
                carousal.owlCarousel({
                    autoplay:true,
                    touchDrag:false,
                    loop:($scope.sliderImages && $scope.sliderImages.length>1?true:false),
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
                            items:2
                        },
                        1000:{
                            items:2
                        }
                    }
                });
            },30);

            $timeout(function(){
                // $('#ca-container').contentcarousel();
                var carousal = $('.newcarl');
                carousal.owlCarousel({
                    autoplay:true,
                    touchDrag:false,
                    loop:($scope.sliderImages && $scope.sliderImages.length>1?true:false),
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
                            items:2
                        },
                        1000:{
                            items:2
                        }
                    }
                });
            },30);
        })
    }
    $scope.getSliderImages();


});
