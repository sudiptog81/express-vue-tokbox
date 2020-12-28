<template>
  <div></div>
</template>

<script>
import OT from "@opentok/client";

export default {
  name: "Publisher",
  props: {
    session: {
      type: OT.Session,
      required: false
    },
    opts: {
      type: Object,
      required: false
    }
  },
  data: () => ({
    publisher: null
  }),
  mounted: function() {
    this.publisher = OT.initPublisher(this.$el, this.opts, err => {
      if (err) {
        this.$emit("error", err);
      } else {
        this.$emit("publisherCompleted");
      }
    });

    this.$emit("publisherCreated", this.publisher);

    const vm = this;

    const publish = () => {
      if (vm.session)
        vm.session.publish(vm.publisher, err => {
          if (err) {
            vm.$emit("error", err);
          } else {
            vm.$emit("publisherConnected", vm.publisher);
          }
        });
    };

    if (this.session && this.session.isConnected()) {
      publish();
    }

    if (this.session) {
      this.session.on("sessionConnected", publish);
    }
  }
};
</script>

<style></style>
