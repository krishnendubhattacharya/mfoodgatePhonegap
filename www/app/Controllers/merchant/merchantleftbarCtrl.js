'use strict';
/** 
 * controllers used for the login
 */
app.controller('merchantleftbarCtrl', function ($rootScope, $scope, $http, $location, myAuth,mFoodCart, $cookieStore,$stateParams,$state) {
    $scope.merchant_id = $stateParams.id;
    $scope.v_id = $stateParams.v_id;
    $scope.res_id = $stateParams.res_id;
    $scope.resShow = localStorage.getItem('merchantweb');
    //alert($scope.resShow);
    if($scope.resShow){
        $scope.restaurantShow = 1;
    }else{
        $scope.restaurantShow = 0;
    }
    //console.log($scope.restaurantShow);

  $scope.getRestaurants =  function(){
      $http({
          method: "GET",
          url: $rootScope.serviceurl + "getActiveMerchantRestaurant/" + $scope.merchant_id,
          headers: {'Content-Type': 'application/json'}
      }).success(function (data) {
          $scope.restaurants = data.restaurants;
          if(!$scope.res_id && data.type=='success')
          {
              var keepGoing = true;
              angular.forEach($scope.restaurants,function(t){
                  if(keepGoing)
                  {
                      $scope.changerestaurant(t);
                      keepGoing = false;
                  }
              })
          }
      })
  }

    $scope.getRestaurants();

    $scope.changerestaurant = function(res)
    {
        //$state.go('.', {res_id: res.id}, {notify: true});
       $state.go($state.$current.name, { 'v_id':$scope.v_id, 'id':$scope.merchant_id, 'res_id':res.id });
    }
   
});

