import type { TechnologyDefinition } from '../../types';

export const trinityAudioTechnologyDefinition = {
	id: "trinity-audio",
	name: "Trinity Audio",
	website: "https://www.trinityaudio.ai",
	description: "Trinity Audio's AI-driven solutions help publishers and content creators create a world of smart audio experiences for their audiences, covering every stage of the audio journey from creation to distribution.",
	icon: "Trinity Audio.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "trinity-audio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/trinitymedia\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "trinity-audio:jsGlobal:1",
			kind: "jsGlobal",
			property: "TRINITY_DISPLAY",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "trinity-audio:jsGlobal:2",
			kind: "jsGlobal",
			property: "TRINITY_PLAYER",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
