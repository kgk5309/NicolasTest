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

    var loginData = document.getElementById("id-data").value

    if (checkMobile() == "android") {
        window.ReactNativeWebView.postMessage(JSON.stringify({
            type: "login",
            data: loginData
        }));
        return;
    }

    if (checkMobile() == 'ios') {
        window.webkit.messageHandlers.login.postMessage(loginData)
    }

}

// 네이티브 로그인 정보 초기화 기능
function logoutAction() {
    if (checkMobile() == "android") {
        window.ReactNativeWebView.postMessage(
            JSON.stringify({
                type: "logout"
            })
        );
        return;
    }
    if (checkMobile() == "ios") {
        window.webkit.messageHandlers.logout.postMessage()
    }
    document.getElementById("id-data").value = ""
    document.getElementById("get-data").innerText = ""
}

// 저장된 로그인 정보 가져오기 기능
function getLoginData() {
    if (checkMobile() == "android") {
        window.ReactNativeWebView.postMessage(
            JSON.stringify({
                type: "getLoginData"
            })
        );
        return;
    }
    if (checkMobile() == "ios") {
        window.webkit.messageHandlers.getLoginData.postMessage()
    }
}
const receiver = checkMobile() === "ios" ? window : document;

receiver.addEventListener('message', (e) => {
    const { data } = JSON.parse(e.data);
    document.getElementById("get-data").innerText = data
});
