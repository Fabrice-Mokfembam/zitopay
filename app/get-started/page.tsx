import { API_BASE_URL } from "@/constants/api";
import { redirect } from "next/navigation";

async function getMerchantRegistrationConfig(): Promise<{ allowSelfRegistration: boolean; applicationFormUrl: string } | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/public/v1/config/merchant-registration`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return null;
    }

    return (await res.json()) as { allowSelfRegistration: boolean; applicationFormUrl: string };
  } catch {
    return null;
  }
}

export default async function GetStartedPage() {
  const config = await getMerchantRegistrationConfig();

  if (config && config.allowSelfRegistration === false) {
    redirect("/apply");
  }

  redirect("/register");
}
