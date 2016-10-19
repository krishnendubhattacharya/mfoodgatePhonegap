app.controller('bidvoucherCtrl', function ($rootScope, $scope, $http, $location, mFoodCart, $stateParams, myAuth, $timeout) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    $scope.voucherInfo;
    $scope.first_show = 1;
    $scope.second_show = 1;
    $scope.third_show = 1;
    $scope.firstShowHide = function () {
        if($scope.first_show == 1){
            $scope.first_show = 0;
        }else{
            $scope.first_show = 1;
        }
    }
    $scope.secondShowHide = function () {
        if($scope.second_show == 1){
            $scope.second_show = 0;
        }else{
            $scope.second_show = 1;
        }

    }
    $scope.thirdShowHide = function () {
        if($scope.third_show == 1){
            $scope.third_show = 0;
        }else{
            $scope.third_show = 1;
        }

    }
    $scope.thirdcheck =false;
    if(!$scope.loggedindetails){

        $location.path("/login");
    }
   /* $scope.bidderList = function(sellId,userId){

        $http({
            method: "GET",
            url: $rootScope.serviceurl + "bidders/"+sellId+"/"+$scope.loggedindetails.id,
        }).success(function (data) {
            $scope.bidInfo =data.bid_details;
            //console.log($scope.voucherInfo);
            $location.path('/bidderlist');
            $scope.dataGridOptions4 = {
                dataSource: $scope.bidInfo,
                selection: {
                    mode: "single"
                },
                paging: {
                    pageSize: 5
                },
                pager: {
                    showPageSizeSelector: true,
                    allowedPageSizes: [5, 10, 20],
                    showInfo: true
                },

                columns: ["first_name", "last_name", "email", "bid_price",
                    {
                        width: 100,
                        alignment: 'center',
                        cellTemplate: function (container, options) {

                            $('<button/>').addClass('dx-button')
                                .text('Sell')
                                .on('dxclick', function () {
                                   // $location.path('/voucherdetail/'+options.data.id);
                                })
                                .appendTo(container);
                        }
                    }

                ]
            };


        });

    }*/

    $scope.voucherInfo = null;
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "ownresellList/"+$scope.loggedindetails.id,
        }).success(function (data) {
            $scope.voucherInfo =data.resale_details;
            //console.log($scope.voucherInfo);

            $scope.dataGridOptions = {
                dataSource: $scope.voucherInfo,
                wordWrapEnabled: true,
                selection: {
                    mode: "single"
                },
                paging: {
                    pageSize: 5
                },
                pager: {
                    showPageSizeSelector: true,
                    allowedPageSizes: [5, 10, 20],
                    showInfo: true
                },

                columns: [{caption:'Voucher Name',dataField:"title"}, {caption:'Voucher Value',dataField:"voucher_price"},
                    {caption:'Purchase Price',dataField:"purchase_price"},
                    {caption:'Reseller Price',dataField:"price"},
                    {caption:'Points',dataField:"points"},
                    {caption:'Highest Bid',dataField:"high_bid"},
                    //{caption:'Higest Bid Price',dataField:"price"},
                    {caption:'Expired Date',dataField:"expire_date"},
                    {caption:'Resell Posted Date',dataField:"created_on"},
                    {caption:'Status',dataField:"status"},
                    //{caption:'Reseller Date',dataField:"expire_date"},
                    //{caption:'Status',dataField:"is_sold==1?'Active':'Inactive'"},

                    /*{
                        width: 100,
                        alignment: 'center',
                        cellTemplate: function (container, options) {

                            $('<button/>').addClass('dx-button')
                                .text('Details')
                                .on('dxclick', function () {
                                    $location.path('/voucherdetail/'+options.data.id);
                                })
                                .appendTo(container);
                        }
                    },*/
                    {
                        width: 200,
                        caption:'Action',
                        alignment: 'center',
                        cellTemplate: function (container, options) {
                           if(options.data.status!='Expired')
                           { $('<button/>').addClass('dx-button')
                                .text('Bidder')
                                .on('dxclick', function () {
                                    //Do something with options.data;
                                    $scope.bidderList(options.data.voucher_resale_id);

                                    //$scope.bidderList(options.data.voucher_resale_id,$scope.loggedindetails.id);

                                })
                                .appendTo(container);
						$('<button/>').addClass('dx-button')
                                    .text('Cancel')
                                    .on('dxclick', function () {
                                        //Do something with options.data;
                                        //$location.path('/bidderlist/' + options.data.voucher_resale_id);
                                        $scope.cancelResell(options.data.voucher_resale_id,options.data.voucher_id);
                                        //$scope.bidderList(options.data.voucher_resale_id,$scope.loggedindetails.id);

                                    })
                                    .appendTo(container);
                           }         
                            $('<button/>').addClass('dx-button')
                                .text('Detail')
                                .on('dxclick', function () {
                                    //Do something with options.data;
                                    //$location.path('/bidderlist/'+options.data.voucher_resale_id);
                                    $scope.detailVoucher(options.data.voucher_resale_id,options.data.offer_id);
                                    //$scope.bidderList(options.data.voucher_resale_id,$scope.loggedindetails.id);

                                })
                                .appendTo(container);
                            //if(options.data.high_bid == 0) {
                                
                            //}

                        }
                    }

                ]
            };


        });

    $scope.bidderList = function (voucher_resale_id) {
        $location.path('/bidderlist/'+voucher_resale_id);

    }

    $scope.cancelResell = function (voucher_resale_id,voucher_id) {
        //$location.path('/resaleCancel/' + voucher_resale_id);
        $http({
            method: "POST",
            url: $rootScope.serviceurl + "resaleCancel",
            data: {"id":voucher_resale_id,"voucher_id":voucher_id},
        }).success(function (data) {
            //$scope.voucherInfo =data.bid_details;
            //console.log($scope.voucherInfo);
            if(data.type == 'success'){
                //var message = data.message;
                //params.validationGroup.reset();
                $location.path('/dashboard');

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

    $scope.detailVoucher = function (voucher_resell_id,offer_id) {
        $location.path('/resellvoucherdetail/' + voucher_resell_id+'/'+offer_id);

    }

    $http({
        method: "GET",
        url: $rootScope.serviceurl + "ownbid/"+$scope.loggedindetails.id,
    }).success(function (data) {
        $scope.voucherInfo1 =data.bid_details;
        //console.log($scope.voucherInfo);
        $scope.dataGridOptions3 = {
            dataSource: $scope.voucherInfo1,
            wordWrapEnabled: true,
            selection: {
                mode: "single"
            },
            paging: {
                pageSize: 5
            },
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: [5, 10, 20],
                showInfo: true
            },

            columns: [{caption:'Voucher Name',dataField:"title"},
                {caption:'Voucher Value',dataField:"voucher_price"},
                {caption:'Bid Price',dataField:"bid_price"},
                {caption:'Bid Points',dataField:"bid_points"},
                {caption:'Expire Date',dataField:"to_date"},
                {caption:'Bid Date',dataField:"created_on"},
                {caption:'Status',dataField:"Status"},
                {
                    width: 250,
                    caption:'Action',
                    alignment: 'center',
                    cellTemplate: function (container, options) {
                    if(options.data.Status != 'Expired')
                    {
                    if(options.data.Status != 'Accepted') {
                        $('<button/>').addClass('dx-button')
                            .text('Edit')
                            .on('dxclick', function () {
                                //Do something with options.data;
                                $scope.bidEdit(options.data.bid_id,options.data.voucher_resale_id);

                                //$scope.bidderList(options.data.voucher_resale_id,$scope.loggedindetails.id);

                            })
                            .appendTo(container);

                        $('<button/>').addClass('dx-button')
                                .text('Cancel')
                                .on('dxclick', function () {
                                    //Do something with options.data;
                                    //$location.path('/bidderlist/' + options.data.voucher_resale_id);
                                    $scope.cancelBid(options.data.bid_id,options.data.voucher_id);
                                    //$scope.bidderList(options.data.voucher_resale_id,$scope.loggedindetails.id);

                                })
                                .appendTo(container);
                        }
                        if(options.data.Status == 'Accepted') {
                           if($scope.loggedindetails.id = options.data.user_id)
						{
						$('<button/>').addClass('dx-button')
		                       .text('Add to Cart')
		                       .on('dxclick', function () {
		                           //Do something with options.data;
		                           $scope.add_to_cart(options.data.voucher_resale_id,options.data.offer_id);

		                           //$scope.bidderList(options.data.voucher_resale_id,$scope.loggedindetails.id);

		                       })
		                       .appendTo(container);
		                    }
                        }
				}
                        $('<button/>').addClass('dx-button')
                            .text('Detail')
                            .on('dxclick', function () {
                                //Do something with options.data;
                                //$location.path('/bidderlist/'+options.data.voucher_resale_id);
                                $scope.detailVoucher(options.data.voucher_resale_id,options.data.offer_id);
                                //$scope.bidderList(options.data.voucher_resale_id,$scope.loggedindetails.id);

                            })
                            .appendTo(container);



                    }
                }
            ]
        };


    });
    
    
    $scope.add_to_cart = function(resellId,offerId){

        $http({
            method: "GET",
            url: $rootScope.serviceurl+"checkOfferId/"+offerId,
            headers: {'Content-Type': 'application/json'},
            //data:{item:data,user_id:$scope.loggedindetails.id}
        }).success(function(res) {

            if(res.type =='success')
            {
                $http({
				  method: "GET",
				  url: $rootScope.serviceurl+"getResellPromoDetails/" + offerId+"/"+resellId,
				  headers: {'Content-Type': 'application/json'},
			   }).success(function(data) {
				  if(data.type == 'success') {
				      $scope.promodetails = data.offer;
				      $scope.pointdetails = data.point_details;
				      $scope.resell_user_details = data.resell_user_details[0];
				      $scope.restaurant = data.restaurants;
				      $scope.mapaddress = data.merchantInfo[0].address;
				      $scope.maptitle = data.merchantInfo[0].merchant_name;
				      $scope.offer_days = data.offer_days;
				      $scope.about_me = data.merchantInfo[0].about_me;
				      //console.log(data.merchantInfo);
				      if(data.restaurants.length == 1){
				          $scope.restName=data.restaurants[0].title;
				      }else{
				          $scope.restName=data.merchantInfo[0].merchant_name;
				      }
				      
				      if($scope.promodetails.operator == 1){
					     $scope.pay = true;
					     $scope.paycash = true;
					 }else{
					     $scope.pay = false;
					     $scope.paycash = false;
					 }
					 var cart_obj = {
					     offer_id            :   $scope.promodetails.id,
					     restaurant_id       :   $scope.restaurant.id,
					     offer_title         :   $scope.promodetails.title,
					     restaurant_title    :   $scope.restName,
					     offer_percent       :   $scope.promodetails.offer_percent,
					     price               :   $scope.promodetails.resell_price,
					     mpoints             :   $scope.promodetails.resell_point,
					     offer_price         :   $scope.promodetails.resell_price,
					     quantity            :   1,
					     previous_quantity   :   1,
					     image               :   $scope.promodetails.image,
					     point_id            :   $scope.promodetails.resell_point_id,
					     point_name          :   $scope.pointdetails[0].name,
					     condtn              :   $scope.promodetails.operator,
					     payments            :   $scope.pay,
					     paymentscash        :   $scope.paycash,
					     resell              :   1,
					     resell_id           :   $scope.promodetails.resell_id,
					     event               :   0,
					     event_id            :   0,
					     event_price         :   0,
					     event_bid_id        :   0
					 }
					 mFoodCart.add_to_cart(cart_obj);
					 $scope.cartDetails = mFoodCart.get_cart();
					 /*if($scope.cartDetails) {
					     angular.forEach($scope.cartDetails, function (v) {

					         if(v.condtn == 1){
					             v.payments =true;
					             v.paymentscash=true;
					         }else{
					             v.payments =false;
					             v.paymentscash=false;
					         }


					     })
					 */
					 //console.log($scope.cartDetails);
					 $scope.getCartTotals();
					 $scope.save_to_db();
					 var message = "Added to cart successfully";
                            DevExpress.ui.notify({
                                message: message,
                                position: {
                                    my: "center top",
                                    at: "center top"
                                }
                            }, "success", 3000);
				  }
			   })
                
            }
            else
            {
                var message = res.message;
                DevExpress.ui.notify({
                    message: message,
                    position: {
                        my: "center top",
                        at: "center top"
                    }
                }, "error", 3000);
            }
        });

    }
    
    $scope.save_to_db = function() {
        console.log("saving -1",$scope.loggedindetails);
        if ($scope.loggedindetails) {
            $scope.cartDetails = mFoodCart.get_cart();
            console.log("saving -2");
            $http({
                method: "POST",
                url: $rootScope.serviceurl + "addToCart",
                headers: {'Content-Type': 'application/json'},
                data:{user_id:$scope.loggedindetails.id,cart:$scope.cartDetails}
            }).success(function (data) {
                console.log('saved');
                if(data)
                {
                    mFoodCart.resetAndAdd(data);
                    $scope.cartDetails = mFoodCart.get_cart();
                    $scope.getCartTotals();
                    console.log(mFoodCart.get_cart());

                }
            })
        }
    }

    $scope.getCartTotals = function(){
        $scope.cart_total = 0;
        $scope.cart_total_points = 0;
        $scope.cart_ttl_point = [];
        $scope.cart_ttl_cnt = [];
        $scope.cartDetails = mFoodCart.get_cart();
        //console.log($scope.cartDetails);
        angular.forEach($scope.cartDetails,function(value){
            if(value.paymentscash == true){
                $scope.cart_total = $scope.cart_total + (value.quantity * value.offer_price);
                $scope.cart_total_points += (value.quantity * value.mpoints);
            }

            //alert($scope.cart_ttl_cnt.length);
            if(value.payments == true){
                if($scope.cart_ttl_cnt.length != 0){
                    if($scope.cart_ttl_cnt.indexOf(value.point_id)== -1){
                        $scope.cart_ttl_point.push(value.point_id);
                        $scope.cart_ttl_point[$scope.cart_ttl_point.length-1]={};
                        //$scope.cart_ttl_point[value.point_id].id = value.point_id;
                        //alert('aa'+$scope.cart_ttl_point.length-1);
                        $scope.cart_ttl_point[$scope.cart_ttl_point.length-1].point_name = value.point_name;
                        $scope.cart_ttl_point[$scope.cart_ttl_point.length-1].point_value = (value.mpoints*value.quantity);
                        $scope.cart_ttl_cnt.push(value.point_id);
                    }else {

                        //$scope.cart_ttl_point[$scope.cart_ttl_cnt.indexOf(value.point_id)].id = value.point_id;
                        //alert('aaa'+$scope.cart_ttl_cnt.indexOf(value.point_id));
                        $scope.cart_ttl_point[$scope.cart_ttl_cnt.indexOf(value.point_id)].point_name = value.point_name;
                        $scope.cart_ttl_point[$scope.cart_ttl_cnt.indexOf(value.point_id)].point_value = parseInt($scope.cart_ttl_point[$scope.cart_ttl_cnt.indexOf(value.point_id)].point_value) + parseInt(value.mpoints*value.quantity);
                        //$scope.cart_ttl_cnt.push(value.point_id);
                    }
                }else{
                    //console.log(value.point_id);
                    //alert(value.point_id);
                    $scope.cart_ttl_point.push(value.point_id);
                    //alert('a'+$scope.cart_ttl_point.length-1);
                    $scope.cart_ttl_point[$scope.cart_ttl_point.length-1]={};
                    $scope.cart_ttl_point[$scope.cart_ttl_point.length-1].point_name = value.point_name;
                    $scope.cart_ttl_point[$scope.cart_ttl_point.length-1].point_value = (value.mpoints*value.quantity);
                    $scope.cart_ttl_cnt.push(value.point_id);
                }
            }



        })

        console.log($scope.cart_ttl_point);
    }

    $scope.cancelBid = function (bid_id,voucher_id) {
        //$location.path('/resaleCancel/' + voucher_resale_id);
        $http({
            method: "POST",
            url: $rootScope.serviceurl + "bidCancel",
            data: {"id":bid_id,"voucher_id":voucher_id},
        }).success(function (data) {
            //$scope.voucherInfo =data.bid_details;
            //console.log($scope.voucherInfo);
            if(data.type == 'success'){
                //var message = data.message;
                //params.validationGroup.reset();
                $location.path('/dashboard');

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

    $scope.bidEdit = function (bid_id,resell_id) {

            $location.path('/editbid/'+bid_id+'/'+resell_id);

    }
    //$scope.soonVoucherInfo =null;
    //$scope.datagOne = null;


    $scope.soonVoucherInfo = null;
    $http({
        method: "GET",
        url: $rootScope.serviceurl + "othersresellList/" + $scope.loggedindetails.id,
    }).success(function (data) {
        $scope.soonVoucherInfo = data.resale_details;
        $timeout(function(){


        $scope.dataGridOptions22 = {
            dataSource: $scope.soonVoucherInfo,
            wordWrapEnabled: true,
            selection: {
                mode: "single"
            },
            paging: {
                pageSize: 5
            },
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: [5, 10, 20],
                showInfo: true
            },

            columns: [{caption: 'Voucher Name', dataField: "title"},
                {caption: 'Resell Price', dataField: "price"},
                {caption: 'Voucher Price', dataField: "voucher_price"}, "expire_date",
                {caption: 'Resell Date', dataField: "created_on"},
                {
                    width: 160,
                    caption: 'Action',
                    alignment: 'center',
                    cellTemplate: function (container, options) {
                        if (options.data.Status != 'Expired') {
                            $('<button/>').addClass('dx-button')
                                .text('Bid')
                                .on('dxclick', function () {
                                    //Do something with options.data;
                                    //$scope.addBid();
                                    $scope.addbid(options.data.voucher_resale_id, options.data.voucher_id);
                                    //$location.path('/addbid/'+options.data.voucher_resale_id+'/'+options.data.voucher_id)

                                })
                                .appendTo(container);

                            $('<button/>').addClass('dx-button')
                                .text('Add to Cart')
                                .on('dxclick', function () {
                                    //Do something with options.data;
                                    $scope.add_to_cart(options.data.voucher_resale_id, options.data.offer_id);

                                    //$scope.bidderList(options.data.voucher_resale_id,$scope.loggedindetails.id);

                                })
                                .appendTo(container);
                        }
                        $('<button/>').addClass('dx-button')
                            .text('Detail')
                            .on('dxclick', function () {
                                //Do something with options.data;
                                //$location.path('/bidderlist/'+options.data.voucher_resale_id);
                                $scope.detailVoucher(options.data.voucher_resale_id, options.data.offer_id);
                                //$scope.bidderList(options.data.voucher_resale_id,$scope.loggedindetails.id);

                            })
                            .appendTo(container);

                    }
                }

            ]
        };
        },3000);


    });
    //$scope.getothersresellList();



    $scope.addbid = function (voucher_resale_id,voucher_id) {

        $location.path('/addbid/'+voucher_resale_id+'/'+voucher_id);

    }

    $scope.textBox = {
        bid_price: {
            mode: "text"

        }
    };

    $scope.saveBid = function(params) {

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
            url: $rootScope.serviceurl+"bids",
            data: {"bid_price":$scope.bid_price,"m_points":$scope.m_points,"voucher_id":$stateParams.voucherId,"user_id":$scope.loggedindetails.id,"voucher_resale_id":$stateParams.sellId},
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
            method: "PUT",
            url: $rootScope.serviceurl+"updateVoucherBid"+$stateParams.bidId,
            data: {"bid_price":$scope.item.bid_price,"m_points":$scope.item.m_points},
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
    if($stateParams.sellId){
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
    }





});
