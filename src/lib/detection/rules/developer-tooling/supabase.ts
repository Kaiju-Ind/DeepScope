import type { TechnologyDefinition } from '../../types';

export const supabaseTechnologyDefinition = {
	id: "supabase",
	name: "Supabase",
	website: "https://supabase.com",
	description: "Supabase is an open-source platform that offers a Postgres database, Authentication, APIs, Edge Functions, Realtime subscriptions, Storage, and Vector embeddings for project development.",
	icon: "Supabase.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "supabase:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.supabase\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "supabase:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.supabase\\.co\\/"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "supabase:dom:2",
			kind: "dom",
			selector: "a[href*='supabase.com'] > img[src*='/supabase-logo-wordmark\\-\\-dark.png']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "supabase:jsGlobal:3",
			kind: "jsGlobal",
			property: "__NUXT__.config.public.SUPABASE_URL",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "supabase:jsGlobal:4",
			kind: "jsGlobal",
			property: "__NUXT__.config.public.supabase",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "supabase:jsGlobal:5",
			kind: "jsGlobal",
			property: "createClient",
			valuePattern: new RegExp("supabase\\."),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "supabase:jsGlobal:6",
			kind: "jsGlobal",
			property: "supabase.AuthAdminApi",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "supabase:jsGlobal:7",
			kind: "jsGlobal",
			property: "supabase.storageKey",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "supabase:dom:8",
			kind: "dom",
			selector: "a[href*='supabase.com'] > img[src*='/supabase-logo-wordmark--dark.png']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"payg",
			"recurring",
		],
	},
	implies: [
		"postgresql",
	],
} as const satisfies TechnologyDefinition;
