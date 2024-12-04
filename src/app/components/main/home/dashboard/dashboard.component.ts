import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ChartModule } from 'primeng/chart';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatIcon,ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Funding Progress',
        data: [65, 59, 80, 81, 56],
        borderColor: '#007bff',
        fill: false
      }
    ]
  };

  lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  };
  
  barChartData = {
    labels: ['Research', 'Charity', 'Training'],
    datasets: [
      {
        label: 'Total Grants Awarded',
        backgroundColor: ['#007bff', '#28a745', '#ffc107'],
        data: [210, 150, 100]
      }
    ]
  };

  barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  };
  horizontalBarChartOptions = {
    indexAxis: 'y', 
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  };


  pieChartData = {
    labels: ['Animal and Plant Health Inspection Service', 'National Science Foundation', 'Health Resources and Services Administration'],
    datasets: [
      {
        data: [300, 200, 100],
        backgroundColor: ['#007bff', '#28a745', '#ffc107']
      }
    ]
  };

  pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  };
  // Data for the donut chart representing the number of opportunities per agency
  donutChartData = {
    labels: [
      'Animal and Plant Health Inspection Service', 
      'National Science Foundation', 
      'Health Resources and Services Administration'
    ],
    datasets: [
      {
        data: [300, 200, 100], // Values for each agency
        backgroundColor: ['#007bff', '#28a745', '#ffc107'], // Colors for each agency
        borderWidth: 0
      }
    ]
  };

  // Options for the donut chart
  donutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' // Position the legend on top
      },
    },
    cutout: '50%'  // Create a hole in the center to make it a donut chart
  };

  deadlines: string[] = [
    'End of 2023',
    'Q1 2024',
    'Q2 2024'
  ];

  // Data for stacked bar chart representing various opportunity types per deadline
  chartData = {
    labels: this.deadlines,
    datasets: [
      {
        label: 'Research',
        data: [20, 15, 30], // Data for each deadline (End of 2024, Q1 2025, Q2 2025)
        backgroundColor: '#42A5F5', // Blue color for Research Opportunities
      },
      {
        label: 'Charity',
        data: [40, 35, 25], // Grants opportunities data for each deadline
        backgroundColor: '#66BB6A', // Green color for Grants Opportunities
      },
      {
        label: 'Training',
        data: [30, 25, 40], // Training opportunities data for each deadline
        backgroundColor: '#FFA726', // Orange color for Training Opportunities
      }
    ]
  };

  // Chart options for stacked bar chart
  chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 20,
          padding: 15
        }
      },
      tooltip: {
        callbacks: {
          label: (context:any) => {
            let label = context.dataset.label || '';
            let value = context.raw || 0;
            return `${label}: ${value} Grants`;
          }
        }
      }
    },
    scales: {
      x: {
        stacked: true, // Stack bars on the X-axis (deadlines)
        title: {
          display: true,
          text: 'Deadlines'
        }
      },
      y: {
        stacked: true, // Stack bars on the Y-axis (opportunity types)
        title: {
          display: true,
          text: 'Grants Awarded'
        },
        ticks: {
          beginAtZero: true
        }
      }
    }
  };

  combinedChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],  // Months for the x-axis
    datasets: [
      {
        label: 'Bar Data',  // Data for the bar chart
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(0, 123, 255, 0.6)',  // Bar color
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1,
        type: 'bar',  // Set the type to 'bar' for this dataset
      },
      {
        label: 'Line Data',  // Data for the line chart
        data: [28, 48, 40, 19, 86, 27],
        borderColor: 'rgba(40, 167, 69, 1)',  // Line color
        fill: false,  // Do not fill the area under the line
        tension: 0.4,  // Smooth line curve
        type: 'line',  // Set the type to 'line' for this dataset
      }
    ]
  };

  // Options for the combined chart
  combinedChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,  // Start the y-axis at zero
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',  // Position the legend on top
      }
    }
  };
  favoriteOpportunitiesData = {
    labels: [
      'NSF', 
      'HRSA', 
      'APHIS'
    ],
    datasets: [
      {
        label: 'Favorite Opportunities',
        data: [12, 8, 19], // Number of favorites for each agency
        backgroundColor: ['#007bff', '#28a745', '#ffc107'], // Bar colors
        borderColor: ['#0056b3', '#218838', '#e0a800'], // Border color for bars
        borderWidth: 1
      }
    ]
  };

  // Options for the bar chart (can be customized further)
  favoriteOpportunitiesOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem:any) {
            return `${tooltipItem.raw} favorites`;
          }
        }
      }
    }
  };
}
