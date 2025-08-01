"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock, Users, Filter, Search, Download, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const classes = [
    { id: "all", name: "All Classes" },
    { id: "math101", name: "Mathematics 101" },
    { id: "physics201", name: "Physics 201" },
    { id: "chem301", name: "Chemistry 301" },
    { id: "bio101", name: "Biology 101" },
  ]

  const attendanceData = [
    {
      id: 1,
      studentName: "Alice Johnson",
      rollNo: "ST001",
      class: "Mathematics 101",
      date: "2024-01-26",
      time: "09:00 AM",
      status: "present",
      markedBy: "Dr. Sarah Johnson",
    },
    {
      id: 2,
      studentName: "Bob Smith",
      rollNo: "ST002",
      class: "Physics 201",
      date: "2024-01-26",
      time: "10:00 AM",
      status: "absent",
      markedBy: "Prof. Michael Chen",
    },
    {
      id: 3,
      studentName: "Carol Davis",
      rollNo: "ST003",
      class: "Chemistry 301",
      date: "2024-01-26",
      time: "11:00 AM",
      status: "late",
      markedBy: "Dr. Emily Davis",
    },
    {
      id: 4,
      studentName: "David Wilson",
      rollNo: "ST004",
      class: "Biology 101",
      date: "2024-01-26",
      time: "02:00 PM",
      status: "present",
      markedBy: "Prof. James Wilson",
    },
    {
      id: 5,
      studentName: "Eva Brown",
      rollNo: "ST005",
      class: "Mathematics 101",
      date: "2024-01-26",
      time: "09:00 AM",
      status: "present",
      markedBy: "Dr. Sarah Johnson",
    },
    {
      id: 6,
      studentName: "Frank Miller",
      rollNo: "ST006",
      class: "Physics 201",
      date: "2024-01-26",
      time: "10:00 AM",
      status: "absent",
      markedBy: "Prof. Michael Chen",
    },
  ]

  const filteredData = attendanceData.filter((record) => {
    const matchesSearch =
      record.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.class.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesClass = selectedClass === "all" || record.class === classes.find((c) => c.id === selectedClass)?.name
    const matchesStatus = selectedStatus === "all" || record.status === selectedStatus
    const matchesDate = format(selectedDate, "yyyy-MM-dd") === record.date

    return matchesSearch && matchesClass && matchesStatus && matchesDate
  })

  const stats = {
    totalRecords: filteredData.length,
    present: filteredData.filter((r) => r.status === "present").length,
    absent: filteredData.filter((r) => r.status === "absent").length,
    late: filteredData.filter((r) => r.status === "late").length,
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "absent":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "late":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      present: "default",
      absent: "destructive",
      late: "secondary",
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Attendance Records</h1>
            <p className="text-slate-600 dark:text-slate-300 mt-1">View and manage attendance data</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filter
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Total Records</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.totalRecords}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Present</p>
                  <p className="text-2xl font-bold text-green-600">{stats.present}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Absent</p>
                  <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Late</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.late}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Filter attendance records by date, class, and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Date Picker */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Class Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Class</label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
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
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Status</label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Search */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 opacity-0">Actions</label>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    setSelectedClass("all")
                    setSelectedStatus("all")
                    setSearchQuery("")
                    setSelectedDate(new Date())
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Table */}
        <Card className="border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle>Attendance Records</CardTitle>
            <CardDescription>
              Showing {filteredData.length} records for {format(selectedDate, "MMMM d, yyyy")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">Student</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">Roll No</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">Class</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">Time</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">
                      Marked By
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {filteredData.length > 0 ? (
                    filteredData.map((record) => (
                      <tr key={record.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="px-4 py-3 text-sm text-slate-900 dark:text-white">{record.studentName}</td>
                        <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{record.rollNo}</td>
                        <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{record.class}</td>
                        <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{record.time}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(record.status)}
                            {getStatusBadge(record.status)}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{record.markedBy}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">
                        No attendance records found for the selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
