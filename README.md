# 📱 Drag & Drop App Builder

A powerful, visual mobile app builder that allows users to create mobile applications using drag-and-drop components, generate APKs, and export source code. Built with Next.js, TypeScript, and modern web technologies.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/drag-drop-app-builder)

## ✨ Features

### 🎨 Visual App Builder
- **Drag & Drop Interface**: Intuitive component palette with visual drag-and-drop functionality
- **Real-time Preview**: See your app come to life in a mobile frame as you build
- **Component Library**: Rich set of pre-built components (Text, Buttons, Images, Forms, etc.)
- **Property Editor**: Visual property editor to customize component appearance and behavior

### 📱 Mobile App Generation
- **APK Generation**: Build and download Android APK files directly from the browser
- **Source Code Export**: Download complete React Native project with all source files
- **Cross-platform Ready**: Generated code works on Android, iOS, and Web (via Expo)

### 🚀 Pre-built Templates
- **Ready-to-use Templates**: Start with professionally designed app templates
- **Multiple Categories**: Todo apps, social feeds, user profiles, and more
- **Customizable**: Modify templates to fit your specific needs

### 🎯 Advanced Features
- **Theme Customization**: Global app themes with color schemes
- **App Configuration**: Package names, versions, permissions, and metadata
- **Component Hierarchy**: Nested components with parent-child relationships
- **Responsive Design**: Components adapt to different screen sizes

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, CSS-in-JS
- **Drag & Drop**: React DnD
- **Icons**: Lucide React
- **Build Tools**: Expo CLI integration
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/drag-drop-app-builder.git
   cd drag-drop-app-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### Creating Your First App

1. **Start with a Template** (Optional)
   - Click "Templates" in the header
   - Browse available templates by category
   - Select a template to start with or choose "Blank App"

2. **Add Components**
   - Browse the component palette on the left
   - Drag components onto the mobile preview screen
   - Components are organized by category (Layout, Text & Input, Buttons, etc.)

3. **Customize Components**
   - Click any component in the preview to select it
   - Use the property editor on the right to modify:
     - Text content
     - Colors and styling
     - Layout properties
     - Custom CSS

4. **Configure Your App**
   - Set app name, package name, and version
   - Choose app orientation (portrait/landscape)
   - Customize theme colors
   - Configure permissions

5. **Export Your App**
   - **Export Source Code**: Download React Native project files
   - **Build APK**: Generate and download Android APK file

### Component Types

#### Layout Components
- **View**: Container for other components
- **ScrollView**: Scrollable container

#### Text & Input
- **Text**: Display text content
- **TextInput**: Input fields for user data

#### Buttons & Actions
- **Button**: Standard button component
- **TouchableOpacity**: Touchable area with custom content

#### Media
- **Image**: Display images from URLs
- **Icon**: Display emoji or icon characters

#### Pre-built Components
- **Header**: App header with title
- **Footer**: App footer
- **Card**: Card container with shadow

#### Form Controls
- **Switch**: Toggle switch
- **Slider**: Range slider input

### Templates Available

#### Basic Templates
- **Blank App**: Start from scratch

#### Productivity Templates
- **Todo App**: Task management interface
  - Add/complete tasks
  - Clean, organized layout
  - Interactive checkboxes

#### Social Templates
- **Social Feed**: Social media interface
  - Post cards with user info
  - Like, comment, share buttons
  - Image attachments

#### UI Templates
- **User Profile**: Profile page layout
  - User avatar and info
  - Contact details
  - About section

## 🔧 Configuration

### App Settings

Configure your app through the settings panel:

```typescript
interface AppConfig {
  name: string                    // App display name
  packageName: string            // Android package name (com.company.app)
  version: string               // App version (1.0.0)
  description: string           // App description
  theme: {
    primaryColor: string        // Primary theme color
    secondaryColor: string      // Secondary theme color
    backgroundColor: string     // Background color
    textColor: string          // Default text color
  }
  permissions: string[]         // Android permissions
  orientation: 'portrait' | 'landscape' | 'both'
  minSdkVersion: number        // Minimum Android SDK
  targetSdkVersion: number     // Target Android SDK
}
```

### Component Properties

Each component has customizable properties:

```typescript
interface ComponentProps {
  text?: string                 // Text content
  placeholder?: string          // Input placeholder
  color?: string               // Text color
  backgroundColor?: string      // Background color
  fontSize?: number            // Font size
  borderRadius?: number        // Border radius
  padding?: number             // Internal spacing
  margin?: number              // External spacing
  source?: string              // Image URL
  style?: Record<string, any>   // Custom CSS styles
}
```

## 🌐 API Endpoints

### Build API
**POST** `/api/build`

Build an Android APK from app components and configuration.

```typescript
// Request body
{
  components: AppComponent[],
  config: AppConfig,
  buildConfig?: BuildConfig
}

// Response
{
  success: boolean,
  files: { [filename: string]: string },
  buildInstructions: string,
  downloadUrl?: string
}
```

### Export API
**POST** `/api/export`

Export React Native source code.

```typescript
// Request body
{
  components: AppComponent[],
  config: AppConfig,
  format?: 'zip' | 'files'
}

// Response
{
  success: boolean,
  files?: { [filename: string]: string },
  downloadUrl?: string
}
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **One-click Deploy**
   
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/drag-drop-app-builder)

2. **Manual Deploy**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

### Deploy to Other Platforms

#### Netlify
```bash
npm run build
# Upload dist folder to Netlify
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔧 Development

### Project Structure
```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Main page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── AppBuilder.tsx    # Main app builder
│   ├── ComponentPalette.tsx
│   ├── MobileRenderer.tsx
│   ├── PropertyEditor.tsx
│   └── TemplateSelector.tsx
├── lib/                  # Utility libraries
│   ├── componentLibrary.ts
│   ├── templates.ts
│   ├── exportHelpers.ts
│   └── utils.ts
└── types/                # TypeScript definitions
    └── app.ts
```

### Adding New Components

1. **Define the component type**
   ```typescript
   // src/types/app.ts
   export type ComponentType = 
     | 'YourNewComponent'
     // ... existing types
   ```

2. **Add to component library**
   ```typescript
   // src/lib/componentLibrary.ts
   {
     id: 'yournewcomponent',
     type: 'YourNewComponent',
     name: 'Your New Component',
     icon: '🆕',
     defaultProps: {
       // default properties
     }
   }
   ```

3. **Add renderer case**
   ```typescript
   // src/components/MobileRenderer.tsx
   case 'YourNewComponent':
     return (
       <div {...commonProps}>
         {/* component JSX */}
       </div>
     )
   ```

### Adding New Templates

```typescript
// src/lib/templates.ts
export const appTemplates: AppTemplate[] = [
  // ... existing templates
  {
    id: 'your-template',
    name: 'Your Template',
    description: 'Template description',
    thumbnail: '/templates/your-template.png',
    category: 'Your Category',
    components: [
      // template components
    ],
    config: {
      // template configuration
    }
  }
]
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Add tests if applicable**
5. **Commit your changes**
   ```bash
   git commit -m "Add your feature"
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

### Development Guidelines

- Use TypeScript for all new code
- Follow the existing code style
- Add JSDoc comments for public APIs
- Update tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 **Email**: support@appbuilder.dev
- 💬 **Discord**: [Join our community](https://discord.gg/appbuilder)
- 📚 **Documentation**: [Full documentation](https://docs.appbuilder.dev)
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/drag-drop-app-builder/issues)

## 🙏 Acknowledgments

- **React DnD** for drag and drop functionality
- **Tailwind CSS** for styling system
- **Lucide** for beautiful icons
- **Expo** for React Native tooling
- **Vercel** for hosting and deployment

---

Made with ❤️ by the App Builder Team