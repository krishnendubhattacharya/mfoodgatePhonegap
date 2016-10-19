'use strict';
/** 
 * controllers used for the login
 */
app.controller('emailtemplateCtrl', function ($rootScope, $scope, $http, $location, myAuth, $cookieStore,$timeout) {

    $scope.viewEmails = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getAllEmailTemplates",
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            $scope.allnews = data.email_templates;
            $timeout(function(){

                $scope.table=  angular.element('#smsList').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "searching": true,
                    "ordering": true,
                    "info": true,
                    "autoWidth": false
                });
            }, 3000, false);
        });
        $scope.emailView='view';
    }
    $scope.viewEmails();

    $scope.editEmails = function (params) {
        $scope.item = angular.copy(params);
        //$scope.item.image = '';
        //$scope.item.image_url = params.image;
        $scope.emailView='edit';
    }

    $scope.addEmail = function () {
        //alert(13);
        $scope.item={
            "id":'',
            "subject": '',
            "body": '',
            "is_active":0
        };
        $scope.emailView='edit';
    }

    $scope.cancelEmails = function () {
        $scope.viewEmails();
    }

    $scope.saveEmails = function () {

        //return false;
        if($scope.item.id == '') {
            $http({
                method: "POST",
                url: $rootScope.serviceurl + "addEmailTemplate",
                data: $scope.item,
                headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                $scope.viewEmails();
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }else{
            $http({
                method: "POST",
                url: $rootScope.serviceurl + "updateEmailTemplate",
                data: $scope.item,
                headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                $scope.viewEmails();
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }

    }

    $scope.deleteEmails = function (c_id) {
        //alert(c_id);
        if ( window.confirm("Want to delete?") ) {
            $http({
                method: "DELETE",
                url: $rootScope.serviceurl + "deleteEmailTemplate/"+c_id,
                //data: {"name": $scope.item.name,"is_active": $scope.item.is_active},
                //headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                $scope.viewEmails();
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }else{

        }

    }



         
         //$scope.getLoginDetails();

         
   
});

