import type { TechnologyDefinition } from '../../types';

export const sapUpscaleCommerceTechnologyDefinition = {
	id: "sap-upscale-commerce",
	name: "SAP Upscale Commerce",
	website: "https://www.sapstore.com/solutions/47000/SAP-Upscale-Commerce",
	description: "SAP Upscale Commerce is a SaaS solution for small-to-medium organizations selling directly to consumers.",
	icon: "SAP.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sap-upscale-commerce:dom:0",
			kind: "dom",
			selector: "[upscale-version]",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
