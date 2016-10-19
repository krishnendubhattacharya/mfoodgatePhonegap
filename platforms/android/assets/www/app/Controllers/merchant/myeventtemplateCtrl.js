app.controller('myeventtemplateCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth) {
    myAuth.updateUserinfo(myAuth.getUserAuthorisation());
    $scope.loggedindetails = myAuth.getUserNavlinks();
    $scope.voucherInfo;
    if(!$scope.loggedindetails){

        $location.path("/login");
    }

    //alert(12);
    $scope.event_info=null;
    
    //$scope.event.image = [];
    $scope.img_uploader = null;
    $scope.textBox = {image:  {
        buttonText: 'Select file',
        labelText: 'Drop file here',
        multiple: false,
        accept: 'image/*',
        uploadUrl: $rootScope.serviceurl + 'templateFilesUpload',
        onUploaded:function(ret){
            //console.log(ret.file);
            //$scope.event.image = ret.file.value.name;
            $scope.event.image = ret.file.value.name;
            //console.log(ret.file.value,ret.file.value.name);
        },
        onInitialized : function(e)
        {
            $scope.img_uploader = e.component;
        }
    }
    };

    $scope.changeView = function(){
        $scope.edit_mode = !$scope.edit_mode;
        $scope.event = {
            title:'',
            content:'',
            is_active:false,
        }
        $scope.img_uploader.reset();

    }
    $scope.edit_event = function(event)
    {
        console.log(event);
        $scope.edit_mode = !$scope.edit_mode;
        event.offer_from_date = moment(event.offer_from_date).format("MM/DD/YYYY");
        event.offer_to_date = moment(event.offer_to_date).format("MM/DD/YYYY");
        $scope.event = {
            id:event.id,
            title:event.title,
            content:event.content,
            is_active:event.is_active=="1"?true:false,
            imageurl:event.image_url
        }
        $scope.event_info=event;
        
        $scope.img_uploader.reset();
        //console.log($scope.event);
        //$scope.img_uploader.reset();
    }

    $scope.dataGridOptions = {
        dataSource: $scope.eventInfo,
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
        onInitialized : function(e){
            $scope.datagridobj = e.component;
        },
        columns: ["title", "created_on","status",
            {
                caption:'Action',
                width: 380,
                alignment: 'center',
                cellTemplate: function (container, options) {
                    $('<button/>').addClass('dx-button')
                        .text('Image')
                        .on('dxclick',function(){$scope.image_event(options.data.id); })
                        .appendTo(container);
                    if(options.data.status != "Completed") {
                        $('<button/>').addClass('dx-button')
                            .text('Edit')
                            .on('dxclick', function () {
                                $scope.edit_event(options.data);
                            })
                            .appendTo(container);
                    }
                    $('<button/>').addClass('dx-button')
				              .text('Delete')
				              .on('dxclick',function(){$scope.delete_menu(options.data); })
				              .appendTo(container);
                }
            },
        ]
    };
    
    $scope.delete_menu = function(data)
    {
        if(confirm('Are you sure you want to delete this menu?'))
        {
            $http({
                method: "delete",
                url: $rootScope.serviceurl + "deleteEventTemplate/" + data.id,
            }).success(function (data) {
                DevExpress.ui.notify({
                    message: "Deleted Successfilly",
                    position: {
                        my: "center top",
                        at: "center top"
                    }
                }, "success", 3000);
                //$scope.edit_mode = !$scope.edit_mode;
                $scope.getAllEvents();
            })
        }
    }

    $scope.getAllEvents = function() {
        $scope.edit_mode = false;
        $http({
            method: "GET",
            url: $rootScope.serviceurl + "getTemplateByUser/" + $scope.loggedindetails.id,
        }).success(function (data) {
            $scope.eventInfo = data.data;
            $scope.datagridobj.option('dataSource',$scope.eventInfo);
        });
    }
    $scope.getAllEvents();

    
    $scope.loadList=function(e)
    {
        console.log("loadList")
        //$scope.listViewData= e.component;
    }
    

    $scope.image_event = function (event_id) {
        $location.path('/eventtemplateimage/' + event_id);
    }

    $scope.event_detail = function (event_id) {

        $location.path('/eventdetail/' + event_id);
    }

    $scope.event_bidder = function (event_id) {
        $location.path('/eventbidder/' + event_id);
    }


   
    $scope.save_event = function() {
        console.log($scope.event);
        //return false;
        $scope.event.user_id = $scope.loggedindetails.id;
        if ($scope.event.id) {

            $http({
                method: "PUT",
                url: $rootScope.serviceurl + "updateTemplate/"+$scope.event.id,
                data: {"eventdata": $scope.event},
                headers: {'Content-Type': 'application/json'},
            }).success(function (data) {
                console.log(data);
                if (data.type == 'success') {
                    var message = data.message;
                    //params.validationGroup.reset();
                    //$location.path('/login');
                    //$scope.getUserInfo();
                    //$location.path('/merchantoffer');
                    DevExpress.ui.notify({
                        message: "Added Successfilly",
                        position: {
                            my: "center top",
                            at: "center top"
                        }
                    }, "success", 3000);
                    $scope.edit_mode = !$scope.edit_mode;
                    $scope.getAllEvents();
                } else {
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

        }else{

        //return false;
        $http({
            method: "POST",
            url: $rootScope.serviceurl + "addTemplate",
            data: {"eventdata": $scope.event},
            headers: {'Content-Type': 'application/json'},
        }).success(function (data) {
            console.log(data);
            if (data.type == 'success') {
                var message = data.message;
                //params.validationGroup.reset();
                //$location.path('/login');
                //$scope.getUserInfo();
                //$location.path('/merchantoffer');
                DevExpress.ui.notify({
                    message: "Added Successfilly",
                    position: {
                        my: "center top",
                        at: "center top"
                    }
                }, "success", 3000);
                $scope.edit_mode = !$scope.edit_mode;
                $scope.getAllEvents();
            } else {
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
    }




});
