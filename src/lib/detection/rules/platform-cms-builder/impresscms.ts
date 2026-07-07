import type { TechnologyDefinition } from '../../types';

export const impresscmsTechnologyDefinition = {
	id: "impresscms",
	name: "ImpressCMS",
	website: "https://www.impresscms.org",
	description: "ImpressCMS is an open-source content management system (CMS) designed for creating and managing dynamic websites.",
	icon: "ImpressCMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "impresscms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("include\\/linkexternal\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "impresscms:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^ICMSSession$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "impresscms:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^ImpressCMS$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "impresscms:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("ImpressCMS", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "impresscms:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^icmssession$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "impresscms:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^impresscms$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "impresscms:meta:6",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("impresscms", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:impresscms:impresscms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
