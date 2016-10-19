'use strict';
/** 
 * controllers used for the register
 */
app.controller('registerCtrl', function ($rootScope, $scope, $http, $location) {


$scope.textBox = {
        first_name: {
        placeholder: "Enter First Name",
        mode: "text"        
        },
        last_name: {
        placeholder: "Enter Second Name",
        mode: "text"       
        },
        email: {
        placeholder: "Enter Email",
        mode: "email"       
        },
        username: {
        placeholder: "Enter Username",
        mode: "username"       
        },
        password: {
        placeholder: "Enter Password",
        mode: "password"        
        }
};
$scope.validateAndSubmit = function(params) {
        console.log(params);
    var result = params.validationGroup.validate();
    if(result.isValid) {
        DevExpress.ui.notify({
            message: "You have submitted the form",
            position: {
                my: "center top",
                at: "center top"
            }
        }, "success", 3000);
        //form.submit();
        //params.validationGroup.reset();
    }
};

$scope.nameValidationRules = {
    validationRules: [{
        type: "required",
        message: "Name is required"
    }]
};
 //alert($scope.textBox.simple.value);   
   
   
});

