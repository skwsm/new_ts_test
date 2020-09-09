import { d as defineComponent, s as script$1, c as createBlock, r as resolveComponent, o as openBlock, w as withCtx, a as createVNode, F as Fragment, b as renderList, t as toDisplayString, e as createApp } from './Layout-26463f7d.js';

var script = defineComponent({
    components: {
      Layout: script$1
    },

    props: ['allMetadata'],

    setup({allMetadata}) {
      return {
        allMetadata
      };
    }
  });

const _hoisted_1 = /*#__PURE__*/createVNode("h1", null, "List of Stanzas", -1 /* HOISTED */);
const _hoisted_2 = { class: "list-group mt-3" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Layout = resolveComponent("Layout");

  return (openBlock(), createBlock(_component_Layout, null, {
    default: withCtx(() => [
      _hoisted_1,
      createVNode("div", _hoisted_2, [
        (openBlock(true), createBlock(Fragment, null, renderList(_ctx.allMetadata, (metadata) => {
          return (openBlock(), createBlock("a", {
            key: metadata['@id'],
            href: `./${metadata['@id']}.html`,
            class: "list-group-item list-group-item-action py-3"
          }, toDisplayString(metadata['stanza:label']), 9 /* TEXT, PROPS */, ["href"]))
        }), 128 /* KEYED_FRAGMENT */))
      ])
    ]),
    _: 1
  }))
}

script.render = render;
script.__file = "node_modules/togostanza/src/components/Index.vue";

createApp(script, {allMetadata: [{"@context":{"stanza":"http://togostanza.org/resource/stanza#"},"@id":"my_stanza","stanza:label":"My stanza","stanza:definition":"my stanza","stanza:parameter":[{"stanza:key":"say-to","stanza:example":"world","stanza:description":"who to say hello to","stanza:required":false}],"stanza:about-link-placement":"bottom-right","stanza:style":[],"stanza:usage":"<togostanza-my_stanza></togostanza-my_stanza>","stanza:type":"Stanza","stanza:context":"","stanza:display":"Text","stanza:provider":"DBCLS","stanza:license":"MIT","stanza:author":"Shuichi Kawashima","stanza:address":"shuichi.kawashima@gmail.com","stanza:contributor":[],"stanza:created":"2020-09-09","stanza:updated":"2020-09-09"}]}).mount('body');
//# sourceMappingURL=index-app.js.map
