
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const LineChartBoss = () => {
    const data = [
        { name: 'Week 1', complete: 4000, incomplete: 2400, amt: 2400 },
        { name: 'Week 2', complete: 3000, incomplete: 1398, amt: 2210 },
        { name: 'Week 3', complete: 2000, incomplete: 9800, amt: 2290 },
        { name: 'Week 4', complete: 2780, incomplete: 3908, amt: 2000 },
    ];

    return (
        <div style={{ width: '100%', height: '350px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="complete" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="incomplete" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineChartBoss;
