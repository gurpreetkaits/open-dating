const API_BASE_URL = '/api'

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
      config.body = JSON.stringify(config.body)
    }

    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    try {
      const response = await fetch(url, config)
      
      // Check if response is ok and has content
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const error = new Error(`HTTP ${response.status}: ${response.statusText}`)
        error.response = { status: response.status, data: errorData }
        throw error
      }

      // Check if response has content before parsing JSON
      const contentLength = response.headers.get('content-length')
      const contentType = response.headers.get('content-type')
      
      if (contentLength === '0' || !contentType?.includes('application/json')) {
        throw new Error('No JSON response from server')
      }

      const data = await response.json()
      return data
    } catch (error) {
      // Handle network errors, JSON parsing errors, etc.
      if (error.name === 'SyntaxError') {
        throw new Error('Invalid response from server')
      }
      throw error
    }
  }

  get(endpoint) {
    return this.request(endpoint)
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: data,
    })
  }

  postFormData(endpoint, formData) {
    return this.request(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        // Remove Content-Type header to let browser set it with boundary for FormData
        'Accept': 'application/json',
      }
    })
  }

  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: data,
    })
  }

  delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    })
  }
}

export default new ApiService() 