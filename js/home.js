var imgWidth = window.innerWidth;
//var imgWidth = document.body.clientWidth;
var oldWidth = imgWidth;
var imgs = document.getElementById("imgList").getElementsByTagName("dt");
var btns = document.getElementById("btnList").getElementsByTagName("button");
var preArrow = document.getElementById("preArrow");
var nextArrow = document.getElementById("nextArrow");
var index = 0;
var left = 0;
var timer;
var time;
var flag = 0;
var option = function () {
    imgWidth = window.innerWidth;
    //imgWidth = document.body.clientWidth;
    if (imgWidth > 1000) {
        initl();
        function initl() {
            time = 0;
            clearTimeout(timer);
            if (!flag) {
                imgs[0].className = "active";
                btns[0].className = "active";
            }
            flag++;
        }
        timer = setInterval(runLarge,1000);
        preArrow.addEventListener("click", goPre);
        nextArrow.addEventListener("click", goNext);
        for(var il = 0; il < imgs.length; il++) {
            imgs[il].onmousemove = function () {
                clearInterval(timer);
            };
            imgs[il].onmouseout = function () {
                timer = setInterval(runLarge,1000);
            };
        }
        for(var jl = 0; jl < btns.length; jl++) {
            btns[jl].addEventListener("click",function () {
                index = this.getAttribute("data-index");
                goIndex();
                time = 0;
            })
        }
        window.onresize = option;
    }
    else {
        inits();
        function inits() {
            clearInterval(timer);
            clearActive();
            clearTimeout(timer);
            check();
        }
        runSmall();
        for(var is = 0; is < imgs.length; is++) {
            (function(is) {
                imgs[is].onmousemove = function () {
                    clearTimeout(timer);
                    left = -is * imgWidth;
                    changeImg();
                    changeBtn(is);
                };
                imgs[is].onmouseout = function () {
                    runSmall();
                };
            })(is)
        }
        for(var js = 0; js < btns.length; js++) {
            btns[js].addEventListener("click",function () {
                btnNum = this.getAttribute("data-index");
                left = -btnNum * imgWidth;
                changeImg();
                changeBtn(btnNum);
            })
        }
        function check() {
            var n = Math.floor(-left / oldWidth);
            left = - n * imgWidth;
            changeImg();
            oldWidth = imgWidth;
        }
        window.onresize = option;
    }
};
option();
function runLarge() {
    time++;
    if (time == 6) {
        goNext();
    }
}
function clearActive() {
    for(var i = 0; i < imgs.length - 1; i++) {
        imgs[i].className = "";
        btns[i].className = "";
    }
}
function goIndex() {
    clearActive();
    imgs[index].className = "active";
    btns[index].className = "active";
}
function goPre() {
    if (index == 0) {index = 4;}
    else {index--;}
    goIndex();
    time = 0;
}
function goNext() {
    if (index == 4){index = 0;}
    else {index++;}
    goIndex();
    time = 0;
}
function runSmall() {
    if (left <= -imgWidth * 5) {
        left = 0;
        imgList.style.left = left + "px";
    }
    //var m = (left % imgWidth == 0)?3000:30;
    changeImg();
    var n = Math.floor(-left / imgWidth);
    changeBtn(n);
    left -= imgWidth;
    timer = setTimeout(runSmall,3000);
}
function changeImg() {
    imgList.style.left = left + "px";
}
function changeBtn(n) {
    for(var i = 0; i < btns.length; i++) {
        if (imgWidth < 740)
            btns[i].style.backgroundColor = "#fff";
        else
            btns[i].style.backgroundColor = "";
    }
    btns[n].style.backgroundColor = "rgba(184, 134, 194, 1)";
}