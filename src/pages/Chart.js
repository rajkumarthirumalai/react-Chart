import React, { useState } from "react";

function Chart() {

    const [chartData,setChartData] = useState([])
      return (
      <ChartComponent
        primaryXAxis={{
          valueType: "DateTime",
          labelFormat: "yMMM",
          title: "Month",
          crosshairTooltip: { enable: true },
        }}
        title="AAPL historical"
        primaryYAxis={{ title: "Price" }}
        tooltip={{ enable: true }}
        crosshair={{ enable: true, lineType: "Vertical" }}
      >
        <Inject
          services={[CandleSeries, DateTime, Tooltip, Crosshair]}
        ></Inject>
        <SeriesCollectionDirective>
          {/* To create a Hilo Open Close series, import HiloOpenCloseSeries from the chart package and inject it into chart services. Then change the series type to HiloOpenClose*/}
          {/* To create a CandleSeries,import CandleSeries from chart package and inject it into chart series. Then change services type to Candle*/}
          <SeriesDirective
            type="Candle"
            name="Apple INC."
            dataSource={chartData}
            xName="date"
            high="high"
            low="low"
            open="open"
            close="close"
          ></SeriesDirective>
        </SeriesCollectionDirective>
      </ChartComponent>
      );


}

export default Chart;
