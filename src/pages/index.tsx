import Image from "next/image";
import { Inter } from "next/font/google";
import { SignedOut, UserButton } from "@clerk/nextjs";
import { DashboardTemplate } from "@/components/templates/dashboard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <DashboardTemplate/>
    </div>
  );
}
