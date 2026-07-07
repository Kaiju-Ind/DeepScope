import type { TechnologyDefinition } from '../../types';

export const streamlitTechnologyDefinition = {
	id: "streamlit",
	name: "Streamlit",
	website: "https://streamlit.io",
	description: "Streamlit is an open-source Python framework enabling data scientists and AI/ML engineers to create data applications with minimal coding requirements.",
	icon: "Streamlit.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "streamlit:jsGlobal:0",
			kind: "jsGlobal",
			property: "streamlitDebug",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "streamlit:jsGlobal:1",
			kind: "jsGlobal",
			property: "webpackChunk_streamlit_app",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "streamlit:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^_streamlit_csrf$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "streamlit:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^_streamlit_xsrf$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "streamlit:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^streamlit_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
		],
		cpe: "cpe:2.3:a:snowflake:streamlit:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
