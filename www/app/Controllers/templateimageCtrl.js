app.controller('templateimageCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    $scope.voucherInfo;
    if(!$scope.loggedindetails){

        $location.path("/login");
    }
    $scope.img_uploader = null;
    //$scope.eventimage=null;
    $scope.textBox = {image:  {
            buttonText: 'Select file',
            labelText: 'Drop file here',
            multiple: false,
            accept: 'image/*',
            uploadUrl: $rootScope.serviceurl + 'templateFilesUpload',
            onUploaded:function(ret){
                $scope.eventimage={image:ret.file.value.name};
                console.log(ret.file.value,ret.file.value.name);
            },
            onInitialized : function(e)
            {
                $scope.img_uploader = e.component;
            }
    },
        };


    $scope.changeView = function(){
        $scope.edit_mode = !$scope.edit_mode;
        //$scope.textBox.image.value = null;
        //$scope.img_uploader = ;
        $scope.img_uploader.reset();

    }


    //$scope.voucherInfo = null;
    //$scope.datag = null;



    $scope.delete_menu = function(data)
    {
        if(confirm('Are you sure you want to delete this image?'))
        {
            $http({
                method: "delete",
                url: $rootScope.serviceurl + "deleteMenu/" + data.id,
            }).success(function (data) {
                DevExpress.ui.notify({
                    message: "Deleted Successfilly",
                    position: {
                        my: "center top",
                        at: "center top"
                    }
                }, "success", 3000);
                //$scope.edit_mode = !$scope.edit_mode;
                $scope.getMenus();
            })
        }
    }

    $scope.getEventImages = function() {
        //$scope.dataGridOptions = null;
        $scope.edit_mode = false;
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getImagesByEvent/" + $stateParams.eventId,
        }).success(function (data) {
            $scope.voucherInfo = data.data;
            $scope.loadEventImages($scope.voucherInfo);
            //$scope.$apply();
            $scope.datag.option('dataSource',$scope.voucherInfo);
            console.log($scope.voucherInfo);
            //if($scope.datag)
                //$scope.datag.option({dataSource:$scope.voucherInfo});


            //$scope.refresh_grid();
            //$timeout(function(){
                //$scope.datag.refresh();
            //},3000)




        });
    }
    $scope.getEventImages();

    $scope.loadEventImages = function(voucherIn) {
        $scope.dataGridOptions = {
            dataSource: voucherIn,

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
            onInitialized: function (e) {
                console.log('By Bikash  --  ', e);
                $scope.datag = e.component;
            },
            columns: [{
                caption: 'Image',
                cellTemplate: function (container, options) {
                    if (options.data.image) {
                        $('<img />')
                            .height(100)
                            .attr('src', options.data.image_url)
                            .appendTo(container);
                    }
                }
            },
                {
                    caption: 'Delete',
                    width: 100,
                    alignment: 'center',
                    cellTemplate: function (container, options) {
                        $('<button/>').addClass('dx-button')
                            .text('Delete')
                            .on('dxclick', function () {
                                $scope.delete_event_image(options.data.id);
                            })
                            .appendTo(container);
                    }
                }, /*,
                 {
                 width: 100,
                 alignment: 'center',
                 cellTemplate: function (container, options) {
                 $('<button/>').addClass('dx-button')
                 .text('ReSell')
                 .on('dxclick', function () {
                 //Do something with options.data;
                 $location.path('/vouchersell/' + options.data.id);
                 ghghgh(options.data.id);
                 })
                 .appendTo(container);

                 }
                 }*/

            ]
        };
    }



   $scope.$watchCollection('voucherInfo', function() {
        //var dataGrid = angular.element('#gridContainer').dxDataGrid('instance');
        //console.log($scope.voucherInfo);
        //if(dataGrid)
            //dataGrid.option({dataSource:$scope.voucherInfo});
       //console.log('1st');
       if($scope.datag) {
           $scope.datag.option({dataSource:$scope.voucherInfo});
           //console.log('2nd');
       }
    });

    $scope.save_event_image = function(){

        //console.log($scope.textBox.image.value,$scope.menuInfo);

        $scope.eventimage.event_id = $stateParams.eventId;
        //console.log($scope.eventimage);
        //return false;
        $http({
            method: "POST",
            url: $rootScope.serviceurl+"addEventImage",
            data: $scope.eventimage,
            headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
            //console.log(data);

            if(data.type == 'success'){
                var message = data.message;
                //alert(message);
                //params.validationGroup.reset();
                //$location.path('/login');
                //$scope.getUserInfo();
                //$location.path('/merchantoffer');
                DevExpress.ui.notify({
                    message: "Added Successfully",
                    position: {
                        my: "center top",
                        at: "center top"
                    }
                }, "success", 3000);
                $location.path('/myevent');
                //$scope.edit_mode = !$scope.edit_mode;
                //$scope.getEventImages();
            }else{
                var message = "Error occured.";
                DevExpress.ui.notify({
                    message: message,
                    position: {
                        my: "center top",
                        at: "center top"
                    }
                }, "error", 3000);
            }
        })

    }

    $scope.delete_event_image = function(data){
        //$scope.menuInfo.image = '';
        //$scope.save_menu();
        if ( window.confirm("Want to delete?") ) {
            $http({
                method: "DELETE",
                url: $rootScope.serviceurl + "deleteEventImage/"+data,
                //data: {"name": $scope.item.name,"is_active": $scope.item.is_active},
                //headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                //console.log(data);
                DevExpress.ui.notify({
                    message: "Deleted Successfilly",
                    position: {
                        my: "center top",
                        at: "center top"
                    }
                }, "success", 3000);
                $location.path('/myevent');
                //$scope.edit_mode = !$scope.edit_mode;
                //$scope.getEventImages();

                //$scope.allcat = data.category;
                //console.log($scope.allcat);
            });
        }else{

        }
    }



});
