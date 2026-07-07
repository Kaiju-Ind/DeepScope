import type { TechnologyDefinition } from '../../types';

export const verticalscopeTechnologyDefinition = {
	id: "verticalscope",
	name: "VerticalScope",
	website: "https://www.verticalscope.com",
	description: "VerticalScope is a Canadian-based technology company that owns and operates a network of online communities and discussion forums focused on a variety of interests and hobbies, such as cars, pets, sports, and technology. VerticalScope generates revenue primarily through advertising, including banner ads, sponsored content, and affiliate marketing.",
	icon: "VerticalScope.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "verticalscope:html:0",
			kind: "html",
			pattern: new RegExp("VerticalScope(?:\\s+Inc\\.)?", "i"),
			confidence: 90,
			description: "Document HTML contains VerticalScope branding.",
		},
		{
			id: "verticalscope:text:1",
			kind: "text",
			pattern: new RegExp("VerticalScope Inc\\."),
			description: "Page text contains a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
