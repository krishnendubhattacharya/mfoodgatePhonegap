'use strict';
/** 
 * controllers used for the login
 */
app.controller('iconlistCtrl', function ($rootScope, $scope, $http, $location, myAuth, $cookieStore,$timeout) {

    $scope.viewIcon = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getIconList",
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            $scope.allnews = data.icon;
            $timeout(function(){

                $scope.table=  angular.element('#newsList').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "searching": true,
                    "ordering": true,
                    "info": true,
                    "autoWidth": false
                });
            }, 3000, false);
        });
        $scope.newView='view';
    }
    $scope.viewIcon();

    $scope.editIcon = function (params) {
        $scope.item = angular.copy(params);
        $scope.item.image = '';
        $scope.item.image_url = params.image;
        $scope.newView='edit';
    }

    $scope.addCategory = function () {
        //alert(13);
        $scope.item={
            "id":'',
            "title": '',
            "image":'',
            //"is_active":0,
            "image_url":''
        };
        $scope.newView='edit';
    }

    $scope.cancelIcon = function () {
        $scope.viewIcon();
    }

    $scope.saveIcon = function () {

        //return false;
        if($scope.item.id == '') {
            $http({
                method: "POST",
                url: $rootScope.serviceurl + "addIcon",
                data: $scope.item,
                headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                $scope.viewIcon();
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }else{
            $http({
                method: "POST",
                url: $rootScope.serviceurl + "updateIcon",
                data: $scope.item,
                headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                $scope.viewIcon();
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }

    }

    $scope.deleteIcon = function (c_id) {
        //alert(c_id);
        if ( window.confirm("Want to delete?") ) {
            $http({
                method: "DELETE",
                url: $rootScope.serviceurl + "deleteIcon/"+c_id,
                //data: {"name": $scope.item.name,"is_active": $scope.item.is_active},
                //headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                $scope.viewIcon();
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }else{

        }

    }



         
         //$scope.getLoginDetails();

         
   
});

