import type { TechnologyDefinition } from '../../types';

export const fc2AnalyzerTechnologyDefinition = {
	id: "fc2-analyzer",
	name: "FC2 Analyzer",
	website: "https://fc2.com",
	description: "FC2 Analyzer is a platform designed to track and analyze affiliate system performance, providing insights into traffic, conversions, and revenue metrics.",
	icon: "FC2Analyzer.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "fc2-analyzer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.fc2\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
