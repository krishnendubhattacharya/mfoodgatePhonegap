app.controller('mypointsCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {
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

    $scope.getPoints = function() {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "mypoints/" + $scope.loggedindetails.id,
        }).success(function (data) {
            $scope.voucherInfo = data.data;
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

                columns: [{caption:"Name of Points",dataField:"point_name"},
                    {caption:"Merchants",dataField:"merchant_name"},
                    {caption:"Get",dataField:"total_point"},
                    {caption:"Redeem",dataField:"redeem_point"},
                    {caption:"Expired",dataField:"expired_point"},
                    {caption:"Available",dataField:"available_point"},
                    {
                        caption:'Action',
                        width: 100,
                        alignment: 'center',
                        cellTemplate: function (container, options) {

                            $('<button/>').addClass('dx-button')
                                .text('Details')
                                .on('dxclick', function () {
                                    //$location.path('/voucherdetail/' + options.data.id);
                                    //alert(options.data.id);
                                    //return false;
                                    $scope.point_detail(options.data.id);
                                })
                                .appendTo(container);
                        }
                    }
                    /*{
                        width: 100,
                        alignment: 'center',
                        cellTemplate: function (container, options) {
                            $('<button/>').addClass('dx-button')
                                .text('ReSell')
                                .on('dxclick', function () {
                                    //Do something with options.data;
                                    $location.path('/vouchersell/' + options.data.id);
                                })
                                .appendTo(container);

                        }
                    }*/

                ]
            };
            console.log("ajax")
            $scope.listViewData.option({"dataSource": $scope.voucherInfo,hoverStateEnabled: false });

           /*$scope.listDataSource = new DevExpress.data.DataSource({
                store: []
            });
            for (var i = 0; i < $scope.voucherInfo.length; i++) {
                $scope.listDataSource.store().insert($scope.voucherInfo[i]);
            }

            $scope.listDataSource.load();*/



        });
    }
    $scope.loadList=function(e)
    {
        console.log("loadList")
        $scope.listViewData= e.component;
    }
    $scope.getPoints();

    $scope.getExpiredSoon = function(){

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "expiresoonpoints/" + $scope.loggedindetails.id,
        }).success(function (data) {
            $scope.voucherInfo1 = data.data;
            //console.log($scope.voucherInfo);
            $scope.dataGridOptions2 = {
                dataSource: $scope.voucherInfo1,
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

                columns: [{caption:"Name of Points",dataField:"point_name"},
                    {caption:"Merchants",dataField:"merchant_name"},
                    {caption:"Expired in a Week",dataField:"week_count"},
                    {caption:"Expired in a month",dataField:"month_count"},
                    {
                        caption:'Action',
                         width: 100,
                         alignment: 'center',
                         cellTemplate: function (container, options) {

                         $('<button/>').addClass('dx-button')
                         .text('Details')
                         .on('dxclick', function () {
                         //$location.path('/voucherdetail/' + options.data.id);
                                 $scope.point_detail(options.data.id);
                         })
                         .appendTo(container);
                         }
                     }
                    /*{
                     width: 100,
                     alignment: 'center',
                     cellTemplate: function (container, options) {
                     $('<button/>').addClass('dx-button')
                     .text('ReSell')
                     .on('dxclick', function () {
                     //Do something with options.data;
                     $location.path('/vouchersell/' + options.data.id);
                     })
                     .appendTo(container);

                     }
                     }*/

                ]
            };
            $scope.listExpiredPointViewData.option({"dataSource": $scope.voucherInfo1,hoverStateEnabled: false });
        });
    }
    $scope.loadExpiredPointList=function(e)
    {
        //console.log("loadList")
        $scope.listExpiredPointViewData= e.component;
    }
    $scope.getExpiredSoon();
    $scope.point_detail = function (point_id) {

        $location.path('/mypointdetails/' + point_id);
    }
    //$scope.event_detail(options.data.id);



});
