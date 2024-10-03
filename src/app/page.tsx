
import { AppList } from "@/components/apps-list";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <div className="h-screen flex flex-col m-auto max-w-screen-lg p-12">
      <Header />
      <AppList />
    </div>
  );
}
