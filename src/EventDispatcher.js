import Logger from './Logger.js';

class EventDispatcher {
    constructor() {
        this.listeners = new Map();
        this.eventsRunning = 0;
        this.logger = Logger;
    }

    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }

    trigger(event) {
        let args = [];
        for(let i=1; i<arguments.length; i++) {
            args.push(arguments[i]);
        }

        this.log('event: "' + event + '" called with args:', args);

        let nbListeners = 0;
        if(this.listeners.has(event)) {
            nbListeners = this.listeners.get(event).length;
            this.eventsRunning++;
            for (let listener of this.listeners.get(event)) {
                listener(...args);
            }
            this.eventsRunning--;
        }

        this.log('event: "' + event + '", called: ' + nbListeners + ' time(s)');

        if(this.eventsRunning === 0) {
            this.log();
        }
    }

    forward (event, eventToForwardTo) {
        let self = this;

        // Can't use arrow function here, because we need the arguments of the callback function
        this.on(event, function() {
            let args = [];
            for(let i=0; i<arguments.length; i++) {
                args.push(arguments[i]);
            }

            self.trigger(eventToForwardTo, ...args)
        });
    }

    getListeners(event) {
        return this.listeners.get(event);
    }

    off(event) {
        this.listeners.set(event, []);
    }

    reset() {
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

export default EventDispatcher;