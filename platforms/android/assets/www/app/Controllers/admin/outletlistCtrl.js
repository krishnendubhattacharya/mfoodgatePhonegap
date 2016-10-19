'use strict';
/**
 * controllers used for the login
 */
app.controller('outletlistCtrl', function ($rootScope, $scope, $http, $location, myAuth, NgMap, $cookieStore,$timeout,$stateParams) {

    $scope.placeChanged = function() {
        $scope.place = this.getPlace();
        $scope.item.lat=$scope.place.geometry.location.lat();
        $scope.item.lng=$scope.place.geometry.location.lng();
        console.log('Lat:'+$scope.item.lat+" Lng:"+$scope.item.lng);
        //$scope.map.setCenter($scope.place.geometry.location);
    }
    NgMap.getMap().then(function(map) {
        $scope.map = map;
    });
    $scope.viewOutlet = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getOutletsByRestaurant/"+$stateParams.resturantId,
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {

            $scope.alloutlet = data.data;
            $timeout(function(){

                $scope.table=  angular.element('#outletsList').DataTable({
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
        $scope.outletView='view';
    }
    $scope.getCategories = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "categories",
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            if(angular.isObject(data))
            {
                $scope.categoryList=data.category;
                $scope.allCat = [];
                angular.forEach($scope.categoryList,function(value){
                    $scope.allCat.push({id:value.id,label:value.name})
                })
            }
        });

    }

    $scope.getLocation = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getLocations",
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            console.log(data);
            if(angular.isObject(data))
            {
                $scope.locationList=data.location;
                $scope.locCat = [];
                angular.forEach($scope.locationList,function(value){
                    $scope.locCat.push({id:value.id,label:value.city})
                })
            }
        });

    }


    $scope.viewOutlet();

    $scope.editOutlet = function (params) {

        setTimeout(function () {
            $scope.$apply(function () {
                $scope.item = params;
            });
        }, 2000);


        //console.log(params);$scope.item = params;
        //setTimeout(function(){$scope.item = params},1000);
        $scope.outletView='edit';
    }


    $scope.addOutlet = function () {
        //alert(13);
        $scope.item={
            "title": '',
            "category_id":[],
            "id": '',
            "address": '',
            "lat": '',
            "lng": '',
            "is_active":0,
            "location_id":[],
            "resturant_id":$stateParams.resturantId,
        };console.log($scope.item);
        /*$scope.example1model = [];
         $scope.example1data = [
         {id: 1, label: "David"},
         {id: 2, label: "Jhon"},
         {id: 3, label: "Danny"}];*/
        $scope.outletView='edit';
    }

    $scope.cancelOutlet = function () {
        $scope.viewOutlet();
    }

    $scope.saveOutlet = function () {
        console.log($scope.item);
        //return false;
        if($scope.item.id == '') {
            $http({
                method: "POST",
                url: $rootScope.serviceurl + "addOutlet",
                data: $scope.item,
                headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                $scope.viewOutlet();
                $scope.item={};
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }else{
            $http({
                method: "PUT",
                url: $rootScope.serviceurl + "updateOutlet/"+$scope.item.id,
                data: {"city": $scope.item.city, "country_id": $scope.item.country_id,"is_active": $scope.item.is_active},
                headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                $scope.viewOutlet();
                $scope.item={};
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }

    }

    $scope.deleteOutlet = function (c_id) {
        //alert(c_id);
        if ( window.confirm("Want to delete?") ) {
            $http({
                method: "DELETE",
                url: $rootScope.serviceurl + "deleteOutlet/"+c_id,
                //data: {"name": $scope.item.name,"is_active": $scope.item.is_active},
                //headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                $scope.viewOutlet();
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }else{

        }

    }




    //$scope.getLoginDetails();



});

