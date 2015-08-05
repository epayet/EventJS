# Angular Event Dispatcher

Simple Event Dispatcher Service for AngularJS.

## Setup

Installation via bower:

```
bower install --save angular-event-dispatcher
```

Declare it as a dependency of your angular application:

```javascript
angular.module('myApp', [
    'angular-event-dispatcher'
]);
```

## Quick example

```javascript
angular.module('myApp', [
    'angular-event-dispatcher'
]).run(function(EventService) {
    EventService.on('foo', function (arg1) {
        console.log(arg1);  // Will log 'bar'
    });

    EventService.trigger('foo', 'bar');
});
```

## API

### on(eventName, callback)

Declare an event listener

```javascript
EventService.on('foo', function (arg1) {
    console.log(arg1);
});
```

### trigger(eventName)

Trigger an event

```javascript
EventService.trigger('foo', 'bar');
```

### forward(eventName, eventNameToForwardTo)

Forward an event to another

```javascript
EventService.on('foo', function(arg1) {
    console.log(arg1);  // Will log 'test'
});
EventService.forward('bar', 'foo');
EventService.trigger('bar', 'test');    // Will trigger foo event and log 'test'
```

### off(eventName)

Delete an event

```javascript
EventListener.off('foo');   // Delete every 'foo' events
```

### reset

Reset every events

```javascript
EventService.reset()
```

## Contributing

Pull requests are welcome! The library is written in ES6, then transpiled to ES5. Install dev dependencies first: `npm install`

### Launch tests

Tests are written in jasmine. You need node.js installed to run the tests.

`npm test` which launches `node bootstrap-test.js`

### Build

Browserify with babelify is used (`npm install -g browserify`).

`npm run build` which launches: `browserify src/event.js -t babelify --outfile dist/angular-event-dispatcher.js`

## License
