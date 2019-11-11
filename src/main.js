const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.last');
const x = localStorage.getItem('x');
const xObject = JSON.parse(x);
const hashMap = xObject || [
    { logo: "A", logoType: 'text', url: "https://www.acfun.cn", name: "acfun" },
    { logo: "B", logoType: 'text', url: "https://www.bilibili.com", name: "bilibili" },
];

const modify = () => {

}

const render = () => {
    $siteList.find('li:not(.last)').remove();
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
        <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="details">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-details"></use>
                </svg>
            </div>
        </div>
        <div class="link">${node.name}</div>
    </li>`).insertBefore($lastLi);
        $li.click(function () {
            window.open(node.url);
        });
        $li.on('click', '.details', (e) => {
            e.stopPropagation();
            $("#shade").removeClass("hide");
            $(".c3").removeClass("hide");
            $(".c3 button").click(function () {
                $("#shade").addClass("hide");
                $(".c3").addClass("hide");
            });
            $(".c3").on('click', '.close', () => {

                hashMap.splice(index, 1);
                render();
                window.location.reload();
            });
            $(".c3").on('click', '.permit', () => {
                if ($(".c3 .url input[type='text']").val() &&
                    $(".c3 .name input[type='text']").val()) {
                    let url = $(".c3 .url input[type='text']").val();
                    let name = $(".c3 .name input[type='text']").val();
                    if (url.indexOf('https://') !== 0) {
                        url = "https://" + url;
                    }
                    hashMap.splice(index, 1, {
                        logo: name[0],
                        logoType: 'text',
                        name: name,
                        url: url
                    });
                    $(".url input[type='text']").val("");
                    $(".name input[type='text']").val("");
                    render();
                    window.location.reload();
                }
            })
        });

    });
}

render();


$(".addButton").click(function () {
    $("#shade").removeClass("hide");
    $(".c2").removeClass("hide");
});
$(".c2 button").click(function () {
    $("#shade").addClass("hide");
    $(".c2").addClass("hide");
});




$("#modal .permit").click(function () {
    if ($(".url input[type='text']").val() &&
        $(".name input[type='text']").val()) {
        let url = $(".url input[type='text']").val();
        let name = $(".name input[type='text']").val();
        if (url.indexOf('https://') !== 0) {
            url = "https://" + url;
        }
        hashMap.push({
            logo: name[0],
            logoType: 'text',
            name: name,
            url: url
        });
        render();
        $(".url input[type='text']").val("");
        $(".name input[type='text']").val("");
    }
});

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap);
    localStorage.setItem('x', string);
}

