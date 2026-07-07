import type { TechnologyDefinition } from '../../types';

export const peerpalTechnologyDefinition = {
	id: "peerpal",
	name: "PeerPal",
	website: "https://gravyty.com/peerpal",
	description: "PeerPal is a platform that enhances the admission experience by connecting prospective families with students, alumni, faculty, and parent ambassadors.",
	icon: "PeerPal.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "peerpal:jsGlobal:0",
			kind: "jsGlobal",
			property: "initPeerPal",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
