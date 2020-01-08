import _Vue from "Vue";

export default {
  install(Vue: typeof _Vue, options?: any) {
    Vue.filter("capitalize", function(value: string) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    });
  }
};
