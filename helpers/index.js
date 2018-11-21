const hbs = require('hbs');
const helpers = require('handlebars-helpers');
const moment = require('moment');
const path = require('path');

//注册partials目录
hbs.registerPartials(path.join(__dirname,'../views/partials'));
// 只导入一部分,并且和我们的handlbars实例挂钩
helpers({
    handlebars: hbs.handlebars
})
hbs.registerHelper('date', function (date, format) {
    const m = moment(date);
    if (m) {
        return m.format(format)
    } else {
        return ''
    }
})