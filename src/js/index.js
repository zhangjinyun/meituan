var mySwiper = new Swiper(".swiper-container", {
    pagination: {
        el: ".swiper-pagination"
    }
});
var bScroll = new BScroll(".section");
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