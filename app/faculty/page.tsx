"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Calendar, Clock, CheckCircle, XCircle, UserCheck, Search, Download, Plus } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function FacultyPage() {
  const [selectedClass, setSelectedClass] = useState("math101")
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split("T")[0])
  const [searchQuery, setSearchQuery] = useState("")

  const classes = [
    { id: "math101", name: "Mathematics 101", students: 28, schedule: "Mon, Wed, Fri 9:00 AM" },
    { id: "math201", name: "Advanced Mathematics", students: 22, schedule: "Tue, Thu 10:00 AM" },
    { id: "calc101", name: "Calculus I", students: 25, schedule: "Mon, Wed 2:00 PM" },
  ]

  const [students, setStudents] = useState([
    { id: 1, name: "Alice Johnson", rollNo: "MT001", status: "present", lastAttendance: "2024-01-25" },
    { id: 2, name: "Bob Smith", rollNo: "MT002", status: "present", lastAttendance: "2024-01-25" },
    { id: 3, name: "Carol Davis", rollNo: "MT003", status: "absent", lastAttendance: "2024-01-24" },
    { id: 4, name: "David Wilson", rollNo: "MT004", status: "present", lastAttendance: "2024-01-25" },
    { id: 5, name: "Eva Brown", rollNo: "MT005", status: "late", lastAttendance: "2024-01-25" },
    { id: 6, name: "Frank Miller", rollNo: "MT006", status: "present", lastAttendance: "2024-01-25" },
    { id: 7, name: "Grace Lee", rollNo: "MT007", status: "absent", lastAttendance: "2024-01-23" },
    { id: 8, name: "Henry Taylor", rollNo: "MT008", status: "present", lastAttendance: "2024-01-25" },
  ])

  const stats = {
    totalStudents: students.length,
    presentToday: students.filter((s) => s.status === "present").length,
    absentToday: students.filter((s) => s.status === "absent").length,
    lateToday: students.filter((s) => s.status === "late").length,
    attendanceRate: Math.round(
      (students.filter((s) => s.status === "present" || s.status === "late").length / students.length) * 100,
    ),
  }

  const toggleAttendance = (studentId: number, newStatus: string) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, status: newStatus, lastAttendance: attendanceDate } : student,
      ),
    )
  }

  const markAllPresent = () => {
    setStudents((prev) =>
      prev.map((student) => ({
        ...student,
        status: "present",
        lastAttendance: attendanceDate,
      })),
    )
  }

  const markAllAbsent = () => {
    setStudents((prev) =>
      prev.map((student) => ({
        ...student,
        status: "absent",
        lastAttendance: attendanceDate,
      })),
    )
  }

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const recentClasses = [
    { name: "Mathematics 101", date: "2024-01-25", time: "9:00 AM", attendance: "26/28", rate: 93 },
    { name: "Advanced Mathematics", date: "2024-01-24", time: "10:00 AM", attendance: "20/22", rate: 91 },
    { name: "Calculus I", date: "2024-01-24", time: "2:00 PM", attendance: "23/25", rate: 92 },
    { name: "Mathematics 101", date: "2024-01-23", time: "9:00 AM", attendance: "27/28", rate: 96 },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Faculty Dashboard</h1>
            <p className="text-slate-600 dark:text-slate-300 mt-1">Manage attendance for your classes</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600">
              <Plus className="w-4 h-4 mr-2" />
              New Session
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Total Students</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.totalStudents}</p>
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
                  <p className="text-2xl font-bold text-green-600">{stats.presentToday}</p>
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
                  <p className="text-2xl font-bold text-red-600">{stats.absentToday}</p>
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
                  <p className="text-2xl font-bold text-yellow-600">{stats.lateToday}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Rate</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.attendanceRate}%</p>
                </div>
                <UserCheck className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Attendance Taking */}
          <div className="lg:col-span-2">
            <Card className="border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5" />
                  Take Attendance
                </CardTitle>
                <CardDescription>Mark harsh for your students</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Class and Date Selection */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                      Select Class
                    </label>
                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((cls) => (
                          <SelectItem key={cls.id} value={cls.id}>
                            {cls.name} ({cls.students} students)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Date</label>
                    <Input type="date" value={attendanceDate} onChange={(e) => setAttendanceDate(e.target.value)} />
                  </div>
                </div>

                {/* Search and Bulk Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Search students..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={markAllPresent}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      All Present
                    </Button>
                    <Button variant="outline" size="sm" onClick={markAllAbsent}>
                      <XCircle className="w-4 h-4 mr-2" />
                      All Absent
                    </Button>
                  </div>
                </div>

                {/* Student List */}
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-800">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">
                          Student
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">
                          Roll No
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      {filteredStudents.map((student) => (
                        <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="px-4 py-3 text-sm text-slate-900 dark:text-white">{student.name}</td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{student.rollNo}</td>
                          <td className="px-4 py-3">
                            <Badge
                              variant={
                                student.status === "present"
                                  ? "default"
                                  : student.status === "absent"
                                    ? "destructive"
                                    : "secondary"
                              }
                            >
                              {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <Button
                                variant={student.status === "present" ? "default" : "outline"}
                                size="sm"
                                onClick={() => toggleAttendance(student.id, "present")}
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button
                                variant={student.status === "absent" ? "destructive" : "outline"}
                                size="sm"
                                onClick={() => toggleAttendance(student.id, "absent")}
                              >
                                <XCircle className="w-4 h-4" />
                              </Button>
                              <Button
                                variant={student.status === "late" ? "secondary" : "outline"}
                                size="sm"
                                onClick={() => toggleAttendance(student.id, "late")}
                              >
                                <Clock className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-600">Save Attendance</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Classes */}
          <div>
            <Card className="border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Recent Classes
                </CardTitle>
                <CardDescription>Your recent attendance sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentClasses.map((cls, index) => (
                    <div key={index} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-slate-900 dark:text-white text-sm">{cls.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {cls.rate}%
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mb-1">
                        {cls.date} at {cls.time}
                      </p>
                      <p className="text-xs text-slate-500">Attendance: {cls.attendance}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
