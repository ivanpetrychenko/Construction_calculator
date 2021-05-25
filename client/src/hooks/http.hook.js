import {useState, useCallback} from 'react'

export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
    setLoading(true)
    try {
      const response = await fetch(url, {method, body, headers})
      const data = await response.json()

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}` + 
        `, received ${response.status}`);
      }

      setLoading(false)

      return data;
    } catch (e) {
      setLoading(false)
      setError(e.message)
      throw e
    }
  }, [])

  const download = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
    setLoading(true)
    try {
        const response = await fetch(url, {method,
            body, 
            headers,
            responseType: 'blob'})
  
        if (!response.ok) {
          throw new Error(`Could not fetch ${url}` + 
          `, received ${response.status}`);
        }
  
        setLoading(false)
        return await response.blob();
    } catch(e){
        setLoading(false)
        setError(e.message)
        throw e
    }
  }, []);

  const clearError = useCallback(() => setError(null), [])

  return { loading, request, error, clearError, download }
}