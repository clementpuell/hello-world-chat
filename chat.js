// @ts-check
/// <reference path="models.js" />
/// <reference path="store.js" />

var rxjs;
var Observable;

/**
 * Represent a chat window. Allow posting messages and expose the messages list.
 */
class Chat {
    /**
     * @param {String} author
     * @param {Store} store
     */
    constructor(author, store) {
        this.author = author;
        this.store = store;
        this._messages$ = new rxjs.ReplaySubject(10);

        // Receive messages sent by other chats
        this.store.messages$
            .pipe(
                rxjs.operators.filter(m => m.author !== this.author)
            )
            .subscribe(m => {
                let receivedMessage = new Message(m.author, m.text);
                receivedMessage.timestamp = m.timestamp;
                receivedMessage.markAsReceived();
                this._messages$.next(receivedMessage);
            });
    }

    /**
     * Expose own messages list, sent and received.
     * @returns {Observable<Message>}
     */
    get messages$() {
        return this._messages$.asObservable();
    }

    /**
     * Publish own message to the store and to the local messages list.
     * @param {String} messageText 
     */
    async post(messageText) {
        let sentMessage = new Message(this.author, messageText);
        let promise = this.store.add(sentMessage);
        sentMessage.markAsSent();
        this._messages$.next(sentMessage);
        return promise;
    }
}
