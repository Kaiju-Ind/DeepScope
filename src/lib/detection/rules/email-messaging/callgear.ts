import type { TechnologyDefinition } from '../../types';

export const callgearTechnologyDefinition = {
	id: "callgear",
	name: "Callgear",
	website: "https://callgear.com",
	description: "Callgear is a business communication platform that enables centralized management of voice calls and text messaging across organizational communication channels.",
	icon: "Callgear.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "callgear:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.callgear\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "callgear:jsGlobal:1",
			kind: "jsGlobal",
			property: "CallGear.Captcha",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
