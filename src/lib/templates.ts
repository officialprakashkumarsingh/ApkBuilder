import { AppTemplate, AppComponent } from '@/types/app'
import { v4 as uuidv4 } from 'uuid'

export const appTemplates: AppTemplate[] = [
  {
    id: 'blank',
    name: 'Blank App',
    description: 'Start with a clean slate',
    thumbnail: '/templates/blank.png',
    category: 'Basic',
    components: [
      {
        id: uuidv4(),
        type: 'View',
        props: {
          backgroundColor: '#ffffff',
          style: {
            flex: 1,
            padding: 20,
          }
        },
        children: [
          {
            id: uuidv4(),
            type: 'Text',
            props: {
              text: 'Welcome to your new app!',
              fontSize: 24,
              color: '#333333',
              style: {
                textAlign: 'center',
                marginBottom: 20,
                fontWeight: 'bold',
              }
            }
          }
        ]
      }
    ],
    config: {
      name: 'My App',
      packageName: 'com.mycompany.myapp',
      version: '1.0.0',
      description: 'A new mobile app',
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
    }
  },
  {
    id: 'todo',
    name: 'Todo App',
    description: 'A simple todo list application',
    thumbnail: '/templates/todo.png',
    category: 'Productivity',
    components: [
      {
        id: uuidv4(),
        type: 'View',
        props: {
          backgroundColor: '#f8f9fa',
          style: { flex: 1 }
        },
        children: [
          {
            id: uuidv4(),
            type: 'Header',
            props: {
              text: 'Todo List',
              backgroundColor: '#007AFF',
              color: '#ffffff',
              fontSize: 24,
              padding: 20,
              style: {
                textAlign: 'center',
                fontWeight: 'bold',
              }
            }
          },
          {
            id: uuidv4(),
            type: 'View',
            props: {
              backgroundColor: '#ffffff',
              padding: 16,
              margin: 16,
              borderRadius: 12,
              style: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }
            },
            children: [
              {
                id: uuidv4(),
                type: 'TextInput',
                props: {
                  placeholder: 'Add a new task...',
                  borderRadius: 8,
                  padding: 12,
                  backgroundColor: '#f5f5f5',
                  style: {
                    marginBottom: 12,
                    borderWidth: 1,
                    borderColor: '#dddddd',
                  }
                }
              },
              {
                id: uuidv4(),
                type: 'Button',
                props: {
                  text: 'Add Task',
                  backgroundColor: '#34C759',
                  color: '#ffffff',
                  padding: 12,
                  borderRadius: 8,
                  style: {
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }
                }
              }
            ]
          },
          {
            id: uuidv4(),
            type: 'ScrollView',
            props: {
              backgroundColor: 'transparent',
              padding: 16,
              style: { flex: 1 }
            },
            children: [
              {
                id: uuidv4(),
                type: 'Card',
                props: {
                  backgroundColor: '#ffffff',
                  padding: 16,
                  margin: 8,
                  borderRadius: 8,
                  style: {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 2,
                    elevation: 2,
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      text: '✓ Sample completed task',
                      fontSize: 16,
                      color: '#666666',
                      style: {
                        textDecorationLine: 'line-through',
                      }
                    }
                  }
                ]
              },
              {
                id: uuidv4(),
                type: 'Card',
                props: {
                  backgroundColor: '#ffffff',
                  padding: 16,
                  margin: 8,
                  borderRadius: 8,
                  style: {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 2,
                    elevation: 2,
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      text: '○ Sample pending task',
                      fontSize: 16,
                      color: '#333333',
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    config: {
      name: 'Todo App',
      packageName: 'com.mycompany.todoapp',
      version: '1.0.0',
      description: 'A simple and efficient todo list app',
      theme: {
        primaryColor: '#007AFF',
        secondaryColor: '#34C759',
        backgroundColor: '#f8f9fa',
        textColor: '#333333',
      },
      permissions: ['INTERNET'],
      orientation: 'portrait',
      minSdkVersion: 21,
      targetSdkVersion: 33,
    }
  },
  {
    id: 'social',
    name: 'Social Feed',
    description: 'A social media feed interface',
    thumbnail: '/templates/social.png',
    category: 'Social',
    components: [
      {
        id: uuidv4(),
        type: 'View',
        props: {
          backgroundColor: '#ffffff',
          style: { flex: 1 }
        },
        children: [
          {
            id: uuidv4(),
            type: 'Header',
            props: {
              text: 'Social Feed',
              backgroundColor: '#6366f1',
              color: '#ffffff',
              fontSize: 20,
              padding: 16,
              style: {
                textAlign: 'center',
                fontWeight: 'bold',
              }
            }
          },
          {
            id: uuidv4(),
            type: 'ScrollView',
            props: {
              backgroundColor: '#f8f9fa',
              style: { flex: 1 }
            },
            children: [
              {
                id: uuidv4(),
                type: 'Card',
                props: {
                  backgroundColor: '#ffffff',
                  padding: 16,
                  margin: 16,
                  borderRadius: 12,
                  style: {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'View',
                    props: {
                      style: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 12,
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'Image',
                        props: {
                          source: 'https://via.placeholder.com/40x40?text=👤',
                          style: {
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            marginRight: 12,
                          }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'Text',
                        props: {
                          text: 'John Doe',
                          fontSize: 16,
                          color: '#333333',
                          style: {
                            fontWeight: 'bold',
                          }
                        }
                      }
                    ]
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      text: 'This is a sample post in the social feed. Users can share their thoughts and experiences here!',
                      fontSize: 14,
                      color: '#666666',
                      style: {
                        lineHeight: 20,
                        marginBottom: 12,
                      }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Image',
                    props: {
                      source: 'https://via.placeholder.com/300x200?text=Post+Image',
                      style: {
                        width: '100%',
                        height: 200,
                        borderRadius: 8,
                        marginBottom: 12,
                      }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'View',
                    props: {
                      style: {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }
                    },
                    children: [
                      {
                        id: uuidv4(),
                        type: 'TouchableOpacity',
                        props: {
                          text: '❤️ Like',
                          color: '#e11d48',
                          padding: 8,
                          borderRadius: 6,
                          style: {
                            fontSize: 14,
                          }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'TouchableOpacity',
                        props: {
                          text: '💬 Comment',
                          color: '#3b82f6',
                          padding: 8,
                          borderRadius: 6,
                          style: {
                            fontSize: 14,
                          }
                        }
                      },
                      {
                        id: uuidv4(),
                        type: 'TouchableOpacity',
                        props: {
                          text: '📤 Share',
                          color: '#10b981',
                          padding: 8,
                          borderRadius: 6,
                          style: {
                            fontSize: 14,
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    config: {
      name: 'Social Feed',
      packageName: 'com.mycompany.socialfeed',
      version: '1.0.0',
      description: 'A social media feed application',
      theme: {
        primaryColor: '#6366f1',
        secondaryColor: '#ec4899',
        backgroundColor: '#f8f9fa',
        textColor: '#333333',
      },
      permissions: ['INTERNET', 'CAMERA', 'READ_EXTERNAL_STORAGE'],
      orientation: 'portrait',
      minSdkVersion: 21,
      targetSdkVersion: 33,
    }
  },
  {
    id: 'profile',
    name: 'User Profile',
    description: 'A user profile page template',
    thumbnail: '/templates/profile.png',
    category: 'User Interface',
    components: [
      {
        id: uuidv4(),
        type: 'ScrollView',
        props: {
          backgroundColor: '#f8f9fa',
          style: { flex: 1 }
        },
        children: [
          {
            id: uuidv4(),
            type: 'View',
            props: {
              backgroundColor: '#6366f1',
              padding: 32,
              style: {
                alignItems: 'center',
              }
            },
            children: [
              {
                id: uuidv4(),
                type: 'Image',
                props: {
                  source: 'https://via.placeholder.com/120x120?text=👤',
                  style: {
                    width: 120,
                    height: 120,
                    borderRadius: 60,
                    marginBottom: 16,
                    borderWidth: 4,
                    borderColor: '#ffffff',
                  }
                }
              },
              {
                id: uuidv4(),
                type: 'Text',
                props: {
                  text: 'John Doe',
                  fontSize: 24,
                  color: '#ffffff',
                  style: {
                    fontWeight: 'bold',
                    marginBottom: 8,
                  }
                }
              },
              {
                id: uuidv4(),
                type: 'Text',
                props: {
                  text: 'Software Developer',
                  fontSize: 16,
                  color: '#e5e7eb',
                  style: {
                    marginBottom: 16,
                  }
                }
              }
            ]
          },
          {
            id: uuidv4(),
            type: 'View',
            props: {
              backgroundColor: '#ffffff',
              padding: 24,
              margin: 16,
              borderRadius: 12,
              style: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }
            },
            children: [
              {
                id: uuidv4(),
                type: 'Text',
                props: {
                  text: 'About',
                  fontSize: 18,
                  color: '#333333',
                  style: {
                    fontWeight: 'bold',
                    marginBottom: 12,
                  }
                }
              },
              {
                id: uuidv4(),
                type: 'Text',
                props: {
                  text: 'Passionate developer with 5+ years of experience in mobile app development. Love creating beautiful and functional user interfaces.',
                  fontSize: 14,
                  color: '#666666',
                  style: {
                    lineHeight: 20,
                  }
                }
              }
            ]
          },
          {
            id: uuidv4(),
            type: 'View',
            props: {
              backgroundColor: '#ffffff',
              padding: 24,
              margin: 16,
              marginTop: 0,
              borderRadius: 12,
              style: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }
            },
            children: [
              {
                id: uuidv4(),
                type: 'Text',
                props: {
                  text: 'Contact Info',
                  fontSize: 18,
                  color: '#333333',
                  style: {
                    fontWeight: 'bold',
                    marginBottom: 16,
                  }
                }
              },
              {
                id: uuidv4(),
                type: 'View',
                props: {
                  style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 12,
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Icon',
                    props: {
                      text: '📧',
                      fontSize: 20,
                      style: {
                        marginRight: 12,
                      }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      text: 'john.doe@example.com',
                      fontSize: 14,
                      color: '#666666',
                    }
                  }
                ]
              },
              {
                id: uuidv4(),
                type: 'View',
                props: {
                  style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 12,
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Icon',
                    props: {
                      text: '📱',
                      fontSize: 20,
                      style: {
                        marginRight: 12,
                      }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      text: '+1 (555) 123-4567',
                      fontSize: 14,
                      color: '#666666',
                    }
                  }
                ]
              },
              {
                id: uuidv4(),
                type: 'View',
                props: {
                  style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                  }
                },
                children: [
                  {
                    id: uuidv4(),
                    type: 'Icon',
                    props: {
                      text: '📍',
                      fontSize: 20,
                      style: {
                        marginRight: 12,
                      }
                    }
                  },
                  {
                    id: uuidv4(),
                    type: 'Text',
                    props: {
                      text: 'San Francisco, CA',
                      fontSize: 14,
                      color: '#666666',
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    config: {
      name: 'User Profile',
      packageName: 'com.mycompany.userprofile',
      version: '1.0.0',
      description: 'A user profile application',
      theme: {
        primaryColor: '#6366f1',
        secondaryColor: '#ec4899',
        backgroundColor: '#f8f9fa',
        textColor: '#333333',
      },
      permissions: ['INTERNET', 'CAMERA'],
      orientation: 'portrait',
      minSdkVersion: 21,
      targetSdkVersion: 33,
    }
  }
]

export const getTemplateById = (id: string): AppTemplate | undefined => {
  return appTemplates.find(template => template.id === id)
}

export const getTemplatesByCategory = (category: string): AppTemplate[] => {
  return appTemplates.filter(template => template.category === category)
}

export const getAllCategories = (): string[] => {
  return [...new Set(appTemplates.map(template => template.category))]
}