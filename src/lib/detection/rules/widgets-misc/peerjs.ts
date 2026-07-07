import type { TechnologyDefinition } from '../../types';

export const peerjsTechnologyDefinition = {
	id: "peerjs",
	name: "PeerJS",
	website: "https://peerjs.com",
	description: "PeerJS is a JavaScript library that enables WebRTC-based peer-to-peer data, video, and audio connections.",
	icon: "PeerJS.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "peerjs:jsGlobal:0",
			kind: "jsGlobal",
			property: "Peer.DEFAULT_KEY",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
