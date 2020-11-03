
<template>
  <div class="home">
    111
    <v-chart :data="getSource()" />
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  methods: {
    getSource() {
      return {
        xAxis: {
          type: 'category',
          data: ['M', 'Tu', 'Th', 'Fu', 'F']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [54,89,47,23,15]
          }
        ]
      }
    }
  }
}
</script>
