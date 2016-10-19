app.controller('allvoucherCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    $scope.voucherInfo;
    $scope.first_show = 1;
    $scope.second_show = 1;
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
    if(!$scope.loggedindetails){

        $location.path("/login");
    }

    $scope.voucherInfo = null;
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "allvoucher/"+$scope.loggedindetails.id,
        }).success(function (data) {
            $scope.voucherInfo =data;
            //console.log($scope.voucherInfo);
            //console.log($scope.voucherInfo);
            /*$scope.dataGridOptions = {
                dataSource: $scope.voucherInfo,
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

                columns: ["title", "price", "offer_percent", "expire_date",
                    {
                        width: 100,
                        alignment: 'center',
                        cellTemplate: function (container, options) {

                            $('<button/>').addClass('dx-button')
                                .text('Details')
                                .on('dxclick', function () {
                                    $location.path('/voucherdetail/'+options.data.voucher_id);
                                })
                                .appendTo(container);
                        }
                    },
                    {
                        width: 100,
                        alignment: 'center',
                        cellTemplate: function (container, options) {
                            if (options.data.resale == 0) {
                                $('<button/>').addClass('dx-button')
                                    .text('ReSell')
                                    .on('dxclick', function () {
                                        //Do something with options.data;
                                        $location.path('/vouchersell/' + options.data.voucher_id);
                                    })
                                    .appendTo(container);
                            }

                        }
                    }

                ]
            };*/


        });

    $http({
        method: "GET",
        url: $rootScope.serviceurl + "expiresoonvoucher/"+$scope.loggedindetails.id,
    }).success(function (data) {
        $scope.soonVoucherInfo =data;
        //console.log($scope.voucherInfo);
        /*$scope.dataGridOptions2 = {
            dataSource: $scope.soonVoucherInfo,
            paging: {
                pageSize: 5
            },
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: [5, 10, 20],
                showInfo: true
            },

            columns: ["title", "price", "offer_percent", "expire_date",
                {
                    width: 100,
                    alignment: 'center',
                    cellTemplate: function (container, options) {

                        $('<button/>').addClass('dx-button')
                            .text('Details')
                            .on('dxclick', function () {
                                //Do something with options.data;
                                $location.path('/voucherdetail/' + options.data.voucher_id);
                            })
                            .appendTo(container);

                    }
                },
                {
                    width: 100,
                    alignment: 'center',
                    cellTemplate: function (container, options) {
                        if (options.data.resale == 0) {
                            $('<button/>').addClass('dx-button')
                                .text('ReSell')
                                .on('dxclick', function () {
                                    //Do something with options.data;
                                    $location.path('/vouchersell/' + options.data.voucher_id);
                                })
                                .appendTo(container);
                        }

                    }
                }

            ]
        };*/


    });

    $scope.voucherdetails = function(voucherId) {
        $location.path('/voucherdetail/' + voucherId);
    }




});