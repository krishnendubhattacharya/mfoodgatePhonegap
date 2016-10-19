'use strict';
/**
 * controllers used for the login
 */
app.controller('memberlistCtrl', function ($rootScope, $scope, $http, $location, myAuth, NgMap, $cookieStore,$timeout,$stateParams, notify) {

    $scope.viewMember = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getAllCustomers",
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {

            $scope.allMember = data;
            console.log($scope.allMember);
            $timeout(function(){

                $scope.table=  angular.element('#membersList').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "searching": true,
                    "ordering": true,
                    "info": true,
                    "autoWidth": false
                });
            }, 3000, false);
            //console.log($scope.allcat);


        });
        $scope.memberView='view';
    }
    $scope.viewMember();

    $scope.editMember = function (params) {

        setTimeout(function () {
            $scope.$apply(function () {
                $scope.item = params;
            });
        }, 2000);


        //console.log(params);$scope.item = params;
        //setTimeout(function(){$scope.item = params},1000);
        $scope.memberView='edit';
    }


    $scope.addMember = function () {

        //alert(13);
        $scope.item={
            "first_name":'',
            "last_name": '',
            "email": '',
            "image": '',
            "is_active":0,
            "user_type_id":3,
            "id":'',
        };console.log($scope.item);

        $scope.memberView='edit';
    }

    $scope.cancelMember = function () {
        $scope.item='';
        $scope.viewMember();
    }

    $scope.saveMember = function () {
        console.log($scope.item);
        //return false;


        if($scope.item.id == '') {
            $http({
                method: "POST",
                url: $rootScope.serviceurl + "addMember",
                data: $scope.item,
                headers: {'Content-Type': 'application/json'},
            }).success(function (data) {

                console.log(data);
                if(data.type=='error')
                {
                    notify({
                        message : data.message,
                        classes : 'alert-danger'
                    });
                }else{
                    $scope.viewMember();
                    $scope.item={};
                }
            });
        }else{
            $http({
                method: "PUT",
                url: $rootScope.serviceurl + "updateMember/"+$scope.item.id,
                data: {"city": $scope.item.city, "country_id": $scope.item.country_id,"is_active": $scope.item.is_active},
                headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                $scope.viewMember();
                $scope.item={};
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }



    }

    $scope.deleteMember = function (c_id) {
        //alert(c_id);
        if ( window.confirm("Want to delete?") ) {
            $http({
                method: "DELETE",
                url: $rootScope.serviceurl + "users/"+c_id,
                //data: {"name": $scope.item.name,"is_active": $scope.item.is_active},
                //headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                $scope.viewMember();
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }else{
        }
    }
    //$scope.getLoginDetails();
});

