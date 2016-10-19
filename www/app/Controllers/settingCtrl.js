app.controller('settingCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    $scope.voucherInfo;
    if(!$scope.loggedindetails){

        $location.path("/login");
    }


    $scope.checkBox = {
        checked: {
            value: true
        },
        unchecked: {
            value: false
        }

    };

    $scope.settingList = function(){

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getUserSettings/"+$scope.loggedindetails.id,
        }).success(function (data) {
                console.log(data.data);

            //$scope.settingList =data.getMenuPromo;
            if( data.data.media_notification == 0){
                $scope.media_notification = false;
                $scope.mediaCheck = 0;
            }else{
                $scope.media_notification = true;
                $scope.mediaCheck = 1;
            }
            if( data.data.notification_wa == 0){
                $scope.notification_wa = false;
            }else{
                $scope.notification_wa = true;
            }
            if( data.data.notification_email == 0){
                $scope.notification_email = false;
            }else{
                $scope.notification_email = true;
            }
            if( data.data.notification_sms == 0){
                $scope.notification_sms = false;
            }else{
                $scope.notification_sms = true;
            }

            if( data.data.expire_date_notification == 0){
                $scope.expire_date_notification = false;
                $scope.dayscheck = 0;
            }else{
                $scope.expire_date_notification = true;
                $scope.dayscheck = 1;
            }

            if( data.data.promo_notification == 0){
                $scope.promo_notification = false;
            }else{
                $scope.promo_notification = true;
            }

            if( data.data.news_letter_notification == 0){
                $scope.news_letter_notification = false;
            }else{
                $scope.news_letter_notification = true;
            }

            $scope.remainder_days = data.data.remainder_days;
            //$scope.media_notification = data.data.media_notification;
            //$scope.expire_date_notification = data.data.expire_date_notification;
            //$scope.promo_notification = data.data.promo_notification;
            //$scope.news_letter_notification = data.data.news_letter_notification;

            //console.log($scope.catInfo);

        });
        //$scope.icontext = localStorage.getItem('icontext');
        //console.log($scope.icontext);
    }
    $scope.settingList();



    $scope.valueChanged = function (e) {
        //console.log($scope.media_notification);
        if($scope.media_notification){
            $scope.mediaCheck = 1;
        }else{
            $scope.mediaCheck = 0;
        }

    };

    $scope.valueChangedDate = function (e) {
        console.log($scope.expire_date_notification);
        if($scope.expire_date_notification){
            $scope.dayscheck = 1;
        }else{
            $scope.dayscheck = 0;
        }
    };

    $scope.saveSetting = function(params) {
        //alert($scope.media_notification);
        //alert($scope.expire_date_notification);
        //alert($scope.promo_notification);
        $http({
            method: "PUT",
                url: $rootScope.serviceurl+"updateUserSettings/"+$scope.loggedindetails.id,
                data: {"media_notification":$scope.media_notification,"expire_date_notification":$scope.expire_date_notification,"user_id":$scope.loggedindetails.id,"promo_notification":$scope.promo_notification,"news_letter_notification":$scope.news_letter_notification,"notification_wa":$scope.notification_wa,"notification_email":$scope.notification_email,"notification_sms":$scope.notification_sms,"remainder_days":$scope.remainder_days},
                headers: {'Content-Type': 'application/json'},
            }).success(function(data) {
                console.log(data);
                //return false;
                //params.validationGroup.reset();
                if(data.type == 'success'){
                    //var message = data.message;
                    //params.validationGroup.reset();
                    $location.path('/setting');

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
    };

});