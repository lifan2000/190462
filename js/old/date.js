function getTime() {
    var today = new Date();
    var week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    var DDDD = today.getFullYear() + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日" + " " + week[today.getDay()]
    document.write(DDDD);
}
getTime();