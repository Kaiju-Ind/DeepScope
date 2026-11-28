import type { TechnologyDefinition } from "../../types.ts";
import { animateCssTechnologyDefinition } from "./animate-css.ts";
import { animeJsTechnologyDefinition } from "./anime-js.ts";
import { aosTechnologyDefinition } from "./aos.ts";
import { framerMotionTechnologyDefinition } from "./framer-motion.ts";
import { gsapTechnologyDefinition } from "./gsap.ts";
import { autoanimateTechnologyDefinition } from "./autoanimate.ts";
import { lottieTechnologyDefinition } from "./lottie.ts";
import { motionOneTechnologyDefinition } from "./motion-one.ts";
import { reactSpringTechnologyDefinition } from "./react-spring.ts";
import { viewTransitionsApiTechnologyDefinition } from "./view-transitions-api.ts";

export const animationTechnologyDefinitions = [
	animateCssTechnologyDefinition,
	animeJsTechnologyDefinition,
	aosTechnologyDefinition,
	framerMotionTechnologyDefinition,
	gsapTechnologyDefinition,
	autoanimateTechnologyDefinition,
	lottieTechnologyDefinition,
	motionOneTechnologyDefinition,
	reactSpringTechnologyDefinition,
	viewTransitionsApiTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
