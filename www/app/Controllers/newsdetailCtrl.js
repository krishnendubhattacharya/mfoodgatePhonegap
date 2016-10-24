app.controller('newsdetailCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {
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
	
    
    
    
    $scope.getNewsDetail = function(){
        $http({
            method: "GET",
            url: $rootScope.serviceurl+"newsVisit/" + $stateParams.newsId,
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            //alert(data);

        });

        $http({
            method: "GET",
            url: $rootScope.serviceurl+"getNewsDetail/"+$stateParams.newsId,
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            if(data.news) {
                $scope.allnews = data.news;
                $scope.newspagetitle = encodeURIComponent($scope.allnews.title);
                $scope.newspagedescription = encodeURIComponent('Posted on:  '+$scope.allnews.date);
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
    
    $scope.pageLink = encodeURIComponent($rootScope.siteurl+'newsdetail/'+$stateParams.newsId);
    
    
    $scope.fbsharedialog = function(){
        var attachment = {
				     'name':$scope.allnews.title,
				     'description':$scope.allnews.sharedescription,
				     'caption': 'MFoodGate',
				     'href':$scope.allnews.image,
				     'media':[{'type':'image',
				     'src':$scope.allnews.image,
				     'href':$rootScope.siteurl
				      }]
				   };
		console.log(attachment);		   
		FB.ui({
			method: 'feed',
			name:$scope.allnews.title,
			link: $rootScope.siteurl+'newsdetail/'+$stateParams.newsId,
			picture: $scope.allnews.image,
			caption: 'MFoodGate',
			description: $scope.allnews.sharedescription,
			message: $scope.allnews.sharedescription,
			display: 'iframe',
			width: 300,
			height: 150
		})
    }
    
    window.fbAsyncInit = function() {
        FB.init({
        appId: '646829092146685',
        status: true,
        cookie: true,
        xfbml: true
        });
    };
    (function(d){
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement('script'); js.id = id; js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        ref.parentNode.insertBefore(js, ref);
    }(document));
});
