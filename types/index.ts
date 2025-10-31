export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  thumbnail: string;
  excerpt: string;
  content: string;
  teamTags: string[];
  source: string;
  views: number;
  likes: number;
}

export interface Highlight {
  id: string;
  title: string;
  platform: 'youtube' | 'tiktok' | 'x' | 'instagram';
  embedUrl: string;
  thumbnail: string;
  duration?: string;
  date: string;
}

export interface LeagueTableRow {
  position: number;
  team: string;
  played: number;
  won: number;
  draw: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface TopScorer {
  player: string;
  team: string;
  goals: number;
  assists: number;
  matches: number;
  league: string;
}

export interface Fixture {
  id: string;
  home: string;
  away: string;
  date: string;
  time?: string;
  status: 'upcoming' | 'live' | 'finished';
  score?: {
    home: number;
    away: number;
  };
  league: string;
}

