import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';
import { StatusBar, Style } from '@capacitor/status-bar';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAngleLeft, faAngleRight, faBagShopping, faBell, faBurger, faCircleQuestion, faClockRotateLeft, faHeart, faHouse, faLocationDot, faMagnifyingGlass, faMinus, faPlus, faSliders, faStar, faStore, faThumbsUp, faUser, faWebAwesome } from '@fortawesome/free-solid-svg-icons'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
import '@ionic/vue/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

library.add(
  faWebAwesome,
  faHouse,
  faBurger, 
  faBell, 
  faStore, 
  faCircleQuestion, 
  faBagShopping, 
  faUser, 
  faHeart, 
  faLocationDot, 
  faClockRotateLeft, 
  faAngleRight,
  faMagnifyingGlass,
  faSliders,
  faStar,
  faAngleLeft,
  faMinus,
  faPlus,
  faThumbsUp,
)

const app = createApp(App)
  .use(IonicVue, {
    mode: 'ios'
  })
  .use(router);

app.component('font-awesome-icon', FontAwesomeIcon)

router.isReady().then(() => {
  app.mount('#app');

  StatusBar.setStyle({ style: Style.Dark });
  StatusBar.setBackgroundColor({ color: '#00000048' });
  StatusBar.setOverlaysWebView({ overlay: false });
  StatusBar.show();
});