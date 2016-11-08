'use strict';

/**
 * Config constant
 */
app.constant('APP_MEDIAQUERY', {
    'desktopXL': 1200,
    'desktop': 992,
    'tablet': 768,
    'mobile': 480
}); 
app.constant('JS_REQUIRES', {
    //*** Scripts
    scripts: {
        'devExtremeJS':['app/assets/js/globalize.min.js','app/assets/js/dx.chartjs.js','http://cdn3.devexpress.com/jslib/14.1.3/js/dx.all.js','app/assets/js/vectormap-data/world.js',
        'app/assets/js/vectormap-data/africa.js','app/assets/js/vectormap-data/canada.js','app/assets/js/vectormap-data/eurasia.js','app/assets/js/vectormap-data/europe.js','app/assets/js/vectormap-data/usa.js',
        'app/assets/scripts/date.js'],
        'devExtremeCSS':['app/assets/css/reset.css','app/assets/css/dx.common.css','app/assets/css/dx.light.css'],
        'home':['app/Controllers/homeCtrl.js','app/directives/countdownDirective.js'],
        'login':['app/Controllers/loginCtrl.js'],
        'register':['app/Controllers/registerCtrl.js'],
        'activation':['app/Controllers/activationCtrl.js'],
        'dashboard':['app/Controllers/dashboardCtrl.js','app/Controllers/leftbarCtrl.js'],
        'profile':['app/Controllers/profileCtrl.js','app/Controllers/leftbarCtrl.js'],
        'changepassword':['app/Controllers/changepasswordCtrl.js','app/Controllers/leftbarCtrl.js'],
        'sample':['app/Controllers/sampleCtrl.js'],
        'allvoucher':['app/Controllers/allvoucherCtrl.js','app/Controllers/leftbarCtrl.js'],
        'bidderlist':['app/Controllers/bidderlistCtrl.js','app/Controllers/leftbarCtrl.js'],
        'swapbidderlist':['app/Controllers/swapbidderlistCtrl.js','app/Controllers/leftbarCtrl.js'],
        'setting':['app/Controllers/settingCtrl.js','app/Controllers/leftbarCtrl.js'],
        'giftvoucher':['app/Controllers/giftvoucherCtrl.js','app/Controllers/leftbarCtrl.js'],
        'mypoints':['app/Controllers/mypointsCtrl.js','app/Controllers/leftbarCtrl.js'],
        'mypointdetails':['app/Controllers/mypointsdetailsCtrl.js','app/Controllers/leftbarCtrl.js'],
        'voucherdetail':['app/Controllers/voucherdetailCtrl.js','app/Controllers/leftbarCtrl.js'],
        'vouchersell':['app/Controllers/vouchersellCtrl.js','app/Controllers/leftbarCtrl.js'],
        'bidvoucher':['app/Controllers/bidvoucherCtrl.js','app/Controllers/leftbarCtrl.js'],
        'editbid':['app/Controllers/editbidCtrl.js','app/Controllers/leftbarCtrl.js'],
        'feedback':['app/Controllers/feedbackCtrl.js','app/Controllers/leftbarCtrl.js'],
        'preorder':['app/Controllers/preorderCtrl.js','app/Controllers/leftbarCtrl.js'],
        'queuing':['app/Controllers/queuingCtrl.js','app/Controllers/leftbarCtrl.js'],
        'merchantmembership':['app/Controllers/merchantmembershipCtrl.js'],
        'news':['app/Controllers/newsCtrl.js'],
        'admin':['http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css','app/assets/admin/css/style.css','app/assets/admin/css/style-responsive.css','app/assets/admin/js/bootstrap.min.js','app/assets/admin/js/jquery.nicescroll.js','app/assets/admin/js/jquery-migrate-1.2.1.min.js','app/assets/admin/js/jquery-ui-1.9.2.custom.min.js'
            ,'app/assets/admin/js/modernizr.min.js','app/assets/admin/js/scripts.js','app/Controllers/admin/headerCtrl.js','app/Controllers/admin/leftbarCtrl.js',"app/directives/datatableDirective.js"],
        'frontend':["app/assets/css/site.css","app/assets/css/reset.css"],
        'adminlogin':['app/Controllers/admin/loginCtrl.js'],
        'newslist':['app/Controllers/admin/newslistCtrl.js'],
        'iconlist':['app/Controllers/admin/iconlistCtrl.js'],
        'categorylist':['app/Controllers/admin/categorylistCtrl.js'],
        'locationlist':['app/Controllers/admin/locationlistCtrl.js'],
        'resturantlist':['app/Controllers/admin/resturantlistCtrl.js'],
        'resturantedit':['app/Controllers/admin/resturanteditCtrl.js'],
        'outletlist':['app/Controllers/admin/outletlistCtrl.js'],
        'outletedit':['app/Controllers/admin/outleteditCtrl.js'],
        'promolist':['app/Controllers/admin/promolistCtrl.js'],
        'promoedit':['app/Controllers/admin/promoeditCtrl.js'],
        'emailtemplate':['app/Controllers/admin/emailtemplateCtrl.js'],
        'smsmgmt':['app/Controllers/admin/smsmgmtCtrl.js'],
       //  'merchantlist':['app/Controllers/admin/merchantlistCtrl.js'],
        'merchantlist':['app/Controllers/admin/merchantlistCtrl.js'],
        'merchantedit':['app/Controllers/admin/merchanteditCtrl.js'],
        'memberlist':['app/Controllers/admin/memberlistCtrl.js'],
        'voucherofmember':['app/Controllers/admin/voucherofmemberCtrl.js'],
        'memberedit':['app/Controllers/admin/membereditCtrl.js'],
        'settings':['app/Controllers/admin/settingsCtrl.js'],
        'promomasterlist':['app/Controllers/admin/promomasterlistCtrl.js'],
        'promomasterimage':['app/Controllers/admin/promomasterimageCtrl.js'],
        'pointmasterlist':['app/Controllers/admin/pointmasterlistCtrl.js'],
        'blogsmasterlist':['app/Controllers/admin/blogsmasterlistCtrl.js'],
        'banner':['app/Controllers/admin/bannerCtrl.js'],
        'banneredit':['app/Controllers/admin/bannereditCtrl.js'],
        'advertisement':['app/Controllers/admin/advertisementCtrl.js'],
        'advertisementedit':['app/Controllers/admin/advertisementeditCtrl.js'],
        'promomasteredit':['app/Controllers/admin/promomastereditCtrl.js'],
        'merchanthome':['app/Controllers/merchanthomeCtrl.js'],
        'merchantlogin':['app/Controllers/merchantloginCtrl.js'],
        'marketplace':['app/Controllers/marketplaceCtrl.js','app/directives/countdownDirective.js'],
        'merchantprofile':['app/Controllers/merchantprofileCtrl.js','app/Controllers/leftbarCtrl.js'],
        'merchantoffer':['app/Controllers/merchantofferCtrl.js','app/Controllers/leftbarCtrl.js'],
        'merchantaddoffer':['app/Controllers/merchantaddofferCtrl.js','app/Controllers/leftbarCtrl.js'],
        'merchantofferdetail':['app/Controllers/merchantofferdetailCtrl.js','app/Controllers/leftbarCtrl.js'],
        'merchantaddmember':['app/Controllers/merchantaddmemberCtrl.js','app/Controllers/leftbarCtrl.js'],
        'merchantmenu':['app/Controllers/merchantmenuCtrl.js','app/Controllers/leftbarCtrl.js'],
        'merchantmenucategories':['app/Controllers/merchantmenucategoriesCtrl.js','app/Controllers/leftbarCtrl.js'],
        'purchasedmembrship':['app/Controllers/purchasedmembrshipCtrl.js','app/Controllers/leftbarCtrl.js'],
        'merchantoutlets':['app/Controllers/merchantoutletsCtrl.js','app/Controllers/leftbarCtrl.js'],
        'merchantrestaurants':['app/Controllers/merchantrestaurantsCtrl.js','app/Controllers/leftbarCtrl.js'],
        'merchantnews':['app/Controllers/merchantnewsCtrl.js','app/Controllers/leftbarCtrl.js'],
        'cms':['app/Controllers/cmsCtrl.js'],
        'refinerestaurent':['app/Controllers/refinerestaurentCtrl.js'],
        'footer':["app/Controllers/footerCtrl.js"],
        'restaurentpromo':['app/Controllers/restaurentpromoCtrl.js','app/directives/countdownDirective.js'],
        'promodetails':['app/Controllers/promodetailsCtrl.js','app/directives/countdownDirective.js'],
        'voucherdetailforall':['app/Controllers/voucherdetailforallCtrl.js'],
        'paymentreturnCtrl':['app/Controllers/paymentreturnCtrl.js'],
        'voucher':['app/Controllers/voucherCtrl.js'],
        'mymembership':['app/Controllers/mymembershipCtrl.js','app/Controllers/leftbarCtrl.js'],
        'membershipdetail':['app/Controllers/membershipdetailCtrl.js','app/Controllers/leftbarCtrl.js'],
        'swapvoucher':['app/Controllers/swapvoucherCtrl.js','app/Controllers/leftbarCtrl.js'],
        'giftvoucherlist':['app/Controllers/giftvoucherlistCtrl.js','app/Controllers/leftbarCtrl.js'],
        'swapvoucherdetail':['app/Controllers/swapvoucherdetailCtrl.js','app/Controllers/leftbarCtrl.js','app/directives/countdownDirective.js'],
        'swapinterested':['app/Controllers/swapinterestedCtrl.js','app/Controllers/leftbarCtrl.js'],
        'acceptswap':['app/Controllers/acceptswapCtrl.js'],
        'resellvoucherdetail':['app/Controllers/resellvoucherdetailCtrl.js','app/directives/countdownDirective.js'],
        'newsdetail':['app/Controllers/newsdetailCtrl.js'],
        'bannerdetail':['app/Controllers/bannerdetailCtrl.js'],
        'advertisedetail':['app/Controllers/advertisedetailCtrl.js'],
        'membership':['app/Controllers/membershipCtrl.js'],
        'myevent':['app/Controllers/myeventCtrl.js','app/Controllers/leftbarCtrl.js'],
        'myeventtemplate':['app/Controllers/merchant/myeventtemplateCtrl.js','app/Controllers/leftbarCtrl.js'],
        'eventimage':['app/Controllers/eventimageCtrl.js','app/Controllers/leftbarCtrl.js'],
        'eventtemplateimage':['app/Controllers/merchant/eventtemplateimageCtrl.js','app/Controllers/leftbarCtrl.js'],
        'eventdetail':['app/Controllers/eventdetailCtrl.js','app/Controllers/leftbarCtrl.js'],
        'eventofferdetail':['app/Controllers/eventofferdetailCtrl.js'],
        'eventbidder':['app/Controllers/eventbidderCtrl.js','app/Controllers/leftbarCtrl.js'],
        'merchantevent':['app/Controllers/merchanteventCtrl.js','app/Controllers/leftbarCtrl.js'],
        'merchanteventbid':['app/Controllers/merchanteventbidCtrl.js','app/Controllers/leftbarCtrl.js'],
        'ngmapautocomplete':['bower_components/ngmap/directives/places-auto-complete.js'],
        'searchresult':['app/Controllers/searchresultCtrl.js'],
        'swapallvoucherdetail':['app/Controllers/swapallvoucherdetailCtrl.js'],
        'paymentVoucher':['app/Controllers/paymentVoucherCtrl.js'],
        'cartpage':['app/Controllers/cartpageCtrl.js','app/Controllers/leftbarCtrl.js'],
        'merchantmembershiplist':['app/Controllers/merchantmembershiplistCtrl.js','app/Controllers/leftbarCtrl.js'],
        'addswapvoucher':['app/Controllers/addswapvoucherCtrl.js','app/Controllers/leftbarCtrl.js'],
        'swapinterestededit':['app/Controllers/swapinterestededitCtrl.js','app/Controllers/leftbarCtrl.js'],
        'humanize':['bower_components/humanize-duration/humanize-duration.js'],
        'merchantuserlist':['app/Controllers/admin/merchantuserlistCtrl.js'],
        'owlCaraousl':['http://www.owlcarousel.owlgraphic.com/assets/owlcarousel/assets/owl.carousel.min.css','http://www.owlcarousel.owlgraphic.com/assets/owlcarousel/owl.carousel.js'],
        'merchantheader':['app/Controllers/merchant/merchantheaderCtrl.js'],
        'websitemenus':['app/Controllers/websitemenusCtrl.js'],
        'websitefeatureds':['app/Controllers/websitefeaturedsCtrl.js'],
        'websiteabout':['app/Controllers/websiteaboutCtrl.js'],
        'merchantleftbar':['app/Controllers/merchant/merchantleftbarCtrl.js'],
        'websitenews':['app/Controllers/websitenewsCtrl.js'],
        'merchantmemberinfo':['app/Controllers/merchantmemberinfoCtrl.js'],
        'websitepromos':['app/Controllers/websitepromosCtrl.js','app/directives/countdownDirective.js'],
        'merchantdashboard':['app/Controllers/merchant/merchantdashboardCtrl.js','app/Controllers/leftbarCtrl.js'],
        'eventbiddetail':['app/Controllers/eventbiddetailsCtrl.js','app/directives/countdownDirective.js'],
        'merchantredeem':['app/Controllers/merchant/merchantredeemCtrl.js','app/Controllers/leftbarCtrl.js'],
	   'merchantreport':['app/Controllers/merchant/merchantreportCtrl.js','app/Controllers/leftbarCtrl.js'],

    },

    //*** angularJS Modules

    modules: [{
        name: 'angularMoment',
        files: ['vendor/moment/angular-moment.min.js']
    },
        {
            name: 'mn',
            files: ['bower_components/mn_touch/mn-touch.js']
        },
        {
            name: 'datatables',
            files: ['bower_components/angular-datatables/jquery.dataTables.js','bower_components/angular-datatables/angular-datatables.js','bower_components/angular-datatables/dataTables.bootstrap.css']
        },
        {
            name: 'ngMap',
            files: ['bower_components/ngmap/build/scripts/ng-map.min.js','http://maps.google.com/maps/api/js?libraries=placeses,visualization,drawing,geometry,places']
        },
        {
            name: 'mCart',
            files: ['app/cartFactory.js']
        },
        {
            name: 'ngCkeditor',
            files: ['bower_components/ng-ckeditor/libs/ckeditor/ckeditor.js','bower_components/ng-ckeditor/ng-ckeditor.js','bower_components/ng-ckeditor/ng-ckeditor.css']
        },
        {
            name: 'naif.base64',
            files: ['bower_components/angular-base64-upload/src/angular-base64-upload.js']
        },
        {
            name: 'cgNotify',
            files: ['bower_components/angular-notify/angular-notify.js','bower_components/angular-notify/angular-notify.css']
        },
        {
            name: 'ng-bootstrap-datepicker',
            files: ['bower_components/angular-bootstrap-datepicker.js','bower_components/angular-bootstrap-datepicker.css']
        },
        {
            name: 'timer',
            files: ['bower_components/humanize-duration/humanize-duration.js','bower_components/angular-timer/dist/angular-timer.min.js']
        },
        {
            name: 'ui.timepicker',
            files: ['http://recras.github.io/angular-jquery-timepicker/bower_components/jquery-timepicker-jt/jquery.timepicker.js','http://recras.github.io/angular-jquery-timepicker/javascripts/timepickerdirective.min.js','http://recras.github.io/angular-jquery-timepicker/bower_components/jquery-timepicker-jt/jquery.timepicker.css']
        },
        {
            name: '720kb.socialshare',
            files: ['app/assets/js/angular-socialshare.min.js']
        },
    ]
});
