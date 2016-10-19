app.controller('addswapvoucherCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    $scope.voucherInfo;
    if(!$scope.loggedindetails){

        $location.path("/login");
    }

    $scope.typeList = [];
    $scope.areaList = [];
    $scope.selectedLocation = [];
    $scope.selectedTypes = [];
    $scope.typeListMob = [];
    $scope.areaListMob = [];
    $scope.selectedLocationMob = [];
    $scope.selectedTypesMob = [];

    //$scope.selectedLocation=[];
    //$scope.selectedTypes =[];
    //$scope.selectedLocationMob = [];
    //$scope.selectedTypesMob = [];
    //$scope.typeDataMob.reset();
    //$scope.typeData.reset();
    //$scope.locationDataMob.reset();
    //$scope.locationData.reset();

    $scope.tagBoxData = new DevExpress.data.DataSource({ store: [], paginate: false });
    $scope.viewCategory = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getCategories",

        }).success(function (data) {


            $scope.allcat = data.category;
            $scope.typeData.option('items',$scope.allcat);
            $scope.setSelectedTypes();

            $scope.allcatMob = data.category;
            $scope.typeDataMob.option('items',$scope.allcatMob);
            $scope.setSelectedTypesMob();

            /*for (var i = 0; i < $scope.allcat.length; i++) {
             $scope.tagBoxData.store().insert($scope.allcat[i]);
             }
             $scope.tagBoxData.load();
             console.log($scope.tagBoxData._items);
             $scope.taglist = $scope.tagBoxData._items;*/



        });

    }

    $scope.viewCategory();

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

    $scope.setSelectedTypes = function(){
        $scope.selectedTypes =[];
        if($scope.allcat && $scope.event_info)
        {
            //console.log($scope.allLoc,$scope.userInfo.locations);

            angular.forEach($scope.allcat,function(all,key){
                angular.forEach($scope.event_info.categories,function(own){
                    if(all.id == own.category_id)
                    {
                        $scope.selectedTypes.push($scope.allcat[key]);
                    }
                })
            })
            $scope.typeList = $scope.selectedTypes;
            if($scope.typeData)
            {
                console.log(' types ========',$scope.selectedTypes);
                $scope.typeData.option('values',$scope.selectedTypes);
            }
            //console.log('hellooo',$scope.allLoc[0]);

        }
    }

    $scope.setSelectedTypesMob = function(){
        $scope.selectedTypesMob =[];
        if($scope.allcatMob && $scope.event_info)
        {
            //console.log($scope.allLoc,$scope.userInfo.locations);

            angular.forEach($scope.allcatMob,function(all,key){
                angular.forEach($scope.event_info.categories,function(own){
                    if(all.id == own.category_id)
                    {
                        $scope.selectedTypesMob.push($scope.allcat[key]);
                    }
                })
            })
            $scope.typeListMob = $scope.selectedTypesMob;
            /*if($scope.typeDataMob)
             {
             console.log(' types ========',$scope.selectedTypes);
             $scope.typeDataMob.option('values',$scope.selectedTypesMob);
             }*/
            //console.log('hellooo',$scope.allLoc[0]);

        }
    }


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
            $scope.areaListMob = $scope.selectedLocationMob;

        }
    }


    /*$scope.$watchCollection('selectedLocation',function(){
     if($scope.selectedLocation)
     //console.log('hellooo',$scope.allLoc[0]);
     $scope.locationData.option('values',$scope.selectedLocation);
     })*/



    //$scope.$watchCollection('selectedTypes',function(){
    //    if($scope.typeData)
    //    //console.log('hellooo',$scope.allLoc[0]);
    //        $scope.typeData.option('values',$scope.selectedTypes);
    //})

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

    $scope.inialType = function(e){
        //$scope.$apply(function() {
        $scope.typeData = e.component;
        //});


        //if($scope.allLoc[0])
        //$scope.locationData.option('values',$scope.allLoc[0]);
    }

    $scope.inialTypeMob = function(e){
        //$scope.$apply(function() {
        $scope.typeDataMob = e.component;
        //});


        //if($scope.allLoc[0])
        //$scope.locationData.option('values',$scope.allLoc[0]);
    }


    $scope.swapvoucherADD = function () {
        //$location.path('/giftvoucher/' + $stateParams.voucherId);
        //alert(offer_id);
        //return false;
       // $location.path('/addswapvoucher/' + $stateParams.voucherId + '/' + $stateParams.offerId);
        $scope.typedata = $scope.typeList;
        $scope.areadata = $scope.areaList;
        $scope.offering_start_date = moment($scope.offering_start_date).format("YYYY/MM/DD");
        $scope.offering_end_date = moment($scope.offering_end_date).format("YYYY/MM/DD");
        $http({
            method: "POST",
            url: $rootScope.serviceurl + "swap",
            data: {"offering_start_date":$scope.offering_start_date,"offering_end_date":$scope.offering_end_date,"typedata": $scope.typedata, "areadata": $scope.areadata,"voucher_id":$stateParams.voucherId,"user_id":$scope.loggedindetails.id,"offer_id":$stateParams.offerId,"description":$scope.description},
        }).success(function (data) {
            console.log(data);
            if(data.type == 'success'){
                //var message = data.message;
                //params.validationGroup.reset();
                $location.path('/allvoucher');

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




});
