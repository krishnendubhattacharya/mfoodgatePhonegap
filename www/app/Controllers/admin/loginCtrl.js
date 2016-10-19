'use strict';
/** 
 * controllers used for the login
 */
app.controller('loginCtrl', function ($rootScope, $scope, $http, $location, myAuth, $cookieStore) {


    //myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    if($scope.loggedindetails){
        $location.path('/admin/home');
    }
$scope.getAdminLogin = function() {


    $http({
        method: "POST",
        url: $rootScope.serviceurl+"users/adminlogin",
        data: {"email":$scope.email,"password":$scope.password},
        headers: {'Content-Type': 'application/json'},
    }).success(function(data) {
        console.log(data);
        if(data.type == 'success'){
            $scope.loggedindetails = '';
            var message = data.message;
            //$cookieStore.put('admin', data.user_details);
            $scope.user_username = '';
            $scope.user_password = '';
            myAuth.updateAdminUserinfo(data.user_details);
            $scope.loggedindetails = myAuth.getAdminNavlinks();
            //console.log('hiiiiiiiiii');
            $rootScope.$emit('updateAdminLoginDetails');
            $scope.loggedin = true;
            $scope.notloggedin = false;
            //console.log($scope.loggedindetails);
            $location.path('/admin/home');

        }else{
            var message = "Login failed.";

        }

    })

};










   
});

