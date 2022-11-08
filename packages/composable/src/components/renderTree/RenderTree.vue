<script lang="ts">
import { defineComponent, h } from 'vue-demi'

const createDom = (list) => {
  return list.map(node => h('ul', null, [
    h(
      'li',
      { title: node.title, id: node.key },
      [node.title, node.children ? createDom(node.children) : null]
    )
  ]))
}

export default defineComponent({
  props: {
    treeData: {
      type: Object
    }
  },

  setup(props) {
    // console.log('props: ', props.treeData)
    return () => createDom(props.treeData)
  }
})
</script>
