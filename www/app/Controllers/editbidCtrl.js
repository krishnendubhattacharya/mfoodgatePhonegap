app.controller('editbidCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    $scope.voucherInfo;
    if(!$scope.loggedindetails){

        $location.path("/login");
    }









    $scope.bidEdit = function () {
        //$location.path('/resaleCancel/' + voucher_resale_id);
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getDetailsVoucherBid/"+$stateParams.bidId,
            //data: {"id":voucher_resale_id},
        }).success(function (data) {
            //$scope.voucherInfo =data.bid_details;
            //console.log($scope.voucherInfo);
            $scope.item = data.bid_details;
            //$location.path('/editbid/'+bid_id);




        });
    }

    $scope.bidEdit();



    $scope.saveEditBid = function(params) {

        //alert(1);
        console.log(params);
        //alert($scope.price);
        //alert($scope.points);
        //alert($stateParams.voucherId);
        //alert($scope.loggedindetails.id);
        //var result = params.validationGroup.validate();
        // if(result.isValid) {
        $http({
            method: "POST",
            url: $rootScope.serviceurl+"updateVoucherBid",
            data: {"bid_price":$scope.item.bid_price,"m_points":$scope.item.m_points,"id":$stateParams.bidId,"userid":$scope.loggedindetails.id},
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            console.log(data);
            //return false;
            //params.validationGroup.reset();
            if(data.type == 'success'){
                //var message = data.message;
                //params.validationGroup.reset();
                $location.path('/bidvoucher');

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

        })

        //form.submit();
        //params.validationGroup.reset();
        //}
    };

    $scope.getResellVoucherDetails = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl+"getResellVoucherDetail/"+$stateParams.sellId,
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            /*var vouchers = []
             angular.forEach(data,function(val){
             vouchers.push({name:val.title,value:val.voucher_id});
             })
             $scope.voucher_sel.option({dataSource:vouchers});*/
            $scope.reselldetail = data.resale_details[0];
            console.log($scope.reselldetail);
        })
    }
    $scope.getResellVoucherDetails();




});