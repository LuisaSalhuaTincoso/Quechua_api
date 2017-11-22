(function () {

    angular.module('BlogINPApp', ['ngRoute']); //ngRouter: se agrega la dependencia del modulo router

    function config ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'inicio/inicio.view.html',
                controller: 'inicioCtrl',
                controllerAs: 'vm'
            })

            .otherwise({redirectTo: '/'});
        //$locationProvider.html5Mode(true);//ENCENDEMOS CARACTERISTICAS DE HTML5

    };

    angular
        .module('BlogINPApp')
        .config(['$routeProvider', config]);

})();
