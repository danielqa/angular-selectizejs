/**
 * Angular Selectize Directive
 */
angular.module('selectize', []).directive('selectize', ['$q', '$timeout', function ($q, $timeout) {
    return {
        restrict: 'A',
        require: 'ngModel',
        priority: 1,
        scope: {
            selectize: '=',
            config: '&',
            options: '&',
            ngDisabled: '='
        },
        link: function (scope, element, attrs, ngModel) {
            if (!ngModel) return;

            var $select, selectize;
            var type = element[0].tagName === 'SELECT' ? (element[0].hasAttribute('multiple') ? 'multi' : 'single') : 'multi';

            var data = scope.options();
            var settings = scope.config();

            var onChange = settings.onChange;
            delete settings.onChange;

            var options = angular.extend({
                delimiter: ',',
                mode: type,
                onInitialize: function () {
                    $timeout(function () {
                        selectize = $select[0].selectize;

                        if (type === 'multi') {
                            selectize.on('change', function (selectizeValue) {
                                var map = [];
                                if (selectizeValue.length) {
                                    map = selectizeValue.split(',').map(function (value) {
                                        var obj = {};
                                        if (isNaN(Number(value))) {
                                            obj[settings.labelField] = value;
                                        } else {
                                            obj[settings.valueField] = value;
                                        }
                                        return obj;
                                    });
                                }
                                ngModel.$setViewValue(map);
                            });
                        }

                        scope.$watch('ngDisabled', function (disabled) {
                            disabled ? selectize.disable() : selectize.enable();
                        });
                    });
                },
                onLoad: function () {
                    $timeout(function () {
                        if (angular.isArray(ngModel.$modelValue)) {
                            ngModel.$modelValue.forEach(function (obj) {
                                selectize.addItem(obj.id, true);
                            });
                        } else {
                            selectize.setValue(ngModel.$modelValue, true);
                        }
                    });
                },
                onChange: function (value) {
                    $timeout(function () {
                        if (onChange) {
                            onChange(value);
                        }
                    });
                }
            }, settings || {});

            scope.selectize = function () {
                var args = Array.prototype.slice.call(arguments);
                var event = args.shift();
                var callback = angular.isFunction(args[args.length - 1]) ? args.pop() : new Function();
                if (angular.isString(event)) {
                    if (angular.isFunction(selectize[event])) { // Methods
                        $timeout(function () {
                            return selectize[event].apply(selectize, args);
                        }).then(function (value) {
                            callback(value);
                        });
                    } else { // Properties
                        return selectize[event];
                    }
                }
            };

            ngModel.$render = function () {
                if (data) {
                    var promise = data.$promise || $q.when(data);
                    promise.then(function (response) {
                        options.options = response.data || response;
                        $select = element.selectize(options);
                        $select[0].selectize.load(function (callback) {
                            callback();
                        });
                    });
                } else {
                    $timeout(function () {
                        $select = element.selectize(options);
                        $select[0].selectize.setValue(ngModel.$modelValue, true);
                    });
                }
            };
        }
    };
}]);