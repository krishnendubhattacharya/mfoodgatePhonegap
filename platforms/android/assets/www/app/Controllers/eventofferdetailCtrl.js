app.controller('eventofferdetailCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth, $timeout) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    console.log($scope.loggedindetails);
    $scope.voucherInfo;

    $scope.voucherInfo = null;

    $scope.getEventDetail = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getEvenDetails/"+$stateParams.eventId,
        }).success(function (data) {
            console.log(data);
            $scope.eventInfo =data;
            $scope.category_count =$scope.eventInfo.data.categories.length;
            $scope.location_count =$scope.eventInfo.data.locations.length;
            $scope.related_images = $scope.eventInfo.data.mulimg;
                //console.log($scope.related_products);
                $timeout(function(){
                    // $('#ca-container').contentcarousel();
                    var banner_carousal = $('.featured_carousel2');
                    banner_carousal.owlCarousel({
                        autoplay:true,
                        autoHeight:false,
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
                },30);
                $timeout(function(){
                    // $('#ca-container').contentcarousel();
                    var banner_carousal = $('.featured_carousel3');
                    banner_carousal.owlCarousel({
                        autoplay:true,
                        autoHeight:false,
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
                },30);
        });

    }
    $scope.getEventDetail();

    $scope.eventBid = function (id) {
        $location.path('/eventbid/' +$stateParams.eventId);
    }








});
