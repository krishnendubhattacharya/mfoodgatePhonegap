app.controller('merchanteventCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    $scope.eventInfo;
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




    $scope.dataGridOptions = {
        dataSource: $scope.eventInfo,
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
        onInitialized : function(e){
            $scope.datagridobj = e.component;
        },
        /*searchPanel: {
            visible: true,
            width: 240,
            placeholder: "Search..."
        },*/
        columns: ["title", 
        {caption:'Offer Start Date',dataField:"offer_from_date"},
        {caption:'Offer End Date',dataField:"offer_to_date"},
        "event_date","event_start_time","event_end_time","bid_price","status",
            {
                caption:'Action',
                width: 200,
                alignment: 'center',
                cellTemplate: function (container, options) {
                    $('<button/>').addClass('dx-button')
                        .text('Detail')
                        .on('dxclick',function(){
                            $scope.event_detail(options.data.id);

                        })
                        .appendTo(container);
                    if(!options.data.is_bid && options.data.status!='Expired') 
                    {   
                    $('<button/>').addClass('dx-button')
                        .text('Bid')
                        .on('dxclick',function(){
                            //$scope.accept_event(options.data.id);
                            $scope.event_bid(options.data.id);
                            //$location.path('/eventbid/' + options.data.id);
                        })
                        .appendTo(container);
				}


                }
            },


        ]
    };
    
    $scope.dataGridOptionsMy = {
        dataSource: $scope.eventMyInfo,
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
        onInitialized : function(e){
            $scope.datagridobjmy = e.component;
        },
        /*searchPanel: {
            visible: true,
            width: 240,
            placeholder: "Search..."
        },*/
        columns: ["title", 
        {caption:'Offer Start Date',dataField:"offer_from_date"},
        {caption:'Offer End Date',dataField:"offer_to_date"},
        "event_date","event_start_time","event_end_time","price","status",
            {
                caption:'Action',
                width: 200,
                alignment: 'center',
                cellTemplate: function (container, options) {
                    $('<button/>').addClass('dx-button')
                        .text('Detail')
                        .on('dxclick',function(){
                            $scope.event_detail(options.data.id);

                        })
                        .appendTo(container);
                }
            },


        ]
    };

    $scope.getEventList = function() {
        //$scope.edit_mode = false;
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getMerchantsRelatedEvents/"+$scope.loggedindetails.id,
        }).success(function (data) {
            $scope.eventInfo = data.data;
            //console.log($scope.voucherInfo);
            $scope.datagridobj.option('dataSource',$scope.eventInfo);
        });
    }
    $scope.getEventList();
    
    $scope.getMyEventList = function() {
        //$scope.edit_mode = false;
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getMyEvents/"+$scope.loggedindetails.id,
        }).success(function (data) {
            $scope.eventMyInfo = data.data;
            console.log($scope.eventMyInfo);
            $scope.datagridobjmy.option('dataSource',$scope.eventMyInfo);
        });
    }
    $scope.getMyEventList();

    $scope.event_detail = function(id) {
        $location.path('/eventdetail/' +id);
    }
    $scope.event_bid = function(id) {
        $location.path('/eventbid/' +id);
    }




















});
