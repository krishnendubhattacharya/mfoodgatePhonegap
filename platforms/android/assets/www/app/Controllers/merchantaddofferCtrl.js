app.controller('merchantaddofferCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    if(!$scope.loggedindetails){

        $location.path("/login");
    }
    //console.log($scope.loggedindetails);
    //$scope.userInfo ='';
    $scope.getCategoryInfo = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getCategories",
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            //console.log(data.email);
            $scope.categoryInfo =data.category;
            //console.log($scope.allcat);


            $scope.selectBox = {
                simple: {
                    dataSource: $scope.categoryInfo,
                    displayExpr: "name",
                    valueExpr: "id"
                }
            }



        });

    }
    $scope.getCategoryInfo();

    var selectBoxData = [
        { "name": "Alabama", "capital": "Montgomery" },
        { "name": "Alaska", "capital": "Juneau" },
        { "name": "Arizona", "capital": "Phoenix" }
    ];

    $scope.textBox = {
        title: {
            mode: "text"

        },
        city: {
            mode: "text"

        },
        price: {
            mode: "number",

        },
        offer_percent: {
            mode: "number",

        }
    };
    $scope.dateBox = {
        offer_from_date: {
            format: "date",
            value: new Date(2015, 12, 1, 6)
        },
        offer_to_date: {
            format: "yyyy/MM/dd"
        },
    };

    /*$scope.fileUploaderOptions = {
        selectButtonText: "Select Image",
        labelText: "",
        //accept: "image/*",
        uploadMode: "useForm"
    };*/

    $scope.textArea = {
        height: 90
    };

    $scope.emailValidationRules = {
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
        //var result = params.validationGroup.validate();
        //if(result.isValid) {
            $http({
                method: "POST",
                url: $rootScope.serviceurl+"saveOffer",
                data: {"title":$scope.offer.title,"category_id":$scope.offer.category_id,"price":$scope.offer.price,"offer_percent":$scope.offer.offer_percent,"description":$scope.offer.description,"offer_from_date":$scope.offer.offer_from_date,"offer_to_date":$scope.offer.offer_to_date,"city":$scope.offer.city,"location":$scope.offer.location,"merchant_id":$scope.loggedindetails.id},
                headers: {'Content-Type': 'application/json'},
            }).success(function(data) {
                console.log(data);
                if(data.type == 'success'){
                    var message = data.message;
                    //params.validationGroup.reset();
                    //$location.path('/login');
                    //$scope.getUserInfo();
                    $location.path('/merchantoffer');
                    DevExpress.ui.notify({
                        message: "Added Successfilly",
                        position: {
                            my: "center top",
                            at: "center top"
                        }
                    }, "success", 3000);
                }else{
                    var message = "Error occured.";
                    DevExpress.ui.notify({
                        message: message,
                        position: {
                            my: "center top",
                            at: "center top"
                        }
                    }, "error", 3000);
                }

            })

            //form.submit();
            //params.validationGroup.reset();
       // }
    };



});