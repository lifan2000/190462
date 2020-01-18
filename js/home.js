// 手机端 menu点击事件
function menuOpen() {
    document.getElementById("nav").className = "nav active";
    document.getElementById("menu").className = "iconfont icon-close";
    document.getElementById("menu").onclick = menuClose;
}
function menuClose() {
    document.getElementById("nav").className = "nav";
    document.getElementById("menu").className = "iconfont icon-menu";
    document.getElementById("menu").onclick = menuOpen;
}