import type { TechnologyDefinition } from '../../types';

export const mdbookTechnologyDefinition = {
	id: "mdbook",
	name: "mdBook",
	website: "https://github.com/rust-lang/mdBook",
	description: "mdBook is a utility to create modern online books from Markdown files.",
	icon: "mdBook.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "mdbook:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("localStorage\\.getItem\\('mdbook-(?:sidebar|theme)'\\)"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "mdbook:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("localstorage\\.getitem\\('mdbook-(?:sidebar|theme)'\\)"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
