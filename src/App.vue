<template>
  <Navbar />
  <router-view />
</template>

<script>
import Navbar from "@/components/general/Navbar.vue";
export default {
  components: { Navbar },
  setup() {
    return {};
  },
};
</script>

<style></style>
