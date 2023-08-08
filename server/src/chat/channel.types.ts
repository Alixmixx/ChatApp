// Types used by Channel Service functions
export type CreateChannelFields = {
  topic: string;
  name: string;
};

export type JoinChannelFields = {
  channelId: string;
  name: string;
};

export type RejoinChannelFields = {
  channelId: string;
  userId: string;
  name: string;
};
