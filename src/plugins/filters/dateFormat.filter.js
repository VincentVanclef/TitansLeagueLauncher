import moment from 'moment';
export default {
	install(Vue, options) {
		Vue.filter('dateFormat', function(value) {
			return moment(value)
				.local()
				.format('YYYY-MM-DD HH:mm:ss');
		});
	}
};
//# sourceMappingURL=dateFormat.filter.js.map
