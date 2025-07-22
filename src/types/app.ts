export interface AppComponent {
  id: string
  type: ComponentType
  props: ComponentProps
  children?: AppComponent[]
  position?: { x: number; y: number }
  size?: { width: number; height: number }
}

export interface ComponentProps {
  text?: string
  placeholder?: string
  color?: string
  backgroundColor?: string
  fontSize?: number
  borderRadius?: number
  padding?: number
  margin?: number
  source?: string
  url?: string
  onPress?: string
  style?: Record<string, any>
  [key: string]: any
}

export type ComponentType = 
  | 'View'
  | 'Text'
  | 'Button'
  | 'TextInput'
  | 'Image'
  | 'ScrollView'
  | 'TouchableOpacity'
  | 'Header'
  | 'Footer'
  | 'Card'
  | 'List'
  | 'Modal'
  | 'Switch'
  | 'Slider'
  | 'Icon'

export interface AppTemplate {
  id: string
  name: string
  description: string
  thumbnail: string
  category: string
  components: AppComponent[]
  config: AppConfig
}

export interface AppConfig {
  name: string
  packageName: string
  version: string
  description: string
  icon?: string
  splashScreen?: string
  theme: {
    primaryColor: string
    secondaryColor: string
    backgroundColor: string
    textColor: string
  }
  permissions: string[]
  orientation: 'portrait' | 'landscape' | 'both'
  minSdkVersion: number
  targetSdkVersion: number
}

export interface BuildConfig {
  platform: 'android' | 'ios' | 'both'
  buildType: 'debug' | 'release'
  signing?: {
    keystore: string
    alias: string
    password: string
  }
}

export interface ExportFormat {
  type: 'apk' | 'source' | 'bundle'
  includeAssets: boolean
  minify: boolean
  optimize: boolean
}

export interface DragItem {
  id: string
  type: ComponentType
  name: string
  icon: string
  defaultProps: ComponentProps
}

export interface DropResult {
  droppedId: string
  targetId?: string
  position: 'before' | 'after' | 'inside'
}

export interface ComponentLibrary {
  category: string
  components: DragItem[]
}

export interface Project {
  id: string
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
  components: AppComponent[]
  config: AppConfig
  thumbnail?: string
}