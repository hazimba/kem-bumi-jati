import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAdminGuard() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("admin_auth")) {
      router.push("/login");
      return;
    }
    setReady(true);
  }, [router]);

  return ready;
}
