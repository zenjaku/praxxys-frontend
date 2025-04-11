<template>
  <ion-page class="tracking-wide">
    <ion-header class="bg-white py-2">
      <ion-toolbar>
        <div class="flex items-center w-full px-4 gap-2">
          <ion-buttons slot="start">
            <ion-menu-button class="text-red-600 font-black text-5xl"></ion-menu-button>
          </ion-buttons>
          <div class="flex items-center justify-between w-full">
            <ion-text class="text-3xl font-bold text-gray-700">Our Foods</ion-text>
            <ion-buttons>
              <button class="text-3xl">
                <font-awesome-icon @click="$router.push('/pages/addTo/2')" :icon="['fas', 'bag-shopping']" class="text-red-600" />
              </button>
            </ion-buttons>
          </div>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">

      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-grid>
        <ion-row class="my-2">
          <ion-col>
            <div class="searchInput">
              <font-awesome-icon slot="start" :icon="['fas', 'fa-magnifying-glass']" class="text-red-600 searchIcon" />
              <ion-input class="!text-gray-400" placeholder="try our new Tom Yun Seafood"></ion-input>
              <font-awesome-icon slot="end" :icon="['fas', 'fa-sliders']" class="text-red-600 settings" />
            </div>
          </ion-col>
        </ion-row>

        <ion-row class="mt-5">
          <ion-col>
            <div id="categories" class="text-scroller">
              <div v-for="(text, index) in itemsCategory" :key="index">
                <input type="radio" :id="`size-${index}`" :value="text" v-model="selectedCategory" name="category">
                <label :for="`size-${index}`"> {{ text }}</label>
              </div>
            </div>
          </ion-col>
        </ion-row>

        <!-- foods content -->
        <ion-row class="my-5">
          <ion-col>
            <div class="grid grid-cols-2 gap-2">
              <div v-for="item in data" :key="item.id"
                class=" w-full h-full rounded-2xl overflow-hidden bg-gray-100 shadow-sm py-2">
                <a @click="$router.push({ name: 'items', params: { id: item.id } })">
                  <img :src="item.image" :alt="item.title" class="food-image" draggable="false" loading="eager">
                  <div class=" bottom-0 left-0 h-full p-2 text-sm w-full">
                    <p class="font-semibold text-[1.1em] mt-2">{{ item.title }} </p>
                    <p class="text-xs">{{ item.category }} </p>
                    <div class="bottomPart">
                      <p class="text-red-600 text-lg mt-2">{{ item.price }} </p>
                      <span class="text-yellow-400">
                        <font-awesome-icon :icon="['fas', 'fa-star']" class="text-xs mx-[.1em]" v-for="n in 5"
                          :key="n" />
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonContent, IonText, IonInput, IonGrid, IonRow, IonCol, IonRefresher, IonRefresherContent, IonButtons, IonMenuButton, IonIcon } from '@ionic/vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
const route = useRoute();
const selectedCategory = ref('');
var itemsCategory = ['All', 'Chicken', 'Seafood', 'Meat', 'Salad'];
// food content
import image11 from '@/assets/p_11.png';
import image12 from '@/assets/p_12.png';
import image13 from '@/assets/p_13.png';
import image14 from '@/assets/p_14.png';
import image15 from '@/assets/p_15.png';
import image16 from '@/assets/p_16.png';

const data = [
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
    image: image16,
    title: 'Grilled Steak',
    category: 'Meat',
    price: 'P 250'
  },
  {
    id: 4,
    image: image11,
    title: 'Vegetable Salad',
    category: 'Salad',
    price: 'P 120'
  },
  {
    id: 5,
    image: image15,
    title: 'Roasted Chicken',
    category: 'Chicken',
    price: 'P 200'
  },
  {
    id: 6,
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
