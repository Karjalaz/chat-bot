<script setup>
import { defineProps, ref, onMounted, computed } from 'vue';
import { getMessageData } from '@/composable/message-history';
import { getBotData } from '@/composable/bot-state';

const props = defineProps({
    message: Object
});

const {
    getMessages
} = getMessageData();

const {
    choseInteraction,
    choseOption
} = getBotData();

const lastMessage = computed(() => getMessages()[getMessages().length - 1] == props.message);
const messageVisible = ref(false);


function userChose(text, type) {
    if (new Set(props.message.options.map(it => it.type)).size == props.message.options.length) {
        messageVisible.value = false;
        choseInteraction(text, type);
    } else {
        choseOption(text, type);
    }
}
onMounted(() => {
    setTimeout(() => {
        messageVisible.value = true;
    }, props.message.timeout);
});
</script>

<template>
    <Transition name="show" mode="out-in">
        <div v-if="messageVisible && lastMessage"
            class="options-message flex flex-row items-start">
            <img 
                class="options-message__avatar p-2"
                :class="{'invisible': !props.message.withIcon}"
                src="./../../assets/img/icon-robot.svg"
                alt="robot avatar">
            <ul class="options-message__options flex flex-row ml-2 gap-2">
                <li 
                    v-for="option in props.message.options" 
                    :key="option.type"
                    :id="'option-' + (option.type ?? props.message.type)"
                    class="options-message__option cursor-pointer 
                        p-2 border-2 rounded-xl text-center
                        lg:p-4"
                    @click="userChose(option.text ?? option, option.type ?? props.message.type)">
                        <p>
                            {{ option.text ?? option}}
                        </p>
                </li>
            </ul>
        </div>
    </Transition>
</template>

<style scoped>
.options-message__avatar {
    border: solid 2px rgb(131,58,180); 
    border-radius: 26px;
    background-color: rgba(131,58,180,.2);
    width: 64px;
    height: 64px;
}

#option-alarm {
    border-color: rgba(252,176,69,.9);
    background: linear-gradient(to left, white 50%, rgba(252,176,69,.65) 50%) right;
    background-size: 200% 100%;
}

#option-weather {
    border-color: rgba(131,58,180,.9);
    background: linear-gradient(to left, white 50%, rgba(131,58,180,.65) 50%) right;
    background-size: 200% 100%;
}

#option-pizza {
    border-color: rgba(253,29,29,.9);
    background: linear-gradient(to left, white 50%, rgba(253,29,29,.65) 50%) right;
    background-size: 200% 100%;
}

#option-alarm:hover, #option-pizza:hover, #option-weather:hover {
    transition: background-position .8s ease;
    background-position: left;
}
</style>