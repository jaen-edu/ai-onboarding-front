import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  }
})

export async function getPosts(category = '') {
  const res = await api.get('/api/posts', { params: { category } })
  return res.data
}

export async function getPost(postId) {
  const res = await api.get(`/api/posts/${postId}`)
  return res.data
}

export async function createPost(payload) {
  const res = await api.post('/api/posts', payload)
  return res.data
}

export async function updatePost(postId, payload) {
  const res = await api.put(`/api/posts/${postId}`, payload)
  return res.data
}

export async function deletePost(postId, password) {
  // axios.delete with body requires { data: { ... } }
  const res = await api.delete(`/api/posts/${postId}`, { data: { password } })
  return res.data
}

export async function postChat(session_id, message) {
  const res = await api.post('/api/chat', { session_id, message })
  return res.data
}

export default api
