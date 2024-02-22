import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, Text, LabelList, Tooltip, Legend } from "recharts";
import { PureComponent, useState, useEffect } from "react";
import { useMediaQuery } from "@/app/utils/useMediaQuery";

const COLORS = ["#DA393B", "#27B6BD", "#B09E03", "#FC6713", "#5A54A2"];
const DEFAULT_COLOR = "#113448";
const LAYERCOLOR = "#ffffff";

const data = [
  { attribute: "attacking", rating: 80 },
  { attribute: "skill", rating: 90 },
  { attribute: "physical", rating: 75 },
  { attribute: "mentality", rating: 95 },
  { attribute: "defending", rating: 85 },
];

const description = {
  attacking: "Attacking description goes here",
  skill: "Skill description goes here",
  physical: "Physical description goes here",
  mentality: "Mentality description goes here",
  defending: "Defending description goes here",
}

type Key = {
  key: string;
  color: string;
};

const SimpleBarChart = () => {
  const isMobile = useMediaQuery("(max-width: 850px)");

  const xKey = "attribute";
  const yKey = "rating";

  const labels: Key[] = [
    { key: "attacking", color: "#DA393B" },
    { key: "skill", color: "#27B6BD" },
    { key: "physical", color: "#B09E03" },
    { key: "mentality", color: "#FC6713" },
    { key: "defending", color: "#5A54A2" },
  ];

  const resetProps = {
    click: null,
    hover: null
  };

  const [barProps, setBarProps]: [any, any] = useState(resetProps);

  function CustomLegend() {
    return (
      <div className="stats-legend__container">
        {labels.map((entry, index) => (
          <div
            key={`bar-item-${index}`}
            className="stats-legend__buttons"
            style={{ background: barProps.click === entry.key ? labels[index].color : DEFAULT_COLOR }}
            onClick={(data) => selectBar(data)}
            onMouseEnter={(data) => handleLegendMouseEnter(data)}
            onMouseLeave={() => handleLegendMouseLeave()}
          >
            {entry.key}
          </div >
        ))
        }
      </div >
    )
  }

  function handleLegendMouseEnter(e: any) {
    if (!barProps.hover) {
      setBarProps({ ...barProps, hover: e.target.textContent });
    }
  }

  function handleLegendMouseLeave() {
    setBarProps({ ...barProps, hover: null });
  }

  function selectBar(e: any) {
    if (e.target.textContent) {
      if (barProps.click === e.target.textContent) {
        setBarProps({ ...barProps, click: null });
      } else {
        setBarProps({ ...barProps, click: e.target.textContent });
      }
    }
  }

  return (
    <>
      <ResponsiveContainer width={"100%"} height={350} debounce={50}>
        <BarChart data={data} layout="vertical" margin={isMobile ? { left: -40, right: 20 } : { left: 20, right: 30 }}>
          <XAxis hide axisLine={false} type="number" />
          {/* <YAxis yAxisId={0} dataKey={xKey} type="category" axisLine={false} tickLine={false} tick={<CustomYAxisTick />} style={{ textAnchor: "middle" }} /> */}
          <YAxis yAxisId={0} type="category" axisLine={false} tickLine={false} tick={false} />
          <Legend
            layout="vertical"
            verticalAlign={`${isMobile ? 'top' : 'middle'}`}
            align={`${isMobile ? 'center' : 'left'}`}
            content={<CustomLegend />}
            wrapperStyle={isMobile ? {
              paddingBottom: "25px"
            } : {}} />
          {/* <Tooltip cursor={false} content={<CustomTooltip />} position={{ x: 700, y: 0 }} /> */}
          {/* <Tooltip cursor={false} /> */}
          <Bar dataKey={yKey} minPointSize={2} barSize={isMobile ? 28 : 40} radius={20} background={{ fill: LAYERCOLOR, radius: 20, opacity: 0.1 }}>
            <LabelList dataKey={yKey} position="insideRight" offset={15} style={{ fill: LAYERCOLOR }} />
            {data.map((d, idx) => {
              return (
                <Cell
                  key={d[xKey]}
                  fill={COLORS[idx]}
                  fillOpacity={`${barProps.hover === d[xKey] || !barProps.hover ? 1 : 0.4}`}
                />);
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="relative">
        {barProps.click ? <div className="stats-chart__description stats-chart__desc-container">{description[barProps.click]}</div> : ''}
      </div>
    </>
  );
};

export default SimpleBarChart;
