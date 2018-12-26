<template>
<div class="slider">
  <carousel-3d :controls-visible="true" :clickable="false" :width="540" :height="240" :autoplay="true" :autoplay-timeout="5000" :count="sliders"  >
    <slide :index="0">
      <img src="../../static/images/book1.jpg" alt="">
    </slide>
    <slide :index="1">
      <img src="../../static/images/book2.jpg" alt="">
    </slide>
    <slide :index="2">
      <img src="../../static/images/book7.jpg" alt="">
    </slide>
    <slide :index="3">
      <img src="../../static/images/book4.jpg" alt="">
    </slide>
    <slide :index="4">
      <img src="../../static/images/book5.jpg" alt="">
    </slide>
  </carousel-3d>

  <div class="Chart__list">
    <div class="Chart">
      <h3>图书馆月借书数</h3>
      <line-example :height="320"></line-example>
    </div>
</div>

</div>  
</template> 

<script>
import LineExample from './LineChart.js'
    export default {
        components: {
          LineExample
        },
        data() {
            return {
              sliders:5,
            }
        },    
}
</script>

<style scoped>
.Chart__list {
  width: 100%;
  margin: 100px 0;
}
.Chart {
  background: #212733;
  border-radius: 20px;
  box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
}
.Chart h3 {
  text-align: center;
  margin-top: 0;
  padding: 15px 0;
  color:  #fff;
  border-bottom: 1px solid #323d54;
}
  
</style>
