import type { TechnologyDefinition } from '../../types';

export const wordpressMultisiteTechnologyDefinition = {
	id: "wordpress-multisite",
	name: "WordPress Multisite",
	website: "https://wordpress.org/documentation/article/create-a-network/",
	description: "A multisite network is a collection of sites that share one WordPress installation.",
	icon: "WordPress.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "wordpress-multisite:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp-content/uploads/sites/\\d+/", "i"),
			confidence: 100,
			description: "Loaded resource URL contains a WordPress multisite uploads/sites/<id> segment.",
		},
		{
			id: "wordpress-multisite:html:1",
			kind: "html",
			pattern: new RegExp("/wp-content/uploads/sites/\\d+/", "i"),
			confidence: 95,
			description: "Document HTML contains a WordPress multisite uploads/sites/<id> segment.",
		},
		{
			id: "wordpress-multisite:dom:2",
			kind: "dom",
			selector: "img[src*='wp-content/uploads/sites/'], img[srcset*='wp-content/uploads/sites/'], source[srcset*='wp-content/uploads/sites/']",
			confidence: 95,
			description: "DOM image/source references a multisite upload path.",
		},
	],
	requires: [
		"wordpress",
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;

export const wordpressVipTechnologyDefinition = {
	id: "wordpress-vip",
	name: "WordPress VIP",
	website: "https://wpvip.com",
	description: "WordPress VIP is a managed hosting platform for WordPress.",
	icon: "wpvip.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "wordpress-vip:header:0",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("(?:^WordPress VIP|wpvip\\.com)", "i"),
			confidence: 100,
			description: "Response header identifies WordPress VIP.",
		},
		{
			id: "wordpress-vip:responseHeader:1",
			kind: "responseHeader",
			key: "x-powered-by",
			valuePattern: new RegExp("(?:^WordPress VIP|wpvip\\.com)", "i"),
			confidence: 100,
			description: "Main response header identifies WordPress VIP.",
		},
		{
			id: "wordpress-vip:resourceUrl:2",
			kind: "resourceUrl",
			pattern: new RegExp("\\.wpvip\\.com/", "i"),
			confidence: 90,
			description: "Loaded resource URL references WordPress VIP infrastructure.",
		},
	],
	implies: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

export const wordpressComTechnologyDefinition = {
	id: "wordpress-com",
	name: "WordPress.com",
	website: "https://wordpress.com",
	description: "WordPress.com is Automattic's hosted WordPress platform.",
	icon: "WordPress.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "wordpress-com:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^WordPress\\.com$", "i"),
			confidence: 100,
			description: "Generator meta tag identifies WordPress.com.",
		},
		{
			id: "wordpress-com:url:1",
			kind: "url",
			pattern: new RegExp("^https?://(?:[^/?#]+\\.)?wordpress\\.com(?:[:/?#]|$)", "i"),
			confidence: 95,
			description: "Current page is served from wordpress.com.",
		},
		{
			id: "wordpress-com:requestUrl:2",
			kind: "requestUrl",
			pattern: new RegExp("(?:public-api|widgets|pixel|stats)\\.wp\\.com/|public-api\\.wordpress\\.com/", "i"),
			confidence: 95,
			description: "Network/resource signals reference WordPress.com platform services.",
		},
		{
			id: "wordpress-com:resourceUrl:3",
			kind: "resourceUrl",
			pattern: new RegExp("(?:public-api|widgets|pixel|stats)\\.wp\\.com/|public-api\\.wordpress\\.com/", "i"),
			confidence: 95,
			description: "Loaded resource URL references WordPress.com platform services.",
		},
		{
			id: "wordpress-com:html:4",
			kind: "html",
			pattern: new RegExp("(?:public-api\\.wordpress\\.com|widgets\\.wp\\.com|stats\\.wp\\.com|pixel\\.wp\\.com)", "i"),
			confidence: 80,
			description: "Document HTML references WordPress.com platform services.",
		},
	],
	implies: [
		"wordpress",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
