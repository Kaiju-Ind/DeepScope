import type { TechnologyDefinition } from '../../types';

export const chordTechnologyDefinition = {
	id: "chord",
	name: "Chord",
	website: "https://m.chord.us",
	description: "Chord is a video-enabled social community and communication platform completely customised to your brand.",
	icon: "Chord.svg",
	categories: [
		"email-messaging",
		"media-video",
	],
	rules: [
		{
			id: "chord:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("chord\\.us\\/embeddable\\/client-([\\d\\.]+)\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "chord:jsGlobal:1",
			kind: "jsGlobal",
			property: "CHORDCONNECT",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chord:jsGlobal:2",
			kind: "jsGlobal",
			property: "ChordConnect.__esModule",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
