import { ComponentLibrary, DragItem } from '@/types/app'

export const componentLibrary: ComponentLibrary[] = [
  {
    category: 'Layout',
    components: [
      {
        id: 'view',
        type: 'View',
        name: 'View Container',
        icon: '📦',
        defaultProps: {
          backgroundColor: '#f5f5f5',
          padding: 16,
          margin: 8,
          borderRadius: 8,
          style: {
            minHeight: 100,
            width: '100%',
          }
        }
      },
      {
        id: 'scrollview',
        type: 'ScrollView',
        name: 'Scroll View',
        icon: '📜',
        defaultProps: {
          backgroundColor: '#ffffff',
          padding: 16,
          style: {
            minHeight: 200,
            width: '100%',
          }
        }
      }
    ]
  },
  {
    category: 'Text & Input',
    components: [
      {
        id: 'text',
        type: 'Text',
        name: 'Text',
        icon: '📝',
        defaultProps: {
          text: 'Sample Text',
          fontSize: 16,
          color: '#333333',
          padding: 8,
        }
      },
      {
        id: 'textinput',
        type: 'TextInput',
        name: 'Text Input',
        icon: '✏️',
        defaultProps: {
          placeholder: 'Enter text...',
          borderRadius: 8,
          padding: 12,
          backgroundColor: '#ffffff',
          color: '#333333',
          style: {
            borderWidth: 1,
            borderColor: '#dddddd',
            width: '100%',
          }
        }
      }
    ]
  },
  {
    category: 'Buttons & Actions',
    components: [
      {
        id: 'button',
        type: 'Button',
        name: 'Button',
        icon: '🔘',
        defaultProps: {
          text: 'Click Me',
          backgroundColor: '#007AFF',
          color: '#ffffff',
          padding: 12,
          borderRadius: 8,
          fontSize: 16,
          style: {
            textAlign: 'center',
            fontWeight: 'bold',
          }
        }
      },
      {
        id: 'touchableopacity',
        type: 'TouchableOpacity',
        name: 'Touchable',
        icon: '👆',
        defaultProps: {
          text: 'Touch Me',
          backgroundColor: '#34C759',
          color: '#ffffff',
          padding: 16,
          borderRadius: 12,
          style: {
            textAlign: 'center',
          }
        }
      }
    ]
  },
  {
    category: 'Media',
    components: [
      {
        id: 'image',
        type: 'Image',
        name: 'Image',
        icon: '🖼️',
        defaultProps: {
          source: 'https://via.placeholder.com/200x200?text=Image',
          style: {
            width: 200,
            height: 200,
            borderRadius: 8,
          }
        }
      },
      {
        id: 'icon',
        type: 'Icon',
        name: 'Icon',
        icon: '⭐',
        defaultProps: {
          text: '⭐',
          fontSize: 24,
          color: '#FFD700',
          padding: 8,
        }
      }
    ]
  },
  {
    category: 'Components',
    components: [
      {
        id: 'header',
        type: 'Header',
        name: 'Header',
        icon: '📋',
        defaultProps: {
          text: 'App Header',
          backgroundColor: '#007AFF',
          color: '#ffffff',
          fontSize: 20,
          padding: 16,
          style: {
            textAlign: 'center',
            fontWeight: 'bold',
            width: '100%',
          }
        }
      },
      {
        id: 'footer',
        type: 'Footer',
        name: 'Footer',
        icon: '📄',
        defaultProps: {
          text: 'App Footer',
          backgroundColor: '#f8f9fa',
          color: '#666666',
          fontSize: 14,
          padding: 16,
          style: {
            textAlign: 'center',
            width: '100%',
          }
        }
      },
      {
        id: 'card',
        type: 'Card',
        name: 'Card',
        icon: '🃏',
        defaultProps: {
          backgroundColor: '#ffffff',
          padding: 16,
          margin: 8,
          borderRadius: 12,
          style: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            width: '100%',
            minHeight: 120,
          }
        }
      }
    ]
  },
  {
    category: 'Form Controls',
    components: [
      {
        id: 'switch',
        type: 'Switch',
        name: 'Switch',
        icon: '🔄',
        defaultProps: {
          backgroundColor: '#34C759',
          padding: 8,
          style: {
            width: 50,
            height: 30,
            borderRadius: 15,
          }
        }
      },
      {
        id: 'slider',
        type: 'Slider',
        name: 'Slider',
        icon: '🎚️',
        defaultProps: {
          backgroundColor: '#007AFF',
          padding: 8,
          style: {
            width: '100%',
            height: 40,
          }
        }
      }
    ]
  }
]

export const getComponentByType = (type: string): DragItem | undefined => {
  for (const library of componentLibrary) {
    const component = library.components.find(comp => comp.type === type)
    if (component) return component
  }
  return undefined
}

export const getAllComponents = (): DragItem[] => {
  return componentLibrary.flatMap(library => library.components)
}