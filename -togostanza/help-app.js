import { d as defineComponent, s as script$1, f as ref, g as computed, c as createBlock, r as resolveComponent, o as openBlock, w as withCtx, a as createVNode, t as toDisplayString, F as Fragment, b as renderList, h as withDirectives, v as vModelSelect, i as createCommentVNode, j as createStaticVNode, k as createTextVNode, l as vModelText, m as vModelDynamic, e as createApp } from './Layout-26463f7d.js';

// In the absence of a WeakSet or WeakMap implementation, don't break, but don't cache either.
function noop() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
}
function createWeakMap() {
    if (typeof WeakMap !== 'undefined') {
        return new WeakMap();
    }
    else {
        return fakeSetOrMap();
    }
}
/**
 * Creates and returns a no-op implementation of a WeakMap / WeakSet that never stores anything.
 */
function fakeSetOrMap() {
    return {
        add: noop,
        delete: noop,
        get: noop,
        set: noop,
        has: function (k) { return false; },
    };
}
// Safe hasOwnProperty
var hop = Object.prototype.hasOwnProperty;
var has = function (obj, prop) {
    return hop.call(obj, prop);
};
// Copy all own enumerable properties from source to target
function extend(target, source) {
    for (var prop in source) {
        if (has(source, prop)) {
            target[prop] = source[prop];
        }
    }
    return target;
}
var reLeadingNewline = /^[ \t]*(?:\r\n|\r|\n)/;
var reTrailingNewline = /(?:\r\n|\r|\n)[ \t]*$/;
var reStartsWithNewlineOrIsEmpty = /^(?:[\r\n]|$)/;
var reDetectIndentation = /(?:\r\n|\r|\n)([ \t]*)(?:[^ \t\r\n]|$)/;
var reOnlyWhitespaceWithAtLeastOneNewline = /^[ \t]*[\r\n][ \t\r\n]*$/;
function _outdentArray(strings, firstInterpolatedValueSetsIndentationLevel, options) {
    // If first interpolated value is a reference to outdent,
    // determine indentation level from the indentation of the interpolated value.
    var indentationLevel = 0;
    var match = strings[0].match(reDetectIndentation);
    if (match) {
        indentationLevel = match[1].length;
    }
    var reSource = "(\\r\\n|\\r|\\n).{0," + indentationLevel + "}";
    var reMatchIndent = new RegExp(reSource, 'g');
    if (firstInterpolatedValueSetsIndentationLevel) {
        strings = strings.slice(1);
    }
    var newline = options.newline, trimLeadingNewline = options.trimLeadingNewline, trimTrailingNewline = options.trimTrailingNewline;
    var normalizeNewlines = typeof newline === 'string';
    var l = strings.length;
    var outdentedStrings = strings.map(function (v, i) {
        // Remove leading indentation from all lines
        v = v.replace(reMatchIndent, '$1');
        // Trim a leading newline from the first string
        if (i === 0 && trimLeadingNewline) {
            v = v.replace(reLeadingNewline, '');
        }
        // Trim a trailing newline from the last string
        if (i === l - 1 && trimTrailingNewline) {
            v = v.replace(reTrailingNewline, '');
        }
        // Normalize newlines
        if (normalizeNewlines) {
            v = v.replace(/\r\n|\n|\r/g, function (_) { return newline; });
        }
        return v;
    });
    return outdentedStrings;
}
function concatStringsAndValues(strings, values) {
    var ret = '';
    for (var i = 0, l = strings.length; i < l; i++) {
        ret += strings[i];
        if (i < l - 1) {
            ret += values[i];
        }
    }
    return ret;
}
function isTemplateStringsArray(v) {
    return has(v, 'raw') && has(v, 'length');
}
/**
 * It is assumed that opts will not change.  If this is a problem, clone your options object and pass the clone to
 * makeInstance
 * @param options
 * @return {outdent}
 */
function createInstance(options) {
    /** Cache of pre-processed template literal arrays */
    var arrayAutoIndentCache = createWeakMap();
    /**
     * Cache of pre-processed template literal arrays, where first interpolated value is a reference to outdent,
     * before interpolated values are injected.
     */
    var arrayFirstInterpSetsIndentCache = createWeakMap();
    function outdent(stringsOrOptions) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        /* tslint:enable:no-shadowed-variable */
        if (isTemplateStringsArray(stringsOrOptions)) {
            var strings = stringsOrOptions;
            // Is first interpolated value a reference to outdent, alone on its own line, without any preceding non-whitespace?
            var firstInterpolatedValueSetsIndentationLevel = (values[0] === outdent || values[0] === defaultOutdent) &&
                reOnlyWhitespaceWithAtLeastOneNewline.test(strings[0]) &&
                reStartsWithNewlineOrIsEmpty.test(strings[1]);
            // Perform outdentation
            var cache = firstInterpolatedValueSetsIndentationLevel ? arrayFirstInterpSetsIndentCache : arrayAutoIndentCache;
            var renderedArray = cache.get(strings);
            if (!renderedArray) {
                renderedArray = _outdentArray(strings, firstInterpolatedValueSetsIndentationLevel, options);
                cache.set(strings, renderedArray);
            }
            /** If no interpolated values, skip concatenation step */
            if (values.length === 0) {
                return renderedArray[0];
            }
            /** Concatenate string literals with interpolated values */
            var rendered = concatStringsAndValues(renderedArray, firstInterpolatedValueSetsIndentationLevel ? values.slice(1) : values);
            return rendered;
        }
        else {
            // Create and return a new instance of outdent with the given options
            return createInstance(extend(extend({}, options), stringsOrOptions || {}));
        }
    }
    var fullOutdent = extend(outdent, {
        string: function (str) {
            return _outdentArray([str], false, options)[0];
        },
    });
    return fullOutdent;
}
var defaultOutdent = createInstance({
    trimLeadingNewline: true,
    trimTrailingNewline: true,
});
if (typeof module !== 'undefined') {
    // In webpack harmony-modules environments, module.exports is read-only,
    // so we fail gracefully.
    try {
        module.exports = defaultOutdent;
        Object.defineProperty(defaultOutdent, '__esModule', { value: true });
        defaultOutdent.default = defaultOutdent;
        defaultOutdent.outdent = defaultOutdent;
    }
    catch (e) { }
}

var script = defineComponent({
    components: {
      Layout: script$1
    },

    props: ['metadata'],

    setup({metadata}) {
      const id      = metadata['@id'];
      const tagName = `togostanza-${id}`;
      const badges  = ['stanza:context', 'stanza:display', 'stanza:license'].map(k => metadata[k]).filter(Boolean);

      const paramFields = (metadata['stanza:parameter'] || []).map((param) => {
        return {
          param,
          valueRef: ref(param['stanza:example'])
        };
      });

      const aboutLinkPlacementDefault  = metadata['stanza:about-link-placement'] || 'bottom-right';
      const aboutLinkPlacementValueRef = ref(aboutLinkPlacementDefault);

      const styleFields = (metadata['stanza:style'] || []).map((style) => {
        const defaultValue = style['stanza:default'];
        const valueRef     = ref(defaultValue);

        return {
          style,
          valueRef,
          defaultValue,

          resetToDefault() {
            valueRef.value = defaultValue;
          }
        };
      });

      const elementSnippet = computed(() => {
        const attrs = paramFields
          .map(({param, valueRef}) => `${param['stanza:key']}=${JSON.stringify(valueRef.value)}`)
          .concat(aboutLinkPlacementValueRef.value === aboutLinkPlacementDefault ? [] : [`togostanza-about-link-placement=${JSON.stringify(aboutLinkPlacementValueRef.value)}`]);

        return attrs.length === 0 ? `<${tagName}></${tagName}>` : defaultOutdent`
          <${tagName}
          ${attrs.map(s => ' '.repeat(2) + s).join('\n')}
          ></${tagName}>
        `;
      });

      const styleSnippet = computed(() => {
        const styles = styleFields
          .filter(({style, valueRef}) => valueRef.value !== style['stanza:default'])
          .map(({style, valueRef}) => `${style['stanza:key']}: ${valueRef.value};`);

        return styles.length === 0 ? null : defaultOutdent`
          <style>
            ${tagName} {
          ${styles.map(s => ' '.repeat(4) + s).join('\n')}
            }
          </style>
        `;
      });

      const scriptSrc = new URL(`./${id}.js`, location.href).href;

      const combinedSnippet = computed(() => {
        return [
          `<script type="module" src="${scriptSrc}" async><\/script>`,
          styleSnippet.value,
          elementSnippet.value
        ].filter(Boolean).join('\n\n');
      });

      function copyCombinedSnippetToClipboard() {
        navigator.clipboard.writeText(combinedSnippet.value);
      }

      return {
        metadata,
        badges,
        paramFields,
        aboutLinkPlacementValueRef,
        styleFields,
        elementSnippet,
        styleSnippet,
        combinedSnippet,
        copyCombinedSnippetToClipboard
      };
    }
  });

const _hoisted_1 = { class: "list-inline" };
const _hoisted_2 = { class: "badge rounded-pill bg-secondary" };
const _hoisted_3 = /*#__PURE__*/createVNode("hr", null, null, -1 /* HOISTED */);
const _hoisted_4 = { class: "row" };
const _hoisted_5 = { class: "col-lg-6" };
const _hoisted_6 = /*#__PURE__*/createVNode("h2", null, "Parameters", -1 /* HOISTED */);
const _hoisted_7 = { class: "row mt-3" };
const _hoisted_8 = { class: "form-label" };
const _hoisted_9 = {
  key: 0,
  class: "text-danger"
};
const _hoisted_10 = { class: "form-text text-muted" };
const _hoisted_11 = { class: "col-sm-6 col-lg-12 col-xl-6 mb-3" };
const _hoisted_12 = /*#__PURE__*/createVNode("label", { class: "form-label" }, " togostanza-about-link-placement ", -1 /* HOISTED */);
const _hoisted_13 = /*#__PURE__*/createStaticVNode("<option value=\"top-left\">top-left</option><option value=\"top-right\">top-right</option><option value=\"bottom-left\">bottom-left</option><option value=\"bottom-right\">bottom-right</option><option value=\"none\">none</option>", 5);
const _hoisted_18 = /*#__PURE__*/createVNode("small", { class: "form-text text-muted" }, " Placement of the information icon which links to this page. ", -1 /* HOISTED */);
const _hoisted_19 = /*#__PURE__*/createVNode("hr", null, null, -1 /* HOISTED */);
const _hoisted_20 = /*#__PURE__*/createVNode("h2", null, "Styles", -1 /* HOISTED */);
const _hoisted_21 = { class: "row mt-3" };
const _hoisted_22 = { class: "form-label" };
const _hoisted_23 = { class: "input-group" };
const _hoisted_24 = { class: "input-group-append" };
const _hoisted_25 = { class: "form-text text-muted" };
const _hoisted_26 = {
  key: 0,
  class: "font-italic"
};
const _hoisted_27 = { class: "col-lg-6" };
const _hoisted_28 = /*#__PURE__*/createVNode("hr", { class: "d-lg-none mb-4" }, null, -1 /* HOISTED */);
const _hoisted_29 = { class: "bg-dark" };
const _hoisted_30 = { class: "text-right p-2" };
const _hoisted_31 = { class: "overflow-auto p-3 pt-0 text-white" };
const _hoisted_32 = { class: "overflow-auto p-3 bg-light" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Layout = resolveComponent("Layout");

  return (openBlock(), createBlock(_component_Layout, { containerClass: "container-fluid" }, {
    default: withCtx(() => [
      createVNode("h1", null, toDisplayString(_ctx.metadata['stanza:label']), 1 /* TEXT */),
      createVNode("ul", _hoisted_1, [
        (openBlock(true), createBlock(Fragment, null, renderList(_ctx.badges, (badge) => {
          return (openBlock(), createBlock("li", {
            key: badge,
            class: "list-inline-item"
          }, [
            createVNode("span", _hoisted_2, toDisplayString(badge), 1 /* TEXT */)
          ]))
        }), 128 /* KEYED_FRAGMENT */))
      ]),
      _hoisted_3,
      createVNode("div", _hoisted_4, [
        createVNode("div", _hoisted_5, [
          createVNode("section", null, [
            _hoisted_6,
            createVNode("div", _hoisted_7, [
              (openBlock(true), createBlock(Fragment, null, renderList(_ctx.paramFields, ({param, valueRef}) => {
                return (openBlock(), createBlock("div", {
                  key: param['stanza:key'],
                  class: "col-sm-6 col-lg-12 col-xl-6 mb-3"
                }, [
                  createVNode("label", _hoisted_8, [
                    (param['stanza:required'])
                      ? (openBlock(), createBlock("span", _hoisted_9, "*"))
                      : createCommentVNode("v-if", true),
                    createTextVNode(" " + toDisplayString(param['stanza:key']), 1 /* TEXT */)
                  ]),
                  withDirectives(createVNode("input", {
                    type: "text",
                    "onUpdate:modelValue": $event => (valueRef.value = $event),
                    class: "form-control"
                  }, null, 8 /* PROPS */, ["onUpdate:modelValue"]), [
                    [vModelText, valueRef.value]
                  ]),
                  createVNode("small", _hoisted_10, toDisplayString(param['stanza:description']), 1 /* TEXT */)
                ]))
              }), 128 /* KEYED_FRAGMENT */)),
              createVNode("div", _hoisted_11, [
                _hoisted_12,
                withDirectives(createVNode("select", {
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (_ctx.aboutLinkPlacementValueRef = $event)),
                  class: "form-select"
                }, [
                  _hoisted_13
                ], 512 /* NEED_PATCH */), [
                  [vModelSelect, _ctx.aboutLinkPlacementValueRef]
                ]),
                _hoisted_18
              ])
            ])
          ]),
          _hoisted_19,
          createVNode("section", null, [
            _hoisted_20,
            createVNode("div", _hoisted_21, [
              (openBlock(true), createBlock(Fragment, null, renderList(_ctx.styleFields, ({style, valueRef, defaultValue, resetToDefault}) => {
                return (openBlock(), createBlock("div", {
                  key: style['stanza:key'],
                  class: "col-sm-6 col-lg-12 col-xl-6 mb-3"
                }, [
                  createVNode("label", _hoisted_22, toDisplayString(style['stanza:key']), 1 /* TEXT */),
                  createVNode("div", _hoisted_23, [
                    (style['stanza:type'] === 'single-choice')
                      ? withDirectives((openBlock(), createBlock("select", {
                          key: 0,
                          "onUpdate:modelValue": $event => (valueRef.value = $event),
                          class: "form-select"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(style['stanza:choice'], (choice) => {
                            return (openBlock(), createBlock("option", {
                              value: choice,
                              key: choice
                            }, toDisplayString(choice), 9 /* TEXT, PROPS */, ["value"]))
                          }), 128 /* KEYED_FRAGMENT */))
                        ], 8 /* PROPS */, ["onUpdate:modelValue"])), [
                          [vModelSelect, valueRef.value]
                        ])
                      : withDirectives((openBlock(), createBlock("input", {
                          key: 1,
                          type: style['stanza:type'],
                          "onUpdate:modelValue": $event => (valueRef.value = $event),
                          class: "form-control"
                        }, null, 8 /* PROPS */, ["type", "onUpdate:modelValue"])), [
                          [vModelDynamic, valueRef.value]
                        ]),
                    createVNode("div", _hoisted_24, [
                      createVNode("button", {
                        onClick: $event => (resetToDefault()),
                        disabled: valueRef.value === defaultValue,
                        type: "button",
                        class: "btn btn-light border"
                      }, "Reset", 8 /* PROPS */, ["onClick", "disabled"])
                    ])
                  ]),
                  createVNode("small", _hoisted_25, toDisplayString(style['stanza:description']), 1 /* TEXT */)
                ]))
              }), 128 /* KEYED_FRAGMENT */))
            ]),
            (_ctx.styleFields.length === 0)
              ? (openBlock(), createBlock("p", _hoisted_26, " No styles defined. "))
              : createCommentVNode("v-if", true)
          ])
        ]),
        createVNode("div", _hoisted_27, [
          _hoisted_28,
          createVNode("div", _hoisted_29, [
            createVNode("div", _hoisted_30, [
              createVNode("button", {
                onClick: _cache[2] || (_cache[2] = $event => (_ctx.copyCombinedSnippetToClipboard())),
                type: "button",
                class: "btn btn-sm btn-light"
              }, " Copy to clipboard ")
            ]),
            createVNode("pre", _hoisted_31, [
              createVNode("code", null, toDisplayString(_ctx.combinedSnippet), 1 /* TEXT */)
            ])
          ]),
          createVNode("div", _hoisted_32, [
            createVNode("div", { innerHTML: _ctx.styleSnippet }, null, 8 /* PROPS */, ["innerHTML"]),
            createVNode("div", { innerHTML: _ctx.elementSnippet }, null, 8 /* PROPS */, ["innerHTML"])
          ])
        ])
      ])
    ]),
    _: 1
  }))
}

script.render = render;
script.__file = "node_modules/togostanza/src/components/Help.vue";

function helpApp(metadata) {
  return createApp(script, {metadata})
}

export default helpApp;
//# sourceMappingURL=help-app.js.map
