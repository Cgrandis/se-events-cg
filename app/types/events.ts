export type Event = {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
  };
  
export type AlertProps = {
    message: string;
    type: "error" | "success";
  };

export interface EventCardProps {
  event: Event;
  isSignedUp: boolean;
  onSignUp: (eventId: string, title: string, date: string, location: string) => void;
  loading: boolean;
  }