export interface LogHistory {
	updatedAt: Date | string,
	updatedBy: {
		firstName?: string,
		lastName?: string
	}
}

export interface LogInfo {
	createdAt: Date | string;
	createdBy: {
		firstName?: string,
		lastName?: string
	},
	logHistory?: LogHistory[]
}

export interface Article {
	title: string;
	description: string;
	main: boolean;
	_id?: string;
	photo?: string;
	content?: any;
	contentInnerHTML?: string;
	logInfo?: LogInfo;
	likes?: string [];
	comments?: string [];
	draft?: boolean;
	hide?: boolean;
	public?: boolean;
	conditionedLink?: string;
	conditionedLinkTitle?: string;
}
