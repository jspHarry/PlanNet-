import React from "react";
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
import { chartData } from "../assets/data";

 
export const Chart = ({data}) => {
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <BarChart width={150} height={40} data={data}>
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray='3 3' />
        <Bar dataKey='total' fill='green' />
      </BarChart>
    </ResponsiveContainer>
  );
};



// import React from "react";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Legend,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { chartData } from "../assets/data";

// const data = [
//   { name: "HIGH", high: 1500 },
//   { name: "MEDIUM", medium: 1000 },
//   { name: "NORMAL", normal: 1500 },
//   { name: "LOW", low: 1600 },
// ];

// export const Chart = () => {
//   return (
//     <ResponsiveContainer width="100%" height={320}>
//       <BarChart data={data} barSize={100}>
//         <XAxis dataKey="name" tick={{ fill: "#ffffff" }} />
//         <YAxis tick={{ fill: "#ffffff" }} />
//         <Tooltip cursor={{ fill: "transparent" }} />
//         <Legend />
//         <CartesianGrid strokeDasharray="3 3" stroke="#8884d8" />

//         {/* Different bars for different priorities */}
//         <Bar dataKey="high" fill="#FF4F4F" name="High Priority" />
//         <Bar dataKey="medium" fill="#FFD200" name="Medium Priority" />
//         <Bar dataKey="normal" fill="#00D181" name="Normal Priority" />
//         <Bar dataKey="low" fill="#FFA500" name="Low Priority" />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// };
