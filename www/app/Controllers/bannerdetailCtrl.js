app.controller('bannerdetailCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {
    /*$scope.pageName = $stateParams.pageName;

    if($scope.pageName=='contact-us')
    {
        NgMap.getMap().then(function(map) {
            console.log(map.getCenter());
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
        });
    }
    $scope.pagedetails = []
    $scope.getPageDetails = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl+"getContent/" + $scope.pageName,
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            if(data.content) {
                $scope.pagedetails = data.content;
            }
        })
    }
    $scope.getPageDetails();*/

    $scope.currentPage = 1;

    $scope.pageSize = 5;

    $scope.currentPagee = 1;

    $scope.pageSizee = 5;
    $scope.currentPageee = 1;

    $scope.pageSizeee = 5;
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();

    $scope.topTab = 1;
    $scope.setActiveTab = function(v){
        $scope.topTab = v;
        $scope.currentPage = 1;

        $scope.pageSize = 5;

        $scope.currentPagee = 1;

        $scope.pageSizee = 5;
        $scope.currentPageee = 1;

        $scope.pageSizeee = 5;
    }

    $scope.bottomTab = 1;
    $scope.setBottomTab = function(v){
        $scope.bottomTab = v;
    }


    $scope.getNewsDetail = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl+"getBannerDetails/"+$stateParams.bannerId,
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            console.log('===================',data);
            if(data.type="success") {
                $scope.allnews = data.data;
                console.log('===================',$scope.allnews);
            }
        })
    }
    $scope.getNewsDetail();

    $scope.getMostViews = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl+"getNewsMostViews",
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            if(data.mostviews) {
                $scope.mostviews = data.mostviews;
            }
        })
    }
    $scope.getMostViews();

    $scope.getLatestNews = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl+"getActiveBannerOther/"+$stateParams.bannerId,
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            if(data.type == 'success') {
                $scope.latestnews = data.banner;
            }
        })
    }
    $scope.getLatestNews();

    $scope.getUpdatedBanner = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl+"getUpdateBannerOther/"+$stateParams.bannerId,
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            if(data.banner) {
                $scope.updatebanner = data.banner;
                //console.log($scope.bannernews);
            }
        })
    }
    $scope.getUpdatedBanner();


    $scope.getFeaturedPromo = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl+"getAllFeaturedPromoAds",
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            if(data.type == 'success') {
                $scope.featuredPromo = data.featuredcat;
            }
        })
    }
    $scope.getFeaturedPromo();

    $scope.getFeaturedAds = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl+"getActiveAdsByLocation/1",
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {

                $scope.featuredAds = data.ads;
                console.log(1);
                console.log($scope.featuredAds);

        })
    }

    $scope.getFeaturedAds();

    $scope.getHotBanner = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl+"getHotBanner",
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            if(data.type == 'success') {
                $scope.hotBanner = data.banner;
            }
        })
    }
    $scope.getHotBanner();

    $scope.getFeaturedRestaurant = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl+"getFeaturedResturantHome",
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            if(data.type == 'success') {
                $scope.featuredRes = data.restaurants;
            }
        })
    }
    $scope.getFeaturedRestaurant();

    $scope.bannerClicked = function()
    {
        var loginid;
        if($scope.loggedindetails)
        {
            loginid = $scope.loggedindetails.id;
        }
        else
        {
            loginid = '';
        }
        $http({
            method: "GET",
            url: $rootScope.serviceurl+"getBannersClicked/" + $stateParams.bannerId + "/" + loginid,
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            if(loginid && data.message)
            {
                DevExpress.ui.notify({
                    message: data.message,
                    position: {
                        my: "center top",
                        at: "center top"
                    }
                }, "success", 3000);
            }
        })
    }
    $scope.bannerClicked();

});