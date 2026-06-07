import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, User, ChevronRight, MessageCircle, ArrowLeft, CheckCircle } from "lucide-react";
import FadeInSection from "@/components/ui/FadeInSection";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://royalgad-industries-ltd.vercel.app'

const blogPosts: Record<string, { title: string; content: string; date: string; category: string; author: string }> = {
  "eid-mubarak-2026": {
    title: "EID MUBARAK — RoyalGad Wishes You a Blessed Celebration",
    date: "2026-06-03",
    category: "Company News",
    author: "RoyalGad",
    content: `
Eid Mubarak from all of us at RoyalGad AG Industries Ltd!

## A Message of Peace and Blessings

As we celebrate this blessed occasion, we extend our warmest wishes to you and your family. May this Eid bring joy, peace, and prosperity to your home.

## Celebrating Together

Eid is a time for family, gratitude, and giving. At RoyalGad, we are grateful for your continued trust and partnership. It is because of you that we have grown from a small seed into a nationally trusted brand.

## Stay Safe This Celebration

As you gather with loved ones, remember to maintain good hygiene practices:
- Wash hands regularly with RoyalGad Hand Wash
- Disinfect high-touch surfaces with RoyalGad Germicide
- Keep hand sanitizer handy for guests

From our family to yours — Eid Mubarak! May your celebrations be filled with joy and blessings.`,
  },
  "happy-childrens-day-2026": {
    title: "Happy Children's Day — RoyalGad Celebrates Every Child",
    date: "2026-05-27",
    category: "Company News",
    author: "RoyalGad",
    content: `
Happy Children's Day from RoyalGad AG Industries Ltd!

## Celebrating the Future

Children are the future of Nigeria. At RoyalGad, we believe every child deserves a healthy, happy environment to grow and thrive.

## Protecting Little Ones

Keeping children safe from germs is a top priority for every parent. Here are some tips for a child-safe home:

- Use child-friendly disinfectants for surfaces they touch
- Teach proper hand washing with RoyalGad Hand Wash
- Keep hand sanitizer accessible (but out of reach of toddlers)
- Disinfect toys and play areas regularly

## Our Commitment

RoyalGad is committed to manufacturing safe, NAFDAC-approved products that protect Nigerian families. When you choose RoyalGad, you choose safety for your children.

Wishing all children a day filled with joy, laughter, and endless possibilities!`,
  },
  "lysol-disinfectant-for-farmers": {
    title: "RoyalGad Lysol Disinfectant for Farmers — Protect Your Livestock",
    date: "2026-05-30",
    category: "Product Updates",
    author: "RoyalGad",
    content: `
RoyalGad Lysol Disinfectant is not just for homes and hospitals — it's also an essential tool for farmers.

## Why Farmers Need RoyalGad Lysol Disinfectant

Livestock farms, poultry houses, and fish farms require strict hygiene to prevent disease outbreaks. RoyalGad Lysol Disinfectant provides broad-spectrum protection against bacteria, viruses, and fungi.

## Key Benefits for Farmers

- **Disease Prevention:** Regular disinfection reduces the risk of avian flu, swine fever, and other livestock diseases
- **Cost-Effective:** Concentrated formula goes further — save on cleaning costs
- **Easy to Use:** Simple dilution instructions for different farm areas
- **NAFDAC Approved:** Fully registered and safe when used as directed
- **Versatile:** Suitable for poultry houses, piggeries, cattle pens, and fish ponds

## How to Use on the Farm

1. Remove animals from the area before disinfecting
2. Clean all surfaces thoroughly with water and detergent
3. Dilute RoyalGad Lysol Disinfectant according to the chart on the label
4. Apply using a sprayer or mop
5. Allow surfaces to dry completely before returning animals

## Where to Buy

RoyalGad Lysol Disinfectant is available for bulk purchase directly from our factory in Ibadan. We deliver nationwide.

Contact us today to place your farm order!`,
  },
  "5-hidden-germ-spots-in-your-home": {
    title: "5 Hidden Germ Spots in Your Home You're Ignoring",
    date: "2026-05-20",
    category: "Hygiene Tips",
    author: "RoyalGad",
    content: `
Think your home is clean? You might be surprised where germs are hiding. Here are five hidden germ spots most people overlook.

## 1. Kitchen Sponges

Your kitchen sponge is one of the germiest items in your home. Studies show it can harbor more bacteria than a toilet seat. Replace sponges weekly or microwave them damp for 2 minutes to kill germs.

**Solution:** Disinfect your sink area with RoyalGad Germicide after washing dishes.

## 2. Remote Controls

We handle remote controls constantly but rarely clean them. TV remotes, game controllers, and thermostat panels are touched by multiple family members daily.

**Solution:** Wipe down remotes with a disinfectant wipe or spray weekly.

## 3. Toothbrush Holders

Toothbrush holders can collect bacteria from splashing water and wet toothbrushes. The dark, humid environment is perfect for mold and bacterial growth.

**Solution:** Clean toothbrush holders weekly with hot, soapy water and disinfect.

## 4. Door Handles and Light Switches

These high-touch surfaces are touched dozens of times daily but are often forgotten during cleaning. They can harbor cold and flu viruses for up to 48 hours.

**Solution:** Wipe door handles and light switches daily with RoyalGad Pine Disinfectant.

## 5. Reusable Shopping Bags

If you use reusable shopping bags, they can collect bacteria from raw meat juices, produce dirt, and more. Most people never wash them.

**Solution:** Wash fabric bags regularly and wipe down insulated bags with disinfectant.

## Final Tip

A good rule of thumb: if you touch it regularly, it needs regular disinfection. RoyalGad Germicide and Pine Disinfectant are perfect for daily home cleaning routines.`,
  },
  "how-to-disinfect-home": {
    title: "How to Properly Disinfect Your Home Against Germs",
    date: "2026-05-15",
    category: "Hygiene Tips",
    author: "RoyalGad",
    content: `
Keeping your home clean and germ-free is essential for the health of your family. While regular cleaning removes dirt and dust, disinfection goes a step further by killing harmful bacteria and viruses.

## Why Disinfection Matters

Germs can survive on surfaces for hours or even days. High-touch areas like door handles, light switches, countertops, and phones are especially vulnerable to harboring harmful microorganisms.

## Step-by-Step Disinfection Guide

### 1. Clean Before You Disinfect
Always clean surfaces with soap and water or a household cleaner before applying disinfectant. Disinfectants work best on clean surfaces.

### 2. Choose the Right Disinfectant
Use a NAFDAC-approved disinfectant like RoyalGad Germicide or Pine Disinfectant. Check the label to ensure it's effective against the specific germs you're targeting.

### 3. Apply Correctly
Follow the instructions on the label. Most disinfectants need to stay wet on the surface for a specific amount of time (dwell time) to be effective — typically 5-10 minutes.

### 4. Focus on High-Touch Areas
Pay special attention to: door handles, light switches, remote controls, phones, kitchen counters, bathroom fixtures, and railings.

### 5. Ventilate
Ensure proper ventilation when using disinfectants. Open windows or use fans to circulate fresh air.

## Recommended Products

For home disinfection, RoyalGad Germicide and RoyalGad Pine Disinfectant are excellent choices. Both are NAFDAC-approved and effective against a broad spectrum of germs.

## When to Disinfect

- Daily: High-touch surfaces in homes with children or sick family members
- Weekly: General home disinfection
- As needed: After having guests, when someone is ill, or after handling raw food

Remember, disinfection is a powerful tool in maintaining a healthy home, but it should be part of a comprehensive hygiene routine that includes regular hand washing and proper food handling.`,
  },
  "antiseptic-vs-disinfectant": {
    title: "The Difference Between Antiseptic and Disinfectant",
    date: "2026-05-08",
    category: "Hygiene Tips",
    author: "RoyalGad",
    content: `
Many people use the terms "antiseptic" and "disinfectant" interchangeably, but they serve different purposes. Understanding the difference is crucial for proper hygiene.

## What Is an Antiseptic?

An antiseptic is a substance that kills or inhibits the growth of microorganisms on living tissue. They are designed for use on skin and wounds.

**Common uses:** Cleaning wounds, hand sanitizing, pre-surgical preparation.

**Examples:** RoyalGad Antiseptic, hand sanitizers, rubbing alcohol.

## What Is a Disinfectant?

A disinfectant is a chemical agent used on non-living surfaces and objects to destroy microorganisms. They are stronger than antiseptics and should not be used on skin.

**Common uses:** Cleaning countertops, floors, bathroom surfaces, medical equipment.

**Examples:** RoyalGad Germicide, RoyalGad Pine Disinfectant, bleach solutions.

## Key Differences

| Feature | Antiseptic | Disinfectant |
|---------|-----------|-------------|
| Used on | Living tissue (skin, wounds) | Non-living surfaces |
| Strength | Gentle enough for skin | Stronger formulation |
| Examples | Antiseptic solution, hand sanitizer | Germicide, surface cleaners |
| Dwell time | Varies by product | Typically 5-10 minutes |

## When to Use Each

**Use an antiseptic when:**
- Cleaning a cut or wound
- Sanitizing your hands
- Preparing skin for injection

**Use a disinfectant when:**
- Cleaning kitchen counters
- Disinfecting bathroom surfaces
- Sanitizing high-touch areas like door handles
- Cleaning medical equipment

## RoyalGad Products

RoyalGad offers both options:
- **RoyalGad Antiseptic** — for wound cleaning and personal hygiene
- **RoyalGad Germicide** — for surface disinfection
- **RoyalGad Hand Sanitizer** — for hand hygiene on the go

Always read product labels and follow instructions for proper use and safety.`,
  },
  "why-nafdac-registration-matters": {
    title: "Why NAFDAC Registration Matters for Hygiene Products",
    date: "2026-04-28",
    category: "Industry",
    author: "RoyalGad",
    content: `
When buying hygiene products in Nigeria, one of the most important things to check is whether the product is NAFDAC registered. Here's why it matters.

## What Is NAFDAC?

The National Agency for Food and Drug Administration and Control (NAFDAC) is the Nigerian government agency responsible for regulating and controlling the manufacture, importation, exportation, advertisement, distribution, sale, and use of food, drugs, cosmetics, medical devices, chemicals, and packaged water.

## What NAFDAC Registration Means

When a product carries a NAFDAC registration number, it means:

1. **Safety Tested** — The product has been tested and found safe for its intended use
2. **Quality Assured** — The manufacturing process meets established quality standards
3. **Efficacy Proven** — The product does what it claims to do
4. **Facility Inspected** — The production facility has been inspected and approved by NAFDAC officials

## The Risks of Unregistered Products

Using unregistered hygiene products can expose you to:

- Harmful or banned ingredients
- Incorrect concentration of active ingredients
- Contamination during manufacturing
- Products that simply don't work

## How to Verify NAFDAC Registration

Every NAFDAC registered product carries a unique registration number, typically in the format: NAFDAC REG NO: A7-XXXX. You can verify this number on the NAFDAC website or by contacting NAFDAC directly.

## Why RoyalGad Is NAFDAC Registered

At RoyalGad, all our products are fully NAFDAC registered. We believe that quality and safety are non-negotiable. Our manufacturing facility is regularly inspected, and our products undergo rigorous testing to ensure they meet the highest standards.

When you buy RoyalGad, you're buying peace of mind.`,
  },
  "importance-hand-hygiene-healthcare": {
    title: "The Importance of Hand Hygiene in Healthcare Settings",
    date: "2026-04-15",
    category: "Hygiene Tips",
    author: "RoyalGad",
    content: `
Hand hygiene is the single most important measure to prevent healthcare-associated infections. This is why RoyalGad Hand Sanitizer is a crucial tool in healthcare settings.

## Why Hand Hygiene Matters

Healthcare-associated infections (HAIs) affect millions of patients worldwide each year. Proper hand hygiene by healthcare workers is the most effective way to prevent these infections.

## When to Practice Hand Hygiene

The World Health Organization (WHO) recommends hand hygiene at five critical moments:
1. Before touching a patient
2. Before clean/aseptic procedures
3. After body fluid exposure risk
4. After touching a patient
5. After touching patient surroundings

## Hand Hygiene Methods

**Hand washing with soap and water:** Best when hands are visibly soiled or after caring for patients with diarrhea.

**Alcohol-based hand rub:** More effective at killing germs, faster, and better for skin with repeated use. RoyalGad Hand Sanitizer contains 70% alcohol as recommended by WHO.

## RoyalGad Hand Sanitizer for Healthcare

Our hand sanitizer is formulated with 70% ethyl alcohol — the concentration recommended by WHO and CDC for effective hand hygiene. It's gentle on skin with added moisturizers, making it suitable for frequent use by healthcare professionals.`,
  },
  "contract-manufacturing-vs-private-labelling": {
    title: "Contract Manufacturing vs Private Labelling: Which Is Right for Your Business?",
    date: "2026-04-01",
    category: "Company News",
    author: "RoyalGad",
    content: `
If you're looking to enter the hygiene product market, you've probably come across two common business models: contract manufacturing and private labelling. Here's what each means and how to choose.

## What Is Contract Manufacturing?

Contract manufacturing involves hiring a manufacturer to produce a product according to your specific formulation and requirements.

**Best for:** Businesses with existing formulations, unique product requirements, or specific technical needs.

**Advantages:**
- Full control over formulation
- Proprietary product ownership
- Custom packaging options

## What Is Private Labelling?

Private labelling involves taking an existing product manufactured by another company and selling it under your own brand name.

**Best for:** Businesses that want to quickly enter the market without investing in R&D.

**Advantages:**
- Faster time to market
- Lower minimum order quantities
- Proven, tested formulations
- Lower cost

## Which Should You Choose?

**Choose Contract Manufacturing if:**
- You have a unique formulation
- You need specific technical specifications
- You want full control over production

**Choose Private Labelling if:**
- You want to start selling quickly
- You're new to the industry
- You want to test the market first
- You have limited capital

## RoyalGad Offers Both

At RoyalGad, we offer both contract manufacturing and private labelling services. Whatever path you choose, our NAFDAC-certified facility and experienced team ensure you get quality products that meet Nigerian standards.`,
  },
  "royalgad-nafdac-renewal-2026": {
    title: "RoyalGad Receives NAFDAC Renewal for All Products",
    date: "2026-03-20",
    category: "Company News",
    author: "RoyalGad",
    content: `
We are proud to announce that all RoyalGad products have successfully passed their NAFDAC renewal inspections and registrations for 2026.

## Commitment to Quality

This renewal is a testament to our unwavering commitment to quality and safety. Every RoyalGad product undergoes rigorous testing and our facility is regularly inspected to ensure compliance with NAFDAC standards.

## What This Means for Our Customers

When you purchase RoyalGad products, you can have complete confidence that:
- All products meet NAFDAC safety standards
- Our manufacturing facility has passed inspection
- Product formulations are tested and proven effective
- Quality control processes are in place and working

## Looking Forward

We will continue to maintain the highest standards of quality and safety in everything we do. Thank you to our customers and partners for your continued trust in RoyalGad.`,
  },
};

export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.content.substring(0, 160).replace(/[#*\n]/g, ""),
  };
}

function processInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  if (parts.length === 1) return text;
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function renderContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inTable = false;
  let tableRows: string[] = [];
  let listItems: React.ReactNode[] = [];

  function flushList() {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="space-y-2 my-4">
          {listItems}
        </ul>
      );
      listItems = [];
    }
  }

  lines.forEach((line, i) => {
    if (line.startsWith('|') && line.endsWith('|')) {
      flushList();
      if (!inTable) {
        inTable = true;
        tableRows = [];
      }
      tableRows.push(line);
      return;
    }
    if (inTable && tableRows.length > 0) {
      const isHeader = tableRows[1]?.includes('---');
      const headerRow = isHeader ? 0 : -1;
      const dataRows = isHeader ? tableRows.slice(2) : tableRows.slice(1);
      const headLine = isHeader ? tableRows[0] : tableRows[0];

      if (isHeader) {
        const headers = headLine.split('|').filter(Boolean).map(h => h.trim());
        elements.push(
          <div key={`table-${i}`} className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  {headers.map((h, hi) => (
                    <th key={hi} className="border border-gray-300 dark:border-slate-700 bg-gray-100 dark:bg-slate-800 px-4 py-2 text-left font-semibold text-gray-900 dark:text-slate-100">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataRows.map((row, ri) => {
                  const cols = row.split('|').filter(Boolean).map(c => c.trim());
                  return (
                    <tr key={ri}>
                      {cols.map((c, ci) => (
                        <td key={ci} className="border border-gray-300 dark:border-slate-700 px-4 py-2 text-gray-600 dark:text-slate-400">{c}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      } else {
        elements.push(
          <div key={`table-${i}`} className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <tbody>
                {tableRows.map((row, ri) => {
                  const cols = row.split('|').filter(Boolean).map(c => c.trim());
                  return (
                    <tr key={ri}>
                      {cols.map((c, ci) => (
                        <td key={ci} className="border border-gray-300 dark:border-slate-700 px-4 py-2 text-gray-600 dark:text-slate-400">{c}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      }
      inTable = false;
      tableRows = [];
      return;
    }
    flushList();
    if (line.startsWith('## ')) { elements.push(<h2 key={i} className="text-2xl font-bold text-gray-900 dark:text-slate-100 mt-10 mb-4">{processInline(line.replace('## ', ''))}</h2>); return; }
    if (line.startsWith('### ')) { elements.push(<h3 key={i} className="text-xl font-bold text-gray-900 dark:text-slate-100 mt-8 mb-3">{processInline(line.replace('### ', ''))}</h3>); return; }
    if (line.startsWith('- ')) {
      const itemText = line.replace('- ', '');
      listItems.push(
        <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-slate-400">
          <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
          <span>{processInline(itemText)}</span>
        </li>
      );
      return;
    }
    if (line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') || line.startsWith('5.')) {
      elements.push(<li key={i} className="text-gray-600 dark:text-slate-400 ml-4 list-decimal">{processInline(line.replace(/^\d+\.\s*/, ''))}</li>); return;
    }
    if (line.trim() === '') { elements.push(<div key={i} className="h-2" />); return; }
    elements.push(<p key={i} className="text-gray-600 dark:text-slate-400 leading-relaxed mb-4">{processInline(line)}</p>);
  });

  flushList();

  if (inTable && tableRows.length > 0) {
    elements.push(
      <div key="table-end" className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse">
          <tbody>
            {tableRows.map((row, ri) => {
              const cols = row.split('|').filter(Boolean).map(c => c.trim());
              return (
                <tr key={ri}>
                  {cols.map((c, ci) => (
                    <td key={ci} className="border border-gray-300 dark:border-slate-700 px-4 py-2 text-gray-600 dark:text-slate-400">{c}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  return elements;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Post Not Found</h1>
        <Link href="/blog" className="btn-primary mt-6 inline-flex"><ArrowLeft className="h-4 w-4" /> Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-50 dark:bg-slate-800/50 border-b dark:border-slate-800">
        <FadeInSection>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
              <Link href="/" className="hover:text-brand-green-600">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/blog" className="hover:text-brand-green-600">Blog</Link>
              <ChevronRight className="h-3 w-3" />
              <span aria-current="page" className="text-gray-900 dark:text-slate-100 font-medium truncate">{post.title}</span>
            </div>
          </div>
        </FadeInSection>
      </div>

      <article className="py-12 lg:py-16">
        <FadeInSection>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-slate-400 mb-4">
                <span className="px-3 py-1 bg-brand-green-100 dark:bg-brand-green-900/40 text-brand-green-700 dark:text-brand-green-300 rounded-full font-medium">{post.category}</span>
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {post.date}</span>
                <span className="flex items-center gap-1"><User className="h-4 w-4" /> {post.author}</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-slate-100">{post.title}</h1>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none">
              {renderContent(post.content)}
            </div>

            <div className="mt-10 pt-8 border-t dark:border-slate-700 flex items-center gap-4">
              <span className="text-sm text-gray-500 dark:text-slate-400">Share this post:</span>
                <a href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${siteUrl}/blog/${slug}`)}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 dark:bg-slate-800 rounded-lg hover:bg-brand-green-100 dark:hover:bg-brand-green-900/40 transition-colors" aria-label="Share on Facebook">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.35 3.24 9.35 5.47v1.99H6.56v3.77h2.8v11.28h5.14V11.24h3.46l.81-3.78z" /></svg>
                </a>
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${siteUrl}/blog/${slug}`)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 dark:bg-slate-800 rounded-lg hover:bg-brand-green-100 dark:hover:bg-brand-green-900/40 transition-colors" aria-label="Share on Twitter/X">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
              <a href={`https://wa.me/?text=${encodeURIComponent(`${post.title} - ${siteUrl}/blog/${slug}`)}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 dark:bg-slate-800 rounded-lg hover:bg-brand-green-100 dark:hover:bg-brand-green-900/40 transition-colors" aria-label="Share on WhatsApp"><MessageCircle className="h-4 w-4" /></a>
            </div>

            <div className="mt-10 pt-8 border-t dark:border-slate-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-6">Related Articles</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {Object.entries(blogPosts)
                  .filter(([s, p]) => p.category === post.category && s !== slug)
                  .slice(0, 3)
                  .map(([s, p]) => (
                    <Link key={s} href={`/blog/${s}`} className="group">
                      <div className="bg-white dark:bg-slate-800 rounded-xl border dark:border-slate-700 p-4 hover:shadow-md transition-shadow">
                        <span className="px-2 py-0.5 bg-brand-green-100 dark:bg-brand-green-900/40 text-brand-green-700 dark:text-brand-green-300 rounded-full text-xs font-medium">{p.category}</span>
                        <h3 className="font-semibold text-gray-900 dark:text-slate-100 mt-2 text-sm group-hover:text-brand-green-600 dark:group-hover:text-brand-green-400 transition-colors line-clamp-2">{p.title}</h3>
                        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">{p.date}</p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

            <div className="mt-10">
              <Link href="/blog" className="btn-outline"><ArrowLeft className="h-4 w-4" /> Back to Blog</Link>
            </div>
          </div>
        </FadeInSection>
      </article>
    </>
  );
}
