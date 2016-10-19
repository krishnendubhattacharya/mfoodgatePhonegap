'use strict';
/** 
 * controllers used for the login
 */
app.controller('marketplaceCtrl', function ($rootScope, $scope, $http, $location,myAuth) {

    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    $scope.eventdetailshow=0;
    if($scope.loggedindetails){
        if($scope.loggedindetails.user_type_id == 3){
            $scope.eventdetailshow=1;
        }

    }
    $scope.resell_promo_show = 1;
    $scope.event_promo_show = 1;
    $scope.swap_promo_show = 1;

    $scope.goto_page = function(t)
    {
        if(t)
            $location.path('/' + t);
        else
            $location.path('/');
    }

    $scope.resellShowHide = function () {
        console.log($scope.resell_promo_show);
        if($scope.resell_promo_show == 1){
            $scope.resell_promo_show = 0;
        }else{
            $scope.resell_promo_show = 1;
        }
        console.log($scope.resell_promo_show);
    }

    $scope.eventShowHide = function () {
        if($scope.event_promo_show == 1){
            $scope.event_promo_show = 0;
        }else{
            $scope.event_promo_show = 1;
        }

    }
    $scope.swapShowHide = function () {
        if($scope.swap_promo_show == 1){
            $scope.swap_promo_show = 0;
        }else{
            $scope.swap_promo_show = 1;
        }
    }


    $scope.resaleList = function(){

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getAllResellList",
        }).success(function (data) {

            $scope.resaleInfo =data.resale_details;
            //$scope.resell_promo_show = 1;
            console.log($scope.resell_promo_show);
            //console.log($scope.catInfo);

        });
    }
    $scope.resaleList();
    $scope.swapList = function(){

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "swaplist",
        }).success(function (data) {

            $scope.promoInfo =data.data;
            //console.log($scope.catInfo);

        });
    }
    $scope.swapList();

    $scope.eventList = function(){

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getActiveEvents",
        }).success(function (data) {

            $scope.eventInfo =data.data;
            //console.log($scope.catInfo);

        });
    }
    $scope.eventList();

    $scope.offerdetails = function(voucher_id,resell_id){

        /*$http({
            method: "GET",
            url: $rootScope.serviceurl + "getAllResellList",
        }).success(function (data) {

            $scope.resaleInfo =data.resale_details;

        });*/
        $location.path('/sellvoucherdetail/'+voucher_id+'/'+resell_id);
        //alert(12);
        //alert(voucher_id);

    }

    $scope.swapdetails = function(voucher_id){

        $location.path('/swapallvoucherdetail/'+voucher_id);

    }

    $scope.eventdetails = function(event_id){

        $location.path('/eventofferdetail/'+event_id);

    }


   
});

