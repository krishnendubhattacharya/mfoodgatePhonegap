'use strict';
/**
 * controllers used for the login
 */
app.controller('voucherofmemberCtrl', function ($rootScope, $scope, $http, $location, myAuth, NgMap, $cookieStore,$timeout,$stateParams, notify) {

    $scope.viewVoucher = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "allvoucher/"+$stateParams.memberId,
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {

            $scope.allVoucher = data;
            console.log($scope.allVoucher);
            $timeout(function(){

                $scope.table=  angular.element('#vouchersList').DataTable({
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
        $scope.voucherView='view';
    }
    $scope.viewVoucher();

    $scope.editVoucher = function (params) {

        setTimeout(function () {
            $scope.$apply(function () {
                $scope.item = params;
            });
        }, 2000);


        //console.log(params);$scope.item = params;
        //setTimeout(function(){$scope.item = params},1000);
        $scope.voucherView='edit';
    }


    $scope.addVoucher = function () {

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

        $scope.voucherView='edit';
    }

    $scope.cancelVoucher = function () {
        $scope.item='';
        $scope.viewVoucher();
    }

    $scope.saveVoucher = function () {
        console.log($scope.item);
        //return false;


        if($scope.item.id == '') {
            $http({
                method: "POST",
                url: $rootScope.serviceurl + "addVoucher",
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
                    $scope.viewVoucher();
                    $scope.item={};
                }
            });
        }else{
            $http({
                method: "PUT",
                url: $rootScope.serviceurl + "updateVoucher/"+$scope.item.id,
                data: {"city": $scope.item.city, "country_id": $scope.item.country_id,"is_active": $scope.item.is_active},
                headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                $scope.viewVoucher();
                $scope.item={};
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }



    }

    $scope.deleteVoucher = function (c_id) {
        //alert(c_id);
        if ( window.confirm("Want to delete?") ) {
            $http({
                method: "DELETE",
                url: $rootScope.serviceurl + "users/"+c_id,
                //data: {"name": $scope.item.name,"is_active": $scope.item.is_active},
                //headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                $scope.viewVoucher();
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }else{
        }
    }
    //$scope.getLoginDetails();
});

