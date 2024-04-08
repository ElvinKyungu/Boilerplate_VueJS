<script setup lang="ts">
  import ProfileContent from '@/components/ProfileContent.vue'
  import Aside from '@/components/Aside.vue'
  import Nav from '@/components/Nav.vue'
</script>
<template>
  <Aside />
  <main class="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
    <Nav />
    <div class="mt-10 mx-10">
      <ProfileContent />
    </div>
  </main>
  <div>
   
  </div>
</template>