<script lang="ts" setup>
</script>
<template>
  <div>
    <div class="lg:flex relative">
      <div class="lg:w-1/2 z-50 relative xl:max-w-screen-sm min-h-screen overflow-y-auto rounded-t-[5rem]">
        <div 
          class="
            py-12 image_bg_smallScreenAuth lg:bg-white
            flex justify-center lg:justify-start lg:px-12
          "
        >
          <div class="hidden cursor-pointer lg:flex items-center">
            <div class="w-16 h-16 object-cover">
              <img src="../assets/logo-icon.svg" alt="">
            </div>
            <div class="text-4xl text-[#388087] tracking-wide ml-2 font-semibold">Strategic Zone</div>
          </div>
        </div>
        <div 
          class="
            px-10 py-10 lg:py-0 rounded-t-[3rem] sm:px-24 md:px-48 lg:px-12 -mt-10
            lg:mt-1 xl:px-24 xl:max-w-2xl bg-white 
          "
        >
          <div class="flex cursor-pointer lg:hidden items-center">
            <div class="w-16 h-16 object-cover">
              <img src="../assets/logo-icon.svg" alt="">
            </div>
            <div class="text-3xl text-[#388087] tracking-wide ml-2 font-semibold">Strategic Zone</div>
          </div>
          <div 
            class="mt-8"
          >
            <SigninMagicLink/>
            <div class="relative my-10">
              <div class="absolute inset-0 flex items-center gap-20">
                <span class="w-full border-t border-gray-300" />
                <span class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center text-xs">
                <span class="bg-background px-2 text-muted-foreground text-lg">
                  Or
                </span>
              </div>
            </div>
          </div>
          <div
            class="mt-8"
          >
            <SignInPassword />
          </div>
        </div>
      </div>
      <div 
        class="
          hidden md:relative lg:flex items-center justify-center bg-[#C2EDCE] 
          flex-1 h-screen
        "
      >
        <div class="absolute  w-full h-full">
          <img src="../assets/bg_auth.png" class="w-full h-full object-cover" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<style>
@media screen and (max-width: 768px) {
  .image_bg_smallScreenAuth {
    background-image: url(../assets/bg_auth.png);
    background-position: center;
  }
}
</style>