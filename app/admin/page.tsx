"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  UserPlus,
  GraduationCap,
  Building,
  BarChart3,
  Settings,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const stats = {
    totalStudents: 1250,
    totalFaculty: 85,
    totalClasses: 45,
    activeUsers: 1180,
    attendanceRate: 92.5,
    systemUptime: 99.9,
  }

  const facultyData = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.j@school.edu",
      department: "Mathematics",
      classes: 4,
      status: "Active",
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      email: "michael.c@school.edu",
      department: "Physics",
      classes: 3,
      status: "Active",
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      email: "emily.d@school.edu",
      department: "Chemistry",
      classes: 5,
      status: "Active",
    },
    {
      id: 4,
      name: "Prof. James Wilson",
      email: "james.w@school.edu",
      department: "Biology",
      classes: 3,
      status: "Inactive",
    },
  ]

  const studentData = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.j@student.edu",
      class: "Grade 10A",
      attendance: 95,
      status: "Active",
    },
    { id: 2, name: "Bob Smith", email: "bob.s@student.edu", class: "Grade 10B", attendance: 88, status: "Active" },
    { id: 3, name: "Carol Davis", email: "carol.d@student.edu", class: "Grade 11A", attendance: 92, status: "Active" },
    {
      id: 4,
      name: "David Wilson",
      email: "david.w@student.edu",
      class: "Grade 11B",
      attendance: 78,
      status: "Warning",
    },
  ]

  const classData = [
    {
      id: 1,
      name: "Mathematics 101",
      teacher: "Dr. Sarah Johnson",
      students: 28,
      schedule: "Mon, Wed, Fri 9:00 AM",
      attendance: 94,
    },
    {
      id: 2,
      name: "Physics 201",
      teacher: "Prof. Michael Chen",
      students: 25,
      schedule: "Tue, Thu 10:00 AM",
      attendance: 89,
    },
    {
      id: 3,
      name: "Chemistry 301",
      teacher: "Dr. Emily Davis",
      students: 22,
      schedule: "Mon, Wed 2:00 PM",
      attendance: 96,
    },
    {
      id: 4,
      name: "Biology 101",
      teacher: "Prof. James Wilson",
      students: 30,
      schedule: "Tue, Thu, Fri 11:00 AM",
      attendance: 85,
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-slate-600 dark:text-slate-300 mt-1">Manage your institution's attendance system</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600">
              <Settings className="w-4 h-4 mr-2" />
              System Settings
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Students</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{stats.totalStudents}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Faculty</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{stats.totalFaculty}</p>
                </div>
                <GraduationCap className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Classes</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{stats.totalClasses}</p>
                </div>
                <Building className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Active Users</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{stats.activeUsers}</p>
                </div>
                <UserPlus className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Attendance</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{stats.attendanceRate}%</p>
                </div>
                <BarChart3 className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Uptime</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{stats.systemUptime}%</p>
                </div>
                <Settings className="w-8 h-8 text-teal-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Card className="border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle>System Management</CardTitle>
            <CardDescription>Manage users, classes, and system settings</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="faculty" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="faculty">Faculty Management</TabsTrigger>
                <TabsTrigger value="students">Student Management</TabsTrigger>
                <TabsTrigger value="classes">Class Management</TabsTrigger>
              </TabsList>

              {/* Faculty Management */}
              <TabsContent value="faculty" className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        placeholder="Search faculty..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-green-500 to-emerald-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Faculty
                  </Button>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-800">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">
                          Email
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">
                          Department
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">
                          Classes
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
                      {facultyData.map((faculty) => (
                        <tr key={faculty.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="px-4 py-3 text-sm text-slate-900 dark:text-white">{faculty.name}</td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{faculty.email}</td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{faculty.department}</td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{faculty.classes}</td>
                          <td className="px-4 py-3">
                            <Badge variant={faculty.status === "Active" ? "default" : "secondary"}>
                              {faculty.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              {/* Student Management */}
              <TabsContent value="students" className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        placeholder="Search students..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Student
                  </Button>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-800">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">
                          Email
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">
                          Class
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">
                          Attendance
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
                      {studentData.map((student) => (
                        <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="px-4 py-3 text-sm text-slate-900 dark:text-white">{student.name}</td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{student.email}</td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{student.class}</td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                            {student.attendance}%
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              variant={
                                student.status === "Active"
                                  ? "default"
                                  : student.status === "Warning"
                                    ? "destructive"
                                    : "secondary"
                              }
                            >
                              {student.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              {/* Class Management */}
              <TabsContent value="classes" className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        placeholder="Search classes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Class
                  </Button>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-800">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">
                          Class Name
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">
                          Teacher
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">
                          Students
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">
                          Schedule
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">
                          Attendance
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      {classData.map((classItem) => (
                        <tr key={classItem.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="px-4 py-3 text-sm text-slate-900 dark:text-white">{classItem.name}</td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{classItem.teacher}</td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{classItem.students}</td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{classItem.schedule}</td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                            {classItem.attendance}%
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
