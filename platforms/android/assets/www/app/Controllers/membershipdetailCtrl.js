app.controller('membershipdetailCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    $scope.voucherInfo;
    if(!$scope.loggedindetails){

        $location.path("/login");
    }
    console.log($stateParams.membershipId);
    $scope.voucherInfo = null;

    $scope.getVoucherDetail = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "vourcherdetail/"+$stateParams.membershipId,
        }).success(function (data) {
            console.log(data);
            $scope.voucherInfo =data;
        });

    }
    $scope.getVoucherDetail();






});