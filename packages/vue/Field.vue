<template>
  <div
    v-if="fields[field]"
    class="form-group"
    v-bind="fields[field].attrs"
  >
    <label class="form-label" :class="fields[field].required ? 'required' : ''">{{ fields[field].label }}</label>
    <div v-html="fields[field].field"></div>
  </div>
</template>

<script>
export default {
  props: {
    field: {
      type: String,
      required: true
    },
  },
  mounted() {
    this.addEvents($(`[name=${this.field}]`));
  },
  methods: {
    addEvents(field) {
      field.on('change', (e) => {
        this.$emit('change', e.target.value)
      });

      field.on('input', (e) => {
        this.$emit('input', e.target.value)
      });
    },
  },
  computed: {
    fields() {
      return this.$parent.fieldsList;
    },
  },
}
</script>