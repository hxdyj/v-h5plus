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
export function amendPlusBackButton(router: Router) {
    plus.key.addEventListener('backbutton', function () {
        router.go(-1)
    })
}

// export function plusShowWebview(url: string) {
//     let wv = plus.webview.create(url, url)
//     wv.show()
//     let listener = function () {
//         let currentWv = plus.webview.currentWebview();
//         if (currentWv.id === wv.id) {
//             plus.key.removeEventListener('backbutton', listener)
//             wv.close()
//         }
//     }
//     plus.key.addEventListener('backbutton', listener)
// }

export function onPlusReady() {
    return new Promise((resolve, reject) => {
        document.addEventListener(PlusEventName.plusready, function () {
            resolve('ready')
        })
    })
}


