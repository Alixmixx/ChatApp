// Types used by Channel Service functions
export type CreateChannelFields = {
  topic: string;
  name: string;
};

export type JoinChannelFields = {
  channelID: string;
  name: string;
};

export type RejoinChannelFields = {
  channelID: string;
  userID: string;
  name: string;
};

// Repository types
export type CreateChannelData = {
  channelID: string;
  topic: string;
  userID: string;
};

export type AddUserChannelData = {
  channelID: string;
  userID: string;
  name: string;
};
