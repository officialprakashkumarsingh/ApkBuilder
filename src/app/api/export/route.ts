import { NextRequest, NextResponse } from 'next/server'
import { AppComponent, AppConfig } from '@/types/app'
import { AppExporter } from '@/lib/exportHelpers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { components, config, format }: {
      components: AppComponent[]
      config: AppConfig
      format?: 'zip' | 'files'
    } = body

    // Validate input
    if (!components || !config) {
      return NextResponse.json(
        { error: 'Missing components or config' },
        { status: 400 }
      )
    }

    // Create exporter instance
    const exporter = new AppExporter(components, config)

    // Generate source code files
    const sourceFiles = exporter.generateReactNativeCode()

    if (format === 'zip') {
      // In a real implementation, this would create a ZIP file
      // and return a download URL
      return NextResponse.json({
        success: true,
        downloadUrl: `https://example.com/exports/${config.name.replace(/\s+/g, '_')}_source.zip`,
        message: 'Source code exported as ZIP (demo mode)'
      })
    } else {
      // Return individual files
      return NextResponse.json({
        success: true,
        files: sourceFiles,
        message: 'Source code files generated successfully'
      })
    }

  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json(
      { error: 'Export failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Source Code Export Service',
    endpoints: {
      export: 'POST /api/export - Export source code from components and config'
    },
    formats: ['zip', 'files']
  })
}