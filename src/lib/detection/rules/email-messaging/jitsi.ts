import type { TechnologyDefinition } from '../../types';

export const jitsiTechnologyDefinition = {
	id: "jitsi",
	name: "Jitsi",
	website: "https://jitsi.org",
	description: "Jitsi is a free and open-source multiplatform voice (VoIP), videoconferencing and instant messaging applications for the web platform.",
	icon: "Jitsi.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "jitsi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("lib-jitsi-meet.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:jitsi:jitsi:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
