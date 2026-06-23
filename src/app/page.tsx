import GlowHorizonDemo from "@/components/demo";
import GradientMenu from "@/components/ui/gradient-menu";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050507] relative">
      <GradientMenu className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-max" />
      <GlowHorizonDemo />
    </main>
  );
}
