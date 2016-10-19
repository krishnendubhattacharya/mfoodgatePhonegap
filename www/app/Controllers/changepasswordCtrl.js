app.controller('changepasswordCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    if(!$scope.loggedindetails){

        $location.path("/login");
    }
    //console.log($scope.loggedindetails);
    //$scope.userInfo ='';

    $scope.textBox = {
        old_password: {
            mode: "password"

        },
        new_password: {
            mode: "password",

        },
        confirm_password: {
            mode: "password",

        }
    };



    $scope.oldPasswordValidationRules = {
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
    };

    $scope.validateAndSubmit = function(params) {

        //alert(1);
        console.log(params);
        var result = params.validationGroup.validate();
        if(result.isValid) {
            $http({
                method: "POST",
                url: $rootScope.serviceurl+"users/changePassword",
                data: {"oldpass":$scope.userInfo.old_password,"newpass":$scope.userInfo.new_password,"confirmpass":$scope.userInfo.confirm_password,"user_id":$scope.loggedindetails.id},
                headers: {'Content-Type': 'application/json'},
            }).success(function(data) {
                console.log(data);
                //return false;
                params.validationGroup.reset();
                if(data.type == 'success'){
                    //var message = data.message;
                    //params.validationGroup.reset();
                    //$location.path('/dashboard');

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



});