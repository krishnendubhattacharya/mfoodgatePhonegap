app.controller('websiteaboutCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth, NgMap) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    $scope.voucherInfo;
    if(!$scope.loggedindetails){

        $location.path("/login");
    }

    NgMap.getMap().then(function(map) {
        $scope.map = map;
    });

    $scope.showMap = false;

    $scope.res_id = $stateParams.res_id;
    $scope.id = $stateParams.id;
    $scope.getFeatureds = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl+"getMerchantRestaurantDetails/"+$scope.res_id,
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            $scope.restaurant = data.data;
            //console.log($scope.restaurant.outlets);
        })
    }
    $scope.getFeatureds();

    $scope.getMerchant = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl+"user/"+$scope.id,
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            if(data.type=='success')
            {
                $scope.merchant = data.user_details;
            }

        })
    }
    $scope.getMerchant();

    /*$scope.changeMap = function(outletInfo){
        $scope.showMap = true;
        $scope.mapaddress = outletInfo.address;
        $scope.maptitle = outletInfo.title;
        //alert($scope.maptitle);

    }*/
    /*function next(elem) {
        do {
            elem = elem.nextSibling;
        } while (elem && elem.nodeType !== 1);
        return elem;
    }
    $scope.changeMap = function(that){
        var target = angular.element(that);
        var nextElem = next(target);

        if (nextElem)
            nextElem.style.display = 'block';
        console.log(target);

       // $scope.showDetails = ! $scope.showDetails
     //$scope.showMap = true;
     //$scope.mapaddress = outletInfo.address;
     //$scope.maptitle = outletInfo.title;
     //alert($scope.maptitle);

     }*/


});
