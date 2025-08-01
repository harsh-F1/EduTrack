"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, ChevronLeft, ChevronRight, Users, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from "date-fns"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const [selectedClass, setSelectedClass] = useState("all")
  const [viewMode, setViewMode] = useState("month")

  const classes = [
    { id: "all", name: "All Classes" },
    { id: "math101", name: "Mathematics 101" },
    { id: "physics201", name: "Physics 201" },
    { id: "chem301", name: "Chemistry 301" },
    { id: "bio101", name: "Biology 101" },
  ]

  // Mock attendance data for calendar
  const attendanceData = {
    "2024-01-26": { present: 142, absent: 8, late: 3, rate: 94.7 },
    "2024-01-25": { present: 138, absent: 12, late: 3, rate: 92.0 },
    "2024-01-24": { present: 145, absent: 5, late: 3, rate: 96.7 },
    "2024-01-23": { present: 140, absent: 10, late: 3, rate: 93.3 },
    "2024-01-22": { present: 135, absent: 15, late: 3, rate: 90.0 },
    "2024-01-19": { present: 144, absent: 6, late: 3, rate: 96.0 },
    "2024-01-18": { present: 139, absent: 11, late: 3, rate: 92.7 },
    "2024-01-17": { present: 141, absent: 9, late: 3, rate: 94.0 },
    "2024-01-16": { present: 137, absent: 13, late: 3, rate: 91.3 },
    "2024-01-15": { present: 143, absent: 7, late: 3, rate: 95.3 },
  }

  const getAttendanceForDate = (date: Date) => {
    const dateKey = format(date, "yyyy-MM-dd")
    return attendanceData[dateKey as keyof typeof attendanceData]
  }

  const getAttendanceColor = (rate: number) => {
    if (rate >= 95) return "bg-green-500"
    if (rate >= 90) return "bg-blue-500"
    if (rate >= 85) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getDaysInMonth = () => {
    const start = startOfMonth(currentMonth)
    const end = endOfMonth(currentMonth)
    return eachDayOfInterval({ start, end })
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth)
    if (direction === "prev") {
      newMonth.setMonth(newMonth.getMonth() - 1)
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1)
    }
    setCurrentMonth(newMonth)
  }

  const selectedDateData = selectedDate ? getAttendanceForDate(selectedDate) : null

  const monthlyStats = {
    totalDays: Object.keys(attendanceData).length,
    averageRate:
      Object.values(attendanceData).reduce((sum, day) => sum + day.rate, 0) / Object.keys(attendanceData).length,
    bestDay: Object.entries(attendanceData).reduce(
      (best, [date, data]) => (data.rate > best.rate ? { date, rate: data.rate } : best),
      { date: "", rate: 0 },
    ),
    worstDay: Object.entries(attendanceData).reduce(
      (worst, [date, data]) => (data.rate < worst.rate ? { date, rate: data.rate } : worst),
      { date: "", rate: 100 },
    ),
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Attendance Calendar</h1>
            <p className="text-slate-600 dark:text-slate-300 mt-1">Monthly view of attendance patterns and trends</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={viewMode} onValueChange={setViewMode}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Monthly Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Days Tracked</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{monthlyStats.totalDays}</p>
                </div>
                <CalendarIcon className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Average Rate</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {monthlyStats.averageRate.toFixed(1)}%
                  </p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Best Day</p>
                  <p className="text-2xl font-bold text-green-600">{monthlyStats.bestDay.rate.toFixed(1)}%</p>
                  <p className="text-xs text-slate-500">{format(new Date(monthlyStats.bestDay.date), "MMM d")}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Worst Day</p>
                  <p className="text-2xl font-bold text-red-600">{monthlyStats.worstDay.rate.toFixed(1)}%</p>
                  <p className="text-xs text-slate-500">{format(new Date(monthlyStats.worstDay.date), "MMM d")}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <Card className="border-slate-200 dark:border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5" />
                    {format(currentMonth, "MMMM yyyy")}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setCurrentMonth(new Date())}>
                      Today
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>Click on any date to view detailed attendance information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-slate-600 dark:text-slate-300">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {getDaysInMonth().map((date) => {
                    const attendanceInfo = getAttendanceForDate(date)
                    const isSelected = selectedDate && isSameDay(date, selectedDate)
                    const isCurrentDay = isToday(date)

                    return (
                      <button
                        key={date.toISOString()}
                        onClick={() => setSelectedDate(date)}
                        className={`
                          relative p-2 h-16 text-sm border rounded-lg transition-all hover:bg-slate-50 dark:hover:bg-slate-800
                          ${isSelected ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20" : ""}
                          ${isCurrentDay ? "border-blue-500" : "border-slate-200 dark:border-slate-700"}
                        `}
                      >
                        <div className="flex flex-col items-center justify-center h-full">
                          <span
                            className={`font-medium ${isCurrentDay ? "text-blue-600" : "text-slate-900 dark:text-white"}`}
                          >
                            {format(date, "d")}
                          </span>
                          {attendanceInfo && (
                            <div className="flex items-center gap-1 mt-1">
                              <div className={`w-2 h-2 rounded-full ${getAttendanceColor(attendanceInfo.rate)}`} />
                              <span className="text-xs text-slate-600 dark:text-slate-300">
                                {attendanceInfo.rate.toFixed(0)}%
                              </span>
                            </div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">95%+</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">90-94%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">85-89%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">{"<85%"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Selected Date Details */}
          <div>
            <Card className="border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a Date"}
                </CardTitle>
                <CardDescription>
                  {selectedDate && isToday(selectedDate) ? "Today's" : "Daily"} attendance details
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedDateData ? (
                  <div className="space-y-4">
                    {/* Overall Rate */}
                    <div className="text-center p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">Attendance Rate</p>
                      <p className="text-3xl font-bold text-slate-900 dark:text-white">
                        {selectedDateData.rate.toFixed(1)}%
                      </p>
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-800 dark:text-green-200">Present</span>
                        </div>
                        <Badge variant="default" className="bg-green-600">
                          {selectedDateData.present}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-red-600" />
                          <span className="font-medium text-red-800 dark:text-red-200">Absent</span>
                        </div>
                        <Badge variant="destructive">{selectedDateData.absent}</Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-yellow-600" />
                          <span className="font-medium text-yellow-800 dark:text-yellow-200">Late</span>
                        </div>
                        <Badge variant="secondary" className="bg-yellow-600 text-white">
                          {selectedDateData.late}
                        </Badge>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-900 dark:text-white">Total Students</span>
                        <span className="font-bold text-slate-900 dark:text-white">
                          {selectedDateData.present + selectedDateData.absent + selectedDateData.late}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CalendarIcon className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <p className="text-slate-500 dark:text-slate-400">
                      {selectedDate
                        ? "No attendance data available for this date"
                        : "Select a date to view attendance details"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
