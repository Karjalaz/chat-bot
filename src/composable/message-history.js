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

    function addUserMessage(message, timeout = 0, icon = true) {
        addMessage({
            id: messageHistory.items.length,
            from: 'user',
            text: message,
            timeout: timeout,
            withIcon: icon
        });
    }

    function addUserOptions(options) {
        addMessage({
            id: messageHistory.items.length,
            from: 'options',
            options: options
        });
    }

    const getMessages = () => messageHistory.items;

    const clearMessages = () => messageHistory.items = [];

    const setMessageHistory = (history) => messageHistory.items = history;

    function addMessage(message) {
        messageHistory.items.push(message);
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
