# HIIYAH eSIM App — Full-motion build, with honest limits

Created by OPS' Broker

## What this is
A store-ready app codebase for HIIYAH (telecom / EarthNet), built around open-source eSIM code, for white-label SIM / eSIM service.

It is NOT a magic way to provision real profiles on its own. Read the limits below before you submit or sell anything.

## What actually makes an eSIM work
1. A carrier / MVNO / white-label platform partner who owns network access and a GSMA-certified SM-DP+ server.
2. That partner issues an activation code: `LPA:1$<SM-DP+ address>$<Matching ID>` (plus a confirmation code, if required).
3. The phone's system eSIM setup opens that code and downloads the profile from the SM-DP+.
4. The app itself does NOT download the profile directly, except in special privileged cases (see below).

## Open-source code used here
- **OpenEUICC / EasyEUICC (GPLv3, estkme-group)** — fully free Local Profile Assistant (LPA) for Android.
  - OpenEUICC (privileged, system app): can manage internal eSIMs, Android 11+.
  - EasyEUICC (unprivileged, normal app): CANNOT manage a phone's built-in eSIM. It works only with removable eSIM chips / USB readers whose ARA-M field allowlists it.
  - Do not promise built-in eSIM management from EasyEUICC alone.
- **lpac (C, estkme-group)** — command-line LPA for testing on desktop / USB readers: `lpac profile download`, `lpac profile list`, `lpac profile enable`.
- **EasyLPAC** — GUI front end for lpac.
- **Universal-link provisioning (the store-app route used here)**:
  - iOS 17.4+: `https://esimsetup.apple.com/esim_qrcode_provisioning?carddata=<LPA_STRING>`
  - Android: `https://esimsetup.android.com/esim_qrcode_provisioning?carddata=<LPA_STRING>`
  - This opens the phone's own system eSIM setup. It needs no restricted carrier entitlement for the link itself, but success still depends on a real carrier profile, an unlocked device, and user confirmation. Test data will fail, by design.
  - React Native: `expo-esim-provisioning` (DanielMarkiel) follows this pattern. Flutter: `esim_universal_installer` + `esim_compatibility` follows the same pattern.
- **White-label route (fastest to actually sell)**:
  - Most MVNOs do NOT run their own SM-DP+. They use an MNO's infrastructure or an aggregator / white-label eSIM platform (for example G+D, IDEMIA, Thales, or a travel / telecom eSIM platform) that supplies SM-DP+, APIs, billing, and carrier agreements, with HIIYAH branding on the front end.
  - If you want HIIYAH live quickly, sign a white-label platform partner first, then point this app at their SM-DP+ / API. Building your own SM-DP+ requires GSMA SAS accreditation and GSMA Root Discovery Service onboarding — not a self-service step.

## App structure
- `src/App.tsx` — navigation: Shop, My eSIMs, Activate, Support
- `src/screens/ShopScreen.tsx` — plans (demo prices, replace with your partner's plans)
- `src/screens/ActivateScreen.tsx` — QR scan / manual LPA code entry, builds the Universal Link, opens system setup
- `src/screens/MyEsimsScreen.tsx` — local status only (installed / pending / used), no profile download
- `src/lib/esim.ts` — activation-string builder, validation, Universal Link builder
- `src/lib/config.ts` — partner config, all from environment variables, no secrets in code

## Demo mode vs live mode
- **Demo mode (this build, default):** plans and activation codes are samples. The system setup will open and then fail with test data — that is expected, and the app says so on screen.
- **Live mode:** set `HIIYAH_SMDP_PLUS`, `HIIYAH_PARTNER_API_URL`, and your partner API key in a secure environment / secret store (never in the repo). Only then can a real activation code be issued, and only for a device / profile your partner has actually created.

## What you still need to go live on the stores
1. Apple Developer account ($99/yr, organisation) + Google Play developer account ($25, one-time) — in HIIYAH's name, with signing keys you control.
2. A carrier / white-label platform partner + SM-DP+ address + test profiles + test EIDs (never production EIDs in test).
3. App Store / Play listing, privacy policy, terms, support contact, and data-handling answers (see `store-pack/`).
4. Store review — an app that claims arbitrary eSIM provisioning without a carrier partner will fail review. The Universal Link flow, with a real partner, is the reviewable route.
5. Billing, KYC / identity checks, taxes, and telecom compliance for the markets you sell in — get a telecom / legal adviser for those, this code does not cover them.

## Build (Expo / React Native, Android + iOS)
```
npm install
npx expo start
# Android: npx expo run:android
# iOS: npx expo run:ios  (physical device with eSIM hardware; simulators do not support eSIM)
```
For a native build, replace the demo screens with your partner's API client, keep the Universal Link flow, and do not add a custom LPA that bypasses the system setup on iOS.

## Licence note
OpenEUICC / EasyEUICC / lpac are GPLv3. If you ship their code, you must follow GPLv3 (source availability, licence notices). The HIIYAH app code in this folder is assigned to Jay Ladon Dickey Sr. EL under the existing ownership statement, except for third-party / open-source components, which remain under their own licences.

## Credit
Created by OPS' Broker — on the file, not burned into the app screens.
