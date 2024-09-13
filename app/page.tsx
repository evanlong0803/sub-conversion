'use client'

import { useState } from 'react'
import { Github, Clipboard, ExternalLink, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [inputUrl, setInputUrl] = useState('')
  const [outputUrl, setOutputUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleConvert = async () => {
    setIsLoading(true)
    setError('')
    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: inputUrl })
      })
      const data = await response.json()
      if (response.ok) {
        setOutputUrl(data.clashUrl)
      } else {
        setError(data.error || '转换过程中发生错误')
      }
    } catch (err) {
      setError('无法连接到转换服务')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black text-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Clash 订阅转换</h1>
          <p className="text-zinc-400">快速转换您的订阅链接</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="input-url" className="block text-sm font-medium text-zinc-300">
              输入订阅链接
            </label>
            <div className="relative group">
              <input
                id="input-url"
                type="url"
                placeholder="https://example.com/subscribe"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/25 transition duration-300 ease-in-out"
              />
              <ExternalLink className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 group-hover:text-white transition duration-300" size={18} />
            </div>
          </div>

          <button
            onClick={handleConvert}
            className="w-full bg-white text-black font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? '正在转换...' : (
              <>
                开始转换
                <ArrowRight className="ml-2" size={18} />
              </>
            )}
          </button>

          {error && <p className="text-red-400 text-center text-sm">{error}</p>}

          {outputUrl && (
            <div className="space-y-4 bg-zinc-800/50 p-6 rounded-lg border border-zinc-700">
              <h2 className="text-lg font-semibold text-center text-green-400">
                转换成功！
              </h2>
              <p className="text-sm text-zinc-400 text-center">
                请复制以下链接并在 Clash 中导入为 URL 配置
              </p>
              <div className="bg-black/50 p-4 rounded-md break-all relative group">
                <code className="text-sm text-zinc-300">{outputUrl}</code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(outputUrl)
                    alert('链接已复制到剪贴板！')
                  }}
                  className="absolute top-2 right-2 text-zinc-500 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                  title="复制链接"
                >
                  <Clipboard size={18} />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <Link
            href="https://github.com/evanlong0803/sub-conversion"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition duration-300 inline-flex items-center"
          >
            <Github size={18} className="mr-2" />
            GitHub 仓库
          </Link>
        </div>
      </div>
    </div>
  )
}
