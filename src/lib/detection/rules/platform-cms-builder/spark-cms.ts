import type { TechnologyDefinition } from '../../types';

export const sparkCmsTechnologyDefinition = {
	id: "spark-cms",
	name: "Spark CMS",
	website: "https://www.councilconnect.com.au/our-websites/about-spark-cms.aspx",
	description: "The CMS has been custom built by our web developers based on feedback from our clients, ensuring an easy to use platform that's been designed in consultation with the end user in mind.",
	icon: "Spark.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "spark-cms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/spark-scripts\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "spark-cms:dom:1",
			kind: "dom",
			selector: "link[href*='sparkcms.com.au']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "spark-cms:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^BNI_SparkCMSLB$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "spark-cms:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^bni_sparkcmslb$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: false,
	},
} as const satisfies TechnologyDefinition;
