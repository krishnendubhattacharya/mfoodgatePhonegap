'use strict';
/**
 * controllers used for the login
 */
app.controller('outleteditCtrl', function ($rootScope, $scope, $http, NgMap, $location, myAuth, $cookieStore, $timeout, $stateParams) {

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
            url: $rootScope.serviceurl + "getOutletDetails/"+$stateParams.outletId,
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {

            $scope.categoryList=data.data.categories;
            $scope.category_id = [];
            angular.forEach($scope.categoryList,function(value){
                $scope.category_id.push({id:value.category_id})
            })

            $scope.location_id = [];
            angular.forEach(data.data.locations,function(val){
                $scope.location_id.push({id:val.location_id});
            })

            $scope.item = { id:data.data.outlet.id,
                title:data.data.outlet.title,
                is_active:data.data.outlet.is_active,
                category_id:$scope.category_id,
                address: data.data.outlet.address,
                lat: data.data.outlet.lat,
                lng: data.data.outlet.lng,
                restaurant_id:data.data.outlet.restaurant_id,
                outlet_id:data.data.outlet.outlet_id,
                location_id:$scope.location_id
            }

        });

    }
    $scope.viewOutlet();
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
    $scope.getLocation();

    $scope.saveOutlet = function () {
        console.log($scope.item);
        //return false;
        if($scope.item.id == '') {
            $http({
                method: "POST",
                url: $rootScope.serviceurl + "addOutlett",
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
                method: "POST",
                url: $rootScope.serviceurl + "updateOutlet",
                data: $scope.item,
                headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                // $scope.viewOutlet();

                $location.path('/admin/outletlist/'+$scope.item.restaurant_id);
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


    $scope.cancelOutlet = function(){
        $location.path('/admin/outletlist/'+$scope.item.restaurant_id);
    }

    //$scope.getLoginDetails();



});

