'use strict';
/**
 * controllers used for the login
 */
app.controller('bannerCtrl', function ($rootScope, $scope, $http, $location, myAuth, NgMap, $cookieStore,$timeout,$stateParams) {
    $stateParams.resturantId = 1;
    $scope.placeChanged = function() {
        $scope.place = this.getPlace();
        $scope.item.lat=$scope.place.geometry.location.lat();
        $scope.item.lng=$scope.place.geometry.location.lng();
        console.log('Lat:'+$scope.item.lat+" Lng:"+$scope.item.lng);
        //$scope.map.setCenter($scope.place.geometry.location);
    }
    /*NgMap.getMap().then(function(map) {
        $scope.map = map;
    });*/
    $scope.datepickerOptions = {format: 'yyyy-mm-dd',
        language: 'en',
        autoclose: true,
        weekStart: 0}
    $scope.viewBanner = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getAllBanner",
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {

            $scope.allbanner = data.banner;
            $timeout(function(){

                $scope.table=  angular.element('#promosList').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "searching": true,
                    "ordering": true,
                    "info": true,
                    "autoWidth": false
                });
            }, 3000, false);
            //console.log($scope.allcat);


        });
        $scope.bannerView='view';
    }


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





    $scope.viewBanner();

    $scope.editPromo = function (params) {

        setTimeout(function () {
            $scope.$apply(function () {
                $scope.item = params;
            });
        }, 2000);


        //console.log(params);$scope.item = params;
        //setTimeout(function(){$scope.item = params},1000);
        $scope.bannerView='edit';
    }


    $scope.addBanner = function () {
        //alert(13);
        $scope.item={
            title:'',
            "merchant_id":'',
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
            "restaurant_id":'',
            "description": '',
            "outlet_id":[],
        };console.log($scope.item);
        /*$scope.example1model = [];
         $scope.example1data = [
         {id: 1, label: "David"},
         {id: 2, label: "Jhon"},
         {id: 3, label: "Danny"}];*/
        $scope.bannerView='edit';
    }

    $scope.cancelBanner = function () {
        $scope.viewBanner();
    }

    $scope.saveBanner = function () {
        console.log($scope.item);
        //return false;


                $http({
                    method: "POST",
                    url: $rootScope.serviceurl + "addBanner",
                    data: $scope.item,
                    headers: {'Content-Type': 'application/json'},
                }).success(function (data) {
                    console.log(data);
                    $scope.viewBanner();
                    $scope.item={};
                    //$scope.allcat = data.category;
                    //console.log($scope.allcat);
                });




    }

    $scope.deleteBanner = function (c_id) {
        //alert(c_id);
        if ( window.confirm("Want to delete?") ) {
            $http({
                method: "DELETE",
                url: $rootScope.serviceurl + "deleteBanner/"+c_id,
                //data: {"name": $scope.item.name,"is_active": $scope.item.is_active},
                //headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                //console.log(data);
                $scope.viewBanner();
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }else{

        }

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

    $scope.getOutlet = function(res_id){
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

