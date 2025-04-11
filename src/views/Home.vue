<template>
  <ion-page class="leading-relaxed">
    <ion-header class="bg-white py-2">
      <ion-toolbar>
        <div class="flex items-center justify-between w-full px-4">
          <ion-buttons slot="start">
            <ion-menu-button class="text-red-600 font-black text-5xl"></ion-menu-button>
          </ion-buttons>
          <div class="flex items-center">
            <div class="flex items-center justify-center gap-6 text-xl">
              <font-awesome-icon :icon="['fas', 'web-awesome']" class="text-yellow-500" />
              <span class="font-bold text-gray-700">0 Points
                <font-awesome-icon :icon="['fas', 'fa-angle-right']" class="text-red-600 font-black" />
              </span>
            </div>
          </div>
          <ion-avatar>
            <img :src="image1" alt="Tzuyu" class="thumbnail2">
          </ion-avatar>
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
            <div class="flex items-center gap-2">
              <img :src="image2" alt="fast food logo" class="w-30">
              <div class="flex flex-col">
                <ion-text>Anneoyong, Chou!</ion-text>
                <ion-text class="text-2xl font-bold">What do you want to eat?</ion-text>
              </div>
            </div>
          </ion-col>
        </ion-row>

        <ion-row class="mt-4">
          <ion-col>
            <div class="searchInput">
              <font-awesome-icon slot="start" :icon="['fas', 'fa-magnifying-glass']" class="text-red-600 searchIcon" />
              <ion-input class="!text-gray-400" placeholder="try our new Grilled Steak"></ion-input>
            </div>
          </ion-col>
        </ion-row>

        <!-- special offers content -->
        <ion-row>
          <ion-col class="flex items-center justify-between">
            <ion-text class="text-lg font-bold">
              <h2>Special Offers!</h2>
            </ion-text>
            <div class="flex items-center gap-5">
              <ion-text class="text-sm text-red-600">
                View All
              </ion-text>
              <font-awesome-icon :icon="['fas', 'angle-right']" class="text-red-600" />
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div class="image-scroller">
              <img v-for="(img, index) in specialOffers" :key="index" :src="img" :alt="'Promo ' + (index + 1)"
                class="promo-image !rounded-2xl" draggable="false">
            </div>
          </ion-col>
        </ion-row>

        <!-- category content -->
        <ion-row class="mt-10">
          <ion-col>
            <ion-text class="text-lg font-bold">
              <h2>Category</h2>
            </ion-text>
            <div class="image-scroller flex gap-4">
              <div v-for="items in categoryItems" :key="items.id"
                class="relative h-80 w-55 rounded-2xl overflow-hidden shrink-0">
                <img :src="items.image" :alt="items.title" class="w-full h-full object-cover" draggable="false">
                <div class="absolute top-0 left-0 h-full bg-black/50 text-white p-2 text-sm w-full">
                  <h3 class="font-bold">{{ items.title }} </h3>
                  <p>{{ items.recipe }} </p>
                </div>
              </div>
            </div>
          </ion-col>
        </ion-row>

        <!-- whats new content -->
        <ion-row class="mt-10">
          <ion-col>
            <ion-text class="text-lg font-bold">
              <h2>What's New?</h2>
            </ion-text>
            <div class="image-scroller">
              <img :src="image10" :alt="'Whats new ' + (image10)" class="w-full rounded-2xl" draggable="false">
            </div>
          </ion-col>
        </ion-row>

        <!-- most popular -->
        <ion-row class="my-10">
          <ion-col>
            <ion-text class="text-lg font-bold">
              <h2>Most Popular</h2>
            </ion-text>
            <div class="grid grid-cols-2 gap-2">
              <div v-for="item in popularItems" :key="item.id">
                <a @click="$router.push({ name: 'items', params: { id: item.id } })">
                  <div class=" w-full h-full rounded-2xl overflow-hidden bg-gray-100 shadow-sm py-2">
                    <img :src="item.image" :alt="item.title" class="popular-image" draggable="false">
                    <div class=" bottom-0 left-0 h-full p-2 text-sm w-full">
                      <p class="font-semibold text-[1.1em] mt-2">{{ item.title }} </p>
                      <p class="text-xs">{{ item.category }} </p>
                      <p class="text-red-600 text-lg mt-2">{{ item.price }} </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
      <div>
        <a @click="$router.push('/pages/order')">
          <button class="redBtn !h-15 !px-1 fixed bottom-5 right-2">Order Now</button>
        </a>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonText,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonRefresher,
  IonRefresherContent,
  IonButtons,
  IonMenuButton,
  IonAvatar
} from '@ionic/vue';

import image1 from '@/assets/p_1.jpg'
import image2 from '@/assets/p_2.png';
// special offers
import image3 from '@/assets/p_3.jpg';
import image4 from '@/assets/p_4.jpg';
import image5 from '@/assets/p_5.jpg';
// category
import image6 from '@/assets/p_6.jpg';
import image7 from '@/assets/p_7.jpg';
import image8 from '@/assets/p_8.jpg';
import image9 from '@/assets/p_9.jpg';
// whats new
import image10 from '@/assets/p_10.jpg';
// most popular
import image11 from '@/assets/p_11.png';
import image12 from '@/assets/p_12.png';
import image13 from '@/assets/p_13.png';
import image14 from '@/assets/p_14.png';

const specialOffers = [image3, image4, image5];

const categoryItems = [
  {
    id: 1,
    image: image9,
    title: 'Chicken',
    recipe: '9 Recipes'
  },
  {
    id: 2,
    image: image8,
    title: 'Seafood',
    recipe: '6 Recipes'
  },
  {
    id: 3,
    image: image7,
    title: 'Meat',
    recipe: '5 Recipes'
  },
  {
    id: 4,
    image: image6,
    title: 'Salad',
    recipe: '10 Recipes'
  }
]

const popularItems = [
  {
    id: 1,
    image: image14,
    title: 'Fried Chicken Legs',
    category: 'Chicken',
    price: 'P 180'
  },
  {
    id: 2,
    image: image13,
    title: 'Tom Yun Seafood',
    category: 'Seafood',
    price: 'P 200'
  },
  {
    id: 3,
    image: image11,
    title: 'Vegetable Salad',
    category: 'Salad',
    price: 'P 120'
  },
  {
    id: 4,
    image: image12,
    title: 'Wellington Steak',
    category: 'Meat',
    price: 'P 400'
  }
]

const handleRefresh = (event) => {
  setTimeout(() => {
    event.target.complete();
  }, 2000);
};
</script>
