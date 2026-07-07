import type { TechnologyDefinition } from '../../types';

export const netroxTechnologyDefinition = {
	id: "netrox",
	name: "Netrox",
	website: "https://netroxsc.ru",
	description: "Netrox SC is a Russian online consultant technology platform that provides live chat and customer support tools for websites.",
	icon: "NetroxSC.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "netrox:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.netroxsc\\.ru"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "netrox:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.netroxsc\\.ru"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
