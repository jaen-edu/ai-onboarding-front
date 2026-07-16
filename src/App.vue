<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow">
      <div class="max-w-4xl mx-auto p-4">
        <h1 class="text-2xl font-bold">부울경/경남 LocalHub</h1>
        <p class="text-sm text-gray-600">지역 소개와 관광지·맛집, 익명 게시판, 챗봇을 제공합니다.</p>
      </div>
    </header>

    <main class="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
      <section class="lg:col-span-2">
        <MapView />
      </section>

      <aside class="lg:col-span-1">
        <BoardView />
      </aside>
    </main>

    <ChatBot />
  </div>
</template>

<script setup>
import MapView from './components/MapView.vue'
import BoardView from './components/BoardView.vue'
import ChatBot from './components/ChatBot.vue'
</script>

<style>
/* 간단한 스타일, 프로젝트에 Tailwind 설정이 있으면 대체 가능 */
body { font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }
</style>
