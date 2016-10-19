app.controller('websitenewsCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    $scope.voucherInfo;
    if(!$scope.loggedindetails){

        $location.path("/login");
    }

    $scope.res_id = $stateParams.res_id;
    $scope.id = $stateParams.id;


    $scope.getNews = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl+"getActiveNewsByRestaurant/"+$scope.res_id,
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            if(data.type=='success')
            {
                $scope.allnews = data.data;
            }

        })
    }
    $scope.getNews();


});
