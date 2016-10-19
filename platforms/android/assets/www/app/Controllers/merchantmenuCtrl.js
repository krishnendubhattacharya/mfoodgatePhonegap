app.controller('merchantmenuCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth, $timeout) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    $scope.voucherInfo;
    if(!$scope.loggedindetails){

        $location.path("/login");
    }
    $scope.options = {
    height: 300,
    focus: true,
    airMode: true,
    toolbar: [
            ['edit',['undo','redo']],
            ['headline', ['style']],
            ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
            ['fontface', ['fontname']],
            ['textsize', ['fontsize']],
            ['fontclr', ['color']],
            ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
            ['height', ['height']],
            ['table', ['table']],
            ['insert', ['link','picture','video','hr']],
            ['view', ['fullscreen', 'codeview']],
            ['help', ['help']]
        ]
  };
    $scope.img_uploader = null;
    $scope.all_restaurant = [];
    $scope.textBox = {image:  {
            buttonText: 'Select file',
            labelText: 'Drop file here',
            multiple: false,
            accept: 'image/*',
            uploadUrl: $rootScope.serviceurl + 'menuFileUpload',
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
            mode: "text"
        },restaurant:{
            dataSource: $scope.all_restaurant,
            displayExpr: "name",
            valueExpr: "value",
            onInitialized:function(e){
                console.log(e);
                $scope.res_select = e.component;
                $scope.getRestaurants();
            }
        },category:{
            dataSource: $scope.all_categories,
            displayExpr: "name",
            valueExpr: "value",
            onInitialized:function(e){
                $scope.cat_select = e.component;
                $scope.getCategories();
            }
        },restaurant1:{
            dataSource: $scope.all_restaurant,
            displayExpr: "name",
            valueExpr: "value",
            onInitialized:function(e){
                console.log(e);
                $scope.res_select1 = e.component;
                $scope.getRestaurants();
            }
        },category1:{
            dataSource: $scope.all_categories,
            displayExpr: "name",
            valueExpr: "value",
            onInitialized:function(e){
                $scope.cat_select1 = e.component;
                $scope.getCategories();
            }
        }};


    $scope.changeView = function(){
        $scope.edit_mode = !$scope.edit_mode;
        $scope.menuInfo = {
            id:'',
            title:'',
            merchantrestaurant_id:'',
            menucategory_id:'',
            description:'',
            price:'',
            is_featured:false,
            status:false
        }
        //$scope.textBox.image.value = null;
        //$scope.img_uploader = ;
        $scope.img_uploader.reset();
        $scope.cat_select.reset();

    }

    $scope.edit_menu = function(menu)
    {
        $scope.cat_select.reset();
        console.log(menu);
        $scope.edit_mode = !$scope.edit_mode;
        $scope.menuInfo = {
            id:menu.id,
            title:menu.title,
            description:menu.description,
            merchantrestaurant_id:menu.merchantrestaurant_id,
            menucategory_id:menu.menucategory_id,
            price:menu.price,
            status:menu.status=="Active"?true:false,
            is_featured:menu.is_featured=="Yes"?true:false,
            imageurl:menu.imageurl
        }
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
        columns: [{caption:'No',dataField:"sl"},{caption:'Restaurant Name',dataField:"restaurant"}, "title",
         {caption:'price',dataField:"formatprice"},
         {
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
        },"status",{caption:"Featured",dataField:"is_featured"},
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

    $scope.getRestaurants = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getActiveMerchantRestaurant/"+$scope.loggedindetails.id,

        }).success(function (data) {
            $scope.all_restaurant = [];
            angular.forEach(data.restaurants,function(val){
                $scope.all_restaurant.push({name:val.title,value:val.id});
            })
            $scope.res_select.option({dataSource: $scope.all_restaurant});
            $scope.res_select1.option({dataSource: $scope.all_restaurant});



        });

    }
    $scope.getRestaurants();

    $scope.getCategories = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getMerchantMenuCategory/"+$scope.loggedindetails.id,

        }).success(function (data) {
            $scope.all_categories = [];
            angular.forEach(data.data,function(val){
                $scope.all_categories.push({name:val.name,value:val.id});
            })
            $scope.cat_select.option({dataSource: $scope.all_categories});
            $scope.cat_select1.option({dataSource: $scope.all_categories});



        });
    }

    $scope.delete_menu = function(data)
    {
        if(confirm('Are you sure you want to delete this menu?'))
        {
            $http({
                method: "delete",
                url: $rootScope.serviceurl + "deleteMenu/" + data.id,
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
            url: $rootScope.serviceurl + "getMenuByUser/" + $scope.loggedindetails.id,
        }).success(function (data) {
            $scope.voucherInfo = data.data;
            console.log($scope.voucherInfo);
            //if($scope.datag)
                //$scope.datag.option({dataSource:$scope.voucherInfo});


            //$scope.refresh_grid();
            //$timeout(function(){
                //$scope.datag.refresh();
            //},3000)
            $scope.listViewData.option({"dataSource": $scope.voucherInfo,showSelectionControls: true });
            $scope.listViewData.option({"onItemClick":$scope.checkClick});


        });
    }
    $scope.getMenus();

    $scope.checkClick = function(a,b){
        console.log(a);
        console.log(b);
    }

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
        if($scope.menuInfo.id)
        {
            $http({
                method: "POST",
                url: $rootScope.serviceurl+"updateMenu",
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
                url: $rootScope.serviceurl+"addMenu",
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

    $scope.deleteImage = function(){
        $scope.menuInfo.image = '';
        $scope.save_menu();
    }

    $scope.loadList=function(e)
    {
        $scope.listViewData= e.component;

    }

});
