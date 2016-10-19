'use strict';
/**
 * controllers used for the login
 */
app.controller('promomasterimageCtrl', function ($rootScope, $scope, $http, $location, myAuth,$timeout,$stateParams) {
    $stateParams.resturantId = 1;
    $scope.tableshow=false;


    $scope.viewPromo = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getOfferImages/"+ $stateParams.promoId,
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
            $scope.tableshow=true;
            //console.log($scope.allcat);


        });
        $scope.promoView='view';
    }

    $scope.viewPromo();




    $scope.addPromo = function () {
        //alert(13);
        $scope.item={
            "image": '',
        };console.log($scope.item);
        /*$scope.example1model = [];
         $scope.example1data = [
         {id: 1, label: "David"},
         {id: 2, label: "Jhon"},
         {id: 3, label: "Danny"}];*/

        $scope.promoView='edit';
    }

    $scope.cancelPromo = function () {
        $scope.viewPromo();
    }
    $scope.savePromo = function () {
        console.log($scope.item);
        //return false;
        $scope.item.offer_id = $stateParams.promoId;


                $http({
                    method: "POST",
                    url: $rootScope.serviceurl + "addNewOfferImage",
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
    $scope.deletePromo = function (c_id) {
        //alert(c_id);
        if ( window.confirm("Want to delete?") ) {
            $http({
                method: "DELETE",
                url: $rootScope.serviceurl + "deleteOfferImage/"+c_id,
                //data: {"name": $scope.item.name,"is_active": $scope.item.is_active},
                //headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                $scope.tableshow=false;
                $scope.viewPromo();

                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }else{

        }

    }






});

