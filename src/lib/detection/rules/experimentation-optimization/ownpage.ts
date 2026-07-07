import type { TechnologyDefinition } from '../../types';

export const ownpageTechnologyDefinition = {
	id: "ownpage",
	name: "Ownpage",
	website: "https://www.ownpage.fr",
	description: "Ownpage is a technology services provider that enables publishers to personalize their newsletters, websites, and applications, enhancing content delivery for media platforms.",
	icon: "Ownpage.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "ownpage:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("script\\.ownpage\\.fr\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ownpage:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("loadOwnpageScript"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "ownpage:scriptContent:2",
			kind: "scriptContent",
			pattern: new RegExp("loadownpagescript"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
