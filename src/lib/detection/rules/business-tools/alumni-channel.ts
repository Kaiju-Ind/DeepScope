import type { TechnologyDefinition } from '../../types';

export const alumniChannelTechnologyDefinition = {
	id: "alumni-channel",
	name: "Alumni Channel",
	website: "https://alumnichannel.com",
	description: "Alumni Channel is a platform facilitating organization and communication with alumni and members.",
	icon: "AlumniChannel.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "alumni-channel:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("Alumni Channel - www.alumnichannel.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "alumni-channel:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("alumni channel - www.alumnichannel.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"onetime",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
