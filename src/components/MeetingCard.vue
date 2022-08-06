<template>
  <div
    class="card col col-sm-5 col-md-3 text-center m-2"
    :class="bgColor"
    style="--bs-bg-opacity: 0.5"
  >
    <!-- :style="`background-color:${meeting.bgColor};`" -->
    <div class="car-title fs-6">Meeting Name</div>
    <div class="car-title fs-4 fw-bold">{{ meeting.name }}</div>
    <div class="card-body">
      <p class="fs-6">
        <i class="bi bi-calendar-event"></i> {{ meeting.date }}
      </p>
      <p class="fs-6"><i class="bi bi-stopwatch"></i> {{ meeting.time }}</p>

      <i :class="`bi bi-${statusIcon} fs-1 `"></i>
      <p class="fs-6 fw-bold">{{ status }}</p>
      <p class="fs-6 fw-bold">Meeting Members : {{ meeting.members.length }}</p>
      <p
        class="d-inline-block"
        v-for="member in meeting.members"
        :key="member.id"
      >
        <span class="text-dark bg-warning rounded-5 p-1 ps-2 mx-1">
          <i class="bi bi-person-circle me-1"></i>{{ member.name }}
        </span>
      </p>
    </div>
    <div v-if="user" class="car-footer">
      <router-link
        :to="{ name: 'meeting', params: { id: meeting.id } }"
        class="btn btn-warning m-1"
      >
        <i class="bi bi-pen"></i> Update
      </router-link>
      <button
        v-if="!isPending"
        class="btn btn-danger m-1"
        @click="handleDelete"
      >
        <i class="bi bi-trash me-1"></i>Delete
      </button>
      <button v-else class="btn btn-danger m-1" disabled>
        <div class="spinner-border text-secondary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </button>
      <div v-if="deleteError" class="text-center text-danger">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import getUser from "@/composables/getUser";
import useDocument from "@/composables/useDocument";
export default {
  props: ["meeting"],
  setup(props, context) {
    const bgColor = ref(null);
    const status = ref(null);
    const statusIcon = ref(null);
    const {
      error: deleteError,
      isPending,
      deleteDoc,
    } = useDocument("meetings", props.meeting.id);
    const { user } = getUser();
    switch (props.meeting.status) {
      case "0":
        bgColor.value = "bg-secondary bg-gradient";
        status.value = "Finished";
        statusIcon.value = "check2-circle";
        break;

      case "1":
        bgColor.value = "bg-danger  bg-gradient";
        status.value = "Running";
        statusIcon.value = "fire";
        break;

      case "2":
        bgColor.value = "bg-light bg-gradient";
        status.value = "Upcoming";
        statusIcon.value = "stopwatch";
        break;
    }
    const handleDelete = async () => {
      let res = await deleteDoc();
    };
    return {
      bgColor,
      status,
      statusIcon,
      user,
      deleteError,
      isPending,
      handleDelete,
      deleteError,
    };
  },
};
</script>

<style></style>
