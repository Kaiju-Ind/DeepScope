import type { TechnologyDefinition } from '../../types';

export const goatcounterTechnologyDefinition = {
	id: "goatcounter",
	name: "GoatCounter",
	website: "https://www.goatcounter.com/",
	description: "GoatCounter is an open source web analytics platform available as a hosted service (free for non-commercial use) or self-hosted app. It aims to offer easy to use and meaningful privacy-friendly web analytics as an alternative to Google Analytics or Matomo.",
	icon: "goatcounter.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "goatcounter:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("gc\\.zgo\\.at\\/count\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
