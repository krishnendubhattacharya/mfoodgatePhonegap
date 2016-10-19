app.controller('giftvoucherlistCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    $scope.voucherInfo;
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

    $scope.voucherInfo = null;
    $http({
        method: "GET",
        url: $rootScope.serviceurl + "getGiftedToMe/"+$scope.loggedindetails.id,
    }).success(function (data) {
        $scope.voucherInfo =data.gifts;
        //console.log($scope.voucherInfo);
        $scope.dataGridOptions = {
            dataSource: $scope.voucherInfo,
            wordWrapEnabled: true,
            selection: {
                mode: "single"
            },
            paging: {
                pageSize: 5
            },
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: [5, 10, 20],
                showInfo: true
            },

            columns: ["voucher_name", "resturant_name", "price",
                {caption:"Expire Date",dataField:"offer_to_date"},
                {caption:"From Friend Name",dataField:"friend"},
                {caption:"Friend Email",dataField:"friend_email"}
            ]
        };

    });


    $http({
        method: "GET",
        url: $rootScope.serviceurl + "getGiftedByMe/"+$scope.loggedindetails.id,
    }).success(function (data) {
        $scope.voucherInfo2 =data.gifts;
        //console.log($scope.voucherInfo);
        $scope.dataGridOptions2 = {
            dataSource: $scope.voucherInfo2,
            wordWrapEnabled: true,
            selection: {
                mode: "single"
            },
            paging: {
                pageSize: 5
            },
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: [5, 10, 20],
                showInfo: true
            },

            columns: ["voucher_name", "resturant_name", "price",
                {caption:"Expire Date",dataField:"offer_to_date"},
                {caption:"To Friend Name",dataField:"friend"},
                {caption:"Friend Email",dataField:"friend_email"}
            ]
        };

    });




});
