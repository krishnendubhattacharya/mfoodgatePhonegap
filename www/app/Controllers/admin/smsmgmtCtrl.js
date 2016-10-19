'use strict';
/** 
 * controllers used for the login
 */
app.controller('smsmgmtCtrl', function ($rootScope, $scope, $http, $location, myAuth, $cookieStore,$timeout) {

    $scope.viewSms = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getAllSms",
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            $scope.allnews = data.sms;
            $timeout(function(){

                $scope.table=  angular.element('#emailList').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "searching": true,
                    "ordering": true,
                    "info": true,
                    "autoWidth": false
                });
            }, 3000, false);
        });
        $scope.smsView='view';
    }
    $scope.viewSms();

    $scope.editSms = function (params) {
        $scope.item = angular.copy(params);
        //$scope.item.image = '';
        //$scope.item.image_url = params.image;
        $scope.smsView='edit';
    }

    $scope.addEmail = function () {
        //alert(13);
        $scope.item={
            "id":'',
            "title": '',
            "message": '',
            "is_active":0
        };
        $scope.smsView='edit';
    }

    $scope.cancelSms = function () {
        $scope.viewSms();
    }

    $scope.saveSms = function () {

        //return false;
        if($scope.item.id == '') {
            $http({
                method: "POST",
                url: $rootScope.serviceurl + "addSms",
                data: $scope.item,
                headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                $scope.viewSms();
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }else{
            $http({
                method: "POST",
                url: $rootScope.serviceurl + "updateSms",
                data: $scope.item,
                headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                $scope.viewSms();
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }

    }

    $scope.deleteSms = function (c_id) {
        //alert(c_id);
        if ( window.confirm("Want to delete?") ) {
            $http({
                method: "DELETE",
                url: $rootScope.serviceurl + "deleteSms/"+c_id,
                //data: {"name": $scope.item.name,"is_active": $scope.item.is_active},
                //headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                $scope.viewSms();
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }else{

        }

    }



         
         //$scope.getLoginDetails();

         
   
});

