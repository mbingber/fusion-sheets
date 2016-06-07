app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, $timeout) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope, element) {

            $timeout(function() {
                if($state.is('login')) element.hide();
                else element.show();
            });

            scope.items = [
                { label: 'Invoice Generator', state: 'home.generator' },
                { label: 'Calendar Manager', state: 'home.calendar' },
                { label: 'Main Sheets', state: 'home.main'}
            ];

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.login = function() {
                AuthService.login().then(function() {
                    $state.go('home.generator');
                });
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('login');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});
