const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 30;
const YEAR = MONTH * 12;
const IN_MILLISECONDS = 1000;
function SecsToTimeString(timeInSecs, shortText = false, hoursOnly = false) {
    const secs = Math.round(timeInSecs % MINUTE);
    const minutes = Math.round((timeInSecs % HOUR) / MINUTE);
    const hours = Math.round((timeInSecs % DAY) / HOUR);
    const days = Math.round(timeInSecs / DAY);
    let ss = '';
    if (days) ss = ss + days + (shortText ? 'd' : ' Day(s) ');
    if (hours || hoursOnly) ss = ss + hours + (shortText ? 'h' : ' Hour(s) ');
    if (!hoursOnly) {
        if (minutes) ss = ss + minutes + (shortText ? 'm' : ' Minute(s) ');
        if (secs || (!days && !hours && !minutes)) ss = ss + secs + (shortText ? 's' : ' Second(s).');
    }
    return ss;
}
export default {
    install(Vue, options) {
        Vue.filter('secsToTimeString', function(value, shortText, hoursOnly) {
            return SecsToTimeString(value, shortText, hoursOnly);
        });
    }
};
// # sourceMappingURL=secsToTimeString.filter.js.map
