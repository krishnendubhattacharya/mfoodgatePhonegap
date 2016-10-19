app.controller('mypointsdetailsCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    $scope.voucherInfo;
    if(!$scope.loggedindetails){

        $location.path("/login");
    }

    $scope.voucherInfo = null;

    $scope.getPoints = function() {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "myPointDetails/" +$stateParams.pointId+"/"+$scope.loggedindetails.id,
        }).success(function (data) {
            $scope.voucherInfo = data.data;
            //console.log($scope.voucherInfo);
            $scope.dataGridOptions = {
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

                columns: [{caption:"Name of Points",dataField:"point_name"},
                    {caption:"Merchants",dataField:"merchant_name"},
                    {caption:"source",dataField:"source"},
                    {caption:"Transaction",dataField:"transaction"},
                    {caption:"Quantity",dataField:"available_point"},
                    {caption:"Transaction Date",dataField:"transaction_date"},
                    {caption:"Expire Date",dataField:"expire_date"}

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


    $scope.gotoback = function() {
        $location.path("/mypoints");
    }






});