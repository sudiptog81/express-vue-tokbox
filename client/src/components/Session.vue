<template>
  <div id="session" @error="errorHandler">
    <p v-if="roomId">Room {{ roomId }}</p>
    <publisher :session="session" @error="errorHandler"></publisher>
    <div id="subscribers" v-for="stream in streams" :key="stream.streamId">
      <subscriber
        @error="errorHandler"
        :stream="stream"
        :session="session"
      ></subscriber>
    </div>
  </div>
</template>

<script>
import OT from "@opentok/client";
import Publisher from "@/components/Publisher.vue";
import Subscriber from "@/components/Subscriber.vue";

const errorHandler = err => {
  alert(err.message);
};

export default {
  name: "Room",
  components: { Publisher, Subscriber },
  props: {
    apiKey: {
      type: String
    },
    roomId: {
      type: String
    },
    sessionId: {
      type: String
    },
    token: {
      type: String
    }
  },
  data() {
    return {
      streams: [],
      session: null
    };
  },
  created() {
    this.session = OT.initSession(this.apiKey, this.sessionId);

    this.session.on("sessionConnected", event => {
      console.log("Session Connected", event);
    });

    this.session.on("streamCreated", event => {
      console.log("Stream Created");
      this.streams.push(event.stream);
    });

    this.session.on("streamDestroyed", event => {
      const idx = this.streams.indexOf(event.stream);
      if (idx > -1) {
        this.streams.splice(idx, 1);
      }
    });

    this.session.connect(this.token, err => {
      if (err) {
        this.errorHandler(err);
      }
    });
  },
  methods: {
    errorHandler
  }
};
</script>

<style scoped>
.OT_subscriber {
  float: left;
}

.OT_publisher {
  float: left;
}
</style>
