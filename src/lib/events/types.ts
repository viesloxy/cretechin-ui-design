// Event types
export type EventType =
  | "webinar"
  | "workshop"
  | "talkshow"
  | "conference"
  | "meetup"
  | "networking";

export type EventStatus =
  | "draft"
  | "upcoming"
  | "ongoing"
  | "finished"
  | "archived";

export type LocationType = "online" | "offline";

export type OnlinePlatform = "zoom" | "google_meet" | "teams" | "other";

export interface EventSpeaker {
  id: string;
  name: string;
  title?: string;
  bio?: string;
  avatar?: {
    url: string;
    width: number;
    height: number;
  };
  linkedinUrl?: string;
  order: number;
}

export interface EventLocation {
  type: LocationType;
  // Online
  platform?: OnlinePlatform;
  meetingUrl?: string;
  meetingId?: string;
  passcode?: string;
  // Offline
  venueName?: string;
  address?: string;
  city?: string;
  mapsUrl?: string;
}

export interface EventEarlyBird {
  enabled: boolean;
  price: number;
  validUntil: string;
}

export interface EventBanner {
  url: string;
  width: number;
  height: number;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  type: EventType;
  status: EventStatus;

  // Schedule
  startDate: string;
  endDate: string;
  timezone: string;

  // Location
  location: EventLocation;

  // Speakers
  speakers: EventSpeaker[];
  topics: string[];

  // Pricing
  price: number;
  isFree: boolean;
  earlyBird: EventEarlyBird | null;

  // Capacity
  capacity: number;
  registeredCount: number;

  // Media
  banner: EventBanner | null;

  // Settings
  featured: boolean;
  allowRegistration: boolean;
  sendReminder: boolean;
  recordEvent: boolean;
  autoCloseRegistration: boolean;

  // Stats
  viewCount: number;
  attendanceRate: number;
  rating: number;
  reviewCount: number;

  // Timestamps
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export type EventSortBy =
  | "nearest"
  | "farthest"
  | "newest"
  | "title_asc"
  | "capacity_low"
  | "capacity_high";

export interface EventFilter {
  search: string;
  type: EventType | "all";
  status: EventStatus | "all";
  locationType: LocationType | "all";
  sortBy: EventSortBy;
  page: number;
  perPage: number;
}

export interface EventStats {
  total: number;
  upcoming: number;
  ongoing: number;
  finished: number;
  draft: number;
}

export interface PaginationResult<T> {
  data: T[];
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
}
