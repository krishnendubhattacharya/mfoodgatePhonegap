'use strict';
/** 
 * controllers used for the register
 */
app.controller('footerCtrl', function ($rootScope, $scope, $http, $location) {

   $scope.getSocialLinks = function(){
       $http({
           method: "GET",
           url: $rootScope.serviceurl+"getSiteSetting",
           headers: {'Content-Type': 'application/json'},
       }).success(function(data) {
           if(data.site) {
               $scope.sociallinks = data.site;
           }
       })
   }
    $scope.getSocialLinks();
    $scope.sendemailtoadmin = function(){
        console.log($scope.subscribeemail);
        $http({
            method: "GET",
            url: $rootScope.serviceurl+"sendSubscribeEmail/"+$scope.subscribeemail,
            //data:{subscribe_email:$scope.subscribeemail},
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            $scope.subscribeemail = '';
            if(data.type='success'){
                DevExpress.ui.notify({
                    message: data.message,
                    position: {
                        my: "center top",
                        at: "center top"
                    }
                }, "success", 3000);
            }else{
                DevExpress.ui.notify({
                    message: data.message,
                    position: {
                        my: "center top",
                        at: "center top"
                    }
                }, "error", 3000);
            }
        })
    }
});

