'use client'

import React from 'react'
import { AppComponent } from '@/types/app'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Trash2, Copy, Move } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PropertyEditorProps {
  selectedComponent: AppComponent | null
  onUpdateComponent: (component: AppComponent) => void
  onDeleteComponent: (componentId: string) => void
  onDuplicateComponent: (component: AppComponent) => void
  className?: string
}

export const PropertyEditor: React.FC<PropertyEditorProps> = ({
  selectedComponent,
  onUpdateComponent,
  onDeleteComponent,
  onDuplicateComponent,
  className,
}) => {
  if (!selectedComponent) {
    return (
      <div className={cn('w-full', className)}>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-4">🎯</div>
              <p className="text-sm">
                Select a component to edit its properties
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const updateProperty = (key: string, value: any) => {
    const updatedComponent = {
      ...selectedComponent,
      props: {
        ...selectedComponent.props,
        [key]: value,
      },
    }
    onUpdateComponent(updatedComponent)
  }

  const updateStyleProperty = (key: string, value: any) => {
    const updatedComponent = {
      ...selectedComponent,
      props: {
        ...selectedComponent.props,
        style: {
          ...selectedComponent.props.style,
          [key]: value,
        },
      },
    }
    onUpdateComponent(updatedComponent)
  }

  const renderPropertyField = (key: string, value: any, label: string, type: 'text' | 'number' | 'color' = 'text') => {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <Input
          type={type}
          value={value || ''}
          onChange={(e) => {
            const newValue = type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value
            updateProperty(key, newValue)
          }}
          className="w-full"
        />
      </div>
    )
  }

  const renderStyleField = (key: string, value: any, label: string, type: 'text' | 'number' | 'color' = 'text') => {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <Input
          type={type}
          value={value || ''}
          onChange={(e) => {
            const newValue = type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value
            updateStyleProperty(key, newValue)
          }}
          className="w-full"
        />
      </div>
    )
  }

  const getComponentSpecificFields = () => {
    const component = selectedComponent
    const fields = []

    // Common text property
    if (['Text', 'Button', 'TouchableOpacity', 'Header', 'Footer', 'Icon'].includes(component.type)) {
      fields.push(renderPropertyField('text', component.props.text, 'Text'))
    }

    // Placeholder for input
    if (component.type === 'TextInput') {
      fields.push(renderPropertyField('placeholder', component.props.placeholder, 'Placeholder'))
    }

    // Source for images
    if (component.type === 'Image') {
      fields.push(renderPropertyField('source', component.props.source, 'Image URL'))
    }

    return fields
  }

  const getStyleFields = () => {
    const style = selectedComponent.props.style || {}
    
    return [
      renderStyleField('width', style.width, 'Width'),
      renderStyleField('height', style.height, 'Height'),
      renderStyleField('minHeight', style.minHeight, 'Min Height', 'number'),
      renderStyleField('maxHeight', style.maxHeight, 'Max Height', 'number'),
    ]
  }

  return (
    <div className={cn('w-full space-y-4', className)}>
      {/* Component Info */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            <span>{selectedComponent.type}</span>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDuplicateComponent(selectedComponent)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDeleteComponent(selectedComponent.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-600">
            ID: {selectedComponent.id}
          </div>
        </CardContent>
      </Card>

      {/* Content Properties */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {getComponentSpecificFields()}
        </CardContent>
      </Card>

      {/* Style Properties */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Style</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {renderPropertyField('backgroundColor', selectedComponent.props.backgroundColor, 'Background Color', 'color')}
          {renderPropertyField('color', selectedComponent.props.color, 'Text Color', 'color')}
          {renderPropertyField('fontSize', selectedComponent.props.fontSize, 'Font Size', 'number')}
          {renderPropertyField('padding', selectedComponent.props.padding, 'Padding', 'number')}
          {renderPropertyField('margin', selectedComponent.props.margin, 'Margin', 'number')}
          {renderPropertyField('borderRadius', selectedComponent.props.borderRadius, 'Border Radius', 'number')}
        </CardContent>
      </Card>

      {/* Layout Properties */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Layout</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {getStyleFields()}
          
          {selectedComponent.type === 'View' && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Flex Direction</label>
                <select
                  value={selectedComponent.props.style?.flexDirection || 'column'}
                  onChange={(e) => updateStyleProperty('flexDirection', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="column">Column</option>
                  <option value="row">Row</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Justify Content</label>
                <select
                  value={selectedComponent.props.style?.justifyContent || 'flex-start'}
                  onChange={(e) => updateStyleProperty('justifyContent', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="flex-start">Start</option>
                  <option value="center">Center</option>
                  <option value="flex-end">End</option>
                  <option value="space-between">Space Between</option>
                  <option value="space-around">Space Around</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Align Items</label>
                <select
                  value={selectedComponent.props.style?.alignItems || 'stretch'}
                  onChange={(e) => updateStyleProperty('alignItems', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="stretch">Stretch</option>
                  <option value="flex-start">Start</option>
                  <option value="center">Center</option>
                  <option value="flex-end">End</option>
                </select>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Advanced Properties */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Advanced</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Custom CSS</label>
            <textarea
              value={JSON.stringify(selectedComponent.props.style || {}, null, 2)}
              onChange={(e) => {
                try {
                  const newStyle = JSON.parse(e.target.value)
                  updateProperty('style', newStyle)
                } catch (error) {
                  // Invalid JSON, ignore
                }
              }}
              className="w-full p-2 border border-gray-300 rounded-md text-xs font-mono"
              rows={6}
              placeholder="Custom style object (JSON)"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}