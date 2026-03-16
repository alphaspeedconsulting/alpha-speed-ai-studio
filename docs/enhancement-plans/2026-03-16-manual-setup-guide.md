# Manual Setup Guide: GA4 Conversion Tracking & Engagement Optimization

Follow these steps to activate the features deployed in the code. Until completed, the site works with email fallbacks.

---

## 1. GA4 Key Events (5 min)

**Where:** [GA4 Admin Console](https://analytics.google.com/) → your AlphaSpeedAI property

1. Go to **Admin** (gear icon) → **Events** (under Data display)
2. You should see these events appearing after the code deploys and gets traffic:
   - `generate_lead`
   - `schedule_appointment`
   - `sign_up`
   - `form_submit`
3. For each one, toggle **"Mark as key event"** (the toggle on the right)
4. Verify in **Reports → Conversions** that they appear

**Note:** Events won't show in the list until they've fired at least once. After deploying, visit the site, click the booking CTA and submit the email form to trigger them. Then check back in GA4 (can take 24-48 hours).

---

## 2. Calendly Setup (10 min)

**What this unlocks:** Replaces the current mailto fallback with an in-page booking popup.

1. Create a Calendly account at [calendly.com](https://calendly.com) (free tier works)
2. Create an event type:
   - Name: "Free Strategy Call" (or similar)
   - Duration: 30 min (recommended)
   - Availability: set your available hours
3. Copy the event URL — it looks like: `https://calendly.com/your-username/30min`
4. Add to your `.env` file:
   ```
   VITE_CALENDLY_URL=https://calendly.com/your-username/30min
   ```
5. Redeploy the site

**How to test:** Click "Book a Free Strategy Call" on the homepage — should open a Calendly popup instead of opening your email client.

---

## 3. Supabase: email_subscribers Table (5 min)

**What this unlocks:** The email capture form on the homepage will persist subscribers.

Run this SQL in [Supabase SQL Editor](https://supabase.com/dashboard) for your project:

```sql
-- Create the email subscribers table
CREATE TABLE IF NOT EXISTS email_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  source TEXT DEFAULT 'direct',
  utm_params JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow inserts from the anon key (public form submissions)
CREATE POLICY "Allow public inserts" ON email_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only allow reads from authenticated/service role (not public)
CREATE POLICY "Service role can read" ON email_subscribers
  FOR SELECT
  TO authenticated
  USING (true);
```

**How to test:** Submit an email on the homepage → check the `email_subscribers` table in Supabase Table Editor.

---

## 4. LinkedIn Insight Tag (5 min)

**What this unlocks:** Retargeting visitors on LinkedIn + LinkedIn conversion tracking.

1. Go to [LinkedIn Campaign Manager](https://www.linkedin.com/campaignmanager/)
2. Create an ad account (if you don't have one — free to create, no spend required)
3. Go to **Analyze → Insight Tag**
4. Copy your **Partner ID** (a numeric string like `1234567`)
5. Add to your `.env` file:
   ```
   VITE_LINKEDIN_PARTNER_ID=1234567
   ```
6. Redeploy the site

**How to verify:** After deploying, go to Campaign Manager → Insight Tag → it should show "Active" within a few hours.

---

## 5. UTM Parameters on All Links (Ongoing)

**What this unlocks:** Correctly attributes traffic in GA4 instead of everything showing as "Direct."

### Format
```
https://alphaspeedai.com?utm_source=SOURCE&utm_medium=MEDIUM&utm_campaign=CAMPAIGN
```

### Quick reference for your channels

| Platform | Link to use |
|----------|-------------|
| LinkedIn bio | `https://alphaspeedai.com?utm_source=linkedin&utm_medium=social&utm_campaign=bio` |
| LinkedIn post | `https://alphaspeedai.com?utm_source=linkedin&utm_medium=social&utm_campaign=POSTNAME` |
| Instagram bio | `https://alphaspeedai.com?utm_source=instagram&utm_medium=social&utm_campaign=bio` |
| Email signature | `https://alphaspeedai.com?utm_source=email&utm_medium=email&utm_campaign=signature` |
| Email campaign | `https://alphaspeedai.com?utm_source=email&utm_medium=email&utm_campaign=CAMPAIGN_NAME` |
| Twitter/X post | `https://alphaspeedai.com?utm_source=twitter&utm_medium=social&utm_campaign=POSTNAME` |
| TikTok bio | `https://alphaspeedai.com?utm_source=tiktok&utm_medium=social&utm_campaign=bio` |

Replace `POSTNAME` / `CAMPAIGN_NAME` with a short slug (e.g., `march-agents-launch`).

**Bonus:** When visitors arrive with `utm_source=linkedin|instagram|facebook|twitter|tiktok`, the hero headline automatically changes to a social-optimized variant.

---

## 6. Meta Pixel (Optional, 5 min)

Already supported in code. If you have a Meta Pixel ID:

```
VITE_META_PIXEL_ID=your-pixel-id
```

---

## Checklist

- [ ] GA4: Mark `generate_lead`, `schedule_appointment`, `sign_up`, `form_submit` as Key Events
- [ ] Calendly: Create account, event type, add `VITE_CALENDLY_URL` to `.env`
- [ ] Supabase: Run SQL to create `email_subscribers` table
- [ ] LinkedIn: Get Partner ID, add `VITE_LINKEDIN_PARTNER_ID` to `.env`
- [ ] UTM: Update all social bios and link-in-bio tools with UTM params
- [ ] Redeploy after `.env` changes
- [ ] Test: Click booking CTA → Calendly popup opens
- [ ] Test: Submit email capture → row appears in Supabase
- [ ] Test: Visit with `?utm_source=linkedin` → social hero variant shows
