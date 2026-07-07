import type { TechnologyDefinition } from '../../types';

export const gubagooTechnologyDefinition = {
	id: "gubagoo",
	name: "Gubagoo",
	website: "https://www.gubagoo.com",
	description: "Gubagoo is a website chat software platform that provides messaging and engagement tools designed to interact with visitors and support conversion of web traffic.",
	icon: "Gubagoo.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "gubagoo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.gubagoo\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
