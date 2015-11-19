# angular-selectizejs

Component for using AngularJS with [Selectize.js](https://brianreavis.github.io/selectize.js/).


## Install using [Bower](http://bower.io/)

```javascript
bower install angular-selectizejs
```

## Install using [NPM](https://www.npmjs.com/)

```javascript
npm install angular-selectizejs
```

## Add the module dependency

```javascript
angular.module('myApp', ['selectize']);
```


## Usage

### Single Mode

```html
<select class="form-control" selectize="userSelectize" config="userConfig" options="user_options()" ng-model="user.id"></select>
```

### Multiple Mode

```html
<input type="text" class="form-control" selectize="tagsSelectize" config="tagsConfig" options="tags_options()" ng-model="tags" />
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
        {id: 1, title: 'The user 1'},
        {id: 2, title: 'The user 2'},
        {id: 3, title: 'The user 3'}
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

### Using your Selectize instance

The value of the 'selectize' attribute is the reference to use Selectize instance.

```javascript
$scope.userSelectize('clearOptions');
$scope.userSelectize('addOption', newOptions);
```
