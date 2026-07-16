import { useEffect, useRef } from 'react'


interface Props {
  remote: string
}

const RemoteLoader = ({ remote }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mountRef = useRef<(container: HTMLElement) => void>(null)
  const unmountRef = useRef<() => void>(null)

  useEffect(() => {
    const loadRemote = async () => {
      
      // 从 MF 模块加载子应用入口
      const remoteApp = await import('remote-a/microApp') as any
      const { mount, unmount }=remoteApp.default
      mountRef.current = mount
      unmountRef.current = unmount
      console.info("remoteApp:",remoteApp)
      if (containerRef.current) {
        mount(containerRef.current) // ✅ 只挂载容器，不干预子应用路由
      }
    }

    loadRemote()

    return () => unmountRef.current?.()
  }, [remote])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}

export default RemoteLoader