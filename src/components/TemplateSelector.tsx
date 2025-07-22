'use client'

import React from 'react'
import { appTemplates, getAllCategories } from '@/lib/templates'
import { AppTemplate } from '@/types/app'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface TemplateSelectorProps {
  onSelectTemplate: (template: AppTemplate) => void
  onClose: () => void
  className?: string
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  onSelectTemplate,
  onClose,
  className,
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All')
  const categories = ['All', ...getAllCategories()]

  const filteredTemplates = selectedCategory === 'All' 
    ? appTemplates 
    : appTemplates.filter(template => template.category === selectedCategory)

  const handleSelectTemplate = (template: AppTemplate) => {
    onSelectTemplate(template)
    onClose()
  }

  return (
    <div className={cn('w-full max-w-6xl mx-auto', className)}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose a Template</h2>
        <p className="text-gray-600">
          Start with a pre-built template or create a blank app from scratch
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onSelect={() => handleSelectTemplate(template)}
          />
        ))}
      </div>

      {/* Close Button */}
      <div className="flex justify-center">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  )
}

interface TemplateCardProps {
  template: AppTemplate
  onSelect: () => void
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onSelect }) => {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 group">
      <div onClick={onSelect}>
        <CardHeader className="pb-3">
          <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
            {template.thumbnail ? (
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to preview representation
                  e.currentTarget.style.display = 'none'
                }}
              />
            ) : (
              <TemplatePreview template={template} />
            )}
          </div>
          <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
            {template.name}
          </CardTitle>
          <CardDescription className="text-sm">
            {template.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              {template.category}
            </span>
            <Button size="sm" className="group-hover:bg-blue-600">
              Use Template
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

interface TemplatePreviewProps {
  template: AppTemplate
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ template }) => {
  const getPreviewIcon = () => {
    switch (template.category) {
      case 'Basic':
        return '📱'
      case 'Productivity':
        return '✅'
      case 'Social':
        return '💬'
      case 'User Interface':
        return '👤'
      case 'E-commerce':
        return '🛒'
      case 'Entertainment':
        return '🎮'
      default:
        return '📄'
    }
  }

  const getPreviewColor = () => {
    switch (template.category) {
      case 'Basic':
        return 'from-blue-400 to-blue-600'
      case 'Productivity':
        return 'from-green-400 to-green-600'
      case 'Social':
        return 'from-purple-400 to-purple-600'
      case 'User Interface':
        return 'from-indigo-400 to-indigo-600'
      case 'E-commerce':
        return 'from-orange-400 to-orange-600'
      case 'Entertainment':
        return 'from-pink-400 to-pink-600'
      default:
        return 'from-gray-400 to-gray-600'
    }
  }

  return (
    <div className={cn(
      'w-full h-full flex flex-col items-center justify-center bg-gradient-to-br',
      getPreviewColor()
    )}>
      <div className="text-4xl mb-2">{getPreviewIcon()}</div>
      <div className="text-white text-sm font-medium">{template.name}</div>
      {template.components.length > 0 && (
        <div className="text-white text-xs opacity-80 mt-1">
          {template.components.length} components
        </div>
      )}
    </div>
  )
}

export default TemplateSelector