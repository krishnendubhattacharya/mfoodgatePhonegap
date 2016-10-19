'use strict';
/**
 * controllers used for the login
 */
app.controller('merchantuserlistCtrl', function ($rootScope, $scope, $http, $location, myAuth, $cookieStore,$timeout,$stateParams,notify) {


    $scope.merchants = [];
    $scope.getRoll = function()
    {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getActiveMerchants"
        }).success(function (data) {
            $scope.merchants = data;
        })
    }
    $scope.getRoll();

    $scope.viewPromo = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getAllSubUserByUser/"+$stateParams.userId,
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {

            $scope.allpromo = data.data;
            $timeout(function(){

                $scope.table=  angular.element('#promosList').DataTable({
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
        $scope.promoView='view';
    }

    $scope.viewPromo();

    $scope.editPromo = function (params) {
        console.log(params);
        $scope.item={
            id:params.id,
            first_name:params.first_name,
            last_name:params.last_name,
            email:params.email,
            password:"",
            roll:params.roll,
            is_active:params.is_active
        };

        $scope.promoView='edit';
    }


    $scope.addPromo = function () {
        //alert(13);
        $scope.item={
            id:"",
            first_name:"",
            last_name:"",
            email:"",
            password:"",
            parent_id:$stateParams.userId,
            roll:"",
            is_active:0
        };console.log($scope.item);

        $scope.promoView='edit';
    }

    $scope.cancelPromo = function () {
        $scope.viewPromo();
    }

    $scope.setExpireDate = function(days)
    {
        if(days) {
            //console.log('Days',days);
            $scope.item.expire_date = moment($scope.item.start_date, 'YYYY-MM-DD').add(days, "days").format('YYYY-MM-DD');
            //console.log($scope.item.expire_date);
        }
    }

    $scope.savePromo = function () {
        console.log($scope.item);
        //return false;
        if($scope.item.id == '') {
            $http({
                method: "POST",
                url: $rootScope.serviceurl + "addSubUser",
                data: $scope.item,
                headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                if(data.type=='error')
                {
                    notify({
                        message : data.message,
                        classes : 'alert-danger'
                    });
                }
                else
                {
                    $scope.viewPromo();
                    $scope.item={};
                }
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }else{
            $http({
                method: "POST",
                url: $rootScope.serviceurl + "updateSubUser",
                data: $scope.item,
                headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                if(data.type=='error')
                {
                    notify({
                        message : data.message,
                        classes : 'alert-danger'
                    });
                }
                else {
                    $scope.viewPromo();
                    $scope.item = {};
                }
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }

    }

    $scope.deletePromo = function (c_id) {
        //alert(c_id);
        if ( window.confirm("Are you sure, you Want to delete?") ) {
            $http({
                method: "DELETE",
                url: $rootScope.serviceurl + "users/"+c_id,
                //data: {"name": $scope.item.name,"is_active": $scope.item.is_active},
                //headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                $scope.viewPromo();
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }else{

        }

    }

    $scope.getActiveRestaurants = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getActiveRestaurants",
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            if(data.type == 'success')
            {
                $scope.restaurants = data.restaurants;
            }
        });
    }
    $scope.getActiveRestaurants();




    //$scope.getLoginDetails();



});

