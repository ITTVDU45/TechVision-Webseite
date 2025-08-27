import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export function BentoGrid({ className, children }) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 md:auto-rows-[28rem] md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  className,
  Icon,
  name,
  description,
  href,
  cta,
  background,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "group relative overflow-hidden rounded-xl bg-black/40 backdrop-blur-sm border border-white/10",
        className
      )}
    >
      <div className="relative h-full rounded-xl border border-white/10 p-6 hover:border-blue-500/50 transition-all duration-300">
        <GlowingEffect
          blur={20}
          borderWidth={2}
          spread={60}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-fit rounded-lg border border-white/20 bg-black/40 p-2">
              <Icon className="h-6 w-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
            </div>
            <h3 className="text-2xl font-semibold text-white group-hover:text-blue-100 transition-colors duration-300">{name}</h3>
          </div>
          <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{description}</p>
          <a
            href={href}
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors duration-300"
          >
            {cta}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </a>
        </div>

        {/* Hintergrund */}
        <div className="absolute inset-0 z-0">
          {background}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-violet-600/10 transition-opacity duration-300 group-hover:opacity-70" />
        </div>
      </div>
    </motion.div>
  );
} 