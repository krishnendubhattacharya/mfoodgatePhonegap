'use strict';
/** 
 * controllers used for the register
 */

app.controller('acceptswapCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {

    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    //$scope.voucherInfo;
    if(!$scope.loggedindetails){

        $location.path("/login");
    }


   //console.log($stateParams.userId);
   $scope.swapAccept = function() {
        //alert(23);
        $http({
                method: "GET",
                url: $rootScope.serviceurl+"swapInterestAccept/"+$stateParams.siid,
        }).success(function(data) {
                console.log(data);
                $scope.message = data.message;

        })
        //form.submit();
        //params.validationGroup.reset();
    
    };

    $scope.swapAccept();
   
   
});
