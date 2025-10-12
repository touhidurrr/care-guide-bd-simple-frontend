"use client";

import { HomeTabs } from "@/components/homeTabs";
import { LoginRegistrationTabs } from "@/components/loginRegistrationTab";
import Cookies from "js-cookie";

export default function Home() {
  const isLoggedIn = !!Cookies.get("token");

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      {isLoggedIn ? <HomeTabs /> : <LoginRegistrationTabs />}
    </div>
  );
}
