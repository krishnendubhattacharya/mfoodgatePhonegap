'use strict';
/**
 * controllers used for the login
 */
app.controller('promolistCtrl', function ($rootScope, $scope, $http, $location, myAuth, NgMap, $cookieStore,$timeout,$stateParams) {

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
    $scope.viewPromo = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getOffersByRestaurant/"+$stateParams.resturantId,
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {

            $scope.allpromo = data.data;
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
        $scope.promoView='view';
    }
    $scope.getOutlet = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getOutletsByRestaurant/"+$stateParams.resturantId,
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            if(angular.isObject(data))
            {
               console.log(data.data);
                $scope.outletList=data.data;
                $scope.allOutlet = [];
                angular.forEach($scope.outletList,function(value){
                    $scope.allOutlet.push({id:value.id,label:value.title})
                })
            }
        });

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
    $scope.getOfferType = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getAllActiveOfferType",
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            console.log(data);
            if(angular.isObject(data))
            {
                $scope.offerTypeList=data.data;
            }
        });

    }




    $scope.viewPromo();

    $scope.editPromo = function (params) {

        setTimeout(function () {
            $scope.$apply(function () {
                $scope.item = params;
            });
        }, 2000);


        //console.log(params);$scope.item = params;
        //setTimeout(function(){$scope.item = params},1000);
        $scope.promoView='edit';
    }


    $scope.addPromo = function () {
        //alert(13);
        $scope.item={
            "outlet_id":[],
            "title": '',
            special_tag:'',
            "description": '',
            "benefits": '',
            "quantity":'',
            "mpoints":'',
            "mpoints_given":'',
            "price": '',
            "offer_price": '',
            "offer_percent": '',
            "offer_from_date": '',
            "offer_to_date": '',
            "image": '',
            "offer_type_id": '',
            "category_id":[],
            "id": '',
            "is_featured":0,
            "is_special":0,
            "is_active":0,
            "restaurant_id":$stateParams.resturantId,
        };console.log($scope.item);
        /*$scope.example1model = [];
         $scope.example1data = [
         {id: 1, label: "David"},
         {id: 2, label: "Jhon"},
         {id: 3, label: "Danny"}];*/
        $scope.promoView='edit';
    }

    $scope.cancelPromo = function () {
        $scope.viewPromo();
    }

    $scope.savePromo = function () {
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
                    $scope.viewPromo();
                    $scope.item={};
                    //$scope.allcat = data.category;
                    //console.log($scope.allcat);
                });
            }else{
                $http({
                    method: "PUT",
                    url: $rootScope.serviceurl + "updatePromo/"+$scope.item.id,
                    data: {"city": $scope.item.city, "country_id": $scope.item.country_id,"is_active": $scope.item.is_active},
                    headers: {'Content-Type': 'application/json'},
                }).success(function (data) {
                    console.log(data);
                    $scope.viewPromo();
                    $scope.item={};
                    //$scope.allcat = data.category;
                    //console.log($scope.allcat);
                });
            }
        }else{
            alert('Please select an Outlet First');
        }


    }

    $scope.deletePromo = function (c_id) {
        //alert(c_id);
        if ( window.confirm("Want to delete?") ) {
            $http({
                method: "DELETE",
                url: $rootScope.serviceurl + "deletePromo/"+c_id,
                //data: {"name": $scope.item.name,"is_active": $scope.item.is_active},
                //headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                $scope.viewPromo();
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }else{

        }

    }




    //$scope.getLoginDetails();



});

