import Logger from './Logger.js';

class EventService {
    constructor() {
        this.listeners = new Map();
        this.eventsRunning = 0;
    }

    on(eventType, callback) {
        if (!this.listeners.has(eventType)) {
            this.listeners.set(eventType, []);
        }
        this.listeners.get(eventType).push(callback);
    }

    trigger(eventType) {
        let args = [];
        for(let i=1; i<arguments.length; i++) {
            args.push(arguments[i]);
        }

        this.log('event: "' + eventType + '" called with args:', args);

        let nbListeners = 0;
        if(this.listeners.has(eventType)) {
            nbListeners = this.listeners.get(eventType).length;
            this.eventsRunning++;
            for (let listener of this.listeners.get(eventType)) {
                listener(...args);
            }
            this.eventsRunning--;
        }

        this.log('event: "' + eventType + '", called: ' + nbListeners + ' time(s)');

        if(this.eventsRunning === 0) {
            this.log();
        }
    }

    addForwardEvents (eventType, eventToForwardTo) {
        let self = this;

        // Can't use arrow function here, because we need the arguments of the callback function
        this.on(eventType, function() {
            let args = [];
            for(let i=0; i<arguments.length; i++) {
                args.push(arguments[i]);
            }

            self.trigger(eventToForwardTo, ...args)
        });
    }

    getListeners(eventType) {
        return this.listeners.get(eventType);
    }

    resetEvents() {
        this.listeners = new Map();
    }

    log(message='', args=undefined) {
        var spacesBefore = Logger.createTabs(this.eventsRunning);
        if(args) {
            Logger.info(spacesBefore + message, ...args);
        }
        else {
            Logger.info(spacesBefore + message);
        }
    }
}

export default EventService;