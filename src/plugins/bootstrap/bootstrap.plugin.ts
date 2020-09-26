import _Vue from 'vue';
import { LayoutPlugin, ModalPlugin, ToastPlugin, SpinnerPlugin, PopoverPlugin, FormCheckboxPlugin } from 'bootstrap-vue';

export default {
	install(Vue: typeof _Vue, options?: any) {
		Vue.use(LayoutPlugin);
		Vue.use(ModalPlugin);
		Vue.use(ToastPlugin);
		Vue.use(SpinnerPlugin);
		Vue.use(PopoverPlugin);
		Vue.use(FormCheckboxPlugin);
	}
};
