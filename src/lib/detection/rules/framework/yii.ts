import type { TechnologyDefinition } from '../../types';

export const yiiTechnologyDefinition = {
	id: "yii",
	name: "Yii",
	website: "https://www.yiiframework.com",
	description: "Yii is an open-source, object-oriented, component-based MVC PHP web application framework.",
	icon: "Yii.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "yii:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/assets\\/[a-zA-Z0-9]{8}\\/yii\\.js$"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "yii:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/yii\\.(?:validation|activeForm)\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "yii:html:2",
			kind: "html",
			pattern: new RegExp("Powered by <a href=\"http:\\/\\/www\\.yiiframework\\.com\\/\" rel=\"external\">Yii Framework<\\/a>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "yii:html:3",
			kind: "html",
			pattern: new RegExp("<input type=\"hidden\" value=\"[a-zA-Z0-9]{40}\" name=\"YII_CSRF_TOKEN\" \\/>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "yii:html:4",
			kind: "html",
			pattern: new RegExp("<!\\[CDATA\\[YII-BLOCK-(?:HEAD|BODY-BEGIN|BODY-END)\\]"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "yii:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^YII_CSRF_TOKEN$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "yii:scriptSrc:6",
			kind: "scriptSrc",
			pattern: new RegExp("yii(?:\\.|)?(?:validation|activeform)\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "yii:dom:7",
			kind: "dom",
			selector: "input[name='YII_CSRF_TOKEN'][type='hidden'], a[href*='//www.yiiframework.com/'][rel='external']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "yii:jsGlobal:8",
			kind: "jsGlobal",
			property: "yii.init",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "yii:scriptSrc:9",
			kind: "scriptSrc",
			pattern: new RegExp("\\/assets\\/[a-za-z0-9]{8}\\/yii\\.js$"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "yii:scriptSrc:10",
			kind: "scriptSrc",
			pattern: new RegExp("\\/yii\\.(?:validation|activeform)\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "yii:html:11",
			kind: "html",
			pattern: new RegExp("<!\\[cdata\\[yii-block-(?:head|body-begin|body-end)\\]"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "yii:html:12",
			kind: "html",
			pattern: new RegExp("<input type=\"hidden\" value=\"[a-za-z0-9]{40}\" name=\"yii_csrf_token\" \\/>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "yii:html:13",
			kind: "html",
			pattern: new RegExp("powered by <a href=\"http:\\/\\/www\\.yiiframework\\.com\\/\" rel=\"external\">yii framework<\\/a>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "yii:cookie:14",
			kind: "cookie",
			keyPattern: new RegExp("^yii_csrf_token$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:yiiframework:yii:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
