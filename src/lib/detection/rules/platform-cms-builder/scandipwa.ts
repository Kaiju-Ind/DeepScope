import type { TechnologyDefinition } from '../../types';

export const scandipwaTechnologyDefinition = {
	id: "scandipwa",
	name: "ScandiPWA",
	website: "https://scandipwa.com",
	description: "ScandiPWA is the next generation Magento 2 PWA theme developed in React.",
	icon: "ScandiPWA.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "scandipwa:dom:0",
			kind: "dom",
			selector: "link[href^='/static/frontend/scandipwa/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:scandipwa:magento-scripts:*:*:*:*:*:node.js:*:*",
	},
	implies: [
		"magento-version-2",
		"pwa",
		"react",
	],
} as const satisfies TechnologyDefinition;
