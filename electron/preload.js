const { contextBridge, ipcRenderer } = require('electron');

// Güvenli bir şekilde ana süreç ile iletişim kurmak için API
contextBridge.exposeInMainWorld('electronAPI', {
  // HTTP istekleri için
  request: async (url, options) => {
    try {
      const response = await fetch(url, options);
      return {
        ok: response.ok,
        status: response.status,
        data: await response.json()
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message
      };
    }
  },
  
  // Sistem bilgileri
  getSystemInfo: () => {
    return {
      platform: process.platform,
      version: process.version
    };
  }
}); 