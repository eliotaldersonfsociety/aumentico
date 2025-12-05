import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FloatingIconsBackground } from "@/components/FloatingIconsBackground"
import { Suspense } from "react"
import ResetPasswordForm from "@/components/ResetPasswordForm"

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[oklch(0.145_0_0)]">
      <FloatingIconsBackground />
      <div className="min-h-screen flex flex-col">
        <Header />
        <Suspense fallback={
          <div className="flex-1 flex items-center justify-center px-4 pt-28">
            <div className="text-white">Loading...</div>
          </div>
        }>
          <ResetPasswordForm />
        </Suspense>
        <Footer />
      </div>
    </div>
  )
}