// Activate — QR / manual LPA code -> system eSIM setup via Universal Link.
// This screen does NOT download a profile itself. The phone's system setup does that.
import { buildLpaString, isValidLpaString, universalLink } from '../lib/esim';
import { config } from '../lib/config';
export function activate(lpa: string, platform: 'ios' | 'android'): string {
  if (!isValidLpaString(lpa)) throw new Error('That activation code is not in LPA:1$SM-DP+$Matching ID form.');
  if (config.demoMode) {
    // Demo: opening the link will fail in system setup, by design. Tell the user that.
    console.warn('HIIYAH demo mode: test activation codes will fail in system setup. Use a real partner code for live activation.');
  }
  return universalLink(lpa, platform);
}
export function activateFromParts(smdp: string, matchingId: string, confirmationCode: string | undefined, platform: 'ios' | 'android'): string {
  return activate(buildLpaString(smdp, matchingId, confirmationCode), platform);
}
