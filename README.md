# Angular Event Dispatcher

Simple Event Dispatcher Service for AngularJS.

## Setup

Installation via bower:

```
bower install --save angular-event-dispatcher
```

Insert the js file in your index.html:

```html
<script src="bower_components/angular-event-dispatcher/dist/angular-event-dispatcher.js"></script>
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
]).run(function(EventDispatcher) {
    EventDispatcher.on('foo', function (arg1) {
        console.log(arg1);  // Will log 'bar'
    });

    EventDispatcher.trigger('foo', 'bar');
});
```

## API

### on(eventName, callback)

Declare an event listener

```javascript
EventDispatcher.on('foo', function (arg1) {
    console.log(arg1);
});
```

### trigger(eventName)

Trigger an event

```javascript
EventDispatcher.trigger('foo', 'bar');
```

### forward(eventName, eventNameToForwardTo)

Forward an event to another

```javascript
EventDispatcher.on('foo', function(arg1) {
    console.log(arg1);  // Will log 'test'
});
EventDispatcher.forward('bar', 'foo');
EventDispatcher.trigger('bar', 'test');    // Will trigger foo event and log 'test'
```

### off(eventName)

Delete an event

```javascript
EventListener.off('foo');   // Delete every 'foo' listeners
```

### reset()

Reset every events

```javascript
EventDispatcher.reset();
```

### Change log level

By default, the EventDispatcher logs every event. If you want to prevent that, you can change the log level (value 'info' by default):

```javascript
EventDispatcher.logger.logLevel = "error";
```

## Contributing

Pull requests are welcome! The library is written in ES6, then transpiled to ES5. Install dev dependencies first: `npm install`

### Launch tests

Tests are written in jasmine. You need node.js installed to run the tests.

`npm test` which launches `node bootstrap-test.js`

### Build

There is a simple build script (`build.js`). To build launch the command:

`npm run build` which launches: `node build.js`

## License

The MIT License (MIT)

Copyright (c) 2015 Emmanuel Payet

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
