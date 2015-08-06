import EventDispatcher from '../src/EventDispatcher.js';
import Logger from '../src/Logger';

describe('EventDispatcher', () => {
    let eventDispatcher;

    beforeEach(() => {
        eventDispatcher = new EventDispatcher();
        Logger.setLevel('error');
    });

    describe('on', () => {
        it('should add an event', () => {
            eventDispatcher.on('test');
            expect(eventDispatcher.listeners.size).toBe(1);
            expect(eventDispatcher.listeners.get('test').length).toBe(1);
        });
    });

    describe('trigger', () => {
        it('should trigger an event', (done) => {
            eventDispatcher.on('test', done);
            eventDispatcher.trigger('test');
        });

        it('should trigger an event with parameters (arguments)', (done) => {
            eventDispatcher.on('test', (param1, param2) => {
                expect(param1).toBe(1);
                expect(param2).toBe(2);
                done();
            });
            eventDispatcher.trigger('test', 1, 2);
        });
    });

    describe('forward', () => {
        it('should forward an event', (done) => {
            eventDispatcher.on('to', done);
            eventDispatcher.forward('from', 'to');
            eventDispatcher.trigger('from');
        });

        it('should forward an event with arguments', (done) => {
            eventDispatcher.on('to', (param1, param2) => {
                expect(param1).toBe(1);
                expect(param2).toBe(2);
                done();
            });
            eventDispatcher.forward('from', 'to');
            eventDispatcher.trigger('from', 1, 2);
        });
    });

    describe('off', () => {
        it('should delete a listener', () => {
            eventDispatcher.on('test');
            eventDispatcher.off('test');
            expect(eventDispatcher.getListeners('test').length).toBe(0);
        });
    });
});