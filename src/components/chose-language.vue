<script setup>
import { getLanguageInfo } from './../composable/language-state.js';
import { ref, computed } from 'vue';

const { 
    chosenLanguage,
    setLangEng,
    setLangRus,
    defineLanguage,
    getText
} = getLanguageInfo();
const text = getText();
const engHover = ref(false);
const ruHover = ref(false);
</script>

<template>
    <div class="chose-language flex flex-col h-full w-full justify-center items-center">
        <h1 class="chose-language__header font-semibold text-lg">
            {{ text.chooseLanguageTitle }}
        </h1>
        <div class="chose-language__options mt-6">
            <ul 
                class="chose-language__options-list 
                flex flex-row gap-6">
                <li>
                    <button 
                        class="chose-language__eng gradient-animate px-6 py-2"
                        :class="{
                            'active': chosenLanguage() == 'eng' && !ruHover, 
                            'inactive': chosenLanguage() != 'eng' || ruHover}"
                        @click="setLangEng()"
                        @mouseover="engHover = true"
                        @mouseleave="engHover = false">
                        {{ text.engLang }}
                    </button>
                </li>
                <li>
                    <button 
                        class="chose-language__ru gradient-animate px-6 py-2"
                        :class="{
                            'active': chosenLanguage() == 'rus' && !engHover, 
                            'inactive': chosenLanguage() != 'rus' || engHover}"
                        @click="setLangRus()"
                        @mouseover="ruHover = true"
                        @mouseleave="ruHover = false">
                        {{ text.ruLang }}
                    </button>
                </li>
            </ul>
        </div>
        <button 
            class="chose-language__confirm active mt-6 mb-6 
            px-6 py-2 hover:animate-squish"
            @click="defineLanguage()">
            {{ text.confirm }}
        </button>
    </div>
</template>