export class StatisticsController {
    constructor() {
        this.loadStatistics();
        this.initCharts();
    }

    async loadStatistics() {
        try {
            const response = await fetch('/api/statistics.php');
            const stats = await response.json();
            this.updateDashboardStats(stats);
            this.updateCharts(stats);
        } catch (error) {
            console.error('Error loading statistics:', error);
        }
    }

    updateDashboardStats(stats) {
        document.getElementById('totalTasks').textContent = stats.total;
        document.getElementById('completionRate').textContent = `${stats.completion_rate}%`;
        document.getElementById('activeTasks').textContent = stats.active || '0';
        document.getElementById('overdueTasks').textContent = stats.overdue || '0';
    }

    initCharts() {
        this.priorityChart = new Chart(
            document.getElementById('priorityChart').getContext('2d'),
            {
                type: 'doughnut',
                data: {
                    labels: ['High', 'Medium', 'Low'],
                    datasets: [{
                        data: [30, 50, 20],
                        backgroundColor: ['#ff4444', '#ffbb33', '#00C851'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            }
        );

        this.trendChart = new Chart(
            document.getElementById('trendChart').getContext('2d'),
            {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Completed Tasks',
                        data: [12, 19, 15, 25, 22, 30],
                        borderColor: getComputedStyle(document.documentElement)
                            .getPropertyValue('--primary-color'),
                        tension: 0.4,
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            }
        );
    }

    updateCharts(stats) {
        if (stats.priority_distribution) {
            this.priorityChart.data.datasets[0].data = [
                stats.priority_distribution.high,
                stats.priority_distribution.medium,
                stats.priority_distribution.low
            ];
            this.priorityChart.update();
        }

        if (stats.monthly_trends) {
            this.trendChart.data.labels = stats.monthly_trends.map(item => item.month);
            this.trendChart.data.datasets[0].data = stats.monthly_trends.map(item => item.completed);
            this.trendChart.update();
        }
    }
}

// Initialize the controller when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new StatisticsController();
});
