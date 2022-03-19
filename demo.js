window.addEventListener('load', function () {
    var slideshow = document.querySelector('.slideshow');
    var ul = document.querySelector('ul');
    var ol = document.querySelector('ol');
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focusWidth = slideshow.offsetWidth;
    var timer1 = setInterval(function () {
        arrow_r.click();
    }, 2000)
    slideshow.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer1);
        console.log('on');
    })
    slideshow.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        clearInterval(timer1);
        timer1 = setInterval(function () {
            arrow_r.click();
        }, 2000)
    })
    for (let i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            console.log(index);
            num = index;
            circle = index;
            animate(ul, -index * focusWidth);
        })
    }


    ol.children[0].className = 'current';
    var first = ul.children[0].cloneNode(true);//深拷贝
    ul.appendChild(first);
    var num = 0;
    var circle = 0;



    // 右箭头+节流阀
    var flag = true;
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, - num * focusWidth, function () {
                flag = true;
            });
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[circle].className = 'current';
        }
    })


    // 左箭头+节流阀
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = - num * focusWidth + 'px';
            }
            num--;
            circle--;
            animate(ul, - num * focusWidth, function () {
                flag = true;
            });
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[circle].className = 'current';
        }
    })



})
