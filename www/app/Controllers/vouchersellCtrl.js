app.controller('vouchersellCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    if(!$scope.loggedindetails){

        $location.path("/login");
    }
    //console.log($scope.loggedindetails);
    //$scope.userInfo ='';

    $scope.operator_list = [];
    $scope.operator_list.push({name:'AND',value:1});
    $scope.operator_list.push({name:'OR',value:0});
    $scope.textBox = {
        price: {
            mode: "text"

        },
        points: {
            mode: "text",

        },
        operator:{
            dataSource: $scope.operator_list,
            displayExpr: "name",
            valueExpr: "value",
            onInitialized:function(e){
                //$scope.res_select = e.component;
            }


        },
        operator1:{
            dataSource: $scope.operator_list,
            displayExpr: "name",
            valueExpr: "value",
            onInitialized:function(e){
                //$scope.res_select1 = e.component;
            }
        }
    };



    /*$scope.oldPasswordValidationRules = {
        validationRules: [{
            type: "required",

        }]
    };
    $scope.newPasswordValidationRules = {
        validationRules: [{
            type: "required",

        }]
    };
    $scope.confirmPasswordValidationRules = {
        validationRules: [{
            type: "required",

        }]
    };*/

    $scope.validateAndSubmit = function(params) {

        //alert(1);
        //console.log(params);
        //alert($scope.price);
        //alert($scope.points);
        //alert($stateParams.voucherId);
        //alert($scope.loggedindetails.id);
        //var result = params.validationGroup.validate();
       // if(result.isValid) {
        $scope.offering_start_date = moment($scope.offering_start_date).format("YYYY/MM/DD");
        $scope.offering_end_date = moment($scope.offering_end_date).format("YYYY/MM/DD");
        //console.log($scope.offering_start_date);
        //console.log($scope.offering_end_date);
        //return false;

            $http({
                method: "POST",
                url: $rootScope.serviceurl+"resale",
                data: {"point_id":$scope.point_id,"operator":$scope.operator,"offering_start_date":$scope.offering_start_date,"offering_end_date":$scope.offering_end_date,"price":$scope.price,"points":$scope.points,"voucher_id":$stateParams.voucherId,"user_id":$scope.loggedindetails.id},
                headers: {'Content-Type': 'application/json'},
            }).success(function(data) {
                console.log(data);
                //return false;
                //params.validationGroup.reset();
                if(data.type == 'success'){
                    //var message = data.message;
                    //params.validationGroup.reset();
                    $location.path('/allvoucher');

                    DevExpress.ui.notify({
                        message: data.message,
                        position: {
                            my: "center top",
                            at: "center top"
                        }
                    }, "success", 3000);
                }else{
                    var message = "Error occured.";
                    DevExpress.ui.notify({
                        message: data.message,
                        position: {
                            my: "center top",
                            at: "center top"
                        }
                    }, "error", 3000);
                }

            })

            //form.submit();
            //params.validationGroup.reset();
        //}
    };

    $scope.getMfoodPoints = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getAllMFoodPointMaster",

        }).success(function (data) {
            $scope.all_point = [];
            angular.forEach(data.data,function(val){
                $scope.all_point.push({name:val.name,value:val.id});
            })
            //$scope.res_select.option({dataSource: $scope.all_restaurant});
            //$scope.res_select.option({dataSource: $scope.all_restaurant});
            //$scope.res_select1.option({dataSource: $scope.all_restaurant});
            //console.log($scope.all_restaurant);
            $scope.selectBox = {
                point_id:{
                    dataSource: $scope.all_point,
                    displayExpr: "name",
                    valueExpr: "value",
                    onInitialized:function(e){
                        //$scope.res_select = e.component;
                    },
                    onSelectionChanged:function(e){
                        //console.log(12);
                        $scope.points = '';
                    }

                },
                point_id1:{
                    dataSource: $scope.all_point,
                    displayExpr: "name",
                    valueExpr: "value",
                    onInitialized:function(e){
                        //$scope.res_select1 = e.component;
                    },
                    onSelectionChanged:function(e){
                        $scope.points = '';
                    }
                }
            };



        });


    }
    $scope.getMfoodPoints();



});
