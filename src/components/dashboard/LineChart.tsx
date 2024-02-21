import { PureComponent, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Payload } from "recharts/types/component/DefaultLegendContent";

const DEFAULT_BUTTON_COLOR = "#113448";

const data = [
  {
    match: "1",
    attacking: 30,
    skill: 75,
    physical: 70,
    mentality: 60,
    defending: 85,
  },
  {
    match: "2",
    attacking: 40,
    skill: 85,
    physical: 75,
    mentality: 63,
    defending: 85,
  },
  {
    match: "3",
    attacking: 50,
    skill: 80,
    physical: 75,
    mentality: 66,
    defending: 85,
  },
  {
    match: "4",
    attacking: 70,
    skill: 90,
    physical: 70,
    mentality: 69,
    defending: 85,
  },
  {
    match: "5",
    attacking: 60,
    skill: 85,
    physical: 75,
    mentality: 75,
    defending: 85,
  },
  {
    match: "6",
    attacking: 80,
    skill: 90,
    physical: 75,
    mentality: 75,
    defending: 85,
  },
  {
    match: "7",
    attacking: 75,
    skill: 85,
    physical: 70,
    mentality: 80,
    defending: 85,
  },
];

type Key = {
  key: string;
  color: string;
};

function LineExample() {
  const labels: Key[] = [
    { key: "attacking", color: "#DA393B" },
    { key: "skill", color: "#27B6BD" },
    { key: "physical", color: "#B09E03" },
    { key: "mentality", color: "#FC6713" },
    { key: "defending", color: "#5A54A2" },
  ];

  const colorMap = {
    attacking: "#DA393B",
    skill: "#27B6BD",
    physical: "#B09E03",
    mentality: "#FC6713",
    defending: "#5A54A2"
  }

  const [lineProps, setLineProps]: [any, any] = useState(
    labels.reduce(
      (a, { key }) => {
        a[key] = false;
        return a;
      },
      { hover: null }
    )
  );

  function CustomLegend(props) {
    const { payload } = props;
    return (
      <div className="flex flex-col">
        {payload.map((entry, index) => (
          <div className="stats-legend__buttons hover:font-bold hover:cursor-pointer" style={{ background: !lineProps[entry.value] ? labels[index].color : DEFAULT_BUTTON_COLOR }} key={`line-item-${index}`} onClick={(data) => selectLine(data)}>{entry.value}</div >
        ))
        }
      </div >
    )
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="stats-line-chart__tooltip">
          {payload.map((entry, index) => (
            <p key={`tooltip-${index}`} style={{ color: colorMap[entry.name] }}>{`${entry.name}: ${entry.value}`}</p>
          ))}
        </div>
      );
    }

    return null;
  };

  function handleLegendMouseEnter(data: Payload) {
    if (data.dataKey && typeof data.dataKey == "string" && !lineProps[data.dataKey]) {
      setLineProps({ ...lineProps, hover: data.dataKey });
    }
  }

  function handleLegendMouseLeave() {
    setLineProps({ ...lineProps, hover: null });
  }

  function selectLine(e: any) {
    if (e.target.textContent && e.target.textContent in lineProps) {
      setLineProps({
        ...lineProps,
        [e.target.textContent]: !lineProps[e.target.textContent],
        hover: null,
      });
    }
  }

  return (
    <ResponsiveContainer width="70%" height={350}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="match" tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend layout="vertical" verticalAlign="middle" align="left" content={<CustomLegend />} />
        <Line
          type="monotone"
          dataKey="attacking"
          stroke="#DA393B"
          strokeWidth="4"
          dot={false}
          hide={lineProps["attacking"] === true}
        />
        <Line
          type="monotone"
          dataKey="skill"
          stroke="#27B6BD"
          strokeWidth="4"
          dot={false}
          hide={lineProps["skill"] === true}
        />
        <Line
          type="monotone"
          dataKey="physical"
          stroke="#B09E03"
          strokeWidth="4"
          dot={false}
          hide={lineProps["physical"] === true}
        />
        <Line
          type="monotone"
          dataKey="mentality"
          stroke="#FC6713"
          strokeWidth="4"
          dot={false}
          hide={lineProps["mentality"] === true}
        />
        <Line
          type="monotone"
          dataKey="defending"
          stroke="#5A54A2"
          strokeWidth="4"
          dot={false}
          hide={lineProps["defending"] === true}
        />
        <CartesianGrid strokeWidth={2} horizontal={true} vertical={false} opacity={0.5} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineExample;
