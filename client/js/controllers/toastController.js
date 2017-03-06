angular
.module('app')
.controller('ToastController', ['$scope', '$mdToast', '$mdDialog', 'data',
    function($scope, $mdToast, $mdDialog, data) {
        $scope.data = data;
        $scope.closeToast = function() {
            if (isDlgOpen) return;

            $mdToast
                .hide()
                .then(function () {
                    isDlgOpen = false;
                });
        };

}]);
