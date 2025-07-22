import { AppComponent, AppConfig, ExportFormat, BuildConfig } from '@/types/app'
import { downloadFile, sanitizeFileName } from './utils'

export class AppExporter {
  private components: AppComponent[]
  private config: AppConfig

  constructor(components: AppComponent[], config: AppConfig) {
    this.components = components
    this.config = config
  }

  // Generate React Native source code
  generateReactNativeCode(): { [key: string]: string } {
    const files: { [key: string]: string } = {}

    // App.tsx
    files['App.tsx'] = this.generateAppTsx()
    
    // package.json
    files['package.json'] = this.generatePackageJson()
    
    // app.json (Expo config)
    files['app.json'] = this.generateAppJson()
    
    // README.md
    files['README.md'] = this.generateReadme()

    // Individual component files
    this.generateComponentFiles(files)

    return files
  }

  private generateAppTsx(): string {
    const imports = this.generateImports()
    const componentStructure = this.generateComponentStructure(this.components)

    return `import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
${imports}

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      ${componentStructure}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '${this.config.theme.backgroundColor}',
  },
});`
  }

  private generateImports(): string {
    const componentTypes = new Set<string>()
    this.collectComponentTypes(this.components, componentTypes)
    
    const imports = Array.from(componentTypes).map(type => {
      switch (type) {
        case 'Text':
          return 'Text'
        case 'View':
          return 'View'
        case 'Button':
          return 'Button'
        case 'TextInput':
          return 'TextInput'
        case 'Image':
          return 'Image'
        case 'ScrollView':
          return 'ScrollView'
        case 'TouchableOpacity':
          return 'TouchableOpacity'
        default:
          return null
      }
    }).filter(Boolean)

    if (imports.length === 0) return ''
    
    return `import { ${imports.join(', ')} } from 'react-native';`
  }

  private collectComponentTypes(components: AppComponent[], types: Set<string>) {
    components.forEach(component => {
      types.add(component.type)
      if (component.children) {
        this.collectComponentTypes(component.children, types)
      }
    })
  }

  private generateComponentStructure(components: AppComponent[], indent: string = '      '): string {
    return components.map(component => {
      const props = this.generateComponentProps(component)
      const children = component.children ? this.generateComponentStructure(component.children, indent + '  ') : ''
      const hasChildren = children.trim().length > 0

      const componentName = this.getReactNativeComponentName(component.type)
      
      if (hasChildren) {
        return `${indent}<${componentName}${props}>
${children}
${indent}</${componentName}>`
      } else {
        const textContent = component.props.text ? `{${JSON.stringify(component.props.text)}}` : ''
        if (textContent && (component.type === 'Text' || component.type === 'Button')) {
          return `${indent}<${componentName}${props}>${textContent}</${componentName}>`
        } else {
          return `${indent}<${componentName}${props} />`
        }
      }
    }).join('\n')
  }

  private getReactNativeComponentName(type: string): string {
    switch (type) {
      case 'Header':
      case 'Footer':
      case 'Card':
        return 'View'
      case 'Icon':
        return 'Text'
      default:
        return type
    }
  }

  private generateComponentProps(component: AppComponent): string {
    const props = []
    const style = this.generateStyleObject(component)
    
    if (style) {
      props.push(`style={${style}}`)
    }

    if (component.props.placeholder && component.type === 'TextInput') {
      props.push(`placeholder=${JSON.stringify(component.props.placeholder)}`)
    }

    if (component.props.source && component.type === 'Image') {
      props.push(`source={{uri: ${JSON.stringify(component.props.source)}}}`)
    }

    return props.length > 0 ? ` ${props.join(' ')}` : ''
  }

  private generateStyleObject(component: AppComponent): string {
    const styles: any = { ...component.props.style }
    
    // Add direct style properties
    if (component.props.backgroundColor) styles.backgroundColor = component.props.backgroundColor
    if (component.props.color) styles.color = component.props.color
    if (component.props.fontSize) styles.fontSize = component.props.fontSize
    if (component.props.padding) styles.padding = component.props.padding
    if (component.props.margin) styles.margin = component.props.margin
    if (component.props.borderRadius) styles.borderRadius = component.props.borderRadius

    // Convert web-specific styles to React Native
    if (styles.width === '100%') styles.width = '100%'
    if (styles.height === '100%') styles.height = '100%'
    
    const styleKeys = Object.keys(styles)
    if (styleKeys.length === 0) return ''

    const styleString = styleKeys.map(key => `${key}: ${JSON.stringify(styles[key])}`).join(', ')
    return `{${styleString}}`
  }

  private generatePackageJson(): string {
    return JSON.stringify({
      name: sanitizeFileName(this.config.name),
      version: this.config.version,
      description: this.config.description,
      main: "node_modules/expo/AppEntry.js",
      scripts: {
        start: "expo start",
        android: "expo start --android",
        ios: "expo start --ios",
        web: "expo start --web",
        build: "expo build:android",
        "build:ios": "expo build:ios"
      },
      dependencies: {
        expo: "~49.0.0",
        "expo-status-bar": "~1.6.0",
        react: "18.2.0",
        "react-native": "0.72.6",
        "@expo/vector-icons": "^13.0.0"
      },
      devDependencies: {
        "@babel/core": "^7.20.0",
        "@types/react": "~18.2.14",
        typescript: "^5.1.3"
      },
      keywords: ["expo", "react-native", "mobile-app"],
      license: "MIT"
    }, null, 2)
  }

  private generateAppJson(): string {
    return JSON.stringify({
      expo: {
        name: this.config.name,
        slug: sanitizeFileName(this.config.name),
        version: this.config.version,
        orientation: this.config.orientation,
        icon: this.config.icon || "./assets/icon.png",
        userInterfaceStyle: "light",
        splash: {
          image: this.config.splashScreen || "./assets/splash.png",
          resizeMode: "contain",
          backgroundColor: this.config.theme.backgroundColor
        },
        assetBundlePatterns: ["**/*"],
        ios: {
          supportsTablet: true,
          bundleIdentifier: this.config.packageName
        },
        android: {
          adaptiveIcon: {
            foregroundImage: "./assets/adaptive-icon.png",
            backgroundColor: this.config.theme.backgroundColor
          },
          package: this.config.packageName,
          versionCode: 1,
          permissions: this.config.permissions
        },
        web: {
          favicon: "./assets/favicon.png"
        }
      }
    }, null, 2)
  }

  private generateReadme(): string {
    return `# ${this.config.name}

${this.config.description}

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start the development server:
   \`\`\`bash
   npm start
   \`\`\`

3. Run on device:
   - **Android**: \`npm run android\`
   - **iOS**: \`npm run ios\`
   - **Web**: \`npm run web\`

## Building for Production

### Android APK
\`\`\`bash
expo build:android
\`\`\`

### iOS App
\`\`\`bash
expo build:ios
\`\`\`

## App Configuration

- **Package Name**: ${this.config.packageName}
- **Version**: ${this.config.version}
- **Orientation**: ${this.config.orientation}
- **Min SDK Version**: ${this.config.minSdkVersion}
- **Target SDK Version**: ${this.config.targetSdkVersion}

## Theme

- **Primary Color**: ${this.config.theme.primaryColor}
- **Secondary Color**: ${this.config.theme.secondaryColor}
- **Background Color**: ${this.config.theme.backgroundColor}
- **Text Color**: ${this.config.theme.textColor}

## Permissions

${this.config.permissions.map(permission => `- ${permission}`).join('\n')}

---

Generated with Drag & Drop App Builder
`
  }

  private generateComponentFiles(files: { [key: string]: string }) {
    // Generate TypeScript types
    files['types/index.ts'] = `export interface AppProps {
  // Add your app-specific types here
}

export interface ComponentProps {
  children?: React.ReactNode;
  style?: any;
}
`

    // Generate constants
    files['constants/Theme.ts'] = `export const theme = {
  primaryColor: '${this.config.theme.primaryColor}',
  secondaryColor: '${this.config.theme.secondaryColor}',
  backgroundColor: '${this.config.theme.backgroundColor}',
  textColor: '${this.config.theme.textColor}',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};
`
  }

  // Export as downloadable ZIP
  async exportAsZip(): Promise<void> {
    const files = this.generateReactNativeCode()
    
    // Note: In a real implementation, you'd use a library like JSZip
    // For now, we'll download the main App.tsx file
    const mainFile = files['App.tsx']
    downloadFile(mainFile, `${sanitizeFileName(this.config.name)}_App.tsx`, 'text/plain')
    
    // Download package.json
    downloadFile(files['package.json'], 'package.json', 'application/json')
    
    // Download app.json
    downloadFile(files['app.json'], 'app.json', 'application/json')
    
    // Download README
    downloadFile(files['README.md'], 'README.md', 'text/markdown')
  }

  // Generate build instructions
  generateBuildInstructions(buildConfig: BuildConfig): string {
    const instructions = [`# Build Instructions for ${this.config.name}`]
    
    instructions.push('\n## Prerequisites')
    instructions.push('- Node.js (v16 or later)')
    instructions.push('- Expo CLI (`npm install -g @expo/cli`)')
    
    if (buildConfig.platform === 'android' || buildConfig.platform === 'both') {
      instructions.push('- Android Studio with Android SDK')
    }
    
    if (buildConfig.platform === 'ios' || buildConfig.platform === 'both') {
      instructions.push('- Xcode (macOS only)')
    }

    instructions.push('\n## Build Steps')
    instructions.push('1. Install dependencies: `npm install`')
    instructions.push('2. Configure app.json with your credentials')
    
    if (buildConfig.platform === 'android' || buildConfig.platform === 'both') {
      instructions.push('3. Build Android APK: `expo build:android`')
    }
    
    if (buildConfig.platform === 'ios' || buildConfig.platform === 'both') {
      instructions.push('3. Build iOS App: `expo build:ios`')
    }

    if (buildConfig.buildType === 'release') {
      instructions.push('\n## Release Build')
      instructions.push('- Ensure all assets are optimized')
      instructions.push('- Update version number in app.json')
      instructions.push('- Test thoroughly before publishing')
    }

    return instructions.join('\n')
  }
}

// Simulate APK build process
export const simulateAPKBuild = async (
  components: AppComponent[],
  config: AppConfig,
  onProgress: (progress: number, message: string) => void
): Promise<{ success: boolean; downloadUrl?: string; error?: string }> => {
  const steps = [
    'Initializing build environment...',
    'Generating React Native code...',
    'Installing dependencies...',
    'Compiling JavaScript bundle...',
    'Building Android project...',
    'Signing APK...',
    'Optimizing assets...',
    'Finalizing build...'
  ]

  for (let i = 0; i < steps.length; i++) {
    onProgress((i + 1) / steps.length * 100, steps[i])
    
    // Simulate build time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
  }

  // Simulate APK generation
  const exporter = new AppExporter(components, config)
  const buildInstructions = exporter.generateBuildInstructions({
    platform: 'android',
    buildType: 'debug'
  })

  // In a real implementation, this would return a real APK download URL
  // For demo purposes, we'll download the build instructions
  downloadFile(buildInstructions, `${sanitizeFileName(config.name)}_build_instructions.md`, 'text/markdown')

  return {
    success: true,
    downloadUrl: `https://example.com/builds/${sanitizeFileName(config.name)}.apk`
  }
}