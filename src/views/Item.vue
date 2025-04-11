<template>
  <ion-page class="tracking-wide">
    <ion-header class="bg-white py-2">
      <ion-toolbar>
        <div class="flex items-center w-full px-4 gap-2">
          <ion-buttons slot="start" class="backBtn">
            <a @click="$router.push('/pages/order')">
              <font-awesome-icon :icon="['fas', 'fa-angle-left']" class="text-gray-500 mx-4" />
            </a>
          </ion-buttons>
          <div class="flex items-center justify-between w-full">
            <div v-if="item">
              <ion-text class="text-2xl font-semibold ml-3 text-gray-700">{{ item.category }}</ion-text>
            </div>
            <div v-else>
              <ion-text class="text-2xl font-bold italic text-gray-300 ml-3">No Data Fetched</ion-text>
            </div>
            <ion-buttons>
              <button class="text-3xl">
                <font-awesome-icon @click="$router.push('/pages/addTo/4')" :icon="['fas', 'bag-shopping']" class="text-red-600" />
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
        <ion-row class="my-5">
          <ion-col>
            <div v-if="item" class="flex flex-col gap-5">
              <div class="bg-gray-200 p-5 rounded-2xl">
                <img :src="item.image" :alt="item.title" class="item-image" draggable="false">
              </div>
              <div class="grid gap-2">
                <ion-text class="font-semibold">{{ item.title }}</ion-text>
                <span class="text-yellow-400">
                  <font-awesome-icon :icon="['fas', 'fa-star']" class="text-xs mx-[.1em]" v-for="n in 5" :key="n" />
                </span>
                <ion-text class="tracking-wide text-justify text-sm">{{ item.description }}</ion-text>
              </div>
              <div class="flex items-center justify-between">
                <ion-text class="text-4xl tracking-wide text-red-500">{{ item.price }}</ion-text>
                <span class="flex items-center justify-center gap-4">
                  <button class="qtyBtn" @click="itemCount--" :disabled="itemCount === 0">
                    <font-awesome-icon :icon="['fas', 'fa-minus']" class="qtyIcon" />
                  </button>
                  {{ itemCount + 1 }}
                  <button class="qtyBtn" @click="itemCount++">
                    <font-awesome-icon :icon="['fas', 'fa-plus']" class="qtyIcon" />
                  </button>
                </span>
              </div>
            </div>
            <div v-else="item">
              <ion-text class="text-gray-300 italic">No Data Found</ion-text>
            </div>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col class="mt-2">
            <ion-text class="text-xl font-semibold">Beverages</ion-text>
            <ion-select class="selectionTag" :toggle-icon="caretDownSharp" label="Choose your beverage"
              label-placement="stacked" v-model="selectedItem">
              <ion-select-option v-for="(item, index) in beverages" :key="index" :value="item">
                {{ item }}
              </ion-select-option>
            </ion-select>
            <div id="beverageSize">
              <div v-for="(size, index) in beverageSizes" :key="index">
                <input type="radio" :id="`size-${index}`" :value="size" v-model="selectedSize" name="beverageSize">
                <label :for="`size-${index}`"> {{ beverageSizes[index] }}</label>
              </div>
            </div>
          </ion-col>
        </ion-row>

        <ion-row class="mt-[2em]">
          <ion-col>
            <ion-text class="font-semibold text-xl">Add-Ons</ion-text>
            <div class="overflow-hidden rounded-2xl grid gap-2 mt-3">
              <div class="grid grid-cols-3 items-center bg-gray-200/80 py-2 px-5" v-for="(addOn, index) in addOns"
                :key="addOn.id">
                <img :src="addOn.image" :alt="addOn.title" class="object-contain w-[70%]">
                <div class="flex flex-col">
                  <ion-text class="font-bold">{{ addOn.title }}</ion-text>
                  <ion-text class="text-sm">{{ addOn.category }}</ion-text>
                  <ion-text class="font-semibold text-red-600 text-xl">{{ addOn.price }}</ion-text>
                </div>
                <div class="grid items-center gap-2">
                  <ion-checkbox class="ml-auto" checked></ion-checkbox>

                  <span class="flex items-center justify-center gap-6 font-bold">
                    <button class="qtyBtn" @click="addOns[index].count--" :disabled="addOns[index].count === 0">
                      <font-awesome-icon :icon="['fas', 'fa-minus']" class="qtyIcon" />
                    </button>
                    {{ addOns[index].count }}
                    <button class="qtyBtn" @click="addOns[index].count++">
                      <font-awesome-icon :icon="['fas', 'fa-plus']" class="qtyIcon" />
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
      <button class="redBtn !h-15 !px-1 !w-full right-2" id="open-modal" expand="block">Add to Bag</button>
      <ion-modal trigger="open-modal" ref="modal" id="contentModal">
        <div class="wrapper p-5">
          <div class="ion-margin-top text-center items-center justify-center flex flex-col gap-5">
            <div class="thumbsUp">
              <font-awesome-icon :icon="['fas', 'thumbs-up']" class="thumb" />
            </div>
            <div>
              <ion-text class="font-bold">Successfully Added!</ion-text>
              <p class="text-gray-400 mt-5">What do you want to do now?</p>
            </div>
            <div v-if="item" class="flex flex-col gap-5">
              <a @click="$router.push({ name: 'addTo', params: { id: item.id } })">
                <button class="proceedButton !rounded-2xl" @click="dismiss()">Proceed to Checkout</button>
              </a>
              <a @click="$router.push('/pages/order')">
                <button class="text-red-600" @click="dismiss()">Add More</button>
              </a>
            </div>
            <div v-else>
              <ion-text class="text-gray-300 italic">No item found.</ion-text>
            </div>
          </div>
        </div>
      </ion-modal>
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
  IonCheckbox,
  IonGrid,
  IonRow,
  IonCol,
  IonRefresher,
  IonRefresherContent,
  IonButtons,
  IonSelect,
  IonSelectOption,
  IonModal,
  IonLabel
} from '@ionic/vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { caretDownSharp } from 'ionicons/icons';
const route = useRoute();
const itemID = parseInt(route.params.id);
const itemCount = ref(0);

const modal = ref();

const dismiss = () => modal.value.$el.dismiss();

// item content
import image11 from '@/assets/p_11.png';
import image12 from '@/assets/p_12.png';
import image13 from '@/assets/p_13.png';
import image14 from '@/assets/p_14.png';
import image15 from '@/assets/p_15.png';
import image16 from '@/assets/p_16.png';
import image17 from '@/assets/p_17.png';
import image18 from '@/assets/p_18.png';

const beverages = ['Coke', 'Royal', 'Pepsi', 'Sprite', 'Iced Tea', 'Water'];
const beverageSizes = ['Regular', 'Large', 'X-Large'];
const selectedItem = ref('');
const selectedSize = ref('');

const addOns = ref([
  {
    id: 1,
    image: image18,
    title: 'Gravy',
    category: 'Sauce',
    price: 'P 49',
    count: 0
  },
  {
    id: 2,
    image: image17,
    title: 'White Rice',
    category: 'Rice',
    price: 'P 25',
    count: 0
  }
])

const data = [
  {
    id: 1,
    image: image14,
    title: 'Fried Chicken Legs',
    category: 'Chicken',
    price: 'P 180',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in ex et magna suscipit molestie eu in urna. Nullam porttitor tellus vel ullamcorper consectetur. Curabitur',
  },
  {
    id: 2,
    image: image13,
    title: 'Tom Yun Seafood',
    category: 'Seafood',
    price: 'P 200',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in ex et magna suscipit molestie eu in urna. Nullam porttitor tellus vel ullamcorper consectetur. Curabitur',
  },
  {
    id: 3,
    image: image16,
    title: 'Grilled Steak',
    category: 'Meat',
    price: 'P 250',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in ex et magna suscipit molestie eu in urna. Nullam porttitor tellus vel ullamcorper consectetur. Curabitur',
  },
  {
    id: 4,
    image: image11,
    title: 'Vegetable Salad',
    category: 'Salad',
    price: 'P 120',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in ex et magna suscipit molestie eu in urna. Nullam porttitor tellus vel ullamcorper consectetur. Curabitur',
  },
  {
    id: 5,
    image: image15,
    title: 'Roasted Chicken',
    category: 'Chicken',
    price: 'P 200',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in ex et magna suscipit molestie eu in urna. Nullam porttitor tellus vel ullamcorper consectetur. Curabitur',
  },
  {
    id: 6,
    image: image12,
    title: 'Wellington Steak',
    category: 'Meat',
    price: 'P 400',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in ex et magna suscipit molestie eu in urna. Nullam porttitor tellus vel ullamcorper consectetur. Curabitur',
  }
]

const item = data.find(i => i.id === itemID);

const handleRefresh = (event) => {
  setTimeout(() => {
    event.target.complete();
  }, 2000);
};
</script>
