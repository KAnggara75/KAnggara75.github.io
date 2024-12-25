export default interface PostsList {
	pages: PostTypes[];
}

export interface PostTypes {
	title: string;
	subtitle: string;
	author: string;
	source: string;
	url: string;
	src: string;
	img: string;
	postOn: string;
	tags: string[];
}
