app.controller('swapbidderlistCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {
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



    $scope.bidderList = function(){

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "interestedSwapList/"+$stateParams.swapId,
        }).success(function (data) {
            $scope.bidInfo =data.data;
            console.log($scope.bidInfo);
            $scope.dataGridOptions4 = {
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

                columns: ["first_name", "last_name",
                    {caption:'Voucher Name',dataField:"title"},
                    {caption:'Voucher Value',dataField:"price"},
                    {caption:'Voucher Expire Date',dataField:"expire_date"},
                    {
                        width: 170,
                        alignment: 'center',
                        cellTemplate: function (container, options) {

                            $('<button/>').addClass('dx-button')
                                .text('Detail')
                                .on('dxclick', function () {
                                    // $location.path('/voucherdetail/'+options.data.id);
                                    $scope.detailSwap(options.data.swap_id,options.data.offer_id);
                                })
                                .appendTo(container);

                            $('<button/>').addClass('dx-button')
                                .text('Accept')
                                .on('dxclick', function () {
                                   // $location.path('/voucherdetail/'+options.data.id);
                                    $scope.acceptSwapVoucher(options.data.id);
                                })
                                .appendTo(container);
                        }
                    }

                ]
            };


        });

    }

    $scope.bidderList();
    $scope.detailSwap = function (swap_id,promoId) {
        $location.path('/swapvoucherdetail/' + swap_id+'/'+promoId);

    }
    $scope.acceptSwapVoucher = function(swapInterestedId){
        $http({
            method: "GET",
            url: $rootScope.serviceurl+"swapInterestAccept/"+swapInterestedId,
        }).success(function(data) {
            //console.log(data);
            $location.path("/swapvoucher");
            $scope.message = data.message;

        })

    }
});