<script lang="ts">
import _ from "lodash";
import { defineComponent } from "vue";
import { ServiceView } from "@nip/framework-vue2";
import { IMViewService } from "@nip/dbus-im-view";
import { IMMessageView } from "./IMMessageView";

import AvatarIcon from "./AvatarIcon.vue";

export default defineComponent({
  inject: ["$nipApp"],

  props: {
    params: {
      type: Array,
      default: () => [],
    },
  },

  components: {
    ServiceView,
    AvatarIcon,
  },

  data() {
    return {
      $messageView: null,
      renderList: [],
    };
  },

  computed: {
    isUser() {
      return (render: Partial<{ type: string }>) => {
        return render.type === "user";
      };
    },

    serviceLayout() {
      return (layout: string) => {
        return layout === "left"
          ? { "justify-content": "start" }
          : { "justify-content": "end" };
      };
    },

    renderLayout() {
      return (layout: string) => {
        return layout === "left"
          ? { "align-items": "start" }
          : { "align-items": "end" };
      };
    },
  },

  mounted() {
    this.$nipApp.subscribeServices("service.im.view").subscribe((service) => {
      this.$messageView = new IMMessageView(
        this,
        service as unknown as IMViewService
      );
      this.$emit("ready", { messageView: () => this.$messageView });
    });
  },

  methods: {
    submit() {
      return {
        messageView: () => this.$messageView,
      };
    },
  },
});
</script>

<template>
  <div class="im-content">
    <div
      v-for="render of renderList"
      :key="render?.id"
      class="service-content"
      :style="serviceLayout(render.layout)"
    >
      <div
        v-if="isUser(render) && render.layout === 'left'"
        class="avatar-content"
      >
        <AvatarIcon :icon="render.message.sender.icon" />
      </div>

      <div class="render-container" :style="renderLayout(render.layout)">
        <span v-if="isUser(render)" class="name">
          {{
            (render.message.sender.name && render.message.sender.name.length) >
            0
              ? render.message.sender.name
              : render.message.sender.id
          }}
        </span>

        <ServiceView
          ref="service"
          :service="render.service"
          :operation="render.operation"
          :params="render.message"
          :visible="true"
          class="service-content"
        />
      </div>

      <div
        v-if="isUser(render) && render.layout === 'right'"
        class="avatar-content"
      >
        <AvatarIcon :icon="render.message.sender.icon" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.im-content {
  margin: 10px;

  .service-content {
    display: flex;
    // justify-content: end;
    overflow: hidden;

    .avatar-content {
      display: flex;
      padding: 5px 0;
    }

    .render-container {
      padding: 0 10px;
      display: flex;
      flex-direction: column;
      // align-items: end;
    }
  }
}

.im-content .service-content {
  height: auto !important;
}
</style>
