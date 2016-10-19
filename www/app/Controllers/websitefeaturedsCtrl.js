app.controller('websitefeaturedsCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    $scope.voucherInfo;
    if(!$scope.loggedindetails){

        $location.path("/login");
    }

    $scope.res_id = $stateParams.res_id;
    $scope.res_id = $stateParams.res_id;
    $scope.getFeatureds = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl+"getWebsiteFeaturedMenus/"+$scope.res_id,
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            $scope.featuredMenus = data.data;
        })
    }
    $scope.getFeatureds();

});
