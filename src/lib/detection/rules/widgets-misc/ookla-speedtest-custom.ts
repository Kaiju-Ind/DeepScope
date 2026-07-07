import type { TechnologyDefinition } from '../../types';

export const ooklaSpeedtestCustomTechnologyDefinition = {
	id: "ookla-speedtest-custom",
	name: "Ookla Speedtest Custom",
	website: "https://www.ookla.com/speedtest-custom",
	description: "Speedtest Custom is a robust and accurate testing solution that is HTML5-based, Flash-free and supports both mobile and desktop browsers built by Ookla.",
	icon: "Ookla.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "ookla-speedtest-custom:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.speedtestcustom\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ookla-speedtest-custom:dom:1",
			kind: "dom",
			selector: "iframe[src*='.speedtestcustom.com'], a[href*='.speedtestcustom.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "ookla-speedtest-custom:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.speedtestcustom\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
