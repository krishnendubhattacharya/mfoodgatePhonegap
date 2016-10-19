app.controller('voucherdetailCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth,$timeout) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    $scope.voucherInfo;
    if(!$scope.loggedindetails){

        $location.path("/login");
    }
    console.log($stateParams.voucherId);
    $scope.voucherInfo = null;
    $scope.showslider = false;

    /*gMap.getMap().then(function(map) {
        $scope.map = map;
    });*/


    $scope.getVoucherDetail = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "vourcherdetail/"+$stateParams.voucherId,
        }).success(function (data) {
            //console.log('Voucher details === ',data);
            $scope.voucherInfo =data;
            console.log($scope.voucherInfo);
            $scope.promoId = $scope.voucherInfo.voucher_details.offer_id;
                //$scope.restaurant = data.restaurant;
            $scope.related_images = data.promo_images;
            $scope.related_images2 = data.promo_images;
            $scope.offer_days = data.offer_days;
            //console.log($scope.related_images);
            $timeout(function(){
          
                // $('#ca-container').contentcarousel();
                var banner_carousal1 = $('.featured_carousel2');
                banner_carousal1.owlCarousel({
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
                banner_carousal1.trigger('next.owl.carousel');
            },3000);
            
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
                banner_carousal.trigger('next.owl.carousel');
            },3000);
            
            $scope.showslider = true; 
            $scope.getPromoDetails($scope.promoId);
            $scope.getQrCode();
        });

    }
     $scope.getVoucherDetail();
    
    
    

    $scope.getPromoDetails = function(promoId){

        $http({
            method: "GET",
            url: $rootScope.serviceurl+"getPromoDetails/" + promoId,
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            if(data.type == 'success') {
                $scope.promodetails = data.offer;
                $scope.restaurant = data.restaurants;
                $scope.mapaddress = data.merchantInfo[0].address;
                $scope.maptitle = data.merchantInfo[0].merchant_name;
                $scope.offer_days = data.offer_days;
               // $scope.about_me = data.merchantInfo[0].about_me;
                //console.log(data.merchantInfo);
                if(data.restaurants.length == 1){
                    $scope.restName=data.restaurants[0].title;
                }else{
                    $scope.restName=data.merchantInfo[0].merchant_name;
                }

                $scope.related_images = data.promo_images;
                //console.log($scope.related_products);


            }
        })
    }

    $scope.qrlink = '';
    $scope.getQrCode = function(){
        if($scope.voucherInfo) {
            var query_string='';
            query_string += "?merchant_id=" + $scope.voucherInfo.mer_name;
            query_string += "&restaurant_ids=" + $scope.voucherInfo.all_res;
            query_string += "&voucher_id=" + $scope.voucherInfo.voucher_no;
            $scope.qrlink = $rootScope.serviceurl + "genVoucherQrCode" + query_string;
        }
    }

    $scope.boucherResell = function () {
        $location.path('/vouchersell/' + $stateParams.voucherId);
    }

    $scope.bocherGift = function () {
        $location.path('/giftvoucher/' + $stateParams.voucherId);
    }

    $scope.swapvoucher = function (offer_id) {
        //$location.path('/giftvoucher/' + $stateParams.voucherId);
        //alert(offer_id);
        //return false;
        $location.path('/addswapvoucher/' + $stateParams.voucherId + '/' +offer_id);
        /*$http({
            method: "POST",
            url: $rootScope.serviceurl + "swap",
            data: {"voucher_id":$stateParams.voucherId,"user_id":$scope.loggedindetails.id,"offer_id":offer_id},
        }).success(function (data) {
            console.log(data);
            if(data.type == 'success'){
                //var message = data.message;
                //params.validationGroup.reset();
                $location.path('/allvoucher');

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
    }
    
    

    /*$scope.changeMap = function(outletInfo){
        $scope.mapaddress = outletInfo.address;
        $scope.maptitle = outletInfo.title;
    }*/




});
