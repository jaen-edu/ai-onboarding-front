<template>
  <div>
    <button class="chat-toggle" @click="open = !open">💬</button>

    <div v-if="open" class="chat-window">
      <div class="chat-header">챗봇</div>
      <div class="chat-messages" ref="msgBox">
        <div v-for="(m, i) in messages" :key="i" class="msg">
          <div :class="{'from-me': m.from === 'me'}"><strong>{{ m.from }}:</strong> {{ m.text }}</div>
        </div>
      </div>
      <form @submit.prevent="send">
        <input v-model="input" placeholder="메시지 입력" />
        <button type="submit">전송</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { postChat } from '../api'

const open = ref(false)
const input = ref('')
const messages = ref([])
const sessionKey = 'localhub_chat_session'
const msgBox = ref(null)

function ensureSession() {
  let sid = localStorage.getItem(sessionKey)
  if (!sid) {
    sid = Math.random().toString(36).slice(2)
    localStorage.setItem(sessionKey, sid)
  }
  return sid
}

async function send() {
  const text = input.value && input.value.trim()
  if (!text) return
  const sid = ensureSession()
  messages.value.push({ from: 'me', text })
  input.value = ''
  await nextTick()
  scrollBottom()
  try {
    const res = await postChat(sid, text)
    // 서버 응답을 바로 추가
    messages.value.push({ from: 'bot', text: res.reply || JSON.stringify(res) })
    await nextTick()
    scrollBottom()
  } catch (e) {
    messages.value.push({ from: 'bot', text: '서버와 통신 중 오류가 발생했습니다.' })
  }
}

function scrollBottom() {
  if (!msgBox.value) return
  msgBox.value.scrollTop = msgBox.value.scrollHeight
}

onMounted(() => {
  // 이전 대화 히스토리 로드 (선택)
  try {
    const hist = JSON.parse(localStorage.getItem('localhub_chat_history') || '[]')
    messages.value = hist
  } catch (e) {
    messages.value = []
  }
})

// 저장
window.addEventListener('beforeunload', () => {
  localStorage.setItem('localhub_chat_history', JSON.stringify(messages.value))
})
</script>

<style scoped>
.chat-toggle { position:fixed; right:20px; bottom:20px; width:56px; height:56px; border-radius:50%; background:#2b6cb0; color:#fff; font-size:24px; }
.chat-window { position:fixed; right:20px; bottom:86px; width:320px; max-height:60vh; background:#fff; border:1px solid #ddd; border-radius:8px; display:flex; flex-direction:column }
.chat-header { padding:8px; border-bottom:1px solid #eee; font-weight:600 }
.chat-messages { padding:8px; overflow:auto; flex:1 }
.msg { margin-bottom:8px }
.from-me { text-align:right }
form { display:flex; gap:8px; padding:8px; border-top:1px solid #eee }
input { flex:1; padding:8px }
button { padding:8px 12px }
</style>
