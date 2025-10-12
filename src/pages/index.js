"use client";

import { HomeTabs } from "@/components/homeTabs";
import { LoginRegistrationTabs } from "@/components/loginRegistrationTab";
import Cookies from "js-cookie";

export default function Home() {
  return Cookies.get("token") ? <HomeTabs /> : <LoginRegistrationTabs />;
}
