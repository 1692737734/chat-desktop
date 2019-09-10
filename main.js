// 引入electron并创建一个Browserwindow
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const pkg = require('./package.json')
const ipc = require('electron').ipcMain
// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.

let mainWindow
let loginWin
let registerWin;

function createWindow () {
//创建浏览器窗口,宽高自定义具体大小你开心就好
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 680,
        frame:false,
        transparent:true,
        backgroundColor:"#00FFFFFF",
        webPreferences: {
            javascript: true,
            plugins: true,
            nodeIntegration: false, // 不集成 Nodejs
            webSecurity: false,
            preload: path.join(__dirname, './public/renderer.js') // 但预加载的 js 文件内仍可以使用 Nodejs 的 API
        }
    })
    // 加载应用----适用于 react 项目
    if (pkg.DEV) {
        mainWindow.loadURL('http://localhost:3000/')
    } else {
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, './build/index.html'),
            protocol: 'file:',
            slashes: true
        }))
    }

    // 打开开发者工具，默认不打开
    mainWindow.webContents.openDevTools()

    // 关闭window时触发下列事件.
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

function createLoginWindow () {
//创建浏览器窗口,宽高自定义具体大小你开心就好
    loginWin = new BrowserWindow({
        width: 340,
        height: 440,
        transparent:true,
        backgroundColor:"#00FFFFFF",
        frame:false,
        webPreferences: {
            javascript: true,
            plugins: true,
            nodeIntegration: false, // 不集成 Nodejs
            webSecurity: false,
            preload: path.join(__dirname, './public/renderer.js') // 但预加载的 js 文件内仍可以使用 Nodejs 的 API
        }
    })
    // 加载应用----适用于 react 项目
    if (pkg.DEV) {
        loginWin.loadURL('http://localhost:3000/#/login')
    } else {
        loginWin.loadURL(url.format({
            pathname: path.join(__dirname, './build/index.html'),
            protocol: 'file:',
            slashes: true
        }))
    }

    // 打开开发者工具，默认不打开
    loginWin.webContents.openDevTools()

    // 关闭window时触发下列事件.
    loginWin.on('closed', function () {
        loginWin = null
    })
}



// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)
// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (mainWindow === null) {
        createWindow()
    }
})

ipc.on('toLogin', () => {
    if(mainWindow!=null){
        mainWindow.close()
    }
    if(registerWin!=null){
        registerWin.close()
    }
    createLoginWindow()
})

ipc.on("close-login",()=>{
    loginWin.close()
})

ipc.on("toRegister",()=>{
    if(mainWindow!=null){
        mainWindow.close()
    }
    if(loginWin!=null){
        loginWin.close()
    }
    createRegisterWindow()
})

ipc.on("toHome",()=>{
    if(registerWin!=null){
        registerWin.close()
    }
    if(loginWin!=null){
        loginWin.close()
    }
    createWindow()
})

function createRegisterWindow () {
//创建浏览器窗口,宽高自定义具体大小你开心就好
    registerWin = new BrowserWindow({
        width: 340,
        height: 540,
        transparent:true,
        backgroundColor:"#00FFFFFF",
        frame:false,
        webPreferences: {
            javascript: true,
            plugins: true,
            nodeIntegration: false, // 不集成 Nodejs
            webSecurity: false,
            preload: path.join(__dirname, './public/renderer.js') // 但预加载的 js 文件内仍可以使用 Nodejs 的 API
        }
    })
    // 加载应用----适用于 react 项目
    if (pkg.DEV) {
        registerWin.loadURL('http://localhost:3000/#/register')
    } else {
        registerWin.loadURL(url.format({
            pathname: path.join(__dirname, './build/index.html'),
            protocol: 'file:',
            slashes: true
        }))
    }

    // 打开开发者工具，默认不打开
    registerWin.webContents.openDevTools()

    // 关闭window时触发下列事件.
    registerWin.on('closed', function () {
        registerWin = null
    })
}


ipc.on("close-register",()=>{
    registerWin.close()
})
