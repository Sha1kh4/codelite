import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Brain, Rocket, Target, Users } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Brain className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold text-primary">CareerFit</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-3">
          <Link href={'/auth/login'} className=" ">
            <Button variant="outline" className="hover:bg-primary/90">Login</Button>
          </Link>
          <Link href={'/auth/signup'} className="">
            <Button variant="outline" className="bg-primary text-white border-white hover:bg-primary/90">Signup</Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Discover Your Perfect Career Path with AI
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                  CareerFit uses advanced AI to analyze your skills, interests, and personality to guide you towards your ideal career.
                </p>
              </div>
              <Link href={'/auth/signup'} className="mt-20">
                <Button className="bg-white text-primary text-xl hover:bg-gray-100" size={"lg"}>Signup Now <ArrowRight /></Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">How CareerFit Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Personalized Assessment</h3>
                <p className="text-muted-foreground">Take our AI-powered assessment to uncover your unique strengths and interests.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Brain className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">AI Analysis</h3>
                <p className="text-muted-foreground">Our advanced AI analyzes your results to identify suitable career paths.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Target className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Tailored Recommendations</h3>
                <p className="text-muted-foreground">Receive personalized career recommendations and actionable insights.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Launch Your Dream Career Today
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Don&apos;t let uncertainty hold you back. With CareerFit, you&apos;ll have the guidance and confidence to pursue a fulfilling career that aligns with your passions and strengths.
                </p>
                <Button className="bg-primary text-white hover:bg-primary/90">Start Your Journey</Button>
              </div>
              <div className="flex items-center justify-center">
                <Rocket className="h-64 w-64 text-primary" />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Ready to Find Your Perfect Career?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of professionals who have discovered their ideal career path with CareerFit.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-white text-gray-900"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button className="bg-white text-primary hover:bg-gray-100" type="submit">
                    Get Started
                  </Button>
                </form>
                <p className="text-xs text-gray-200">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2024 CareerFit. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}