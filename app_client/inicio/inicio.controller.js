(function () {
    angular
        .module('BlogINPApp')
        .controller('inicioCtrl', inicioCtrl);

    inicioCtrl.$inject = ['$scope', 'BlogINPData'];
    function inicioCtrl ($scope, BlogINPData) {
        var vm = this;
        vm.pageHeader = {
            title: 'Blog',
        };

        BlogINPData.listPostById()
            .success(function(data) {
                vm.message = data.length > 0 ? "" : "No post found nearby";
                vm.data = { posts: data };
                console.log(vm.data);
            })
            .error(function (e) {
                vm.message = "Sorry, something's gone wrong";
            });

    };

})();
