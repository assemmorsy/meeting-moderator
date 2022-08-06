<template>
  <div class="row justify-content-center my-2 text-center">
    <div class="card col-10 ">
      <div class="card-title display-6 mt-4">Add New Meeting</div>
      <div class="card-body">
        <form
          @submit.prevent="handleSave"
          @keypress.enter.prevent
          id="newMeetingForm"
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
                v-model="newMeetingData.name"
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
                    v-model="newMeetingData.date"
                  />
                </div>
                <div class="col">
                  <input
                    type="time"
                    class="form-control"
                    required
                    v-model="newMeetingData.time"
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
                v-model="newMeetingData.status"
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
              <template
                v-for="member in newMeetingData.members"
                :key="member.id"
              >
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
            form="newMeetingForm"
          >
            Save
          </button>
          <button class="btn btn-secondary col-3 mx-2" @click="hide">
            Cancel
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { uuid } from "vue-uuid";
import { ref } from "vue";
import useCollection from "@/composables/useCollection.js";
import { timestamp } from "@/firebase/config";
export default {
  setup(props, context) {
    const tempMember = ref("");
    const newMeetingData = ref({
      name: "",
      date: null,
      time: null,
      members: [],
      status: "0",
    });
    const { error, addDoc, isPending } = useCollection("meetings");
    const handleSave = async () => {
      let meeting = { ...newMeetingData.value, createdAt: timestamp() };
      await addDoc(meeting);
      if (!error.value) {
        hide();
      }
    };

    const addMember = () => {
      if (tempMember.value !== "")
        newMeetingData.value.members.push({
          id: uuid.v1(),
          name: tempMember.value,
        });
      tempMember.value = "";
    };
    const deleteMember = (id) => {
      newMeetingData.value.members = newMeetingData.value.members.filter(
        (member) => {
          return member.id !== id;
        }
      );
    };
    const hide = () => {
      context.emit("hide");
      newMeetingData.value.name = "";
      newMeetingData.value.date = null;
      newMeetingData.value.time = null;
      newMeetingData.value.members = [];
      newMeetingData.value.bgColor = "#ffffff";
      newMeetingData.value.status = "0";
    };
    return {
      handleSave,
      hide,
      tempMember,
      newMeetingData,
      addMember,
      deleteMember,
      isPending,
      error,
    };
  },
};
</script>

<style></style>
