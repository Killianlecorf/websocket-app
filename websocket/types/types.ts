export type ClientMessage = {
    type: 'message';
    sender: string;
    timestamp: number;
    text: string;
  };
  
  export type ServerMessage = {
    type: 'broadcast';
    sender: string;
    timestamp: number;
    text: string;
  };