import EventService from '../src/event.service.js';
import Logger from '../src/Logger';

describe('Event', () => {
    describe('Service', () => {
        let eventService;

        beforeEach(() => {
            eventService = new EventService();
            //Logger.setLevel('error');
        });

        describe('on', () => {
            it('should add an event', () => {
                eventService.on('test');
                expect(eventService.listeners.size).toBe(1);
                expect(eventService.listeners.get('test').length).toBe(1);
            });
        });

        describe('trigger', () => {
            it('should trigger an event', (done) => {
                eventService.on('test', done);
                eventService.trigger('test');
            });

            it('should trigger an event with parameters (arguments)', (done) => {
                eventService.on('test', (param1, param2) => {
                    expect(param1).toBe(1);
                    expect(param2).toBe(2);
                    done();
                });
                eventService.trigger('test', 1, 2);
            });
        });

        describe('addForwardEvents', () => {
            it('should forward an event', (done) => {
                eventService.on('to', done);
                eventService.addForwardEvents('from', 'to');
                eventService.trigger('from');
            });

            it('should forward an event with arguments', (done) => {
                eventService.on('to', (param1, param2) => {
                    expect(param1).toBe(1);
                    expect(param2).toBe(2);
                    done();
                });
                eventService.addForwardEvents('from', 'to');
                eventService.trigger('from', 1, 2);
            });
        });
    });
});