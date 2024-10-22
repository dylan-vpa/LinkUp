import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="container mx-auto py-6 flex justify-between items-center">
        {" "}
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Image src="/favicon.png" alt="logo" height={32} width={32} />
          Link Up
        </h1>
        <nav>
          <Link href="/login">
            <Button variant="outline" className="mr-2">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button>Sign Up</Button>
          </Link>
        </nav>
      </header>
      <main className="container mx-auto mt-20 text-center">
        <h2 className="text-5xl font-bold mb-6">Boost Your Productivity</h2>
        <p className="text-xl mb-8">
          TaskMaster Pro helps you manage tasks, track time, and achieve your
          goals.
        </p>
        <Link href="/signup">
          <Button size="lg">Get Started for Free</Button>
        </Link>
      </main>
    </div>
  );
}
