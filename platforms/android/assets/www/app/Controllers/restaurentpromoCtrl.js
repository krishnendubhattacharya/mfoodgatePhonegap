'use strict';
/** 
 * controllers used for the login
 */
app.controller('restaurentpromoCtrl', function ($rootScope, $scope, $http, $location, $stateParams,$sce) {


    $scope.special_promo_show = 1;
    $scope.last_promo_show = 1;
    $scope.all_promo_show = 1;
    $scope.new_promo_show = 1;
    $scope.hot_promo_show = 1;

    $scope.lastShowHide = function () {
        if($scope.last_promo_show == 1){
            $scope.last_promo_show = 0;
        }else{
            $scope.last_promo_show = 1;
        }
    }

    $scope.specialShowHide = function () {
        if($scope.special_promo_show == 1){
            $scope.special_promo_show = 0;
        }else{
            $scope.special_promo_show = 1;
        }

    }
    $scope.allShowHide = function () {
        if($scope.all_promo_show == 1){
            $scope.all_promo_show = 0;
        }else{
            $scope.all_promo_show = 1;
        }
    }
    $scope.newShowHide = function () {
        if($scope.new_promo_show == 1){
            $scope.new_promo_show = 0;
        }else{
            $scope.new_promo_show = 1;
        }
    }
    $scope.hotShowHide = function () {
        if($scope.hot_promo_show == 1){
            $scope.hot_promo_show = 0;
        }else{
            $scope.hot_promo_show = 1;
        }
    }



    $scope.newPromoList = function () {

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getResturantLaunchTodayPromo/"+$stateParams.restaurantId,
        }).success(function (data) {
            $scope.newPromoInfo = data.getMerchantPromo;
            $scope.newPromoCount = data.count;
            //console.log($scope.newPromoInfo);

        });
    }
    $scope.newPromoList();

    $scope.hotSellingList = function () {

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getResturantHotSellingPromo/"+$stateParams.restaurantId,
        }).success(function (data) {
            $scope.hotSellingInfo = data.getMerchantPromo;
            //console.log($scope.newPromoInfo);

        });
    }
    $scope.hotSellingList();

    $scope.lastDayPromoList = function () {

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getResturantLastDayPromo/"+$stateParams.restaurantId,
        }).success(function (data) {
            $scope.lastDayPromoInfo = data.getMerchantPromo;
            //console.log($scope.newPromoInfo);

        });
    }
    $scope.lastDayPromoList();




    $scope.specialList = function () {

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getResturantSpecialPromo/"+$stateParams.restaurantId,
        }).success(function (data) {
            $scope.specialInfo = data.getMerchantPromo;
            if(data.site_setting)
                $scope.specialTitle = data.site_setting.special_promo_title;
            else
                $scope.specialTitle = "Special Promo";
            //console.log($scope.specialInfo);

        });
    }
    $scope.specialList();


    /*$scope.voucherAllMembershipPromo = function(){

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getActiveMembershipPromo",
        }).success(function (data) {

            $scope.voucherMembershipInfo =data.Promo;
            //console.log($scope.catInfo);

        });
    }
    $scope.voucherAllMembershipPromo();*/

    $scope.resPromoList = function(){

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getResturantPromo/"+$stateParams.restaurantId,
            //url: $rootScope.serviceurl + "getSpecialPromo",
        }).success(function (data) {
            $scope.restaurantPromoInfo =data.getMerchantPromo;
            $scope.restaurantInfo =data.restaurant;
            if(data.restaurant.description)
            {
                $scope.restaurantInfo.description = $sce.trustAsHtml(data.restaurant.description);
            }
            //console.log($scope.restaurantPromoInfo);

        });
    }
    $scope.resPromoList();

   
});

