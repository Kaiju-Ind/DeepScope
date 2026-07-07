import type { TechnologyDefinition } from '../../types';

export const openEdxTechnologyDefinition = {
	id: "open-edx",
	name: "Open edX",
	website: "https://openedx.org/",
	description: "The Open edX platform is a free and open source course management system.",
	icon: "Open edX.png",
	categories: [
		"platform-cms-builder",
		"content-publishing",
	],
	rules: [
		{
			id: "open-edx:dom:0",
			kind: "dom",
			selector: "meta[name='openedx-release-line'], #footer-openedx, .openedx, .open-edx-logo, .open-edx-link, .footer-about-openedx, a[href*='https://open.edx.org'], a[href*='https://openedx.org'], img[src*='https://files.edx.org/openedx-logos/'][alt='Powered by Open edX']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
