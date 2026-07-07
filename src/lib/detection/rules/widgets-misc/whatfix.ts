import type { TechnologyDefinition } from '../../types';

export const whatfixTechnologyDefinition = {
	id: "whatfix",
	name: "Whatfix",
	website: "https://whatfix.com",
	description: "Whatfix is a SaaS based platform which provides in-app guidance and performance support for web applications and software products.",
	icon: "Whatfix.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "whatfix:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.whatfix\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "whatfix:jsGlobal:1",
			kind: "jsGlobal",
			property: "_wfx_add_logger",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "whatfix:jsGlobal:2",
			kind: "jsGlobal",
			property: "_wfx_settings",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "whatfix:jsGlobal:3",
			kind: "jsGlobal",
			property: "wfx_is_playing__",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
