const electronMod=require('electron');
const {app, BrowserWindow}=electronMod;
const path=require('path');
const url=require('url');

let windowObj=null;

//function to create the application window
function createWindow(){
    windowObj=new BrowserWindow({
        width:800,
        height:550        

    });

    windowObj.loadURL(url.format(path.join(__dirname,'fourier-series.html')));

    //windowObj.webContents.openDevTools();
    windowObj.on('closed',()=>{
        windowObj=null;
    });
}

app.on('ready',createWindow);
app.on('window-all-closed',()=>{
    if(process.platform=='darwin'){
        app.quit();
    }
});

app.on('activate',()=>{
    if(windowObj==null){
        createWindow();
    }
});