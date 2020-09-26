import _Vue, { VNode, DirectiveOptions } from 'vue';
import { DirectiveBinding } from 'vue/types/options';

import PasswordToggle from './PasswordToggle.vue';

const toggleComponent = _Vue.extend(PasswordToggle);

const passwordToggleDirective: DirectiveOptions = {
	inserted(el: any, binding: DirectiveBinding, node: VNode) {
		const data = binding.value;
		const eye = new toggleComponent({
			el: document.createElement('div'),
			data: {
				Node: node,
				Color: data.color,
				Top: data.top
			}
		}).$mount();

		el.instance = eye;
		el.toggler = eye.$el;

		_Vue.nextTick(() => {
			if (!node || !node.elm || !node.elm.parentNode) return;
			node.elm.parentNode.insertBefore(eye.$el, node.elm.nextSibling);
		});
	},
	unbind: function(el: any, binding: DirectiveBinding, vnode: VNode) {
		if (el.toggler && el.toggler.parentNode) {
			el.toggler.parentNode.removeChild(el.toggler);
		}
		el.instance && el.instance.$destroy();
	}
};

export default {
	install(Vue: typeof _Vue, options?: any) {
		Vue.directive('pwt', passwordToggleDirective);
	}
};
