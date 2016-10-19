angular
.module("mCart", ["ngCookies"])
.factory("mFoodCart", function ($http, $cookies, $cookieStore, $window) {
  var factobj = {};
  
    


    /******************************** Cart ***********************************/
    //factobj.cart = [];
    factobj.add_to_cart = function(promo){
        //console.log('Promo =============',promo);
        //var cart=$cookieStore.get('cart');
        var cart=JSON.parse(localStorage.getItem('cart'));
        if(cart)
        {
            var found=false;
            angular.forEach(cart,function(val){
                if(val.event == 1) {
                    if (val.event_id == promo.event_id) {
                        found = true;
                    }
                }else{
                    if (val.offer_id == promo.offer_id) {
                        found = true;
                    }
                }
            })
            if(!found)
            {
                cart.push(promo);
            }
        }
        else{
            cart = [];
            cart.push(promo);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        //$cookieStore.put('cart',cart);

    }
    /******************************** Cart ***********************************/

    factobj.get_cart = function(){
        //var cart=$cookieStore.get('cart');
        var cart=JSON.parse(localStorage.getItem('cart'));
        return cart;
    }

        factobj.getCount = function(){
            //var cart=$cookieStore.get('cart');
            var cart=JSON.parse(localStorage.getItem('cart'));
            if(cart)
                return cart.length;
            else
                return 0;
        }

    factobj.update_cart_quantity = function(offer_id,quantity){
        //var cart=$cookieStore.get('cart');
        var cart=JSON.parse(localStorage.getItem('cart'));
        angular.forEach(cart,function(val,key){
            if(val.offer_id == offer_id)
            {
                cart[key].quantity = quantity;
                //found = true;
            }
        })
        //$cookieStore.put('cart',cart);
        localStorage.setItem('cart', JSON.stringify(cart));

    }

    factobj.update_cart_payment = function(offer_id,quantity){
        //var cart=$cookieStore.get('cart');
        var cart=JSON.parse(localStorage.getItem('cart'));
        angular.forEach(cart,function(val,key){
            if(val.offer_id == offer_id)
            {
                if(quantity ==1){
                    cart[key].payments = true;
                }else{
                    cart[key].payments = false;
                }

                //found = true;
            }
        })
        //$cookieStore.put('cart',cart);
        localStorage.setItem('cart', JSON.stringify(cart));

    }

    factobj.update_cart_paymentcash = function(offer_id,quantity){
        //var cart=$cookieStore.get('cart');
        var cart=JSON.parse(localStorage.getItem('cart'));
        angular.forEach(cart,function(val,key){
            if(val.offer_id == offer_id)
            {
                //cart[key].paymentscash = quantity;
                if(quantity ==1){
                    cart[key].paymentscash = true;
                }else{
                    cart[key].paymentscash = false;
                }
                //found = true;
            }
        })
        //$cookieStore.put('cart',cart);
        localStorage.setItem('cart', JSON.stringify(cart));

    }


        factobj.update_cart_previousquantity = function(offer_id,quantity){
        //var cart=$cookieStore.get('cart');
        console.log
        var cart=JSON.parse(localStorage.getItem('cart'));
        angular.forEach(cart,function(val,key){
            if(val.offer_id == offer_id)
            {
                cart[key].previous_quantity = quantity;
                //found = true;
            }
        })
        //$cookieStore.put('cart',cart);
        localStorage.setItem('cart', JSON.stringify(cart));

    }

    factobj.remove = function(offer_id){
        //var cart=$cookieStore.get('cart');
        var cart=JSON.parse(localStorage.getItem('cart'));
        angular.forEach(cart,function(val,key){
            if(val.event == 1){
                if (val.event_id == offer_id) {
                    cart.splice(key, 1);
                    //found = true;
                }
            }else {
                if (val.offer_id == offer_id) {
                    cart.splice(key, 1);
                    //found = true;
                }
            }
        })
        //$cookieStore.put('cart',cart);
        localStorage.setItem('cart', JSON.stringify(cart));

    }

        factobj.resetAndAdd = function(cart)
        {
            //$cookieStore.remove('cart');
            //$cookieStore.put('cart',cart);
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    
    
    return factobj;
    
})
