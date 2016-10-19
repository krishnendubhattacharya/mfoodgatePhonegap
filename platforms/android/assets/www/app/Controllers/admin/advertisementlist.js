'use strict';
/**
 * controllers used for the login
 */
app.controller('advertisementCtrl', function ($rootScope, $scope, $http, $location, myAuth, NgMap, $cookieStore, $timeout, $stateParams) {

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
    $scope.datepickerOptions = {format: 'yyyy-mm-dd',
        language: 'en',
        autoclose: true,
        weekStart: 0}
    $scope.viewAdvertisement = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getOffersByRestaurant/"+$stateParams.resturantId,
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {

            $scope.alladvertisement = data.data;
            $timeout(function(){

                $scope.table=  angular.element('#advertisementsList').DataTable({
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
        $scope.advertisementView='view';
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

    $scope.viewAdvertisement();

    $scope.editAdvertisement = function (params) {

        setTimeout(function () {
            $scope.$apply(function () {
                $scope.item = params;
            });
        }, 2000);


        //console.log(params);$scope.item = params;
        //setTimeout(function(){$scope.item = params},1000);
        $scope.advertisementView='edit';
    }


    $scope.addAdvertisement = function () {
        //alert(13);
        $scope.item={
            "id": '',
            "title": '',
            "from_date": '',
            "to_date":'',
            "ad_image":'',
            "url": '',
            "position": '',
            "is_active": 0,
            "category_id":[],
        };console.log($scope.item);
        /*$scope.example1model = [];
         $scope.example1data = [
         {id: 1, label: "David"},
         {id: 2, label: "Jhon"},
         {id: 3, label: "Danny"}];*/
        $scope.advertisementView='edit';
    }

    $scope.cancelAdvertisement = function () {
        $scope.viewAdvertisement();
    }

    $scope.saveAdvertisement = function () {
        console.log($scope.item);
        //return false;
        if(angular.isObject($scope.item.outlet_id))
        {
            if($scope.item.id == '') {
                $http({
                    method: "POST",
                    url: $rootScope.serviceurl + "addNewOffer",
                    data: $scope.item,
                    headers: {'Content-Type': 'application/json'},
                }).success(function (data) {
                    console.log(data);
                    $scope.viewAdvertisement();
                    $scope.item={};
                    //$scope.allcat = data.category;
                    //console.log($scope.allcat);
                });
            }else{
                $http({
                    method: "PUT",
                    url: $rootScope.serviceurl + "updateAdvertisement/"+$scope.item.id,
                    data: {"city": $scope.item.city, "country_id": $scope.item.country_id,"is_active": $scope.item.is_active},
                    headers: {'Content-Type': 'application/json'},
                }).success(function (data) {
                    console.log(data);
                    $scope.viewAdvertisement();
                    $scope.item={};
                    //$scope.allcat = data.category;
                    //console.log($scope.allcat);
                });
            }
        }else{
            alert('Please select an Outlet First');
        }


    }

    $scope.deleteAdvertisement = function (c_id) {
        //alert(c_id);
        if ( window.confirm("Want to delete?") ) {
            $http({
                method: "DELETE",
                url: $rootScope.serviceurl + "deleteAdvertisement/"+c_id,
                //data: {"name": $scope.item.name,"is_active": $scope.item.is_active},
                //headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                $scope.viewAdvertisement();
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }else{
        }
    }
    //$scope.getLoginDetails();
});

