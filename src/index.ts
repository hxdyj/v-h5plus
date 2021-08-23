import { Router } from "vue-router";
export enum PlusEventName {
    'plusready' = 'plusready',
    'pause' = 'pause',
    'resume' = 'resume',
    'netchange' = 'netchange',
    'newintent' = 'newintent',
    'plusscrollbottom' = 'plusscrollbottom',
    'error' = 'error',
    'background' = 'background',
    'foreground' = 'foreground',
    'trimmemory' = 'trimmemory',
    'splashclosed' = 'splashclosed',
    'keyboardchange' = 'keyboardchange',
    'uistylechange' = 'uistylechange',
}
export enum PlusKeyName {
    'backbutton' = 'backbutton',
}
export function amendPlusBackButton(router: Router) {
    plus.key.addEventListener(PlusKeyName.backbutton, function () {
        let launchWv = plus.webview.getLaunchWebview()
        let currentWv = plus.webview.currentWebview()
        if (launchWv.id === currentWv.id) {
            launchWv.canBack(resp => {
                if (resp.canBack) {
                    launchWv.back()
                } else {
                    router.go(-1)
                }
            })
        }
    })
}

export function onPlusReady() {
    return new Promise((resolve, reject) => {
        document.addEventListener(PlusEventName.plusready, function () {
            resolve('ready')
        })
    })
}


