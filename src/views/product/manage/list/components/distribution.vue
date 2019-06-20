<template>
  <div>
    我是关联资源
  </div>
</template>

<script>

export default {
  filters: {

  },
  props: {

  },
  data() {
    return {
      list: null,
      listQuery: {
        page: 1,
        limit: 5,
        type: this.type,
        sort: '+id'
      },
      loading: false
    }
  },
  created() {

  },
  methods: {

  }
}
</script>

