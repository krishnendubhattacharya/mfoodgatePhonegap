app.controller('eventdetailCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    console.log($scope.loggedindetails);
    $scope.voucherInfo;
    if(!$scope.loggedindetails){

        $location.path("/login");
    }
    console.log($stateParams.voucherId);
    $scope.voucherInfo = null;

    $scope.getEventDetail = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getEvenDetails/"+$stateParams.eventId,
        }).success(function (data) {
            console.log(data);
            $scope.eventInfo =data;
            $scope.category_count =$scope.eventInfo.data.categories.length;
            $scope.location_count =$scope.eventInfo.data.locations.length;
        });

    }
    $scope.getEventDetail();
    
    $scope.getisBidEvent = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getIsBidEvent/"+$stateParams.eventId+"/"+$scope.loggedindetails.id,
        }).success(function (data) {
            console.log(data);
            $scope.isBidEvent = data.data;
        });

    }
    $scope.getisBidEvent();

    $scope.eventBid = function (id) {
        $location.path('/eventbid/' +$stateParams.eventId);
    }








});
