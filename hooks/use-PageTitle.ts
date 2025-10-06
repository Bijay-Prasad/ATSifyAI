import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export function usePageTitle(title: string) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title, router, pathname]);
}
