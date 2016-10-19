'use strict';
/**
 * controllers used for the login
 */
app.controller('bannereditCtrl', function ($rootScope, $scope, $http, NgMap, $location, myAuth, $cookieStore, $timeout, $stateParams) {


    
    $scope.datepickerOptions = {format: 'yyyy-mm-dd',
                                language: 'en',
                                autoclose: true,
                                weekStart: 0}
    $scope.viewBanner = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getBannerDetails/"+$stateParams.bannerId,
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {

            $http({
                method: "GET",
                url: $rootScope.serviceurl + "getOutletsByRestaurant/"+data.data.banner.restaurant_id,
            }).success(function (data) {
                if(angular.isObject(data))
                {
                    //console.log(data.data);
                    $scope.outletList=data.data;
                    $scope.allOutlet = [];
                    angular.forEach($scope.outletList,function(value){
                        $scope.allOutlet.push({id:value.id,label:value.title})
                    })
                }
            });
            $scope.outletList=data.outlets;
            $scope.outlet_id = [];
            angular.forEach($scope.outletList,function(value){
                $scope.outlet_id.push({id:value.outlet_id})
            })

            $scope.item = { id:data.data.banner.id,
                title:data.data.banner.title,
                "merchant_id":data.data.banner.merchant_id,
                "outlet_id":$scope.outlet_id,
                "target_click":data.data.banner.target_click,
                "cost_per_click":data.data.banner.cost_per_click,
                "income": data.data.banner.income,
                "sharing_cost": data.data.banner.sharing_cost,
                "mpoint_name":data.data.banner.mpoint_name,
                "mpoint_get_per_click":data.data.banner.mpoint_get_per_click,
               "start_date": moment(data.data.banner.start_date).format('YYYY-MM-DD'),
                "end_date": moment(data.data.banner.end_date).format('YYYY-MM-DD'),
                //"start_date": (data.data.banner.start_date),
                //"end_date": (data.data.banner.end_date),
                "image_url": data.data.banner.image_url,
                "description": data.data.banner.description,
                "is_active":data.data.banner.is_active,
                "restaurant_id":data.data.banner.restaurant_id,

                /*"merchant_id":'',
                "start_date": '',
                "end_date":'',
                "target_click": '',
                "cost_per_click": '',
                "income":'',
                "sharing_cost":'',
                "mpoint_name":'',
                "mpoint_get_per_click": '',
                "is_active": '',
                "image": '',
                "restaurant_id":'',*/
            }
            $http({
                method: "GET",
                url: $rootScope.serviceurl + "getResturantByMerchant/"+data.data.banner.merchant_id,
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
                url: $rootScope.serviceurl + "updateBanner/"+$stateParams.bannerId,
                data: $scope.item,
                headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                // $scope.viewOutlet();

                $location.path('/admin/banner');
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




    $scope.cancelBanner = function(){
        $location.path('/admin/banner');
    }


    $scope.getOutlet = function(res_id){
        $scope.item.outlet_id = [];
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getOutletsByRestaurant/"+res_id,
        }).success(function (data) {
            if(angular.isObject(data))
            {
                //console.log(data.data);
                $scope.outletList=data.data;
                $scope.allOutlet = [];
                angular.forEach($scope.outletList,function(value){
                    $scope.allOutlet.push({id:value.id,label:value.title})
                })
            }
        });

    }



    //$scope.getLoginDetails();



});

