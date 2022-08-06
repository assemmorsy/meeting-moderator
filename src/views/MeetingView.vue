<template>
  <div class="row justify-content-center my-2 text-center">
    <div v-if="meeting" class="card col-10">
      <div class="card-title display-6 mt-4">Update Meeting</div>
      <div class="card-body">
        <form
          @submit.prevent="handleSave"
          @keypress.enter.prevent
          id="updateMeetingForm"
        >
          <div class="row justify-content-center text-start">
            <div class="mb-3">
              <label
                for="meetingNameInput"
                class="text-start fw-bold form-label"
                >Meeting Name</label
              >
              <input
                type="text"
                class="form-control col-8"
                id="meetingNameInput"
                placeholder="Meeting Name"
                v-model="meeting.name"
                required
              />
            </div>
          </div>
          <div class="row justify-content-center text-start">
            <div class="mb-3">
              <label
                for="meetingDateInput"
                class="text-start fw-bold form-label"
                >Meeting Date and Time</label
              >
              <div class="row" id="meetingDateInput">
                <div class="col">
                  <input
                    type="date"
                    class="form-control"
                    required
                    v-model="meeting.date"
                  />
                </div>
                <div class="col">
                  <input
                    type="time"
                    class="form-control"
                    required
                    v-model="meeting.time"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row justify-content-center text-start mb-2">
            <div class="col-6">
              <label for="meetingStatusInput" class="fw-bold form-label"
                >Meeting Status</label
              >
              <select
                class="form-select"
                id="meetingStatusInput"
                v-model="meeting.status"
                required
              >
                <option value="0">Finished</option>
                <option value="1">Running</option>
                <option value="2">Upcoming</option>
              </select>
            </div>
          </div>

          <div class="row justify-content-center text-start">
            <div class="mb-3">
              <label for="meetingMemInput" class="text-start fw-bold form-label"
                >Meeting Members</label
              >
              <div class="row">
                <div class="col">
                  <input
                    type="text"
                    class="form-control"
                    id="meetingMemInput"
                    v-model="tempMember"
                    placeholder="Type Meeting Member Name Then press ( ctrl + enter )"
                    @keydown.ctrl.enter="addMember"
                  />
                </div>
              </div>
            </div>

            <div class="mb-3">
              <template v-for="member in meeting.members" :key="member.id">
                <span class="text-dark bg-warning rounded-5 p-1 ps-2 mx-1"
                  >{{ member.name }}
                  <i class="bi bi-x" @click="deleteMember(member.id)"></i
                ></span>
              </template>
            </div>
          </div>

          <button
            class="btn btn-primary col-3 mx-2"
            type="submit"
            form="updateMeetingForm"
            v-if="!isPending"
          >
            Save
          </button>
          <button v-else class="btn btn-primary col-3 mx-2" disabled>
            <div class="spinner-border text-secondary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </button>
          <router-link
            :to="{ name: 'meetings' }"
            class="btn btn-secondary col-3 mx-2"
          >
            Cancel
          </router-link>
          <div class="text-center text-danger">{{ updateError }}</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import useDocument from "@/composables/useDocument";
import getDocument from "@/composables/getDocument";
import { uuid } from "vue-uuid";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  props: ["id"],
  setup(props) {
    const { error: getError, document: meeting } = getDocument(
      "meetings",
      props.id
    );
    const {
      error: updateError,
      isPending,
      updateDoc,
    } = useDocument("meetings", props.id);
    const tempMember = ref("");
    const router = useRouter();
    const addMember = () => {
      if (tempMember.value !== "")
        meeting.value.members.push({
          id: uuid.v1(),
          name: tempMember.value,
        });
      tempMember.value = "";
    };
    const deleteMember = (id) => {
      meeting.value.members = meeting.value.members.filter((member) => {
        return member.id !== id;
      });
    };
    const handleSave = async () => {
      let updatedDoc = {
        name: meeting.value.name,
        status: meeting.value.status,
        date: meeting.value.date,
        time: meeting.value.time,
        members: meeting.value.members,
      };
      await updateDoc(updatedDoc);
      if (!updateError.value) {
        router.push({ name: "meetings" });
      }
    };
    return {
      getError,
      updateError,
      meeting,
      tempMember,
      addMember,
      deleteMember,
      handleSave,
      isPending,
    };
  },
};
</script>

<style></style>
