"use client";

import { HomeTabs } from "@/components/homeTabs";
import { LoginRegistrationTabs } from "@/components/loginRegistrationTab";

export default function Home() {
  return false ? <HomeTabs /> : <LoginRegistrationTabs />;
}
