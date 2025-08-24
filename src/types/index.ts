export type MoodEntry = {
  date: string;
  mood: number;
  note: string;
  score: number;
  time?: string;
  timestamp?: number;
};

export type MeditationType = {
  id: string;
  name: string;
  description: string;
  icon: string;
  duration: string;
};

export type SoundType = 'rain' | 'ocean' | 'wind' | 'forest' | 'thunder' | 'fireplace';

export type CalmingSound = {
  id: SoundType;
  name: string;
  description: string;
  icon: string;
};

export type EmergencyContact = {
  name: string;
  phone: string;
  description: string;
  website: string | null;
  country: string;
  location: string;
};

export type GroundingStep = {
  title: string;
  description: string;
  emoji: string;
};

export type Mood = {
  emoji: string;
  label: string;
  messages: string[];
  score: number;
};
