<template>
  <span :class="[`badge ${type}`]">{{ statusText }}</span>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    statusText() {
      switch (this.type) {
        case "active":
          return "Активен";
        case "inprogress":
          return "В процессе";
        case "canceled":
          return "Отменен";
        case "done":
          return "Завершен";
        default:
          return "Неизвестный статус";
      }
    },
  },
};
</script>
