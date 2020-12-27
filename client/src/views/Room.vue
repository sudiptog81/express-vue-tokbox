<template>
  <div>
    <session
      v-if="apiKey"
      :apiKey="apiKey"
      :roomId="roomId"
      :sessionId="sessionId"
      :token="token"
    ></session>
  </div>
</template>

<script>
import Session from "@/components/Session";

export default {
  name: "Room",
  components: { Session },
  data() {
    return {
      apiKey: "",
      roomId: this.$route.params.roomId || "",
      sessionId: "",
      token: ""
    };
  },
  created() {
    this.$axios
      .get(`${process.env.VUE_APP_API_BASE_URL}/api/rooms/${this.$data.roomId}`)
      .then(res => {
        if (!this.$route.params.roomId)
          this.$router.push(`/room/${res.data.roomId}`);
        this.apiKey = res.data.apiKey;
        this.roomId = res.data.roomId;
        this.sessionId = res.data.sessionId;
        this.token = res.data.token;
      })
      .catch(err => {
        console.error(err);
      });
  }
};
</script>

<style></style>
