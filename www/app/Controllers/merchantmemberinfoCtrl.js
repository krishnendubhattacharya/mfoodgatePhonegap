app.controller('merchantmemberinfoCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth, $timeout) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    $scope.voucherInfo;
    if(!$scope.loggedindetails){

        $location.path("/login");
    }
    $scope.merchant_id = $stateParams.id;
    $scope.v_id = $stateParams.v_id;
    $scope.res_id = $stateParams.res_id;
    $scope.start_date;
    $scope.end_date;

    //alert(123);

    $scope.getVoucherDetail = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "vourcherdetail/"+$stateParams.v_id,
        }).success(function (data) {
            //console.log('Voucher details === ',data);
            $scope.voucherInfo =data;
            console.log($scope.voucherInfo);
            $scope.restaurant = data.restaurant;
            $scope.related_images = data.promo_images;
            $scope.start_date = $scope.voucherInfo.voucher_details.created_on;
            $scope.end_date = $scope.voucherInfo.voucher_details.to_date;
            //console.log($scope.related_images);
            $timeout(function(){
                // $('#ca-container').contentcarousel();
                var banner_carousal = $('.featured_carousel2');
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
            },30);
            $timeout(function(){
                // $('#ca-container').contentcarousel();
                var banner_carousal = $('.featured_carousel3');
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
            },30);

            $scope.getQrCode();
        });

    }
    $scope.getVoucherDetail();

    $scope.qrlink = '';
    $scope.getQrCode = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getMerResDetail/" + $scope.merchant_id+"/"+$scope.res_id+"/"+$scope.loggedindetails.id+"/"+$scope.v_id,
        }).success(function (data) {
            console.log(data);
            $scope.det = data;
            $scope.merchantId = data.merchant_id;
            $scope.resId = data.restaurant_id;
            $scope.memberId = data.member_id;
            if(data.expire_date){
                $scope.end_date = data.expire_date;
            }
            //$scope.memberId = 1;

            //console.log($scope.memberId);
            var query_string='';
            query_string += "?merchant_id=" + $scope.merchantId;
            query_string += "&member_id=" + $scope.memberId;
            $scope.qrlink = $rootScope.serviceurl + "genMembershipQrCode" + query_string;
            //$scope.voucherInfo = data.data;
            //console.log($scope.voucherInfo);
            //if($scope.datag)
            //$scope.datag.option({dataSource:$scope.voucherInfo});





        });


    }


});
