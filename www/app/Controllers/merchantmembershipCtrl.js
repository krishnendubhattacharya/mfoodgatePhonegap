app.controller('merchantmembershipCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth, $timeout) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    $scope.voucherInfo;
    if(!$scope.loggedindetails){

        $location.path("/login");
    }

    $scope.res_id = $stateParams.res_id;
    $scope.merchant_id = $stateParams.id;
    $scope.checkBox = {
        checked: {
            value: 1
        },
        unchecked: {
            value: 0
        }

    };

    $scope.getfeaturedNews = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl+"memberVisit/" + $scope.loggedindetails.id+'/'+$scope.merchant_id,
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            //alert(data);

        });
        $http({ 
            method: "GET",
            url: $rootScope.serviceurl + "getFeaturedMerchantNews/" + $scope.res_id,
        }).success(function (data) {
            if(data.type=='success')
            {
                $scope.featuredPromo = data.data;
            }
            //console.log($scope.newPromoInfo);
        });
    }
    $scope.getfeaturedNews();

    $scope.getspecialNews = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getSpecialMerchantNews/" + $scope.res_id,
        }).success(function (data) {
            if(data.type=='success')
            {
                $scope.specialPromo = data.data;
                $timeout(function(){
                var carousal = $('.owecar');
                carousal.owlCarousel({
                    autoplay:true,
                    touchDrag:false,
                    loop:($scope.specialPromo && $scope.specialPromo.length>1?true:false),
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
                            items:3
                        },
                        1000:{
                            items:3
                        }
                    }
                });},900);

                $timeout(function(){
                    var carousal = $('.owecar1');
                    carousal.owlCarousel({
                        autoplay:true,
                        touchDrag:false,
                        loop:($scope.specialPromo && $scope.specialPromo.length>1?true:false),
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
                                items:3
                            },
                            1000:{
                                items:3
                            }
                        }
                    });},900);
            }
            //console.log($scope.newPromoInfo);
        });
    }
    $scope.getspecialNews();

    $scope.saveSetting = function(params) {
        alert($scope.media_notification);
        alert($scope.expire_date_notification);
        alert($scope.promo_notification);
        alert($scope.news_letter_notification);

        /*$http({
            method: "POST",
                url: $rootScope.serviceurl+"bids",
                data: {"media_notification":$scope.media_notification,"expire_date_notification":$scope.expire_date_notification,"user_id":$scope.loggedindetails.id,"promo_notification":$scope.promo_notification,"news_letter_notification":$scope.news_letter_notification},
                headers: {'Content-Type': 'application/json'},
            }).success(function(data) {
                console.log(data);
                //return false;
                //params.validationGroup.reset();
                if(data.type == 'success'){
                    //var message = data.message;
                    //params.validationGroup.reset();
                    $location.path('/bidvoucher');

                    DevExpress.ui.notify({
                        message: data.message,
                        position: {
                            my: "center top",
                            at: "center top"
                        }
                    }, "success", 3000);
                }else{
                    var message = "Error occured.";
                    DevExpress.ui.notify({
                        message: data.message,
                        position: {
                            my: "center top",
                            at: "center top"
                        }
                    }, "error", 3000);
                }

            });*/
    };

    /*$scope.saveSetting = function(params) {

        //alert(1);
        console.log(params);
        //alert($scope.price);
        //alert($scope.points);
        //alert($stateParams.voucherId);
        //alert($scope.loggedindetails.id);
        //var result = params.validationGroup.validate();
        // if(result.isValid) {
        $http({
            method: "POST",
            url: $rootScope.serviceurl+"bids",
            data: {"bid_price":$scope.bid_price,"voucher_id":$stateParams.voucherId,"user_id":$scope.loggedindetails.id,"voucher_resale_id":$stateParams.sellId},
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            console.log(data);
            //return false;
            //params.validationGroup.reset();
            if(data.type == 'success'){
                //var message = data.message;
                //params.validationGroup.reset();
                $location.path('/bidvoucher');

                DevExpress.ui.notify({
                    message: data.message,
                    position: {
                        my: "center top",
                        at: "center top"
                    }
                }, "success", 3000);
            }else{
                var message = "Error occured.";
                DevExpress.ui.notify({
                    message: data.message,
                    position: {
                        my: "center top",
                        at: "center top"
                    }
                }, "error", 3000);
            }

        })

        //form.submit();
        //params.validationGroup.reset();
        //}
    };*/




});
