app.controller('purchasedmembrshipCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth, $timeout) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    $scope.voucherInfo;
    if(!$scope.loggedindetails){

        $location.path("/login");
    }
    $scope.img_uploader = null;
    $scope.all_promos = [];
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
            mode: "number"
        },restaurant:{
            dataSource: $scope.all_restaurant,
            displayExpr: "name",
            valueExpr: "value",
            onInitialized:function(e){
                $scope.res_select = e.component;
                $scope.getRestaurants();
            }
        },promos:{
            dataSource: $scope.all_promos,
            displayExpr: "name",
            valueExpr: "value",
            onInitialized:function(e){
                $scope.promo_select = e.component;
                $scope.getMembershipPromo();
            }
        }};


    $scope.changeView = function(){
        $scope.edit_mode = !$scope.edit_mode;
        $scope.menuInfo = {
            id:'',
            restaurant_id:'',
            promo_id:'',
            merchant_id:'',
            member_name:'',
            member_email:'',
            mobile_phone:'',
            address:''
        }
        //$scope.textBox.image.value = null;
        //$scope.img_uploader = ;

    }

    $scope.edit_menu = function(menu)
    {
        console.log(menu);
        $scope.edit_mode = !$scope.edit_mode;
        $scope.menuInfo = {
            id:menu.id,
            restaurant_id:menu.restaurant_id,
            promo_id:menu.promo_id,
            merchant_id:menu.merchant_id,
            member_name:menu.member_name,
            member_email:menu.member_email,
            mobile_phone:menu.mobile_phone,
            address:menu.address
        }
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
        columns: ["member_name", {caption:"PromoID",dataField:"promo_id"},
            {caption:"Date Of Purchase",dataField:"purchased_date"},
            {caption:"Expiry Date",dataField:"expiry_date"},
            {caption:"Merchant Id",dataField:"merchant_id"},
            {caption:"Member Id",dataField:"member_membership_id"},
            {
                caption:'Add',
                width: 100,
                alignment: 'center',
                cellTemplate: function (container, options) {
                    if(options.data.member_membership_id =='') {
                        $('<button/>').addClass('dx-button')
                            .text('ADD')
                            .on('dxclick', function () {
                                $scope.getMemberId(options.data);
                            })
                            .appendTo(container);
                    }
                }
            }
            /*{
                caption:'Delete',
                width: 100,
                alignment: 'center',
                cellTemplate: function (container, options) {
                    $('<button/>').addClass('dx-button')
                        .text('Delete')
                        .on('dxclick',function(){$scope.delete_menu(options.data); })
                        .appendTo(container);
                }
            },
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
            url: $rootScope.serviceurl + "getResturantByMerchant/"+$scope.loggedindetails.id,

        }).success(function (data) {
            $scope.all_restaurant = [];
            angular.forEach(data.restaurants,function(val){
                $scope.all_restaurant.push({name:val.title,value:val.id});
            })
            $scope.res_select.option({dataSource: $scope.all_restaurant});



        });

    }
    $scope.getRestaurants();

    $scope.getMembershipPromo = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getMerchantMembershipPromo/"+$scope.loggedindetails.id,

        }).success(function (data) {
            $scope.all_promos = [];
            angular.forEach(data.data,function(val){
                $scope.all_promos.push({name:val.title,value:val.id});
            })
            $scope.promo_select.option({dataSource: $scope.all_promos});
        });
    }
    $scope.getMembershipPromo();

    $scope.delete_menu = function(data)
    {
        if(confirm('Are you sure you want to delete this menu?'))
        {
            $http({
                method: "delete",
                url: $rootScope.serviceurl + "deleteMerchantMembership/" + data.id,
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
            url: $rootScope.serviceurl + "getPurchasedMerchantMembershipPromo/" + $scope.loggedindetails.id,
        }).success(function (data) {
            $scope.voucherInfo = data.data;
            console.log($scope.voucherInfo);
            //if($scope.datag)
                //$scope.datag.option({dataSource:$scope.voucherInfo});


            //$scope.refresh_grid();
            //$timeout(function(){
                //$scope.datag.refresh();
            //},3000)
            //$scope.listViewData.option({"dataSource": $scope.voucherInfo,showSelectionControls: true });
            //$scope.listViewData.option({"onItemClick":$scope.callMember});


        });
    }
    $scope.getMenus();

    $scope.callMember = function(data){
        $scope.getMemberId(data.itemData);
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
                url: $rootScope.serviceurl+"updateMerchantMembership",
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
                url: $rootScope.serviceurl+"addMerchantMembership",
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


    $scope.getMemberId = function(memdata){

        //console.log($scope.textBox.image.value,$scope.menuInfo);
        //console.log(memdata);


            //$scope.userdata = {"MerchantID":"M004","RestaurantID":"A0002","MemberName":"Jonathan","PromoID":"PRC001","PurchasedDate":"2016-06-07","EmailAddress":"abc@abc.com","Mobile":"012823432","Address":"L address"};
        $scope.userdata = {"MerchantID":memdata.merchant_id,"RestaurantID":memdata.restaurant_id,"MemberName":memdata.member_name,"PromoID":memdata.promo_id,"PurchasedDate":memdata.purchased_date_format,"EmailAddress":memdata.member_email,"Mobile":memdata.member_phone,"Address":memdata.member_address};
        //console.log($scope.userdata);
            $http({
                method: "POST",
                url: "http://52.39.33.188/MfoodgateMemberlinkService/Member/",
                data: $scope.userdata,
                headers: {'Content-Type': 'application/json'},
            }).success(function(data) {
                console.log(data);
                if(data.Status == 'Success'){
                    $scope.start_date = moment(data.MembershipStartDate).format("YYYY-MM-DD");
                    $scope.end_date = moment(data.MembershipExpiredDate).format("YYYY-MM-DD");
                    //console.log($scope.start_date);
                    //console.log($scope.end_date);
                    $scope.mapdata = {
                        "member_id": data.MerchantMemberID,
                        "offer_id": memdata.offer_id,
                        "voucher_id": memdata.voucher_id,
                        "user_id": memdata.member_id,
                        "email": memdata.member_email,
                        "name": memdata.member_name,
                        "membership_start_date": $scope.start_date,
                        "membership_end_date": $scope.end_date,
                        "is_active": 1,
                        "merchant_id": memdata.merchant_id
                    };
                    // console.log($scope.mapdata);
                    $http({
                        method: "POST",
                        url: $rootScope.serviceurl + "saveMembershipMemberMap",
                        data: $scope.mapdata,
                        headers: {'Content-Type': 'application/json'},
                    }).success(function (data) {
                        DevExpress.ui.notify({
                            message: "Added Successfilly",
                            position: {
                                my: "center top",
                                at: "center top"
                            }
                        }, "success", 3000);
                        $scope.getMenus();
                    });
                }
                else{

                    $scope.errorMsg = 'Added member fail';
                    DevExpress.ui.notify({
                        message: $scope.errorMsg,
                        position: {
                            my: "center top",
                            at: "center top"
                        }
                    }, "error", 3000);
                }
            });
    }

    //$scope.test_save();

    /*$scope.loadList=function(e)
    {
        $scope.listViewData= e.component;

    }*/


});
