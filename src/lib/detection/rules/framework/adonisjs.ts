import type { TechnologyDefinition } from '../../types';

export const adonisjsTechnologyDefinition = {
	id: "adonisjs",
	name: "AdonisJS",
	website: "https://adonisjs.com",
	description: "AdonisJS is a Node.js web application framework that follows the MVC pattern, simplifying web development with features like ORM, authentication, and WebSockets.",
	icon: "AdonisJS.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "adonisjs:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^adonis\\-session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "adonisjs:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^adonis\\-session\\-values$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "adonisjs:dom:2",
			kind: "dom",
			selector: "link[href*='adonisjs.com/'][rel='canonical']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"node-js",
	],
} as const satisfies TechnologyDefinition;
