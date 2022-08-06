<template>
  <div class="row justify-content-center my-2">
    <button class="btn btn-primary col-5 fs-6 fw-bold" @click="toggleCard">
      <i class="bi bi-plus-circle mx-2"></i>
      Add Meeting
    </button>
    <div class="col-5">
      <input
        type="text"
        placeholder="search"
        v-model="search"
        class="form-control"
      />
    </div>
    <AddNewMeeting v-if="showCard" @hide="hideCard" />
    <div v-else>
      <div
        v-if="computedMeetings.length > 0"
        class="row justify-content-center my-2"
      >
        <template v-for="meeting in computedMeetings" :key="meeting.id">
          <MeetingCard :meeting="meeting" />
        </template>
      </div>
      <div v-else class="text-center my-5">
        <i class="bi bi-search display-1"></i>
        <p class="fs-2">There is no Meetings Yet ...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import AddNewMeeting from "@/components/AddNewMeeting.vue";
import MeetingCard from "@/components/MeetingCard.vue";
import getCollection from "@/composables/getCollection.js";
export default {
  components: { AddNewMeeting, MeetingCard },
  setup() {
    const showCard = ref(false);
    const search = ref("");
    const { error, documents: meetings } = getCollection("meetings");
    const toggleCard = () => {
      showCard.value = !showCard.value;
    };
    const hideCard = () => {
      showCard.value = false;
    };
    const compare = (a, b) => {
      if (a.date > b.date) return 1;
      if (a.date < b.date) return -1;
      if (a.date === b.date) {
        if (a.time > b.time) return 1;
        if (a.time < b.time) return -1;
        if (a.time === b.time) {
          if (a.status > b.status) return 1;
          if (a.status < b.status) return -1;
          if (a.status === b.status) return 0;
        }
      }
    };
    const computedMeetings = computed(() => {
      if (!meetings.value) return [];
      let compMeetings = meetings.value;
      compMeetings = compMeetings.filter((meeting) => {
        return meeting.name.toLowerCase().includes(search.value);
      });
      compMeetings = compMeetings.sort(compare);

      return compMeetings;
    });
    return {
      showCard,
      toggleCard,
      hideCard,
      search,
      error,
      computedMeetings,
    };
  },
};
</script>

<style></style>
