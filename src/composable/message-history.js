import { reactive } from 'vue';

const messageHistory = reactive ({
    items: []
});

export const getMessageData = () => {
    function addBotMessage(message, timeout = 0, icon = true) {
        addMessage({
            id: messageHistory.items.length,
            from: 'bot',
            text: message,
            timeout: timeout,
            withIcon: icon
        });

    }

    function addUserMessage(message, type, timeout = 0, icon = true) {
        addMessage({
            id: messageHistory.items.length,
            from: 'user',
            text: message,
            type: type,
            timeout: timeout,
            withIcon: icon
        });
    }


    function addUserOptions(options, type, timeout = 0) {
        addMessage({
            id: messageHistory.items.length,
            from: 'options',
            options: options,
            timeout: timeout,
            type: type
        });
    }

    const getMessages = () => messageHistory.items;

    const clearMessages = () => messageHistory.items = [];

    const setMessageHistory = (history) => messageHistory.items = history;

    function addMessage(message) {
        messageHistory.items.push(message);
        setTimeout(() => {
            let view = document.getElementById("chat");
            view.scrollTo({
                top: view.scrollHeight,
                behavior: 'smooth'
            });
        }, message.timeout + 800);
    }

    return {
        addBotMessage,
        addUserMessage,
        addUserOptions,
        getMessages,
        clearMessages,
        setMessageHistory,
        addMessage
    }
}
