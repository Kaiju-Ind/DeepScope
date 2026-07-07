import type { TechnologyDefinition } from '../../types';

export const firebaseTechnologyDefinition = {
	id: "firebase",
	name: "Firebase",
	website: "https://firebase.google.com",
	description: "Firebase is a Google-backed application development software that enables developers to develop iOS, Android and Web apps.",
	icon: "Firebase.svg",
	categories: [
		"server-runtime-infra",
		"developer-tooling",
	],
	rules: [
		{
			id: "firebase:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/(?:([\\d.]+)\\/)?firebase(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "firebase:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/firebasejs\\/([\\d.]+)\\/firebase"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "firebase:scriptContent:2",
			kind: "scriptContent",
			pattern: new RegExp("\\.gstatic\\.com\\/firebasejs\\/([\\d\\.]+)\\/"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "firebase:jsGlobal:3",
			kind: "jsGlobal",
			property: "firebase.SDK_VERSION",
			valuePattern: new RegExp("([\\d.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "firebase:header:4",
			kind: "header",
			key: "vary",
			valuePattern: new RegExp("x-fh-requested-host", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "firebase:scriptContent:5",
			kind: "scriptContent",
			pattern: new RegExp("firebase(?:Config|io\\.com)"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "firebase:requestUrl:6",
			kind: "requestUrl",
			pattern: new RegExp("fire(?:base|store)\\.googleapis\\.com|\\.firebaseio\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "firebase:dom:7",
			kind: "dom",
			selector: "iframe[src*='.firebaseapp.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "firebase:scriptContent:8",
			kind: "scriptContent",
			pattern: new RegExp("firebase(?:config|io\\.com)"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "firebase:scriptContent:9",
			kind: "scriptContent",
			pattern: new RegExp("__FIREBASE_DEFAULTS__|FirebaseError"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"payg",
		],
		cpe: "cpe:2.3:a:google:firebase_cloud_messaging:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
