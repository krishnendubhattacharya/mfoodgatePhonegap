'use strict';
/**
 * controllers used for the login
 */
app.controller('resturanteditCtrl', function ($rootScope, $scope, $http, $location, myAuth, $cookieStore, $timeout, $stateParams) {
    $scope.viewResturant = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getRestaurantDetails/"+$stateParams.resturantId,
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            console.log(data.data);
            $scope.categoryList=data.data.categories;
            $scope.category_id = [];
            angular.forEach($scope.categoryList,function(value){
                $scope.category_id.push({id:value.category_id})
            })
            console.log($scope.category_id);
            $scope.item = { id:data.data.restaurant.id,
                            user_id:data.data.user.id,
                            title:data.data.restaurant.title,
                            image_url:data.data.restaurant.logo_url,
                            is_featured:data.data.restaurant.is_featured,
                            is_active:data.data.restaurant.is_active,
                            seq:data.data.restaurant.seq,
                            sub_title:data.data.restaurant.sub_title,
                            description:data.data.restaurant.description,
                            restaurant_id:data.data.restaurant.restaurant_id,
                            category_id:$scope.category_id
                          }
            console.log($scope.item.category_id);
            console.log($scope.item);
        });

    }
    $scope.viewResturant();
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
    $scope.getMerchant = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getAllMerchants",
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            if(angular.isObject(data))
            {
                $scope.merchantList=data;
            }
        });

    }



    /*$scope.editResturant = function (params) {

        setTimeout(function () {
            $scope.$apply(function () {
                $scope.item = params;
            });
        }, 2000);


        //console.log(params);$scope.item = params;
        //setTimeout(function(){$scope.item = params},1000);
        $scope.resturantView='edit';
    }*/


    /*$scope.addResturant = function () {
        //alert(13);
        $scope.item={
            "title": '',
            "category_id":[],
            "id": '',
            "is_active":0,
            "is_featured":0,
            "image":'',
            "user_id":'',
        };

        $scope.resturantView='edit';
    }*/

    /*$scope.cancelResturant = function () {
        $scope.viewResturant();
    }*/

    $scope.saveResturant = function () {
        console.log($scope.item);
        //return false;
        if($scope.item.id == '') {
            $http({
                method: "POST",
                url: $rootScope.serviceurl + "addResturant",
                data: $scope.item,
                headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                $scope.viewResturant();
                $scope.item={};
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }else{
            $http({
                method: "PUT",
                url: $rootScope.serviceurl + "updateResturant/"+$scope.item.id,
                data: $scope.item,
                headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
               // $scope.viewResturant();
                $scope.item={};
                $location.path('/admin/resturantlist');
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }

    }

    $scope.deleteResturant = function (c_id) {
        //alert(c_id);
        if ( window.confirm("Want to delete?") ) {
            $http({
                method: "DELETE",
                url: $rootScope.serviceurl + "deleteResturant/"+c_id,
                //data: {"name": $scope.item.name,"is_active": $scope.item.is_active},
                //headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                $scope.viewResturant();
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }else{

        }

    }

    $scope.cancelResturant = function(){
        $location.path('/admin/resturantlist');
    }




    //$scope.getLoginDetails();



});

