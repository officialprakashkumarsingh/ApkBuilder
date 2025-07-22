'use client'

import React from 'react'
import { AppComponent } from '@/types/app'
import { cn } from '@/lib/utils'

interface MobileRendererProps {
  components: AppComponent[]
  onComponentClick?: (component: AppComponent) => void
  selectedComponentId?: string
}

interface RenderComponentProps {
  component: AppComponent
  onComponentClick?: (component: AppComponent) => void
  selectedComponentId?: string
}

const RenderComponent: React.FC<RenderComponentProps> = ({ 
  component, 
  onComponentClick, 
  selectedComponentId 
}) => {
  const isSelected = selectedComponentId === component.id
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onComponentClick?.(component)
  }

  const renderChildren = () => {
    if (!component.children || component.children.length === 0) return null
    
    return component.children.map(child => (
      <RenderComponent
        key={child.id}
        component={child}
        onComponentClick={onComponentClick}
        selectedComponentId={selectedComponentId}
      />
    ))
  }

  const getComponentStyle = () => {
    const baseStyle = {
      ...component.props.style,
      padding: component.props.padding || component.props.style?.padding,
      margin: component.props.margin || component.props.style?.margin,
      backgroundColor: component.props.backgroundColor || component.props.style?.backgroundColor,
      color: component.props.color || component.props.style?.color,
      fontSize: component.props.fontSize || component.props.style?.fontSize,
      borderRadius: component.props.borderRadius || component.props.style?.borderRadius,
    }

    if (isSelected) {
      baseStyle.outline = '2px solid #007AFF'
      baseStyle.outlineOffset = '2px'
    }

    return baseStyle
  }

  const commonProps = {
    onClick: handleClick,
    style: getComponentStyle(),
    className: cn(
      'cursor-pointer transition-all duration-200',
      isSelected && 'ring-2 ring-blue-500'
    ),
  }

  switch (component.type) {
    case 'View':
      return (
        <div
          {...commonProps}
          className={cn(
            'flex flex-col',
            component.props.style?.flexDirection === 'row' ? 'flex-row' : 'flex-col',
            component.props.style?.justifyContent && `justify-${component.props.style.justifyContent}`,
            component.props.style?.alignItems && `items-${component.props.style.alignItems}`,
            commonProps.className
          )}
        >
          {renderChildren()}
        </div>
      )

    case 'Text':
      return (
        <div
          {...commonProps}
          className={cn('select-none', commonProps.className)}
        >
          {component.props.text || 'Text'}
        </div>
      )

    case 'Button':
      return (
        <button
          {...commonProps}
          className={cn(
            'px-4 py-2 rounded font-medium text-center hover:opacity-80 transition-opacity',
            commonProps.className
          )}
        >
          {component.props.text || 'Button'}
        </button>
      )

    case 'TextInput':
      return (
        <input
          {...commonProps}
          type="text"
          placeholder={component.props.placeholder || 'Enter text...'}
          className={cn(
            'border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500',
            commonProps.className
          )}
          readOnly
        />
      )

    case 'Image':
      return (
        <img
          {...commonProps}
          src={component.props.source || 'https://via.placeholder.com/200x200?text=Image'}
          alt="Component Image"
          className={cn('object-cover', commonProps.className)}
          draggable={false}
        />
      )

    case 'ScrollView':
      return (
        <div
          {...commonProps}
          className={cn('overflow-auto', commonProps.className)}
        >
          {renderChildren()}
        </div>
      )

    case 'TouchableOpacity':
      return (
        <div
          {...commonProps}
          className={cn(
            'cursor-pointer hover:opacity-70 transition-opacity rounded',
            commonProps.className
          )}
        >
          {component.props.text || 'Touchable'}
          {renderChildren()}
        </div>
      )

    case 'Header':
      return (
        <header
          {...commonProps}
          className={cn(
            'w-full text-center font-bold',
            commonProps.className
          )}
        >
          {component.props.text || 'Header'}
          {renderChildren()}
        </header>
      )

    case 'Footer':
      return (
        <footer
          {...commonProps}
          className={cn(
            'w-full text-center',
            commonProps.className
          )}
        >
          {component.props.text || 'Footer'}
          {renderChildren()}
        </footer>
      )

    case 'Card':
      return (
        <div
          {...commonProps}
          className={cn(
            'rounded-lg shadow-md bg-white',
            commonProps.className
          )}
        >
          {renderChildren()}
        </div>
      )

    case 'Switch':
      return (
        <div
          {...commonProps}
          className={cn(
            'relative inline-block w-12 h-6 rounded-full transition-colors',
            component.props.backgroundColor || 'bg-gray-300',
            commonProps.className
          )}
        >
          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform transform translate-x-0" />
        </div>
      )

    case 'Slider':
      return (
        <div
          {...commonProps}
          className={cn(
            'relative h-2 rounded-full bg-gray-200',
            commonProps.className
          )}
        >
          <div 
            className="absolute h-2 rounded-full bg-blue-500" 
            style={{ width: '50%' }}
          />
          <div 
            className="absolute w-4 h-4 bg-blue-500 rounded-full -top-1" 
            style={{ left: '50%', transform: 'translateX(-50%)' }}
          />
        </div>
      )

    case 'Icon':
      return (
        <div
          {...commonProps}
          className={cn('inline-block', commonProps.className)}
        >
          {component.props.text || '⭐'}
        </div>
      )

    default:
      return (
        <div
          {...commonProps}
          className={cn(
            'bg-gray-100 border border-gray-300 rounded p-2',
            commonProps.className
          )}
        >
          {component.type}
          {renderChildren()}
        </div>
      )
  }
}

export const MobileRenderer: React.FC<MobileRendererProps> = ({
  components,
  onComponentClick,
  selectedComponentId,
}) => {
  return (
    <div className="flex flex-col h-full w-full">
      {components.map(component => (
        <RenderComponent
          key={component.id}
          component={component}
          onComponentClick={onComponentClick}
          selectedComponentId={selectedComponentId}
        />
      ))}
    </div>
  )
}