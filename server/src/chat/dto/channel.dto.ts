import { IsInt, IsString, Length, Max, Min } from "class-validator";

export class CreateChannelDto {
	@IsString()
	@Length(1, 100)
	topic: string;

	@IsString()
	@Length(1, 25)
	name: string;
}

export class JoinChannelDto {
	@IsString()
	@Length(6, 6)
	channelId: string;

	@IsString()
	@Length(1, 25)
	name: string;
}
