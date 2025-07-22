'use client'

import React from 'react'
import { useDrag } from 'react-dnd'
import { componentLibrary } from '@/lib/componentLibrary'
import { DragItem } from '@/types/app'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

interface DraggableComponentProps {
  item: DragItem
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({ item }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: { ...item },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return (
    <div
      ref={drag}
      className={cn(
        'component-item p-3 bg-white border border-gray-200 rounded-lg cursor-move shadow-sm hover:shadow-md transition-all duration-200',
        isDragging && 'opacity-50'
      )}
    >
      <div className="flex flex-col items-center space-y-2">
        <div className="text-2xl">{item.icon}</div>
        <div className="text-xs font-medium text-center text-gray-700">
          {item.name}
        </div>
      </div>
    </div>
  )
}

interface ComponentCategoryProps {
  category: string
  components: DragItem[]
  isExpanded: boolean
  onToggle: () => void
}

const ComponentCategory: React.FC<ComponentCategoryProps> = ({
  category,
  components,
  isExpanded,
  onToggle,
}) => {
  return (
    <Card className="mb-4">
      <CardHeader
        className="cursor-pointer hover:bg-gray-50 py-3"
        onClick={onToggle}
      >
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          {category}
          <span className={cn(
            'transition-transform duration-200',
            isExpanded ? 'rotate-90' : ''
          )}>
            ▶
          </span>
        </CardTitle>
      </CardHeader>
      {isExpanded && (
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-2">
            {components.map((component) => (
              <DraggableComponent key={component.id} item={component} />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}

interface ComponentPaletteProps {
  className?: string
}

export const ComponentPalette: React.FC<ComponentPaletteProps> = ({ className }) => {
  const [expandedCategories, setExpandedCategories] = React.useState<Set<string>>(
    new Set(['Layout', 'Text & Input', 'Buttons & Actions'])
  )

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev)
      if (newSet.has(category)) {
        newSet.delete(category)
      } else {
        newSet.add(category)
      }
      return newSet
    })
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Components</h3>
        <p className="text-sm text-gray-600">
          Drag components to add them to your app
        </p>
      </div>
      
      <div className="space-y-2">
        {componentLibrary.map((library) => (
          <ComponentCategory
            key={library.category}
            category={library.category}
            components={library.components}
            isExpanded={expandedCategories.has(library.category)}
            onToggle={() => toggleCategory(library.category)}
          />
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Tips</h4>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Drag components onto the phone screen</li>
          <li>• Click components to select and edit them</li>
          <li>• Use containers like View for layout</li>
          <li>• Combine components to create complex UIs</li>
        </ul>
      </div>
    </div>
  )
}