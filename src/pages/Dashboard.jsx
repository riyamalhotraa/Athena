import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card.jsx'
import StatCard from '../components/ui/StatCard.jsx'
import Button from '../components/ui/Button.jsx'
import Badge from '../components/ui/Badge.jsx'
import Table from '../components/ui/Table.jsx'
import QuickActionButton from '../components/dashboard/QuickActionButton.jsx'
import ActivityFeedItem from '../components/dashboard/ActivityFeedItem.jsx'
import ReportCard from '../components/reports/ReportCard.jsx'
import { getDashboardStats } from '../services/dashboardService.js'
import { formatDate, formatNumber } from '../utils/formatters.js'

const FALLBACK_STATS = {
    datasets: 0,
    analyses: 0,
    reports: 0,
    visualizations: 0
}

const RECENT_DATASETS = [
  { id: 1, name: 'Q3 Sales Data', rows: 15420, columns: 42, uploadDate: '2023-10-12', status: 'Cleaned' },
  { id: 2, name: 'User Retention Metrics', rows: 8902, columns: 18, uploadDate: '2023-10-10', status: 'Cleaned' },
  { id: 3, name: 'Ad Campaign Performance', rows: 45671, columns: 64, uploadDate: '2023-10-05', status: 'Processing' },
  { id: 4, name: 'Inventory Level v2', rows: 2104, columns: 12, uploadDate: '2023-10-02', status: 'Cleaned' },
]

const ACTIVITY_FEED = [
  { title: 'Dataset cleaned', description: 'Q3 Sales Data optimized for training.', time: '2 mins ago' },
  { title: 'Missing values handled', description: '3,200 null entries imputed using KNN.', time: '1 hour ago' },
  { title: 'Feature engineering completed', description: 'Created 12 temporal features from timestamps.', time: '3 hours ago' },
  { title: 'Model trained', description: 'XGBoost Regression model achieved 0.94 R\u00b2.', time: 'Yesterday' },
  { title: 'Report generated', description: 'Quarterly Performance Insight v1.4 ready.', time: '2 days ago' },
]

const RECENT_REPORTS = [
  { id: 1, title: 'Sales Forecasting Q4', dataset: 'Q3 Sales Data', status: 'READY', pages: 12, date: '2023-10-14' },
  { id: 2, title: 'Churn Analysis 2023', dataset: 'User Retention Metrics', status: 'READY', pages: 8, date: '2023-10-11' },
  { id: 3, title: 'Market Positioning Study', dataset: 'Industry Benchmarks', status: 'READY', pages: 15, date: '2023-10-08' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState(FALLBACK_STATS)


  useEffect(() => {
      getDashboardStats()
          .then((data) => {
              setStats({
                  datasets: data.total_datasets,
                  analyses: data.analyses_completed,
                  reports: data.reports_generated,
                  visualizations: data.visualizations_created,
              });
          })
          .catch(() => {
              setStats(FALLBACK_STATS);
          });
  }, []);

  const columns = [
    { key: 'name', header: 'Dataset Name', render: (row) => <span className="font-semibold text-on-surface">{row.name}</span> },
    { key: 'rows', header: 'Rows', render: (row) => formatNumber(row.rows) },
    { key: 'columns', header: 'Columns' },
    { key: 'uploadDate', header: 'Upload Date', render: (row) => formatDate(row.uploadDate) },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <Badge tone={row.status === 'Cleaned' ? 'success' : 'info'}>{row.status}</Badge>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-stack-lg pb-12">
      {/* Welcome banner */}
      <Card className="bg-primary border-none p-8 md:p-10 text-on-primary">
        <h1 className="text-headline-lg mb-2">Welcome back!</h1>
        <p className="text-body-lg text-white/85 max-w-2xl">
          Analyze datasets, generate insights, create visualizations, and build reports using AI. Your data scientist
          is ready to assist.
        </p>
      </Card>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <StatCard icon="dataset" value={formatNumber(stats.datasets)} label="Total Datasets" helperText="Active & Ready" badge="+2 new" badgeTone="positive" />
        <StatCard icon="query_stats" iconTone="secondary" value={formatNumber(stats.analyses)} label="Analyses Completed" helperText="Last 30 days" badge="↑ 12%" badgeTone="positive" />
        <StatCard icon="verified" iconTone="tertiary" value={formatNumber(stats.reports)} label="AI Reports Generated" helperText="Verified" badge="Automated" badgeTone="primary" />
        <StatCard icon="monitoring" iconTone="neutral" value={formatNumber(stats.visualizations)} label="Visualizations Created" helperText="High precision" badge="Legacy" badgeTone="neutral" />
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-title-lg text-on-surface mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          <QuickActionButton icon="upload_file" label="Upload Dataset" primary onClick={() => navigate('/datasets')} />
          <QuickActionButton icon="query_stats" label="Start New Analysis" onClick={() => navigate('/analysis')} />
          <QuickActionButton icon="forum" label="Ask AI Assistant" onClick={() => navigate('/chat')} />
          <QuickActionButton icon="description" label="Generate Report" onClick={() => navigate('/reports')} />
        </div>
      </div>

      {/* Recent datasets + AI activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <Card className="lg:col-span-2 flex flex-col">
          <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant">
            <h3 className="text-title-lg text-on-surface">Recent Datasets</h3>
            <Button variant="link" onClick={() => navigate('/datasets')}>
              View All
            </Button>
          </div>
          <Table columns={columns} data={RECENT_DATASETS} />
        </Card>

        <Card className="p-6 flex flex-col">
          <h3 className="text-title-lg text-on-surface mb-5 flex items-center gap-2">
            <span className="text-primary">✨</span> AI Activity
          </h3>
          <div className="flex flex-col">
            {ACTIVITY_FEED.map((item, i) => (
              <ActivityFeedItem key={i} {...item} isLast={i === ACTIVITY_FEED.length - 1} />
            ))}
          </div>
        </Card>
      </div>

      {/* Recent reports */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-title-lg text-on-surface">Recent Reports</h2>
          <Button variant="link" onClick={() => navigate('/reports')}>
            Browse Library
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {RECENT_REPORTS.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </div>

      <footer className="text-center pt-6 border-t border-outline-variant text-label-md text-on-surface-variant">
        Powered by Athena &bull; Autonomous AI Data Scientist
      </footer>
    </div>
  )
}
