<template>
  <div>
    <div class="mb-2">
      <button @click="setFilter('')">전체</button>
      <button @click="setFilter('tour')">관광지</button>
      <button @click="setFilter('food')">맛집</button>
    </div>
    <div ref="mapContainer" style="width:100%;height:600px;background:#eee"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import api from '../api'

const mapContainer = ref(null)
const map = ref(null)
const markers = ref([])
const places = ref([])
const filter = ref('')

function setFilter(cat) {
  filter.value = cat
  renderMarkers()
}

async function fetchPlaces() {
  try {
    // 백엔드에 /api/places?category=... 엔드포인트가 있다고 가정
    const res = await api.get('/api/places')
    places.value = res.data || res
  } catch (e) {
    // fallback: 빈 배열
    places.value = []
  }
}

function clearMarkers() {
  markers.value.forEach(m => m.setMap(null))
  markers.value = []
}

function renderMarkers() {
  if (!map.value) return
  clearMarkers()
  const visible = places.value.filter(p => !filter.value || p.category === filter.value)
  visible.forEach(p => {
    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(p.lat, p.lng)
    })
    marker.setMap(map.value)
    const iwContent = `<div style="padding:8px"><strong>${p.name}</strong><div>${p.description || ''}</div></div>`
    const infowindow = new window.kakao.maps.InfoWindow({ content: iwContent })
    window.kakao.maps.event.addListener(marker, 'click', () => {
      infowindow.open(map.value, marker)
    })
    markers.value.push(marker)
  })
}

onMounted(async () => {
  // Kakao Maps SDK 로드
  const key = import.meta.env.VITE_KAKAO_MAPS_KEY || ''
  if (!window.kakao) {
    const script = document.createElement('script')
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${key}`
    document.head.appendChild(script)
    script.onload = () => {
      window.kakao.maps.load(() => {
        map.value = new window.kakao.maps.Map(mapContainer.value, { center: new window.kakao.maps.LatLng(35.1796, 129.0756), level: 8 })
        fetchPlaces().then(renderMarkers)
      })
    }
  } else {
    window.kakao.maps.load(() => {
      map.value = new window.kakao.maps.Map(mapContainer.value, { center: new window.kakao.maps.LatLng(35.1796, 129.0756), level: 8 })
      fetchPlaces().then(renderMarkers)
    })
  }
})

watch(filter, renderMarkers)
</script>

<style scoped>
button { margin-right: 8px; padding:6px 10px; border-radius:6px; background:#fff; border:1px solid #ddd }
</style>
