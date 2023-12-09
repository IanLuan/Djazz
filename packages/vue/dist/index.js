// src/Field.vue
var __vue_script__ = {
  props: {
    field: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.addEvents($(`[name=${this.field}]`));
  },
  methods: {
    addEvents(field) {
      field.on("change", (e) => {
        this.$emit("change", e.target.value);
      });
      field.on("input", (e) => {
        this.$emit("input", e.target.value);
      });
    }
  },
  computed: {
    fields() {
      return this.$parent.fieldsList;
    }
  }
};
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.fields[_vm.field] ? _c(
    "div",
    _vm._b(
      { staticClass: "form-group" },
      "div",
      _vm.fields[_vm.field].attrs,
      false
    ),
    [
      _c(
        "label",
        {
          staticClass: "form-label",
          class: _vm.fields[_vm.field].required ? "required" : ""
        },
        [_vm._v(_vm._s(_vm.fields[_vm.field].label))]
      ),
      _vm._v(" "),
      _c("div", {
        domProps: { innerHTML: _vm._s(_vm.fields[_vm.field].field) }
      })
    ]
  ) : _vm._e();
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;
var __vue_inject_styles__ = void 0;
var __vue_scope_id__ = void 0;
var __vue_module_identifier__ = void 0;
var __vue_is_functional_template__ = false;
function __vue_normalize__(template, style, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  const component = (typeof script === "function" ? script.options : script) || {};
  component.__file = "src\\Field.vue";
  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional)
      component.functional = true;
  }
  component._scopeId = scope;
  if (false) {
    let hook;
    if (false) {
      hook = function(context) {
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
        if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
          context = __VUE_SSR_CONTEXT__;
        }
        if (style) {
          style.call(this, createInjectorSSR(context));
        }
        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      };
      component._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function(context) {
        style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
      } : function(context) {
        style.call(this, createInjector(context));
      };
    }
    if (hook !== void 0) {
      if (component.functional) {
        const originalRender = component.render;
        component.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        const existing = component.beforeCreate;
        component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }
  }
  return component;
}
var __vue_component__ = /* @__PURE__ */ __vue_normalize__(
  { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
  __vue_inject_styles__,
  __vue_script__,
  __vue_scope_id__,
  __vue_is_functional_template__,
  __vue_module_identifier__,
  false,
  void 0,
  void 0,
  void 0
);
var Field_default = __vue_component__;

// ../core/dist/index.js
function getFieldsByFormName(formName) {
  try {
    const forms = JSON.parse(document.querySelector("#djazz-script").textContent);
    return forms[formName];
  } catch (e) {
    return {};
  }
}
function filterFields(fieldsObject, filterFunction) {
  return Object.keys(fieldsObject).reduce((acc, curr) => {
    if (filterFunction(fieldsObject[curr])) {
      acc[curr] = fieldsObject[curr];
    }
    return acc;
  }, {});
}

// src/Form.vue
var __vue_script__2 = {
  components: {
    Field: Field_default
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
      fieldsList: {}
    };
  },
  created() {
    this.fieldsList = getFieldsByFormName(this.form);
    if (this.fields instanceof Function) {
      this.fieldsList = filterFields(this.fieldsList, this.fields);
    } else if (Array.isArray(this.fields)) {
      this.fieldsList = filterFields(this.fieldsList, (field) => this.fields.includes(field.name));
    }
  },
  methods: {
    onChange(value, name) {
      this.$emit(`change:${name}`, value);
      this.$emit("change", name, value);
    },
    onInput(value, name) {
      this.$emit(`input:${name}`, value);
      this.$emit("input", name, value);
    }
  }
};
var __vue_render__2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    [
      _vm._t("default", function() {
        return _vm._l(_vm.fieldsList, function(field, name) {
          return _c("Field", {
            attrs: { field: name },
            on: {
              change: function(value) {
                return _vm.onChange(value, name);
              },
              input: function(value) {
                return _vm.onInput(value, name);
              }
            }
          });
        });
      })
    ],
    2
  );
};
var __vue_staticRenderFns__2 = [];
__vue_render__2._withStripped = true;
var __vue_inject_styles__2 = void 0;
var __vue_scope_id__2 = void 0;
var __vue_module_identifier__2 = void 0;
var __vue_is_functional_template__2 = false;
function __vue_normalize__2(template, style, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  const component = (typeof script === "function" ? script.options : script) || {};
  component.__file = "src\\Form.vue";
  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional)
      component.functional = true;
  }
  component._scopeId = scope;
  if (false) {
    let hook;
    if (false) {
      hook = function(context) {
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
        if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
          context = __VUE_SSR_CONTEXT__;
        }
        if (style) {
          style.call(this, createInjectorSSR(context));
        }
        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      };
      component._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function(context) {
        style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
      } : function(context) {
        style.call(this, createInjector(context));
      };
    }
    if (hook !== void 0) {
      if (component.functional) {
        const originalRender = component.render;
        component.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        const existing = component.beforeCreate;
        component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }
  }
  return component;
}
var __vue_component__2 = /* @__PURE__ */ __vue_normalize__2(
  { render: __vue_render__2, staticRenderFns: __vue_staticRenderFns__2 },
  __vue_inject_styles__2,
  __vue_script__2,
  __vue_scope_id__2,
  __vue_is_functional_template__2,
  __vue_module_identifier__2,
  false,
  void 0,
  void 0,
  void 0
);
var Form_default = __vue_component__2;
export {
  Field_default as Field,
  Form_default as Form
};
