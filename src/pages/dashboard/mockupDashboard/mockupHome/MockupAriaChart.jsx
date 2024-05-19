import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const MockupAriaChart = () => {
    const data = [
        {
          name: 'Week 1',
          completed: 4000,
          reject: 2400,
          amt: 2400,
        },
        {
          name: 'Week 2',
          completed: 3000,
          reject: 1398,
          amt: 2210,
        },
        {
          name: 'Week 3',
          completed: 2000,
          reject: 9800,
          amt: 2290,
        },
        {
          name: 'Week 4',
          completed: 8780,
          reject: 3908,
          amt: 2000,
        }
      ];
    return (
        <div style={{ width: '100%', height: '250px' }}>
        <h4 className='text-xl  font-bold mb-4'>Monthly<span className='text-primary'> Chart:</span></h4>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={200}
            data={data}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="completed" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
        
      </div>
    );
};

export default MockupAriaChart;