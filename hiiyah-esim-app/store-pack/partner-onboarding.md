# HIIYAH — What to ask a white-label / carrier partner (send this as-is)

1. SM-DP+ address for consumer profiles (SGP.22)
2. Partner API base URL, auth method, and test API key
3. Plan list with plan IDs, data, validity, and wholesale price
4. Order flow: create order -> activation code format -> expiry (hours) -> re-download policy
5. Confirmation code: required or not, and how it is delivered to the customer
6. Test profiles + test EIDs for iPhone (iOS 17.4+) and Android (API 28+)
7. Webhook / status updates: pending, ready, installed, failed
8. Branding: profile name / service provider name shown on device, APN, support contact
9. Billing, taxes, KYC requirements, and markets allowed
10. Support SLA and escalation contact for failed activations

When you get answers 1-3, I can wire the HttpPartner adapter in one step — no app redesign needed.
