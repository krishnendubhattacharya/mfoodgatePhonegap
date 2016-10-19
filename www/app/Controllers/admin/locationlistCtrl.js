'use strict';
/** 
 * controllers used for the login
 */
app.controller('locationlistCtrl', function ($rootScope, $scope, $http, $location, myAuth, $cookieStore,$timeout) {
    $scope.viewLocation = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getAllLocations",
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {

            $scope.alllocation = data.locations;
            $timeout(function(){

                $scope.table=  angular.element('#locationsList').DataTable({
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
        $scope.locationView='view';
    }
    $scope.getCountries = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getCountries",
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            if(angular.isObject(data))
            {
                $scope.countryList=data.countries;
            }
        });

    }

    $scope.viewLocation();

    $scope.editLocation = function (params) {

        setTimeout(function () {
            $scope.$apply(function () {
                $scope.item = params;
                console.log('||||||||||||||||||||||||');
                console.log($scope.item);
            });
        }, 2000);


        //console.log(params);$scope.item = params;
        //setTimeout(function(){$scope.item = params},1000);
        $scope.locationView='edit';
    }
    $scope.getCountries();

    $scope.addLocation = function () {
        //alert(13);
        $scope.item={
            "city": '',
            "country_id":'',
            "id": '',
            "is_active":0
        };
        /*$scope.example1model = [];
        $scope.example1data = [
            {id: 1, label: "David"},
            {id: 2, label: "Jhon"},
            {id: 3, label: "Danny"}];*/
        $scope.locationView='edit';
    }

    $scope.cancelLocation = function () {
        $scope.viewLocation();
    }

    $scope.saveLocation = function () {

        //return false;
        if($scope.item.id == '') {
            $http({
                method: "POST",
                url: $rootScope.serviceurl + "addLocation",
                data: {"city": $scope.item.city, "country_id": $scope.item.country_id, "is_active": $scope.item.is_active},
                headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                $scope.viewLocation();
                $scope.item={};
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }else{
            $http({
                method: "PUT",
                url: $rootScope.serviceurl + "updateLocation/"+$scope.item.id,
                data: {"id": $scope.item.id,"city": $scope.item.city, "country_id": $scope.item.country_id,"is_active": $scope.item.is_active},
                headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                $scope.viewLocation();
                $scope.item={};
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }

    }

    $scope.deleteLocation = function (c_id) {
        //alert(c_id);
        if ( window.confirm("Want to delete?") ) {
            $http({
                method: "DELETE",
                url: $rootScope.serviceurl + "deleteLocation/"+c_id,
                //data: {"name": $scope.item.name,"is_active": $scope.item.is_active},
                //headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                $scope.viewLocation();
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }else{

        }

    }



         
         //$scope.getLoginDetails();

         
   
});

