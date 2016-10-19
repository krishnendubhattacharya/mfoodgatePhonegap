'use strict';
/**
 * controllers used for the login
 */
app.controller('advertisementeditCtrl', function ($rootScope, $scope, $http, NgMap, $location, myAuth, $cookieStore, $timeout, $stateParams) {


    
    $scope.datepickerOptions = {format: 'yyyy-mm-dd',
                                language: 'en',
                                autoclose: true,
                                weekStart: 0}
    $scope.viewBanner = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getAdsDetails/"+$stateParams.addvertiseId,
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {

            $scope.locationList=data.data.locations;
            $scope.location_id = [];
            angular.forEach($scope.locationList,function(value){
                $scope.location_id.push({id:value.location_id})
            })
            //$scope.getOutletsByRestaurant(data.data.restaurant.restaurant_id);

            $http({
                method: "GET",
                url: $rootScope.serviceurl + "getOutletsByRestaurant/" + data.data.restaurant.restaurant_id,
                //data: {"email":$scope.email,"password":$scope.password},
                //headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                if(angular.isObject(data))
                {
                    //console.log(data.data);
                    $scope.outletList=data.data;
                    $scope.outlets = [];
                    angular.forEach($scope.outletList,function(value){
                        $scope.outlets.push({id:value.id,label:value.title})
                    })
                }
            });

            $scope.outlet_id = [];
            angular.forEach(data.data.outlets,function(value){
                $scope.outlet_id.push({id:value.outlet_id})
            })

            $scope.item = { id:data.data.restaurant.id,
                title:data.data.restaurant.title,
                description:data.data.restaurant.description,
                "merchant_id":data.data.restaurant.merchant_id,
                "target_click":data.data.restaurant.target_click,
                "cost_per_click":data.data.restaurant.cost_per_click,
                "income": data.data.restaurant.income,
                "sharing_cost": data.data.restaurant.sharing_cost,
                "mpoint_name":data.data.restaurant.mpoint_name,
                "mpoint_get_per_click":data.data.restaurant.mpoint_get_per_click,
                "start_date": moment(data.data.restaurant.start_date).format('YYYY-MM-DD'),
                "end_date": moment(data.data.restaurant.end_date).format('YYYY-MM-DD'),
                "image_url": data.data.restaurant.image_url,
                "is_active":data.data.restaurant.is_active,
                "restaurant_id":data.data.restaurant.restaurant_id,
                "location_id":$scope.location_id,
                "outlet_id":$scope.outlet_id,
                "is_featured":data.data.restaurant.is_featured,
                "is_internal_merchants":data.data.restaurant.is_internal_merchants,
            }
            $http({
                method: "GET",
                url: $rootScope.serviceurl + "getResturantByMerchant/"+data.data.restaurant.merchant_id,
                //data: {"email":$scope.email,"password":$scope.password},
                //headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                if(angular.isObject(data))
                {
                    //console.log(data.data);
                    $scope.restaurantList=data.restaurants;

                }

            });
            //$scope.getOutlet(data.restaurant.restaurant_id);
        });

    }
    $scope.viewBanner();
    $scope.getRestaurant = function(mer_id){
        $scope.outlets = [];
        $scope.item.outlet_id = [];
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getResturantByMerchant/"+mer_id,
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            if(angular.isObject(data))
            {
                console.log(data.data);
                $scope.restaurantList=data.restaurants;

            }
        });

    }

    $scope.getAllMerchant = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getAllMerchants",
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {

            $scope.merchants = data;

        });
    }
    $scope.getAllMerchant();

    $scope.saveBanner = function () {
        console.log($scope.item);
        //return false;

            $http({
                method: "PUT",
                url: $rootScope.serviceurl + "updateAds/"+$stateParams.addvertiseId,
                data: $scope.item,
                headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                // $scope.viewOutlet();

                $location.path('/admin/advertisementmanagement');
                $scope.item={};
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });


    }

    $scope.getAllPointMaster = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getAllPointMaster",
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {

            $scope.pointsmasters = data.data;

        });
    }
    $scope.getAllPointMaster();

    $scope.getLocation = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getAllAdsLocation",
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            if(angular.isObject(data))
            {
                //console.log(data.data);
                $scope.locationList=data.location;
                $scope.alllocation = [];
                angular.forEach($scope.locationList,function(value){
                    $scope.alllocation.push({id:value.id,label:value.name})
                })
            }
        });

    }

    $scope.getLocation();

    $scope.getOutletsByRestaurant = function(res_id){
        $scope.item.outlet_id = [];
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getOutletsByRestaurant/" + res_id,
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            if(angular.isObject(data))
            {
                //console.log(data.data);
                $scope.outletList=data.data;
                $scope.outlets = [];
                angular.forEach($scope.outletList,function(value){
                    $scope.outlets.push({id:value.id,label:value.title})
                })
            }
        });
    }

    //$scope.getLoginDetails();


    $scope.cancelBanner = function(){
        $location.path('/admin/advertisementmanagement');
    }



    //$scope.getLoginDetails();



});

