app.controller('cartpageCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth, NgMap,mFoodCart,$window,$cookieStore) {
    $scope.promoId = $stateParams.promoId;
    $scope.loggedindetails = myAuth.getUserNavlinks();


    $scope.cartIds = [];
    $scope.cartisresell = [];
    $scope.cartDetails = mFoodCart.get_cart();

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

    $scope.save_to_db = function() {
        $scope.cartDetails = mFoodCart.get_cart();
        console.log($scope.cartDetails);
        if ($scope.loggedindetails) {
            /*$http({
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
                    //$scope.getCartDetails();
                }
            }*/
            $scope.cartDetails = mFoodCart.get_cart();
            $scope.getCartTotals();
        }
    }
    $scope.save_to_db();



    $scope.getPromoDetails = function(){
        //alert($scope.cartDetails[0].offer_id);
        $http({
            method: "GET",
            url: $rootScope.serviceurl+"getPromoDetails/" +$scope.cartDetails[0].offer_id,
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            if(data.type == 'success') {
                $scope.promodetails = data.offer;
                $scope.condition = data.offer.conditions;
                if($scope.loggedindetails)
                {
                    $scope.getUsersPoints();
                }
            }
        })
    }
    $scope.getPromoDetails();

    //$scope.$watch(function(){
    //    var cart=$cookieStore.get('cart');
    //    if(cart)
    //        $scope.getCartDetails();
    //});

    $scope.mpoints = 0;
    NgMap.getMap().then(function(map) {
        $scope.map = map;
    });

    $scope.getUsersPoints = function()
    {
        $http({
            method: "GET",
            url: $rootScope.serviceurl+"getUsersPoints/" + $scope.loggedindetails.id+"/"+$scope.promodetails.id,
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            if(data.status == 'success') {
                $scope.mpoints = data.data.sum;
            }
        })
    }






    $scope.add_to_cart = function(){
        var cart_obj = {
            offer_id            :   $scope.promodetails.id,
            restaurant_id       :   $scope.restaurant.id,
            offer_title         :   $scope.promodetails.title,
            restaurant_title    :   $scope.restaurant.title,
            offer_percent       :   $scope.promodetails.offer_percent,
            price               :   $scope.promodetails.price,
            mpoints             :   $scope.promodetails.mpoints,
            offer_price         :   $scope.promodetails.offer_price,
            quantity            :   1,
            previous_quantity   :   1,
            image               :   $scope.promodetails.image,
            point_id            :   $scope.promodetails.point_master_id,
            point_name          :   $scope.pointdetails[0].name,
            condtn              :   $scope.promodetails.conditions
        }
        mFoodCart.add_to_cart(cart_obj);
        $scope.cartDetails = mFoodCart.get_cart();
        if($scope.cartDetails) {
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
        }
        //console.log($scope.cartDetails);
        $scope.getCartTotals();
        console.log('hi');
        $scope.save_to_db();
        console.log('hello');
    }

    $scope.getCartDetails = function() {
        $scope.cartDetails = mFoodCart.get_cart();
        //console.log('cart',$scope.cartDetails);
    }
    $scope.getCartDetails();


    if($scope.cartDetails)
    {
        angular.forEach($scope.cartDetails,function(v){
            if(v.event == 0){
                $scope.cartIds.push(v.offer_id);
                $scope.cartisresell.push(v.isresell);
            }
        })

        if($scope.cartIds)
        {
            if($scope.loggedindetails.id){
                $scope.user_id = $scope.loggedindetails.id;
            }else{
                $scope.user_id = "";
            }
            $http({
                method: "POST",
                url: $rootScope.serviceurl+"checkExpiredOffers",
                headers: {'Content-Type': 'application/json'},
                data:{offer_ids:$scope.cartIds,user_id:$scope.user_id,cartisresell:$scope.cartisresell}
            }).success(function(data) {
                if(data.type=='success')
                {
                    angular.forEach(data.ids,function(v){
                        $scope.remove_offer(v);
                    })
                    var message = data.data;
                    DevExpress.ui.notify({
                        message: message,
                        position: {
                            my: "center top",
                            at: "center top"
                        }
                    }, "error", 3000);

                }
                console.log(data);
            })
        }
        console.log("===================IDS================", $scope.cartIds);
    }

    /*$scope.updateCheck = function(data,offerId,paytype){
        //console.log(data);
        $scope.newcartdetails = mFoodCart.get_cart();
        //console.log($scope.newcartdetails);
        if($scope.newcartdetails) {
            angular.forEach($scope.newcartdetails, function (v) {
                //$scope.cartIds.push(v.offer_id);
                //$scope.cartQty.push(v.quantity);
                //console.log(v);
                //alert(v.offer_id);
                //alert(data.offer_id);
                if(offerId == v.offer_id){
                    //alert(v.offer_id);
                    if(paytype =='p') {
                        if (v.payments == true)
                            mFoodCart.update_cart_payment(v.offer_id, 0);
                        else if (v.payments == false)
                            mFoodCart.update_cart_payment(v.offer_id, 1);
                    }
                    if(paytype =='c') {
                        if (v.paymentscash == true)
                            mFoodCart.update_cart_paymentcash(v.offer_id, 0);
                        else if (v.paymentscash == false)
                            mFoodCart.update_cart_paymentcash(v.offer_id, 1);
                    }
                }

            })
        }
        $scope.cartDetails = mFoodCart.get_cart();
        //console.log($scope.cartDetails);
        $scope.remove_offer();

    }*/
    $scope.updateCheck = function(data,offerId,paytype){
        //console.log(data);
        $scope.newcartdetails = mFoodCart.get_cart();
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
        if(data.quantity>0) {
            if ($scope.loggedindetails) {
                $http({
                    method: "POST",
                    url: $rootScope.serviceurl+"updateCartQuantity",
                    headers: {'Content-Type': 'application/json'},
                    data:{item:data,user_id:$scope.loggedindetails.id}
                }).success(function(res) {
                    if(res.type=='success') {
                        mFoodCart.update_cart_quantity(data.offer_id, data.quantity);
                        mFoodCart.update_cart_previousquantity(data.offer_id, data.quantity);
                        $scope.getCartTotals();
                        $scope.save_to_db();
                    }else{
                        var message = res.data;
                        DevExpress.ui.notify({
                            message: message,
                            position: {
                                my: "center top",
                                at: "center top"
                            }
                        }, "error", 3000);
                        $scope.getCartTotals();
                    }

                })
            }
            else
            {
                mFoodCart.update_cart_quantity(data.offer_id, data.quantity);
                $scope.getCartTotals();
            }
        }
    }

    $scope.cart_total = 0;
    $scope.cart_total_points = 0;

    /*$scope.getCartTotals = function(){
        $scope.cart_total = 0;
        $scope.cart_total_points = 0;
        $scope.cartDetails = mFoodCart.get_cart();
        angular.forEach($scope.cartDetails,function(value){
            $scope.cart_total = $scope.cart_total + (value.quantity * value.offer_price);
            $scope.cart_total_points += (value.quantity * value.mpoints);
        })
    }*/

    $scope.pay_now = function() {
       // alert($scope.mpoints);
       // alert($scope.cart_total_points);
        //alert($scope.condition);
        //return false;

        $scope.cartDetails = mFoodCart.get_cart();
        //console.log($scope.cartDetails);

        if (!$scope.loggedindetails) {
            var ret = $location.path();
            $location.path("/login").search('returnUrl', ret);
        }
        else {
            if(!$scope.loggedindetails.first_name) {
                $location.path("/profile");
            }else {
                $scope.getCartTotals();
                $http({
                    method: "POST",
                    url: $rootScope.serviceurl + "checkOffersPoint",
                    headers: {'Content-Type': 'application/json'},
                    data: {
                        cart: $scope.cartDetails,
                        user_id: $scope.loggedindetails.id
                    }
                    }).success(function (data) {
                        console.log(data);
                        //return false;
                        if(data.type=='success'){
                            $scope.isPointRedeem = 0;
                            $scope.isPrice = 0;
                            $scope.isOnlyPrice = 1;
                            localStorage.setItem('onlyPrice', $scope.isOnlyPrice);
                            angular.forEach($scope.cartDetails, function (v) {

                                if (v.payments == true)
                                    $scope.isPointRedeem = 1;

                                if (v.paymentscash == true)
                                    $scope.isPrice = 1;
                            });
                            //alert($scope.isPointRedeem);
                            //alert($scope.isPrice );
                            if($scope.isPointRedeem == 1){
                                $http({
                                    method: "POST",
                                    url: $rootScope.serviceurl + "redeemUserPoints",
                                    headers: {'Content-Type': 'application/json'},
                                    data: {
                                        cart: $scope.cartDetails,
                                        points: $scope.cart_total_points,
                                        user_id: $scope.loggedindetails.id
                                    }
                                }).success(function (data) {

                                        //console.log(data);
                                        //return false;

                                    if (data.status == 'success') {
                                        //console.log(data);
                                        $scope.isOnlyPrice = 0;
                                        localStorage.setItem('onlyPrice', $scope.isOnlyPrice);
                                        if($scope.isPrice == 0) {
                                            angular.forEach($scope.cartDetails, function (v) {
                                                $scope.remove_offer_payment(v.offer_id);
                                            });
                                            localStorage.removeItem('cart');
                                            var message = "Redeem Point success and your points have been deducted.";
                                            DevExpress.ui.notify({
                                                message: message,
                                                position: {
                                                    my: "center top",
                                                    at: "center top"
                                                }
                                            }, "success", 3000);
                                            $location.path('/');
                                        }
                                        //$cookieStore.remove('cart');
                                        //localStorage.removeItem('cart');
                                        //console.log(data.getRelatedPromo);
                                        //$scope.related_products = data.getRelatedPromo;
                                        //console.log($scope.related_products);
                                        //$window.location.href = data.url;
                                        /*var message = "Redeem successfull.";
                                         DevExpress.ui.notify({
                                         message: message,
                                         position: {
                                         my: "center top",
                                         at: "center top"
                                         }
                                         }, "success", 3000);
                                         $location.path('/');*/
                                    }else{
                                        var message = "Redeem error.";
                                        DevExpress.ui.notify({
                                            message: message,
                                            position: {
                                                my: "center top",
                                                at: "center top"
                                            }
                                        }, "success", 3000);
                                        return false;
                                    }

                                })
                            }
                            if($scope.isPrice == 1){
                                $scope.allcartDetails = $scope.cartDetails
                                angular.forEach($scope.allcartDetails, function (v) {
                                    if(v.condtn == 0){
                                        if(v.payments == true){
                                            $scope.remove_offer_payment(v.offer_id);
                                        }
                                    }
                                });
                                $scope.allcartDetails = mFoodCart.get_cart();
                                //console.log($scope.allcartDetails);
                                if($scope.allcartDetails.length != 0){
                                    $http({
                                        method: "POST",
                                        url: $rootScope.serviceurl + "cart_checkout",
                                        headers: {'Content-Type': 'application/json'},
                                        data: {cart: $scope.allcartDetails, total: $scope.cart_total, user_id: $scope.loggedindetails.id}
                                    }).success(function (data) {

                                        if (data.type == 'success') {
                                            //console.log(data.getRelatedPromo);
                                            //$scope.related_products = data.getRelatedPromo;
                                            console.log(data);
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
                            }


                        }else{
                            //var message = "You don't have sufficient points to redeem.";
                            DevExpress.ui.notify({
                                message: data.message,
                                position: {
                                    my: "center top",
                                    at: "center top"
                                }
                            }, "error", 3000);
                        }
                    });
                    return false;
                /*if($scope.condition == 1) {
                    if ($scope.mpoints >= $scope.cart_total_points) {
                        $http({
                            method: "POST",
                            url: $rootScope.serviceurl + "redeemUserPoints",
                            headers: {'Content-Type': 'application/json'},
                            data: {
                                cart: $scope.cartDetails,
                                points: $scope.cart_total_points,
                                user_id: $scope.loggedindetails.id
                            }
                        }).success(function (data) {

                            if (data.status == 'success') {


                            }

                        })
                    }else {
                        var message = "You don't have sufficient points to redeem.";
                        DevExpress.ui.notify({
                            message: message,
                            position: {
                                my: "center top",
                                at: "center top"
                            }
                        }, "error", 3000);
                        return false;
                    }

                    $http({
                        method: "POST",
                        url: $rootScope.serviceurl + "cart_checkout",
                        headers: {'Content-Type': 'application/json'},
                        data: {cart: $scope.cartDetails, total: $scope.cart_total, user_id: $scope.loggedindetails.id}
                    }).success(function (data) {

                        if (data.type == 'success') {
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
                }else{
                if ($scope.payments == 'C') {
                    $http({
                        method: "POST",
                        url: $rootScope.serviceurl + "cart_checkout",
                        headers: {'Content-Type': 'application/json'},
                        data: {cart: $scope.cartDetails, total: $scope.cart_total, user_id: $scope.loggedindetails.id}
                    }).success(function (data) {

                        if (data.type == 'success') {
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
                    if ($scope.mpoints >= $scope.cart_total_points) {
                        $http({
                            method: "POST",
                            url: $rootScope.serviceurl + "redeemUserPoints",
                            headers: {'Content-Type': 'application/json'},
                            data: {
                                cart: $scope.cartDetails,
                                points: $scope.cart_total_points,
                                user_id: $scope.loggedindetails.id
                            }
                        }).success(function (data) {
                            //console.log(data);
                            //return false;
                            if (data.status == 'success') {
                                //$cookieStore.remove('cart');
                                localStorage.removeItem('cart');
                                //console.log(data.getRelatedPromo);
                                //$scope.related_products = data.getRelatedPromo;
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
        }
    }
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

    $scope.payments = 'C';
});
