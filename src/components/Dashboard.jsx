import React from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const pendingWorkData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [{
      label: 'Pending Tasks',
      data: [5, 10, 15],
      backgroundColor: ['#ff3d71', '#ff9f1c', '#40c9a2'],
      borderColor: ['#ff3d71', '#ff9f1c', '#40c9a2'],
      borderWidth: 1,
    }],
  };

  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [{
      label: 'Task Completion Rate',
      data: [70, 75, 80, 85],
      borderColor: '#6b48ff',
      backgroundColor: 'rgba(107, 72, 255, 0.2)',
      fill: true,
      tension: 0.4,
    }],
  };

  const notificationsData = {
    labels: ['Mentions', 'Meetings', 'Deadlines', 'Updates'],
    datasets: [{
      data: [10, 5, 8, 12],
      backgroundColor: ['#ffd166', '#06d6a0', '#ef476f', '#118ab2'],
      borderColor: ['#ffd166', '#06d6a0', '#ef476f', '#118ab2'],
      borderWidth: 1,
    }],
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="charts">
        <div className="chart">
          <h3>Pending Work</h3>
          <div className="chart-container">
            <Bar data={pendingWorkData} options={chartOptions} />
          </div>
        </div>
        <div className="chart">
          <h3>Performance Over Time</h3>
          <div className="chart-container">
            <Line data={performanceData} options={chartOptions} />
          </div>
        </div>
        <div className="chart">
          <h3>Notifications</h3>
          <div className="chart-container">
            <Doughnut data={notificationsData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;