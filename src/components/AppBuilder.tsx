'use client'

import React, { useState, useCallback } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDrop } from 'react-dnd'
import { ComponentPalette } from './ComponentPalette'
import { MobileRenderer } from './MobileRenderer'
import { PropertyEditor } from './PropertyEditor'
import { TemplateSelector } from './TemplateSelector'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { AppComponent, AppConfig, AppTemplate, DragItem } from '@/types/app'
import { getTemplateById } from '@/lib/templates'
import { AppExporter, simulateAPKBuild } from '@/lib/exportHelpers'
import { generateId, deepClone, validatePackageName, validateAppName } from '@/lib/utils'
import { 
  Smartphone, 
  Settings, 
  Download, 
  Code, 
  Play, 
  Save, 
  FolderOpen,
  Plus,
  RefreshCw
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AppBuilderProps {
  className?: string
}

interface DropZoneProps {
  onDrop: (item: DragItem) => void
  children: React.ReactNode
}

const DropZone: React.FC<DropZoneProps> = ({ onDrop, children }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'component',
    drop: (item: DragItem) => {
      onDrop(item)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  return (
    <div
      ref={drop}
      className={cn(
        'drop-zone h-full w-full',
        isOver && canDrop && 'drag-over'
      )}
    >
      {children}
    </div>
  )
}

export const AppBuilder: React.FC<AppBuilderProps> = ({ className }) => {
  const [components, setComponents] = useState<AppComponent[]>([])
  const [selectedComponent, setSelectedComponent] = useState<AppComponent | null>(null)
  const [showTemplates, setShowTemplates] = useState(false)
  const [isBuilding, setIsBuilding] = useState(false)
  const [buildProgress, setBuildProgress] = useState(0)
  const [buildMessage, setBuildMessage] = useState('')
  const [config, setConfig] = useState<AppConfig>({
    name: 'My App',
    packageName: 'com.mycompany.myapp',
    version: '1.0.0',
    description: 'A new mobile app built with drag and drop',
    theme: {
      primaryColor: '#007AFF',
      secondaryColor: '#34C759',
      backgroundColor: '#ffffff',
      textColor: '#333333',
    },
    permissions: ['INTERNET'],
    orientation: 'portrait',
    minSdkVersion: 21,
    targetSdkVersion: 33,
  })

  const handleDrop = useCallback((item: DragItem) => {
    const newComponent: AppComponent = {
      id: generateId(),
      type: item.type,
      props: deepClone(item.defaultProps),
    }
    setComponents(prev => [...prev, newComponent])
  }, [])

  const handleComponentClick = useCallback((component: AppComponent) => {
    setSelectedComponent(component)
  }, [])

  const updateComponent = useCallback((updatedComponent: AppComponent) => {
    setComponents(prev => prev.map(comp => 
      comp.id === updatedComponent.id ? updatedComponent : comp
    ))
    setSelectedComponent(updatedComponent)
  }, [])

  const deleteComponent = useCallback((componentId: string) => {
    setComponents(prev => prev.filter(comp => comp.id !== componentId))
    setSelectedComponent(null)
  }, [])

  const duplicateComponent = useCallback((component: AppComponent) => {
    const duplicated: AppComponent = {
      ...deepClone(component),
      id: generateId(),
    }
    setComponents(prev => [...prev, duplicated])
  }, [])

  const handleSelectTemplate = useCallback((template: AppTemplate) => {
    setComponents(deepClone(template.components))
    setConfig(deepClone(template.config))
    setSelectedComponent(null)
  }, [])

  const clearCanvas = useCallback(() => {
    setComponents([])
    setSelectedComponent(null)
  }, [])

  const exportSourceCode = useCallback(async () => {
    const exporter = new AppExporter(components, config)
    await exporter.exportAsZip()
  }, [components, config])

  const buildAPK = useCallback(async () => {
    setIsBuilding(true)
    setBuildProgress(0)
    setBuildMessage('Starting build...')

    try {
      const result = await simulateAPKBuild(components, config, (progress, message) => {
        setBuildProgress(progress)
        setBuildMessage(message)
      })

      if (result.success) {
        setBuildMessage('Build completed successfully!')
      } else {
        setBuildMessage(`Build failed: ${result.error}`)
      }
    } catch (error) {
      setBuildMessage('Build failed with an error')
    } finally {
      setTimeout(() => {
        setIsBuilding(false)
        setBuildProgress(0)
        setBuildMessage('')
      }, 2000)
    }
  }, [components, config])

  const updateConfig = useCallback((key: keyof AppConfig, value: any) => {
    setConfig(prev => ({
      ...prev,
      [key]: value,
    }))
  }, [])

  const updateThemeColor = useCallback((key: keyof AppConfig['theme'], value: string) => {
    setConfig(prev => ({
      ...prev,
      theme: {
        ...prev.theme,
        [key]: value,
      },
    }))
  }, [])

  if (showTemplates) {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-auto">
        <div className="container mx-auto p-6">
          <TemplateSelector
            onSelectTemplate={handleSelectTemplate}
            onClose={() => setShowTemplates(false)}
          />
        </div>
      </div>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={cn('h-screen bg-gray-50 flex flex-col', className)}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">
                📱 Drag & Drop App Builder
              </h1>
              <div className="flex items-center space-x-2">
                <Input
                  value={config.name}
                  onChange={(e) => updateConfig('name', e.target.value)}
                  placeholder="App Name"
                  className="w-32"
                />
                <span className="text-gray-400">v{config.version}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTemplates(true)}
              >
                <FolderOpen className="h-4 w-4 mr-2" />
                Templates
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={clearCanvas}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Clear
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportSourceCode}
              >
                <Code className="h-4 w-4 mr-2" />
                Export Code
              </Button>
              <Button
                size="sm"
                onClick={buildAPK}
                disabled={isBuilding}
              >
                <Download className="h-4 w-4 mr-2" />
                {isBuilding ? 'Building...' : 'Build APK'}
              </Button>
            </div>
          </div>
        </header>

        {/* Build Progress */}
        {isBuilding && (
          <div className="bg-blue-50 border-b border-blue-200 px-6 py-3">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-blue-900">{buildMessage}</span>
                  <span className="text-blue-700">{Math.round(buildProgress)}%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${buildProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Component Palette */}
          <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
              <ComponentPalette />
            </div>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 flex flex-col bg-gray-100">
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="mobile-frame">
                <div className="mobile-screen w-80 h-[640px] bg-white relative">
                  <DropZone onDrop={handleDrop}>
                    <div className="h-full overflow-auto">
                      {components.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-gray-500">
                          <div className="text-center">
                            <Smartphone className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                            <p className="text-sm">Drag components here to build your app</p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-4"
                              onClick={() => setShowTemplates(true)}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Start with Template
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <MobileRenderer
                          components={components}
                          onComponentClick={handleComponentClick}
                          selectedComponentId={selectedComponent?.id}
                        />
                      )}
                    </div>
                  </DropZone>
                </div>
              </div>
            </div>
          </div>

          {/* Property Editor */}
          <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
            <div className="p-4">
              {/* App Settings */}
              <Card className="mb-4">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    App Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-700">Package Name</label>
                    <Input
                      value={config.packageName}
                      onChange={(e) => updateConfig('packageName', e.target.value)}
                      placeholder="com.company.app"
                      className="text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-700">Version</label>
                      <Input
                        value={config.version}
                        onChange={(e) => updateConfig('version', e.target.value)}
                        className="text-xs"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-700">Orientation</label>
                      <select
                        value={config.orientation}
                        onChange={(e) => updateConfig('orientation', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-xs"
                      >
                        <option value="portrait">Portrait</option>
                        <option value="landscape">Landscape</option>
                        <option value="both">Both</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-700">Primary Color</label>
                      <Input
                        type="color"
                        value={config.theme.primaryColor}
                        onChange={(e) => updateThemeColor('primaryColor', e.target.value)}
                        className="h-8"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-700">Secondary Color</label>
                      <Input
                        type="color"
                        value={config.theme.secondaryColor}
                        onChange={(e) => updateThemeColor('secondaryColor', e.target.value)}
                        className="h-8"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Component Properties */}
              <PropertyEditor
                selectedComponent={selectedComponent}
                onUpdateComponent={updateComponent}
                onDeleteComponent={deleteComponent}
                onDuplicateComponent={duplicateComponent}
              />
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  )
}