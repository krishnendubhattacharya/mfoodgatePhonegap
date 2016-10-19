app.controller('swapvoucherCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    $scope.voucherInfo;
    $scope.voucherInfo2;
    $scope.voucherInfo3;
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
            url: $rootScope.serviceurl + "mySwapList/"+$scope.loggedindetails.id,
        }).success(function (data) {
            $scope.voucherInfo =data.data;
            console.log($scope.voucherInfo);
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

                columns: [{caption:"Voucher Name",dataField:"title"},
                    {caption:"Voucher Value",dataField:"price"},
                    {caption:"Net Price",dataField:"netprice"},
                    {caption:"Expired Swap Offer",dataField:"offering_end_date"},"expire_date",
                    {caption:"Highest Bid",dataField:"high_bid"},"posted_on",
                    {
                        width: 250,
                        caption:'Action',
                        alignment: 'center',
                        cellTemplate: function (container, options) {

                            $('<button/>').addClass('dx-button')
                                .text('Details')
                                .on('dxclick', function () {
                                    //$location.path('/swapvoucherdetail/'+ options.data.id);
                                    $scope.detailSwap(options.data.id,options.data.offer_id);
                                })
                                .appendTo(container);
                            if(options.data.Status!='Expired'){
                            
					   $('<button/>').addClass('dx-button')
                                .text('Bidder')
                                .on('dxclick', function () {
                                    //Do something with options.data;
                                    //$location.path('/swapinterested/' + options.data.id);
                                    $scope.swapBidder(options.data.id);
                                })
                                .appendTo(container);
                            $('<button/>').addClass('dx-button')
                                .text('Cancel')
                                .on('dxclick', function () {
                                    //Do something with options.data;
                                    //$location.path('/swapinterested/' + options.data.id);
                                    $scope.cancelSwap(options.data.id,options.data.voucher_id);
                                })
                                .appendTo(container);
                             }   
                            

                            
                        }
                    }

                ]
            };


        });

    $scope.voucherInfo2 = null;
    $http({
        method: "GET",
        url: $rootScope.serviceurl + "myBidSwapList/"+$scope.loggedindetails.id,
    }).success(function (data) {
        $scope.voucherInfo2 =data.data;
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

            columns: [{caption:"Voucher Name",dataField:"swap_offer.title"},
                {caption:"Value",dataField:"swap_voucher.price"},
                "expire_date",{caption:"Posted Date",dataField:"posted_on"},
                {caption:"Expired Swap Offer",dataField:"offering_end_date"},
                {
                    width: 250,
                    caption:'Action',
                    alignment: 'center',
                    cellTemplate: function (container, options) {

                        $('<button/>').addClass('dx-button')
                            .text('Details')
                            .on('dxclick', function () {
                                //$location.path('/swapvoucherdetail/'+ options.data.id);
                                $scope.detailSwap(options.data.id,options.data.offer_id);
                            })
                            .appendTo(container);
                        if(options.data.Status!='Expired'){
                        $('<button/>').addClass('dx-button')
                            .text('Edit')
                            .on('dxclick', function () {
                                //Do something with options.data;
                                //$location.path('/swapinterested/' + options.data.id);
                                $scope.swapEdit(options.data.id,options.data.swap_id);
                            })
                            .appendTo(container);
                        $('<button/>').addClass('dx-button')
                            .text('Cancel')
                            .on('dxclick', function () {
                                //Do something with options.data;
                                //$location.path('/swapinterested/' + options.data.id);
                                $scope.cancelSwapBid(options.data.id);
                            })
                            .appendTo(container);
                        }
                    }
                }

            ]
        };


    });

	$scope.deddy3 = null;
    $http({
            method: "GET",
            url: $rootScope.serviceurl + "otherSwapList/"+$scope.loggedindetails.id,
        }).success(function (data2) {
            $scope.deddy3 =data2.data;
        //console.log($scope.voucherInfo);
        $scope.dataGridOptions3 = {
		       dataSource: $scope.deddy3,
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
		       columns: [{caption:"Voucher Name", dataField : "title"}, {caption:"Voucher Value", dataField : "price"}, "expire_date",
                {caption:"Swap Offer Date",dataField:"posted_on"},{caption:"Expired Swap Offer",dataField:"offering_end_date"},
                {
                    width: 150,
                    caption:'Action',
                    alignment: 'center',
                    cellTemplate: function (container, options) {

                        $('<button/>').addClass('dx-button')
                            .text('Details')
                            .on('dxclick', function () {
                                //$location.path('/swapvoucherdetail/'+ options.data.id);
                                $scope.detailSwap(options.data.id,options.data.offer_id);
                            })
                            .appendTo(container);
                        if(options.data.Status!='Expired'){
                        $('<button/>').addClass('dx-button')
                            .text('Bid')
                            .on('dxclick', function () {
                                //Do something with options.data;
                                //$location.path('/swapinterested/' + options.data.id);
                                $scope.swapBid(options.data.id);
                            })
                            .appendTo(container);
                         }   
                    }
                }

            ]
            };
        });
    /*$http({
        method: "GET",
        url: $rootScope.serviceurl + "otherSwapList/"+$scope.loggedindetails.id,
    }).success(function (data) {
        $scope.voucherInfo3 =data.data;
        $scope.dataGridOptions3 = {
            dataSource: $scope.voucherInfo3,
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

            columns: [{caption:"Voucher Name", dataField : "title"}, {caption:"Voucher Value", dataField : "price"}, "expire_date",
                {caption:"Swap Offer Date",dataField:"posted_on"},{caption:"Expired Swap Offer",dataField:"offering_end_date"},
                {
                    width: 150,
                    caption:'Action',
                    alignment: 'center',
                    cellTemplate: function (container, options) {

                        $('<button/>').addClass('dx-button')
                            .text('Details')
                            .on('dxclick', function () {
                                //$location.path('/swapvoucherdetail/'+ options.data.id);
                                $scope.detailSwap(options.data.id,options.data.offer_id);
                            })
                            .appendTo(container);
                        if(options.data.Status!='Expired'){
                        $('<button/>').addClass('dx-button')
                            .text('Bid')
                            .on('dxclick', function () {
                                //Do something with options.data;
                                //$location.path('/swapinterested/' + options.data.id);
                                $scope.swapBid(options.data.id);
                            })
                            .appendTo(container);
                         }   
                    }
                }

            ]
        };


    });*/


    $scope.cancelSwap = function (swap_id,voucher_id) {
        //$location.path('/resaleCancel/' + voucher_resale_id);
        $http({
            method: "POST",
            url: $rootScope.serviceurl + "swapCancel",
            data: {"id":swap_id,"voucher_id":voucher_id},
        }).success(function (data) {
            //$scope.voucherInfo =data.bid_details;
            //console.log($scope.voucherInfo);
            if(data.type == 'success'){
                //var message = data.message;
                //params.validationGroup.reset();
                $location.path('/dashboard');

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
    }

    $scope.cancelSwapBid = function (swapi_id) {
        //$location.path('/resaleCancel/' + voucher_resale_id);
        $http({
            method: "POST",
            url: $rootScope.serviceurl + "swapBidCancel",
            data: {"id":swapi_id},
        }).success(function (data) {
            //$scope.voucherInfo =data.bid_details;
            //console.log($scope.voucherInfo);
            if(data.type == 'success'){
                //var message = data.message;
                //params.validationGroup.reset();
                $location.path('/dashboard');

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
    }

    $scope.detailSwap = function (swap_id,promoId) {
        $location.path('/swapvoucherdetail/' + swap_id+'/'+promoId);

    }

    $scope.swapEdit = function (swap_ins_id,swap_id) {

        $location.path('/swapinterestededit/'+swap_ins_id+'/'+swap_id);
    }

    $scope.swapBid = function (swap_id) {

        $location.path('/swapinterested/'+swap_id);

    }
    $scope.swapBidder = function (swap_id) {

        $location.path('/swapbidderlist/'+swap_id);

    }



});
