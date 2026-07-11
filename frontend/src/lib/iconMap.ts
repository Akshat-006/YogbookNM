/**
 * Maps icon name strings (as stored in CMS) to Lucide React components.
 * Used by Benefits and other CMS-driven sections.
 */
import {
  Brain,
  Heart,
  Moon,
  Activity,
  Sparkles,
  Leaf,
  Star,
  Shield,
  Zap,
  Sun,
  Wind,
  Smile,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Brain,
  Heart,
  Moon,
  Activity,
  Sparkles,
  Leaf,
  Star,
  Shield,
  Zap,
  Sun,
  Wind,
  Smile,
};

export function getIcon(name: string | null | undefined): LucideIcon {
  if (!name) return Sparkles;
  return iconMap[name] ?? Sparkles;
}
