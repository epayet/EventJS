import EventDispatcher from './EventDispatcher.js';

export default angular.module('angular-event-dispatcher', [])
    .factory('EventDispatcher', () => new EventDispatcher)
;