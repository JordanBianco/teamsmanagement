<script>
import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  	extends: Doughnut,
	mixins: [reactiveProp],
  	props: ['options'],
	mounted () {
    	this.renderChart(this.chartData, this.options)
  	},
	watch: {
		'options': {
		handler(newOption, oldOption) {
			this.$data._chart.update()
			this.renderChart(this.chartData, this.options)
		},
		deep: true
		}
	},
}
</script>