app.controller('voucherdetailforallCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    $scope.voucherInfo;
    if(!$scope.loggedindetails){

        //$location.path("/login");
    }
    console.log($stateParams.voucherId);
    $scope.voucherInfo = null;

    $scope.getVoucherDetail = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "resellVoucherDetail/"+$stateParams.voucherId+'/'+$stateParams.sellId,
        }).success(function (data) {
            console.log(data);
            $scope.voucherInfo =data;
            $scope.resellId =$stateParams.sellId;
            $scope.voucherId =$stateParams.voucherId;
        });

    }
    $scope.getVoucherDetail();

    $scope.bidderList = function(){

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "bidders/"+$stateParams.sellId+"/"+$scope.loggedindetails.id,
        }).success(function (data) {
            $scope.bidInfo =data.bidder_details;
            console.log($scope.bidInfo);
            $scope.dataGridOptions = {
                dataSource: $scope.bidInfo,
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

                columns: ["first_name", "last_name", "email", "bid_price"

                ]
            };


        });

    }
    $scope.bidderList();

    $scope.boucherbid = function(voucherId, resellId) {
        //alert(voucherId);
        //alert(resellId);
        $location.path('/sellbid/'+resellId+'/'+voucherId)
    }
    $scope.boucherResell = function () {
        $location.path('/vouchersell/' + $stateParams.voucherId);
    }

    $scope.bocherGift = function () {
        $location.path('/giftvoucher/' + $stateParams.voucherId);
    }




});