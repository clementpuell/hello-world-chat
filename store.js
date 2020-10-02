// @ts-check
/// <reference path="models.js" />

/**
 * Global store to expose all posted messages to chat windows.
 */
class Store {
    constructor() {
        this._messages$ = new rxjs.ReplaySubject(10);
    }

    /**
     * @returns {Observable<Message>}
     */
    get messages$() {
        return this._messages$.asObservable();
    }

    /**
     * @param {Message} message
     */
    async add(message) {
        console.log(`Message posted by ${message.author} at ${message.formatDate()}: "${message.text}".`);
        await this.fakeLatency();
        this._messages$.next({ ...message });
    }

    /**
     * Small random latency before broadcasting the message.
     */
    fakeLatency() {
        let ms = Math.random() * 500;
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
