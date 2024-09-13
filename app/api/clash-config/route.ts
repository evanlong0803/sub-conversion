import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'No URL provided' }, { status: 400 })
  }

  try {
    // 获取转换后的配置
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch converted config')
    }
    const config = await response.text()

    // 设置响应头，使其作为 YAML 文件下载
    return new NextResponse(config, {
      headers: {
        'Content-Type': 'application/x-yaml',
        'Content-Disposition': 'attachment; filename="clash-config.yaml"',
      },
    })
  } catch (error) {
    console.error('Error fetching converted config:', error)
    return NextResponse.json({ error: 'Failed to fetch converted config' }, { status: 500 })
  }
}
