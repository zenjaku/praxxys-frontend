<template>
    <ion-page>
        <ion-header class="bg-white py-2">
            <ion-toolbar>
                <div class="flex items-center w-full px-4 gap-2">
                    <ion-buttons slot="start">
                        <ion-menu-button class="text-red-600 font-black text-5xl"></ion-menu-button>
                    </ion-buttons>
                    <div class="flex items-center justify-between w-full">
                        <ion-text class="text-2xl font-semibold ml-3 text-gray-700">Loyalty Points</ion-text>
                    </div>
                </div>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">

            <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
                <ion-refresher-content></ion-refresher-content>
            </ion-refresher>

            <ion-grid>
                <ion-row>
                    <ion-col>
                        <div class="flex justify-between items-center">
                            <div class="flex items-center gap-5">
                                <font-awesome-icon :icon="['fas', 'web-awesome']" class="text-yellow-500 text-4xl" />
                                <ion-text class="text-lg font-bold">Beginner Tier</ion-text>
                            </div>
                            <div class="flex items-center gap-5">
                                <ion-text class="text-sm text-red-600">
                                    View All
                                </ion-text>
                                <font-awesome-icon :icon="['fas', 'angle-right']" class="text-red-600" />
                            </div>
                        </div>
                        <div class="mt-3">
                            <ion-text class="text-gray-700 text-sm">Earn points by purchasing from our store. Praesent
                                in ex et magna suscipit molestie eu in urna.</ion-text>
                        </div>
                    </ion-col>
                </ion-row>
                <ion-row class="mt-[3em]">
                    <ion-col>
                        <div class="pointsCount">
                            <ion-text class="circle">
                                0 / 160
                            </ion-text>
                        </div>
                    </ion-col>
                </ion-row>
                <ion-row class="mt-[3em]">
                    <ion-col>
                        <div>
                            <div class="flex justify-between items-center">
                                <ion-text class="text-lg font-bold">Rewards</ion-text>
                                <div class="flex items-center gap-5">
                                    <ion-text class="text-sm text-red-600">
                                        How it Works
                                    </ion-text>
                                    <font-awesome-icon :icon="['fas', 'angle-right']" class="text-red-600" />
                                </div>
                            </div>
                            <div class="flex items-center mt-3">
                                <div id="level" class="text-scroller">
                                    <div v-for="level in loyaltyLevel" :key="level.id">
                                        <input type="radio" :id="level.level" :value="level.level"
                                            v-model="selectedLevel" name="level">
                                        <label :for="level.level"> {{ level.level }}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-200 mt-5 rounded-2xl p-4">
                            <div v-for="item in data" :key="item.id" class="flex items-center gap-5">
                                <img :src="item.image" :alt="item.title" class="object-contain w-[25%]">
                                <div>
                                    <p class="text-gray-700 text-md font-bold">{{ item.title }}</p>
                                    <p class="text-sm text-gray-500">{{ item.category }}</p>
                                    <span class="flex items-center gap-3 mt-4">
                                        <font-awesome-icon :icon="['fas', 'web-awesome']" class="text-yellow-500 text-lg" />
                                        <p class="text-red-600 font-semibold">{{ item.points }}</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>

<script setup>
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonRefresher,
    IonRefresherContent
} from '@ionic/vue'
import { ref } from 'vue';

import image11 from '@/assets/p_11.png';
const data = [
    {
        id: 1,
        image: image11,
        title: 'Vegetable Salad',
        category: 'Salad',
        price: 'P 120',
        points: '20 points'
    },
]


const selectedLevel = ref('');
const loyaltyLevel = [
    {
        id: 1,
        level: 'Beginner'
    },
    {
        id: 2,
        level: 'Intermediate'
    },
    {
        id: 3,
        level: 'Loyal'
    }
]

const handleRefresh = (event) => {
    setTimeout(() => {
        event.target.complete();
    }, 2000);
};

</script>