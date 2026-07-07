import type { TechnologyDefinition } from '../../types';

export const phpmyadminTechnologyDefinition = {
	id: "phpmyadmin",
	name: "phpMyAdmin",
	website: "https://www.phpmyadmin.net",
	description: "PhpMyAdmin is a free and open-source administration tool for MySQL and MariaDB.",
	icon: "phpMyAdmin.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "phpmyadmin:html:0",
			kind: "html",
			pattern: new RegExp("!\\[CDATA\\[[^<]*PMA_VERSION:\\\"([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "phpmyadmin:html:1",
			kind: "html",
			pattern: new RegExp("(?: \\| phpMyAdmin ([\\d.]+)<\\/title>|PMA_sendHeaderLocation\\(|<link [^>]*href=\"[^\"]*phpmyadmin\\.css\\.php)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "phpmyadmin:jsGlobal:2",
			kind: "jsGlobal",
			property: "pma_absolute_uri",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "phpmyadmin:header:3",
			kind: "header",
			key: "Set-Cookie",
			valuePattern: new RegExp("phpMyAdmin_https", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "phpmyadmin:dom:4",
			kind: "dom",
			selector: "link[href*='phpmyadmin.css.php']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "phpmyadmin:html:5",
			kind: "html",
			pattern: new RegExp("!\\[cdata\\[[^<]*pma_version:\\\"([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "phpmyadmin:html:6",
			kind: "html",
			pattern: new RegExp("(?: \\| phpmyadmin ([\\d.]+)<\\/title>|pma_sendheaderlocation\\(|<link [^>]*href=\"[^\"]*phpmyadmin\\.css\\.php)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "phpmyadmin:header:7",
			kind: "header",
			key: "set-cookie",
			valuePattern: new RegExp("phpmyadmin_https", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:phpmyadmin:phpmyadmin:*:*:*:*:*:*:*:*",
	},
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
