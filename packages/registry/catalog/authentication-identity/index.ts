import type { TechnologyDefinition } from "../../types.ts";
import { allianceAuthTechnologyDefinition } from "./alliance-auth.ts";
import { amazonCognitoTechnologyDefinition } from "./amazon-cognito.ts";
import { apereoCasTechnologyDefinition } from "./apereo-cas.ts";
import { appleSignInTechnologyDefinition } from "./apple-sign-in.ts";
import { appliedCsr24TechnologyDefinition } from "./applied-csr24.ts";
import { auth0TechnologyDefinition } from "./auth0.ts";
import { auth0LockTechnologyDefinition } from "./auth0-lock.ts";
import { authorizedByTechnologyDefinition } from "./authorized-by.ts";
import { authyTechnologyDefinition } from "./authy.ts";
import { azureAdB2cTechnologyDefinition } from "./azure-ad-b2c.ts";
import { betterAuthTechnologyDefinition } from "./better-auth.ts";
import { clerkTechnologyDefinition } from "./clerk.ts";
import { facebookLoginTechnologyDefinition } from "./facebook-login.ts";
import { getsocialTechnologyDefinition } from "./getsocial.ts";
import { googleSignInTechnologyDefinition } from "./google-sign-in.ts";
import { jumpcloudTechnologyDefinition } from "./jumpcloud.ts";
import { lineLoginTechnologyDefinition } from "./line-login.ts";
import { linkedinSignInTechnologyDefinition } from "./linkedin-sign-in.ts";
import { loginWithAmazonTechnologyDefinition } from "./login-with-amazon.ts";
import { loginradiusTechnologyDefinition } from "./loginradius.ts";
import { magiclabsTechnologyDefinition } from "./magiclabs.ts";
import { metamapTechnologyDefinition } from "./metamap.ts";
import { microsoftAuthenticationTechnologyDefinition } from "./microsoft-authentication.ts";
import { nextauthJsTechnologyDefinition } from "./nextauth-js.ts";
import { oktaTechnologyDefinition } from "./okta.ts";
import { oneallTechnologyDefinition } from "./oneall.ts";
import { oxiSocialLoginTechnologyDefinition } from "./oxi-social-login.ts";
import { passageTechnologyDefinition } from "./passage.ts";
import { passportJsTechnologyDefinition } from "./passport-js.ts";
import { ringcaptchaTechnologyDefinition } from "./ringcaptcha.ts";
import { sapCustomerDataCloudSignInTechnologyDefinition } from "./sap-customer-data-cloud-sign-in.ts";
import { simplesamlphpTechnologyDefinition } from "./simplesamlphp.ts";
import { socureTechnologyDefinition } from "./socure.ts";
import { superSocializerTechnologyDefinition } from "./super-socializer.ts";
import { twilioAuthyTechnologyDefinition } from "./twilio-authy.ts";
import { uloginTechnologyDefinition } from "./ulogin.ts";
import { userbaseTechnologyDefinition } from "./userbase.ts";
import { vouchedTechnologyDefinition } from "./vouched.ts";
import { wwpassTechnologyDefinition } from "./wwpass.ts";

/** Technology definitions in the authentication identity category folder. */
export const authenticationIdentityTechnologyDefinitions = [
	allianceAuthTechnologyDefinition,
	amazonCognitoTechnologyDefinition,
	apereoCasTechnologyDefinition,
	appleSignInTechnologyDefinition,
	appliedCsr24TechnologyDefinition,
	auth0TechnologyDefinition,
	auth0LockTechnologyDefinition,
	authorizedByTechnologyDefinition,
	authyTechnologyDefinition,
	azureAdB2cTechnologyDefinition,
	betterAuthTechnologyDefinition,
	clerkTechnologyDefinition,
	facebookLoginTechnologyDefinition,
	getsocialTechnologyDefinition,
	googleSignInTechnologyDefinition,
	jumpcloudTechnologyDefinition,
	lineLoginTechnologyDefinition,
	linkedinSignInTechnologyDefinition,
	loginWithAmazonTechnologyDefinition,
	loginradiusTechnologyDefinition,
	magiclabsTechnologyDefinition,
	metamapTechnologyDefinition,
	microsoftAuthenticationTechnologyDefinition,
	nextauthJsTechnologyDefinition,
	oktaTechnologyDefinition,
	oneallTechnologyDefinition,
	oxiSocialLoginTechnologyDefinition,
	passageTechnologyDefinition,
	passportJsTechnologyDefinition,
	ringcaptchaTechnologyDefinition,
	sapCustomerDataCloudSignInTechnologyDefinition,
	simplesamlphpTechnologyDefinition,
	socureTechnologyDefinition,
	superSocializerTechnologyDefinition,
	twilioAuthyTechnologyDefinition,
	uloginTechnologyDefinition,
	userbaseTechnologyDefinition,
	vouchedTechnologyDefinition,
	wwpassTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
