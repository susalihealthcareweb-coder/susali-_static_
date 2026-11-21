import {
  UsersRound, HeartHandshake, CalendarCheck2, Building2, ClipboardCheck, RefreshCcw, HeartPulse, Stethoscope,
  GitPullRequestArrow, ScanLine, Tent, Heart, Eye, Link2, Infinity as InfinityIcon, ShieldCheck, TrendingUp,
} from "lucide-react";

/** Maps the icon names used in the live site's content to lucide icons. */
export const iconMap = {
  UsersRound, HeartHandshake, CalendarCheck2, Building2, ClipboardCheck, RefreshCcw, HeartPulse, Stethoscope,
  GitPullRequestArrow, ScanLine, Tent,
} as const;
export type IconName = keyof typeof iconMap;
export const getIcon = (n: string) => iconMap[n as IconName] ?? HeartPulse;

/** Icons for About → Our Core Values (in order). */
export const valueIcons = [Heart, Eye, Link2, InfinityIcon, ShieldCheck, TrendingUp];
