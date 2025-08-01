"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, ArrowLeft, Search, HelpCircle } from "lucide-react"
import Link from "next/link"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-slate-200 dark:border-slate-700">
        <CardContent className="p-8 text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="text-8xl font-bold text-slate-300 dark:text-slate-600 mb-4">404</div>
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Page Not Found</h1>
          <p className="text-slate-600 dark:text-slate-300 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the
            wrong URL.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link href="/" className="w-full">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>

            <Button
              variant="outline"
              className="w-full border-slate-300 dark:border-slate-600 bg-transparent"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>

          {/* Help Section */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 mb-3">
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm">Need help?</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 text-sm">
              <Link href="/contact" className="text-blue-600 hover:text-blue-500">
                Contact Support
              </Link>
              <span className="hidden sm:inline text-slate-400">•</span>
              <Link href="/help" className="text-blue-600 hover:text-blue-500">
                Help Center
              </Link>
              <span className="hidden sm:inline text-slate-400">•</span>
              <Link href="/status" className="text-blue-600 hover:text-blue-500">
                System Status
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
