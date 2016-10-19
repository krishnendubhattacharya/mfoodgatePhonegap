'use strict';
/** 
 * controllers used for the login
 */
app.controller('voucherCtrl', function ($rootScope, $scope, $http, $location) {

    $scope.special_promo_show = 1;
    $scope.last_promo_show = 1;
    $scope.all_promo_show = 1;
    $scope.new_promo_show = 1;
    $scope.hot_promo_show = 1;

    $scope.goto_page = function(t)
    {
        if(t)
            $location.path('/' + t);
        else
            $location.path('/');
    }

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

    $scope.voucherList = function(){

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getPromoList",
        }).success(function (data) {

            $scope.voucherInfo =data.getMenuPromo;
            //console.log($scope.catInfo);

        });
    }
    $scope.voucherList();

    $scope.newPromoList = function () {

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getLaunchTodayMenuPromo",
        }).success(function (data) {
            $scope.newPromoInfo = data.todayPromo;
            $scope.newPromoCount = data.count;
            //console.log($scope.newPromoInfo);

        });
    }
    $scope.newPromoList();

    $scope.hotSellingList = function () {

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getHotSellingMenuPromo",
        }).success(function (data) {
            $scope.hotSellingInfo = data.getHotSellingPromo;
            //console.log($scope.newPromoInfo);

        });
    }
    $scope.hotSellingList();

    $scope.lastDayPromoList = function () {

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getLastdayMenuPromo",
        }).success(function (data) {
            $scope.lastDayPromoInfo = data.lastdayPromo;
            //console.log($scope.newPromoInfo);

        });
    }
    $scope.lastDayPromoList();




    $scope.specialList = function () {

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getSpecialMenuPromo",
        }).success(function (data) {
            $scope.specialInfo = data.getSpecialPromo;
            $scope.special_promo_show = 1;
            $scope.specialTitle = data.site_setting.special_promo_title;
            //console.log($scope.specialInfo);

        });
    }
    $scope.specialList();

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

    $scope.voucherExpireSoonList = function(){

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getExpireSoonPromoList",
        }).success(function (data) {

            $scope.voucherExpireSoonInfo =data.getMenuPromo;
            //console.log($scope.catInfo);

        });
    }
    $scope.voucherExpireSoonList();

    $scope.voucherAllMenuPromo = function(){

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getActiveMenuPromo",
        }).success(function (data) {

            $scope.voucherMenuInfo =data.Promo;
            console.log($scope.voucherMenuInfo);

        });
    }
    $scope.voucherAllMenuPromo();




   
});

