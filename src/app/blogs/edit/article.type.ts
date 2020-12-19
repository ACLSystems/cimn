export interface Article {
	title: string;
	description: string;
	main: boolean;
	_id?: string;
	photo?: string;
	content?: any;
	contentInnerHTML?: string;
}
