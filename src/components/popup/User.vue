<script>
  // import { useUserStore } from '@/stores/userStore'

  // const userStore = useUserStore()
  // const logout = ()=>{
  //   userStore.clearUserData()
  //   router.push('/auth')
  // }
</script>
<template>
  <ul 
    class="
      before:duration-350 text-sm
      duration-250 min-w-[15rem] before:sm:right-7.5 before:text-5.5 
      absolute right-0 top-0 z-50 origin-top l
      ist-none rounded-lg border border-solid border-gray-200 
      bg-white bg-clip-padding px-3 py-4 text-left text-slate-500  
      transition-all before:absolute before:right-2 before:left-auto 
      before:top-0 before:z-50 before:inline-block before:font-normal 
      before:text-white before:antialiased before:transition-all 
      before:content-['\f0d8'] sm:-mr-6 lg:absolute lg:right-0 lg:left-auto 
      lg:mt-20  lg:block lg:cursor-pointer shadow-2xl text-left flex flex-col justify-start
    "
  >
  <li class="relative mb-2 font-semibold flex justify-center">
    <div
      class="
        shadow-md rounded-full w-16 h-16
        border-4 -mt-14 border-white cursor-pointer
      "
    >
      <img 
        src="@/assets/ek.jpeg" 
        class="w-full h-full rounded-full object-center object-cover"
      >
    </div>
  </li>
    <li class="relative mb-2 font-semibold">
      <span>Connectez entant que elvinkyungu.75@gmail.com </span>
    </li>
    <li class="relative mb-2 font-semibold">
      <router-link
        to="/profile"
        class="
          ease-soft py-1.2 clear-both block w-full whitespace-nowrap rounded-lg 
          bg-transparent duration-300 
          lg:transition-colors cursor-pointer
        " 
      >
        Voir mon profile
      </router-link>
    </li>
    <li class="relative mb-2 font-semibold">
      <button
        @click="logout"
        class="
          ease-soft py-1.2 clear-both block w-full whitespace-nowrap rounded-lg 
          duration-300 text-lg
          lg:transition-colors
        " 
      >
        Se déconnecter
      </button>
    </li>
  </ul>
</template>