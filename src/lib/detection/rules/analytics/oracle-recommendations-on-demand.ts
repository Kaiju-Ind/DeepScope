import type { TechnologyDefinition } from '../../types';

export const oracleRecommendationsOnDemandTechnologyDefinition = {
	id: "oracle-recommendations-on-demand",
	name: "Oracle Recommendations On Demand",
	website: "https://www.oracle.com/us/products/applications/commerce/recommendations-on-demand/index.html",
	icon: "Oracle.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "oracle-recommendations-on-demand:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("atgsvcs.+atgsvcs\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
