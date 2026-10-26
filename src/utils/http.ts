import axios,{type AxiosRequestConfig}   from 'axios'

const service = axios.create({
  baseURL: 'https://fun.chenshi.work/app',
  timeout: 5000,
})

service.interceptors.request.use(
  (config) => {
   
    // 3. 统一加租户ID / 应用ID / 全局参数
    config.headers['tenant-id'] = '1001'
    config.headers['app-id'] = 'cp-module'

    // 4. 打开全局 loading（可选）
    // ElLoading.service({ text: '加载中...' })

    console.log('请求：', config.url)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    // 1. 关闭 loading
    // ElLoading.service().close()

    const res = response.data

    // 2. 业务状态码判断（后台统一返回 code）
    // if (res.code !== 0) {
    //   console.error('业务错误：', res.msg)

    //   return Promise.reject(res)
    // }

    // 4. 正常返回数据
    return res
  },
  (error) => {
    // 5. HTTP 网络错误处理
    
    console.error('网络错误：', error)
    // 6. 500 / 404 / 跨域 统一提示
    if (error.response?.status === 500) {
     
    }

    return Promise.reject(error)
  }
)

// 👇 👇 👇 核心：封装一层，强制把返回类型改成 Promise<T>
export    const http = {
  get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.get(url, config);
  },

  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.post(url, data, config);
  },

  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.put(url, data, config);
  },

  delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.delete(url, config);
  },
};

