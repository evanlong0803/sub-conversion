'use client'

import { useState } from 'react'
import Button from '@tailus-ui/button'
import Input from '@tailus-ui/input'

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
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: inputUrl }),
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
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 text-white py-4 px-6">
          <h1 className="text-2xl font-bold">Clash 订阅转换</h1>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="input-url" className="block text-sm font-medium text-gray-700">
              订阅链接
            </label>
            <Input
              id="input-url"
              type="text"
              placeholder="请输入您的订阅链接"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="w-full"
            />
          </div>
          <Button.Root 
            onClick={handleConvert} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition duration-150 ease-in-out" 
            disabled={isLoading}
          >
            <Button.Label>{isLoading ? '正在转换...' : '开始转换'}</Button.Label>
          </Button.Root>
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          {outputUrl && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-center text-green-600">转换成功！</h2>
              <p className="text-sm text-gray-600 text-center">
                请复制以下链接并在 Clash 中导入为 URL 配置
              </p>
              <div className="bg-gray-100 p-3 rounded-md break-all">
                <code className="text-xs">{outputUrl}</code>
              </div>
              <Button.Root 
                onClick={() => {
                  navigator.clipboard.writeText(outputUrl);
                  alert('链接已复制到剪贴板！');
                }} 
                className="w-full bg-green-600 hover:bg-green-700 text-white transition duration-150 ease-in-out"
              >
                <Button.Label>复制链接</Button.Label>
              </Button.Root>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
