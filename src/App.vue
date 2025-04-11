<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { StatusBar, Style } from '@capacitor/status-bar';
import { onMounted } from 'vue';

onMounted(() => {
  StatusBar.setStyle({ styel: Style.Dark });
  StatusBar.setBackgroundColor({ color: '#00000048' });
  StatusBar.setOverlaysWebView({ overlay: false });
})
</script>
