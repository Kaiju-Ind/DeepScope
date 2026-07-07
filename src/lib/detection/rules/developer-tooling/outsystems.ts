import type { TechnologyDefinition } from '../../types';

export const outsystemsTechnologyDefinition = {
	id: "outsystems",
	name: "OutSystems",
	website: "https://www.outsystems.com",
	description: "OutSystems is a low-code platform which provides tools for companies to develop, deploy and manage omnichannel enterprise applications.",
	icon: "OutSystems.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "outsystems:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("scripts\\/OutSystems(?:[\\w]+)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "outsystems:jsGlobal:1",
			kind: "jsGlobal",
			property: "OutSystemsDebugger",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "outsystems:jsGlobal:2",
			kind: "jsGlobal",
			property: "outsystems",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "outsystems:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("scripts\\/outsystems(?:[\\w]+)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
		cpe: "cpe:2.3:a:outsystems:outsystems:*:*:*:*:*:*:*:*",
	},
	implies: [
		"iis",
		"windows-server",
	],
} as const satisfies TechnologyDefinition;
