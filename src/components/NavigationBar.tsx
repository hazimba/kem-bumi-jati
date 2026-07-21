import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const NavigationBar = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-8">
        <Image
          src="https://img.magnific.com/premium-vector/kbj-creative-abstract-letter-initial-symbol-icon-vector-logo-design_1237311-4358.jpg?semt=ais_hybrid&w=740&q=80"
          alt="Kem Bumi Jati Logo"
          width={50}
          height={50}
          className="rounded-full"
        />

        <div>
          <h1 className="text-xl">Kem Bumi Jati</h1>
          <div>Since 1973</div>
        </div>
      </div>
      <div className="flex items-center gap-12">
        <div className="flex text-center items-center gap-4">
          <Link href="/">Home</Link>
          <Link href="/activity">Activity</Link>
          <Link href="/facility">Facility</Link>
          <Link href="/gallery">Gallery</Link>
        </div>
        <div className="flex items-center gap-4">
          <Button>Contact Us!</Button>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
export default NavigationBar;
