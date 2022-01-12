<script>
import { Line } from 'vue-chartjs'

export default {
  	extends: Line,
  	// props: ['pending', 'completed', 'progress'],
	mounted () {
    	this.renderChart(this.data, this.options)
  	},
	data() {
		return {
			data: {
				labels: [this.days()],
				datasets: [
                    {
                    label: 'Task completate',
                    backgroundColor: '#f87979',
                    data: [40, 20]
                    }
                ]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false
			}
		}
	},
	methods: {
		days() {
			return this.$moment().format('DD/MM')
		}
	}
}
</script>