<script setup>
import engLines from './../assets/json/eng-lines.json';
import ruLines from './../assets/json/ru-lines.json';
import { getBotData } from './../composable/bot-state.js';
import { ref, computed } from 'vue';

const { 
    chosenLanguage,
    setLangEng,
    setLangRus,
    defineLanguage
} = getBotData();

const text = computed(() => (chosenLanguage() == 'eng') ? engLines : ruLines);

function setLanguage(func) {
    func();
    defineLanguage();
}
</script>

<template>
    <div class="chose-language flex flex-col h-full w-full justify-center align-center items-center">
        <h1 class="chose-language__header font-semibold text-lg">
            {{ text.chooseLanguageTitle }}
        </h1>
        <div class="chose-language__options mt-8">
            <ul 
                class="chose-language__options-list 
                flex flex-row gap-6">
                <li>
                    <button 
                        class="chose-language__eng px-6 py-2"
                        :class="{'active': chosenLanguage() == 'eng', 'inactive': chosenLanguage() != 'eng'}"
                        @click="setLanguage(setLangEng)">
                        {{ text.engLang }}
                    </button>
                </li>
                <li>
                    <button 
                        class="chose-language__ru px-6 py-2"
                        :class="{'active': chosenLanguage() == 'rus', 'inactive': chosenLanguage() != 'rus'}"
                        @click="setLanguage(setLangRus)">
                        {{ text.ruLang }}
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>