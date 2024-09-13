import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '订阅链接转换器',
  description: '将订阅链接转换为 Clash 可识别的格式'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" className="dark" data-theme="passion">
      <body className="antialiased">{children}</body>
    </html>
  )
}
