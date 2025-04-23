export type ClientMessage = {
    type: 'message';
    sender: string;
    timestamp: number;
  };
  
  export type ServerMessage = {
    type: 'broadcast';
    sender: string;
    timestamp: number;
  };