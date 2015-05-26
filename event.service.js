let listeners = {};
let eventsRunning = 0;
let debug = false;

class EventService {
    addEventListener(eventType, callback) {
        if (!listeners[eventType]) {
            listeners[eventType] = [];
        }
        listeners[eventType].push(callback);
    }

    addEventListeners(events, callback) {
        for(let event of events) {
            this.addEventListener(event, callback);
        }
    }

    triggerEvent(eventType) {
        var args = [];
        for(let i=1; i<arguments.length; i++) {
            args.push(arguments[i]);
        }

        if(debug) {
            log('event: "' + eventType + '"', args);
        }

        let nbListeners = 0;
        if(listeners[eventType]) {
            nbListeners = listeners[eventType].length;
            eventsRunning++;

            for (let listener of listeners[eventType]) {
                listener(...args);
            }
            eventsRunning--;
        }

        if(debug) {
            log('event: "' + eventType + '", dispatched: ' + nbListeners);
            if(eventsRunning === 0) {
                console.log("");
            }
        }
    }

    addForwardEvents (eventType, eventsToForwardTo) {
        let self = this;
        let createPushEventCallback = function (eventTypeToForward) {
            return function () {
                var newArguments = [];
                newArguments.push(eventTypeToForward);
                for (var i = 0; i < arguments.length; i++) {
                    newArguments.push(arguments[i]);
                }
                self.triggerEvent(...newArguments);
            };
        };

        for(let eventToForwardTo of eventsToForwardTo) {
            this.addEventListener(eventType, createPushEventCallback(eventToForwardTo));
        }
    }

    getListeners(eventType) {
        return listeners[eventType];
    }

    resetEvents() {
        listeners = [];
    }

    setDebug(value) {
        debug = value;
        if(debug) {
            window.EventService = EventService;
        }
    }
}

function log(message, args) {
    var spacesBefore = createTabs(eventsRunning);
    if(args) {
        console.log(spacesBefore + message, args);
    }
    else {
        console.log(spacesBefore + message);
    }
}

function createTabs(nbTabs) {
    var tabs = "";
    var spaces = "    ";
    for(var i=0; i<nbTabs; i++) {
        tabs += spaces;
    }
    return tabs;
}

export default EventService;