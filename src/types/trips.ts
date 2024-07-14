export interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

export interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}
export type Participants = Participant[];

export interface Activity {
  date: string;
  activities: {
    id: string;
    title: string;
    occurs_at: string;
  }[];
}
export type Activities = Activity[];
