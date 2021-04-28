import _Vue from 'Vue';
import moment from 'moment';

export default {
    install(Vue: typeof _Vue, options?: any) {
        Vue.filter('dateFormat', function(value: Date) {
            return moment(value)
                .local()
                .format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
