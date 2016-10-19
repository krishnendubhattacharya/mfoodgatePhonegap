angular
.module("authFront", ["ngCookies"])
.factory("myAuth", function ($http, $cookies, $cookieStore, $window, $location) {
  var factobj = {};
  
    
    
    
    /*********************************User Authorisation ***********************************/
    factobj.userinfo = { loginstatus: false, id: "", email: "",first_name:"",last_name:"",username:"",user_type_id:"",merchant_name:"",roll:"" };
    factobj.updateUserinfo = function (obj) {
    if(obj)
	{
           /*if(obj.imgtype==1){
           	if(obj.image=='')
           	{
           		obj.image = factobj.baseurl+'assets/upload/user_images/noimage.png';
           	}else{
                        var pat = /^((http|https|ftp):\/\/)/;
                        if(pat.test(obj.image))
                        {
                            obj.image = obj.image;
                        }
                        else
                        {
                            obj.image = factobj.baseurl+'assets/upload/user_images'+obj.image;
                        }
                        if(obj.credit_tokens==undefined || obj.credit_tokens=='')
                        {
                        	obj.credit_tokens=0;
                        }
           	}
           }*/
           factobj.userinfo = { loginstatus:true, id: obj.id, email: obj.email,first_name:obj.first_name,last_name:obj.last_name,username:obj.username,user_type_id:obj.user_type_id,merchant_name:obj.merchant_name,roll:obj.roll};
           return true;
	}
    };
    factobj.resetUserinfo = function () {
        factobj.userinfo = { loginstatus: false, id: "", email: "",first_name:"",last_name:"",username:"",user_type_id:"",merchant_name:"",roll:"" };
    };
    
    factobj.getUserAuthorisation = function () {      
       //var obj=$cookieStore.get('users');
        var obj = JSON.parse(localStorage.getItem('users'));
       
       if(obj)
       {
       	/*if(obj.credit_tokens==undefined || obj.credit_tokens=='')
                        {
                        	obj.credit_tokens=0;
                        }*/
       	return obj;
       }
       else
       {
       	return null;
       }
    };
    
    factobj.getUserNavlinks = function () {
        var userlogin = factobj.userinfo.loginstatus,
            useremail = (typeof factobj.userinfo.id == "undefined" || factobj.userinfo.id == "") ? "Unknown" : factobj.userinfo.id;
        if (!userlogin) {
           return false;
        } else {
	    return factobj.userinfo;
        }
    };
    
    factobj.isUserLoggedIn = function () {
        var userlogin = factobj.userinfo.loginstatus;
        if (!userlogin) {
            return false;
        } else {
	    return true;
        }
    };
    
    /*********************************User Authorisation End***********************************/

    /******************************** Cart ***********************************/
    factobj.cart = [];
    factobj.add_to_cart = function(){};

        /*********************************Admin Authorisation ***********************************/
        factobj.adminuserinfo = { loginstatus: false, id: "",username:"" };
        factobj.updateAdminUserinfo = function (obj) {
            console.log(obj);
            if(obj)
            {
                factobj.adminuserinfo = { loginstatus: true, id: obj.id,username:obj.username };
                $cookieStore.put('admin', factobj.adminuserinfo);
                return true;
            }
    /******************************** Cart ***********************************/
        };
        factobj.resetAdminUserinfo = function () {
            factobj.adminuserinfo = { loginstatus: false, id: "", username:""};
        };

        factobj.getAdminAuthorisation = function () {
            var obj=$cookieStore.get('admin');
            if(obj)
                return obj;
            else
                return null;
        };

        factobj.getAdminNavlinks = function () {
            console.log(factobj.adminuserinfo.loginstatus);
            //factobj.adminuserinfo = $cookieStore.get('admin');
            var adminlogin = factobj.adminuserinfo.loginstatus;
            if (!adminlogin) {
                return false;
            } else {
                return factobj.adminuserinfo;
            }
        };

        factobj.isAdminLoggedIn = function () {
            var adminlogin = factobj.adminuserinfo.loginstatus;
            if (!adminlogin||adminlogin==null) {
                $location.path("/adminlogin/signin");
            } else {
                return true;
            }
        };

    return factobj;
    
})
