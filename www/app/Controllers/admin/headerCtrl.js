'use strict';
/** 
 * controllers used for the login
 */
app.controller('headerCtrl', function ($rootScope, $scope, $http, $location, myAuth, $cookieStore) {
        $scope.getLoginDetails=function(){

            //myAuth.updateAdminUserinfo(myAuth.getAdminAuthorisation());
            //$scope.loggedindetails = myAuth.getAdminNavlinks();
            
        //console.log($scope.loggedindetails);
        //console.log('nnnnnnnnnnnnn');
         };
         $scope.loggedindetails = myAuth.getAdminNavlinks();
         if(!myAuth.getAdminNavlinks())
         {
             $location.path('/adminlogin/signin');
         }

         $scope.userLogout=function(){
                console.log($scope.loggedindetails);
                //return false;
//                $http({
//                    method: "POST",
//                    url: $rootScope.serviceurl + "users/logout",
//                    data: {'userid': $scope.loggedindetails.id},
//                        headers: {'Content-Type': 'application/json'},
//                }).success(function(data) {
                    
                    
                myAuth.resetAdminUserinfo();
                    $cookieStore.put('admin', null);
                    myAuth.updateAdminUserinfo(myAuth.getAdminAuthorisation());
                    $scope.loggedindetails = myAuth.getAdminNavlinks();


                    $scope.loggedindetails = '';
                    $rootScope.$emit('updateAdminLoginDetails');
                    $scope.loggedin = false;
                    $scope.notloggedin = true;

                    $location.path("/adminlogin/signin");

                //});
                
         };
         
         //$scope.getLoginDetails();
         $rootScope.$on('updateAdminLoginDetails',function(){
                 //console.log('called');
                 $scope.getLoginDetails();
                 //$scope.$apply();
         });
         
   
});

