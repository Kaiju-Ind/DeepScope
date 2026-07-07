import type { TechnologyDefinition } from '../../types';

export const webrtcTechnologyDefinition = {
	id: "webrtc",
	name: "WebRTC",
	website: "https://webrtc.org",
	description: "WebRTC is an open-source project that enables real-time voice, text and video communications capabilities between web browsers and devices.",
	icon: "WebRTC.svg",
	categories: [
		"widgets-misc",
	],
	rules: [],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:webrtc_project:webrtc:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
