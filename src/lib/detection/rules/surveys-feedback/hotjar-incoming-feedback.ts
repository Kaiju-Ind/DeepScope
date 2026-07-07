import type { TechnologyDefinition } from '../../types';

export const hotjarIncomingFeedbackTechnologyDefinition = {
	id: "hotjar-incoming-feedback",
	name: "Hotjar Incoming Feedback",
	website: "https://www.hotjar.com",
	description: "Hotjar Incoming Feedback is a widget that sits at the edge of a page.",
	icon: "Hotjar.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "hotjar-incoming-feedback:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.hotjar\\.com\\/preact-incoming-feedback"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hotjar-incoming-feedback:dom:1",
			kind: "dom",
			selector: "a[href*='hotjar.com/incoming-feedback'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
