type BarcodeType = 'QR' | 'EAN13' | 'EAN8' | 'AZTEC' | 'DATAMATRIX' | 'UPCA' | 'UPCE' | 'CODABAR' | 'CODE39' | 'CODE93' | 'CODE128' | 'ITF' | 'MAXICODE' | 'PDF417' | 'RSS14' | 'RSSEXPANDED'
type BarcodeStyles = {
  background?: string
  frameColor?: string
  scanbarColor?: string

  top?: string
  left?: string
  width?: string
  height?: string
  position?: string
}
type PlusKeyType = 'backbutton' | 'keydown' | 'keyup' | 'longpressed' | 'menubutton' | 'searchbutton' | 'volumeupbutton' | 'volumedownbutton'
type GalleryCropStyle = {
  quality: number
  width: number
  height: number
  resize: boolean
}

type GalleryFilter = 'image' | 'video' | 'none'

type PopPosition = {
  top: string //弹出拍照或摄像窗口指示区域距离容器顶部的距离 单位支持像素值（如"100px"）和百分比（如"50%"），如不写单位则为像素值值。
  left: string
  width: string
  height: string
}

type GalleryOption = {
  animation?: Boolean
  confirmText?: String
  crop?: GalleryCropStyle
  editable?: Boolean
  filename?: String
  filter?: GalleryFilter
  maximum?: Number
  multiple?: Boolean
  permissionAlert?: Boolean
  popover?: PopPosition
  selected?: Array<String>
  system?: Boolean
  onmaxed?: () => void
}
type GalleryPickSuccessCallbackParam = string | {
  files: Array<string>
}
type GalleryPickSuccessCallback = (result: GalleryPickSuccessCallbackParam) => void
type GalleryMultiplePickSuccessCallback = (result: {
  files: Array<string>
}) => void

type GalleryErrorCallback = (err: PlusError) => void
type CameraCropStyle = {
  quality: number,
  width: number,
  height: number,
  resize: boolean
}
type CameraOption = {
  crop?: CameraCropStyle
  filename?: String
  format?: String
  index: '1' | '2'
  videoMaximumDuration?: Number
  optimize?: Boolean
  resolution?: String
  popover?: PopPosition
}
type PlusError = {
  code: string
  message: string
}
type CameraSuccessCallback = (capturedFile: string) => void
type CameraErrorCallback = (err: PlusError) => void
type Camera = {
  readonly supportedVideoResolutions
  readonly supportedImageFormats
  readonly supportedVideoFormats
  captureImage(successCB: CameraSuccessCallback, errorCB: CameraErrorCallback, option: CameraOption): void
  startVideoCapture(successCB: CameraSuccessCallback, errorCB: CameraErrorCallback, option: CameraOption): void
  stopVideoCapture(): void
}
type ActionButtonStyle = {
  color?: string
  title: string
  style?: 'destructive' | 'default'
}
type ActionSheetStyle = {
  title?: string,
  cancel?: string,
  buttons: Array<ActionButtonStyle>,
  popover?: {
    top: number
    left: number
    width: number
    height: number
  }

}
type ActionSheetCallback = (event: {
  index: number // 用户关闭时点击按钮的索引值 索引值从0开始  0表示用户点击取消按钮，大于0值表示用户点击ActionSheetStyles中buttons属性定义的按钮，索引值从1开始（即1表示点击buttons中定义的第一个按钮）。 通过API（close()方法）关闭，则回调函数中event的index属性值为-1。
}) => void
declare namespace plus {
  namespace key {
    function addEventListener(eventName: PlusKeyType, keyEventCallback: ({ keyCode: number }) => void): void
    function removeEventListener(eventName: PlusKeyType, keyEventCallback: ({ keyCode: number }) => void): void
  }

  namespace camera {
    /* 指定要获取摄像头的索引值，1表示主摄像头，2表示辅摄像头。如果没有设置则使用系统默认主摄像头。 */
    function getCamera(index: 1 | 2): Camera
  }

  namespace device {
    const imei: string
    const imsi: string
    const model: string
    const vendor: string
    const uuid: string
  }

  namespace networkinfo {
    const CONNECTION_UNKNOW: 0
    const CONNECTION_NONE: 1
    const CONNECTION_ETHERNET: 2
    const CONNECTION_WIFI: 3
    const CONNECTION_CELL2G: 4
    const CONNECTION_CELL3G: 5
    const CONNECTION_CELL4G: 6
    type NetType = 0 | 1 | 2 | 3 | 4 | 5 | 6
    function getCurrentType(): NetType
  }

  type DirectoryEntry = {
    isFile: boolean
    isDirectory: boolean
    name: string
    fullPath: string
    fileSystem: unknown
    toLocalURL: () => string
  }
  type FileEntry = {
    isFile: boolean
    isDirectory: boolean
    name: string
    fullPath: string
    fileSystem: unknown
    toLocalURL: () => string
    file: (succesCB?: (file: File) => void, errorCB?: (err: PlusError) => void) => void
  }
  type FileResolveSuccessCallback = (entry: FileEntry | DirectoryEntry) => void
  type FileErrorCallback = (err: PlusError) => void
  namespace io {
    class FileReader {
      onloadend(event: {
        target: {
          result: unknown
        }
      }): void
      readAsDataURL(file: File, encoding: 'UTF-8'): void
    }
    function resolveLocalFileSystemURL(url: string, succesCB: FileResolveSuccessCallback, errorCB?: FileErrorCallback): void
  }

  namespace nativeUI {
    function actionSheet(actionsheetStyle: ActionSheetStyle, actionsheetCallback: ActionSheetCallback): void
  }
  type GallerySaveEvent = {
    path: string
  }
  type GallerySuccessCallback = (event: GallerySaveEvent) => void
  namespace gallery {
    function pick(successCB: GalleryPickSuccessCallback, errorCB: GalleryErrorCallback, options: GalleryOption): void
    function save(path: string, successCB: GallerySuccessCallback, errorCB?: GalleryErrorCallback): void
  }

  type WebviewEvent = 'close' | 'loaded'
  type EventCallback = (event: { target: WebviewObject }) => void
  type HistoryQueryCallback = ({ canBack: boolean }) => void
  type WebviewObject = {
    id: string
    addEventListener(event: WebviewEvent, listener: EventCallback, capture?: boolean)
    show(): void
    close(): void
    back(): void
    canBack(cb: HistoryQueryCallback): void
  }

  type Extras = {
    [index: string]: unknown
  }
  namespace webview {
    function create(url: string, id: string, style?: unknown, extras?: Extras): WebviewObject
    function currentWebview(): WebviewObject
    function getTopWebview(): WebviewObject
  }

  namespace barcode {
    const QR: number
    class Barcode {
      constructor(domId: string, filters?: BarcodeType[] | null, styles?: BarcodeStyles | null, autoDecodeCharset?: boolean)
      // Methods

      //取消扫码识别 结束后可调用start方法重新开始识别。
      cancel();
      //关闭条码识别控件 释放控件占用系统资源，调用close方法后控件对象将不可使用。
      close();
      setFlash(open: boolean);
      setStyle(styles: BarcodeStyles)
      //开始扫码识别
      start(options?: {
        conserve?: boolean //是否保存扫码成功时的截图
        filename?: string //保存扫码成功时图片保存路径
        vibrate?: boolean //扫码成功时是否需要震动提醒
        sound?: 'none' | 'default' //扫码成功时播放的提示音
      });

      // Events
      onerror(err: unknown);
      onmarked(type: BarcodeType, code: string, file: string);
    }
  }

  namespace nativeObj {
    type Rect = {
      top: string
      left: string
      width: string
      height: string
    }
    type NativeObjSuccessCallback = () => void
    type NativeObjErrorCallback = (err: PlusError) => void
    type BitmapSaveOptions = {
      overwrite?: boolean
      format?: string
      quality?: number
      clip?: Rect
    }
    type BitmapSaveInfo = {
      target: string// 保存后的图片url路径，以"file://"开头
      size: number // 保存后图片的大小，单位为字节（Byte）
      width: number// 保存后图片的实际宽度，单位为px
      height: number
    }
    type BitmapSaveSuccessCallback = (event: BitmapSaveInfo) => void
    class Bitmap {
      constructor(id?: string, path?: string)
      id: string
      clear(): void
      loadBase64Data(data: string, successCallback: NativeObjSuccessCallback, errorCallback: NativeObjErrorCallback): void
      save(path: string, options: BitmapSaveOptions, successCallback: BitmapSaveSuccessCallback, errorCallback: NativeObjErrorCallback): void
    }
  }

  namespace android {
    function runtimeMainActivity(): ClassObject
    function invoke(obj: unknown, name: string, rect?: unknown): unknown
    class ClassObject {
      CLIPBOARD_SERVICE: string
      plusGetAttribute(name: string): unknown
      getSystemService(param: unknown): unknown
    }
    function importClass(classname: string | ClassObject): ClassObject
  }


  namespace zip {
    type ClipImageOptions = {
      top: string
      left: string
      width: string
      height: string
    }
    type CompressImageOptions = {
      src?: string
      dst?: string
      overwrite?: boolean
      format?: 'jpg' | 'png'
      quality?: number  //1-100
      width?: string //100px|50%|auto
      height?: string
      rotate?: number
      clip?: ClipImageOptions
    }
    type CompressImageEvent = {
      target: string
      size: number
      width: number
      height: number
    }
    type CompressImageSuccessCallback = (event: CompressImageEvent) => void
    type ZipErrorCallback = (err: PlusError) => void
    function compressImage(options: CompressImageOptions, successCB?: CompressImageSuccessCallback, errorCB?: ZipErrorCallback): void
  }
}



