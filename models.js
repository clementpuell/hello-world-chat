// @ts-check

class Message {
    /**
     * @param {string} author
     * @param {string} text
     */
    constructor(author, text) {
        this.author = author;
        this.timestamp = new Date();
        this.text = text;
        this.type = MessageType.None;
    }

    /**
     * Characterize the message as sent.
     */
    markAsSent() {
        this.type = MessageType.Sent;
    }

    /**
     * Characterize the message as received.
     */
    markAsReceived() {
        this.type = MessageType.Received;
    }

    formatDate = () => this.timestamp.toLocaleString();
}

const MessageType = {
    None: 0,
    Sent: 1,
    Received: 2
}
