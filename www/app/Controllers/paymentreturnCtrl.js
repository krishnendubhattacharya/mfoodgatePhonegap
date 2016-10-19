'use strict'; 
/** 
  * controllers used for the open request
*/
app.controller('paymentreturnCtrl', function ($rootScope, $scope, $http, $location,myAuth,$stateParams,$cookieStore,$timeout) {
   //console.log('Token =========== ', $stateParams.token);
   $scope.token = $stateParams.token;
    $scope.loggedindetails = myAuth.getUserNavlinks();
    console.log($stateParams);
    if($stateParams.success=='true')
    {

        $http({
            method: "POST",
            url: $rootScope.serviceurl + "success_payment",
            data: 'payment_id=' + $stateParams.paymentId,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
            //$cookieStore.remove('cart');
            localStorage.setItem('cart', null);
            $http({
                method: "DELETE",
                url: $rootScope.serviceurl+"deleteCartByUser/"+$scope.loggedindetails.id,
                headers: {'Content-Type': 'application/json'}
            }).success(function(data) {

            })
            $timeout(function(){
                $scope.onlyPrice = localStorage.getItem('onlyPrice');
                //alert($scope.onlyPrice);
                localStorage.setItem('onlyPrice', null);
                //localStorage.setItem('onlyPrice', $scope.isOnlyPrice);
                //alert($scope.onlyPrice);
                if($scope.onlyPrice == 1){
                    var message = "Payment successfull.";

                    DevExpress.ui.notify({
                        message: message,
                        position: {
                            my: "center top",
                            at: "center top"
                        }
                    }, "success", 3000);
                }else{
                    var message = "Purchase and Redeem Points success and your points have been deducted.";
                    DevExpress.ui.notify({
                        message: message,
                        position: {
                            my: "center top",
                            at: "center top"
                        }
                    }, "success", 3000);
                }

            $location.path('/');
            $location.search('success', null);
            $location.search('token', null);
            $location.search('paymentId', null);
            $location.search('PayerID',null);
            },3000);
        })
    }
    else {

        $location.search('success', null);
        $location.search('token', null);
        //$stateParams= null;
        $timeout(function(){
            var message = "Payment failed. Please try again later.";
            DevExpress.ui.notify({
                message: message,
                position: {
                    my: "center top",
                    at: "center top"
                }
            }, "error", 3000);
            $location.path('/');
        },3000);



    }

    
    /*if($stateParams.PayerID)
    {
        $scope.getPaymentDetails();
    }
    else
    {
        $location.search({});
        $location.path('/frontend/payment_cancel');
    }*/
});


