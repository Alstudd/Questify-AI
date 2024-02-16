import SignInButton from "@/components/SignInButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/nextauth";
import Navbar from "@/components/main/Navbar";
import Hero from "@/components/main/Hero";
import Skills from "@/components/main/Skills";
import Encryption from "@/components/main/Encryption";
import Projects from "@/components/main/Projects";
import "./home.css";
import StarsCanvas from "@/components/main/StarBackground";
import Footer from "@/components/main/Footer";

export default async function Home() {
  const session = await getAuthSession();
  if (session?.user) {
    return redirect("/dashboard");
  }
  return (
    // <div>
    //   <Navbar />
    //   <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
    //   <Card className="w-[300px]">
    //     <CardHeader>
    //       <CardTitle>Welcome to Questify 🔥!</CardTitle>
    //       <CardDescription>
    //         Questify is a platform for creating questions using AI!. Get started by
    //         logging in below!
    //       </CardDescription>
    //     </CardHeader>
    //     <CardContent>
    //       <SignInButton text="Sign In with Google" />
    //     </CardContent>
    //   </Card>
    // </div>
    // </div>
    <div className="bg-[#030014] overflow-y-scroll overflow-x-hidden">
      <StarsCanvas />
      <Navbar />
      <main className="h-full w-full">
        <div className="flex flex-col gap-20">
          <Hero />
          <Skills />
          <Encryption />
          <Projects />
        </div>
      </main>
      <Footer />
    </div>
  );
}