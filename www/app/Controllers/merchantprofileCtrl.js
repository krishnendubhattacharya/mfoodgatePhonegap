app.controller('merchantprofileCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    if(!$scope.loggedindetails){

        $location.path("/login");
    }
    //console.log($scope.loggedindetails);
    //$scope.userInfo ='';
    $scope.getUserInfo = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "user/"+$scope.loggedindetails.id,
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            //console.log(data.email);
            $scope.userInfo =data.user_details;
            //console.log($scope.allcat);

            console.log($scope.userInfo.email);

            $scope.setSelectedLocation();
            $scope.setSelectedTypes();

        });

    }

    $scope.typeList = [];
    $scope.areaList = [];
    $scope.selectedLocation = [];
    $scope.selectedTypes = [];

    $scope.getUserInfo();
    $scope.textBox = {
        merchant_name: {
            mode: "text"

        },
        last_name: {
            mode: "text",

        },
        email: {
            mode: "email",

        },
        username: {
            mode: "text",

        },
        phone: {
            mode: "number",

        }
    };

    $scope.textArea = {
        height: 90
    };

    $scope.emailValidationRules = {
        validationRules: [{
            type: "required",

        }]
    };

    $scope.validateAndSubmit = function(params) {
        console.log($scope.areaList,' == Area list == ',$scope.typeList);
        //alert(1);
        //console.log(params);
        //var result = params.validationGroup.validate();
        //if(result.isValid) {
            $http({
                method: "PUT",
                url: $rootScope.serviceurl+"users/"+$scope.loggedindetails.id,
                data: { "email" : $scope.userInfo.email,
                        "phone" : $scope.userInfo.phone,
                        "about_me" : $scope.userInfo.about_me,
                        "merchant_name" : $scope.userInfo.merchant_name,
                        "address" : $scope.userInfo.address,
                        areaList : $scope.areaList,
                        typeList : $scope.typeList
                },
                headers: {'Content-Type': 'application/json'},
            }).success(function(data) {
                //console.log(data);
                if(data.type == 'success'){
                    var message = data.message;
                    //params.validationGroup.reset();
                    //$location.path('/login');
                    $scope.getUserInfo();
                    DevExpress.ui.notify({
                        message: "Edited Successfilly",
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
    $scope.locationData = null;
    //$scope.tagBoxDataLocation = new DevExpress.data.DataSource({
    //                                                        store: [],
    //                                                        paginate: false
    //                                                          });
    $scope.viewLocation = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getLocations",

        }).success(function (data) {

            $scope.allLoc = data.location;
            $scope.locationData.option('items',$scope.allLoc);
            $scope.setSelectedLocation();
            //for (var i = 0; i < $scope.allLoc.length; i++) {
            //    $scope.tagBoxDataLocation.store().insert($scope.allLoc[i]);
            //}
            //$scope.tagBoxDataLocation.load();
            //$scope.locationData.option('values',$scope.allLoc[0]);
            //console.log($scope.tagBoxData._items);
            //$scope.taglist = $scope.tagBoxData._items;



        });

    }

    $scope.setSelectedTypes = function(){
        if($scope.allcat && $scope.userInfo)
        {
            //console.log($scope.allLoc,$scope.userInfo.locations);

            angular.forEach($scope.allcat,function(all,key){
                angular.forEach($scope.userInfo.categories,function(own){
                    if(all.id == own.category_id)
                    {
                        $scope.selectedTypes.push($scope.allcat[key]);
                    }
                })
            })
            $scope.typeList = $scope.selectedTypes;
        }
    }

    $scope.setSelectedLocation = function(){
        if($scope.allLoc && $scope.userInfo)
        {
            //console.log($scope.allLoc,$scope.userInfo.locations);

            angular.forEach($scope.allLoc,function(all,key){
                angular.forEach($scope.userInfo.locations,function(own){
                    if(all.id == own.location_id)
                    {
                        $scope.selectedLocation.push($scope.allLoc[key]);
                    }
                })
            })
            $scope.areaList = $scope.selectedLocation;
        }
    }

    $scope.$watchCollection('selectedLocation',function(){
        if($scope.selectedLocation)
            //console.log('hellooo',$scope.allLoc[0]);
            $scope.locationData.option('values',$scope.selectedLocation);
    })

    $scope.$watchCollection('selectedTypes',function(){
        if($scope.typeData)
        //console.log('hellooo',$scope.allLoc[0]);
            $scope.typeData.option('values',$scope.selectedTypes);
    })


    $scope.inialLoc = function(e){
        $scope.locationData = e.component;
        console.log(12);
        //if($scope.allLoc[0])
            //$scope.locationData.option('values',$scope.allLoc[0]);
    }

    $scope.inialType = function(e){
        $scope.typeData = e.component;
        //if($scope.allLoc[0])
        //$scope.locationData.option('values',$scope.allLoc[0]);
    }



    $scope.viewLocation();

    $scope.tagBoxData = new DevExpress.data.DataSource({ store: [], paginate: false });
    $scope.viewCategory = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getCategories",

        }).success(function (data) {

            $scope.allcat = data.category;
            $scope.typeData.option('items',$scope.allcat);
            $scope.setSelectedTypes();
            //for (var i = 0; i < $scope.allcat.length; i++) {
            //
            //    $scope.tagBoxData.store().insert($scope.allcat[i]);
            //}
            //$scope.tagBoxData.load();
            ////console.log($scope.tagBoxData._items);
            //$scope.taglist = $scope.tagBoxData._items;



        });

    }

    $scope.viewCategory();

});