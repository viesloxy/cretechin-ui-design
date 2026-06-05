// Types for Event Detail page (extends events list types)

import type { EventItem, EventSpeaker } from "../types";

export type { EventSpeaker };

export interface AgendaItem {
  time: string;
  title: string;
  description?: string;
}

export interface EventDetail extends EventItem {
  platform: string;
  agenda?: AgendaItem[];
  requirements?: string[];
  targetAudience?: string[];
  benefits?: string[];
  rating?: number;
  totalReviews?: number;
  registrationDeadline?: string;
}
