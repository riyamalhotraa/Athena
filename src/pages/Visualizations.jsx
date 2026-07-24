import { useEffect, useState } from "react";
import PageHeader from '../components/ui/PageHeader.jsx'
import Card from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import FilterBar from '../components/visualizations/FilterBar.jsx'
import ChartCard from '../components/visualizations/ChartCard.jsx'
import {
  BarDistributionChart,
  CorrelationMatrixChart,
  ScatterChart,
  BoxPlotChart,
  CategoricalBarChart,
  DonutChart,
  AreaTrendChart,
  DensityCurveChart,
} from '../components/visualizations/MiniCharts.jsx'

// const CHARTS = [
//   { title: 'Feature Distribution', description: 'Analyze the spread and skewness of features.', Chart: BarDistributionChart },
//   { title: 'Feature Correlation', description: 'Matrix showing relationships between variables.', Chart: CorrelationMatrixChart },
//   { title: 'Relationship Analysis', description: 'Bivariate analysis between two features.', Chart: ScatterChart },
//   { title: 'Outlier Detection', description: 'Statistical summary showing quartiles.', Chart: BoxPlotChart },
//   { title: 'Categorical Comparison', description: 'Frequency analysis of categories.', Chart: CategoricalBarChart },
//   { title: 'Composition Overview', description: 'Proportional breakdown of a feature.', Chart: () => <DonutChart percentage={65} /> },
//   { title: 'Temporal Trends', description: 'Data trends over a time series.', Chart: AreaTrendChart },
//   { title: 'Density Estimation', description: 'Smoothed distribution curve.', Chart: DensityCurveChart },
// ]

export default function Visualizations() {
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {

    const stored = sessionStorage.getItem("analysisResult");

    if (stored) {
      setAnalysis(JSON.parse(stored));
    }

  }, []);

  return (
    <div className="flex flex-col gap-stack-lg pb-24">
      <PageHeader title="Visualizations" description="Understand your dataset through interactive visualizations." />

      <FilterBar />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">

        {/* Correlation Heatmap */}

        {analysis?.plots?.correlation_heatmap && (

          <ChartCard
            title="Correlation Heatmap"
            description="Correlation between numerical features."
          >

            <img
              src={analysis.plots.correlation_heatmap}
              alt="Correlation Heatmap"
              className="w-full rounded-lg"
            />

          </ChartCard>

        )}

        {/* Histograms */}

        {analysis?.plots?.histograms?.map((plot) => (

          <ChartCard
            key={plot}
            title={plot.split("/").pop().replace(".png", "").replace("_", " ")}
            description="Distribution of feature values."
          >

            <img
              src={plot}
              alt="Histogram"
              className="w-full rounded-lg"
            />

          </ChartCard>

        ))}

        {/* Boxplots */}

        {analysis?.plots?.boxplots?.map((plot) => (

          <ChartCard
            key={plot}
            title={plot.split("/").pop().replace(".png", "").replace("_", " ")}
            description="Boxplot"
          >

            <img
              src={plot}
              alt="Boxplot"
              className="w-full rounded-lg"
            />

          </ChartCard>

        ))}

        {/* Countplots */}

        {analysis?.plots?.countplots?.map((plot) => (

          <ChartCard
            key={plot}
            title={plot.split("/").pop().replace(".png", "").replace("_", " ")}
            description="Categorical distribution"
          >

            <img
              src={plot}
              alt="Countplot"
              className="w-full rounded-lg"
            />

          </ChartCard>

        ))}

      </div>

      {/* Floating AI insight banner */}
      <Card className="p-6 flex flex-col md:flex-row items-start md:items-center gap-5 bg-secondary-container/30 border-primary/20">
        <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shrink-0 text-on-primary">
          <Icon name="auto_awesome" size={22} />
        </div>
        <div className="flex-1">
          <p className="text-body-md font-bold text-primary mb-1">Athena AI Insight</p>
          <p className="text-body-md text-on-surface-variant leading-relaxed">
            Based on the current visualizations, we detected a 14% correlation spike between &quot;Session
            Duration&quot; and &quot;User Retention&quot; in the last 48 hours. Consider exploring the Temporal
            Trends dashboard for deeper time-series analysis.
          </p>
        </div>
        <Button variant="secondary" className="shrink-0">
          Generate Report
        </Button>
      </Card>

      {/* Floating chat entry point */}
      <button
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-primary text-on-primary shadow-card-hover flex items-center justify-center hover:bg-[#003ea8] transition-all active:scale-95"
        aria-label="Ask Athena"
      >
        <Icon name="chat" size={24} />
      </button>
    </div>
  )
}
