var imgList = document.getElementById("imgList");
var imgs = document.getElementById("imgList").getElementsByTagName("dt");
var btns = document.getElementById("btnList").getElementsByTagName("button");
var a = document.getElementsByClassName("img__a");
var preArrow = document.getElementById("preArrow");
var nextArrow = document.getElementById("nextArrow");
var imgWidth = imgs[0].clientWidth;
var oldWidth = imgWidth;
var index = 1, timerl, timel = 0, flagl = 0;
var imgNum = 1, timers, times = 0, flags = 0;
var startX = 0, distanceX = 0, isMove = false;
// 尺寸动态监听并选择
var option = function () {
    imgWidth = imgs[0].clientWidth;
    if (imgWidth > 1000) {
        initl();
        timerl = setInterval(runLarge,1000);
        // 箭头点击轮播
        preArrow.addEventListener("click", goPre);
        nextArrow.addEventListener("click", goNext);
        // 鼠标move暂停
        for(var il = 0; il < imgs.length; il++) {
            imgs[il].onmousemove = function () {
                if (imgWidth > 1000) {
                    clearInterval(timerl);
                    timel = 0;
                }
            };
            imgs[il].onmouseout = function () {timerl = setInterval(runLarge,1000);};
        }
        // 按钮点击轮播
        for(var jl = 0; jl < btns.length; jl++) {
            btns[jl].addEventListener("click",function () {
                if (imgWidth > 1000) {
                    index = this.getAttribute("data-index");
                    goIndex();
                    timel = 0;
                }
            })
        }
        // 监听尺寸变化
        window.onresize = option;
    }
    else {
        inits();
        timers = setInterval(runSmall,1000);
        // 触摸滑动轮播
        imgList.addEventListener("touchstart",function (e) {
            if (imgWidth < 1000) {
                clearInterval(timers);
                startX = e.touches[0].clientX;
            }
        });
        imgList.addEventListener("touchmove",function (e) {
            if (imgWidth < 1000) {
                var moveX = e.touches[0].clientX;
                distanceX = moveX - startX;
                var translateX = -imgNum * imgWidth + distanceX;
                removeTransition();
                imgList.style.transform = 'translateX(' + translateX + 'px)';
                imgList.style.webkittransform = 'translateX(' + translateX + 'px)';
                isMove = true;
            }
        });
        imgList.addEventListener("touchend",function ( ) {
            if (imgWidth < 1000) {
                if (isMove) {
                    if (Math.abs(distanceX) < imgWidth / 3) {
                        addTransition();
                        changeImg();
                        changeBtn(imgNum);
                    }
                    else {
                        if (distanceX > 0) {imgNum--;}
                        else {imgNum++;}
                        addTransition();
                        changeImg();
                        changeBtn(imgNum);
                    }
                    startX = distanceX = 0;
                    isMove = false;
                    clearInterval(times);
                    times = 0;
                    timers = setInterval(runSmall,1000);
                }
            }
        });
        // 无缝轮播
        imgList.addEventListener("transitionend",function () {
            if (imgWidth < 1000) {
                check();
                changeBtn(imgNum);
            }
        });
        // 鼠标move暂停
        for(var is = 0; is < imgs.length; is++) {
            (function(is) {
                imgs[is].onmousemove = function () {
                    if (imgWidth < 1000) {
                        clearInterval(timers);
                        imgNum = is;
                        addTransition();
                        changeImg();
                        changeBtn(imgNum);
                        times = 0;
                    }
                };
                imgs[is].onmouseout = function () {timers = setInterval(runSmall,1000);};
            })(is)
        }
        // 按钮点击轮播
        for(var js = 0; js < btns.length; js++) {
            btns[js].addEventListener("click",function () {
                imgNum = this.getAttribute("data-index");
                if (imgWidth < 1000) {
                    addTransition();
                    changeImg();
                    changeBtn(imgNum);
                    times = 0;
                }
            })
        }
        // 监听尺寸变化
        window.onresize = option;
    }
};
option();
// large初始化
function initl() {
    if (oldWidth > 1000) {largeLarge();}
    else {smallLarge();}
    oldWidth = imgWidth;
}
function largeLarge() {
    if (!flagl) {
        imgs[1].className = "img active";
        btns[0].className = "active";
        flagl++;
    }
    clearInterval(timerl);
    clearInterval(timers);
    timel = 0;
}
function smallLarge() {
    clearInterval(timerl);
    clearInterval(timers);
    index = imgNum;
    if (index > 5) {index = 1;}
    imgNum = 0;
    removeTransition();
    changeImg();
    clearBtn();
    goIndex();
    timel = 0;
}
function runLarge() {
    timel++;
    if (timel >= 3) {goNext();}
}
function clearActive() {
    for(var i = 0; i < imgs.length; i++) {
        imgs[i].className = "img";
    }
    for (var j = 0; j < btns.length; j++) {
        btns[j].className = "";
    }
}
function goIndex() {
    clearActive();
    imgs[index].className = "img active";
    btns[index - 1].className = "active";
}
function goPre() {
    if (index <= 1) {index = 5;}
    else {index--;}
    goIndex();
    timel = 0;
}
function goNext() {
    if (index >= 5){index = 1;}
    else {index++;}
    goIndex();
    timel = 0;
}
// small初始化
function inits() {
    if (oldWidth > 1000) {largeSmall();}
    else {smallSmall();}
    oldWidth = imgWidth;
}
function smallSmall() {
    if (!flags) {
        changeImg();
        changeBtn(imgNum);
        flags++;
    }
    clearInterval(timerl);
    clearInterval(timers);
    clearActive();
    changeImg();
    changeBtn(imgNum);
    times = 0;
}
function largeSmall() {
    clearInterval(timerl);
    clearInterval(timers);
    clearActive();
    imgNum = index;
    removeTransition();
    changeImg();
    changeBtn(imgNum);
    times = 0;
}
function runSmall() {
    times++;
    if (times >= 3) {nextImg();}
}
function nextImg() {
    imgNum++;
    addTransition();
    changeImg();
    changeBtn(imgNum);
    times = 0;
}
function check() {
    if (imgNum > 5) {
        imgNum = 1;
        removeTransition();
        changeImg();
    }
    else if (imgNum < 1) {
        imgNum = 5;
        removeTransition();
        changeImg();
    }
}
function addTransition() {
    imgList.style.transition = "transform 1s";
    imgList.style.webkittransition = "transform 1s";
}
function removeTransition() {
    imgList.style.transition = "";
    imgList.style.webkittransition = "";
}
function changeImg() {
    //imgList.style.left = "-" + imgNum * imgWidth + "px";
    imgList.style.transform = 'translateX(' + -imgNum * imgWidth + 'px)';
    imgList.style.webkittransform = 'translateX(' + -imgNum * imgWidth + 'px)';
}
function changeBtn(n) {
    clearBtn();
    if (n > 5) {n = 1;}
    else if (n < 1) {n = 5;}
    btns[n - 1].style.backgroundColor = "rgba(184, 134, 194, 1)";
}
function clearBtn() {
    for(var i = 0; i < btns.length; i++) {
        if (imgWidth < 740)
            btns[i].style.backgroundColor = "#fff";
        else
            btns[i].style.backgroundColor = "";
    }
}