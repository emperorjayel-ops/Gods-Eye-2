// HIIYAH eSIM — activation helpers. Demo-safe: no secrets, no profile download.
export function buildLpaString(smdp: string, matchingId: string, confirmationCode?: string): string {
  const base = `LPA:1$${smdp.trim()}$${matchingId.trim()}`;
  return confirmationCode ? `${base}$${confirmationCode.trim()}` : base;
}
export function isValidLpaString(s: string): boolean {
  return /^LPA:1\$[^$]+\$[^$]+(\$[^$]+)?$/.test(s.trim());
}
export function universalLink(lpa: string, platform: 'ios' | 'android'): string {
  const carddata = encodeURIComponent(lpa);
  return platform === 'ios'
    ? `https://esimsetup.apple.com/esim_qrcode_provisioning?carddata=${carddata}`
    : `https://esimsetup.android.com/esim_qrcode_provisioning?carddata=${carddata}`;
}
