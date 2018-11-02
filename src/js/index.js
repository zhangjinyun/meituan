var mySwiper = new Swiper(".swiper-container", {
    pagination: {
        el: ".swiper-pagination"
    }
});
var bScroll = new BScroll(".section", {
    probeType: 2
});

// swiper 渲染
var pageOne = document.querySelector(".pageOne");
var pageTwo = document.querySelector(".pageTwo");
var xhr = new XMLHttpRequest();
xhr.open("get", "/api/swiper", true);
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            if (data.code === 0) {
                data.data.forEach(function(file) {
                    var html = "";
                    var html2 = "";
                    file.pageOne.forEach(function(item) {
                        html += `<dl>
                        <dt><img src="img/${item.img}" alt=""></dt>
                        <dd>${item.tit}</dd>
                    </dl>`;
                    })
                    file.pageTwo.forEach(function(item) {
                        html2 += `<dl>
                        <dt><img src="img/${item.img}" alt=""></dt>
                        <dd>${item.tit}</dd>
                    </dl>`;
                    })
                    pageOne.innerHTML = html;
                    pageTwo.innerHTML = html2;
                })
            }
        }
    }
}
xhr.send();

// 食物列表渲染
var foodList = document.querySelector(".foodList");
var newData;
var xml = new XMLHttpRequest();
xml.open("get", "/api/foodList", true);
xml.onreadystatechange = function() {
    if (xml.readyState === 4) {
        if (xml.status === 200) {
            var data = JSON.parse(xml.responseText);
            newData = data;
            if (data.code === 0) {
                render(newData.data);
            }
        }
    }
}
xml.send();
// 初始化渲染
function render(data) {
    var html = "";
    data.forEach(function(file) {
        html += ` <li>
                    <img src="img/${file.img}" alt="">
                    <div class="cen">
                        <p>${file.tit}</p>
                        <p>${file.address}</p>
                        <p><span>${file.price}元 </span><span> 门市价:${file.money}元</span></p>
                    </div>
                    <p class="rig">已售${file.num}</p>
                </li>`;
    })
    foodList.innerHTML += html;
}

var refresh = document.querySelector(".refresh");
var load = document.querySelector(".load");
var page = 1;
bScroll.on("scroll", function() {
    if (this.y < this.maxScrollY - 40) {
        if (page > 5) {
            load.innerHTML = "---我是有底线的---";
        } else {
            load.innerHTML = "释放加载更多...";
            load.classList.add("flip");
        }
    } else if (this.y < this.maxScrollY - 20) {
        load.innerHTML = "上拉加载";
        load.classList.remove("flip");
    } else if (this.y > 40) {
        refresh.innerHTML = "释放刷新更多...";
        refresh.classList.add("flip");
    } else if (this.y > 20) {
        refresh.innerHTML = "下拉刷新";
        refresh.classList.remove("flip");
    }
})

bScroll.on("scrollEnd", function() {
    if (load.classList.contains("flip")) {
        // console.log("加载")
        loadData();
        load.innerHTML = "上拉加载";
        load.classList.remove("flip");
    } else if (refresh.classList.contains("flip")) {
        // console.log("刷新")
        refreshData();
        refresh.innerHTML = "下拉刷新";
        refresh.classList.remove("flip");
    }
})

// 加载
function loadData() {
    page++;
    render(newData.data);
    bScroll.refresh();
}

// 刷新
function refreshData() {
    foodList.innerHTML = "";
    page = 1;
    render(newData.data);
    load.innerHTML = "上拉加载";
    bScroll.refresh();
}