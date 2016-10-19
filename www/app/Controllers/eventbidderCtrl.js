app.controller('eventbidderCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth, mFoodCart) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    $scope.bidInfo;
    if(!$scope.loggedindetails){

        $location.path("/login");
    };
    $scope.first_show = 1;
    $scope.second_show = 1;
    $scope.third_show = 1;
    $scope.firstShowHide = function () {
        if($scope.first_show == 1){
            $scope.first_show = 0;
        }else{
            $scope.first_show = 1;
        }
    }
    $scope.secondShowHide = function () {
        if($scope.second_show == 1){
            $scope.second_show = 0;
        }else{
            $scope.second_show = 1;
        }

    }
    $scope.thirdShowHide = function () {
        if($scope.third_show == 1){
            $scope.third_show = 0;
        }else{
            $scope.third_show = 1;
        }

    }




    $scope.dataGridOptions = {
        dataSource: $scope.bidInfo,
        selection: {
            mode: "single"
        },
        paging: {
            pageSize: 5
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [5, 10, 20],
            showInfo: true
        },
        onInitialized : function(e){
            $scope.datagridobj = e.component;
        },
        columns: ["resturant_name","outlet_name","price", "contact_name", "contact_phone",
            {
                caption:'Action',
                width: 200,
                alignment: 'center',
                cellTemplate: function (container, options) {
                    $('<button/>').addClass('dx-button')
                        .text('Detail')
                        .on('dxclick',function(){$scope.event_detail(options.data.id); })
                        .appendTo(container);
				$('<button/>').addClass('dx-button')
                        .text('Accept')
                        .on('dxclick',function(){$scope.accept_event(options.data.id); })
                        .appendTo(container);

                }
            },


        ]
    };

	$scope.dataGridOptionss = {
        dataSource: $scope.bidInfo,
        selection: {
            mode: "single"
        },
        paging: {
            pageSize: 5
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [5, 10, 20],
            showInfo: true
        },
        onInitialized : function(e){
            $scope.datagridobjj = e.component;
        },
        columns: ["price", "email", "name",
            {
                caption:'Action',
                width: 200,
                alignment: 'center',
                cellTemplate: function (container, options) {
                    $('<button/>').addClass('dx-button')
                        .text('Accept')
                        .on('dxclick',function(){$scope.accept_event(options.data.id); })
                        .appendTo(container);


                }
            },


        ]
    };

    $scope.getEventBidder = function() {
        //$scope.edit_mode = false;
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getEventBidsWithUser/" + $stateParams.eventId,
        }).success(function (data) {
            $scope.bidInfo = data.event_bids;
            //console.log($scope.voucherInfo);
            $scope.datagridobj.option('dataSource',$scope.bidInfo);
		//$scope.datagridobjj.option('dataSource',$scope.bidInfo);
        });
    }
    $scope.getEventBidder();

    /*$scope.accept_event = function(bid_id) {
        //$scope.edit_mode = false;
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "acceptEventBid/" + $stateParams.eventId + "/" +bid_id,
        }).success(function (data) {
            //$scope.bidInfo = data.event_bids;
            //console.log($scope.voucherInfo);
            //$scope.datagridobj.option('dataSource',$scope.bidInfo);
            if (data.type == 'success') {
                var message = data.message;
                //params.validationGroup.reset();
                //$location.path('/login');
                //$scope.getUserInfo();
                //$location.path('/merchantoffer');
                DevExpress.ui.notify({
                    message: message,
                    position: {
                        my: "center top",
                        at: "center top"
                    }
                }, "success", 3000);
                $location.path('/myevent');
            } else {
                var message = "Error occured.";
                DevExpress.ui.notify({
                    message: message,
                    position: {
                        my: "center top",
                        at: "center top"
                    }
                }, "error", 3000);
            }
        });
    }*/

    $scope.accept_event = function(bid_id) {
        //$scope.edit_mode = false;
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getEventBidDetail/" +bid_id,
        }).success(function (data) {
                console.log(data);
            if (data.type == 'success') {

                var cart_obj = {
                    offer_id            :   0,
                    restaurant_id       :   0,
                    offer_title         :   data.events.title,
                    restaurant_title    :   'Event',
                    offer_percent       :   0,
                    price               :   data.event_bid.price,
                    mpoints             :   0,
                    offer_price         :   data.event_bid.price,
                    quantity            :   1,
                    previous_quantity   :   1,
                    image               :   data.events.image,
                    point_id            :   0,
                    point_name          :   '',
                    condtn              :   0,
                    payments            :   false,
                    paymentscash        :   true,
                    resell              :   0,
                    resell_id           :   0,
                    event               :   1,
                    event_id            :   data.events.id,
                    event_price         :   data.event_bid.price,
                    event_bid_id        :   data.event_bid.id
                }
                console.log(cart_obj);
                //localStorage.setItem('cart', null);
                mFoodCart.add_to_cart(cart_obj);
                $scope.save_to_db();
                 $location.path('/myevent');
                 DevExpress.ui.notify({
                    message: 'You have successfully accepted the bid.',
                    position: {
                        my: "center top",
                        at: "center top"
                    }
                }, "success", 3000);
            } else {

            }
        });
    }

    $scope.save_to_db = function() {
        console.log("saving -1",$scope.loggedindetails);
        if ($scope.loggedindetails) {
            $scope.cartDetails = mFoodCart.get_cart();
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
                    console.log(mFoodCart.get_cart());

                }
            })
        }
    }

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
    
    $scope.event_detail = function (event_id) {

        $location.path('/eventbiddetail/' + event_id);
    }


















});
