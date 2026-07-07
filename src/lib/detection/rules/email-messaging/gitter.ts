import type { TechnologyDefinition } from '../../types';

export const gitterTechnologyDefinition = {
	id: "gitter",
	name: "Gitter",
	website: "https://gitter.im",
	description: "Gitter is a chat and networking platform that helps to manage, grow and connect communities through messaging.",
	icon: "Gitter.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "gitter:jsGlobal:0",
			kind: "jsGlobal",
			property: "gitter.chat",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
