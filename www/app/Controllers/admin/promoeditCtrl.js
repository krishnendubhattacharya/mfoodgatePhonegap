'use strict';
/**
 * controllers used for the login
 */
app.controller('promoeditCtrl', function ($rootScope, $scope, $http, NgMap, $location, myAuth, $cookieStore, $timeout, $stateParams) {

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
            url: $rootScope.serviceurl + "getPromoDetails/"+$stateParams.promoId,
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {

            $scope.categoryList=data.categories;
            $scope.category_id = [];
            angular.forEach($scope.categoryList,function(value){
                $scope.category_id.push({id:value.category_id})
            })

            $scope.outletList=data.outlets;
            $scope.outlet_id = [];
            angular.forEach($scope.outletList,function(value){
                $scope.outlet_id.push({id:value.outlet_id})
            })

            $scope.item = { id:data.offer.id,
                title:data.offer.title,
                "outlet_id":$scope.outlet_id,
                special_tag:data.offer.special_tag,
                "description": data.offer.description,
                "benefits": data.offer.benefits,
                "quantity":data.offer.quantity,
                "mpoints":data.offer.mpoints,
                "mpoints_given":data.offer.mpoints_given,
                "price": data.offer.price,
                "offer_price": data.offer.offer_price,
                "offer_percent": data.offer.offer_percent,
                "offer_from_date": moment(data.offer.offer_from_date,'MM-DD-YYYY').format('YYYY-MM-DD'),
                "offer_to_date": moment(data.offer.offer_to_date,'MM-DD-YYYY').format('YYYY-MM-DD'),
                "image_url": data.offer.image,
                "offer_type_id": data.offer.offer_type_id,
                "category_id":$scope.category_id,
                "is_featured":data.offer.is_featured,
                "is_special":data.offer.is_special,
                "is_active":data.offer.is_active,
                "restaurant_id":data.offer.restaurant_id,
            }

        });

    }
    $scope.viewPromo();
    $scope.getOutlet = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getOutletsByRestaurant/"+$stateParams.restaurantId,
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            if(angular.isObject(data))
            {
                console.log('Hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
                console.log(data);
                $scope.outletList=data.data;
                $scope.allOutlet = [];
                angular.forEach($scope.outletList,function(value){
                    $scope.allOutlet.push({id:value.id,label:value.title})
                })
            }else{
                $scope.allOutlet = [];
                $scope.allOutlet.push({id:'',label:'No Outlets Found'})
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

                console.log(data.category);
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
    $scope.getOfferType();

    $scope.savePromo = function () {
        console.log($scope.item);
        //return false;
        if($scope.item.id == '') {
            $http({
                method: "POST",
                url: $rootScope.serviceurl + "addPromo",
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
                method: "POST",
                url: $rootScope.serviceurl + "updateOffer",
                data: $scope.item,
                headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                // $scope.viewOutlet();

                $location.path('/admin/promolist/'+$scope.item.restaurant_id);
                $scope.item={};
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }

    }

    $scope.deletePromo = function (c_id) {
        //alert(c_id);
        if ( window.confirm("Want to delete?") ) {
            $http({
                method: "DELETE",
                url: $rootScope.serviceurl + "deleteOffer/"+c_id,
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


    $scope.cancelPromo = function(){
        $location.path('/admin/promolist/'+$scope.item.restaurant_id);
    }

    //$scope.getLoginDetails();



});

