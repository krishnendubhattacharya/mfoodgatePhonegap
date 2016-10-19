app.controller('newsCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {
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

    $scope.getAllNews = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl+"getNewsListAll",
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            if(data.news) {
                $scope.allnews = data.news;
            }
        })
    }
    $scope.getAllNews();
    console.log('Hello Mfood');

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
            url: $rootScope.serviceurl+"getNewsLatest",
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            if(data.latest) {
                $scope.latestnews = data.latest;
            }
        })
    }
    $scope.getLatestNews();

    $scope.getNewsBanner = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl+"getNewsBanner",
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            if(data.banner) {
                $scope.bannernews = data.banner;
                console.log($scope.bannernews);
            }
        })
    }
    $scope.getNewsBanner();
});