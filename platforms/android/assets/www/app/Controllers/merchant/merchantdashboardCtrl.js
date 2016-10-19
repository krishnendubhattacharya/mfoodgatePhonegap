'use strict';
/** 
 * controllers used for the login
 */
app.controller('merchantdashboardCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {

    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    if(!$scope.loggedindetails){

        $location.path("/login");
    }

    $scope.summeryTab = 1;
    $scope.transactionTab = 1;

    $scope.summeryTabShowHide = function () {
        if($scope.summeryTab == 1){
            $scope.summeryTab = 0;
        }else{
            $scope.summeryTab = 1;
        }
    }
    $scope.transactionTabShowHide = function () {
        if($scope.transactionTab == 1){
            $scope.transactionTab = 0;
        }else{
            $scope.transactionTab = 1;
        }
    }

    $scope.redirectto = function (id) {
        console.log(id);
        $location.path('/promodetails/' + id);
    }

    $scope.all_outlet = [];
    $scope.all_restaurant = [];
    $scope.autoidArray = [];
    $scope.residArray = [];
    $scope.reshow = false;
    $scope.reshow1 = false;
    $scope.reshow2 = false;
    $scope.reshow3 = false;

    $scope.getUptodateInfo = function () {
        $scope.curDt = new Date();
        //console.log(d);
        $scope.current_date = moment($scope.curDt).format("YYYY-MM-DD");
        $scope.current_year = moment($scope.curDt).format("YYYY");
        $scope.current_month = moment($scope.curDt).format("MM");
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getAllInfoUptoDate/"+$scope.loggedindetails.id,
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            //console.log(data);
            $scope.uptodateInfo =data.data;
            $scope.member_graph =data.member_graph;
            $scope.new_member_graph =data.new_member_graph;
            $scope.promo_graph =data.promo_graph;
            $scope.order_graph =data.order_graph;
            $scope.order_graph_format =data.order_graph_format;
            $scope.month_name =data.month_name;

            $scope.dataSource = [{
                day: "All",
                oranges: $scope.member_graph.all
            }, {
                day: "A",
                oranges: $scope.member_graph.active_user
            }, {
                day: "N A",
                oranges: $scope.member_graph.inactive_user
            }, {
                day: "F",
                oranges: $scope.member_graph.female_user
            }, {
                day: "M",
                oranges: $scope.member_graph.male_user
            }, {
                day: "P M",
                oranges: $scope.member_graph.purchase_member
            }];

            $scope.dataSource1 = [{
                day: $scope.month_name.first,
                oranges: $scope.new_member_graph.first
            }, {
                day: $scope.month_name.second,
                oranges: $scope.new_member_graph.second
            }, {
                day: $scope.month_name.third,
                oranges: $scope.new_member_graph.third
            }, {
                day: $scope.month_name.fourth,
                oranges: $scope.new_member_graph.fourth
            }, {
                day: $scope.month_name.fifth,
                oranges: $scope.new_member_graph.fifth
            }, {
                day: $scope.month_name.sixth,
                oranges: $scope.new_member_graph.sixth
            }];
            $scope.dataSource2 = [{
                day: $scope.month_name.first,
                oranges: $scope.promo_graph.first
            }, {
                day: $scope.month_name.second,
                oranges: $scope.promo_graph.second
            }, {
                day: $scope.month_name.third,
                oranges: $scope.promo_graph.third
            }, {
                day: $scope.month_name.fourth,
                oranges: $scope.promo_graph.fourth
            }, {
                day: $scope.month_name.fifth,
                oranges: $scope.promo_graph.fifth
            }, {
                day: $scope.month_name.sixth,
                oranges: $scope.promo_graph.sixth
            }];
            $scope.dataSource3 = [{
                day: $scope.month_name.first,
                oranges: $scope.order_graph_format.first
            }, {
                day: $scope.month_name.second,
                oranges: $scope.order_graph_format.second
            }, {
                day: $scope.month_name.third,
                oranges: $scope.order_graph_format.third
            }, {
                day: $scope.month_name.fourth,
                oranges: $scope.order_graph_format.fourth
            }, {
                day: $scope.month_name.fifth,
                oranges: $scope.order_graph_format.fifth
            }, {
                day: $scope.month_name.sixth,
                oranges: $scope.order_graph_format.sixth
            }];
            $scope.reshow =true;
            $scope.reshow1 =true;
            $scope.reshow2 = true;
            $scope.reshow3 = true;
            //console.log($scope.dataSource);


        });

        $http({
            method: "POST",
            url: $rootScope.serviceurl + "getAllInfoDateRange",
            data: {"merchant_id":$scope.loggedindetails.id,"from_date":$scope.current_year+"-"+$scope.current_month+"-1","to_date":$scope.current_date},
            headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            console.log(data);
            $scope.rangeInfo =data.data;

        });

    }
    $scope.getUptodateInfo();

    $scope.getRestaurants = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getActiveMerchantRestaurant/"+$scope.loggedindetails.id,

        }).success(function (data) {
            $scope.all_restaurant = [];
            angular.forEach(data.restaurants,function(val){
                $scope.all_restaurant.push({name:val.title,id:val.id,'res_id':val.restaurant_id});
            })
            console.log($scope.all_restaurant);
        });

    }
    $scope.getRestaurants();
    //$scope.rescheck=[];

    $scope.checkclick = function () {
        console.log($scope.rescheck);
    }
    $scope.chkall = function(){
        //alert(12);
        //alert($scope.chka);

        if($scope.chka){
            $scope.all_restaurantt = $scope.all_restaurant;
            //console.log($scope.all_restaurant);
            $scope.all_restaurant = [];
            $scope.autoidArray = [];
            $scope.residArray = [];
            angular.forEach($scope.all_restaurantt,function(val){
                //console.log(val);
                $scope.all_restaurant.push({name:val.name,id:val.id,'res_id':val.res_id,'selected':true});
                $scope.autoidArray.push(val.id);
                $scope.residArray.push(val.res_id);
                $http({
                    method: "POST",
                    url: $rootScope.serviceurl + "getMerchantOutletsBySelectedRestaurant",
                    data: {"restaurant_id":$scope.autoidArray},
                    headers: {'Content-Type': 'application/json'},
                }).success(function (data) {
                    console.log(data);
                    $scope.all_outlet = [];
                    angular.forEach(data.data,function(val){
                        $scope.all_outlet.push({name:val.title,id:val.id,'out_id':val.outlet_id});
                    })

                });
            })
            //console.log($scope.all_restaurant);
        }else{
            $scope.all_restaurantt = $scope.all_restaurant;
            //console.log($scope.all_restaurant);
            $scope.all_restaurant = [];

            angular.forEach($scope.all_restaurantt,function(val){
                //console.log(val);
                $scope.all_restaurant.push({name:val.name,id:val.id,'res_id':val.res_id,'selected':false});

            })
            $scope.all_outlet = [];
        }
    }

    $scope.chkallout = function(){
        //alert(12);
        //alert($scope.chkout);

        if($scope.chkout){
            $scope.all_outlett = $scope.all_outlet;
            //console.log($scope.all_restaurant);
            $scope.all_outlet = [];
            angular.forEach($scope.all_outlett,function(val){
                $scope.all_outlet.push({name:val.name,id:val.id,'out_id':val.out_id,'selected':true});
            })
            //console.log($scope.all_restaurant);
        }else{
            $scope.all_outlett = $scope.all_outlet;
            //console.log($scope.all_restaurant);
            $scope.all_outlet = [];

            angular.forEach($scope.all_outlett,function(val){
                $scope.all_outlet.push({name:val.name,id:val.id,'out_id':val.out_id,'selected':false});
            })
            //$scope.all_outlet = [];
        }
    }

    $scope.outsave = function(){
        $scope.autoidoutArray = [];
        //$scope.residArray = [];
        angular.forEach($scope.all_outlet, function(res){
            if (res.selected) $scope.autoidoutArray.push(res.id);
        });

        if($scope.all_outlet.length > $scope.autoidoutArray.length){
            $scope.chkout = false;
        }



    }

    $scope.save = function(){
        $scope.autoidArray = [];
        $scope.residArray = [];
        angular.forEach($scope.all_restaurant, function(res){
            if (res.selected) $scope.autoidArray.push(res.id);
            if (res.selected) $scope.residArray.push(res.res_id);
        });
        console.log($scope.autoidArray);
        console.log($scope.residArray);
        if($scope.all_restaurant.length > $scope.autoidArray.length){
            $scope.chka = false;
        }

        $http({
            method: "POST",
            url: $rootScope.serviceurl + "getMerchantOutletsBySelectedRestaurant",
            data: {"restaurant_id":$scope.autoidArray},
            headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            console.log(data);
            $scope.all_outlet = [];
            angular.forEach(data.data,function(val){
                $scope.all_outlet.push({name:val.title,id:val.id,'out_id':val.outlet_id});
            })

        });

    }

    $scope.validateAndSubmit = function(params) {

        ///console.log($scope.userInfo);
        $scope.from_date = moment($scope.userInfo.from_date).format("YYYY-MM-DD");
        $scope.to_date = moment($scope.userInfo.to_date).format("YYYY-MM-DD");
        console.log($scope.from_date);
        console.log($scope.to_date);
        //$scope.curDt = new Date();
        //console.log(d);
        //$scope.current_date = moment($scope.curDt).format("YYYY-MM-DD");
        //console.log($scope.current_date);

        $http({
            method: "POST",
            url: $rootScope.serviceurl + "getAllInfoDateRange",
            data: {"merchant_id":$scope.loggedindetails.id,"from_date":$scope.from_date,"to_date":$scope.to_date},
            headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            console.log(data);
            $scope.rangeInfo =data.data;

        });
    };

    $scope.validateAndSubmitTransaction = function(params) {

        $scope.start_date = moment($scope.userInfo.start_date).format("YYYY-MM-DD");
        $scope.end_date = moment($scope.userInfo.end_date).format("YYYY-MM-DD");
        console.log($scope.start_date);
        console.log($scope.end_date);

        $scope.outlArray = [];
        $scope.resArray = [];
        angular.forEach($scope.all_restaurant, function(res){
            //if (res.selected) $scope.autoidArray.push(res.id);
            if (res.selected) $scope.resArray.push(res.res_id);
        });

        angular.forEach($scope.all_outlet, function(outl){
            //if (res.selected) $scope.autoidArray.push(res.id);
            if (outl.selected) $scope.outlArray.push(outl.out_id);
        });
        console.log($scope.outlArray);
        console.log($scope.resArray);

        $http({
            method: "POST",
            url: $rootScope.serviceurl + "transactionTabDetails",
            data: {"merchant_id":$scope.loggedindetails.id,"start_date":$scope.start_date,"end_date":$scope.end_date,"selRes":$scope.resArray,"selout":$scope.outlArray,"type":$scope.trans},
            headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            //console.log(data);
            $scope.transactionInfo =data.data;

        });



    };
    /*$scope.dataSource = [{
        day: "Monday",
        oranges: 3
    }, {
        day: "Tuesday",
        oranges: 2
    }, {
        day: "Wednesday",
        oranges: 3
    }, {
        day: "Thursday",
        oranges: 4
    }, {
        day: "Friday",
        oranges: 6
    }, {
        day: "Saturday",
        oranges: 11
    }, {
        day: "Sunday",
        oranges: 4
    }];*/





});

