import type { TechnologyDefinition } from '../../types';

export const totangoTechnologyDefinition = {
	id: "totango",
	name: "Totango",
	website: "https://www.totango.com",
	description: "Totango is a customer success platform that helps recurring revenue businesses simplify the complexities of customer success by connecting the dots of customer data, actively monitoring customer health changes, and driving proactive engagements.",
	icon: "Totango.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "totango:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.totango\\.com\\/totango([\\d\\.]+)\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "totango:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.amazonaws\\.com\\/totango-cdn\\/totango\\d\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "totango:jsGlobal:2",
			kind: "jsGlobal",
			property: "totango",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "totango:jsGlobal:3",
			kind: "jsGlobal",
			property: "totangoLoader",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
