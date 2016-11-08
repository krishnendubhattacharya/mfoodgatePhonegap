app.controller('bidderlistCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {
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

    $scope.sellVoucher = function(to_id,bid_price,bid_id,voucher_id){
        //alert(to_id);
       // alert(bid_price);
        //alert(bid_id);
        //alert($stateParams.sellId);
        //alert(voucher_id);
        //alert($scope.loggedindetails.id);
        //return false;
        $http({
            method: "POST",
            url: $rootScope.serviceurl+"saveVoucherResale",
            data: {"to_user_id":to_id,"price":bid_price,"voucher_id":voucher_id,"from_user_id":$scope.loggedindetails.id,"bid_id":bid_id,"resell_id":$stateParams.sellId},
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            console.log(data);
            //return false;
            //params.validationGroup.reset();
            if(data.type == 'success'){
                //var message = data.message;
                //params.validationGroup.reset();
                $location.path('/bidvoucher');

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

        });
    };

    $scope.bidderList = function(){

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "bidders/"+$stateParams.sellId+"/"+$scope.loggedindetails.id,
        }).success(function (data) {
            $scope.bidInfo =data.bidder_details;
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

                columns: ["first_name", "last_name", "email", "bid_price",
                    {
                        width: 100,
                        alignment: 'center',
                        cellTemplate: function (container, options) {

                            $('<button/>').addClass('dx-button')
                                .text('Sell')
                                .on('dxclick', function () {
                                   // $location.path('/voucherdetail/'+options.data.id);
                                    $scope.sellVoucher(options.data.bidder_id,options.data.bid_price,options.data.bid_id,options.data.voucher_id);
                                })
                                .appendTo(container);
                        }
                    }

                ]
            };


        });

    }
    $scope.bidderList();
});
