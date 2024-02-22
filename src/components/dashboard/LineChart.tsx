import { PureComponent, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Payload } from "recharts/types/component/DefaultLegendContent";
import { useMediaQuery } from "@/app/utils/useMediaQuery";

const DEFAULT_COLOR = "#113448";

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
  const isMobile = useMediaQuery("(max-width: 850px)");

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
      <div className="stats-legend__container">
        {payload.map((entry, index) => (
          <div
            key={`line-item-${index}`}
            className="stats-legend__buttons"
            style={{ background: !lineProps[entry.value] ? labels[index].color : DEFAULT_COLOR }}
            onClick={(data) => selectLine(data)}
            onMouseEnter={(data) => handleLegendMouseEnter(data)}
            onMouseLeave={() => handleLegendMouseLeave()}
          >
            {entry.value}
          </div >
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

  function handleLegendMouseEnter(e: any) {
    if (!lineProps[e.target.textContent] && !lineProps.hover) {
      setLineProps({ ...lineProps, hover: e.target.textContent });
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
    <>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={isMobile ? {
            right: 20,
            left: -10,
          } : {
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="match" tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            layout="vertical"
            verticalAlign={`${isMobile ? 'top' : 'middle'}`}
            align={`${isMobile ? 'center' : 'left'}`}
            content={<CustomLegend />}
            wrapperStyle={isMobile ? {
              paddingBottom: "40px"
            } : {}} />
          <Line
            type="monotone"
            dataKey="attacking"
            stroke={`${lineProps["attacking"] ? DEFAULT_COLOR : "#DA393B"}`}
            strokeWidth={`${lineProps["attacking"] ? '2' : lineProps.hover === "attacking" || !lineProps.hover ? '5' : '1'}`}
            dot={false}
          // hide={lineProps["attacking"] === true}
          />
          <Line
            type="monotone"
            dataKey="skill"
            stroke={`${lineProps["skill"] ? DEFAULT_COLOR : "#27B6BD"}`}
            strokeWidth={`${lineProps["skill"] ? '2' : lineProps.hover === "skill" || !lineProps.hover ? '5' : '1'}`}
            dot={false}
          // hide={lineProps["skill"] === true}
          />
          <Line
            type="monotone"
            dataKey="physical"
            stroke={`${lineProps["physical"] ? DEFAULT_COLOR : "#B09E03"}`}
            strokeWidth={`${lineProps["physical"] ? '2' : lineProps.hover === "physical" || !lineProps.hover ? '5' : '1'}`}
            dot={false}
          // hide={lineProps["physical"] === true}
          />
          <Line
            type="monotone"
            dataKey="mentality"
            stroke={`${lineProps["mentality"] ? DEFAULT_COLOR : "#FC6713"}`}
            strokeWidth={`${lineProps["mentality"] ? '2' : lineProps.hover === "mentality" || !lineProps.hover ? '5' : '1'}`}
            dot={false}
          // hide={lineProps["mentality"] === true}
          />
          <Line
            type="monotone"
            dataKey="defending"
            stroke={`${lineProps["defending"] ? DEFAULT_COLOR : "#5A54A2"}`}
            strokeWidth={`${lineProps["defending"] ? '2' : lineProps.hover === "defending" || !lineProps.hover ? '5' : '1'}`}
            dot={false}
          // hide={lineProps["defending"] === true}
          />
          <CartesianGrid strokeWidth={2} horizontal={true} vertical={false} opacity={0.5} />
        </LineChart>
      </ResponsiveContainer>
      <div className="relative">
        {/* This is space for an information box. Even if not used, leave in for consistent spacing with BarChart component */}
      </div>
    </>
  );
}

export default LineExample;
