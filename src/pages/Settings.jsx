import { useState } from 'react'
import PageHeader from '../components/ui/PageHeader.jsx'
import Input from '../components/ui/Input.jsx'
import Select from '../components/ui/Select.jsx'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import SettingsSection from '../components/settings/SettingsSection.jsx'
import ToggleRow from '../components/settings/ToggleRow.jsx'
import { classNames } from '../utils/formatters.js'

export default function Settings() {
  const [theme, setTheme] = useState('light')
  const [autoSwitch, setAutoSwitch] = useState(false)
  const [temperature, setTemperature] = useState(0.7)
  const [notifications, setNotifications] = useState({ email: true, alerts: true })

  return (
    <div className="flex flex-col gap-stack-lg pb-12">
      <PageHeader title="Account Settings" description="Manage your profile, application preferences, and security configurations." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        {/* Profile */}
        <SettingsSection icon="person" title="Profile">
          <Input id="fullName" label="Full Name" defaultValue="Alex Rivera" />
          <Input id="email" label="Email Address" type="email" defaultValue="alex@athenaintelligence.ai" />
          <Button variant="primary" icon="edit" className="self-start">
            Update Profile
          </Button>
        </SettingsSection>

        {/* Appearance */}
        <SettingsSection icon="palette" title="Appearance">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setTheme('light')}
              className={classNames(
                'rounded-xl border-2 p-3 text-center transition-all',
                theme === 'light' ? 'border-primary' : 'border-outline-variant hover:border-primary/40'
              )}
            >
              <div className="rounded-lg bg-surface-container-low p-3 mb-3 space-y-1.5">
                <div className="h-2 w-2/3 rounded bg-surface-container-highest" />
                <div className="h-2 w-1/2 rounded bg-surface-container-highest" />
              </div>
              <span className="text-body-md font-semibold">Light Mode</span>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={classNames(
                'rounded-xl border-2 p-3 text-center transition-all',
                theme === 'dark' ? 'border-primary' : 'border-outline-variant hover:border-primary/40'
              )}
            >
              <div className="rounded-lg bg-on-surface p-3 mb-3 space-y-1.5">
                <div className="h-2 w-2/3 rounded bg-white/20" />
                <div className="h-2 w-1/2 rounded bg-white/20" />
              </div>
              <span className="text-body-md font-semibold">Dark Mode</span>
            </button>
          </div>
          <ToggleRow
            id="auto-switch"
            title="Auto-switch"
            description="Sync with system settings"
            checked={autoSwitch}
            onChange={setAutoSwitch}
          />
        </SettingsSection>

        {/* AI Configuration */}
        <SettingsSection icon="smart_toy" title="AI Configuration">
          <Select id="model" label="Default AI Model" defaultValue="athena-v2">
            <option value="athena-v2">Athena Intelligence v2</option>
            <option value="athena-v1">Athena Intelligence v1</option>
            <option value="athena-lite">Athena Lite</option>
          </Select>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="temperature" className="text-label-md text-on-surface-variant font-semibold uppercase">
                Temperature
              </label>
              <span className="text-body-md font-bold text-primary">{temperature.toFixed(1)}</span>
            </div>
            <input
              id="temperature"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-label-md text-on-surface-variant mt-1">
              <span>Precise</span>
              <span>Creative</span>
            </div>
          </div>

          <Input id="maxTokens" label="Max Tokens" defaultValue="2048" className="pr-14 relative" />
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection icon="notifications" title="Notifications">
          <ToggleRow
            id="email-notifications"
            icon="mail"
            title="Email Notifications"
            description="Weekly digest and system updates"
            checked={notifications.email}
            onChange={(v) => setNotifications((prev) => ({ ...prev, email: v }))}
          />
          <ToggleRow
            id="analysis-alerts"
            icon="task_alt"
            title="Analysis Complete Alerts"
            description="Push notification when data is ready"
            checked={notifications.alerts}
            onChange={(v) => setNotifications((prev) => ({ ...prev, alerts: v }))}
          />
        </SettingsSection>

        {/* Security */}
        <SettingsSection icon="shield" title="Security">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-tertiary/5 border border-tertiary/20">
            <Icon name="info" size={20} className="text-tertiary shrink-0 mt-0.5" />
            <p className="text-body-md text-on-surface-variant">
              Your password was last changed 45 days ago. We recommend regular updates for better protection.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="secondary" icon="key">
              Change Password
            </Button>
            <Button variant="secondary" icon="verified_user">
              Enable 2FA
            </Button>
          </div>
        </SettingsSection>

        {/* Danger zone */}
        <SettingsSection icon="warning" title="Danger Zone" danger>
          <p className="text-body-md text-on-surface-variant">
            Proceed with caution. These actions are irreversible and will result in permanent loss of your data
            projects.
          </p>
          <Button variant="danger" icon="delete_forever" className="self-start">
            Delete Account
          </Button>
        </SettingsSection>
      </div>

      <footer className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 border-t border-outline-variant text-label-md text-on-surface-variant">
        <span className="flex items-center gap-1.5">
          <Icon name="verified" size={16} /> Powered by Athena &bull; Autonomous AI Data Scientist
        </span>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary transition-colors">Contact Support</a>
        </div>
      </footer>
    </div>
  )
}
