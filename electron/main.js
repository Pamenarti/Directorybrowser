const { app, BrowserWindow, session, ipcMain } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV !== 'production';

let mainWindow;

const createWindow = () => {
  // Tarayıcı penceresini oluştur
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1200,
    minHeight: 800,
    maxWidth: 1200,
    maxHeight: 800,
    resizable: false,
    frame: false,
    icon: path.join(__dirname, '../build/icon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      webSecurity: true,
      allowRunningInsecureContent: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Disable DevTools in production
  if (process.env.NODE_ENV === 'production') {
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools();
    });
  }

  // Disable keyboard shortcut for DevTools (Ctrl+Shift+I / Cmd+Option+I)
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if ((input.control || input.meta) && input.shift && input.key.toLowerCase() === 'i') {
      event.preventDefault();
    }
  });

  // CORS ve güvenlik ayarları
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    callback({
      requestHeaders: {
        ...details.requestHeaders,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
  });

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Access-Control-Allow-Origin': ['*'],
        'Access-Control-Allow-Methods': ['*'],
        'Access-Control-Allow-Headers': ['*'],
        'Content-Security-Policy': [
          "default-src 'self' 'unsafe-inline' 'unsafe-eval' http: https: data: blob: ws:;"
        ]
      }
    });
  });

  // Load the app
  mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));

  // Pencere kapatıldığında
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Sayfa yüklendiğinde
  mainWindow.webContents.on('did-finish-load', () => {
    console.log('Page loaded successfully');
  });

  // Yükleme hatası durumunda
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorCode, errorDescription);
    if (isDev) {
      // 3 saniye sonra yeniden dene
      setTimeout(() => {
        console.log('Retrying to load...');
        mainWindow.loadURL('http://localhost:5174');
      }, 3000);
    }
  });
};

// Pencere kontrolleri için IPC olayları
ipcMain.on('minimize-window', () => {
  mainWindow?.minimize();
});

ipcMain.on('maximize-window', () => {
  if (mainWindow?.isMaximized()) {
    mainWindow?.unmaximize();
  } else {
    mainWindow?.maximize();
  }
});

ipcMain.on('close-window', () => {
  mainWindow?.close();
});

// Uygulama hazır olduğunda
app.whenReady().then(() => {
  console.log('App is ready');
  
  // Güvenlik politikalarını ayarla
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self' 'unsafe-inline' 'unsafe-eval' http: https: data: blob: ws:;"
        ]
      }
    });
  });

  createWindow();

  // MacOS için pencere yönetimi
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Tüm pencereler kapandığında
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Hata yakalama
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

// Çıkış sinyali alındığında
process.on('SIGTERM', () => {
  app.quit();
}); 