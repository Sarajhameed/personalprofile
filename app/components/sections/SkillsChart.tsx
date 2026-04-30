'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts'
import skillsData from '@/data/skills.json'
import type { Skill } from '@/lib/types'

export default function SkillsChart() {
  const skills = skillsData as Skill[]

  const chartData = skills
    .filter(skill => skill.level !== undefined)
    .sort((a, b) => (b.level || 0) - (a.level || 0))
    .map(skill => ({
      name: skill.name.length > 15 ? skill.name.substring(0, 15) + '...' : skill.name,
      fullName: skill.name,
      level: skill.level || 0,
      category: skill.category
    }))

  const getBarColor = (level: number) => {
    if (level >= 90) return '#10b981'
    if (level >= 80) return '#059669'
    return '#34d399'
  }

  return (
    <div className="w-full" style={{ height: '400px', minHeight: '400px' }}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          barSize={20}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} stroke="#334155" />
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            axisLine={{ stroke: '#334155' }}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={120}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={{ stroke: '#334155' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '8px 12px',
              color: '#f8fafc'
            }}
            formatter={(value: any) => [`${value}%`, 'Proficiency']}
          />
          <Bar
            dataKey="level"
            radius={[0, 4, 4, 0]}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.level)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
