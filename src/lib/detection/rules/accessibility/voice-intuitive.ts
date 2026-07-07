import type { TechnologyDefinition } from '../../types';

export const voiceIntuitiveTechnologyDefinition = {
	id: "voice-intuitive",
	name: "Voice Intuitive",
	website: "https://voiceintuitive.com/en/voice-intuitive-tm/",
	description: "Voice Intuitive is a platform that enhances web content accessibility by providing voice and translation services, supporting multiple languages.",
	icon: "VoiceIntuitive.svg",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "voice-intuitive:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("static\\.voiceintuitive\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
