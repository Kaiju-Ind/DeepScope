import type { TechnologyDefinition } from "../../types.ts";
import { amazonEfsTechnologyDefinition } from "./amazon-efs.ts";
import { ateraTechnologyDefinition } from "./atera.ts";
import { cardinaTechnologyDefinition } from "./cardina.ts";
import { cargoserverTechnologyDefinition } from "./cargoserver.ts";
import { chaserTechnologyDefinition } from "./chaser.ts";
import { citrixTechnologyDefinition } from "./citrix.ts";
import { glanceTechnologyDefinition } from "./glance.ts";
import { imperoTechnologyDefinition } from "./impero.ts";
import { ipfsTechnologyDefinition } from "./ipfs.ts";
import { logmeinTechnologyDefinition } from "./logmein.ts";
import { maptrackTechnologyDefinition } from "./maptrack.ts";
import { milvusTechnologyDefinition } from "./milvus.ts";
import { netopTechnologyDefinition } from "./netop.ts";
import { paesslerTechnologyDefinition } from "./paessler.ts";
import { paloAltoNetworksGlobalprotectTechnologyDefinition } from "./palo-alto-networks-globalprotect.ts";
import { pulseSecureTechnologyDefinition } from "./pulse-secure.ts";
import { redHatGlusterTechnologyDefinition } from "./red-hat-gluster.ts";
import { sednaSystemTechnologyDefinition } from "./sedna-system.ts";
import { shellinaboxTechnologyDefinition } from "./shellinabox.ts";
import { synologyDiskstationTechnologyDefinition } from "./synology-diskstation.ts";
import { teamviewerTechnologyDefinition } from "./teamviewer.ts";
import { upscopeTechnologyDefinition } from "./upscope.ts";
import { voetbalassistTechnologyDefinition } from "./voetbalassist.ts";

export const networkHardwareTechnologyDefinitions = [
	amazonEfsTechnologyDefinition,
	ateraTechnologyDefinition,
	cardinaTechnologyDefinition,
	cargoserverTechnologyDefinition,
	chaserTechnologyDefinition,
	citrixTechnologyDefinition,
	glanceTechnologyDefinition,
	imperoTechnologyDefinition,
	ipfsTechnologyDefinition,
	logmeinTechnologyDefinition,
	maptrackTechnologyDefinition,
	milvusTechnologyDefinition,
	netopTechnologyDefinition,
	paesslerTechnologyDefinition,
	paloAltoNetworksGlobalprotectTechnologyDefinition,
	pulseSecureTechnologyDefinition,
	redHatGlusterTechnologyDefinition,
	sednaSystemTechnologyDefinition,
	shellinaboxTechnologyDefinition,
	synologyDiskstationTechnologyDefinition,
	teamviewerTechnologyDefinition,
	upscopeTechnologyDefinition,
	voetbalassistTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
