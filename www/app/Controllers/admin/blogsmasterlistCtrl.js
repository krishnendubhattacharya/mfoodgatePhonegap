'use strict';
/**
 * controllers used for the login
 */
app.controller('blogsmasterlistCtrl', function ($rootScope, $scope, $http, $location, myAuth, $cookieStore,$timeout,$stateParams) {
    $stateParams.resturantId = 1;

    $scope.merchants = [];
    $scope.getMerchants = function()
    {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "users"
        }).success(function (data) {
            if(data.users)
                $scope.merchants = data.users;
        })
    }
    $scope.getMerchants();

    $scope.viewPromo = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getAllBlogs",
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

    $scope.getCategories = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "categories",
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            if(angular.isObject(data))
            {
                $scope.categoryList=data.category;
                $scope.allCat = [];
                angular.forEach($scope.categoryList,function(value){
                    $scope.allCat.push({id:value.id,label:value.name})
                })
            }
        });

    }
    $scope.getOfferType = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getAllActiveOfferType",
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            console.log(data);
            if(angular.isObject(data))
            {
                $scope.offerTypeList=data.data;
            }
        });

    }




    $scope.viewPromo();

    $scope.editPromo = function (params) {
        console.log(params);
        $scope.datepickerOptions = {format: 'yyyy-mm-dd',
            language: 'en',
            autoclose: true,
            weekStart: 0};

        $scope.datepickerOptions1 = {format: 'yyyy-mm-dd',
            language: 'en',
            autoclose: true,
            weekStart: 0};
        $scope.item = params;
        $scope.item.valid_days = parseInt(params.valid_days);
        $scope.item.start_date = moment(params.start_date).format('YYYY-MM-DD');
        $scope.item.expire_date = moment(params.expire_date).format('YYYY-MM-DD');

        //console.log(params);$scope.item = params;
        //setTimeout(function(){$scope.item = params},1000);
        $scope.promoView='edit';
    }


    $scope.addPromo = function () {
        //alert(13);

        $scope.item={
            id:"",
            title:"",
            image:"",
            user_id:"",
            description:"",
            is_active:""
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
                url: $rootScope.serviceurl + "addNewBlog",
                data: $scope.item,
                headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                $scope.viewPromo();
                $scope.item={};
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }else{
            $http({
                method: "POST",
                url: $rootScope.serviceurl + "updatePointMaster",
                data: $scope.item,
                headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                $scope.viewPromo();
                $scope.item={};
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
                url: $rootScope.serviceurl + "deletePointMaster/"+c_id,
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

