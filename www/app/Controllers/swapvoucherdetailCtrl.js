/*app.controller('swapvoucherdetailCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    $scope.voucherInfo;
    if(!$scope.loggedindetails){

        $location.path("/login");
    }

    $scope.voucherInfo = null;

    $scope.getSwapVoucherDetail = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "swapdetails/"+$stateParams.swapId,
        }).success(function (data) {
            console.log(data);
            $scope.voucherInfo =data;
        });

    }
    $scope.getSwapVoucherDetail();









});*/

app.controller('swapvoucherdetailCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth, NgMap,mFoodCart,$window,$cookieStore,$timeout) {
    //alert(123);
    $scope.promoId = $stateParams.promoId;
    //$scope.loggedindetails = myAuth.getUserNavlinks();
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    //$scope.voucherInfo;


    //stButtons.makeButtons();
    $scope.mpoints = 0;
    NgMap.getMap().then(function(map) {
        $scope.map = map;
    });
    //alert($rootScope.swipeValue);


    $scope.getSwapVoucherDetail = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "swapdetails/"+$stateParams.swapId,
        }).success(function (data) {
            console.log(data);
            $scope.swapvoucherInfo =data.voucher_details;
        });

    }
    $scope.getSwapVoucherDetail();







    $scope.getPromoDetails = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl+"promoVisit/" + $scope.promoId,
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            //alert(data);

        });
        $http({
            method: "GET",
            url: $rootScope.serviceurl+"getPromoDetails/" + $scope.promoId,
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            if(data.type == 'success') {
                console.log(data);
                $scope.promodetails = data.offer;
                $scope.newspagetitle = encodeURIComponent($scope.promodetails.title);
                $scope.newspagedescription = encodeURIComponent('Posted on:  '+$scope.promodetails.created_on);
                $scope.pointdetails = data.point_details;
                $scope.restaurant = data.restaurants;
                $scope.mapaddress = data.merchantInfo[0].address;
                $scope.maptitle = data.merchantInfo[0].merchant_name;
                $scope.offer_days = data.offer_days;
                $scope.about_me = data.merchantInfo[0].about_me;
                //console.log(data.merchantInfo);
                if(data.restaurants.length == 1){
                    $scope.restName=data.restaurants[0].title;
                }else{
                    $scope.restName=data.merchantInfo[0].merchant_name;
                }

                $scope.related_images = data.promo_images;
                //console.log($scope.related_products);
                $timeout(function(){
                    // $('#ca-container').contentcarousel();
                    var banner_carousal = $('.featured_carousel2');
                    banner_carousal.owlCarousel({
                        autoplay:true,
                        autoHeight:true,
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
                        autoHeight:true,
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
            }
        })
    }
    $scope.getPromoDetails();

    $scope.relateds = [];
    $scope.getRelatedProducts = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl+"getRelatedPromo/" + $scope.promoId,
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            if(data.type == 'success') {
                //console.log(data.getRelatedPromo);
                $scope.related_products = data.getRelatedPromo;
                //console.log($scope.related_products);
                $timeout(function(){
                    // $('#ca-container').contentcarousel();
                    var banner_carousal = $('.featured_carousel');
                    banner_carousal.owlCarousel({
                        autoplay:true,
                        autoHeight:true,
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
                                items:3
                            }
                        }
                    });
                },30);
                $timeout(function(){
                    // $('#ca-container').contentcarousel();
                    var banner_carousal = $('.featured_carousell');
                    banner_carousal.owlCarousel({
                        autoplay:true,
                        autoHeight:true,
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
                                items:3
                            }
                        }
                    });
                },30);

            }
        })
    }
    $scope.getRelatedProducts();




    //$scope.getCartTotals();

    /*if($scope.cartDetails) {
     angular.forEach($scope.cartDetails, function (v) {
     //$scope.cartIds.push(v.offer_id);
     //$scope.cartQty.push(v.quantity);
     //$scope.payments = true;
     //$scope.paymentscash = true;
     if(v.condtn == 1){
     v.payments =true;
     v.paymentscash=true;
     }else{
     v.payments =false;
     v.paymentscash=false;
     }


     })
     }*/
    //console.log('cart',$scope.cartDetails);












    $scope.getAds = function () {

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getActiveAdsByLocation/2",
        }).success(function (data) {
            $scope.ads = data.ads;
            $timeout(function(){
                // $('#ca-container').contentcarousel();
                var carousal = $('.owl-carousel1');
                carousal.owlCarousel({
                    autoplay:true,
                    autoHeight:true,
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
            },1);
            //console.log($scope.newPromoInfo);

        });
    }
    $scope.getAds();

    $scope.changeMap = function(outletInfo){
        $scope.mapaddress = outletInfo.address;
        $scope.maptitle = outletInfo.title;
    }

    $scope.add_to_bid = function () {

        $location.path('/swapinterested/'+$stateParams.swapId);

    }

    $scope.pageLink = encodeURIComponent($rootScope.siteurl+'swapvoucherdetail/'+$stateParams.swapId+'/'+$stateParams.promoId);

    $scope.fbsharedialog = function(){
        var attachment = {
            'name':$scope.promodetails.title,
            'description':$scope.promodetails.sharedescription,
            'caption': 'MFoodGate',
            'href':$scope.promodetails.image,
            'media':[{'type':'image',
                'src':$scope.promodetails.image,
                'href':$rootScope.siteurl
            }]
        };
        console.log(attachment);
        FB.ui({
            method: 'feed',
            name:$scope.promodetails.title,
            link: $rootScope.siteurl+'swapvoucherdetail/'+$stateParams.swapId+'/'+$stateParams.promoId,
            picture: $scope.promodetails.image,
            caption: 'MFoodGate',
            description: $scope.promodetails.sharedescription,
            message: $scope.promodetails.sharedescription,
            display: 'iframe',
            width: 300,
            height: 150
        })
    }

    window.fbAsyncInit = function() {
        FB.init({
            appId: '646829092146685',
            status: true,
            cookie: true,
            xfbml: true
        });
    };
    (function(d){
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement('script'); js.id = id; js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        ref.parentNode.insertBefore(js, ref);
    }(document));

    //$scope.payments = true;
    //$scope.paymentscash = true;
});
