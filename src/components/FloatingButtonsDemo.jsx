import { Mic, Globe } from "lucide-react";
import FloatingActionButton from "./FloatingActionButton";
import ScrollToTopButton from "./ScrollToTopButton";

export default function FloatingButtonsDemo() {
  return (
    <>
      <FloatingActionButton
        icon={Mic}
        label="Open microphone"
        color="from-pink-500 to-red-500"
        position="bottom-left"
        onClick={() => alert("Mic clicked!")}
      />
      <FloatingActionButton
        icon={Globe}
        label="Change language"
        color="from-blue-500 to-purple-500"
        position="bottom-right"
        onClick={() => alert("Globe clicked!")}
      />
      <ScrollToTopButton />
    </>
  );
} 