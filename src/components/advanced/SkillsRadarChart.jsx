import { useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SkillsRadarChart = () => {
  const chartRef = useRef(null);

  const data = {
    labels: [
      'React/Next.js',
      'Node.js/Express',
      'Python/Django',
      'Database Design',
      'Cloud/AWS',
      'UI/UX Design',
      'DevOps/Docker',
      'Mobile Development'
    ],
    datasets: [
      {
        label: 'Current Skills',
        data: [95, 85, 80, 90, 75, 85, 70, 65],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: 'Learning Goals',
        data: [100, 95, 90, 95, 90, 90, 85, 80],
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        borderColor: 'rgba(147, 51, 234, 0.5)',
        borderWidth: 2,
        borderDash: [5, 5],
        pointBackgroundColor: 'rgba(147, 51, 234, 0.5)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(147, 51, 234, 1)',
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        min: 0,
        ticks: {
          stepSize: 20,
          color: 'rgba(156, 163, 175, 0.8)',
          font: {
            size: 12,
            weight: '500'
          },
          backdropColor: 'transparent'
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.2)',
          lineWidth: 1
        },
        angleLines: {
          color: 'rgba(156, 163, 175, 0.3)',
          lineWidth: 1
        },
        pointLabels: {
          color: 'rgba(156, 163, 175, 0.9)',
          font: {
            size: 14,
            weight: '600'
          },
          padding: 20
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgba(156, 163, 175, 0.9)',
          font: {
            size: 14,
            weight: '600'
          },
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: 'rgba(156, 163, 175, 1)',
        bodyColor: 'rgba(156, 163, 175, 1)',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        titleFont: {
          size: 14,
          weight: '600'
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.r}%`;
          }
        }
      }
    },
    elements: {
      line: {
        tension: 0.4
      }
    }
  };

  useEffect(() => {
    if (chartRef.current && chartRef.current.chartInstance) {
      const chart = chartRef.current.chartInstance;
      
      // Animate the chart on mount
      const animateChart = () => {
        // Additional null check before accessing chart properties
        if (!chart || !chart.data || !chart.data.datasets || !chart.data.datasets[0]) {
          return;
        }
        
        const datasets = chart.data.datasets;
        const originalData = datasets[0].data;
        
        datasets[0].data = originalData.map(() => 0);
        chart.update('none');
        
        const animate = () => {
          // Check again in case chart was destroyed during animation
          if (!chart || !chart.data || !chart.data.datasets || !chart.data.datasets[0]) {
            return;
          }
          
          let allComplete = true;
          datasets[0].data.forEach((value, index) => {
            if (value < originalData[index]) {
              datasets[0].data[index] = Math.min(value + 2, originalData[index]);
              allComplete = false;
            }
          });
          
          chart.update('none');
          
          if (!allComplete) {
            requestAnimationFrame(animate);
          }
        };
        
        animate();
      };
      
      // Delay animation to let chart render first
      setTimeout(animateChart, 500);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Skills Radar
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Current expertise and learning goals across different technologies
        </p>
      </div>
      
      <div className="relative h-96">
        <Radar
          ref={chartRef}
          data={data}
          options={options}
        />
      </div>
      
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">95%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">React/Next.js</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">85%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Node.js/Express</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">90%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Database Design</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">85%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">UI/UX Design</div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
          🎯 Learning Focus Areas
        </h4>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>• Advancing DevOps and containerization skills</li>
          <li>• Expanding mobile development capabilities</li>
          <li>• Deepening cloud architecture knowledge</li>
          <li>• Mastering advanced React patterns</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default SkillsRadarChart; 