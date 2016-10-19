app.controller('merchantnewsCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth, $timeout) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    $scope.voucherInfo;
    if(!$scope.loggedindetails){

        $location.path("/login");
    }
    $scope.img_uploader = null;
    $scope.event_info=null;
    $scope.restaurants = [];
    $scope.restaurant_ids = [];
    $scope.areaList = [];
    $scope.areaListMob = [];
    $scope.selectedLocation = [];
    $scope.selectedLocationMob = [];
    $scope.textBox = {image:  {
            buttonText: 'Select file',
            labelText: 'Drop file here',
            multiple: false,
            accept: 'image/*',
            uploadUrl: $rootScope.serviceurl + 'newsFileUpload',
            onUploaded:function(ret){
                $scope.menuInfo.image = ret.file.value.name;
                console.log(ret.file.value,ret.file.value.name);
            },
            onInitialized : function(e)
            {
                $scope.img_uploader = e.component;
            }
        }/*,restaurant:{
        dataSource:$scope.restaurants,
            displayExpr: "title",
            valueExpr: "id",
            onInitialized : function(e)
            {
                $scope.res_selecter = e.component;
                $scope.getRestaurant();
            },bindingOptions: {
            //valueExpr: 'id',
            values: {
                dataPath: 'restaurant_ids'
            }
        }
        },
        restaurant1:{
            dataSource:$scope.restaurants,
            displayExpr: "title",
            valueExpr: "id",
            onInitialized : function(e)
            {
                $scope.res_selecter1 = e.component;
                $scope.getRestaurant();
            },bindingOptions: {
                //valueExpr: 'id',
                values: {

                    dataPath: 'restaurant_ids'
                }
            }
        }*/
    };


    $scope.getRestaurant = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getActiveMerchantRestaurant/" + $scope.loggedindetails.id,
        }).success(function (data) {
           if(data.restaurants)
           {
               $scope.res_selecter.option({dataSource:data.restaurants});
               $scope.res_selecter1.option({dataSource:data.restaurants});
           }
            //$scope.edit_mode = !$scope.edit_mode;

        })
    }
    $scope.changeView = function(){
        $scope.event_info=null;
        $scope.selectedLocation=[];
        //$scope.selectedTypes =[];
        $scope.selectedLocationMob = [];
        $scope.locationData.reset();
        $scope.locationDataMob.reset();
        /*if($scope.locationData)
            $scope.locationData.option('items',null);

        if($scope.locationDataMob)
            $scope.locationDataMob.option('items',null);*/
        $scope.edit_mode = !$scope.edit_mode;
        $scope.menuInfo = {
            id:'',
            title:'',
            description:'',
            published_date:'',
            featured_event:false,
            special_event:false,
            post_to_public:false,
            is_active:false,
        }

        //alert(12);
        //$scope.textBox.image.value = null;
        //$scope.img_uploader = ;


        //$scope.selectedLocation=[];
        //$scope.selectedTypes =[];
        //$scope.selectedLocationMob = [];
        $scope.img_uploader.reset();
        //$scope.res_selecter.reset();
        //$scope.res_selecter1.reset();

    }

    $scope.edit_menu = function(menu)
    {
        console.log(menu);
        $scope.edit_mode = !$scope.edit_mode;
        $scope.menuInfo = {
            id:menu.id,
            title:menu.title,
            description:menu.description,
            published_date:menu.published_date,
            featured_event:menu.featured_event==1?true:false,
            special_event:menu.special_event==1?true:false,
            post_to_public:menu.post_to_public==1?true:false,
            image:menu.image,
            imageurl:menu.imageurl
        }
        $scope.event_info=menu;
        //$scope.setSelectedTypes();
        $scope.setSelectedLocation();
        //$scope.setSelectedTypesMob();
        $scope.setSelectedLocationMob();
        $scope.img_uploader.reset();
        //$scope.res_selecter.reset();
        //$scope.res_selecter1.reset();
        //$scope.restaurant_ids = menu.restaurants_ids;
    }
    $scope.voucherInfo = null;
    $scope.datag = null;

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
        onInitialized : function(e){
            console.log('By Bikash  --  ',e);
            $scope.datag = e.component;
        },
        searchPanel: {
            visible: true,
            width: 240,
            placeholder: "Search..."
        },
        columns: [ "title", {
            caption:'Image',
            cellTemplate: function (container, options) {
                if(options.data.image) {
                    $('<img />')
                        .height('auto')
                        .width('100%')
                        .attr('src', options.data.imageurl)
                        .appendTo(container);
                }
            }
        },{caption:"status",cellTemplate:function(container, options){
            var f=options.data.is_active==1?'Yes':'No';
            $(container).text(f);
        }},
            {caption:"Featured",cellTemplate:function(container, options){
                var f=options.data.featured_event==1?'Yes':'No';
                $(container).text(f);
            }},
            {
                caption:'Edit',
                width: 100,
                alignment: 'center',
                cellTemplate: function (container, options) {
                    $('<button/>').addClass('dx-button')
                        .text('Edit')
                        .on('dxclick',function(){$scope.edit_menu(options.data); })
                        .appendTo(container);
                }
            },
            {
                caption:'Delete',
                width: 100,
                alignment: 'center',
                cellTemplate: function (container, options) {
                    $('<button/>').addClass('dx-button')
                        .text('Delete')
                        .on('dxclick',function(){$scope.delete_menu(options.data); })
                        .appendTo(container);
                }
            }/*,
             {
             width: 100,
             alignment: 'center',
             cellTemplate: function (container, options) {
             $('<button/>').addClass('dx-button')
             .text('ReSell')
             .on('dxclick', function () {
             //Do something with options.data;
             $location.path('/vouchersell/' + options.data.id);
             ghghgh(options.data.id);
             })
             .appendTo(container);

             }
             }*/

        ]
    };

    $scope.delete_menu = function(data)
    {
        if(confirm('Are you sure you want to delete this news?'))
        {
            $http({
                method: "delete",
                url: $rootScope.serviceurl + "deleteNews/" + data.id,
            }).success(function (data) {
                DevExpress.ui.notify({
                    message: "Deleted Successfilly",
                    position: {
                        my: "center top",
                        at: "center top"
                    }
                }, "success", 3000);
                //$scope.edit_mode = !$scope.edit_mode;
                $scope.getMenus();
            })
        }
    }

    $scope.getMenus = function() {
        //$scope.dataGridOptions = null;
        $scope.edit_mode = false;
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getNewsByMerchant/" + $scope.loggedindetails.id,
        }).success(function (data) {
            $scope.voucherInfo = data.data;
            //console.log($scope.voucherInfo);
            //if($scope.datag)
                //$scope.datag.option({dataSource:$scope.voucherInfo});


            //$scope.refresh_grid();
            //$timeout(function(){
                //$scope.datag.refresh();
            //},3000)


        });
    }
    $scope.getMenus();



   $scope.$watchCollection('voucherInfo', function() {
        //var dataGrid = angular.element('#gridContainer').dxDataGrid('instance');
        //console.log($scope.voucherInfo);
        //if(dataGrid)
            //dataGrid.option({dataSource:$scope.voucherInfo});
       //console.log('1st');
       if($scope.datag) {
           $scope.datag.option({dataSource:$scope.voucherInfo});
           //console.log('2nd');
       }
    });

    $scope.save_menu = function(){

        //console.log($scope.textBox.image.value,$scope.menuInfo);
        $scope.menuInfo.restaurants_ids = $scope.areaList;
        $scope.menuInfo.published_date = moment($scope.menuInfo.published_date).format("YYYY/MM/DD");
        console.log($scope.menuInfo);
        if($scope.menuInfo.id)
        {
            $http({
                method: "POST",
                url: $rootScope.serviceurl+"updateMerchantNews",
                data: $scope.menuInfo,
                headers: {'Content-Type': 'application/json'},
            }).success(function(data) {
                //console.log(data);
                if(data.type == 'success'){
                    var message = data.message;
                    //params.validationGroup.reset();
                    //$location.path('/login');
                    //$scope.getUserInfo();
                    //$location.path('/merchantoffer');
                    DevExpress.ui.notify({
                        message: "Updated Successfilly",
                        position: {
                            my: "center top",
                            at: "center top"
                        }
                    }, "success", 3000);
                    $scope.edit_mode = !$scope.edit_mode;
                    $scope.getMenus();
                }else{
                    var message = "Error occured.";
                    DevExpress.ui.notify({
                        message: message,
                        position: {
                            my: "center top",
                            at: "center top"
                        }
                    }, "error", 3000);
                }
            })
        }
        else
        {
            $scope.menuInfo.user_id = $scope.loggedindetails.id;
            $http({
                method: "POST",
                url: $rootScope.serviceurl+"addMerchantNews",
                data: $scope.menuInfo,
                headers: {'Content-Type': 'application/json'},
            }).success(function(data) {
                //console.log(data);
                if(data.type == 'success'){
                    var message = data.message;
                    //params.validationGroup.reset();
                    //$location.path('/login');
                    //$scope.getUserInfo();
                    //$location.path('/merchantoffer');
                    DevExpress.ui.notify({
                        message: "Added Successfilly",
                        position: {
                            my: "center top",
                            at: "center top"
                        }
                    }, "success", 3000);
                    $scope.edit_mode = !$scope.edit_mode;
                    $scope.getMenus();
                }else{
                    var message = "Error occured.";
                    DevExpress.ui.notify({
                        message: message,
                        position: {
                            my: "center top",
                            at: "center top"
                        }
                    }, "error", 3000);
                }
            })
        }
    }

    $scope.tagBoxDataLocation = new DevExpress.data.DataSource({ store: [], paginate: false });
    $scope.viewLocation = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getActiveMerchantRestaurant/" + $scope.loggedindetails.id,

        }).success(function (data) {


            $scope.allLoc = data.restaurants;
            $scope.locationData.option('items',$scope.allLoc);
            $scope.setSelectedLocation();

            $scope.allLocMob = data.restaurants;
            $scope.locationDataMob.option('items',$scope.allLocMob);
            $scope.setSelectedLocationMob();

            /*for (var i = 0; i < $scope.allLoc.length; i++) {
             $scope.tagBoxDataLocation.store().insert($scope.allLoc[i]);
             }
             $scope.tagBoxDataLocation.load();*/
            //console.log($scope.tagBoxData._items);
            //$scope.taglist = $scope.tagBoxData._items;



        });

    }

    $scope.viewLocation();

    $scope.setSelectedLocation = function(){
        $scope.selectedLocation=[];
        if($scope.allLoc && $scope.event_info)
        {
            //console.log($scope.allLoc,$scope.userInfo.locations);

            angular.forEach($scope.allLoc,function(all,key){
                angular.forEach($scope.event_info.restaurants_ids,function(own){
                    //alert(own);
                    if(all.id == own)
                    {
                        $scope.selectedLocation.push($scope.allLoc[key]);
                    }
                })
            })
            $scope.areaList = $scope.selectedLocation;

        }
    }

    $scope.setSelectedLocationMob = function(){
        $scope.selectedLocationMob=[];
        if($scope.allLocMob && $scope.event_info)
        {
            //console.log($scope.allLoc,$scope.userInfo.locations);

            angular.forEach($scope.allLocMob,function(all,key){
                angular.forEach($scope.event_info.restaurants_ids,function(own){
                    if(all.id == own)
                    {
                        $scope.selectedLocationMob.push($scope.allLocMob[key]);
                    }
                })
            })
            $scope.areaList = $scope.selectedLocationMob;

        }
    }

    $scope.inialLocMob = function(e){
        $scope.locationDataMob = e.component;
        //if($scope.allLoc[0])
        //$scope.locationData.option('values',$scope.allLoc[0]);
    }


    $scope.inialLoc = function(e){
        //alert(11);
        $scope.locationData = e.component;

        //if($scope.allLoc[0])
        //$scope.locationData.option('values',$scope.allLoc[0]);
    }



});
