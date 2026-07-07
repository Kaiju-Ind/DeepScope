import type { TechnologyDefinition } from '../../types';

export const onesignalTechnologyDefinition = {
	id: "onesignal",
	name: "OneSignal",
	website: "https://onesignal.com",
	description: "OneSignal is a customer engagement messaging solution.",
	icon: "OneSignal.svg",
	categories: [
		"marketing-automation",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "onesignal:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.onesignal\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "onesignal:jsGlobal:1",
			kind: "jsGlobal",
			property: "OneSignal",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "onesignal:jsGlobal:2",
			kind: "jsGlobal",
			property: "__oneSignalSdkLoadCount",
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
