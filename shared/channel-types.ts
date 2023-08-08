export interface Users {
	[userID: string]: string;
}

export interface Channel {
	id: string;
	topic: string;
	users: Users;
	adminID: string;
}
