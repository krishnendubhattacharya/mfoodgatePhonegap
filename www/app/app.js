var app = angular.module("mFoodApp", [
        'ngRoute',
        'ngAnimate',
        'ngCookies',
        'ngSanitize',
        'ngTouch',
        'ui.router',
        'base64',
        'oc.lazyLoad',
        'cfp.loadingBar',
        'dx',
        'authFront',
        'ngToast',
        'ngFacebook',
        'angularFileUpload',
        'angularjs-dropdown-multiselect',
        'angularMoment',
        'angularUtils.directives.dirPagination',
        'googleplus',
]);

app.config(['$facebookProvider', function($facebookProvider) {
        $facebookProvider.setAppId('1240070162687364');
    }])
    .run( function( $rootScope ) {
        // Load the facebook SDK asynchronously
        (function(){
            // If we've already installed the SDK, we're done
            if (document.getElementById('facebook-jssdk')) {return;}

            // Get the first script element, which we'll use to find the parent node
            var firstScriptElement = document.getElementsByTagName('script')[0];

            // Create a new script element and set its id
            var facebookJS = document.createElement('script');
            facebookJS.id = 'facebook-jssdk';

            // Set the new script's source to the source of the Facebook JS SDK
            facebookJS.src = '//connect.facebook.net/en_US/all.js';

            // Insert the Facebook JS SDK into the DOM
            firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
        }());
    });


app.run(['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams, myAuth) {
        // Attach Fastclick for eliminating the 300ms delay between a physical tap and the firing of a click event on mobile browsers
      // FastClick.attach(document.body);

        // Set some reference to access them from any scope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        // GLOBAL APP SCOPE
        // set below basic information
        //$rootScope.serviceurl = "http://localhost/prohelp/";
        //$rootScope.serviceurl = "http://livehelpout.com/beta.admin";
        $rootScope.serviceurl = "http://api.mfoodgate.com/index.php/";
        $rootScope.siteurl = "http://www.mfoodgate.com/#/";
        //$rootScope.metadesc = "http://107.170.152.166/mFoodGateAPI/";
        
        $rootScope.paypalClientIDs = {
            "PayPalEnvironmentProduction": "YOUR_PRODUCTION_CLIENT_ID",
            "PayPalEnvironmentSandbox": "EOtwxXtc9l8tzpPuCoXy8RadcrTXaStDWpdN7bcP3qFFArrJpcQoBdHqo45dYo-N0yaraXZ1vESxv_0B"
          };
          
        /******************* Paypal Initialization and Configuaration***************/
        $rootScope.onPayPalMobileInit = function() {
            PayPalMobile.prepareToRender("PayPalEnvironmentNoNetwork", $rootScope.paypalConfiguration());
        }

        $rootScope.paypalConfiguration = function() {
            var config = new PayPalConfiguration({
              merchantName: "mFoodGate",
              merchantPrivacyPolicyURL: "http://www.mfoodgate.com/#/cms/privacy",
              merchantUserAgreementURL: "http://www.mfoodgate.com/#/cms/terms"
            });
            return config;
        }

        $rootScope.googleClientID = "612181755298-lpkrunqgt3860479r850dif58p9p2o12.apps.googleusercontent.com";
        $rootScope.app = {
            name: 'mFoodGate', // name of your project
            author: 'NITS', // author's name or company name
            //admindescription: 'LiveHelpout Admin', // brief description
            //frontdescription: 'LiveHelpout', // brief description
            description:'mFoodGate',
            keywords:'mFoodGate',
            version: '1.0', // current version
            year: ((new Date()).getFullYear()), // automatic current year (for copyright information)
            isMobile: (function () {// true if the browser is a mobile device
                var check = false;
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    check = true;
                };
                return check;
            })()
        };

    }]);


/////////Gplus Config///////////////////// 
 /*app.config(['GooglePlusProvider', function(GooglePlusProvider) {
     GooglePlusProvider.init({
        clientId: '612181755298-lpkrunqgt3860479r850dif58p9p2o12.apps.googleusercontent.com',
        apiKey: 'AIzaSyC0eRHUoe9BA3FDewLO-YJ5WzKrDEuxR5M',
        scopes: ['profile', 'email']
     });
}]);*/

app.config(['GooglePlusProvider', function(GooglePlusProvider) {
     GooglePlusProvider.init({
        clientId: '612181755298-lpkrunqgt3860479r850dif58p9p2o12.apps.googleusercontent.com',
        apiKey: 'AIzaSyDj9qJ9WZXl6zqhTczV9Z9Z0yZx7VaH3mo',
        scopes: ['profile', 'email']
     });
}]);
//angular.module('mFoodApp').run(['$http',function($http){
//    $http.defaults.headers.common.Authorization = 'YmVlcDpib29w';
//}])

// translate config
/*app.config(['$translateProvider',
    function ($translateProvider) {

        // prefix and suffix information  is required to specify a pattern
        // You can simply use the static-files loader with this pattern:
        $translateProvider.useStaticFilesLoader({
            prefix: 'app/assets/i18n/',
            suffix: '.json'
        });

        // Since you've now registered more then one translation table, angular-translate has to know which one to use.
        // This is where preferredLanguage(langKey) comes in.
        $translateProvider.preferredLanguage('en');

        // Store the language in the local storage
        $translateProvider.useLocalStorage();

    }]);*/

// Angular-Loading-Bar
// configuration
app.config(['cfpLoadingBarProvider',
    function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.includeSpinner = false;

    }]);


app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'JS_REQUIRES','$locationProvider',
    function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, jsRequires,$locationProvider) {

    app.controller = $controllerProvider.register;
     app.directive = $compileProvider.directive;
     app.filter = $filterProvider.register;
     app.factory = $provide.factory;
     app.service = $provide.service;
     app.constant = $provide.constant;
     app.value = $provide.value;

        // LAZY MODULES
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: jsRequires.modules
        });

///Remove Hash from URL//////
 //$locationProvider.html5Mode(true).hashPrefix('!');

    // APPLICATION ROUTES
    // -----------------------------------
    // For any unmatched url, redirect to /app/dashboard
    $urlRouterProvider.otherwise("/");
    //
    // Set up the states

        $stateProvider
        //Login state
            .state('frontend', {
                url: '',
                templateUrl: 'app/views/app.html',
                abstract :true,
                resolve: loadSequence('footer','mCart','mn'),

            })
            .state('frontend.index', {
                url: '/',
                resolve: loadSequence('home','mn'),
                templateUrl: 'app/views/home.html',
                title: 'Home'
            })
            .state('frontend.login', {
                url: '/login?returnUrl',
                resolve: loadSequence('login'),
                templateUrl: 'app/views/login.html',
                title: 'Login'
            })
            .state('frontend.forgotpassword', {
                url: '/forgotpassword',
                resolve: loadSequence('login'),
                templateUrl: 'app/views/forgotpassword.html',
                title: 'Forgot Password'
            })
            .state('frontend.register', {
                url: '/register/:email',
                resolve: loadSequence('register'),
                templateUrl: 'app/views/register.html',
                title: 'Register'
            })
            .state('frontend.activation', {
                url: '/activation/:userId',
                resolve: loadSequence('activation'),
                templateUrl: 'app/views/activation.html',
                title: 'activation'
            })
            .state('frontend.dashboard', {
                url: '/dashboard',
                resolve: loadSequence('dashboard'),
                templateUrl: 'app/views/dashboard.html',
                title: 'Dashboard'
            })
            .state('frontend.profile', {
                url: '/profile',
                resolve: loadSequence('profile','ngMap'),
                templateUrl: 'app/views/profile.html',
                title: 'Profile'
            })
            .state('frontend.changepassword', {
                url: '/changepassword',
                resolve: loadSequence('changepassword'),
                templateUrl: 'app/views/changepassword.html',
                title: 'Change Password'
            })
            .state('frontend.allvoucher', {
                url: '/allvoucher',
                resolve: loadSequence('allvoucher'),
                templateUrl: 'app/views/allvoucher.html',
                title: 'Voucher'
            })
            .state('frontend.swapvoucher', {
                url: '/swapvoucher',
                resolve: loadSequence('swapvoucher'),
                templateUrl: 'app/views/swapvoucher.html',
                title: 'Swap Voucher'
            })
            .state('frontend.giftvoucherlist', {
                url: '/giftvoucherlist',
                resolve: loadSequence('giftvoucherlist'),
                templateUrl: 'app/views/giftvoucherlist.html',
                title: 'Gift Voucher'
            })
            .state('frontend.mymembership', {
                url: '/mymembership',
                resolve: loadSequence('mymembership'),
                templateUrl: 'app/views/mymembership.html',
                title: 'My Membership',
                controller:'mymembershipCtrl'
            })
            .state('frontend.membershipdetail', {
                url: '/membershipdetail/:membershipId',
                resolve: loadSequence('membershipdetail'),
                templateUrl: 'app/views/membershipdetail.html',
                title: 'Membership Detail',
                controller:'membershipdetailCtrl'
            })
            .state('frontend.swapvoucherdetail', {
                url: '/swapvoucherdetail/:swapId/:promoId',
                resolve: loadSequence('swapvoucherdetail','ngMap','mCart','720kb.socialshare'),
                templateUrl: 'app/views/swapvoucherdetail.html',
                title: 'Swap Voucher Detail'
            })

            .state('frontend.resellvoucherdetail', {
                url: '/resellvoucherdetail/:resellId/:promoId',
                resolve: loadSequence('resellvoucherdetail','ngMap','mCart','720kb.socialshare'),
                templateUrl: 'app/views/resellvoucherdetail.html',
                title: 'Resell Voucher Detail'
            })
            .state('frontend.swapinterested', {
                url: '/swapinterested/:swapId',
                resolve: loadSequence('swapinterested'),
                templateUrl: 'app/views/swapinterested.html',
                title: 'Swap Voucher'
            })
            .state('frontend.voucherdetail', {
                url: '/voucherdetail/:voucherId',
                resolve: loadSequence('voucherdetail'),
                templateUrl: 'app/views/voucherdetail.html',
                title: 'Voucher Detail'
            })
            .state('frontend.addbid', {
                url: '/addbid/:sellId/:voucherId',
                resolve: loadSequence('bidvoucher'),
                templateUrl: 'app/views/addbid.html',
                title: 'Add Bid'
            })
            .state('frontend.editbid', {
                url: '/editbid/:bidId/:sellId',
                resolve: loadSequence('editbid'),
                templateUrl: 'app/views/editbid.html',
                title: 'Edit Bid'
            })
            .state('frontend.sellbid', {
                url: '/sellbid/:sellId/:voucherId',
                resolve: loadSequence('bidvoucher'),
                templateUrl: 'app/views/sellbid.html',
                title: 'Add Bid'
            })
            .state('frontend.bidderlist', {
                url: '/bidderlist/:sellId',
                resolve: loadSequence('bidderlist'),
                templateUrl: 'app/views/bidderlist.html',
                title: 'Bidder List'
            })
            .state('frontend.swapbidderlist', {
                url: '/swapbidderlist/:swapId',
                resolve: loadSequence('swapbidderlist'),
                templateUrl: 'app/views/swapbidderlist.html',
                title: 'Swap Bidder List'
            })
            .state('frontend.giftvoucher', {
                url: '/giftvoucher/:voucherId',
                resolve: loadSequence('giftvoucher'),
                templateUrl: 'app/views/giftvoucher.html',
                title: 'Gift Voucher'
            })
            .state('frontend.mypoints', {
                url: '/mypoints',
                resolve: loadSequence('mypoints'),
                templateUrl: 'app/views/mypoints.html',
                title: 'My Points'
            })
            .state('frontend.mypointdetails', {
                url: '/mypointdetails/:pointId',
                resolve: loadSequence('mypointdetails'),
                templateUrl: 'app/views/mypointdetails.html',
                title: 'My Point Details'
            })
            .state('frontend.bidvoucher', {
                url: '/bidvoucher',
                resolve: loadSequence('bidvoucher'),
                templateUrl: 'app/views/bidvoucher.html',
                title: 'Voucher Resell'
            })
            .state('frontend.setting', {
                url: '/setting',
                resolve: loadSequence('setting'),
                templateUrl: 'app/views/setting.html',
                title: 'Setting'
            })
            .state('frontend.vouchersell', {
                url: '/vouchersell/:voucherId',
                resolve: loadSequence('vouchersell'),
                templateUrl: 'app/views/vouchersell.html',
                title: 'Voucher Sell'
            })
            .state('sample', {
                url: '/sample',
                resolve: loadSequence('activation'),
                templateUrl: 'app/views/sample.html',
                title: 'sample'
            })
            .state('frontend.feedback', {
                url: '/feedback',
                resolve: loadSequence('feedback'),
                templateUrl: 'app/views/feedback.html',
                title: 'Feedback'
            })
            .state('frontend.preorder', {
                url: '/preorder',
                resolve: loadSequence('preorder'),
                templateUrl: 'app/views/preorder.html',
                title: 'Pre-Order'
            })
            .state('frontend.queuing', {
                url: '/queuing',
                resolve: loadSequence('queuing'),
                templateUrl: 'app/views/queuing.html',
                title: 'Merchant-queuing'
            })
            .state('frontend.merchantmembership', {
                url: '/merchant-membership/:v_id/:id/:res_id?',
                resolve: loadSequence('merchantmembership','merchantheader','merchantleftbar'),
                templateUrl: 'app/views/merchantmembership.html',
                title: 'Merchant-membership'
            })
            .state('frontend.websitemenus', {
                url: '/websitemenus/:v_id/:id/:res_id?',
                resolve: loadSequence('websitemenus','merchantheader','merchantleftbar'),
                templateUrl: 'app/views/websitemenus.html',
                title: 'Merchant-membership'
            })
            .state('frontend.websitefeatureds', {
                url: '/websitefeatureds/:v_id/:id/:res_id?',
                resolve: loadSequence('websitefeatureds','merchantheader','merchantleftbar'),
                templateUrl: 'app/views/websitefeatureds.html',
                title: 'Merchant-membership'
            })
            .state('frontend.websiteabout', {
                url: '/websiteabout/:v_id/:id/:res_id?',
                resolve: loadSequence('websiteabout','merchantheader','merchantleftbar','ngMap'),
                templateUrl: 'app/views/websiteabout.html',
                title: 'Merchant-membership'
            })
            .state('frontend.websitenews', {
                url: '/websitenews/:v_id/:id/:res_id?',
                resolve: loadSequence('websitenews','merchantheader','merchantleftbar'),
                templateUrl: 'app/views/websitenews.html',
                title: 'Merchant-membership'
            })
            .state('frontend.merchantmemberinfo', {
                url: '/merchantmemberinfo/:v_id/:id/:res_id?',
                resolve: loadSequence('merchantmemberinfo','merchantheader','merchantleftbar'),
                templateUrl: 'app/views/websitememberinfo.html',
                title: 'Merchant-membership'
            })
            .state('frontend.websitepromos', {
                url: '/websitepromos/:v_id/:id/:res_id?',
                resolve: loadSequence('websitepromos','merchantheader','merchantleftbar'),
                templateUrl: 'app/views/websitepromos.html',
                title: 'Merchant-membership'
            })
            .state('frontend.promotionresults', {
                url: '/promotion-results',
                resolve: loadSequence('promotionresults'),
                templateUrl: 'app/views/promotionresults.html',
                title: 'Promotion Results'
            })
            .state('frontend.cms', {
                url: '/cms/:pageName',
                resolve: loadSequence('cms','ngMap'),
                templateUrl: 'app/views/cms.html',
                title: 'Pages'
            })
            .state('admin', {
                url: '/admin',
                templateUrl: 'app/views/admin/adminbase.html',
                abstract :true,
                resolve: loadSequence('admin','datatables','cgNotify'),
            })
            .state('admin.index', {
                url: '/home',
                templateUrl: 'app/views/admin/home.html',
                title: 'Home'
            })
            .state('admin.categorylist', {
                url: '/categorylist',
                templateUrl: 'app/views/admin/categorylist.html',
                title: 'Category List',
                resolve: loadSequence('categorylist','naif.base64')
            })
            .state('admin.newslist', {
                url: '/newslist',
                templateUrl: 'app/views/admin/newslist.html',
                title: 'News List',
                resolve: loadSequence('newslist','ngCkeditor','naif.base64','ng-bootstrap-datepicker')
            })
            .state('admin.iconlist', {
                url: '/iconlist',
                templateUrl: 'app/views/admin/iconlist.html',
                title: 'Icon List',
                resolve: loadSequence('iconlist','naif.base64')
            })
            .state('admin.locationlist', {
                url: '/location',
                templateUrl: 'app/views/admin/locationlist.html',
                title: 'Location List',
                resolve: loadSequence('locationlist')
            })
            .state('admin.resturantlist', {
                url: '/resturantlist',
                templateUrl: 'app/views/admin/resturantlist.html',
                title: 'Resturant List',
                resolve: loadSequence('resturantlist','naif.base64','ngCkeditor')
            })
            .state('admin.resturantedit', {
                url: '/resturantedit/:resturantId',
                templateUrl: 'app/views/admin/resturantedit.html',
                title: 'Resturant Edit',
                resolve: loadSequence('resturantedit','naif.base64','ngCkeditor')
            })
            .state('admin.outletlist', {
                url: '/outletlist/:resturantId',
                templateUrl: 'app/views/admin/outletlist.html',
                title: 'Outlet List',
                resolve: loadSequence('outletlist','naif.base64','ngMap','ngmapautocomplete')
            })
            .state('admin.outletedit', {
                url: '/outletedit/:outletId',
                templateUrl: 'app/views/admin/outletedit.html',
                title: 'Outlet Edit',
                resolve: loadSequence('outletedit','naif.base64','ngMap')
            })
            .state('admin.promolist', {
                url: '/promolist/:resturantId',
                templateUrl: 'app/views/admin/promolist.html',
                title: 'Promo List',
                resolve: loadSequence('promolist','naif.base64','ngMap','ngmapautocomplete','ngCkeditor','ng-bootstrap-datepicker')
            })
            .state('admin.promoedit', {
                url: '/promoedit/:promoId/:restaurantId',
                templateUrl: 'app/views/admin/promoedit.html',
                title: 'Promo Edit',
                resolve: loadSequence('promoedit','naif.base64','ngMap','ngCkeditor','ng-bootstrap-datepicker')
            })
            .state('admin.merchantlist', {
                url: '/merchantlist',
                templateUrl: 'app/views/admin/merchantlist.html',
                title: 'Merchant List',
                resolve: loadSequence('merchantlist','naif.base64','ngCkeditor')
            })
            .state('admin.merchantedit', {
                url: '/merchantedit/:merchantId',
                templateUrl: 'app/views/admin/merchantedit.html',
                title: 'Merchant Edit',
                resolve: loadSequence('merchantedit','naif.base64','ngMap','ngCkeditor')
            })
            .state('admin.memberlist', {
                url: '/memberlist',
                templateUrl: 'app/views/admin/memberlist.html',
                title: 'Member List',
                resolve: loadSequence('memberlist','naif.base64','ngMap','ngmapautocomplete','ngCkeditor')
            })
            .state('admin.voucherofmember', {
                url: '/voucherofmember/:memberId',
                templateUrl: 'app/views/admin/voucherofmember.html',
                title: 'Voucher Member List',
                resolve: loadSequence('voucherofmember','naif.base64','ngMap','ngmapautocomplete','ngCkeditor')
            })
            .state('admin.memberedit', {
                url: '/memberedit/:memberId',
                templateUrl: 'app/views/admin/memberedit.html',
                title: 'Member Edit',
                resolve: loadSequence('memberedit','naif.base64','ngMap','ngCkeditor')
            })
            .state('admin.settings', {
                url: '/settings',
                templateUrl: 'app/views/admin/settings.html',
                title: 'Site Settings',
                resolve: loadSequence('settings')
            })
            .state('admin.promomasterlist', {
                url: '/promomasterlist',
                templateUrl: 'app/views/admin/promomasterlist.html',
                title: 'Promo',
                resolve: loadSequence('promomasterlist','naif.base64','ngMap','ngmapautocomplete','ngCkeditor','ng-bootstrap-datepicker','ui.timepicker')
            })
            .state('admin.promomasterimage', {
                url: '/promomasterimage/:promoId',
                templateUrl: 'app/views/admin/promomasterimage.html',
                title: 'Promo',
                resolve: loadSequence('promomasterimage','naif.base64')
            })
            .state('admin.pointmasterlist', {
                url: '/pointmasterlist',
                templateUrl: 'app/views/admin/pointmasterlist.html',
                title: 'Points Master',
                resolve: loadSequence('pointmasterlist','ng-bootstrap-datepicker')
            })
            .state('admin.blogsmasterlist', {
                url: '/blogsmasterlist',
                templateUrl: 'app/views/admin/blogsmasterlist.html',
                title: 'Points Master',
                resolve: loadSequence('blogsmasterlist','naif.base64','ngCkeditor')
            })
            .state('admin.banner', {
                url: '/banner',
                templateUrl: 'app/views/admin/banner.html',
                title: 'Banner',
                resolve: loadSequence('banner','naif.base64','ngMap','ngmapautocomplete','ngCkeditor','ng-bootstrap-datepicker')
            })
            .state('admin.banneredit', {
                url: '/banneredit/:bannerId',
                templateUrl: 'app/views/admin/banneredit.html',
                title: 'Banner Edit',
                resolve: loadSequence('banneredit','naif.base64','ngMap','ngmapautocomplete','ngCkeditor','ng-bootstrap-datepicker')
            })
            .state('admin.advertisementmanagement', {
                url: '/advertisementmanagement',
                templateUrl: 'app/views/admin/advertisement.html',
                title: 'Advertisement',
                resolve: loadSequence('advertisement','naif.base64','ngMap','ngmapautocomplete','ngCkeditor','ng-bootstrap-datepicker')
            })
            .state('admin.advertisementedit', {
                url: '/advertisementedit/:addvertiseId',
                templateUrl: 'app/views/admin/advertisementedit.html',
                title: 'Advertisement Edit',
                resolve: loadSequence('advertisementedit','naif.base64','ngMap','ngmapautocomplete','ngCkeditor','ng-bootstrap-datepicker')
            })
            .state('admin.promomasteredit', {
                url: '/promomasteredit/:promoId',
                templateUrl: 'app/views/admin/promomasteredit.html',
                title: 'Promo Edit',
                resolve: loadSequence('promomasteredit','naif.base64','ngMap','ngCkeditor','ng-bootstrap-datepicker','ui.timepicker')
            })
            .state('adminlogin', {
                url: '/adminlogin',
                template: '<div ui-view ></div>',
                abstract :true,
                resolve: loadSequence('admin')
            })
            .state('adminlogin.signin', {
                url: '/signin',
                templateUrl: 'app/views/admin/login.html',
                resolve: loadSequence('adminlogin'),
                title: 'Login'
            })
            .state('admin.emailtemplate', {
                url: '/emailtemplate',
                templateUrl: 'app/views/admin/emailtemplate.html',
                title: 'Emial Template',
                resolve: loadSequence('emailtemplate','ngCkeditor')
            })
            .state('admin.smsmgmt', {
                url: '/smsmgmt',
                templateUrl: 'app/views/admin/smsmgmt.html',
                title: 'SMS Management',
                resolve: loadSequence('smsmgmt')
            })
            .state('merchant', {
                url: '/merchant',
                templateUrl: 'app/views/merchant/merchantbase.html',
                abstract :true,
                resolve: loadSequence('merchanthome'),

            })
            .state('merchant.login', {
                url: '/login',
                templateUrl: 'app/views/merchant/merchantlogin.html',
                resolve: loadSequence('merchantlogin'),

            })
            .state('frontend.merchantprofile', {
                url: '/merchantprofile',
                resolve: loadSequence('merchantprofile'),
                templateUrl: 'app/views/merchant/merchantprofile.html',
                title: 'Merchant Profile'
            })
            .state('frontend.merchantoffer', {
                url: '/merchantoffer',
                resolve: loadSequence('merchantoffer'),
                templateUrl: 'app/views/merchant/merchantoffer.html',
                title: 'My Offer'
            })
            .state('frontend.merchantaddoffer', {
                url: '/merchantaddoffer',
                resolve: loadSequence('merchantaddoffer'),
                templateUrl: 'app/views/merchant/merchantaddoffer.html',
                title: 'Add Offer'
            })
            .state('frontend.merchantofferdetail', {
                url: '/merchantofferdetail/:offerId',
                resolve: loadSequence('merchantofferdetail'),
                templateUrl: 'app/views/merchant/merchantofferdetail.html',
                title: 'Offer Detail'
            })
            .state('frontend.merchantaddmember', {
                url: '/addmember',
                resolve: loadSequence('merchantaddmember'),
                templateUrl: 'app/views/merchant/merchantaddmember.html',
                title: 'Add Member'
            })
            .state('frontend.merchantmenu', {
                url: '/merchantmenu',
                resolve: loadSequence('merchantmenu'),
                templateUrl: 'app/views/merchant/merchantmenu.html',
                title: 'Menu'
            })
            .state('frontend.merchantmenucategories', {
                url: '/merchantmenucategories',
                resolve: loadSequence('merchantmenucategories'),
                templateUrl: 'app/views/merchant/merchantmenucategories.html',
                title: 'Menu'
            })
            .state('frontend.purchasedmembrship', {
                url: '/purchasedmembrship',
                resolve: loadSequence('purchasedmembrship'),
                templateUrl: 'app/views/merchant/purchasedmembrship.html',
                title: 'Menu'
            })
            .state('frontend.merchantmembershiplist', {
                url: '/merchantmembershiplist',
                resolve: loadSequence('merchantmembershiplist'),
                templateUrl: 'app/views/merchant/merchantmembershiplist.html',
                title: 'Menu'
            })
            .state('frontend.merchantoutlets', {
                url: '/merchantoutlets',
                resolve: loadSequence('merchantoutlets','ngMap'),
                templateUrl: 'app/views/merchant/merchantoutlets.html',
                title: 'Outlets'
            })
            .state('frontend.merchantrestaurants', {
                url: '/merchantrestaurants',
                resolve: loadSequence('merchantrestaurants'),
                templateUrl: 'app/views/merchant/merchanrestaurants.html',
                title: 'Restaurants'
            })
            .state('frontend.voucher', {
                url: '/voucher',
                resolve: loadSequence('voucher','mn'),
                templateUrl: 'app/views/voucher.html',
                title: 'Voucher'
            })
            .state('frontend.membership', {
                url: '/membership',
                resolve: loadSequence('membership','mn'),
                templateUrl: 'app/views/membership.html',
                title: 'Membership'
            })
            .state('frontend.marketplace', {
                url: '/marketplace',
                resolve: loadSequence('marketplace','mn'),
                templateUrl: 'app/views/marketplace.html',
                title: 'Marketplace'
            })
            .state('frontend.news', {
                url: '/news',
                resolve: loadSequence('news'),
                templateUrl: 'app/views/news.html',
                title: 'News'
            })
            .state('frontend.promodetails', {
                url: '/promodetails/:promoId',
                resolve: loadSequence('promodetails','ngMap','mCart','720kb.socialshare'),
                templateUrl: 'app/views/promodetails.html',
                title: 'Promo Detail'
            })
            .state('frontend.refinerestaurent', {
                url: '/refinerestaurent/:categoryId',
                resolve: loadSequence('refinerestaurent'),
                templateUrl: 'app/views/refinerestaurent.html',
                title: 'Restaurent'
            })
            .state('frontend.restaurentpromo', {
                url: '/restaurentpromo/:restaurantId',
                resolve: loadSequence('restaurentpromo'),
                templateUrl: 'app/views/restaurentpromo.html',
                title: 'Restaurent Promo'
            })
            .state('frontend.voucherdetailforall', {
                url: '/sellvoucherdetail/:voucherId/:sellId',
                resolve: loadSequence('voucherdetailforall'),
                templateUrl: 'app/views/voucherdetailforall.html',
                title: 'Voucher Detail'
            })
            .state('frontend.payment_return',{
                url:'/payment_return?success&paymentId&token&PayerID',
                resolve: loadSequence('paymentreturnCtrl'),
                templateUrl:'app/views/payment_return.html',
                title: 'Please Wait...'
            })
            .state('frontend.acceptswap', {
                url: '/acceptswap/:siid',
                resolve: loadSequence('acceptswap'),
                templateUrl: 'app/views/acceptswap.html',
                title: 'swap'
            })
            .state('frontend.newsdetail', {
                url: '/newsdetail/:newsId',
                resolve: loadSequence('newsdetail'),
                templateUrl: 'app/views/newsdetail.html',
                title: 'News Detail'
            })
            .state('frontend.bannerdetail', {
                url: '/bannerdetail/:bannerId',
                resolve: loadSequence('bannerdetail'),
                templateUrl: 'app/views/bannerdetail.html',
                title: 'Banner Detail'
            })
            .state('frontend.advertisedetail', {
                url: '/advertisedetail/:advertiseId',
                resolve: loadSequence('advertisedetail'),
                templateUrl: 'app/views/advertisedetail.html',
                title: 'Advertise Detail'
            })
            .state('frontend.template', {
                url: '/template',
                resolve: loadSequence('template'),
                templateUrl: 'app/views/template.html',
                title: 'Event Templates'
            })
            .state('frontend.myevent', {
                url: '/myevent',
                resolve: loadSequence('myevent'),
                templateUrl: 'app/views/myevent.html',
                title: 'My Events'
            })
            .state('frontend.eventimage', {
                url: '/eventimage/:eventId',
                resolve: loadSequence('eventimage'),
                templateUrl: 'app/views/eventimage.html',
                title: 'Event Images'
            })
            .state('frontend.eventdetail', {
                url: '/eventdetail/:eventId',
                resolve: loadSequence('eventdetail'),
                templateUrl: 'app/views/eventdetail.html',
                title: 'Event Detail'
            })
            .state('frontend.eventofferdetail', {
                url: '/eventofferdetail/:eventId',
                resolve: loadSequence('eventofferdetail'),
                templateUrl: 'app/views/eventofferdetail.html',
                title: 'Event Detail'
            })
            .state('frontend.eventbidder', {
                url: '/eventbidder/:eventId',
                resolve: loadSequence('eventbidder'),
                templateUrl: 'app/views/eventbidder.html',
                title: 'Event Bidder'
            })
            .state('frontend.merchantevent', {
                url: '/merchantevent',
                resolve: loadSequence('merchantevent'),
                templateUrl: 'app/views/merchant/merchantevent.html',
                title: 'Event'
            })
            .state('frontend.eventbid', {
                url: '/eventbid/:eventId',
                resolve: loadSequence('merchanteventbid'),
                templateUrl: 'app/views/merchant/merchanteventbid.html',
                title: 'Event Bid'
            })
            .state('frontend.searchresult', {
                url: '/searchresult?keyword&category&sort_field&sort_by&page&lines',
                resolve: loadSequence('searchresult'),
                templateUrl: 'app/views/searchresult.html',
                title: 'Search Result'
            })
            .state('frontend.swapallvoucherdetail', {
                url: '/swapallvoucherdetail/:voucherId',
                resolve: loadSequence('swapallvoucherdetail'),
                templateUrl: 'app/views/swapallvoucherdetail.html',
                title: 'Voucher Detail'
            })
            .state('frontend.paymentVoucher', {
                url: '/paymentVoucher',
                resolve: loadSequence('paymentVoucher','mn'),
                templateUrl: 'app/views/paymentVoucher.html',
                title: 'Payment Voucher Detail'
            })
            .state('frontend.cartpage', {
                url: '/cartpage',
                resolve: loadSequence('cartpage','ngMap','mCart'),
                templateUrl: 'app/views/cartpage.html',
                title: 'Promo Detail'
            })
            .state('frontend.addswapvoucher', {
                url: '/addswapvoucher/:voucherId/:offerId',
                resolve: loadSequence('addswapvoucher'),
                templateUrl: 'app/views/addswapvoucher.html',
                title: 'Swap Voucher'
            })
            .state('frontend.swapinterestededit', {
                url: '/swapinterestededit/:siid/:swapId',
                resolve: loadSequence('swapinterestededit'),
                templateUrl: 'app/views/swapinterestededit.html',
                title: 'Edit Swap Bid'
            })
            .state('admin.merchantuserlist', {
                url: '/merchantuserlist/:userId',
                resolve: loadSequence('merchantuserlist'),
                templateUrl: 'app/views/admin/merchantuserlist.html',
                title: 'Merchant User Login'
            })
            .state('frontend.merchantnews', {
                url: '/merchantnews',
                resolve: loadSequence('merchantnews'),
                templateUrl: 'app/views/merchant/merchantnews.html',
                title: 'News'
            })
            .state('frontend.merchantdashboard', {
                url: '/merchantdashboard',
                resolve: loadSequence('merchantdashboard'),
                templateUrl: 'app/views/merchant/merchantdashboard.html',
                title: 'Dashboard'
            })
            .state('frontend.myeventtemplate', {
                url: '/myeventtemplate',
                resolve: loadSequence('myeventtemplate'),
                templateUrl: 'app/views/merchant/myeventtemplate.html',
                title: 'My Event Template'
            })
            .state('frontend.eventtemplateimage', {
                url: '/eventtemplateimage/:eventTemplateId',
                resolve: loadSequence('eventtemplateimage'),
                templateUrl: 'app/views/merchant/eventtemplateimage.html',
                title: 'Event Template Images'
            })
            .state('frontend.eventbiddetail', {
                url: '/eventbiddetail/:eventBidId',
                resolve: loadSequence('eventbiddetail','ngMap','mCart','720kb.socialshare'),
                templateUrl: 'app/views/eventbiddetail.html',
                title: 'Event Bid Detail'
            })
            .state('frontend.merchantredeem', {
                url: '/merchantredeem',
                resolve: loadSequence('merchantredeem'),
                templateUrl: 'app/views/merchant/merchantredeem.html',
                title: 'Merchanr Redeem'
            })


        ;



























        function loadSequence() {
            var _args = arguments;
            return {
                deps: ['$ocLazyLoad', '$q',
                    function ($ocLL, $q) {
                        var promise = $q.when(1);
                        for (var i = 0, len = _args.length; i < len; i++) {
                            promise = promiseThen(_args[i]);
                        }
                        return promise;

                        function promiseThen(_arg) {
                            if (typeof _arg == 'function')
                                return promise.then(_arg);
                            else
                                return promise.then(function () {
                                    var nowLoad = requiredData(_arg);
                                    if (!nowLoad)
                                        return $.error('Route resolve: Bad resource name [' + _arg + ']');
                                    return $ocLL.load(nowLoad);
                                });
                        }

                        function requiredData(name) {
                            if (jsRequires.modules)
                                for (var m in jsRequires.modules)
                                    if (jsRequires.modules[m].name && jsRequires.modules[m].name === name)
                                        return jsRequires.modules[m];
                            return jsRequires.scripts && jsRequires.scripts[name];
                        }
                    }]
            };
        }

  }]);
