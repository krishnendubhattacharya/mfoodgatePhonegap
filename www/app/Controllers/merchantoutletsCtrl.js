app.controller('merchantoutletsCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth, $timeout, NgMap) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    $scope.voucherInfo;
    if(!$scope.loggedindetails){

        $location.path("/login");
    }

    NgMap.getMap().then(function(map) {
        $scope.map = map;
    });
    $scope.event_info=null;
    $scope.areaList = [];
    $scope.areaListMob = [];
    $scope.selectedLocation = [];
    $scope.selectedLocationMob = [];

    $scope.placeChanged = function() {
        $scope.place = this.getPlace();
        $scope.menuInfo.lat=$scope.place.geometry.location.lat();
        $scope.menuInfo.lng=$scope.place.geometry.location.lng();
        console.log('Lat:'+$scope.menuInfo.lat+" Lng:"+$scope.menuInfo.lng);
        //$scope.map.setCenter($scope.place.geometry.location);
    }

    $scope.img_uploader = null;
    $scope.all_locations = [];
    $scope.all_restaurant = [];
    $scope.textBox = {image:  {
            buttonText: 'Select file',
            labelText: 'Drop file here',
            multiple: false,
            accept: 'image/*',
            uploadUrl: $rootScope.serviceurl + 'MerchantOutletFileUpload',
            onUploaded:function(ret){
                $scope.menuInfo.image = ret.file.value.name;
                console.log(ret.file.value,ret.file.value.name);
            },
            onInitialized : function(e)
            {
                $scope.img_uploader = e.component;
            }
    },
        price:{
            mode: "number"
        }/*,location:{
            dataSource: $scope.all_locations,
            displayExpr: "name",
            valueExpr: "value",
            onInitialized:function(e){
                $scope.loc_select = e.component;
                $scope.getLocations();
            }
        },restaurant:{
            dataSource: $scope.all_restaurant,
            displayExpr: "name",
            valueExpr: "value",
            onInitialized:function(e){
                $scope.res_select = e.component;
                $scope.getRestaurants();
            }
        }*/
    };


    $scope.changeView = function(){
        $scope.edit_mode = !$scope.edit_mode;
        $scope.menuInfo = {
            id:'',
            title:'',
            description:'',
            image:'',
            restaurant_id:'',
            address:'',
            business_hours:'',
            //location_id:'',
            is_active:false
        }
        $scope.selectedLocation=[];
        //$scope.selectedTypes =[];
        $scope.selectedLocationMob = [];
        $scope.locationData.reset();
        $scope.locationDataMob.reset();
        //$scope.selectedTypesMob = [];
        //$scope.textBox.image.value = null;
        //$scope.img_uploader = ;
        $scope.img_uploader.reset();

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
        columns: ["title","address", {
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
        },{caption:"Active",cellTemplate: function (container, options) {
            var text = options.data.is_active==1?'Yes':'No';
            $(container).html(text);
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



    $scope.getLocations = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getAllLocations",

        }).success(function (data) {
            $scope.all_locations = [];
            angular.forEach(data.locations,function(val){
                $scope.all_locations.push({name:val.city,value:val.id});
            })
            //$scope.loc_select.option({dataSource: $scope.all_locations});
            $scope.selectBox = {
                location:{
                    dataSource: $scope.all_locations,
                    displayExpr: "name",
                    valueExpr: "value",
                    onInitialized:function(e){
                        $scope.loc_select = e.component;
                    }
                }
            };



        });

    }
    $scope.getLocations();

    $scope.getRestaurants = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getActiveMerchantRestaurant/"+$scope.loggedindetails.id,

        }).success(function (data) {
            $scope.all_restaurant = [];
            angular.forEach(data.restaurants,function(val){
                $scope.all_restaurant.push({name:val.title,value:val.id});
            })
            //$scope.res_select.option({dataSource: $scope.all_restaurant});
            //$scope.res_select.option({dataSource: $scope.all_restaurant});
            //$scope.res_select1.option({dataSource: $scope.all_restaurant});
            console.log($scope.all_restaurant);
            $scope.selectBox = {
                restaurant:{
                    dataSource: $scope.all_restaurant,
                    displayExpr: "name",
                    valueExpr: "value",
                    onInitialized:function(e){
                        $scope.res_select = e.component;
                    }
                },
                restaurant1:{
                    dataSource: $scope.all_restaurant,
                    displayExpr: "name",
                    valueExpr: "value",
                    onInitialized:function(e){
                        $scope.res_select1 = e.component;
                    }
                }
            };



        });

    }
    $scope.getRestaurants();


    $scope.getOutlets = function() {
        //$scope.dataGridOptions = null;
        $scope.edit_mode = false;
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getMerchantsOutlet/" + $scope.loggedindetails.id,
        }).success(function (data) {
            $scope.voucherInfo = data.data;
            //console.log($scope.voucherInfo);
            //if($scope.datag)
            $scope.datag.option({dataSource:$scope.voucherInfo});

            //$scope.listViewData.option({"dataSource": $scope.voucherInfo,hoverStateEnabled: false });
            //$scope.refresh_grid();
            //$timeout(function(){
            //$scope.datag.refresh();
            //},3000)


        });
    }
    $scope.getOutlets();


    $scope.save_menu = function(){

        //console.log($scope.textBox.image.value,$scope.menuInfo);
        if($scope.menuInfo.id)
        {
            $scope.menuInfo.location_id = $scope.areaList;
            $http({
                method: "POST",
                url: $rootScope.serviceurl+"updateMerchantOutlet",
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
                    $scope.getOutlets();
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
            console.log($scope.menuInfo);
            $scope.menuInfo.user_id = $scope.loggedindetails.id;
            //$scope.areadata = $scope.areaList;
            $scope.menuInfo.location_id = $scope.areaList;
            $http({
                method: "POST",
                url: $rootScope.serviceurl+"addMerchantOutlet",
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
                    $scope.getOutlets();
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

    $scope.edit_menu = function(menu)
    {
        console.log(menu);
        $scope.edit_mode = !$scope.edit_mode;
        $scope.menuInfo = {
            id:menu.id,
            title:menu.title,
            description:menu.description,
            image:menu.image,
            imageurl:menu.imageurl,
            restaurant_id:menu.restaurant_id,
            address:menu.address,
            business_hours:menu.business_hours,
            //location_id:menu.location_id,
            outlet_id:menu.outlet_id,
            is_active:menu.is_active
        }
        $scope.event_info=menu;
        //$scope.setSelectedTypes();
        $scope.setSelectedLocation();
        //$scope.setSelectedTypesMob();
        $scope.setSelectedLocationMob();
        $scope.img_uploader.reset();
    }

    /*$scope.loadList=function(e)
    {
        console.log("loadList")
        $scope.listViewData= e.component;
    }*/

    $scope.delete_menu = function (data) {
        if(confirm("Are you sure you want to delete?"))
        {
            $http({
                method: "DELETE",
                url: $rootScope.serviceurl + "deleteMerchantOutlet/"+data.id,
            }).success(function (data) {
                $scope.getOutlets();
            });
        }
    }

    $scope.tagBoxDataLocation = new DevExpress.data.DataSource({ store: [], paginate: false });
    $scope.viewLocation = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getLocations",

        }).success(function (data) {


            $scope.allLoc = data.location;
            $scope.locationData.option('items',$scope.allLoc);
            $scope.setSelectedLocation();

            $scope.allLocMob = data.location;
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
                angular.forEach($scope.event_info.locations,function(own){
                    if(all.id == own.location_id)
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
                angular.forEach($scope.event_info.locations,function(own){
                    if(all.id == own.location_id)
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
        $scope.locationData = e.component;
        //if($scope.allLoc[0])
        //$scope.locationData.option('values',$scope.allLoc[0]);
    }

});
