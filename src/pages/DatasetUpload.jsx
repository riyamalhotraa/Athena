import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import PageHeader from '../components/ui/PageHeader.jsx'
import UploadArea from '../components/ui/UploadArea.jsx'
import Card from '../components/ui/Card.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import Table from '../components/ui/Table.jsx'
import Icon from '../components/ui/Icon.jsx'
import { uploadDataset } from '../services/datasetService.js'
import { startAnalysis } from '../services/analysisService.js'


const PREVIEW_ROWS = [
  { id: 'CUST-00412', date: '2023-09-12', amount: '$1,240.00', region: 'North America' },
  { id: 'CUST-00413', date: '2023-09-12', amount: '$850.50', region: 'Europe' },
  { id: 'CUST-00414', date: '2023-09-13', amount: '$2,100.25', region: 'Asia Pacific' },
  { id: 'CUST-00415', date: '2023-09-13', amount: '$340.00', region: 'North America' },
  { id: 'CUST-00416', date: '2023-09-14', amount: '$1,890.00', region: 'Europe' },
]

const RECENT_UPLOADS = [
  { id: 1, name: 'customer_churn_analysis.xlsx', date: 'Oct 24, 2023, 11:42 AM', status: 'Ready' },
  { id: 2, name: 'q3_sales_report_final.csv', date: 'Oct 22, 2023, 09:15 AM', status: 'Processing' },
]

export default function DatasetUpload() {
  const [file, setFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [previewRows, setPreviewRows] = useState([])
  const [error, setError] = useState(null)
  const [preview, setPreview] = useState([])
  const [previewColumns, setPreviewColumns] = useState([])

  const navigate = useNavigate();
  
  useEffect(() => {

    const stored = sessionStorage.getItem("analysisResult")

    if (stored) {

      const analysis = JSON.parse(stored)

      if (analysis.preview && analysis.preview.length > 0) {

        setPreview(analysis.preview)
        setPreviewColumns(Object.keys(analysis.preview[0]))

      }

    }

  }, [])
  const handleFileSelected = async (selectedFile) => {
    setFile(selectedFile)
    setIsUploading(true)
    setError(null)

    try {

      // Upload dataset
      const uploadResponse = await uploadDataset(selectedFile)
      sessionStorage.setItem("dataset_id", uploadResponse.dataset_id)

      console.log(uploadResponse)

      // Start analysis
      const analysisResponse = await startAnalysis(uploadResponse.dataset_id)

      console.log(analysisResponse)

      setAnalysisResult(analysisResponse)
      setPreviewRows(analysisResponse.preview)
      sessionStorage.setItem(
        "analysisResult",
        JSON.stringify(analysisResponse)
      )
      navigate("/analysis");

    } catch (err) {

      console.error(err)
      setError("Analysis failed.")

    } finally {

      setIsUploading(false)

    }
  }

  const uploadColumns = [
    {
      key: 'name',
      header: 'Dataset Name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <Icon name="description" size={20} className="text-primary" />
          <span className="font-medium">{row.name}</span>
        </div>
      ),
    },
    { key: 'date', header: 'Upload Date' },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <Badge tone={row.status === 'Ready' ? 'success' : 'info'} dot>{row.status}</Badge>,
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: () => (
        <div className="flex justify-end gap-2">
          <button className="p-2 text-secondary hover:text-primary hover:bg-primary/10 rounded transition-all" aria-label="Download">
            <Icon name="download" size={20} />
          </button>
          <button className="p-2 text-secondary hover:text-error hover:bg-error/10 rounded transition-all" aria-label="Delete">
            <Icon name="delete" size={20} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-stack-lg pb-12">
      <PageHeader title="Upload Your Dataset" description="Upload CSV or Excel files to begin AI-powered analysis." />

      <div className="grid grid-cols-12 gap-gutter">
        {/* Main column */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-gutter">
          <UploadArea onFileSelected={handleFileSelected} />

          <Card className="overflow-hidden">
            <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center">
              <h3 className="text-title-lg text-on-surface">
                Preview: {file ? file.name : 'active_customers_q3.csv'}
              </h3>
              <span className="bg-primary/10 text-primary text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded">
                Top 5 Rows
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">

                <thead className="bg-surface-container border-b border-outline-variant">
                  <tr>
                    {previewColumns.map((column) => (
                      <th
                        key={column}
                        className="px-6 py-4 text-label-md text-on-surface-variant"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-outline-variant">
                  {preview.map((row, index) => (
                    <tr
                      key={index}
                      className="hover:bg-surface-container-low transition-colors"
                    >
                      {previewColumns.map((column) => (
                        <td
                          key={column}
                          className="px-6 py-4 text-body-md"
                        >
                          {String(row[column] ?? "")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </Card>
        </div>

        {/* Meta column */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
          <div className="grid grid-cols-2 gap-stack-md">
            <Card hoverable className="p-6">
              <p className="text-label-md text-secondary mb-1">Rows</p>
              <h4 className="text-title-lg">15,420</h4>
              <div className="mt-2 flex items-center text-primary">
                <Icon name="trending_up" size={16} />
                <span className="text-[10px] font-bold ml-1">+12%</span>
              </div>
            </Card>
            <Card hoverable className="p-6">
              <p className="text-label-md text-secondary mb-1">Columns</p>
              <h4 className="text-title-lg">42</h4>
            </Card>
            <Card hoverable className="p-6">
              <p className="text-label-md text-secondary mb-1">File Size</p>
              <h4 className="text-title-lg">2.4 MB</h4>
            </Card>
            <Card hoverable className="p-6">
              <p className="text-label-md text-secondary mb-1">Missing Values</p>
              <h4 className="text-title-lg text-error">0.2%</h4>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-title-lg mb-4">Schema Health</h3>
            <div className="space-y-4">
              {[
                { label: 'Data Consistency', value: 98 },
                { label: 'Type Match', value: 94 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-label-md text-on-surface-variant">{item.label}</span>
                    <span className="text-label-md font-bold">{item.value}%</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full" style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="rounded-card overflow-hidden shadow-card aspect-square bg-gradient-to-br from-primary to-[#0b2f80] border border-outline-variant relative flex flex-col justify-end p-6">
            <p className="text-white text-label-md uppercase tracking-widest opacity-80 mb-2">Athena Pro Insight</p>
            <h4 className="text-white text-title-lg leading-tight">
              Advanced clustering will be available for this dataset size.
            </h4>
          </div>
        </div>

        {/* Recent uploads */}
        <div className="col-span-12">
          <Card className="overflow-hidden">
            <div className="px-6 py-4 border-b border-outline-variant">
              <h3 className="text-title-lg">Recent Uploads</h3>
            </div>
            <Table columns={uploadColumns} data={RECENT_UPLOADS} isLoading={isUploading} />
          </Card>
        </div>
      </div>

      <div className="flex justify-end items-center gap-4 py-4">
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary" icon="arrow_forward" iconPosition="right">
          Proceed to Analysis
        </Button>
      </div>
    </div>
  )
}
