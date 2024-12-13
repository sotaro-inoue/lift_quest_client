import { FunctionDescriptionCard1, FunctionDescriptionCard2, FunctionDescriptionCard3 } from "@/components/ui/FunctionDescriptionCard";

export default function Home() {
  return (
    <div>
      <main>
        <div className="flex items-center justify-center flex-col h-screen gap-4 p-7 space-y-5">
          <h1 className="font-mobobold text-9xl">LiftQuest</h1>
          <h2 className="font-mobosemibold text-2xl">トレーニングの世界を、一緒に冒険しよう。</h2>
        </div>
        <div className="flex items-center justify-center flex-col h-screen gap-4 p-6 space-y-4">
          <div>
            <h2 className="font-mobobold text-5xl">LiftQuestでできること</h2>
          </div>
          <div className="flex flex-row gap-5 size-full p-10">
            <FunctionDescriptionCard1 />
            <FunctionDescriptionCard2 />
            <FunctionDescriptionCard3 />
          </div>
        </div>
      </main>
      <footer>
      </footer>
    </div>
  );
}
