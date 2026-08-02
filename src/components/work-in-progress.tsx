import { Hammer } from "lucide-react";

interface WorkInProgressProps {
  title?: string;
}

const WorkInProgress = ({ title = "Section Under Construction" }: WorkInProgressProps) => {
  return (
    <div className="mx-auto my-10 flex min-h-[400px] w-11/12 max-w-7xl flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50/50 p-6 text-center transition-colors dark:border-neutral-800 dark:bg-neutral-900/40 md:w-full">
      {/* Icon Wrapper */}
      <div className="relative mb-4">
        <div className="absolute inset-0 animate-ping rounded-full bg-primary/20 dark:bg-primary/30" />
        <div className="relative rounded-full bg-primary/10 p-4 text-primary dark:bg-primary/20">
          <Hammer className="h-10 w-10" strokeWidth={1.5} />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">{title}</h3>

      {/* Description */}
      <p className="mt-2 max-w-[280px] text-sm text-neutral-500 dark:text-neutral-400">
        We&apos;re currently building the {title.toLowerCase()} module. Check back soon for updates!
      </p>

      {/* Loading Dots */}
      <div className="mt-6 flex gap-2">
        <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:0.2s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:0.4s]" />
      </div>
    </div>
  );
};

export default WorkInProgress;
