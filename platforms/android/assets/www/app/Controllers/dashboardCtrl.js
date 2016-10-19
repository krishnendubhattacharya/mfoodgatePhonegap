app.controller('dashboardCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    if(!$scope.loggedindetails){

        $location.path("/login");
    }
    
    $scope.first_show = 1;
    $scope.second_show = 1;
    $scope.third_show = 1;
    $scope.firstShowHide = function () {
        if($scope.first_show == 1){
            $scope.first_show = 0;
        }else{
            $scope.first_show = 1;
        }
    }
    $scope.secondShowHide = function () {
        if($scope.second_show == 1){
            $scope.second_show = 0;
        }else{
            $scope.second_show = 1;
        }

    }
    $scope.thirdShowHide = function () {
        if($scope.third_show == 1){
            $scope.third_show = 0;
        }else{
            $scope.third_show = 1;
        }

    }
    
    $scope.getUserInfo = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "user/"+$scope.loggedindetails.id,
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            //console.log(data.email);
            $scope.userInfo =data.user_details;
            //$scope.catInfo =data.categories;
            //console.log($scope.catInfo);
            //console.log($scope.allcat);

            //console.log($scope.userInfo.email);



        });

    }
    $scope.getUserInfo();

    $scope.getUserDashboardInfo = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "userRelatedPoint/"+$scope.loggedindetails.id,
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            //console.log(data.email);
            $scope.user_point_details =data.user_point_details;
            $scope.user_voucher_details =data.user_voucher_details;
            //$scope.catInfo =data.categories;
            //console.log($scope.catInfo);
            //console.log($scope.allcat);

            //console.log($scope.userInfo.email);



        });

    }
    $scope.getUserDashboardInfo();

});
