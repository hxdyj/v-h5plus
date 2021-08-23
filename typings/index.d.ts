import { Router } from 'vue-router';

declare enum PlusEventName {
    'plusready' = "plusready",
    'pause' = "pause",
    'resume' = "resume",
    'netchange' = "netchange",
    'newintent' = "newintent",
    'plusscrollbottom' = "plusscrollbottom",
    'error' = "error",
    'background' = "background",
    'foreground' = "foreground",
    'trimmemory' = "trimmemory",
    'splashclosed' = "splashclosed",
    'keyboardchange' = "keyboardchange",
    'uistylechange' = "uistylechange"
}
declare enum PlusKeyName {
    'backbutton' = "backbutton"
}
declare function amendPlusBackButton(router: Router): void;
declare function onPlusReady(): Promise<unknown>;

export { PlusEventName, PlusKeyName, amendPlusBackButton, onPlusReady };
