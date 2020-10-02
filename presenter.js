// @ts-check
/// <reference path="models.js" />
/// <reference path="chat.js" />

/**
 * Bind the model to the HTML view: listen to events and update DOM.
 */
class Presenter {
    /**
     * @param {Array<Chat>} chats 
     */
    constructor(chats) {
        this.chats = new Map();
        chats.forEach(c => {
            this.chats.set(c.author, { instance: c, messagesContainer: null, textbox: null, button: null });
        });

        this.container = document.querySelector('#container');
        this.windowTemplate = document.querySelector('#window-template');
        this.messageTemplate = document.querySelector('#message-template');
    }

    /**
     * Draw the inital empty chat windows based on a template.
     */
    draw() {
        for (let [key, chat] of this.chats.entries()) {
            let content = this.windowTemplate.content.cloneNode(true);
            content.querySelector('h1 span').innerText = chat.instance.author;

            // Keep references to drawn DOM elements to update them later
            chat.messagesContainer = content.querySelector('.chat-messages');
            chat.textbox = content.querySelector('input[type=text]');
            chat.button = content.querySelector('input[type=submit]');

            this.container.appendChild(content);
        };
    }

    /**
     * Bind each chat window to its Chat instance.
     */
    listen() {
        for (let [key, chat] of this.chats.entries()) {
            this._propagateOutgoing(chat.instance, chat.messagesContainer, chat.textbox, chat.button);
            this._displayIncoming(chat.instance);
        };
    }

    /**
     * Bind the button of a chat window to its chat instance to post the message.
     * @param {Chat} chat 
     * @param {HTMLElement} messagesContainer 
     * @param {HTMLInputElement} textbox 
     * @param {HTMLInputElement} button 
     */
    _propagateOutgoing(chat, messagesContainer, textbox, button) {
        button.addEventListener('click', () => {
            if (textbox.value) {
                chat.post(textbox.value);
                textbox.value = '';
                this._scrollToBottom(messagesContainer);
            }
        });
    }

    /**
     * Update the messages list with messages emitted by a Chat instance.
     * @param {Chat} chat 
     */
    _displayIncoming(chat) {
        // @ts-ignore
        chat.messages$.subscribe(m => {
            this._drawMessage(chat, m);
        });
    }

    /**
     * @param {Chat} chat 
     * @param {Message} message 
     */
    _drawMessage(chat, message) {
        let content = this.messageTemplate.content.cloneNode(true);

        // Bind message properties to DOM elements
        let cssClass = message.type === MessageType.Sent ? 'sent' : 'received';
        content.querySelector('.chat-message').classList.add(cssClass);
        content.querySelector('.message-author').innerText = message.author;
        content.querySelector('.message-timestamp').innerText = message.formatDate();
        content.querySelector('.message-text').innerText = message.text;

        let container = this.chats.get(chat.author).messagesContainer;
        container.appendChild(content);
        this._scrollToBottom(container);
    }

    /**
     * @param {HTMLElement} container 
     */
    _scrollToBottom(container) {
        container.scrollTop = container.scrollHeight;
    }
}
