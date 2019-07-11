const getHeaders = () => {
  const env = process.env.NODE_ENV
  if (env === 'production') {
    return {
      token: sessionStorage.getItem('token') || ''
    }
  } else {
    return {
      token: sessionStorage.getItem('token') || 'C6348E6C57A19A0C91588D3CC301E816'
    }
  }
}

export default getHeaders
