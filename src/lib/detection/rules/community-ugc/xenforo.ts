import type { TechnologyDefinition } from '../../types';

export const xenforoTechnologyDefinition = {
	id: "xenforo",
	name: "XenForo",
	website: "https://xenforo.com",
	description: "XenForo is a PHP-based forum hosting program for communities that is designed to be deployed on a remote web server.",
	icon: "XenForo.png",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "xenforo:html:0",
			kind: "html",
			pattern: new RegExp("(?:jQuery\\.extend\\(true, XenForo|<a[^>]+>Forum software by XenForo™|<!--XF:branding|<html[^>]+id=\"XenForo\")"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "xenforo:html:1",
			kind: "html",
			pattern: new RegExp("<html id=\"XF\" "),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "xenforo:jsGlobal:2",
			kind: "jsGlobal",
			property: "XF.GuestUsername",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "xenforo:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^xf_csrf$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "xenforo:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^xf_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "xenforo:dom:5",
			kind: "dom",
			selector: "html[id*='XenForo'], html[id*='XF']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "xenforo:html:6",
			kind: "html",
			pattern: new RegExp("(?:jquery\\.extend\\(true, xenforo|<a[^>]+>forum software by xenforo™|<!--xf:branding|<html[^>]+id=\"xenforo\")"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "xenforo:html:7",
			kind: "html",
			pattern: new RegExp("<html id=\"xf\" "),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:xenforo:xenforo:*:*:*:*:*:*:*:*",
	},
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
