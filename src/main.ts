import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BusHandler from '@/core/mixins/bus.mixin';
import dispatchActionForAllModules from './store/initialize.stores';

import Bootstrap from '@/plugins/bootstrap/bootstrap.plugin';
import { capitalize, secsToTimeString, dateFormat } from '@/plugins/filters/filters.plugin';

import { PasswordToggleDirective } from '@/plugins/directives/directives.plugin';

Vue.use(Bootstrap);
Vue.use(capitalize);
Vue.use(dateFormat);
Vue.use(secsToTimeString);
Vue.use(PasswordToggleDirective);

Vue.config.productionTip = false;

// Automatically run the `init` action for every module,
// if one exists.
dispatchActionForAllModules('Init').finally(() => {
    new Vue({
        router,
        store,
        mixins: [BusHandler],
        render: h => h(App)
    }).$mount('#app');
});
