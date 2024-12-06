import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type sampleDataType = {
  movieName: string;
  ticketSold: number;
  revenue: number;
};

const AdminBarChart = () => {
  const data: sampleDataType[] = [
    {
      movieName: "The Batman",
      ticketSold: 1000,
      revenue: 10000,
    },
    {
      movieName: "The Penguin",
      ticketSold: 1500,
      revenue: 20000,
    },
    {
      movieName: "Batman vs Superman",
      ticketSold: 900,
      revenue: 8000,
    },
    {
      movieName: "The Flash",
      ticketSold: 100,
      revenue: 3000,
    },
    {
      movieName: "Breaking Bad",
      ticketSold: 400,
      revenue: 6000,
    },
  ];

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md p-2 rounded">
          <p className="font-bold">{label}</p>
          <p className="text-gray-600">Tickets Sold: {payload[0].value}</p>
          <p className="text-gray-600">
            Revenue: ₱{payload[1].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="movieName" />
        <YAxis tickFormatter={(value) => `₱${value.toLocaleString()}`} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="ticketSold" fill="#525252" name="Ticket Sold" />
        <Bar dataKey="revenue" fill="#0f172a" name="Revenue" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AdminBarChart;
