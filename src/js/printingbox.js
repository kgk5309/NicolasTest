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

function loginAction() {

    var loginData = document.getElementById("id-data").value

    if (checkMobile() == "android") {
        setState('android로그인 호출함');
        window.ReactNativeWebView.postMessage(JSON.stringify({
            type: "login",
            data: loginData
        }));
        return;
    }

    if (checkMobile() == 'ios') {
        setState('ios로그인 호출함');
        window.webkit.messageHandlers.login.postMessage(loginData)
    }

}
function logoutAction() {
    if (checkMobile() == "android") {
        window.ReactNativeWebView.postMessage(
            JSON.stringify({
                type: "logout"
            })
        );
        return;
    }
    document.getElementById("id-data").value = ""
    document.getElementById("get-data").innerText = ""
}
function getLoginData() {
    if (checkMobile() == "android") {
        window.ReactNativeWebView.postMessage(
            JSON.stringify({
                type: "getLoginData"
            })
        );
        return;
    }
}
const receiver = checkMobile() === "ios" ? window : document;

receiver.addEventListener('message', (e) => {
    const { data } = JSON.parse(e.data);
    document.getElementById("get-data").innerText = data
});
