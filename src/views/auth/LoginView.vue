<template>
  <div class="container text-center">
    <h1 class="display-5 my-5">Login</h1>
    <div class="row justify-content-center">
      <form @submit.prevent="handleSubmit" class="col-8">
        <div class="mb-3">
          <label for="emailInput" class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            id="emailInput"
            v-model="accountData.email"
            placeholder="name@example.com"
          />
        </div>
        <div class="mb-3">
          <label for="passInput" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="passInput"
            v-model="accountData.password"
            placeholder="password"
          />
        </div>
        <button
          v-if="!isPending"
          class="btn btn-primary col-12 fs-5"
          type="submit"
        >
          Login
        </button>
        <button
          v-else
          class="btn btn-primary col-12 fs-5"
          disabled
          type="submit"
        >
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </button>
        or <br />
        <router-link :to="{ name: 'signup' }">Create New Account </router-link>
        <div class="text-center text-danger">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import useLogin from "@/composables/useLogin";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const accountData = ref({
      password: "",
      email: "",
    });
    const { login, error, isPending } = useLogin();
    const handleSubmit = async () => {
      await login(accountData.value.email, accountData.value.password);
      if (!error.value) {
        console.log("user logged in  successfly");
        router.push({ name: "meetings" });
      }
    };
    return { handleSubmit, accountData, error, isPending };
  },
};
</script>

<style></style>
