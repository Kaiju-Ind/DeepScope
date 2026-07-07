import type { TechnologyDefinition } from '../../types';

export const jqueryCdnTechnologyDefinition = {
	id: "jquery-cdn",
	name: "jQuery CDN",
	website: "https://code.jquery.com/",
	description: "jQuery CDN is a way to include jQuery in your website without actually downloading and keeping it your website's folder.",
	icon: "jQuery.svg",
	categories: [
		"ui-library",
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "jquery-cdn:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("code\\.jquery\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	implies: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
