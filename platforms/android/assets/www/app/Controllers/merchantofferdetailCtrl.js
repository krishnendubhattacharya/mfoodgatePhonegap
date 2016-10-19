app.controller('merchantofferdetailCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth,$upload) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    $scope.voucherInfo;
    if(!$scope.loggedindetails){

        $location.path("/login");
    }
    //console.log($stateParams.offerId);
    $scope.voucherInfo = null;

    $scope.getOfferDetail = function () {
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "offerdetail/"+$stateParams.offerId,
        }).success(function (data) {
            console.log(data);
            $scope.voucherInfo =data;
            //console.log(data.offer_image[0].image);
            $scope.offerImagePath = data.offer_image[0].image;
        });

    }
    $scope.getOfferDetail();



    $scope.uploadResult = [];
    $scope.onFileSelect = function($files) {
        //$files: an array of files selected, each file has name, size, and type.
        // for (var i = 0; i < $files.length; i++) {
        var $file = $files;
        //console.log($file);
        $upload.upload({
            url: $rootScope.serviceurl + "offerImageUpload",
            file: $file,
            data:{"offer_id":$stateParams.offerId},
            method: "POST",
            progress: function(e){}
        }).then(function(response) {
            // file is uploaded successfully
            //console.log($file);
            console.log(response);
            $scope.offerImagePath = response.data.offer_image_details;
            console.log($scope.offerImagePath);

            //$scope.uploadResult.push(response.data);
            //console.log($scope.uploadResult);


        });
        //}
    }






});