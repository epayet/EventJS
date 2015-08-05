import EventService from './event.service.js';

export default angular.module('angular-event-dispatcher', [])
    .factory('EventService', new EventService)
;