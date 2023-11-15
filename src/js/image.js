function checkMobile() {
    var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
    if (varUA.indexOf('android') > -1) {
        //안드로이드
        return "android";
    } else if (varUA.indexOf("iphone") > -1 || varUA.indexOf("ipad") > -1 || varUA.indexOf("ipod") > -1) {
        //IOS
        return "ios";
    } else {
        //아이폰, 안드로이드 외
        return "other";
    }
}

function cameraAction() {
    window.ReactNativeWebView.postMessage("camera");
}
function galleryAction() {
    window.ReactNativeWebView.postMessage("gallery");
}

const receiver = checkMobile() === "ios" ? window : document;

receiver.addEventListener('message', (e) => {
    const { type, data } = JSON.parse(e.data);
    document.getElementById('imageSpan').innerText = data
    if (type == "photo") {
        document.getElementById('img').src = data
    }
    if (type == "androidPhoto") {
        document.getElementById('androidImage').innerHtml = data
    }
});
