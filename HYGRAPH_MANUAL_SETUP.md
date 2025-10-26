# Hygraph Manual Setup Guide - Type-Safe Schema

This guide walks you through manually creating the new type-safe content models in Hygraph UI.

---

## 📋 Overview

You'll create 9 content models total:
1. **IntroSection** (homepage intro)
2. **SocialLink** (social media links)
3. **Organization** (shared resource)
4. **AboutContent**
5. **ExperienceEntry**
6. **ProjectEntry**
7. **BlogEntry**
8. **LearningEntry**
9. **Section** (groups content)

**Estimated time**: 40-50 minutes

---

## 🏗️ Step-by-Step Instructions

### Step 1: Create IntroSection Model (Your name and title)

1. Go to **Schema** → **Add** → **Model**
2. Fill in:
   ```
   Display Name: Intro Section
   API ID (Singular): IntroSection
   API ID (Plural): introSections
   Description: Homepage introduction content
   ```
3. Click **Add Model**

#### Add IntroSection Fields

**Field 1: title**
- Click **Add Field** → **Single line text**
- Display Name: `Title`
- API ID: `title`
- ✅ Check **This field is required**
- Click **Add**

**Field 2: subTitle**
- Click **Add Field** → **Single line text**
- Display Name: `Sub Title`
- API ID: `subTitle`
- ✅ Check **This field is required**
- Click **Add**

**Field 3: description**
- Click **Add Field** → **Single line text**
- Display Name: `Description`
- API ID: `description`
- ✅ Check **This field is required**
- Click **Add**

**✅ IntroSection model complete!**

#### Create IntroSection Entry

Now create your intro content:

1. Go to **Content** → **IntroSection** → **Create Entry**
2. Fill in:
   - title: `Barun Prasad`
   - subTitle: `Frontend Evangelist`
   - description: `Transforming ideas into creative solutions.`
3. **Save** → **Publish**

**✅ Intro content created!**

---

### Step 2: Create SocialLink Model

1. Go to **Schema** → **Add** → **Model**
2. Fill in:
   ```
   Display Name: Social Link
   API ID (Singular): SocialLink
   API ID (Plural): socialLinks
   Description: Social media links
   ```
3. Click **Add Model**

#### Add SocialLink Fields

**Field 1: platform**
- Click **Add Field** → **Single line text**
- Display Name: `Platform`
- API ID: `platform`
- ✅ Check **This field is required**
- Click **Add**

**Field 2: url**
- Click **Add Field** → **Single line text**
- Display Name: `URL`
- API ID: `url`
- ✅ Check **This field is required**
- Click **Add**

**Field 3: icon**
- Click **Add Field** → **Single line text**
- Display Name: `Icon`
- API ID: `icon`
- ✅ Check **This field is required**
- Click **Add**

**Field 4: order**
- Click **Add Field** → **Integer**
- Display Name: `Order`
- API ID: `order`
- ✅ Check **This field is required**
- Click **Add**

**✅ SocialLink model complete!**

#### Create 4 SocialLink Entries

Go to **Content** → **SocialLink** → **Create Entry**

**Entry 1: GitHub**
- platform: `GitHub`
- url: `https://github.com/barunprasad`
- icon: `github`
- order: `1`
- **Save** → **Publish**

**Entry 2: LinkedIn**
- platform: `LinkedIn`
- url: `https://www.linkedin.com/in/barunprasad`
- icon: `linkedin`
- order: `2`
- **Save** → **Publish**

**Entry 3: Medium**
- platform: `Medium`
- url: `https://medium.com/@barunprasad`
- icon: `medium`
- order: `3`
- **Save** → **Publish**

**Entry 4: X**
- platform: `X`
- url: `https://x.com/iambarunprasad`
- icon: `twitter`
- order: `4`
- **Save** → **Publish**

**✅ All social links created!**

---

### Step 3: Create Organization Model (10 organizations to reuse)

**Why first?** Other models reference this.

1. Go to **Schema** → **Add** → **Model**
2. Fill in:
   ```
   Display Name: Organization
   API ID (Singular): Organization
   API ID (Plural): organizations
   Description: Shared organizations/companies
   ```
3. Click **Add Model**

#### Add Organization Fields

**Field 1: name**
- Click **Add Field** → **Single line text**
- Display Name: `Name`
- API ID: `name`
- ✅ Check **This field is required**
- ✅ Check **This field must be unique**
- Click **Add**

**Field 2: url**
- Click **Add Field** → **Single line text**
- Display Name: `URL`
- API ID: `url`
- ✅ Check **This field is required**
- Under **Validations** → **Match a specific pattern**
  - Add regex: `^https?://`
  - Error message: `Must be a valid URL`
- Click **Add**

**✅ Organization model complete!**

---

### Step 2: Create 10 Organization Entries

Now let's create the actual organizations before other content references them.

Go to **Content** → **Organization** → **Create Entry**

Create these 10 organizations:

1. **Code and Theory**
   - name: `Code and Theory`
   - url: `https://www.codeandtheory.com`
   - **Save** → **Publish**

2. **Moxe Health**
   - name: `Moxe Health`
   - url: `https://moxehealth.com`
   - **Save** → **Publish**

3. **Walmart Global Tech**
   - name: `Walmart Global Tech`
   - url: `https://tech.walmart.com`
   - **Save** → **Publish**

4. **HealthEdge**
   - name: `HealthEdge`
   - url: `https://www.healthedge.com`
   - **Save** → **Publish**

5. **Deloitte Consulting LLC**
   - name: `Deloitte Consulting LLC`
   - url: `https://www2.deloitte.com`
   - **Save** → **Publish**

6. **L&T Infotech**
   - name: `L&T Infotech`
   - url: `https://www.ltimindtree.com`
   - **Save** → **Publish**

7. **Pennsylvania Department of Human Services**
   - name: `Pennsylvania Department of Human Services`
   - url: `https://www.pa.gov`
   - **Save** → **Publish**

8. **MunichRe America**
   - name: `MunichRe America`
   - url: `https://www.munichre.com`
   - **Save** → **Publish**

9. **Travelers Insurance**
   - name: `Travelers Insurance`
   - url: `https://www.travelers.com`
   - **Save** → **Publish**

10. **Insurity**
    - name: `Insurity`
    - url: `https://insurity.com`
    - **Save** → **Publish**

**✅ All organizations created!**

---

### Step 4: Create AboutContent Model

1. **Schema** → **Add** → **Model**
2. Fill in:
   ```
   Display Name: About Content
   API ID (Singular): AboutContent
   API ID (Plural): aboutContents
   Description: Biography/About section content
   ```
3. Click **Add Model**

#### Add AboutContent Fields

**Field: description**
- Click **Add Field** → **Multi-line text**
- Display Name: `Description`
- API ID: `description`
- ✅ Check **This field is required**
- Click **Add**

**✅ AboutContent model complete!**

---

### Step 5: Create ExperienceEntry Model

1. **Schema** → **Add** → **Model**
2. Fill in:
   ```
   Display Name: Experience Entry
   API ID (Singular): ExperienceEntry
   API ID (Plural): experienceEntries
   Description: Work experience/job history
   ```
3. Click **Add Model**

#### Add ExperienceEntry Fields

**Field 1: duration**
- **Add Field** → **Single line text**
- Display Name: `Duration`
- API ID: `duration`
- ✅ Check **This field is required**
- Click **Add**

**Field 2: roles**
- **Add Field** → **Single line text**
- Display Name: `Roles`
- API ID: `roles`
- ✅ Check **This field is required**
- ✅ Check **Allow multiple values** (makes it a list)
- Click **Add**

**Field 3: location**
- **Add Field** → **Single line text**
- Display Name: `Location`
- API ID: `location`
- ✅ Check **This field is required**
- Click **Add**

**Field 4: tags**
- **Add Field** → **Single line text**
- Display Name: `Tags`
- API ID: `tags`
- ✅ Check **This field is required**
- ✅ Check **Allow multiple values**
- Click **Add**

**Field 5: description**
- **Add Field** → **Multi-line text**
- Display Name: `Description`
- API ID: `description`
- ✅ Check **This field is required**
- Click **Add**

**Field 6: organization** (Reference)
- **Add Field** → **Reference**
- Display Name: `Organization`
- API ID: `organization`
- ✅ Check **This field is required**
- Reference type: **Organization**
- ❌ Uncheck **Allow multiple values**
- **Two-way reference field**:
  - Display Name: `Experience Entries`
  - API ID: `experienceEntries`
  - ✅ Check **Allow multiple values**
  - ✅ Check **Hide field** (we don't need reverse lookup)
- Click **Add**

**Field 7: clientOrganization** (Optional Reference)
- **Add Field** → **Reference**
- Display Name: `Client Organization`
- API ID: `clientOrganization`
- ❌ **NOT required** (only for consulting roles)
- Reference type: **Organization**
- ❌ Uncheck **Allow multiple values**
- **Two-way reference field**:
  - Display Name: `Client Experience Entries`
  - API ID: `clientExperienceEntries`
  - ✅ Check **Allow multiple values**
  - ✅ Check **Hide field**
- Click **Add**

**✅ ExperienceEntry model complete!**

---

### Step 6: Create ProjectEntry Model

1. **Schema** → **Add** → **Model**
2. Fill in:
   ```
   Display Name: Project Entry
   API ID (Singular): ProjectEntry
   API ID (Plural): projectEntries
   Description: Portfolio projects
   ```
3. Click **Add Model**

#### Add ProjectEntry Fields

**Field 1: title**
- **Add Field** → **Single line text**
- Display Name: `Title`
- API ID: `title`
- ✅ Check **This field is required**
- Click **Add**

**Field 2: url**
- **Add Field** → **Single line text**
- Display Name: `URL`
- API ID: `url`
- ✅ Check **This field is required**
- Click **Add**

**Field 3: description**
- **Add Field** → **Multi-line text**
- Display Name: `Description`
- API ID: `description`
- ✅ Check **This field is required**
- Click **Add**

**Field 4: imageUrl**
- **Add Field** → **Single line text**
- Display Name: `Image URL`
- API ID: `imageUrl`
- ❌ NOT required
- Click **Add**

**Field 5: tags**
- **Add Field** → **Single line text**
- Display Name: `Tags`
- API ID: `tags`
- ✅ Check **This field is required**
- ✅ Check **Allow multiple values**
- Click **Add**

**✅ ProjectEntry model complete!**

---

### Step 6: Create BlogEntry Model

1. **Schema** → **Add** → **Model**
2. Fill in:
   ```
   Display Name: Blog Entry
   API ID (Singular): BlogEntry
   API ID (Plural): blogEntries
   Description: Blog posts and articles
   ```
3. Click **Add Model**

#### Add BlogEntry Fields

**Field 1: title**
- **Add Field** → **Single line text**
- Display Name: `Title`
- API ID: `title`
- ✅ Check **This field is required**
- Click **Add**

**Field 2: url**
- **Add Field** → **Single line text**
- Display Name: `URL`
- API ID: `url`
- ✅ Check **This field is required**
- Click **Add**

**Field 3: description**
- **Add Field** → **Multi-line text**
- Display Name: `Description`
- API ID: `description`
- ✅ Check **This field is required**
- Click **Add**

**Field 4: imageUrl**
- **Add Field** → **Single line text**
- Display Name: `Image URL`
- API ID: `imageUrl`
- ❌ NOT required
- Click **Add**

**Field 5: date**
- **Add Field** → **Single line text**
- Display Name: `Date`
- API ID: `date`
- ❌ NOT required
- Click **Add**

**✅ BlogEntry model complete!**

---

### Step 7: Create LearningEntry Model

1. **Schema** → **Add** → **Model**
2. Fill in:
   ```
   Display Name: Learning Entry
   API ID (Singular): LearningEntry
   API ID (Plural): learningEntries
   Description: Certifications and courses
   ```
3. Click **Add Model**

#### Add LearningEntry Fields

**Field 1: title**
- **Add Field** → **Single line text**
- Display Name: `Title`
- API ID: `title`
- ✅ Check **This field is required**
- Click **Add**

**Field 2: certificateUrl**
- **Add Field** → **Single line text**
- Display Name: `Certificate URL`
- API ID: `certificateUrl`
- ✅ Check **This field is required**
- Click **Add**

**Field 3: description**
- **Add Field** → **Multi-line text**
- Display Name: `Description`
- API ID: `description`
- ✅ Check **This field is required**
- Click **Add**

**Field 4: imageUrl**
- **Add Field** → **Single line text**
- Display Name: `Image URL`
- API ID: `imageUrl`
- ❌ NOT required
- Click **Add**

**Field 5: date**
- **Add Field** → **Single line text**
- Display Name: `Date`
- API ID: `date`
- ❌ NOT required
- Click **Add**

**Field 6: organization** (Optional Reference)
- **Add Field** → **Reference**
- Display Name: `Organization`
- API ID: `organization`
- ❌ NOT required
- Reference type: **Organization**
- ❌ Uncheck **Allow multiple values**
- **Two-way reference field**:
  - Display Name: `Learning Entries`
  - API ID: `learningEntries`
  - ✅ Check **Allow multiple values**
  - ✅ Check **Hide field**
- Click **Add**

**✅ LearningEntry model complete!**

---

### Step 8: Create Section Model

Since you deleted everything, we need to create the Section model from scratch.

1. **Schema** → **Add** → **Model**
2. Fill in:
   ```
   Display Name: Section
   API ID (Singular): Section
   API ID (Plural): sections
   Description: Groups content by type (about, experience, projects, etc.)
   ```
3. Click **Add Model**

#### Add Section Fields

**Field 1: order**
- **Add Field** → **Integer**
- Display Name: `Order`
- API ID: `order`
- ✅ Check **This field is required**
- ✅ Check **This field must be unique**
- Click **Add**

**Field 2: label**
- **Add Field** → **Single line text**
- Display Name: `Label`
- API ID: `label`
- ✅ Check **This field is required**
- **Under Validations** → **Make field accept only specific values (Enumeration)**
  - Add these values (one per line):
    - `about`
    - `experience`
    - `projects`
    - `blogs`
    - `learnings`
- Click **Add**

**Field 3: aboutContents**
- **Add Field** → **Reference**
- Display Name: `About Contents`
- API ID: `aboutContents`
- ❌ NOT required
- Reference type: **AboutContent**
- ✅ Check **Allow multiple values**
- Two-way reference:
  - Display Name: `Sections`
  - API ID: `sections`
  - ✅ Check **Allow multiple values**
  - ✅ Check **Hide field**
- Click **Add**

**Field 4: experienceEntries**
- **Add Field** → **Reference**
- Display Name: `Experience Entries`
- API ID: `experienceEntries`
- ❌ NOT required
- Reference type: **ExperienceEntry**
- ✅ Check **Allow multiple values**
- Two-way reference:
  - Display Name: `Sections`
  - API ID: `sections`
  - ✅ Check **Allow multiple values**
  - ✅ Check **Hide field**
- Click **Add**

**Field 5: projectEntries**
- **Add Field** → **Reference**
- Display Name: `Project Entries`
- API ID: `projectEntries`
- ❌ NOT required
- Reference type: **ProjectEntry**
- ✅ Check **Allow multiple values**
- Two-way reference:
  - Display Name: `Sections`
  - API ID: `sections`
  - ✅ Check **Allow multiple values**
  - ✅ Check **Hide field**
- Click **Add**

**Field 6: blogEntries**
- **Add Field** → **Reference**
- Display Name: `Blog Entries`
- API ID: `blogEntries`
- ❌ NOT required
- Reference type: **BlogEntry**
- ✅ Check **Allow multiple values**
- Two-way reference:
  - Display Name: `Sections`
  - API ID: `sections`
  - ✅ Check **Allow multiple values**
  - ✅ Check **Hide field**
- Click **Add**

**Field 7: learningEntries**
- **Add Field** → **Reference**
- Display Name: `Learning Entries`
- API ID: `learningEntries`
- ❌ NOT required
- Reference type: **LearningEntry**
- ✅ Check **Allow multiple values**
- Two-way reference:
  - Display Name: `Sections`
  - API ID: `sections`
  - ✅ Check **Allow multiple values**
  - ✅ Check **Hide field**
- Click **Add**

**✅ Section model created!**

---

## 🎉 Schema Creation Complete!

You now have 9 content models with full type safety!

### ✅ What You've Built:
- IntroSection (model + 1 entry created)
- SocialLink (model + 4 entries created)
- Organization (model + 10 entries created)
- AboutContent (model created)
- ExperienceEntry (model created)
- ProjectEntry (model created)
- BlogEntry (model created)
- LearningEntry (model created)
- Section (model created with label enumeration)

---

## 📝 Next Steps

1. **Migrate Content** - See `HYGRAPH_CONTENT_MIGRATION.md` for how to add your actual content
2. **Update GraphQL Queries** - Update the Hygraph provider to use new queries
3. **Test** - Switch to `DATA_SOURCE=hygraph` in your `.env.local` and test

---

## 💡 Tips

- **Use Duplicate**: After creating your first experience entry, use the **Duplicate** button for faster entry
- **Draft vs Published**: Remember to **Publish** entries, not just save them
- **Organization References**: You can search and select organizations when creating experience/learning entries
- **Validation**: Hygraph will now enforce required fields - no more accidentally missing data!

---

## 🔍 Verify Your Schema

Go to **Schema** view and verify you see:
- ✅ IntroSection (3 fields: title, subTitle, description)
- ✅ SocialLink (4 fields: platform, url, icon, order)
- ✅ Organization (2 fields: name, url)
- ✅ AboutContent (1 field: description)
- ✅ ExperienceEntry (7 fields including 2 organization references)
- ✅ ProjectEntry (5 fields)
- ✅ BlogEntry (5 fields)
- ✅ LearningEntry (6 fields including 1 organization reference)
- ✅ Section (2 fields: order, label + 5 reference fields = 7 total)

---

## 🔔 Step 9: Configure Webhooks for Automatic Revalidation

After deploying to Vercel, set up webhooks so your site updates immediately when you change content in Hygraph.

### Prerequisites

1. Your site must be deployed to Vercel
2. You need a secret token for security

### A. Generate Revalidation Secret

1. Generate a random secret (e.g., using a password generator or run this in terminal):
   ```bash
   openssl rand -base64 32
   ```
2. Copy the generated secret (you'll need it twice)

### B. Add Environment Variable in Vercel

1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add a new variable:
   - **Key**: `REVALIDATE_SECRET`
   - **Value**: (paste the secret you generated)
   - **Environment**: Select all (Production, Preview, Development)
3. Click **Save**
4. **Redeploy** your site for the environment variable to take effect

### C. Configure Hygraph Webhook

1. In Hygraph, go to **App Settings** (gear icon) → **Webhooks**
2. Click **Create Webhook**
3. Fill in the webhook details:

   **Basic Settings:**
   - **Name**: `Vercel Revalidation`
   - **Description**: `Trigger ISR revalidation on content changes`
   - **Include payload**: ☐ Unchecked (we don't need the payload)
   - **Method**: `POST`
   - **URL**: `https://YOUR_DOMAIN.vercel.app/api/revalidate`
     - Replace `YOUR_DOMAIN` with your actual Vercel domain
     - Example: `https://www.barunprasad.com/api/revalidate`
     - ⚠️ **Note**: No secret in the URL! We'll use a header instead (more secure)
   - **Secret key**: Leave empty (we're using custom header auth)

   **Headers** (scroll down to find this section):
   - Click **+ Add** to add a custom header
   - **Key**: `X-Revalidate-Secret`
   - **Value**: (paste your generated secret here)
   - This passes the secret securely via HTTP header instead of URL

   **Triggers:**
   - ✅ **Content Model**: Select all your content models:
     - IntroSection
     - SocialLink
     - AboutContent
     - ExperienceEntry
     - ProjectEntry
     - BlogEntry
     - LearningEntry
     - Section

   **Actions to trigger on:**
   - ✅ **Create** (when new content is published)
   - ✅ **Update** (when existing content is updated)
   - ✅ **Publish** (when content is published)
   - ⚠️ **Unpublish** (optional - check if you want to refresh on unpublish)
   - ⚠️ **Delete** (optional - check if you want to refresh on delete)

   **Stages:**
   - ✅ **PUBLISHED** (only trigger on published content)

   **Sources:**
   - Leave as "Select..." (no selection needed)

4. Click **Create Webhook**

### D. Test Your Webhook

1. In Hygraph, go to **Content** → **IntroSection**
2. Edit your intro section (e.g., change the description)
3. Click **Save** → **Publish**
4. Go back to **App Settings** → **Webhooks**
5. Click on your webhook → **Logs** tab
6. You should see a successful request (Status 200) with response:
   ```json
   {
     "revalidated": true,
     "message": "Successfully revalidated home page",
     "timestamp": "2025-10-26T..."
   }
   ```
7. Visit your deployed site - you should see the updated content!

### E. Troubleshooting

**Webhook returns 401 (Invalid or missing authentication token):**
- Check that the `X-Revalidate-Secret` header value in Hygraph webhook matches `REVALIDATE_SECRET` in Vercel
- Ensure the header key is exactly `X-Revalidate-Secret` (case-insensitive)
- Verify you redeployed Vercel after adding the environment variable

**Webhook returns 500 (Server error):**
- Check Vercel function logs for errors
- Verify your Hygraph API token (HYGRAPH_TOKEN) is correct

**Content doesn't update:**
- Allow 1-2 seconds for revalidation to complete
- Hard refresh your browser (Cmd+Shift+R or Ctrl+Shift+R)
- Check that you published (not just saved) your changes
- Verify webhook logs in Hygraph show Status 200

**Time-based fallback:**
- Even without webhooks, your site will refresh content every hour (3600 seconds)
- This ensures content stays fresh even if webhooks fail

**Security Note:**
- ✅ Secret is passed via HTTP header (more secure than URL)
- ✅ Headers are rarely logged and not visible in browser history
- ✅ Better protection against accidental exposure

---

## 🎯 How It Works

1. **You change content in Hygraph** and click Publish
2. **Hygraph webhook fires** immediately with custom `X-Revalidate-Secret` header
3. **Vercel receives webhook** at `/api/revalidate` and validates the header
4. **Next.js revalidates** the home page
5. **Fresh content appears** on next visit (usually within 1-2 seconds)

### Benefits:
- ✅ Content updates within seconds
- ✅ Stays in Vercel free tier (ISR is free)
- ✅ No manual deployments needed
- ✅ SEO-friendly (content is still statically generated)
- ✅ Fast page loads (pages are cached until revalidation)
- ✅ Secure authentication via HTTP headers (not exposed in URLs)

---

**You're ready to migrate your content!** 🚀
