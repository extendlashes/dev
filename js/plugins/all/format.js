export default {
    install(Vue) {
        Vue.prototype.__phone = function(phone) {
            phone = phone.toString();

            return '+7 (' + phone.substr(1, 3) + ') ' + phone.substr(4, 3) + '-' + phone.substr(7, 2) + '-' + phone.substr(9, 2);
        };

        Vue.prototype.__date = function(date) {
            const day = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
            const month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

            date = date.split('-');
            date = new Date(date[0], date[1] - 1, date[2]);

            return date.getDate() + ' ' + day[date.getDay()] + ' ' + month[date.getMonth()];
        };
    }
};