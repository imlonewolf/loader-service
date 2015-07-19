;(function (angular, _) {
    angular.module('EnglishCentralApp')
        .factory('LoaderService', [
            LoaderService
        ]);

    function LoaderService() {
        var Service = {};
        var appNameSpaces = {};

        function Loader() {
            var loaders = [];
            var self = this;

            this.start = function (item) {
                var loader = _.find(loaders, {id: item});
                if (!loader) {
                    loader = {id: item, value: true}
                    loaders.push(loader);
                }
                loader.value = true;
            };

            this.done = function (item) {
                var loader = _.find(loaders, {id: item});
                loader.value = false;
            };

            this.isLoading = function (item) {
                var loader = _.chain(loaders)
                        .filter(function (load) {
                            return _.isEqual(load.value, true);
                        })
                        .first()
                        .value() || {};

                return _.isEqual(loader.id, item);
            };

            this.isLoaded = function () {
                var loadedItemCount = _.filter(loaders, function (load) {
                        return _.isEqual(load.value, true);
                    }).length;
                return _.isEqual(loadedItemCount, 0)
            };

            this.getItems = function () {
                return loaders;
            };
        }

        Service.initializeLoadSet = function (NS) {
            if (_.isUndefined(appNameSpaces[NS])) {
                appNameSpaces[NS] = new Loader();
            }
            return appNameSpaces[NS];
        };

        return Service;
    }
}(window.angular, window._))