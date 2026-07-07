import type { TechnologyDefinition } from '../../types';

export const libravatarTechnologyDefinition = {
	id: "libravatar",
	name: "Libravatar",
	website: "https://www.libravatar.org/",
	description: "Libravatar is a service for fetching avatar images for e-mail addresses and OpenIDs in a privacy respecting way.",
	icon: "libravatar.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "libravatar:dom:0",
			kind: "dom",
			selector: "img[src*='.libravatar.org/avatar/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
