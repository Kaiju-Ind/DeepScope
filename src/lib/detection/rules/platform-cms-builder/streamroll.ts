import type { TechnologyDefinition } from '../../types';

export const streamrollTechnologyDefinition = {
	id: "streamroll",
	name: "Streamroll",
	website: "https://www.streamroll.net",
	description: "Streamroll is an internet-based platform designed to manage and display information related to apartment listings and affordable housing options.",
	icon: "Streamroll.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "streamroll:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("analytics\\.streamroll\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "streamroll:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("analytics\\.streamroll\\.net"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "streamroll:jsGlobal:2",
			kind: "jsGlobal",
			property: "Streamroll_corpSite",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
