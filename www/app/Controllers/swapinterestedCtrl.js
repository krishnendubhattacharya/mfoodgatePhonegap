app.controller('swapinterestedCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    if(!$scope.loggedindetails){

        $location.path("/login");
    }
    //console.log($scope.loggedindetails);
    //$scope.userInfo ='';

    $scope.textBox = {
        subject: {
            mode: "text"

        },
        voucher_url: {
            mode: "text",

        },
        confirm_password: {
            mode: "text",

        },
        vouchers : {
            dataSource: [],
            displayExpr: "name",
            valueExpr: "value",
            onInitialized:function(e){
                $scope.voucher_sel = e.component;
            }
        },
        vouchers1 : {
            dataSource: [],
            displayExpr: "name",
            valueExpr: "value",
            onInitialized:function(e){
                $scope.voucher_sel1 = e.component;
            }
        }
    };



    $scope.subjectValidationRules = {
        validationRules: [{
            type: "required",

        }]
    };
    /*$scope.voucherurlValidationRules = {
        validationRules: [{
            type: "required",

        }]
    };*/
    $scope.commentValidationRules = {
        validationRules: [{
            type: "required",

        }]
    };

    $scope.validateAndSubmit = function(params) {

        //alert(1);
        //console.log(params);
        var result = params.validationGroup.validate();
        if(result.isValid) {
            //alert($scope.subject);
            //alert($scope.voucher_url);
            //alert($scope.comment);
            //return false;
            $scope.subject = '';
            $http({
                method: "POST",
                url: $rootScope.serviceurl+"swapinterest",
                data: {"subject":$scope.subject,"voucher_id":$scope.voucher_id,"comment":$scope.comment,"user_id":$scope.loggedindetails.id,"swap_id":$stateParams.swapId},
                headers: {'Content-Type': 'application/json'},
            }).success(function(data) {
                console.log(data);
                //return false;
                params.validationGroup.reset();
                if(data.type == 'success'){
                    //var message = data.message;
                    //params.validationGroup.reset();
                    //$location.path('/dashboard');
                    $location.path('/swapvoucher');
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
        }
    };


    $scope.getSwapVouchers = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl+"allvoucher/"+$scope.loggedindetails.id,
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            var vouchers = []
            angular.forEach(data,function(val){
                vouchers.push({name:val.title,value:val.voucher_id});
            })
            $scope.voucher_sel.option({dataSource:vouchers});
            $scope.voucher_sel1.option({dataSource:vouchers});
        })
    }
    $scope.getSwapVouchers();

    $scope.getSwapVoucherDetails = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl+"getSwapVoucherDetail/"+$stateParams.swapId,
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            /*var vouchers = []
            angular.forEach(data,function(val){
                vouchers.push({name:val.title,value:val.voucher_id});
            })
            $scope.voucher_sel.option({dataSource:vouchers});*/
            $scope.swapdetail = data.data[0];
            console.log($scope.swapdetail);
        })
    }
    $scope.getSwapVoucherDetails();

});