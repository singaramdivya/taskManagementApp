import React, { Component } from 'react';
import { PieChart, Pie, Cell,Tooltip} from 'recharts';

class TaskSummary extends Component {
  render() {
    const { activeTasks, completedTasks, totalTasks} = this.props;
    const data = [
      { name: 'Active Tasks', value: activeTasks },
      { name: 'Completed Tasks', value: completedTasks },
      { name: 'Total Tasks', value: totalTasks }
    ];

    const COLORS = ['#8884d8', '#00C49F', '#FFBB28'];

    return (
      <div className='status-update-container'>
        <div className='pie-chart-container'>
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            cx={200}
            cy={150}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        </div>
        <div className='bar-chart-container'>
            <div className='bar bar1'>
              <div className='bar1-container'></div>
              <p className='text1'>Active Tasks</p>
            </div>
            <div className='bar bar2'>
              <div className='bar2-container'></div>
              <p className='text2'>Completed Tasks</p>
            </div>
            <div className='bar bar3'>
              <div className='bar3-container'></div>
              <p className='text3'>Total Tasks</p>
            </div>
        </div>
      </div>
    );
  }
}

export default TaskSummary;
