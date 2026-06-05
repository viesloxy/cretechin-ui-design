// Event Types for Events Page

import type { EventTab } from "./TabNavigation";

export type { EventTab } from "./TabNavigation";

export type EventCategory =
  | "all"
  | "webinar"
  | "workshop"
  | "meetup"
  | "conference"
  | "networking";
export type EventSort = "soonest" | "latest" | "popular";
export type EventType =
  | "webinar"
  | "workshop"
  | "meetup"
  | "conference"
  | "networking";
export type EventStatus = "upcoming" | "live" | "completed" | "cancelled";
export type EventLevel = "beginner" | "intermediate" | "advanced";

export interface EventSpeaker {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar: string;
  bio?: string;
  linkedin?: string;
  twitter?: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  type: EventType;
  banner: string;
  thumbnail: string;
  date: string; // ISO date
  dateLabel: string; // human readable
  timeStart: string;
  timeEnd: string;
  timezone: string;
  speakers: EventSpeaker[];
  isRegistered: boolean;
  registrationUrl?: string;
  roomUrl?: string;
  accessCode?: string;
  recordingUrl?: string;
  recordingAvailableAt?: string;
  maxParticipants?: number;
  currentParticipants?: number;
  price: number;
  priceDisplay: string;
  status: EventStatus;
  category: string;
  tags: string[];
  level?: EventLevel;
  isFeatured?: boolean;
  viewCount: number;
}

export interface EventFilters {
  tab: EventTab;
  category: EventCategory;
  search: string;
  sort: EventSort;
}

export interface EventCardProps {
  event: EventItem;
  tab: EventTab;
  onViewDetail: (eventId: string) => void;
  onJoinRoom?: (eventId: string) => void;
  onWatchRecording?: (eventId: string) => void;
}

export interface TabNavigationProps {
  activeTab: EventTab;
  onTabChange: (tab: EventTab) => void;
  counts?: Record<EventTab, number>;
}

export interface FilterBarProps {
  activeCategory: EventCategory;
  onCategoryChange: (category: EventCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: EventSort;
  onSortChange: (sort: EventSort) => void;
  resultCount: number;
  totalCount: number;
  categoryCounts: Record<EventCategory, number>;
}

export type EmptyStateVariant =
  | "no-events"
  | "no-filter-results"
  | "no-search-results"
  | "no-tickets"
  | "no-recordings";
