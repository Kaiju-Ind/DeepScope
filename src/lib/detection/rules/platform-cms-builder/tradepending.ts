import type { TechnologyDefinition } from '../../types';

export const tradependingTechnologyDefinition = {
	id: "tradepending",
	name: "TradePending",
	website: "https://tradepending.com",
	description: "TradePending, formerly known as SnapCell, is a software platform for automotive digital retailing, offering car dealers tools to enhance rapport, increase sales, drive upsell, and improve customer satisfaction through reliable and straightforward video marketing.",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "tradepending:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.tradepending\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tradepending:jsGlobal:1",
			kind: "jsGlobal",
			property: "TradePendingPlugin",
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
