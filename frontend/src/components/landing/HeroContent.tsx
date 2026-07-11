// "use client";

// import { motion, type MotionProps } from "framer-motion";
// import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { useCMSContentByKey } from "@/features/admin/hooks/useCMS";

// import { useTranslations } from "next-intl";

// const fadeUp = (delay = 0): Pick<MotionProps, "initial" | "animate" | "transition"> => ({
//   initial: { opacity: 0, y: 28 },
//   animate: { opacity: 1, y: 0 },
//   transition: { duration: 0.6, delay, ease: "easeOut" },
// });


// export function HeroContent() {
//   const t = useTranslations("Hero");
//   const { data: heroContent } = useCMSContentByKey("hero");

//   const title = heroContent?.title ?? `${t("title1")}\n${t("title2")}\n${t("title3")}`;
//   const subtitle = heroContent?.subtitle ?? t("subtitle");
//   const description = heroContent?.description ?? ("description");
//   const buttonText = heroContent?.button_text ?? t("ctaJourney");
//   const buttonLink = heroContent?.button_link ?? "/classes";

//   return (
//     <div className="space-y-8 md:space-y-10">
//       {/* Badge */}
//       {/* <motion.div {...fadeUp(0)}>
//         <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/8 px-5 py-2.5 backdrop-blur">
//           <Sparkles className="size-4 text-primary" />
//           <span className="font-heading text-sm font-semibold text-primary">
//             {t("badgeText")}
//           </span>
//         </div>
//       </motion.div> */}

//       {/* Headline */}
//       <motion.h1
//         {...fadeUp(0.1)}
//         className="font-heading max-w-xl whitespace-pre-line text-5xl font-extrabold leading-[1.02] tracking-[-0.035em] text-foreground sm:text-6xl lg:text-7xl xl:text-[80px]"
//       >
//         {title}
//       </motion.h1>

//       {/* Subtitle */}
//       <motion.p
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.7, delay: 0.22 }}
//         className="max-w-lg text-lg leading-[1.85] text-muted-foreground"
//       >
//         {subtitle}
//       </motion.p>



//       {/* CTAs */}
//       <motion.div
//         initial={{ opacity: 0, y: 12 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, delay: 0.32 }}
//         className="flex flex-wrap items-center gap-4"
//       >
//         <Button
//           asChild
//           size="lg"
//           className="h-13 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-primary/90 hover:shadow-xl cursor-pointer"
//         >
//           <a href={buttonLink}>
//             {buttonText}
//             <ArrowRight className="ml-2 size-4" />
//           </a>
//         </Button>

//         <Button
//           variant="outline"
//           size="lg"
//           className="h-13 rounded-full border-border px-8 text-base font-semibold transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md cursor-pointer"
//         >
//           {t("ctaPrograms")}
//         </Button>
//       </motion.div>

//       {/* Trust bullets */}
//       {/* <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.7, delay: 0.44 }}
//         className="grid gap-3 pt-2"
//       >
//         {[
//           t("bullet1"),
//           t("bullet2"),
//           t("bullet3"),
//         ].map((item) => (
//           <div key={item} className="flex items-center gap-3">
//             <CheckCircle2 className="size-5 shrink-0 text-primary" />
//             <span className="text-sm font-medium text-foreground/80">{item}</span>
//           </div>
//         ))}
//       </motion.div> */}
//     </div>
//   );
// }

"use client";

import { motion, type MotionProps } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCMSContentByKey } from "@/features/admin/hooks/useCMS";
import { useTranslations } from "next-intl";

const fadeUp = (
  delay = 0
): Pick<MotionProps, "initial" | "animate" | "transition"> => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" },
});

export function HeroContent() {
  const t = useTranslations("Hero");
  const { data: heroContent } = useCMSContentByKey("hero");

  const title =
    heroContent?.title ??
    `${t("title1")}\n${t("title2")}\n${t("title3")}`;

  const subtitle = heroContent?.subtitle ?? t("subtitle");

  const buttonText = heroContent?.button_text ?? t("ctaJourney");
  const buttonLink = heroContent?.button_link ?? "/classes";

  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center justify-center text-center">
      {/* Heading */}
      <motion.h1
        {...fadeUp(0.1)}
        className="max-w-5xl whitespace-pre-line font-heading text-5xl font-black leading-tight tracking-[-0.04em] text-white drop-shadow-2xl sm:text-6xl lg:text-7xl xl:text-8xl"
      >
        {title}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        {...fadeUp(0.25)}
        className="mt-8 max-w-3xl text-lg leading-8 text-white/85 sm:text-xl"
      >
        {subtitle}
      </motion.p>

      {/* Buttons */}
      <motion.div
        {...fadeUp(0.4)}
        className="mt-12 flex flex-wrap items-center justify-center gap-5"
      >
        <Button
          asChild
          size="lg"
          className="h-14 rounded-full bg-primary px-9 text-base font-semibold text-primary-foreground shadow-xl transition-all duration-300 hover:scale-105 hover:bg-primary/90 cursor-pointer"
        >
          <a href={buttonLink}>
            {buttonText}
            <ArrowRight className="ml-2 size-4" />
          </a>
        </Button>

        <Button
          variant="secondary"
          size="lg"
          className="h-14 rounded-full bg-white/15 px-9 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/25 cursor-pointer"
        >
          {t("ctaPrograms")}
        </Button>
      </motion.div>
    </div>
  );
}