import { lazy, Suspense } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const Home=lazy(()=>import('../pages/home/index'))  
const PatHandelCenter=lazy(()=>import('../pages/patHandelCenter/index'))
const Blog=lazy(()=>import('../pages/blog/index'))
const RemoteA=lazy(()=>import('../pages/remoteA'))
const Self=lazy(()=>import('../pages/self'))
const Xuniliebiao=lazy(()=>import('../pages/xuniliebiao'))
// const RemoteApp=lazy(()=>import("remote-a/microApp"))
const BlogType=lazy(()=>import('../pages/blogType'))

const router = createBrowserRouter([
  { path: '/', element: <Home />,children:[ 
        {index:true,element:<BlogType />},
        { path: 'pat-handel-center', element: <PatHandelCenter /> },
        { path: 'blog', element: <Blog /> },
        { path:'self',element:<Self></Self>},
        { path:'xuniliebiao',element:<Xuniliebiao></Xuniliebiao>},
        { path:'blog-module',children:[
          { path:'blog',element: <Blog></Blog>},
          { path:'blog-type',element: <BlogType></BlogType>}
        ]}
  ]},
  {
    path:'/remote-a/*',
    element:<RemoteA remote="remote-a"></RemoteA>
  }  

])  

// 导出路由组件
export default function Router() {
  return <RouterProvider router={router} />
}