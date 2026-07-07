import type { TechnologyDefinition } from '../../types';

export const amazonWebServicesTechnologyDefinition = {
	id: "amazon-web-services",
	name: "Amazon Web Services",
	website: "https://aws.amazon.com/",
	description: "Amazon Web Services (AWS) is a comprehensive cloud services platform offering compute power, database storage, content delivery and other functionality.",
	icon: "Amazon Web Services.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "amazon-web-services:dns:0",
			kind: "dns",
			valuePattern: new RegExp("\\.awsdns-", "i"),
			recordType: "NS",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "amazon-web-services:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.amazonaws\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
