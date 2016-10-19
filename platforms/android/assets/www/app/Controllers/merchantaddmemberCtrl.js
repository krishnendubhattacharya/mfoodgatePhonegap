app.controller('merchantaddmemberCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    if(!$scope.loggedindetails){

        $location.path("/login");
    }
    //console.log($scope.loggedindetails);
    //$scope.userInfo ='';
    $scope.selectedType = '';
    $scope.uniqueCode = '';
    $scope.email = '';
    var user_type = ["Existing User", "New User"];
    $scope.getmembershipInfo = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getAllActiveMembership/"+$scope.loggedindetails.id,
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            //console.log(data.email);
            $scope.membershipInfo =data.memberships;
            //console.log($scope.allcat);


            $scope.selectBox = {
                simple: {
                    dataSource: $scope.membershipInfo,
                    displayExpr: "title",
                    valueExpr: "id"
                }
            }



        });

    }
    $scope.getmembershipInfo();

    $scope.userChoice = function () {
        //alert($scope.user_type_id);
    }

    var selectBoxData = [
        { "name": "Alabama", "capital": "Montgomery" },
        { "name": "Alaska", "capital": "Juneau" },
        { "name": "Arizona", "capital": "Phoenix" }
    ];

    $scope.textBox = {
        username: {
            mode: "text",
            valueChangeEvent: "keyup",
            onValueChanged: function(data) {
                $scope.uniqueCode = data.value;
            }

        },
        user_code: {
            mode: "text",
            valueChangeEvent: "keyup",
            onValueChanged: function(data) {
                $scope.email = data.value;
            }
        }
    };

    $scope.radioGroup = {
        changeLayout: {
            items: user_type,
            //value: user_type[0],
            layout: "horizontal",
            onValueChanged: function(e){
                //alert(e.value);
                $scope.selectedType = e.value;

            }
        }
    };




    $scope.membershipValidationRules = {
        validationRules: [{
            type: "required",

        }]
    };
    $scope.radioValidationRules = {
        validationRules: [{
            type: "required",

        }]
    };
    /*$scope.selectBox = {
        simple: {
            dataSource: selectBoxData,
            displayExpr: "name",
            valueExpr: "capital"
        }
    }*/

    $scope.validateAndSubmit = function(params) {

        //alert(1);
        //console.log(params);
        /*alert($scope.offer.title);
        alert($scope.offer.category_id);
        alert($scope.offer.price);
        alert($scope.offer.offer_percent);
        alert($scope.offer.description);
        alert($scope.offer.offer_from_date);
        alert($scope.offer.offer_to_date);
        alert($scope.offer.city);
        alert($scope.offer.location);*/
        var result = params.validationGroup.validate();

        if(result.isValid) {
            //alert($scope.membership_id);
            //alert($scope.user_code);
            //alert($scope.username);
            //alert($scope.user_type);
            //alert($scope.uniqueCode);
            //alert($scope.email);
            //return false;
            $http({
                method: "POST",
                url: $rootScope.serviceurl+"merchantSaveMember",
                data: {"offer_id":$scope.membership_id,"unique_code":$scope.user_code,"email":$scope.username,"user_type":$scope.user_type},
                headers: {'Content-Type': 'application/json'},
            }).success(function(data) {
                console.log(data);
                if(data.type == 'success'){
                    var message = data.message;
                    //params.validationGroup.reset();
                    //$location.path('/login');
                    //$scope.getUserInfo();
                    $location.path('/merchantprofile');
                    DevExpress.ui.notify({
                        message: "Added Successfilly",
                        position: {
                            my: "center top",
                            at: "center top"
                        }
                    }, "success", 3000);
                }else{
                    //var message = "Error occured.";
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