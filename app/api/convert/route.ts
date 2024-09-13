import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function POST(request: Request) {
  const { url } = await request.json()
  const headersList = headers()
  const host = headersList.get('host') || 'localhost'
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'

  try {
    // 创建后端转换服务的 URL
    const backendUrl = process.env.SUBCONVERTER_URL || 'https://api.v1.mk'
    const target = 'clash'
    const config = 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online.ini'

    // 构建转换 URL
    const convertUrl = `${backendUrl}/sub?target=${target}&url=${encodeURIComponent(url)}&config=${encodeURIComponent(config)}`

    // 创建可以直接在 Clash 中使用的 URL，使用当前环境的主机名
    const clashUrl = `${protocol}://${host}/api/clash-config?url=${encodeURIComponent(convertUrl)}`

    return NextResponse.json({ clashUrl })
  } catch (error) {
    console.error('Error converting URL:', error)
    return NextResponse.json({ error: 'Failed to convert URL' }, { status: 500 })
  }
}
