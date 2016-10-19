'use strict';
/** 
 * controllers used for the register
 */
var showText = function (e) {
    DevExpress.ui.notify("Back button clicked", "success", 5000);
};
var menuItemClicked = function (e) {
    DevExpress.ui.notify(e.model.text + " item clicked", "success", 2000);
};
app.controller('activationCtrl', function ($rootScope, $scope, $http, $location, $stateParams, myAuth, $cookieStore) {

    var products = [{
        key: "Televisions",
        items: [
            { text: "SuperLCD 42", price: "$1200", src: "images/products/7.png"  },
            { text: "SuperLED 42", price: "$1450", src: "images/products/5.png"  },
            { text: "SuperLED 50", price: "$1600", src: "images/products/4.png" },
            { text: "SuperLCD 55", price: "$1350", src: "images/products/6.png"  },
            { text: "SuperLCD 70", price: "$4000", src: "images/products/9.png"  }
        ]
    },
        {
            key: "Monitors",
            items: [
                { text: "DesktopLCD 19", price: "$160", src: "images/products/10.png"  },
                { text: "DesktopLCD 21", price: "$170", src: "images/products/12.png"  },
                { text: "DesktopLED 21", price: "$180", src: "images/products/13.png"  }
            ]
        },
        {
            key: "Projectors",
            items: [
                { text: "Projector Plus", price: "$550", src: "images/products/14.png" },
                { text: "Projector PlusHD", price: "$750", src: "images/products/15.png" }
            ]
        },
        {
            key: "Video Players",
            items: [
                { text: "HD Video Player", price: "$220", src: "images/products/1.png" },
                { text: "SuperHD Video Player", price: "$270", src: "images/products/2.png" }
            ]
        }
    ];
    $scope.data1 = products;
    $scope.menuVisible = false;
    $scope.swipeValue = true;

    $scope.showMenu = function() {
        $scope.menuVisible = !$scope.menuVisible;
    };

    $scope.toolbarItems = [{
        location: "before",
        widget: "button",
        options: {
            icon: "menu",
            onClick: $scope.showMenu
        }
    }, {
        location: "center",
        template: "title"
    }];










   //console.log($stateParams.userId);
   $scope.activateUser = function() {           
        
        //alert(23);
        $http({
                method: "PUT",
                url: $rootScope.serviceurl+"users/activeProfile/"+$stateParams.userId,
                data: {"is_active":"1","is_logged_in":"1"},
                headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
                console.log(data);
                if(data.type == 'success'){
                        if(data.voucher_message)
                        {
                            var message = data.voucher_message;
                        }
                        else
                        {
                            var message = "you have successfully logged in";
                        }

                        //params.validationGroup.reset();
                        $cookieStore.put('users', data.user_details);
                        $scope.user_username = '';
                        $scope.user_password = '';
                        myAuth.updateUserinfo(myAuth.getUserAuthorisation());
                        $scope.loggedindetails = myAuth.getUserNavlinks();
                        //console.log('hiiiiiiiiii');
                        console.log($scope.loggedindetails);
                        $rootScope.$emit('updateLoginDetails');
                        $scope.loggedin = true;
                        $scope.notloggedin = false;
                        $location.path('/');                      
                }else{
                        var message = "Login error.";
                }                
                DevExpress.ui.notify({
                    message: message,
                    position: {
                        my: "center top",
                        at: "center top"
                    }
                }, "success", 3000);
        })
        
        //form.submit();
        //params.validationGroup.reset();
    
};

    $scope.fileUploaderOptions = {
        selectButtonText: "Select photo",
        labelText: "",
        accept: "app/assets/Images/*",
        uploadMode: "useForm"
    };
    $scope.buttonOptions = {
        text: "Update profile",
        type: "success",
        onClick: function(){
            DevExpress.ui.dialog.alert("Uncomment the line to enable sending a form to the server.", "Click Handler");
            $("#form").submit();
        }
    };
   
   
});
