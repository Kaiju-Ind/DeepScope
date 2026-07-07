import type { TechnologyDefinition } from '../../types';

export const theraLinkTechnologyDefinition = {
	id: "thera-link",
	name: "thera-LINK",
	website: "https://www.thera-link.com",
	description: "Thera Link is a telehealth video platform designed to facilitate secure virtual sessions between mental health professionals and clients.",
	icon: "TheraLink.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "thera-link:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.thera-link\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "thera-link:dom:1",
			kind: "dom",
			selector: "div[data-items-type-array*='app.thera-link.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
