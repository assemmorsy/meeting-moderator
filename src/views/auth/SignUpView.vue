<template>
  <div class="container text-center">
    <h1 class="display-5 my-5">Create New Account</h1>
    <div class="row justify-content-center">
      <form @submit.prevent="handleSubmit" class="col-8">
        <div class="mb-3">
          <label for="userNameInput" class="form-label">User Name</label>
          <input
            type="text"
            class="form-control"
            id="userNameInput"
            placeholder="FirstName LastName"
            v-model="newAccountData.userName"
          />
        </div>
        <div class="mb-3">
          <label for="emailInput" class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            id="emailInput"
            placeholder="name@example.com"
            v-model="newAccountData.email"
          />
        </div>
        <div class="mb-3">
          <label for="passInput" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="passInput"
            placeholder="password"
            v-model="newAccountData.password"
          />
        </div>
        <button
          v-if="!isPending"
          class="btn btn-primary col-12 fs-5"
          type="submit"
        >
          Signup
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
        <router-link :to="{ name: 'login' }">Already Have Account </router-link>

        <div class="text-center text-danger">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import useSignup from "@/composables/useSignup";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const newAccountData = ref({
      userName: "",
      password: "",
      email: "",
    });
    const { signup, error, isPending } = useSignup();
    const handleSubmit = async () => {
      await signup(
        newAccountData.value.email,
        newAccountData.value.password,
        newAccountData.value.userName
      );
      if (!error.value) {
        console.log("user Signedup successfly");
        router.push({ name: "meetings" });
      }
    };
    return { handleSubmit, newAccountData, error, isPending };
  },
};
</script>

<style></style>
