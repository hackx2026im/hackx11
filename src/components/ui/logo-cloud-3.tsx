import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";

type Logo = {
  src: string;
  alt: string;
  href?: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        "overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        className
      )}
    >
      <InfiniteSlider gap={72} reverse duration={60} durationOnHover={110}>
        {logos.map((logo) => {
          const img = (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt={logo.alt}
              className="pointer-events-none max-h-full max-w-full select-none object-contain"
              height={logo.height}
              loading="lazy"
              src={logo.src}
              width={logo.width}
            />
          );
          const box =
            "flex h-20 w-40 shrink-0 items-center justify-center md:h-24 md:w-56";
          return logo.href ? (
            <a
              key={`logo-${logo.alt}`}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={logo.alt}
              className={cn(box, "transition-transform duration-300 hover:scale-105")}
            >
              {img}
            </a>
          ) : (
            <div key={`logo-${logo.alt}`} className={box}>
              {img}
            </div>
          );
        })}
      </InfiniteSlider>
    </div>
  );
}
