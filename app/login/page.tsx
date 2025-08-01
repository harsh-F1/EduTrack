"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { GraduationCap, User, Shield, Users, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (role: string) => {
    setLoading(true)
    setError("")

    // Simulate authentication
    const validCredentials = {
      admin: { username: "admin", password: "1234" },
      faculty: { username: "faculty", password: "4321" },
      student: { username: "student", password: "5678" },
    }

    const valid = validCredentials[role as keyof typeof validCredentials]

    if (credentials.username === valid.username && credentials.password === valid.password) {
      // Store user info in localStorage (in real app, use proper auth)
      localStorage.setItem("user", JSON.stringify({ role, username: credentials.username }))

      // Redirect based on role
      const redirectPath = role === "admin" ? "/admin" : role === "faculty" ? "/faculty" : "/dashboard"
      router.push(redirectPath)
    } else {
      setError("Invalid username or password")
    }

    setLoading(false)
  }

  const roleConfigs = {
    admin: {
      icon: <Shield className="w-5 h-5" />,
      title: "Admin Login",
      description: "Access administrative dashboard",
      color: "from-red-500 to-pink-600",
    },
    faculty: {
      icon: <User className="w-5 h-5" />,
      title: "Faculty Login",
      description: "Manage your classes and attendance",
      color: "from-blue-500 to-purple-600",
    },
    student: {
      icon: <Users className="w-5 h-5" />,
      title: "Student Login",
      description: "View your attendance records",
      color: "from-green-500 to-emerald-600",
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">EduTrack</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Welcome Back</h1>
          <p className="text-slate-600 dark:text-slate-300">Sign in to your account</p>
        </div>

        <Card className="border-slate-200 dark:border-slate-700">
          <CardHeader className="pb-4">
            <CardTitle className="text-center">Choose Your Role</CardTitle>
            <CardDescription className="text-center">Select your account type to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="faculty" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                {Object.entries(roleConfigs).map(([role, config]) => (
                  <TabsTrigger key={role} value={role} className="flex items-center gap-2">
                    {config.icon}
                    <span className="hidden sm:inline">{role.charAt(0).toUpperCase() + role.slice(1)}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(roleConfigs).map(([role, config]) => (
                <TabsContent key={role} value={role} className="space-y-4">
                  <div className="text-center mb-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${config.color} rounded-full flex items-center justify-center mx-auto mb-3`}
                    >
                      <div className="text-white text-xl">{config.icon}</div>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{config.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{config.description}</p>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        value={credentials.username}
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                        className="border-slate-300 dark:border-slate-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={credentials.password}
                          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                          className="border-slate-300 dark:border-slate-600 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleLogin(role)}
                      disabled={loading || !credentials.username || !credentials.password}
                      className={`w-full bg-gradient-to-r ${config.color} hover:opacity-90 transition-opacity`}
                    >
                      {loading ? "Signing in..." : `Sign in as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
                    </Button>
                  </div>

                  <div className="text-center text-sm text-slate-600 dark:text-slate-300">
                    Demo credentials: <br />
                    Username: <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">{role}</code> | Password:{" "}
                    <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">
                      {role === "admin" ? "1234" : role === "faculty" ? "4321" : "5678"}
                    </code>
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-600 hover:text-blue-500 font-medium">
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
