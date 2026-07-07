import type { TechnologyDefinition } from '../../types';

export const peertubeTechnologyDefinition = {
	id: "peertube",
	name: "PeerTube",
	website: "https://joinpeertube.org/",
	description: "PeerTube is a free and open-source, decentralized, federated video platform powered by ActivityPub and WebTorrent.",
	icon: "PeerTube.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "peertube:dom:0",
			kind: "dom",
			selector: "#incompatible-browser p",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "peertube:text:1",
			kind: "text",
			pattern: new RegExp("^We are sorry but it seems that PeerTube is not compatible with your web browser\\.$"),
			description: "Page text contains a known technology marker.",
		},
		{
			id: "peertube:meta:2",
			kind: "meta",
			key: "og:platform",
			valuePattern: new RegExp("^PeerTube$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "peertube:meta:3",
			kind: "meta",
			key: "og:platform",
			valuePattern: new RegExp("^peertube$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:framasoft:peertube:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
