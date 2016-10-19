'use strict';
/** 
 * controllers used for the login
 */
app.controller('searchresultCtrl', function ($rootScope, $scope, $http, $location, $stateParams) {

    console.log($stateParams);
    $scope.keyword =$stateParams.keyword;
    $scope.voucherList = function(){

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getSiteSearch?keyword="+$stateParams.keyword+"&category="+$stateParams.category+"&sort="+$stateParams.sort_field+"&sort_by="+$stateParams.sort_by+"&page="+$stateParams.page+"&lines="+$stateParams.lines,
        }).success(function (data) {

            $scope.voucherInfo =data.data;
            $scope.type =data.category;

            //console.log($scope.catInfo);

        });
    }
    $scope.voucherList();

    /*$scope.voucherExpireSoonList = function(){

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getExpireSoonPromoList",
        }).success(function (data) {

            $scope.voucherExpireSoonInfo =data.getMenuPromo;
            //console.log($scope.catInfo);

        });
    }
    $scope.voucherExpireSoonList();*/

    $scope.sortChangeTitle = function(title){

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getSiteSearch?keyword="+$stateParams.keyword+"&category="+$stateParams.category+"&sort=title&sort_by="+title+"&page="+$stateParams.page+"&lines="+$stateParams.lines,
        }).success(function (data) {

            $scope.voucherInfo =data.data;
            $scope.type =data.category;
            //$scope.keyword =$stateParams.keyword;

            //console.log($scope.catInfo);

        });
    };
    $scope.sortChangePrice = function(price){

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getSiteSearch?keyword="+$stateParams.keyword+"&category="+$stateParams.category+"&sort=price&sort_by="+price+"&page="+$stateParams.page+"&lines="+$stateParams.lines,
        }).success(function (data) {

            $scope.voucherInfo =data.data;
            $scope.type =data.category;


            //console.log($scope.catInfo);

        });
    };


   
});

