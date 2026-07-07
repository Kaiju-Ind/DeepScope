import type { TechnologyDefinition } from '../../types';

export const readspeakerTechnologyDefinition = {
	id: "readspeaker",
	name: "ReadSpeaker",
	website: "https://www.readspeaker.com",
	description: "ReadSpeaker is an intuitive text-to-speech API that converts text into natural-sounding audio files for websites and applications.",
	icon: "ReadSpeaker.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "readspeaker:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.readspeaker\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "readspeaker:jsGlobal:1",
			kind: "jsGlobal",
			property: "ReadSpeaker",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "readspeaker:jsGlobal:2",
			kind: "jsGlobal",
			property: "ReadSpeaker.meta.version",
			valuePattern: new RegExp("^([\\d\\.]+)_.+$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
