<template>
  <div>
    <slot>
      <Field
        v-for="(field, name) in fieldsList"
        :field="name"
        @change="(value) => onChange(value, name)"
        @input="(value) => onInput(value, name)"
      />
    </slot>
  </div>
</template>

<script>
import Field from './Field.vue';
import { getFieldsByFormName, filterFields } from '@djazz/core';

export default {
  components: {
    Field
  },
  props: {
    form: {
      type: String,
      required: true
    },
    fields: {
      type: [Array, Function],
      required: false,
      default: () => null
    }
  },
  data() {
    return {
      fieldsList: {},
    }
  },
  created() {
    this.fieldsList = getFieldsByFormName(this.form);
    
    if (this.fields instanceof Function) {
      this.fieldsList = filterFields(this.fieldsList, this.fields);
    } else if (Array.isArray(this.fields)) {
      this.fieldsList = filterFields(this.fieldsList, field => this.fields.includes(field.name));
    }
  },
  methods: {
    onChange(value, name) {
      this.$emit(`change:${name}`, value);
      this.$emit('change', name, value);
    },

    onInput(value, name) {
      this.$emit(`input:${name}`, value);
      this.$emit('input', name, value);
    }
  },
}
</script>