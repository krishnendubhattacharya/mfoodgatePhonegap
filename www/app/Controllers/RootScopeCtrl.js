app.controller("RootScopeCtrl", function($scope) {
    var products = [{
        key: "Televisions",
        items: [
            { text: "Login", price: "$1200", src: "images/products/7.png"  },
            { text: "Register", price: "$1450", src: "images/products/5.png"  },

        ]
    }

    ];
    $scope.data1 = products;
    $scope.menuVisible = false;
    $scope.swipeValue = true;

    $scope.showMenu = function() {
        $scope.menuVisible = !$scope.menuVisible;
    };

    $scope.checkList = function() {
       //alert(12);
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
});
