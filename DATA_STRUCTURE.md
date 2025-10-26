# Portfolio Data Structure - Type-Safe Architecture

## 📋 Overview

This portfolio now uses a **type-safe, discriminated union** approach for content management, replacing the previous generic `ArticleType` with specific content models.

---

## ✨ Benefits of New Structure

| Aspect | Before | After |
|--------|--------|-------|
| **Type Safety** | ❌ All fields optional | ✅ Required fields enforced |
| **IntelliSense** | ❌ 10+ irrelevant fields | ✅ Only relevant fields |
| **Maintainability** | ❌ Hard to understand | ✅ Self-documenting |
| **Data Validation** | ❌ No enforcement | ✅ Compile-time checks |
| **Organization Reuse** | ❌ Duplicated data | ✅ Single source of truth |

---

## 📁 File Structure

```
src/
├── types/
│   └── content/
│       ├── Organization.ts          # Shared organization type
│       ├── AboutContent.ts          # About section type
│       ├── ExperienceEntry.ts       # Work experience type
│       ├── ProjectEntry.ts          # Project type
│       ├── BlogEntry.ts             # Blog post type
│       ├── LearningEntry.ts         # Certification type
│       ├── Section.ts               # Discriminated union
│       └── index.ts                 # Exports all types
│
├── data/
│   ├── organizations.ts             # ✨ NEW: Shared organizations
│   ├── about.ts                     # Type-safe about data
│   ├── experience.ts                # Type-safe experience data
│   ├── projects.ts                  # Type-safe project data
│   ├── blogs.ts                     # Type-safe blog data
│   ├── learning.ts                  # Type-safe learning data
│   └── index.ts                     # Aggregates all sections
│
└── lib/
    └── data-provider/
        ├── types.ts                 # Provider interface
        ├── local-provider.ts        # ✅ Uses new types
        ├── hygraph-provider.ts      # ⚠️ Temporary type casts
        └── index.ts                 # Provider factory
```

---

## 🎯 Type Definitions

### Base Types

#### Organization (Shared Resource)
```typescript
type Organization = {
  id: string;      // e.g., "code-and-theory"
  name: string;    // e.g., "Code and Theory"
  url: string;     // e.g., "https://www.codeandtheory.com"
};
```

### Content Types

#### AboutContent
```typescript
type AboutContent = {
  description: string;  // Biography text
};
```

#### ExperienceEntry
```typescript
type ExperienceEntry = {
  duration: string;              // Required: "Jun 2025 - Present"
  roles: string[];               // Required: ["Director of Technology"]
  location: string;              // Required: "Bengaluru"
  organization: Organization;    // Required: Reference to org
  clientOrganization?: Organization; // Optional: For consulting
  tags: string[];                // Required: ["React", "TypeScript"]
  description: string;           // Required: Job description
};
```

#### ProjectEntry
```typescript
type ProjectEntry = {
  title: string;        // Required: "Arctic Design Kit"
  url: string;          // Required: Project URL
  description: string;  // Required: Project description
  imageUrl?: string;    // Optional: Thumbnail
  tags: string[];       // Required: Technologies
};
```

#### BlogEntry
```typescript
type BlogEntry = {
  title: string;        // Required: Blog title
  url: string;          // Required: Blog URL
  description: string;  // Required: Blog summary
  imageUrl?: string;    // Optional: Cover image
  date?: string;        // Optional: Publication date
};
```

#### LearningEntry
```typescript
type LearningEntry = {
  title: string;            // Required: Course name
  certificateUrl: string;   // Required: Certificate URL
  description: string;      // Required: Course description
  imageUrl?: string;        // Optional: Certificate image
  date?: string;            // Optional: Completion date
  organization?: Organization; // Optional: Issuing org
};
```

### Section Type (Discriminated Union)

```typescript
type Section<T extends SectionContent['type'] = SectionContent['type']> = {
  label: T;  // "about" | "experience" | "projects" | "blogs" | "learnings"
  content: Extract<SectionContent, { type: T }>['items'];
  footerLinks?: Array<{ href: string; label: string }>;
};
```

**Type Safety Example:**
```typescript
// ✅ TypeScript knows exactly what fields are available!
const experienceSection: Section<'experience'> = {
  label: 'experience',
  content: [{
    duration: 'Jun 2025 - Present',
    roles: ['Director of Technology'],
    location: 'Bengaluru',
    organization: ORGANIZATIONS.CODE_AND_THEORY,
    tags: ['React', 'TypeScript'],
    description: '...'
    // ❌ TypeScript ERROR if you try to add "title" here!
  }]
};
```

---

## 🔄 Data Provider Pattern

### Local Provider (Type-Safe)
```typescript
export class LocalDataProvider implements DataProvider {
  async getSections(): Promise<Section[]> {
    return ArticleSectionData; // Fully typed!
  }
}
```

### Hygraph Provider (Bridge Solution)
```typescript
export class HygraphDataProvider implements DataProvider {
  async getSections(): Promise<Section[]> {
    // ⚠️ Uses type casts until Hygraph schema is migrated
    // Transforms old generic Article to new typed Section
  }
}
```

---

## 📊 Data Examples

### Shared Organizations
```typescript
// src/data/organizations.ts
export const ORGANIZATIONS: Record<string, Organization> = {
  CODE_AND_THEORY: {
    id: 'code-and-theory',
    name: 'Code and Theory',
    url: 'https://www.codeandtheory.com',
  },
  // ... 9 more organizations
};
```

### Experience Data
```typescript
// src/data/experience.ts
export const ExperienceData: ExperienceEntry[] = [
  {
    duration: 'Jun 2025 - Present',
    roles: ['Director of Technology'],
    location: 'Bengaluru',
    organization: ORGANIZATIONS.CODE_AND_THEORY, // ✅ Reused!
    tags: ['React', 'Next.js', 'TypeScript'],
    description: '...',
  },
  // ... 9 more entries
];
```

---

## 🚀 Usage

### Switching Data Sources

```env
# .env.local

# Use local typed data (current)
DATA_SOURCE=local

# Use Hygraph (with new typed schema)
DATA_SOURCE=hygraph
```

### Consuming Data in Components

```typescript
// src/app/page.tsx
export default async function Index() {
  const sections = await getSections(); // Type: Section[]

  // TypeScript knows the exact type for each section!
  return <DetailSection sections={sections} />;
}
```

---

## 🔄 Migration Status

### ✅ Completed
- [x] New type definitions created
- [x] Shared organizations data
- [x] All local data migrated to new types
- [x] Local data provider using new types
- [x] Components updated to use Section type
- [x] Hygraph provider bridge (temporary casts)
- [x] Tested with local data source

### ⏳ Pending
- [ ] Update Hygraph schema with typed models
- [ ] Remove type casts from Hygraph provider
- [ ] Migrate Hygraph content to new schema
- [ ] Delete old backup files (*.old.ts)

---

## 📝 Next Steps

### 1. Update Hygraph Schema (When Ready)

Create these models in Hygraph:
- `Organization` (shared)
- `AboutContent`
- `ExperienceEntry`
- `ProjectEntry`
- `BlogEntry`
- `LearningEntry`
- `Section` (updated with typed references)

### 2. Migrate Content

Move your current Hygraph articles to the new typed models.

### 3. Update Hygraph Provider

Remove type casts and use proper typed GraphQL queries.

### 4. Cleanup

```bash
# Remove old backup files
rm src/data/*.old.ts
```

---

## 🎓 Key Learnings

### Before: Generic Anti-Pattern ❌
```typescript
type ArticleType = {
  title?: string;
  url?: string;
  duration?: string;
  roles?: string[];
  location?: string;
  organization?: {...};
  // ... 10+ optional fields
};
```

**Problems:**
- No type safety
- Confusing API
- Can't enforce required fields
- Hard to maintain

### After: Discriminated Union ✅
```typescript
type ExperienceEntry = {
  duration: string;        // Required!
  roles: string[];         // Required!
  organization: Organization; // Required!
  // ... Only relevant fields
};

type Section<T> = {
  label: T;
  content: Extract<...>['items']; // Type-safe!
};
```

**Benefits:**
- Full type safety
- Clear intent
- Enforced validation
- Self-documenting

---

## 🤝 Contributing

When adding new content:

1. **Use typed data files** - Add to `src/data/[type].ts`
2. **Reuse organizations** - Reference from `ORGANIZATIONS` constant
3. **Follow type definitions** - TypeScript will guide you
4. **Test locally first** - Use `DATA_SOURCE=local`

---

## 📚 Resources

- TypeScript Discriminated Unions: https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html
- Type-safe API design patterns
- Hygraph schema best practices

---

**Result**: A professional, type-safe, maintainable data architecture! 🎉
