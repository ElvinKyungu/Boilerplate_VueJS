<template>
  <ul 
    class="
      text-sm transform-dropdown before:font-awesome before:leading-default 
      before:duration-350 before:ease-soft lg:shadow-soft-3xl 
      duration-250 min-w-44 before:sm:right-7.5 before:text-5.5 
      pointer-events-none absolute right-0 top-0 z-50 origin-top l
      ist-none rounded-lg border-0 border-solid border-transparent 
      bg-white bg-clip-padding px-2 py-4 text-left text-slate-500  
      transition-all before:absolute before:right-2 before:left-auto 
      before:top-0 before:z-50 before:inline-block before:font-normal 
      before:text-white before:antialiased before:transition-all 
      before:content-['\f0d8'] sm:-mr-6 lg:absolute lg:right-0 lg:left-auto 
      lg:mt-8 lg:block lg:cursor-pointer shadow-2xl
    "
  >
    <li class="relative mb-2">
      <routerLink
        to="/"
        class="ease-soft py-1.2 clear-both block w-full whitespace-nowrap rounded-lg bg-transparent px-4 duration-300 hover:bg-gray-200 hover:text-slate-700 lg:transition-colors" 
      >
        <div class="flex py-1">
          <div class="my-auto">
            <img 
              src="@/assets/gabriel.jpeg" 
              class="
                inline-flex items-center justify-center mr-4 text-white text-sm h-9 w-9 
                max-w-none rounded-xl object-cover
              " 
            />
          </div>
          <div class="flex flex-col justify-center">
            <h6 class="mb-1 font-normal leading-normal text-sm"><span class="font-semibold">New message</span> from Gabriel</h6>
            <p class="mb-0 leading-tight text-xs text-slate-400">
              <i class="mr-1 fa fa-clock"></i>
              13 minutes ago
            </p>
          </div>
        </div>
      </routerLink>
    </li>

    <li class="relative mb-2">
      <routerLink
        to="/"
        class="ease-soft py-1.2 clear-both block w-full whitespace-nowrap rounded-lg px-4 transition-colors duration-300 hover:bg-gray-200 hover:text-slate-700" 
      >
        <div class="flex py-1">
          <div class="my-auto">
            <img src="@/assets/logo.svg" class="inline-flex items-center justify-center mr-4 text-white text-sm bg-gradient-to-tl from-gray-900 to-slate-800 h-9 w-9 max-w-none rounded-xl" />
          </div>
          <div class="flex flex-col justify-center">
            <h6 class="mb-1 font-normal leading-normal text-sm"><span class="font-semibold">New message</span> from Valeriu</h6>
            <p class="mb-0 leading-tight text-xs text-slate-400">
              <i class="mr-1 fa fa-clock"></i>
              1 day
            </p>
          </div>
        </div>
      </routerLink>
    </li>
  </ul>
</template>