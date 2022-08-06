<template>
  <div class="container mt-2">
    <div v-if="computedMeetings.length > 0" class="row justify-content-center">
      <template v-for="meeting in computedMeetings" :key="meeting.id">
        <MeetingCard :meeting="meeting" />
      </template>
    </div>
    <div v-else class="text-center my-5">
      <i class="bi bi-search display-1"></i>
      <p class="fs-2">There is no Meetings Yet ...</p>
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
    const { error, documents: meetings } = getCollection("meetings");

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
      let today = new Date().toISOString().split("T")[0];

      compMeetings = compMeetings.filter((meeting) => {
        return (
          (meeting.status === "1" || meeting.status === "2") &&
          meeting.date === today
        );
      });
      compMeetings = compMeetings.sort(compare);

      return compMeetings;
    });

    return {
      error,
      computedMeetings,
    };
  },
};
</script>
