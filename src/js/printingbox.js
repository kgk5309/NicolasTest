function setState(state) {
    document.getElementById("state").innerText = state
}

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

// 네이티브 로그인 정보 저장기능
function loginAction() {

    var data = JSON.stringify({
        type: "login",
        data: document.getElementById("id-data").valueata
    })

    if (checkMobile() == "android") {
        setState("안드로이드 로그인")
        window.ReactNativeWebView.postMessage(data);
        return;
    }

    if (checkMobile() == 'ios') {
        setState("아이폰 로그인")
        window.webkit.messageHandlers.messageHandler.postMessage(data)
    }

}

// 네이티브 로그인 정보 초기화 기능
function logoutAction() {

    var data = JSON.stringify({
        type: "logout"
    })

    if (checkMobile() == "android") {
        setState("안드로이드 로그아웃")
        window.ReactNativeWebView.postMessage(data);
        return;
    }

    if (checkMobile() == "ios") {
        setState("아이폰 로그아웃")
        window.webkit.messageHandlers.messageHandler.postMessage(data)
    }
    document.getElementById("id-data").value = ""
    document.getElementById("get-data").innerText = ""
}

// 저장된 로그인 정보 가져오기 기능
function getLoginData() {
    var data = JSON.stringify({
        type: "getLoginData"
    })

    if (checkMobile() == "android") {
        setState("안드로이드 로그인 데이터 Get")
        window.ReactNativeWebView.postMessage(data);
        return;
    }

    if (checkMobile() == "ios") {
        setState("아이폰 로그인 데이터 Get")
        window.webkit.messageHandlers.messageHandler.postMessage(data)
    }
}
const receiver = checkMobile() === "ios" ? window : document;

receiver.addEventListener('message', (e) => {
    const { data } = JSON.parse(e.data);
    document.getElementById("get-data").innerText = data
});
