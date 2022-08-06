<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'home' }">
        Meeting Moderator
      </router-link>
      <button
        class="navbar-toggler"
        v-if="user"
        type="button"
        @click="toggleCollapse"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" ref="navbarContentElm">
        <template v-if="user">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <template v-for="link in links" :key="link.routeName">
              <li class="nav-item" @click="hideCollapse">
                <router-link
                  class="nav-link"
                  :class="`${path === link.path ? 'active' : ''}`"
                  :to="{ name: link.routeName }"
                  ><i class="bi" :class="`${link.icon}`"></i>
                  {{ link.text }}
                </router-link>
              </li>
            </template>
          </ul>
          <span class="text-danger fw-bold mx-3">
            | Hi , {{ user.displayName }} |
          </span>
          <button
            v-if="!isPending"
            class="btn btn-secondary"
            @click="handleLogout"
          >
            Logout
          </button>
          <button
            v-else
            class="btn btn-secondary rounded-3"
            disabled
            @click="handleLogout"
          >
            <div class="spinner-border text-warning" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </button>
        </template>
      </div>
      <div v-if="!user" class="ms-auto">
        <!-- <router-link class="btn btn-primary mx-3" :to="{ name: 'signup' }"
          >Signup</router-link
        >
        <router-link class="btn btn-primary mx-3" :to="{ name: 'login' }"
          >Login</router-link
        > -->
      </div>
    </div>
  </nav>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { Collapse } from "bootstrap";
import getUser from "@/composables/getUser";
import useLogout from "@/composables/useLogout";
import { useRouter } from "vue-router";

export default {
  setup() {
    const navbarContentElm = ref(null);
    const router = useRouter();
    const route = useRoute();
    let navBarCollapse = null;
    const path = ref(route.path);

    const { user } = getUser();
    const { error, logout, isPending } = useLogout();

    const handleLogout = async () => {
      await logout();
      if (!error.value) {
        console.log("user Logged out");
        router.push({ name: "login" });
      }
    };

    onMounted(() => {
      navBarCollapse = new Collapse(navbarContentElm.value, { toggle: false });
    });
    watch(
      () => route.path,
      (newPath) => (path.value = newPath)
    );
    const toggleCollapse = () => {
      navBarCollapse.toggle();
    };
    const hideCollapse = () => {
      navBarCollapse.hide();
    };

    const links = [
      {
        text: "Home",
        routeName: "home",
        path: "/",
        icon: "bi-house",
      },
      {
        text: "Meetings",
        routeName: "meetings",
        path: "/meetings",
        icon: "bi-calendar2-event",
      },
    ];
    return {
      navbarContentElm,
      toggleCollapse,
      path,
      hideCollapse,
      links,
      user,
      error,
      isPending,
      handleLogout,
    };
  },
};
</script>

<style>
.nav-link:hover {
  color: brown !important;
}
.active {
  color: success !important;
}
</style>
