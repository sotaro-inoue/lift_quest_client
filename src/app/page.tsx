import { FunctionDescriptionCards } from "@/components/FunctionDescriptionCards";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center flex-col h-screen gap-4 px-4 sm:px-6 lg:px-10 space-y-6">
        <h1 className="font-mobobold text-7xl sm:text-7xl lg:text-9xl underline decoration-2 max-w-screen-md text-center">
          LiftQuest
        </h1>
        <h2 className="font-mobosemibold text-base sm:text-lg lg:text-2xl max-w-screen-sm text-center">
          トレーニングの世界を、一緒に冒険しよう。
        </h2>
      </div>

      <div className="flex items-center justify-center flex-col px-4 py-6 space-y-6 h-screen">
        <div>
          <h2 className="font-mobobold text-3xl sm:text-4xl lg:text-5xl text-center whitespace-nowrap px-4">
            LiftQuestでできること
          </h2>
        </div>
        <div className="w-full max-w-screen-xl h-full">
          <FunctionDescriptionCards />
        </div>
      </div>
    </div>
  );
}
