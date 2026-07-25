import { useState, useRef, useEffect } from 'react'
import Card from '../components/ui/Card.jsx'
import Icon from '../components/ui/Icon.jsx'
import Button from '../components/ui/Button.jsx'
import ChatBubble from '../components/chat/ChatBubble.jsx'
import TypingIndicator from '../components/chat/TypingIndicator.jsx'
import SuggestionChip from '../components/chat/SuggestionChip.jsx'
import { BarDistributionChart } from '../components/visualizations/MiniCharts.jsx'
import { chatWithAthena } from '../services/chatService.js'

// const HISTORY = [
//   { id: 1, title: 'Sales Analysis Q3', timestamp: '2 hours ago' },
//   { id: 2, title: 'Outlier Detection', timestamp: 'Yesterday' },
//   { id: 3, title: 'Customer Segmentation', timestamp: 'Yesterday' },
//   { id: 4, title: 'Revenue Forecasting', timestamp: 'Oct 24, 2023' },
//   { id: 5, title: 'Churn Risk Factors', timestamp: 'Oct 22, 2023' },
// ]

const SUGGESTIONS = [

  '📊 Rename Cabin to Compartment',
  '🧹 Fill Missing Values',
  '📈 Create a barplot between Age and Sex',
  '📉 Delete column Ticket',
  '🔍 sort Dataset in ascending order',
  '📄 filter rows having Age > 30'
  ]

const INITIAL_MESSAGES = [
  {
      id:1,
      role:"assistant",
      content:
  `👋 Welcome to Athena.

  Upload a dataset and I'll help you explore, clean, visualize and model it.

  You can ask things like:

  • Summarize my dataset
  • Find missing values
  • Train the best model
  • Rename a column
  • Generate visualizations`,
  timestamp:"Now"
  }
]

export default function AIChat() {
  const [activeHistoryId, setActiveHistoryId] = useState(1)
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [draft, setDraft] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = async (text) => {

    const datasetId = sessionStorage.getItem("dataset_id");

    if (!datasetId) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: "No dataset is loaded. Please upload a dataset first.",
          timestamp: "Now",
        },
      ]);
      return;
    }

    const content = text.trim()
    if (!content) return

    const userMessage = { id: Date.now(), role: 'user', content, timestamp: 'Now' }
    setMessages((prev) => [...prev, userMessage])
    setDraft('')
    setIsTyping(true)

    try {
      const response = await chatWithAthena(datasetId, content)
      console.log("CHAT RESPONSE:", response);
      console.log("PLOTS:", response.plots);
      const previous =
        JSON.parse(sessionStorage.getItem("analysisResult")) || {};

      console.log("Chat response:", response)
      const updatedAnalysis = {
        ...previous,
        summary: response.summary,
      preview: response.preview,
      rows: response.rows,
      columns: response.columns,

      report: response.report,
      report_text: response.report_text,
      plots: response.plots,
      model_results: response.model_results,
      target: response.target,
      cleaning: response.cleaning,
      preprocessing: response.preprocessing,
      };

      sessionStorage.setItem(
        "analysisResult",
        JSON.stringify(updatedAnalysis)
      );
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: response.message,
          timestamp: "Now",
          plot: response.plot,
        },
      ])
    // } catch {
    //   setMessages((prev) => [
    //     ...prev,
    //     {
    //       id: Date.now() + 1,
    //       role: "assistant",
    //       content: response.message,
    //       timestamp: "Now",
    //     }
    //   ])

    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: "Something went wrong while contacting Athena.",
          timestamp: "Now",
        },
      ]);
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="h-[calc(100vh-64px-64px)] -m-4 md:-m-margin-desktop md:my-0 flex">
      {/* Chat history rail */}
      {/* <aside className="hidden lg:flex w-[280px] border-r border-outline-variant flex-col bg-surface-container-lowest">
        <div className="flex-1 overflow-y-auto p-3">
          <ChatHistoryList items={HISTORY} activeId={activeHistoryId} onSelect={setActiveHistoryId} />
        </div>
        <div className="p-4 border-t border-outline-variant text-center">
          <Button variant="link">View All History</Button>
        </div>
      </aside> */}

      {/* Main conversation panel */}
      <div className="flex-1 flex flex-col min-w-0">
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 md:px-10 py-8 flex flex-col gap-6">
          {messages.map((msg) => (
            <ChatBubble key={msg.id} role={msg.role} content={msg.content} timestamp={msg.timestamp} algorithmTag={msg.algorithmTag}>
              {msg.plot && (
                <div className="mt-4">
                  <img
                    src={msg.plot}
                    alt="Visualization"
                    className="rounded-lg border border-outline-variant max-w-full"
                    onError={(e) => console.log("Image failed:", e.target.src)}
                  />
                </div>
              )}
            </ChatBubble>
          ))}
          {isTyping && <TypingIndicator />}
        </div>

        {/* Suggestions + composer */}
        <div className="border-t border-outline-variant bg-surface-container-lowest px-6 md:px-10 py-4 flex flex-col gap-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {SUGGESTIONS.map((s) => (
              <SuggestionChip key={s} label={s} onClick={sendMessage} />
            ))}
          </div>
          <form
            className="flex items-center gap-3"
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage(draft)
            }}
          >
            {/* <button type="button" className="text-on-surface-variant hover:text-primary transition-colors" aria-label="Attach file">
              <Icon name="attach_file" size={22} />
            </button> */}
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Message Athena Assistant..."
              className="flex-1 bg-surface-container-low border border-outline-variant rounded-full px-5 py-3 text-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
            />
            <button
              type="submit"
              className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-[#003ea8] transition-all active:scale-95 shrink-0"
              aria-label="Send message"
            >
              <Icon name="send" size={20} />
            </button>
          </form>
          <p className="text-center text-label-md text-on-surface-variant/70">
            Powered by Athena &bull; Autonomous AI Data Scientist
          </p>
        </div>
      </div>
    </div>
  )
}
