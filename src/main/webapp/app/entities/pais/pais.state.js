(function() {
    'use strict';

    angular
        .module('vacunasApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('pais', {
            parent: 'entity',
            url: '/pais',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Pais'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/pais/pais.html',
                    controller: 'PaisController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('pais-detail', {
            parent: 'pais',
            url: '/pais/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Pais'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/pais/pais-detail.html',
                    controller: 'PaisDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Pais', function($stateParams, Pais) {
                    return Pais.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'pais',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('pais-detail.edit', {
            parent: 'pais-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pais/pais-dialog.html',
                    controller: 'PaisDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Pais', function(Pais) {
                            return Pais.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('pais.new', {
            parent: 'pais',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pais/pais-dialog.html',
                    controller: 'PaisDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                nombre: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('pais', null, { reload: 'pais' });
                }, function() {
                    $state.go('pais');
                });
            }]
        })
        .state('pais.edit', {
            parent: 'pais',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pais/pais-dialog.html',
                    controller: 'PaisDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Pais', function(Pais) {
                            return Pais.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('pais', null, { reload: 'pais' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('pais.delete', {
            parent: 'pais',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pais/pais-delete-dialog.html',
                    controller: 'PaisDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Pais', function(Pais) {
                            return Pais.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('pais', null, { reload: 'pais' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
