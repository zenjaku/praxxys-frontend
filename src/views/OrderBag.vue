<template>
    <ion-page class="tracking-wide">
        <ion-header class="bg-white py-2">
            <ion-toolbar>
                <div class="flex items-center w-full px-4 gap-2">
                    <ion-buttons slot="start" class="backBtn">
                        <a @click="$router.push({ name: 'items', id: item.id })">
                            <font-awesome-icon :icon="['fas', 'fa-angle-left']" class="text-gray-500 mx-4" />
                        </a>
                    </ion-buttons>
                    <div class="flex items-center justify-between w-full">
                        <ion-text class="text-2xl font-semibold ml-3 text-gray-700">Order Summary</ion-text>
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
                    <ion-col class="grid gap-3">
                        <div class="bg-gray-200 p-3 rounded-2xl">
                            <div class="text-gray-700">
                                <p class="font-semibold mb-3">Chou Tzuyu</p>
                                <p>+63 912 345 6789</p>
                                <p>chou.tzu-yu@email.com</p>
                            </div>
                        </div>

                        <div class="text-gray-700 bg-gray-200 p-3 rounded-2xl" v-for="data in address" :key="data.id">
                            <div class="flex items-center justify-between mb-5" id="radioGroup">
                                <label :for="data.id" class="font-semibold">{{ data.label }}</label>
                                <input type="radio" name="address" :id="data.id" :value="data.label"
                                    class="font-semibold mb-3" v-model="selectedAddress">
                            </div>
                            <p>{{ data.address }}</p>
                        </div>
                    </ion-col>
                </ion-row>
                <ion-row class="mt-[2em]">
                    <ion-col>
                        <ion-text class="font-semibold text-xl">Orders</ion-text>
                        <div class="overflow-hidden rounded-2xl flex flex-col gap-5 mt-3 bg-gray-200/80 py-8 px-5">
                            <div class="flex justify-between text-gray-700" v-if="item">
                                <img :src="item.image" :alt="item.title" class="object-contain w-[30%]">
                                <div class="grid gap-3 items-center">
                                    <ion-text class="font-bold">{{ item.title }}</ion-text>
                                    <ion-text class="text-sm">1x Gravy</ion-text>
                                    <ion-text class="text-sm">1x White Rice</ion-text>
                                    <ion-text class="text-sm">1x Large Coke</ion-text>
                                </div>
                            </div>
                            <div class="flex justify-between items-end py-5 text-gray-700">
                                <ion-text class="font-semibold text-red-600 text-3xl">{{ item.price }}</ion-text>
                                <span class="flex items-center justify-center gap-6 font-bold">
                                    <button class="qtyBtn">
                                        <font-awesome-icon :icon="['fas', 'fa-minus']" class="qtyIcon" />
                                    </button>
                                    1
                                    <button class="qtyBtn">
                                        <font-awesome-icon :icon="['fas', 'fa-plus']" class="qtyIcon" />
                                    </button>
                                </span>
                            </div>
                        </div>
                    </ion-col>
                </ion-row>
                <ion-row class="mt-[2em]">
                    <ion-col>
                        <ion-text class="font-semibold text-xl">Payment Options</ion-text>
                        <div class="flex flex-col gap-3 mt-3" v-for="payment in payments" :key="payment.id">
                            <div class="bg-gray-200 p-5 rounded-2xl text-gray-700">
                                <div class="flex justify-between items-center">
                                    <div v-if="payment.title">
                                        <label :for="payment.id" class="font-semibold mr-5">{{ payment.title }}</label>
                                        <span class="text-red-600 font-bold">{{ payment.points }}</span>
                                    </div>
                                    <div v-else class="object-contain">
                                        <img :src="payment.image" :alt="payment.payment" class="w-[50%]">
                                    </div>
                                    <input type="radio" name="payment" :id="payment.id" v-model="selectedPayment">
                                </div>
                                <p class="mt-3 text-sm text-gray-500">{{ payment.label }}</p>
                            </div>
                        </div>
                    </ion-col>
                </ion-row>
                <ion-row class="mt-[2em]">
                    <ion-col>
                        <div class="flex justify-between">
                            <ion-text class="font-semibold text-lg">Subtotal</ion-text>
                            <ion-text class="font-semibold text-lg">{{ item.price }}</ion-text>
                        </div>
                        <div class="flex justify-between">
                            <ion-text class="font-semibold text-lg">Delivery Charge</ion-text>
                            <ion-text class="font-semibold text-lg">Free</ion-text>
                        </div>
                        <div class="text-gray-700">
                            <ion-input class="bg-gray-200 border-2 border-gray-300 rounded-2xl !px-5 !py-3"
                                label="Change for" fill="solid" label-placement="stacked"
                                placeholder="e.g. 1,000"></ion-input>
                        </div>
                    </ion-col>
                </ion-row>
                <ion-row class="mt-[2em] border-t-1">
                    <ion-col>
                        <div class="flex justify-between items-center py-5">
                            <div>
                                <ion-text class="text-sm">Grand Total</ion-text>
                                <p class="font-bold text-lg">{{ item.price }}</p>
                            </div>
                            <button id="orderModal" expand="block" class="proceedButton !h-[50px] !rounded-2xl">
                                Place Order
                            </button>
                        </div>
                    </ion-col>
                </ion-row>
            </ion-grid>
            <ion-modal trigger="orderModal" ref="modal" id="order-modal">
                <div class="wrapper p-5">
                    <div class="flex flex-col items-center justify-center text-center gap-5 py-[5em]">
                        <div class="thumbsUp">
                            <font-awesome-icon :icon="['fas', 'thumbs-up']" class="thumb" />
                        </div>
                        <div>
                            <ion-text class="font-bold text-4xl">Order Received!</ion-text>
                            <p class="text-gray-400 mt-5">Your order <span class="font-semibold text-red-600">No.
                                    19049585</span> has successfully take and
                                now being processed. Kindly wait for our notification regarding your order.</p>
                        </div>
                    </div>

                    <div class="flex flex-col gap-5 text-center items-center">
                        <a @click="$router.push('/pages/home')">
                            <button class="proceedButton !rounded-2xl" @click="dismiss()">
                                Track Order
                            </button>
                        </a>
                        <a @click="$router.push('/pages/home')">
                            <button class="text-red-600" @click="dismiss()">Back to Home</button>
                        </a>
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
    IonInput
} from '@ionic/vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { caretDownSharp } from 'ionicons/icons';
const route = useRoute();
const itemID = parseInt(route.params.id);

const modal = ref();
const dismiss = () => {
    if (modal.value) {
        modal.value.dismiss();
    }
}

// payment options
import paypal from '@/assets/paypal.png'
import paynamics from '@/assets/paynamics.png'
const selectedPayment = ref('')
const payments = [
    {
        id: 1,
        title: 'Cash on Delivery',
        points: '',
        label: 'Pay when you received the order',
    },
    {
        id: 2,
        title: 'Loyalty Points',
        points: '(0 points)',
        label: 'Pay using your earned loyalty points'
    },
    {
        id: 3,
        title: '',
        image: paypal,
        payment: 'PayPal',
        points: '',
        label: 'A new tab will open to access you account'
    },
    {
        id: 4,
        title: '',
        image: paynamics,
        payment: 'Paynamics',
        points: '',
        label: 'Choose paynamics services available from you'
    }
]


// address
const selectedAddress = ref('')
const address = [
    {
        id: 1,
        label: 'My Home Address',
        address: 'No. 21 St. Agustin Street, Brgy. De Jose Delgado City 2234 Philippines',
    },
    {
        id: 2,
        label: 'Work/Office',
        address: '3rd flr Anyeong Bldg. Sereal St. Joaqin City 3456 Philippines',
    }
]

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

const addOns = [
    {
        id: 1,
        image: image18,
        title: 'Gravy',
        category: 'Sauce',
        price: 'P 49'
    },
    {
        id: 2,
        image: image17,
        title: 'White Rice',
        category: 'Rice',
        price: 'P 25'
    }
]

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