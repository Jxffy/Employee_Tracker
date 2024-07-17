// Data for bar and pie charts
const barChartData = {
    labels: ['Mon, Jul 15', 'Tue, Jul 16', 'Wed, Jul 17', 'Thu, Jul 18', 'Fri, Jul 19', 'Sat, Jul 20', 'Sun, Jul 21'],
    datasets: [{
        label: 'Hours Worked',
        data: [0, 11, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
    }]
};

const pieChartData = {
    labels: ['DATA', 'Without project'],
    datasets: [{
        data: [6, 5],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB']
    }]
};

// Create bar chart
const ctxBar = document.getElementById('barChart').getContext('2d');
const barChart = new Chart(ctxBar, {
    type: 'bar',
    data: barChartData,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Create pie chart
const ctxPie = document.getElementById('pieChart').getContext('2d');
const pieChart = new Chart(ctxPie, {
    type: 'pie',
    data: pieChartData,
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});
