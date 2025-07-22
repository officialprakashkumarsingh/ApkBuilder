'use client'

import React from 'react'
import { Button } from './ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card'
import { 
  Smartphone, 
  Palette, 
  Download, 
  Code, 
  Zap, 
  Layout,
  Play,
  Star,
  Check
} from 'lucide-react'

interface LandingPageProps {
  onGetStarted: () => void
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: <Palette className="h-8 w-8 text-blue-600" />,
      title: "Drag & Drop Builder",
      description: "Create beautiful apps with our intuitive drag-and-drop interface. No coding required!"
    },
    {
      icon: <Smartphone className="h-8 w-8 text-green-600" />,
      title: "Real-time Preview",
      description: "See your app come to life instantly with our mobile preview frame."
    },
    {
      icon: <Download className="h-8 w-8 text-purple-600" />,
      title: "APK Generation",
      description: "Build and download Android APK files directly from your browser."
    },
    {
      icon: <Code className="h-8 w-8 text-orange-600" />,
      title: "Source Code Export",
      description: "Download complete React Native project files for further customization."
    },
    {
      icon: <Layout className="h-8 w-8 text-red-600" />,
      title: "Pre-built Templates",
      description: "Start quickly with professional templates for various app categories."
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      title: "One-click Deploy",
      description: "Deploy your app builder to Vercel with just one click."
    }
  ]

  const templates = [
    {
      name: "Todo App",
      description: "Task management with clean UI",
      category: "Productivity"
    },
    {
      name: "Social Feed",
      description: "Social media interface",
      category: "Social"
    },
    {
      name: "User Profile",
      description: "Professional profile layout",
      category: "UI"
    },
    {
      name: "Blank App",
      description: "Start from scratch",
      category: "Basic"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-2xl">📱</div>
            <span className="text-xl font-bold text-gray-900">App Builder</span>
          </div>
          <Button onClick={onGetStarted}>
            Get Started
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Build Mobile Apps with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}Drag & Drop
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create stunning mobile applications without writing code. Design, build, and deploy 
            Android apps using our powerful visual editor and pre-built components.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={onGetStarted}>
              <Play className="h-5 w-5 mr-2" />
              Start Building
            </Button>
            <Button variant="outline" size="lg">
              <Code className="h-5 w-5 mr-2" />
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need to Build Apps
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From design to deployment, our platform provides all the tools you need 
            to create professional mobile applications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Templates Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Start with Professional Templates
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our collection of beautifully designed templates 
              or start with a blank canvas.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center">
                    <Smartphone className="h-12 w-12 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {template.category}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Build your app in three simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Design</h3>
            <p className="text-gray-600">
              Drag components from the palette and arrange them on the mobile canvas
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Customize</h3>
            <p className="text-gray-600">
              Edit properties, colors, and content using the visual property editor
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Export</h3>
            <p className="text-gray-600">
              Build APK files or download source code for further development
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Your App?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of developers and creators building amazing mobile apps
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={onGetStarted}
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            <Zap className="h-5 w-5 mr-2" />
            Start Building Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="text-2xl">📱</div>
                <span className="text-xl font-bold">App Builder</span>
              </div>
              <p className="text-gray-400">
                Build mobile apps with drag and drop simplicity.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Drag & Drop Builder</li>
                <li>APK Generation</li>
                <li>Source Code Export</li>
                <li>Templates</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>Templates</li>
                <li>Examples</li>
                <li>Support</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Deploy</h3>
              <div className="space-y-4">
                <Button variant="outline" size="sm" className="w-full">
                  Deploy to Vercel
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 App Builder. Made with ❤️ for developers.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}