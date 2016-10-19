'use strict';
/**
 * controllers used for the login
 */
app.controller('promomasterlistCtrl', function ($rootScope, $scope, $http, $location, myAuth, NgMap, $cookieStore,$timeout,$stateParams) {
    $stateParams.resturantId = 1;

    $scope.timePickerOptions = {
        step: 15,
        timeFormat: 'g:i',
        show2400:true
    };

    $scope.weekdays = [{id:0,label:'Sunday'},
        {id:1,label:'Monday'},
        {id:2,label:'Tuesday'},
        {id:3,label:'Wednesday'},
        {id:4,label:'Thursday'},
        {id:5,label:'Friday'},
        {id:6,label:'Saturday'}];

    $scope.placeChanged = function() {
        $scope.place = this.getPlace();
        $scope.item.lat=$scope.place.geometry.location.lat();
        $scope.item.lng=$scope.place.geometry.location.lng();
        console.log('Lat:'+$scope.item.lat+" Lng:"+$scope.item.lng);
        //$scope.map.setCenter($scope.place.geometry.location);
    }
    NgMap.getMap().then(function(map) {
        $scope.map = map;
    });
    $scope.datepickerOptions = {format: 'yyyy-mm-dd',
        language: 'en',
        autoclose: true,
        weekStart: 0}
    $scope.viewPromo = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getAllOffers",
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {

            $scope.allpromo = data.data;
            $timeout(function(){

                $scope.table=  angular.element('#promosList').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "searching": true,
                    "ordering": true,
                    "info": true,
                    "autoWidth": false
                });
            }, 3000, false);
            //console.log($scope.allcat);


        });
        $scope.promoView='view';
    }

    $scope.pointmasterlist = [];
    $scope.getPoints = function($id){
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getActivePointMasterByMerchant/" + $id,
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            if(data.data)
            {
                $scope.pointmasterlist = data.data;
            }
        })
    }
    $scope.mfoodpointmasterlist = [];
    $scope.getmfoodPoints = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getActivePointMasterByMerchant/1",
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            if(data.data)
            {
                $scope.pointmasterlist = data.data;
            }
        })
    }
    $scope.getmfoodPoints();

    $scope.getOutlet = function(res_id){
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getOutletsByRestaurant/"+res_id,
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            if(angular.isObject(data))
            {
               console.log(data.data);
                $scope.outletList=data.data;
                $scope.allOutlet = [];
                angular.forEach($scope.outletList,function(value){
                    $scope.allOutlet.push({id:value.id,label:value.title})
                })
            }
        });

    }
    $scope.getRestaurent = function(mer_id){
        $scope.getPoints(mer_id);
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getResturantByMerchant/"+mer_id,
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            if(angular.isObject(data))
            {
                //console.log(data.data);
                $scope.restaurants = data.restaurants;
                $scope.allRestaurent = [];
                angular.forEach($scope.restaurants,function(value){
                    $scope.allRestaurent.push({id:value.id,label:value.title})
                })
            }
        });

    }

    $scope.getCategories = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "categories",
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            if(angular.isObject(data))
            {
                $scope.categoryList=data.category;
                $scope.allCat = [];
                angular.forEach($scope.categoryList,function(value){
                    $scope.allCat.push({id:value.id,label:value.name})
                })
            }
        });

    }
    $scope.yourEvents = {
        onItemSelect: function(item) {
            //console.log(item);
            console.log($scope.item.restaurant_id);
            $http({
                method: "POST",
                data: $scope.item,
                url: $rootScope.serviceurl + "getOutletsBySelectedRestaurant",
                //data: {"email":$scope.email,"password":$scope.password},
                //headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                if(angular.isObject(data))
                {
                    console.log(data.data);
                    $scope.outletList=data.data;
                    $scope.allOutlet = [];
                    angular.forEach($scope.outletList,function(value){
                        $scope.allOutlet.push({id:value.id,label:value.title})
                    })
                }
            });
        },
        onItemDeselect: function(item) {
            //console.log(item);
            //console.log($scope.item.restaurant_id);
            $http({
                method: "POST",
                data: $scope.item,
                url: $rootScope.serviceurl + "getOutletsBySelectedRestaurant",
                //data: {"email":$scope.email,"password":$scope.password},
                //headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                if(angular.isObject(data))
                {
                    console.log(data.data);
                    $scope.outletList=data.data;
                    $scope.allOutlet = [];
                    angular.forEach($scope.outletList,function(value){
                        $scope.allOutlet.push({id:value.id,label:value.title})
                    })
                }
            });
        }
    };
    $scope.getOfferType = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getAllActiveOfferType",
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            console.log(data);
            if(angular.isObject(data))
            {
                $scope.offerTypeList=data.data;
            }
        });

    }




    $scope.viewPromo();

    $scope.editPromo = function (params) {

        setTimeout(function () {
            $scope.$apply(function () {
                $scope.item = params;
            });
        }, 2000);


        //console.log(params);$scope.item = params;
        //setTimeout(function(){$scope.item = params},1000);
        $scope.promoView='edit';
    }


    $scope.addPromo = function () {
        //alert(13);
        $scope.item={
            "outlet_id":[],
            visible_id:'',
            "title": '',
            special_tag:'',
            "description": '',
            "benefits": '',
            "quantity":'',
            "mpoints":'',
            "mpoints_given":'',
            "price": '',
            "offer_price": '',
            "offer_percent": '',
            "offer_from_date": moment().format("YYYY-MM-DD"),
            "offer_to_date": '',
            "image": '',
            "offer_type_id": '',
            "category_id":[],
            "id": '',
            "is_featured":0,
            "is_special":0,
            "is_active":0,
            "restaurant_id":[],
            "merchant_id":'',
            "point_master_id":'',
            "conditions":'',
            "given_point_master_id":'',
            "direct_redeem":0,
            "posting_type":'P',
            "start_date_type":'F',
            "valid_days":'',
            "weekdays":[],
            "including_holidays":0,
            "item_start_hour":new Date(),
            "item_end_hour":new Date(),
            "item_start_date":moment().format("YYYY-MM-DD"),
            "item_expire_date":'',
            "max_purchased":''
        };//console.log($scope.item);
        /*$scope.example1model = [];
         $scope.example1data = [
         {id: 1, label: "David"},
         {id: 2, label: "Jhon"},
         {id: 3, label: "Danny"}];*/

        $scope.promoView='edit';
    }

    $scope.cancelPromo = function () {
        $scope.viewPromo();
    }
    $scope.savePromo = function () {
        console.log($scope.item);
        //return false;

        if(angular.isObject($scope.item.outlet_id))
        {
            if($scope.item.id == '') {
                $http({
                    method: "POST",
                    url: $rootScope.serviceurl + "addNewOffer",
                    data: $scope.item,
                    headers: {'Content-Type': 'application/json'},
                }).success(function (data) {
                    console.log(data);
                    $scope.viewPromo();
                    $scope.item={};
                    //$scope.allcat = data.category;
                    //console.log($scope.allcat);
                });
            }else{
                $http({
                    method: "PUT",
                    url: $rootScope.serviceurl + "updatePromo/"+$scope.item.id,
                    data: {"city": $scope.item.city, "country_id": $scope.item.country_id,"is_active": $scope.item.is_active},
                    headers: {'Content-Type': 'application/json'},
                }).success(function (data) {
                    console.log(data);
                    $scope.viewPromo();
                    $scope.item={};
                    //$scope.allcat = data.category;
                    //console.log($scope.allcat);
                });
            }
        }else{
            alert('Please select an Outlet First');
        }


    }
    $scope.deletePromo = function (c_id) {
        //alert(c_id);
        if ( window.confirm("Want to delete?") ) {
            $http({
                method: "DELETE",
                url: $rootScope.serviceurl + "deletePromo/"+c_id,
                //data: {"name": $scope.item.name,"is_active": $scope.item.is_active},
                //headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                $scope.viewPromo();
                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }else{

        }

    }

    $scope.getActiveRestaurants = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getActiveRestaurants",
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            if(data.type == 'success')
            {
                $scope.restaurants = data.restaurants;
                //$scope.outletList=data.data;
                //console.log($scope.restaurants);
                $scope.allRestaurent = [];
                angular.forEach($scope.restaurants,function(value){
                    $scope.allRestaurent.push({id:value.id,label:value.title})
                })
                //console.log($scope.allRestaurent);
            }
        });
    }
    //$scope.getActiveRestaurants();
    $scope.getMerchant = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getAllMerchants",
            //data: {"email":$scope.email,"password":$scope.password},
            //headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            if(angular.isObject(data))
            {
                $scope.merchantList=data;
            }
        });
    }
    $scope.getMerchant();

    $scope.getOfferPrice = function(){
        if($scope.item.price && $scope.item.offer_percent)
        {
            $scope.item.offer_price = $scope.item.price - ($scope.item.price*$scope.item.offer_percent/100);
        }
    }


    $scope.$watch('item.item_start_date',function(){
        $scope.calculate_expire_date();
    })



    $scope.calculate_expire_date = function(){
        if($scope.item && $scope.item.start_date_type=='F' && $scope.item.item_start_date && $scope.item.valid_days)
        {
            console.log($scope.item.item_start_date,$scope.item.valid_days);
            //$scope.startdttime = $scope.item.item_start_date + " " + moment($scope.item.offer_from_time).format("H:m:s");
            console.log(moment($scope.item_start_date, "YYYY-MM-DD").add($scope.item.valid_days, 'days'));
            $scope.item.item_expire_date = moment($scope.item.item_start_date, "YYYY-MM-DD").add($scope.item.valid_days, 'days').format("YYYY-MM-DD");
            console.log($scope.item.item_expire_date);
            //$scope.item.offer_to_time = moment($scope.startdttime, "YYYY-MM-DD H:m:s").add($scope.item.valid_days, 'days').toDate();
        }
    }


    //$scope.getLoginDetails();



});

