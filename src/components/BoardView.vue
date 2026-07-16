<template>
  <div class="p-4 bg-white rounded shadow">
    <h2 class="text-lg font-semibold mb-2">게시판</h2>

    <form @submit.prevent="create">
      <div>
        <select v-model="newPost.category">
          <option value="general">일반</option>
          <option value="travel">관광지</option>
          <option value="food">맛집</option>
        </select>
      </div>
      <div>
        <input v-model="newPost.title" placeholder="제목" />
      </div>
      <div>
        <textarea v-model="newPost.content" placeholder="내용"></textarea>
      </div>
      <div>
        <input v-model="newPost.password" type="password" placeholder="비밀번호(수정/삭제용)" />
      </div>
      <button type="submit">작성</button>
    </form>

    <hr />

    <div v-if="posts.length === 0">게시글이 없습니다.</div>
    <ul>
      <li v-for="p in posts" :key="p.id" class="border-b py-2">
        <div class="flex justify-between">
          <div>
            <strong>{{ p.title }}</strong>
            <div class="text-sm text-gray-600">{{ p.category }}</div>
          </div>
          <div>
            <button @click="showDetail(p)">열기</button>
            <button @click="promptDelete(p)">삭제</button>
          </div>
        </div>
      </li>
    </ul>

    <div v-if="selected">
      <h3 class="font-semibold mt-4">상세</h3>
      <div>{{ selected.title }}</div>
      <div>{{ selected.content }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getPosts, createPost, deletePost } from '../api'

const posts = ref([])
const selected = ref(null)
const newPost = ref({ category: 'general', title: '', content: '', password: '' })

async function load() {
  try {
    posts.value = await getPosts('')
  } catch (e) {
    posts.value = []
  }
}

onMounted(load)

async function create() {
  try {
    await createPost(newPost.value)
    newPost.value = { category: 'general', title: '', content: '', password: '' }
    await load()
  } catch (e) {
    alert('작성 중 오류가 발생했습니다')
  }
}

function showDetail(p) { selected.value = p }

async function promptDelete(p) {
  const pwd = prompt('삭제를 위한 비밀번호를 입력하세요')
  if (!pwd) return
  try {
    await deletePost(p.id, pwd)
    await load()
  } catch (err) {
    if (err.response && err.response.status === 403) {
      alert('비밀번호가 일치하지 않습니다')
    } else {
      alert('삭제 중 오류가 발생했습니다')
    }
  }
}
</script>

<style scoped>
input, textarea, select { width:100%; margin-bottom:8px; padding:8px }
button { padding:6px 10px; margin-right:6px }
</style>
