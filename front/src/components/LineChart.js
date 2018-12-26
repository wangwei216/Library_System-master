import {Line} from 'vue-chartjs'
    
export default {
    extends: Line,
    data () {
        return {
          gradient: null,
          gradient2: null
        }
    },
  mounted () {
    // 设置渐变   
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
    this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
    this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
    this.gradient2.addColorStop(0, 'rgba(0, 231, 255, 0.9)')
    this.gradient2.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)');
    this.gradient2.addColorStop(1, 'rgba(0, 231, 255, 0)');

    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: '2016年',
          borderColor: '#FC2525',
          pointBackgroundColor: '#fff',
          borderWidth: 1,
          pointBorderColor: '#fff',
          backgroundColor: this.gradient,
          data: [70, 20, 102, 159, 268, 65, 40, 20, 136, 112, 157, 181]
        },{
          label: '2017年',
          borderColor: '#05CBE1',
          pointBackgroundColor: 'white',
          pointBorderColor: 'white',
          borderWidth: 1,
          backgroundColor: this.gradient2,
          data: [96, 26, 82, 110, 182, 85, 25, 32, 104, 212, 234,260]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false}// 设置 responsive:true，使得图表会充满外层容器
  )}
}