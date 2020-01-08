import _Vue from "vue";
import {
  LayoutPlugin,
  CardPlugin,
  TablePlugin,
  ButtonPlugin,
  ModalPlugin,
  ToastPlugin,
  TooltipPlugin,
  SpinnerPlugin,
  FormGroupPlugin,
  FormSelectPlugin,
  FormInputPlugin,
  PopoverPlugin,
  FormPlugin,
  FormCheckboxPlugin,
  NavPlugin,
  NavbarPlugin,
  TabsPlugin
} from "bootstrap-vue";

export default {
  install(Vue: typeof _Vue, options?: any) {
      Vue.use(LayoutPlugin);
      Vue.use(CardPlugin);
      Vue.use(TablePlugin);
      Vue.use(ButtonPlugin);
      Vue.use(ModalPlugin);
      Vue.use(ToastPlugin);
      Vue.use(TooltipPlugin);
      Vue.use(SpinnerPlugin);
      Vue.use(FormGroupPlugin);
      Vue.use(FormSelectPlugin);
      Vue.use(FormInputPlugin);
      Vue.use(PopoverPlugin);
      Vue.use(FormPlugin);
      Vue.use(FormCheckboxPlugin);
      Vue.use(NavPlugin);
      Vue.use(NavbarPlugin);
      Vue.use(TabsPlugin);
  }
};
