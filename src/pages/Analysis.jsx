import { useEffect, useState } from "react";
import PageHeader from '../components/ui/PageHeader.jsx'
import Card from '../components/ui/Card.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import StatCard from '../components/ui/StatCard.jsx'
import QualityMetricBar from '../components/analysis/QualityMetricBar.jsx'
import FeatureListItem from '../components/analysis/FeatureListItem.jsx'
import SuggestedActionCard from '../components/analysis/SuggestedActionCard.jsx'

// const FEATURES = [
//   { name: 'transaction_id', type: 'ID (Unique)', icon: 'fingerprint' },
//   { name: 'created_at', type: 'Datetime', icon: 'calendar_month' },
//   { name: 'amount_usd', type: 'Float64', icon: 'payments' },
//   { name: 'region_code', type: 'Category', icon: 'public' },
//   { name: 'customer_loyalty', type: 'Boolean', icon: 'person' },
// ]

const SUGGESTED_ACTIONS = [
  { icon: 'cleaning_services', title: 'Clean Dataset', description: 'Automated formatting and trimming.' },
  { icon: 'rule', title: 'Handle Missing Values', description: 'Smart imputation with KNN or Mean.' },
  { icon: 'construction', title: 'Feature Engineering', description: 'Create time-based or interaction features.' },
  { icon: 'swap_horiz', title: 'Encode Categories', description: 'One-Hot or Label encoding presets.' },
  { icon: 'tune', title: 'Normalize Data', description: 'Min-Max or Standard scaling.' },
  { icon: 'model_training', title: 'Train ML Model', description: 'Quick experiment with AutoML.' },
]

export default function Analysis() {

  const [analysis, setAnalysis] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);

  useEffect(() => {

    const stored = sessionStorage.getItem("analysisResult");

    if (stored) {
        setAnalysis(JSON.parse(stored));
    }

    const parsed = JSON.parse(stored);

    setAnalysis(parsed);

    if (parsed.feature_info?.length > 0) {
        setSelectedFeature(parsed.feature_info[0].name);
    }

  }, []);

  const stats =analysis?.summary?.statistics?.[selectedFeature] ?? {};

  return (
    <div className="flex flex-col gap-stack-lg pb-12">
      <PageHeader title="Dataset Analysis" description="Automatically understand and prepare your data using AI." />
      {
      analysis && (

      <Card className="p-6">

      <h3 className="text-title-lg mb-4">
      Athena Report
      </h3>

      <pre className="whitespace-pre-wrap text-sm">
      {analysis.report_text}
      </pre>

      </Card>

      )
      }

      <div className="grid grid-cols-12 gap-gutter">
        {/* Left: stat cards + quality score */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-gutter">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-gutter">
            <StatCard
                icon="table_rows"
                iconTone="secondary"
                value={analysis?.summary?.rows ?? "--"}
                label="Rows"
            />

            <StatCard
                icon="view_column"
                iconTone="secondary"
                value={analysis?.summary?.columns ?? "--"}
                label="Columns"
            />

            <StatCard
                icon="tag"
                iconTone="tertiary"
                value={analysis?.summary?.numeric_columns?.length ?? "--"}
                label="Numeric"
            />

            <StatCard
                icon="category"
                iconTone="neutral"
                value={analysis?.summary?.categorical_columns?.length ?? "--"}
                label="Categorical"
            />
          </div>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-title-lg text-on-surface flex items-center gap-2">
                <Icon name="verified_user" size={22} className="text-primary" />
                Data Quality Score
              </h3>
              <Badge tone="success">
                {analysis
                  ? `${(100 - analysis.quality.missing_percentage).toFixed(1)}%`
                  : "--"}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <QualityMetricBar
                label="Missing Values"
                value={analysis?.quality?.missing_percentage ?? 0}
                helperText={`${analysis?.quality?.missing_values ?? 0} missing values detected.`}
              />
              <QualityMetricBar label="Outliers Detected" value={3.2} helperText="Concentrated in 'transaction_amount'. Review advised." tone="warning" />
              <QualityMetricBar
                label="Duplicate Rows"
                value={analysis?.quality?.duplicate_rows ?? 0}
                helperText={`${analysis?.quality?.duplicate_rows ?? 0} duplicate rows detected.`}
              />
              <QualityMetricBar label="Inconsistent Data" value={1.8} helperText="Formatting mismatch in 'country_iso' field." tone="warning" />
            </div>
          </Card>
        </div>

        {/* Right: feature analysis */}
        <Card className="col-span-12 lg:col-span-4 flex flex-col">
          <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant">
            <h3 className="text-title-lg text-on-surface">Feature Analysis</h3>
            <button className="text-on-surface-variant" aria-label="Filter features">
              <Icon name="filter_list" size={20} />
            </button>
          </div>
          <div className="flex-1 p-2">

            {analysis?.feature_info?.map((feature) => (
              <FeatureListItem
                  key={feature.name}
                  name={feature.name}
                  type={feature.type}
                  icon="table_rows"

                  selected={selectedFeature === feature.name}

                  onClick={() => setSelectedFeature(feature.name)}
              />
          ))}

          </div>
          <div className="px-6 py-4 border-t border-outline-variant">
            <Button variant="link">View All {analysis?.summary?.columns ?? 0} Features</Button>
          </div>
        </Card>

        {/* Feature statistics */}
        <Card className="col-span-12 lg:col-span-6 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-title-lg text-on-surface">Feature Statistics</h3>
              <p className="text-label-md text-on-surface-variant">
                Sample:
                <span className="font-code text-primary">
                    {selectedFeature}
                </span>
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Icon name="bar_chart" size={20} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[  
                { label: "Mean", value: stats.mean ?? "--" },
                { label: "Median", value: stats["50%"] ?? "--" },
                { label: "Std Dev", value: stats.std ?? "--" },
                { label: "Max", value: stats.max ?? "--" },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface-container-low rounded-xl p-4">
                <p className="text-label-md text-on-surface-variant uppercase mb-1">{stat.label}</p>
                <p className="text-title-lg text-on-surface">{stat.value}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-label-md text-on-surface-variant uppercase font-semibold">Distribution</span>
            <span className="text-label-md text-primary">Skew: 1.42 (Right)</span>
          </div>
          <div className="flex items-end gap-2 h-24">
            {[30, 55, 90, 70, 45, 20].map((h, i) => (
              <div key={i} className={i === 2 ? 'flex-1 bg-primary rounded-t-md' : 'flex-1 bg-primary/30 rounded-t-md'} style={{ height: `${h}%` }} />
            ))}
          </div>
        </Card>

        {/* Suggested AI actions */}
        <Card className="col-span-12 lg:col-span-6 p-6">
          <h3 className="text-title-lg text-on-surface mb-5 flex items-center gap-2">
            <Icon name="bolt" size={22} className="text-tertiary" />
            Suggested AI Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {SUGGESTED_ACTIONS.map((action) => (
              <SuggestedActionCard key={action.title} {...action} />
            ))}
          </div>
          <Button variant="primary" size="md" className="w-full" icon="auto_awesome">
            Generate Comprehensive Insights
          </Button>
        </Card>

        {/* AI recommendation banner */}
        <Card className="col-span-12 bg-primary border-none p-8 flex flex-col md:flex-row items-start md:items-center gap-6 text-on-primary">
          <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center shrink-0">
            <Icon name="auto_awesome" size={28} />
          </div>
          <div className="flex-1">
            <h3 className="text-title-lg mb-2">Athena&apos;s Intelligent Recommendation</h3>
            <p className="text-body-lg text-white/90 leading-relaxed">
              Based on the high cardinality in <code className="bg-white/15 px-1.5 py-0.5 rounded text-body-md">customer_id</code> and
              the distribution shift in <code className="bg-white/15 px-1.5 py-0.5 rounded text-body-md">amount_usd</code>, Athena
              recommends performing <strong>Target Encoding</strong> and <strong>Log Transformation</strong> before
              training. This is expected to improve model accuracy by approximately 6.4%.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Button variant="secondary" className="!bg-white !text-primary border-none">
              Apply Fixes
            </Button>
            <Button variant="secondary" className="!bg-transparent !text-white border border-white/40">
              Dismiss
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
