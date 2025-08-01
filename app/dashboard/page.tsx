"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, Calendar, TrendingUp, Clock, CheckCircle, XCircle, BarChart3, Filter } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const stats = {
    totalStudents: 150,
    presentToday: 142,
    absentToday: 8,
    attendanceRate: 94.7,
    weeklyAverage: 92.3,
    monthlyAverage: 89.8,
  }

  const weeklyData = [
    { day: "Mon", present: 145, absent: 5 },
    { day: "Tue", present: 138, absent: 12 },
    { day: "Wed", present: 142, absent: 8 },
    { day: "Thu", present: 140, absent: 10 },
    { day: "Fri", present: 135, absent: 15 },
  ]

  const monthlyTrend = [
    { month: "Jan", rate: 88 },
    { month: "Feb", rate: 92 },
    { month: "Mar", rate: 89 },
    { month: "Apr", rate: 94 },
    { month: "May", rate: 91 },
    { month: "Jun", rate: 95 },
  ]

  const classData = [
    { name: "Class A", value: 95, color: "#10b981" },
    { name: "Class B", value: 88, color: "#3b82f6" },
    { name: "Class C", value: 92, color: "#8b5cf6" },
    { name: "Class D", value: 85, color: "#f59e0b" },
  ]

  const recentActivity = [
    { student: "Alice Johnson", class: "Math 101", status: "Present", time: "09:00 AM", type: "checkin" },
    { student: "Bob Smith", class: "Physics 201", status: "Absent", time: "09:15 AM", type: "absent" },
    { student: "Carol Davis", class: "Chemistry 301", status: "Present", time: "10:00 AM", type: "checkin" },
    { student: "David Wilson", class: "Biology 101", status: "Late", time: "10:30 AM", type: "late" },
    { student: "Eva Brown", class: "Math 101", status: "Present", time: "11:00 AM", type: "checkin" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Welcome back, {user?.username || "User"}!
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-1">Here's your attendance overview for today</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600">
              <Calendar className="w-4 h-4 mr-2" />
              Take Attendance
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Total Students</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.totalStudents}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Present Today</p>
                  <p className="text-2xl font-bold text-green-600">{stats.presentToday}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Absent Today</p>
                  <p className="text-2xl font-bold text-red-600">{stats.absentToday}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Attendance Rate</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.attendanceRate}%</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Attendance */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Weekly Attendance
              </CardTitle>
              <CardDescription>Daily attendance for this week</CardDescription>
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
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trend */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Monthly Trend
              </CardTitle>
              <CardDescription>Attendance rate over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Class Performance & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Class Performance */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle>Class Performance</CardTitle>
              <CardDescription>Attendance rate by class</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={item.value} className="w-20" />
                      <span className="text-sm font-medium">{item.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-2 border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest attendance updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.type === "checkin"
                            ? "bg-green-500"
                            : activity.type === "absent"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                        }`}
                      />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{activity.student}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{activity.class}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          activity.status === "Present"
                            ? "default"
                            : activity.status === "Absent"
                              ? "destructive"
                              : "secondary"
                        }
                        className="mb-1"
                      >
                        {activity.status}
                      </Badge>
                      <p className="text-sm text-slate-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
