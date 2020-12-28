<template>
  <div></div>
</template>

<script>
import OT from "@opentok/client";

export default {
  name: "Subscriber",
  props: {
    stream: {
      type: OT.Stream,
      required: true
    },
    session: {
      type: OT.Session,
      required: true
    },
    opts: {
      type: Object,
      required: false
    }
  },
  data: () => ({
    subscriber: null
  }),
  created() {
    this.subscriber = this.session.subscribe(
      this.stream,
      this.$el,
      this.opts,
      err => {
        if (err) {
          this.$emit("error", err);
        } else {
          this.$emit("subscriberConnected", this.subscriber);
        }
      }
    );
    this.$emit("subscriberCreated", this.subscriber);
  }
};
</script>

<style></style>
