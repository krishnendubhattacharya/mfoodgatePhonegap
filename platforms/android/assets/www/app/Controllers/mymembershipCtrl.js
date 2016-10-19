app.controller('mymembershipCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth,$state) {
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
    //console.log($state.$current.name);
    $scope.selectedEmployee = {};
    $scope.voucherInfo = null;
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getMyMembership/"+$scope.loggedindetails.id,
        }).success(function (data) {
            $scope.voucherInfo =data;
            //console.log($scope.voucherInfo.membership);



            $scope.dataGridOptions = {
                dataSource: $scope.voucherInfo.membership,
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

                columns: [{ dataField: 'title',caption:'Description'},
                    { dataField: 'restaurant_name',caption:'Restaurant'},
                    { dataField: 'purchased_date',caption:'Member Since'}, "expire_date",
                    { dataField: 'member_id',caption:'Member Id'},
                    {
                        alignment: 'center',
                        caption:'Action',
                        cellTemplate: function (container, options) {

                            //$('<button/>').addClass('dx-button')
                            //                              .text('Details')
                            //                               .on('dxclick', function () {
                            //                                       $location.path('/membershipdetail/'+options.data.voucher_id);
                            //                                 })
                            //                              .appendTo(container);

                            $('<button/>').addClass('dx-button')
                                .text('Details')
                                .on('dxclick', function () {
                                    $location.path('/merchant-membership/'+options.data.voucher_id+'/'+options.data.merchant_id+'/');
                                })
                                .appendTo(container);
                        }
                    }

                ],
                onSelectionChanged: function (selectedItems) {
                    //console.log(selectedItems);
                    //$scope.selectedEmployee = selectedItems.selectedRowsData[0];
                }
            };


        });

    $scope.getExpiredMemberships = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getMyExpiredMembership/"+$scope.loggedindetails.id,
        }).success(function (data) {
            $scope.voucherInfo1 =data;
            //console.log($scope.voucherInfo.membership);

            $scope.dataGridOptions1 = {
                dataSource: $scope.voucherInfo1.membership,
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

                columns: [{ dataField: 'title',caption:'Description'},
                    { dataField: 'restaurant.title',caption:'Restaurant'},
                    { dataField: 'purchased_date',caption:'Member Since'}, "expire_date"
                    /*{
                        width: 100,
                        alignment: 'center',
                        cellTemplate: function (container, options) {

                            $('<button/>').addClass('dx-button')
                                .text('Details')
                                .on('dxclick', function () {
                                    $location.path('/membershipdetail/'+options.data.voucher_id);
                                })
                                .appendTo(container);
                        }
                    }*/

                ],
                onSelectionChanged: function (selectedItems) {
                    //console.log(selectedItems);
                    //$scope.selectedEmployee = selectedItems.selectedRowsData[0];
                }
            };


        });
    }

    $scope.getExpiredMemberships();


    $scope.viewDetails = function (data) {
        console.log(data);
        localStorage.setItem('merchantheadername', "");
        localStorage.setItem('merchantweb', "");
        localStorage.setItem('merchantheaderimage', "");
        $location.path('/merchant-membership/'+data.voucher_id+'/'+data.merchant_id + '/');
    }


});
