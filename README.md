# angular-selectizejs

Component for using [AngularJS](https://angularjs.org/) with [Selectize.js](https://brianreavis.github.io/selectize.js/).


## Install

### Using [Bower](http://bower.io/)

```sh
$ bower install angular-selectizejs
```

### Using [NPM](https://www.npmjs.com/)

```sh
$ npm install angular-selectizejs
```

### Add the module dependency

```javascript
angular.module('myApp', ['selectize']);
```

### Import the dependencies

It's important to import jquery script before angular.

```html
<script src="jquery.js"></script>
<script src="selectize.js"></script>
<script src="angular.js"></script>
<script src="angular-selectize.js"></script>
```

## Usage

### Single Mode

```html
<select selectize="userSelectize" config="userConfig" options="user_options()" ng-model="user.id"></select>
```

### Multiple Mode

```html
<input type="text" selectize="tagsSelectize" config="tagsConfig" options="tags_options()" ng-model="tags" />
```

### Config

```javascript
$scope.userConfig = {
    persist: false,
    selectOnTab: true,
    labelField: 'name',
    valueField: 'id',
    sortField: 'name',
    searchField: 'name'
};
```

### Options

```javascript
$scope.user_options = function() {
    return [
        {id: 1, name: 'The user 1'},
        {id: 2, name: 'The user 2'},
        {id: 3, name: 'The user 3'}
    ];
};
```

or

```javascript
$scope.user_options = function() {
    return $http({method: 'GET', url: 'your-endpoint'});
};
```

or

```javascript
$scope.user_options = function() {
    return $resource('your-endpoint').query();
};
```

### Using your selectize instance

The value of the 'selectize' attribute is the reference to use selectize instance in your controller.

```javascript
$scope.userSelectize('clearOptions');
$scope.userSelectize('addOption', newOptions);
```
