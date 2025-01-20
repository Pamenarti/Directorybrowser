# Web Directory Scanner

<div align="center">
  <img src="build/icon.png" alt="Web Directory Scanner Logo" width="100"/>
  <br/>
  <p>
    <strong>A powerful tool for scanning and discovering working web directories</strong>
  </p>
  <p>
    <a href="#features">Features</a> •
    <a href="#installation">Installation</a> •
    <a href="#usage">Usage</a> •
    <a href="#development">Development</a> •
    <a href="#technologies">Technologies</a> •
    <a href="#license">License</a>
  </p>
</div>

## Features

🔍 **Advanced Directory Scanning**
- Fast and efficient web directory discovery
- Batch processing of URLs
- Real-time status updates
- Working URL verification

📊 **Comprehensive Statistics**
- Total URLs discovered
- Working vs non-working URLs
- Detailed scan statistics
- Progress tracking

🎨 **Modern User Interface**
- Dark mode design
- Responsive layout
- Clean and intuitive interface
- Smooth animations

🛡️ **Security Features**
- Secure communication between processes
- Context isolation
- Content Security Policy implementation
- Safe URL handling

## Installation

### Windows 11 Installation
1. Download the latest installer from the [releases page](https://github.com/Pamenarti/Directorybrowser/releases/tag/v1.0.0)
2. Run the installer
3. Choose your installation directory
4. Launch the application from desktop shortcut or start menu

### Building from Source
```bash
# Clone the repository
git clone https://github.com/Pamenarti/Directorybrowser

# Navigate to project directory
cd Directorybrowser

# Install dependencies
npm install

# Start development server
npm run electron:dev

# Build for production
npm run electron:build
```

## Usage

1. **Launch the Application**
   - Open Web Directory Scanner from your desktop or start menu

2. **Enter Domain**
   - Type the target domain in the search box (e.g., example.com)
   - Click "Scan" to begin the directory discovery process

3. **View Results**
   - Monitor real-time scanning progress
   - View comprehensive statistics
   - Access working URLs list

4. **URL Management**
   - Copy URLs to clipboard
   - Open URLs in browser
   - View detailed URL information

## Development

### Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)
- Windows 11 (for building Windows installer)

### Project Structure
```
web-directory-scanner/
├── electron/
│   ├── main.js         # Main electron process
│   └── preload.js      # Preload scripts
├── src/
│   ├── App.tsx         # Main React component
│   ├── index.css       # Global styles
│   └── main.tsx        # Application entry point
├── build/              # Build assets
└── package.json        # Project configuration
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run electron:dev` - Start electron in development mode
- `npm run build` - Build the application
- `npm run electron:build` - Create production installer

## Technologies

### Core
- [Electron](https://www.electronjs.org/) - Cross-platform desktop apps
- [React](https://reactjs.org/) - UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool

### UI/UX
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Headless UI](https://headlessui.dev/) - UI components
- [Heroicons](https://heroicons.com/) - Icons

### Security
- Context Isolation
- Content Security Policy
- Secure IPC Communication

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you have any questions or need help, please open an issue in the GitHub repository.

---

<div>
  <sub>
### 📞 Contact
Paro - [@Pamenarti](https://twitter.com/pamenarti)
Email - [pamenarti@gmail.com](pamenarti@gmail.com)
Project Link: [https://github.com/Pamenarti/Directorybrowser](https://github.com/Pamenarti/Directorybrowser)
  </sub>  
</div> 


<div align="center">
  <sub>Built with ❤️ by Web Directory Scanner Team</sub>
</div> 
