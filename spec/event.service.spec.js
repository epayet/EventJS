import EventService from '../src/event.service.js';

describe('Event', () => {
    describe('Service', () => {
        let eventService;

        beforeEach(() => {
            eventService = new EventService();
        });

        describe('addEventListener', () => {
            it('should add an event listener', () => {
                eventService.addEventListener('test');
                var listeners = eventService.getListeners('test');
                expect(listeners.length).toBe(1);
            });
        });

        //describe('addEventListeners', () => {
        //    it('should add an event listener', () => {
        //        eventService.addEventListeners(['test', 'test2']);
        //        var listenersTest = eventService.getListeners('test');
        //        var listenersTest2 = eventService.getListeners('test2');
        //        expect(listenersTest.length).toBe(1);
        //        expect(listenersTest2.length).toBe(1);
        //    });
        //});
        //
        //describe('triggerEvent', () => {
        //    it('should trigger an event', (done) => {
        //        eventService.addEventListener('test', done);
        //        eventService.triggerEvent('test', '');
        //    });
        //
        //    it('should trigger an event with parameters (arguments)', (done) => {
        //        eventService.addEventListener('test', (param1, param2) => {
        //            expect(param1).toBe(1);
        //            expect(param2).toBe(2);
        //            done();
        //        });
        //        eventService.triggerEvent('test', 1, 2);
        //    });
        //});
        //
        //describe('addForwardEvents', () => {
        //    it('should forward an event', (done) => {
        //        eventService.addEventListener('to', done);
        //        eventService.addForwardEvents('from', ['to']);
        //        eventService.triggerEvent('from');
        //    });
        //
        //    it('should forward an event with arguments', (done) => {
        //        eventService.addEventListener('to', (param1, param2) => {
        //            expect(param1).toBe(1);
        //            expect(param2).toBe(2);
        //            done();
        //        });
        //        eventService.addForwardEvents('from', ['to']);
        //        eventService.triggerEvent('from', 1, 2);
        //    });
        //});
    });
});