'use strict';
/** 
 * controllers used for the register
 */
 
app.controller('registerCtrl', function ($rootScope, $scope, $http, $location, $facebook, GooglePlus, myAuth, $cookieStore,ngToast,$stateParams,$timeout) {
var user_type = ["Merchant", "Client"];
//var user_type = {"M":"Merchant", "C":"Client"};
$scope.textBox = {
        first_name: {
        placeholder: "Enter First Name",
        mode: "text",
        bindingOptions: { value: 'first_name' },
               
        },
        last_name: {
        placeholder: "Enter Second Name",
        mode: "text",
              
        },
        email: {
        placeholder: "Enter Email",
        mode: "email",
               
        },
        username: {
        placeholder: "Enter Username",
        mode: "text",
               
        },
        password: {
        placeholder: "Enter Password",
        mode: "password",
                 
        }
};
/*$scope.radioGroup = {
        changeLayout: {
        items: user_type,
        //value: user_type[0],
        layout: "horizontal"
        }
};*/
    if($stateParams.email){
        $scope.email = $stateParams.email;
    }
$scope.validateAndSubmit = function(params) {

    $scope.user_type_id = 2;
    var result = params.validationGroup.validate();    
    if(result.isValid) {
        $http({
                method: "POST",
                url: $rootScope.serviceurl+"users",
                data: {"email":$scope.email,"password":$scope.password,"user_type_id":$scope.user_type_id,"activation_url":$rootScope.siteurl+"activation"},
                headers: {'Content-Type': 'application/json'},
        }).success(function(data) {
                //console.log(data);
                if(data.type == 'success'){
                        var message = data.message;
                        params.validationGroup.reset(); 
                        $location.path('/login'); 
                        DevExpress.ui.notify({
                            message: "Added Successfilly, please check your email for account activation",
                            position: {
                                my: "center top",
                                at: "center top"
                            }
                        }, "success", 3000);                     
                }else{
                        var message = "Email or Username already exist.";
                        DevExpress.ui.notify({
                            message: message,
                            position: {
                                my: "center top",
                                at: "center top"
                            }
                        }, "error", 3000);
                }                
                
        })
        
        //form.submit();
        //params.validationGroup.reset();
    }
};



/*$scope.firstNameValidationRules = {
    validationRules: [{
        type: "required",
        message: "First name is required"
    }]
};

$scope.lastNameValidationRules = {
    validationRules: [{
        type: "required",
        message: "Last name is required"
    }]
};*/

$scope.emailValidationRules = {
    validationRules: [{
        type: "required",
        message: "Email is required"
    }]
};  

/*$scope.usernameValidationRules = {
    validationRules: [{
        type: "required",
        message: "Username is required"
    }]
};*/

$scope.passwordValidationRules = {
    validationRules: [{
        type: "required",
        message: "Password is required"
    }]
};

$scope.fbsignuser = function () {
        $facebook.login().then(function() {
            reset();
        });
    };

    function reset() {
        $facebook.api("/me",{fields: 'id,name,email'}).then(
            function(response) {
                console.log(response);
                $http({
                    method: "POST",
                    url: $rootScope.serviceurl+"fbloginuser",
                    data: {"email":response.email,"id":response.id,"name":response.name},
                    headers: {'Content-Type': 'application/json'},
                }).success(function(data) {
                    console.log(data);
                    if(data.type == 'success'){
                        $scope.loggedindetails = '';
                        var message = data.message;
                        //params.validationGroup.reset();
                        //$cookieStore.put('users', data.user_details);
                        localStorage.setItem('users', JSON.stringify(data.user_details));
                        $scope.user_username = '';
                        $scope.user_password = '';
                        myAuth.updateUserinfo(myAuth.getUserAuthorisation());
                        $scope.loggedindetails = myAuth.getUserNavlinks();
                        //console.log('hiiiiiiiiii');
                        console.log($scope.loggedindetails);
                        $rootScope.$emit('updateLoginDetails');
                        $scope.loggedin = true;
                        $scope.notloggedin = false;
                        //console.log($scope.loggedindetails);
                        if(data.user_details.user_type_id == 1){
                            $location.path('admin/home');
                        }else {
                            $location.path('/');
                        }
                        DevExpress.ui.notify({
                            message: message,
                            position: {
                                my: "center top",
                                at: "center top"
                            }
                        }, "success", 3000);
                    }else{
                        var message = "Login failed.";
                        DevExpress.ui.notify({
                            message: message,
                            position: {
                                my: "center top",
                                at: "center top"
                            }
                        }, "error", 3000);
                    }

                });
               /* $scope.loading = true;
                $http({
                    method: "POST",
                    url: $rootScope.serviceurl + "users/fbloginuser",
                    data: $.param({'email': response.email,'name':response.name,'fbid':response.id}),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                }).success(function(data) {
                    $scope.loading = false;
                    if (data.msg_type == '0')
                    {
                        $scope.loginalertmessage = true;
                        $scope.alert = myAuth.addAlert('danger', data.msg);
                    }
                    else if(data.msg_type == '1')
                    {
                        $cookieStore.put('users', data.userdetails);

                        $scope.loginalertmessage = true;
                        $scope.alert = myAuth.addAlert('success', data.msg);
                        $scope.user_username = '';
                        $scope.user_password = '';
                        myAuth.updateUserinfo(myAuth.getUserAuthorisation());
                        $scope.loggedindetails = myAuth.getUserNavlinks();
                        $scope.imgtype = $scope.loggedindetails.imgtype;
                        if($scope.loggedindetails.fbid!="")
                        {
                            $scope.headersiteimage = false;
                        }else{
                            $scope.headersiteimage = true;
                        }
                        $scope.loggedin = true;
                        $scope.notloggedin = false;
                        $scope.onlinestatnoti=true;
                        if (data.userdetails.role == 1) {
                            $scope.onlinestat = false;
                        } else {
                            var jsonstatus = {'userid': $scope.loggedindetails.id};
                            socket.emit("mentor_login", jsonstatus);
                            $scope.onlinestat = true;
                            if (data.userdetails.login_status == 1) {
                                var htmls = '<img src="assets/frontend/images/online.png" alt="" style="margin-right:5px; margin-top:-2px;">Instant Session';
                            } else if (data.userdetails.login_status == 2) {
                                var htmls = '<img src="assets/frontend/images/online.png" alt="" style="margin-right:5px; margin-top:-2px;">Online';
                            }
                            else if (data.userdetails.login_status == 3) {
                                var htmls = '<img src="assets/frontend/images/away.png" alt="" style="margin-right:5px; margin-top:-2px;">Away';
                            }
                            else if (data.userdetails.login_status == 4) {
                                var htmls = '<img src="assets/frontend/images/offline.png" alt="" style="margin-right:5px; margin-top:-2px;">Offline';
                            }
                            $("#headstatus").html(htmls + '<span class="caret"></span>');
                        }
                        $('.modal').modal('hide');
                        if (data.userdetails.role == 1)
                        {
                            $location.path("/frontend/dashboard");
                        }
                        else
                        {
                            $location.path("/frontend/mentor-dashboard");
                        }
                        $scope.getnotifications();
                    }
                });*/
            },
            function(err) {
                console.log(err);
                //$scope.alertmessage = true;
                //$scope.alert = myAuth.addAlert('danger', 'Please provide your email.');
            });
    }
    
    $scope.gpluslogin = function (idmsg) {
	    $scope.idmsg = idmsg;
		GooglePlus.login().then(function (authResult) {
            console.log(authResult);

            GooglePlus.getUser().then(gfresh);
            /*GooglePlus.getUser().then(function (user) {
                gfresh();
            });*/
        }, function (err) {
            console.log(err);
        });
    };
    
    function gfresh(user) {
    		console.log(user);
        console.log('GooGle SignUp:----'+user.name+'|'+user.id+'|'+user.picture+'|'+user.email);
        	$http({
                    method: "POST",
                    url: $rootScope.serviceurl+"gplusLoginUser",
                    data: {"email":user.email,"id":user.id,"name":user.name},
                    headers: {'Content-Type': 'application/json'},
                }).success(function(data) {
                    console.log(data);
                    if(data.type == 'success'){
                        $scope.loggedindetails = '';
                        var message = data.message;
                        //params.validationGroup.reset();
                        //$cookieStore.put('users', data.user_details);
                        localStorage.setItem('users', JSON.stringify(data.user_details));
                        $scope.user_username = '';
                        $scope.user_password = '';
                        myAuth.updateUserinfo(myAuth.getUserAuthorisation());
                        $scope.loggedindetails = myAuth.getUserNavlinks();
                        //console.log('hiiiiiiiiii');
                        console.log($scope.loggedindetails);
                        $rootScope.$emit('updateLoginDetails');
                        $scope.loggedin = true;
                        $scope.notloggedin = false;
                        //console.log($scope.loggedindetails);
                        if(data.user_details.user_type_id == 1){
                            $location.path('admin/home');
                        }else {
                            $location.path('/');
                        }
                        DevExpress.ui.notify({
                            message: message,
                            position: {
                                my: "center top",
                                at: "center top"
                            }
                        }, "success", 3000);
                    }else{
                        var message = "Login failed.";
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
   
   
});

