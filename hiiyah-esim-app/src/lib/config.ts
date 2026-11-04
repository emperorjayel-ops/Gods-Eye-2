// Partner config — set from secure environment only. Demo defaults are NOT live.
export const config = {
  demoMode: true, // set false only with a real partner SM-DP+ / API
  smdpPlus: process.env.HIIYAH_SMDP_PLUS ?? 'demo.smdp.hiiyah.example',
  partnerApiUrl: process.env.HIIYAH_PARTNER_API_URL ?? '',
  brand: 'HIIYAH',
  supportEmail: 'support@hiiyah.example', // replace with your real support address
};
