app.controller('websitepromosCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    $scope.voucherInfo;
    if(!$scope.loggedindetails){

        $location.path("/login");
    }

    $scope.id = $stateParams.id;
    $scope.res_id = $stateParams.res_id;

    //$http({
    //    method: "GET",
    //    url: 'http://52.39.33.188/MFoodGateMembershipHost/service.svc/CreateNewMember',
    //    data:{MerchantID:"M004",RestaurantID:"A0001",MemberName:"Jonathan",PromoID:"PRC001",PurchasedDate:"2016-06-07",EmailAddress:"abc@abc.com",Mobile:"012823432",Address:"BB Address"},
    //    headers: {'Content-Type': 'application/json'}
    //}).success(function (data) {
    //    console.log(" Lorem Ipsum ==== ",data);
    //})

    $scope.getRestaurantDetails = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getMerchantRestaurantDetails/" + $scope.res_id,
        }).success(function (data) {
            if(data.type=='success')
            {
                $scope.restaurant_id = data.data.restaurant_id;
                $scope.specialList();
                $scope.newPromoList();
                $scope.hotSellingList();
                $scope.lastDayPromoList();
            }
        })
    }
    $scope.getRestaurantDetails();

    $scope.specialList = function () {

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getSpecialMerchantRestaurantPromo/" + $scope.restaurant_id,
        }).success(function (data) {
            $scope.specialInfo = data.getSpecialPromo;
            $scope.special_promo_show = 1;
            $scope.specialTitle = data.site_setting.special_promo_title;
            //console.log($scope.specialInfo);

        });
    }

    $scope.newPromoList = function () {

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getLaunchTodayMerchantRestaurantPromo/" + $scope.restaurant_id,
        }).success(function (data) {
            $scope.newPromoInfo = data.todayPromo;
            $scope.newPromoCount = data.count;
            //console.log($scope.newPromoInfo);

        });
    }

    $scope.hotSellingList = function () {

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getHotSellingMerchantRestaurantPromo/" + $scope.restaurant_id,
        }).success(function (data) {
            $scope.hotSellingInfo = data.getHotSellingPromo;
            //console.log($scope.newPromoInfo);

        });
    }

    $scope.lastDayPromoList = function () {

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getLastdayMerchantRestaurantPromo/" + $scope.restaurant_id,
        }).success(function (data) {
            $scope.lastDayPromoInfo = data.lastdayPromo;
            //console.log($scope.newPromoInfo);

        });
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
    //$scope.specialList();

});
