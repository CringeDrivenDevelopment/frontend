<template>
  <div class="min-h-screen flex justify-center flex-row flex-wrap">
    <div class="w-11/12 pb-20 p-2 relative pt-5">
        <NuxtPage :key="$route.fullPath" />
    </div>
    <div class="w-full fixed bottom-0 z-50">
      <FooterNavBar />
    </div>
  </div>
</template>

<!-- <style>
.page-enter-active,
.page-leave-active {
  transition: all .1s ease-in;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(.5rem);
}
</style> -->
