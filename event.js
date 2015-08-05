import EventService from './event.service.js';

export default angular.module('jak.event', [])
    .factory('EventService', new EventService)
;