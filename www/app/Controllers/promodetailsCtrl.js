app.controller('promodetailsCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth, NgMap,mFoodCart,$window,$cookieStore,$timeout) {
    //alert(123);
    $scope.promoId = $stateParams.promoId;
    $scope.loggedindetails = myAuth.getUserNavlinks();

    //stButtons.makeButtons();
    $scope.mpoints = 0;
    NgMap.getMap().then(function(map) {
        $scope.map = map;
    });
    //alert($rootScope.swipeValue);

    $scope.save_to_db = function() {
        console.log("saving -1",$scope.loggedindetails);
        if ($scope.loggedindetails) {
            console.log("saving -2");
            $http({
                method: "POST",
                url: $rootScope.serviceurl + "addToCart",
                headers: {'Content-Type': 'application/json'},
                data:{user_id:$scope.loggedindetails.id,cart:$scope.cartDetails}
            }).success(function (data) {
                console.log('saved');
                if(data)
                {
                    mFoodCart.resetAndAdd(data);
                    $scope.cartDetails = mFoodCart.get_cart();
                    $scope.getCartTotals();

                }
            })
        }
    }



    $scope.getUsersPoints = function()
    {
        $http({
            method: "GET",
            url: $rootScope.serviceurl+"getUsersPoints/" + $scope.loggedindetails.id+"/"+$scope.promoId,
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            if(data.status == 'success') {
                $scope.mpoints = data.data.sum;
            }
        })
    }
    if($scope.loggedindetails)
    {
        $scope.getUsersPoints();
    }

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
                console.log($scope.related_images);
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

    $scope.add_to_cart = function(){

        $http({
            method: "GET",
            url: $rootScope.serviceurl+"checkOfferId/"+$stateParams.promoId,
            headers: {'Content-Type': 'application/json'},
            //data:{item:data,user_id:$scope.loggedindetails.id}
        }).success(function(res) {

            if(res.type =='success'){
                if($scope.promodetails.conditions == 1){
                    $scope.pay = true;
                    $scope.paycash = true;
                }else{
                    $scope.pay = false;
                    $scope.paycash = false;

                }
                var cart_obj = {
                    offer_id            :   $scope.promodetails.id,
                    restaurant_id       :   $scope.restaurant.id,
                    offer_title         :   $scope.promodetails.title,
                    restaurant_title    :   $scope.restName,
                    offer_percent       :   $scope.promodetails.offer_percent,
                    price               :   $scope.promodetails.price,
                    mpoints             :   $scope.promodetails.mpoints,
                    offer_price         :   $scope.promodetails.offer_price,
                    quantity            :   1,
                    previous_quantity   :   1,
                    image               :   $scope.promodetails.image,
                    point_id            :   $scope.promodetails.point_master_id,
                    point_name          :   $scope.pointdetails[0].name,
                    condtn              :   $scope.promodetails.conditions,
                    payments            :   $scope.pay,
                    paymentscash        :   $scope.paycash,
                    resell              :   0,
                    resell_id           :   0,
                    event               :   0,
                    event_id            :   0,
                    event_price         :   0,
                    event_bid_id        :   0
                }
                mFoodCart.add_to_cart(cart_obj);
                $scope.cartDetails = mFoodCart.get_cart();
                /*if($scope.cartDetails) {
                    angular.forEach($scope.cartDetails, function (v) {

                        if(v.condtn == 1){
                            v.payments =true;
                            v.paymentscash=true;
                        }else{
                            v.payments =false;
                            v.paymentscash=false;
                        }


                    })
                */
                //console.log($scope.cartDetails);
                $scope.getCartTotals();
                $scope.save_to_db();
            }else{
                var message = res.message;
                DevExpress.ui.notify({
                    message: message,
                    position: {
                        my: "center top",
                        at: "center top"
                    }
                }, "error", 3000);
            }
        });

    }

    $scope.cartDetails = mFoodCart.get_cart();
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

    $scope.updateCheck = function(data,offerId,paytype){
        //console.log(data);
        $scope.newcartdetails = mFoodCart.get_cart();
        console.log($scope.newcartdetails);
            angular.forEach($scope.newcartdetails, function (v) {
                if(offerId == v.offer_id){
                    //alert(v.offer_id);
                    if(paytype =='p') {
                        if (v.payments == true)
                            mFoodCart.update_cart_payment(v.offer_id, 0);
                        else if (v.payments == false) {
                            mFoodCart.update_cart_payment(v.offer_id, 1);
                            mFoodCart.update_cart_paymentcash(v.offer_id, 0);
                        }
                    }
                    if(paytype =='c') {
                        //alert(paytype);
                        if (v.paymentscash == true)
                            mFoodCart.update_cart_paymentcash(v.offer_id, 0);
                        else if (v.paymentscash == false){
                            //alert(paytype);

                            mFoodCart.update_cart_paymentcash(v.offer_id, 1);
                            mFoodCart.update_cart_payment(v.offer_id, 0);
                        }

                    }
                }

            })
        $scope.cartDetails = mFoodCart.get_cart();
        if ($scope.loggedindetails) {
            $http({
                method: "POST",
                url: $rootScope.serviceurl + "updateCheckType",
                headers: {'Content-Type': 'application/json'},
                data: {item: $scope.cartDetails, user_id: $scope.loggedindetails.id}
            }).success(function (res) {

            });
        }
        //console.log($scope.cartDetails);
        //alert(paytype);
        $scope.getCartTotals();

    }

    $scope.updateQuantity = function(data){
        /*if(data.quantity>0) {
            mFoodCart.update_cart_quantity(data.offer_id, data.quantity);
            $scope.getCartTotals();
        }*/
        if ($scope.loggedindetails) {
            $http({
                method: "POST",
                url: $rootScope.serviceurl+"updateCartQuantity",
                headers: {'Content-Type': 'application/json'},
                data:{item:data,user_id:$scope.loggedindetails.id}
            }).success(function(res) {
                console.log(res);
                if(res.type=='success'){
                    //alert(1);
                    $scope.newcartdetails = mFoodCart.get_cart();
                    console.log($scope.newcartdetails);
                    /*if($scope.newcartdetails) {
                        angular.forEach($scope.newcartdetails, function (v) {
                            mFoodCart.update_cart_previousquantity(v.offer_id, v.quantity);
                        })
                    }*/
                    mFoodCart.update_cart_previousquantity(data.offer_id, data.quantity);
                    mFoodCart.update_cart_quantity(data.offer_id, data.quantity);
                    $scope.newcartdetails = mFoodCart.get_cart();
                    console.log($scope.newcartdetails);
                    $scope.getCartTotals();
                    $scope.save_to_db();
                }else{
                    //alert(2);
                    var message = res.data;
                    DevExpress.ui.notify({
                        message: message,
                        position: {
                            my: "center top",
                            at: "center top"
                        }
                    }, "error", 3000);
                    $scope.newcartdetails = mFoodCart.get_cart();
                    console.log($scope.newcartdetails);
                    if($scope.newcartdetails) {
                        angular.forEach($scope.newcartdetails, function (v) {
                            //$scope.cartIds.push(v.offer_id);
                            //$scope.cartQty.push(v.quantity);
                            //console.log(v);
                            //alert(v.offer_id);
                            //alert(data.offer_id);
                            if(data.offer_id == v.offer_id){
                                //alert(v.offer_id);
                                //mFoodCart.update_cart_quantity(v.offer_id, v.previous_quantity);
                            }

                        })
                    }
                    //$scope.cartDetails = mFoodCart.get_cart();
                    $scope.getCartTotals();


                }


            })
        }
        else
        {
            $scope.newcartdetails = mFoodCart.get_cart();
            //console.log($scope.newcartdetails);
            if($scope.newcartdetails) {
                angular.forEach($scope.newcartdetails, function (v) {
                    //$scope.cartIds.push(v.offer_id);
                    //$scope.cartQty.push(v.quantity);
                    mFoodCart.update_cart_previousquantity(v.offer_id, v.quantity);
                })
            }

            mFoodCart.update_cart_quantity(data.offer_id, data.quantity);
            $scope.newcartdetails = mFoodCart.get_cart();
            console.log($scope.newcartdetails);
            $scope.getCartTotals();
        }
    }

    $scope.cart_total = 0;
    $scope.cart_total_points = 0;

    $scope.getCartTotals = function(){
        $scope.cart_total = 0;
        $scope.cart_total_points = 0;
        $scope.cart_ttl_point = [];
        $scope.cart_ttl_cnt = [];
        $scope.cartDetails = mFoodCart.get_cart();
        //console.log($scope.cartDetails);
        angular.forEach($scope.cartDetails,function(value){
            if(value.paymentscash == true){
                $scope.cart_total = $scope.cart_total + (value.quantity * value.offer_price);
                $scope.cart_total_points += (value.quantity * value.mpoints);
            }

            //alert($scope.cart_ttl_cnt.length);
            if(value.payments == true){
                if($scope.cart_ttl_cnt.length != 0){
                    if($scope.cart_ttl_cnt.indexOf(value.point_id)== -1){
                        $scope.cart_ttl_point.push(value.point_id);
                        $scope.cart_ttl_point[$scope.cart_ttl_point.length-1]={};
                        //$scope.cart_ttl_point[value.point_id].id = value.point_id;
                        //alert('aa'+$scope.cart_ttl_point.length-1);
                        $scope.cart_ttl_point[$scope.cart_ttl_point.length-1].point_name = value.point_name;
                        $scope.cart_ttl_point[$scope.cart_ttl_point.length-1].point_value = (value.mpoints*value.quantity);
                        $scope.cart_ttl_cnt.push(value.point_id);
                    }else {

                        //$scope.cart_ttl_point[$scope.cart_ttl_cnt.indexOf(value.point_id)].id = value.point_id;
                        //alert('aaa'+$scope.cart_ttl_cnt.indexOf(value.point_id));
                        $scope.cart_ttl_point[$scope.cart_ttl_cnt.indexOf(value.point_id)].point_name = value.point_name;
                        $scope.cart_ttl_point[$scope.cart_ttl_cnt.indexOf(value.point_id)].point_value = parseInt($scope.cart_ttl_point[$scope.cart_ttl_cnt.indexOf(value.point_id)].point_value) + parseInt(value.mpoints*value.quantity);
                        //$scope.cart_ttl_cnt.push(value.point_id);
                    }
                }else{
                    //console.log(value.point_id);
                    //alert(value.point_id);
                    $scope.cart_ttl_point.push(value.point_id);
                    //alert('a'+$scope.cart_ttl_point.length-1);
                    $scope.cart_ttl_point[$scope.cart_ttl_point.length-1]={};
                    $scope.cart_ttl_point[$scope.cart_ttl_point.length-1].point_name = value.point_name;
                    $scope.cart_ttl_point[$scope.cart_ttl_point.length-1].point_value = (value.mpoints*value.quantity);
                    $scope.cart_ttl_cnt.push(value.point_id);
                }
            }



        })

        console.log($scope.cart_ttl_point);
    }

    $scope.pay_now = function(){
        $scope.cartIds = [];
        $scope.cartQty = [];
        $scope.cartDetails = mFoodCart.get_cart();
        //console.log($scope.cartDetails);
        //return false;
        if($scope.cartDetails)
        {
            angular.forEach($scope.cartDetails,function(v){
                if(v.event == 0 && v.resell == 0){
                    $scope.cartIds.push(v.offer_id);
                    $scope.cartQty.push(v.quantity);
                }

            })

            if($scope.cartIds)
            {
                if($scope.loggedindetails){
                    $scope.uuser_id = $scope.loggedindetails.id;
                }else{
                    $scope.uuser_id = '';
                }

                $http({
                    method: "POST",
                    url: $rootScope.serviceurl+"checkOffersQuantity",
                    headers: {'Content-Type': 'application/json'},
                    data:{offer_ids:$scope.cartIds,offer_qty:$scope.cartQty,cart:$scope.cartDetails,user_id:$scope.uuser_id}
                }).success(function(data) {
                    //return false;
                    if(data.type=='success'){
                        $location.path("/cartpage");
                    }else{
                        //alert(2);
                        var message = data.message;
                        DevExpress.ui.notify({
                            message: message,
                            position: {
                                my: "center top",
                                at: "center top"
                            }
                        }, "error", 3000);
                    }
                    $scope.newcartdetails = mFoodCart.get_cart();
                    if($scope.newcartdetails) {
                        angular.forEach($scope.newcartdetails, function (v) {
                            //$scope.cartIds.push(v.offer_id);
                            //$scope.cartQty.push(v.quantity);
                            //v.offer_ids
                           /* angular.forEach(data.offer_ids, function (v_id) {
                                if (v.offer_id == v_id) {
                                    //mFoodCart.update_cart_quantity(v.offer_id, v.previous_quantity);
                                }
                            });*/

                            $scope.cartDetails = mFoodCart.get_cart();
                        })
                    }

                })
            }

        }
        //return false;

        /*
        $scope.cartDetails = mFoodCart.get_cart();
        console.log($scope.cartDetails);
        if(!$scope.loggedindetails){
            var ret = $location.path();
            $location.path("/login").search('returnUrl', ret);
        }
        else {
            $scope.getCartTotals();
            if($scope.payments=='C')
            {
                $http({
                    method: "POST",
                    url: $rootScope.serviceurl+"cart_checkout",
                    headers: {'Content-Type': 'application/json'},
                    data:{cart:$scope.cartDetails,total:$scope.cart_total,user_id:$scope.loggedindetails.id}
                }).success(function(data) {

                    if(data.type == 'success') {
                        //console.log(data.getRelatedPromo);
                        //$scope.related_products = data.getRelatedPromo;
                        //console.log($scope.related_products);
                        $window.location.href = data.url;

                    }
                    else {
                        var message = "Internal error. Please try again later";
                        DevExpress.ui.notify({
                            message: message,
                            position: {
                                my: "center top",
                                at: "center top"
                            }
                        }, "error", 3000);
                    }
                })
            }
            else {
                if($scope.mpoints>=$scope.cart_total_points) {
                    $http({
                        method: "POST",
                        url: $rootScope.serviceurl + "redeemUserPoints",
                        headers: {'Content-Type': 'application/json'},
                        data: {cart:$scope.cartDetails,points: $scope.cart_total_points, user_id: $scope.loggedindetails.id}
                    }).success(function (data) {

                        if (data.status == 'success') {
                            $cookieStore.remove('cart');
                            //console.log(data.getRelatedPromo);
                            //$scope.related_products = data.getRelatedPromo;
                            //console.log($scope.related_products);
                            //$window.location.href = data.url;
                            var message = "Redeem successfull.";
                            DevExpress.ui.notify({
                                message: message,
                                position: {
                                    my: "center top",
                                    at: "center top"
                                }
                            }, "success", 3000);
                            $location.path('/');
                        }
                        else {
                            var message = "Internal error. Please try again later";
                            DevExpress.ui.notify({
                                message: message,
                                position: {
                                    my: "center top",
                                    at: "center top"
                                }
                            }, "error", 3000);
                        }
                    })
                }
                else {
                    var message = "You don't have sufficient points to redeem.";
                    DevExpress.ui.notify({
                        message: message,
                        position: {
                            my: "center top",
                            at: "center top"
                        }
                    }, "error", 3000);
                }

            }
        }*/
        /**/
    }

    $scope.delete_from_cart = function (id,event_promo)
    {
        if($scope.loggedindetails) {
            $http({
                method: "POST",
                url: $rootScope.serviceurl + "deleteFromCart",
                headers: {'Content-Type': 'application/json'},
                data: {user_id: $scope.loggedindetails.id, offer_id: id,event_promo:event_promo}
            }).success(function (data) {
            })
        }
    }

    $scope.remove_offer = function(offer_id){
        mFoodCart.remove(offer_id);
        $scope.getCartTotals();
        $scope.event_promo = 'p';
        $scope.delete_from_cart(offer_id,$scope.event_promo);
    }

    $scope.remove_offer_payment = function(offer_id){
        mFoodCart.remove(offer_id);
        $scope.getCartTotals();
        $scope.event_promo = 'p';
        $scope.delete_from_cart(offer_id,$scope.event_promo);
    }
    $scope.remove_event = function(offer_id){
        mFoodCart.remove(offer_id);
        $scope.getCartTotals();
        $scope.event_promo = 'e';
        $scope.delete_from_cart(offer_id,$scope.event_promo);
    }

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

    $scope.pageLink = encodeURIComponent($rootScope.siteurl+'promodetails/'+$stateParams.promoId);

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
            link: $rootScope.siteurl+'promodetails/'+$stateParams.promoId,
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
