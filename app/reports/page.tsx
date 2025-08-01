"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts"
import { Download, FileText, TrendingUp, TrendingDown, Users, Calendar, BarChart3, PieChartIcon } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedClass, setSelectedClass] = useState("all")

  const monthlyData = [
    { month: "Jan", attendance: 88, target: 90 },
    { month: "Feb", attendance: 92, target: 90 },
    { month: "Mar", attendance: 89, target: 90 },
    { month: "Apr", attendance: 94, target: 90 },
    { month: "May", attendance: 91, target: 90 },
    { month: "Jun", attendance: 95, target: 90 },
  ]

  const weeklyData = [
    { day: "Mon", present: 145, absent: 5, late: 3 },
    { day: "Tue", present: 138, absent: 12, late: 3 },
    { day: "Wed", present: 142, absent: 8, late: 3 },
    { day: "Thu", present: 140, absent: 10, late: 3 },
    { day: "Fri", present: 135, absent: 15, late: 3 },
  ]

  const classPerformance = [
    { name: "Math 101", value: 95, color: "#10b981" },
    { name: "Physics 201", value: 88, color: "#3b82f6" },
    { name: "Chemistry 301", value: 92, color: "#8b5cf6" },
    { name: "Biology 101", value: 85, color: "#f59e0b" },
    { name: "English 101", value: 90, color: "#ef4444" },
  ]

  const attendanceTrend = [
    { date: "2024-01-01", rate: 85 },
    { date: "2024-01-08", rate: 88 },
    { date: "2024-01-15", rate: 92 },
    { date: "2024-01-22", rate: 89 },
    { date: "2024-01-29", rate: 94 },
  ]

  const topPerformers = [
    { name: "Alice Johnson", class: "Math 101", attendance: 98, trend: "up" },
    { name: "Bob Smith", class: "Physics 201", attendance: 96, trend: "up" },
    { name: "Carol Davis", class: "Chemistry 301", attendance: 95, trend: "stable" },
    { name: "David Wilson", class: "Biology 101", attendance: 94, trend: "up" },
    { name: "Eva Brown", class: "English 101", attendance: 93, trend: "down" },
  ]

  const lowPerformers = [
    { name: "Frank Miller", class: "Math 101", attendance: 65, trend: "down" },
    { name: "Grace Lee", class: "Physics 201", attendance: 68, trend: "down" },
    { name: "Henry Taylor", class: "Chemistry 301", attendance: 72, trend: "up" },
    { name: "Ivy Chen", class: "Biology 101", attendance: 75, trend: "stable" },
    { name: "Jack Brown", class: "English 101", attendance: 78, trend: "up" },
  ]

  const stats = {
    overallAttendance: 92.5,
    totalStudents: 1250,
    averageDaily: 1156,
    monthlyGrowth: 2.3,
    classesActive: 45,
    facultyActive: 85,
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />
      default:
        return <div className="w-4 h-4 bg-slate-400 rounded-full" />
    }
  }

  const exportReport = (format: string) => {
    // In a real app, this would generate and download the report
    console.log(`Exporting report in ${format} format`)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Reports & Analytics</h1>
            <p className="text-slate-600 dark:text-slate-300 mt-1">
              Comprehensive attendance insights and data visualization
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={() => exportReport("pdf")}>
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm" onClick={() => exportReport("csv")}>
              <FileText className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Overall Rate</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.overallAttendance}%</p>
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />+{stats.monthlyGrowth}%
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Total Students</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.totalStudents}</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Daily Average</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.averageDaily}</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Active Classes</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.classesActive}</p>
                </div>
                <PieChartIcon className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Active Faculty</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.facultyActive}</p>
                </div>
                <Users className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Growth Rate</p>
                  <p className="text-2xl font-bold text-green-600">+{stats.monthlyGrowth}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-teal-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Attendance Trend */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle>Monthly Attendance Trend</CardTitle>
              <CardDescription>Attendance rate vs target over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="attendance"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.3}
                      name="Attendance"
                    />
                    <Line type="monotone" dataKey="target" stroke="#ef4444" strokeDasharray="5 5" name="Target" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Breakdown */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle>Weekly Breakdown</CardTitle>
              <CardDescription>Daily attendance status distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="present" fill="#10b981" name="Present" />
                    <Bar dataKey="absent" fill="#ef4444" name="Absent" />
                    <Bar dataKey="late" fill="#f59e0b" name="Late" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Class Performance & Student Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Class Performance */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle>Class Performance</CardTitle>
              <CardDescription>Attendance rate by class</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classPerformance.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={item.value} className="w-20" />
                      <span className="text-sm font-medium w-10 text-right">{item.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
              <CardDescription>Students with highest attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topPerformers.map((student, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                  >
                    <div>
                      <p className="font-medium text-sm text-slate-900 dark:text-white">{student.name}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-300">{student.class}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(student.trend)}
                      <Badge variant="default" className="text-xs">
                        {student.attendance}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Students Needing Attention */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle>Needs Attention</CardTitle>
              <CardDescription>Students with low attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lowPerformers.map((student, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                  >
                    <div>
                      <p className="font-medium text-sm text-slate-900 dark:text-white">{student.name}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-300">{student.class}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(student.trend)}
                      <Badge variant="destructive" className="text-xs">
                        {student.attendance}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <Card className="border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle>Attendance Trend Analysis</CardTitle>
            <CardDescription>Weekly attendance rate progression</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={3} dot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
