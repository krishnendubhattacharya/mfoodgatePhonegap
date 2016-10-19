'use strict';
/**
 * controllers used for the login
 */
app.controller('merchanteditCtrl', function ($rootScope, $scope, $http, NgMap, $location, myAuth, $cookieStore, $timeout, $stateParams, notify) {

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
    $scope.viewMerchant = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "user/"+$stateParams.merchantId,
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            $scope.item = { id:data.user_details.id,
                merchant_id:data.user_details.merchant_id,
                first_name:data.user_details.first_name,
                last_name:data.user_details.last_name,
                merchant_name:data.user_details.merchant_name,
                email:data.user_details.email,
                is_active:data.user_details.is_active,
                location_id:data.user_details.location_id,
                address:data.user_details.address,
                about_me:data.user_details.about_me

            }
            $scope.image_url=data.user_details.image;

        });

    }
    $scope.viewMerchant();

    $scope.viewMerchantBank = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getBankDetailsByUser/"+$stateParams.merchantId,
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            if(data.type == 'success') {
                $scope.bank = {name:data.details.name,
                    account_no:data.details.account_no,
                    assignment:data.details.assignment,
                    address:data.details.address,
                    finance_email:data.details.finance_email,
                    sales_email:data.details.sales_email,
                    id:data.details.id
                };
            }

            console.log($scope.bank);

        });

    }
    $scope.viewMerchantBank();


    $scope.saveMerchant = function () {
        console.log($scope.item);
        //return false;
        if($scope.item.id == '') {
            $http({
                method: "POST",
                url: $rootScope.serviceurl + "addMerchant",
                data: $scope.item,
                headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                $scope.viewMerchant();
                $scope.item={};
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }else{
            $http({
                method: "PUT",
                url: $rootScope.serviceurl + "users/"+$stateParams.merchantId,
                data: $scope.item,
                headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                // $scope.viewMerchant();
                if($scope.bank.name) {
                    $http({
                        method: "POST",
                        url: $rootScope.serviceurl + "updateBankDetails",
                        data: $scope.bank,
                        headers: {'Content-Type': 'application/json'},
                    }).success(function (data) {
                        if (data.type == 'error') {
                            notify({
                                message: data.message,
                                classes: 'alert-danger'
                            });
                        } else {
                            $location.path('/admin/merchantlist');
                            $scope.item = {};
                            $scope.bank = {};
                        }
                    })
                }else{
                    $location.path('/admin/merchantlist');
                    $scope.item = {};
                    $scope.bank = {};
                }
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }

    }

    $scope.getAllLocations = function(){
        $http({
            method: "get",
            url: $rootScope.serviceurl+"getAllLocations",
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            $scope.locations = data.locations;

        })
    }
    $scope.getAllLocations();

    $scope.cancelMerchant = function(){
        $location.path('/admin/merchantlist');
    }

    //$scope.getLoginDetails();

});