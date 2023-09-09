import NavigationSidebar from "@/components/navigations/navigation-sidebar";
import { PropsWithChildren } from "react";

export default async function MailLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NavigationSidebar /> 
      </div>
      <main className="md:pl-[72px] h-full">
        {children}
      </main>
    </div>
  )
}