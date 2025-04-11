<template>
  <ion-menu content-id="main-content">
    <ion-grid class="px-5 py-[2em]" id="menubar">
      <ion-row>
        <ion-col>
          <div class="flex items-center justify-between">
            <img :src="image1" alt="Tzuyu" class="thumbnail1">
            <a @click="$router.push('/pages/loyalty')" class="flex items-center gap-5">
              <font-awesome-icon :icon="['fas', 'web-awesome']" class="text-yellow-500" />
              <span class="font-bold text-gray-700" id="points">
                0 Points
                <font-awesome-icon :icon="['fas', 'fa-angle-right']" class="text-red-600 font-black faAngleRight" />
              </span>
            </a>
          </div>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-text>
            <div class="flex flex-col mb-5">
              <h2 class="font-black text-sm">Chou Tzuyu</h2>
              <p class="text-sm text-gray-500">+63 912 345 6789</p>
            </div>
          </ion-text>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <div class="flex flex-col text-start space-y-5" id="items">
            <a @click="$router.push('/')" :class="{ 'active': route.path === '/pages/home' }">
              <font-awesome-icon :icon="['fas', 'fa-house']" class="faMenuIcons" /> Home
            </a>
            <a @click="$router.push('/pages/order')" :class="{ 'active': route.path === '/pages/order' }">
              <font-awesome-icon :icon="['fas', 'fa-burger']" class="faMenuIcons" /> Order Now!
            </a>
            <div class="flex justify-between items-center">
              <a href="#">
                <font-awesome-icon :icon="['fas', 'bell']" class="faMenuIcons" /> Notifications
              </a>
              <span class="withSpan">4</span>
            </div>
            <a href="#"><font-awesome-icon :icon="['fas', 'store']" class="faMenuIcons" /> Store Locator</a>
            <a href="#"><font-awesome-icon :icon="['fas', 'circle-question']" class="faMenuIcons" /> FAQ's</a>

            <div class="border border-gray-200 my-2"></div>


            <div class="flex justify-between items-center">
              <a href="#"><font-awesome-icon :icon="['fas', 'bag-shopping']" class="faMenuIcons" /> My Orders </a><span
                class="withSpan">4</span>
            </div>
            <a href="#"><font-awesome-icon :icon="['fas', 'user']" class="faMenuIcons" /> My Account</a>
            <a href="#"><font-awesome-icon :icon="['fas', 'fa-heart']" class="faMenuIcons" /> My Favorites</a>
            <a href="#"><font-awesome-icon :icon="['fas', 'fa-location-dot']" class="faMenuIcons" /> Order Tracker</a>
            <a href="#"><font-awesome-icon :icon="['fas', 'fa-clock-rotate-left']" class="faMenuIcons" /> Order
              History</a>
          </div>
        </ion-col>
      </ion-row>
      <button class="redBtn">Logout</button>
    </ion-grid>
  </ion-menu>
  <ion-page id="main-content">
    <ion-router-outlet>

    </ion-router-outlet>
  </ion-page>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();

import { IonMenu, IonPage, IonText, IonGrid, IonRow, IonCol, IonRouterOutlet } from '@ionic/vue';
import image1 from '@/assets/p_1.jpg'

</script>