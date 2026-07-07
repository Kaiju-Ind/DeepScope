import type { TechnologyDefinition } from '../../types';

export const webminTechnologyDefinition = {
	id: "webmin",
	name: "Webmin",
	website: "https://www.webmin.com",
	description: "Webmin is a free, open-source application for Linux server administration.",
	icon: "Webmin.png",
	categories: [
		"widgets-misc",
	],
	rules: [],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:webmin:webmin:*:*:*:*:*:*:*:*",
	},
	implies: [
		"perl",
	],
} as const satisfies TechnologyDefinition;
