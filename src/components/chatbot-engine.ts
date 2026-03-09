/* ─────────────────────────────────────────────────
   Auzclean Chatbot NLP Engine
   Advanced keyword matching with fuzzy search,
   synonym expansion, context memory & scoring
   ───────────────────────────────────────────────── */

export interface ChatLink {
    label: string;
    href: string;
}

export interface BotResponse {
    text: string;
    links?: ChatLink[];
}

/* ─── Synonym map — maps variations to canonical terms ─── */
const synonymMap: Record<string, string[]> = {
    price: ['cost', 'pricing', 'rate', 'rates', 'fee', 'fees', 'charge', 'charges', 'expensive', 'cheap', 'affordable', 'budget', 'money', 'dollar', 'dollars', 'pay', 'payment', 'investment', 'spend', 'worth', 'value', 'economical'],
    quote: ['estimate', 'proposal', 'quotation', 'offer', 'deal', 'package', 'plan'],
    service: ['services', 'offering', 'offerings', 'solution', 'solutions', 'provide', 'provides', 'do', 'work', 'doing'],
    commercial: ['office', 'offices', 'corporate', 'workplace', 'workplaces', 'retail', 'shop', 'shops', 'store', 'stores', 'business', 'company'],
    healthcare: ['hospital', 'hospitals', 'medical', 'clinic', 'clinics', 'aged care', 'nursing', 'health', 'patient', 'patients', 'doctor', 'doctors'],
    industrial: ['warehouse', 'warehouses', 'factory', 'factories', 'manufacturing', 'heavy duty', 'loading dock', 'machinery', 'plant', 'plants'],
    education: ['school', 'schools', 'university', 'universities', 'childcare', 'kindergarten', 'campus', 'classroom', 'classrooms', 'student', 'students', 'teacher', 'teachers', 'learning', 'college'],
    transport: ['bus', 'buses', 'train', 'trains', 'fleet', 'depot', 'vehicle', 'vehicles', 'ferry', 'ferries', 'rail', 'station', 'stations', 'public transport'],
    specialized: ['specialised', 'carpet', 'carpets', 'window', 'windows', 'pressure wash', 'high pressure', 'post construction', 'renovation', 'event', 'events', 'deep clean', 'stain', 'stains', 'steam'],
    gmp: ['pharmaceutical', 'pharmaceuticals', 'food production', 'cleanroom', 'clean room', 'manufacturing practice', 'regulated', 'compliance', 'pharma'],
    location: ['where', 'address', 'office', 'find', 'visit', 'located', 'direction', 'directions', 'map', 'place'],
    contact: ['phone', 'call', 'email', 'reach', 'touch', 'number', 'talk', 'speak', 'connect', 'ring', 'dial', 'message'],
    sustainability: ['sustainable', 'eco', 'green', 'environment', 'environmental', 'eco-friendly', 'ecofriendly', 'geca', 'chemical', 'chemicals', 'toxic', 'safe', 'carbon', 'water', 'recycle', 'recycling', 'planet', 'earth', 'organic', 'natural'],
    about: ['company', 'history', 'founded', 'established', 'story', 'background', 'who are', 'tell me about', 'information', 'info'],
    certification: ['certified', 'cm3', 'compliant', 'accredited', 'qualified', 'license', 'licensed', 'insured', 'insurance', 'standard', 'standards', 'quality'],
    gallery: ['photos', 'pictures', 'images', 'portfolio', 'past work', 'previous work', 'examples', 'projects', 'showcase', 'gallery'],
    hours: ['open', 'available', 'when', 'schedule', 'timing', 'time', '24/7', 'emergency', 'weekend', 'after hours', 'business hours', 'working hours'],
    job: ['jobs', 'career', 'careers', 'hiring', 'employment', 'apply', 'position', 'vacancy', 'vacancies', 'join', 'recruit', 'recruitment', 'work for you', 'work with you', 'team'],
    greeting: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy', 'sup', 'yo', 'gday', "g'day", 'greetings', 'hiya', 'morning', 'afternoon', 'evening', 'heya'],
    thanks: ['thank', 'thanks', 'thank you', 'cheers', 'ta', 'appreciate', 'appreciated', 'thx', 'tysm', 'grateful', 'thankful'],
    bye: ['goodbye', 'see you', 'later', 'cya', 'take care', 'gotta go', 'farewell', 'night', 'goodnight', 'talk later', 'catch you later', 'peace', 'im done'],
    hygiene: ['covid', 'pandemic', 'disinfect', 'disinfection', 'sanitise', 'sanitize', 'sanitisation', 'virus', 'bacteria', 'hygiene', 'hygienic', 'germ', 'germs', 'infection', 'sterile', 'sterilise'],
    area: ['areas', 'serve', 'coverage', 'region', 'regions', 'gold coast', 'sunshine coast', 'toowoomba', 'ipswich', 'logan', 'south east', 'southeast', 'suburb', 'suburbs', 'near me', 'nearby'],
    process: ['how does it work', 'how it works', 'steps', 'step', 'procedure', 'start', 'get started', 'begin', 'onboarding', 'walkthrough', 'how to', 'what happens'],
    why: ['different', 'better', 'advantage', 'advantages', 'benefit', 'benefits', 'choose', 'best', 'compare', 'comparison', 'competitor', 'competitors', 'unique', 'special', 'stand out', 'reason', 'reasons', 'why you'],
    trust: ['trusted', 'partners', 'who do you work', 'clients', 'client', 'customers', 'customer', 'organisations', 'organizations', 'references', 'reference'],
    social: ['facebook', 'linkedin', 'social media', 'follow', 'instagram', 'twitter', 'x', 'tiktok'],
    review: ['reviews', 'testimonial', 'testimonials', 'feedback', 'rating', 'ratings', 'reputation', 'star', 'stars', 'recommend', 'recommendation'],
};

/* ─── Levenshtein distance for fuzzy matching ─── */
function levenshtein(a: string, b: string): number {
    const m = a.length, n = b.length;
    if (m === 0) return n;
    if (n === 0) return m;
    const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
        Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
    );
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[i][j] = a[i - 1] === b[j - 1]
                ? dp[i - 1][j - 1]
                : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
    }
    return dp[m][n];
}

/* ─── Normalise text for matching ─── */
function normalise(text: string): string {
    return text
        .toLowerCase()
        .replace(/[''`]/g, "'")
        .replace(/[^\w\s']/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

/* ─── Simple stemming — strips common suffixes ─── */
function stem(word: string): string {
    return word
        .replace(/ing$/, '')
        .replace(/tion$/, '')
        .replace(/ment$/, '')
        .replace(/ness$/, '')
        .replace(/able$/, '')
        .replace(/ible$/, '')
        .replace(/ful$/, '')
        .replace(/ous$/, '')
        .replace(/ive$/, '')
        .replace(/ly$/, '')
        .replace(/ed$/, '')
        .replace(/er$/, '')
        .replace(/es$/, '')
        .replace(/s$/, '');
}

/* ─── Expand user words via synonym map — returns canonical intent names ─── */
function expandToIntents(words: string[], fullText: string): Map<string, number> {
    const intentScores = new Map<string, number>();

    for (const [intentName, synonyms] of Object.entries(synonymMap)) {
        let score = 0;

        // Check full text for multi-word synonyms first
        for (const syn of synonyms) {
            if (syn.includes(' ') && fullText.includes(syn)) {
                score += 6;
            }
        }

        for (const word of words) {
            const stemmed = stem(word);
            // Direct match
            if (synonyms.includes(word)) {
                score += 4;
            }
            // Stemmed match
            else if (synonyms.some(s => stem(s) === stemmed)) {
                score += 3;
            }
            // Fuzzy match (for typos) — only for words >= 4 chars
            else if (word.length >= 4) {
                for (const syn of synonyms) {
                    if (syn.length >= 4 && levenshtein(word, syn) <= 1) {
                        score += 3;
                        break;
                    }
                    if (syn.length >= 4 && levenshtein(stemmed, stem(syn)) <= 1) {
                        score += 2;
                        break;
                    }
                }
            }
            // Canonical name match
            if (word === intentName || stemmed === stem(intentName)) {
                score += 5;
            }
        }

        if (score > 0) {
            intentScores.set(intentName, score);
        }
    }

    return intentScores;
}

/* ─── Question pattern detection ─── */
interface QuestionPattern {
    patterns: RegExp[];
    intentBoost: string;
    boost: number;
}

const questionPatterns: QuestionPattern[] = [
    { patterns: [/how much/, /what.*cost/, /what.*price/, /price.*for/, /how expensive/], intentBoost: 'price', boost: 5 },
    { patterns: [/can i get.*quote/, /i need.*quote/, /i want.*quote/, /free quote/, /request.*quote/, /get.*quote/], intentBoost: 'quote', boost: 6 },
    { patterns: [/what.*service/, /which.*service/, /do you (do|offer|provide|have)/, /can you (do|clean|handle)/], intentBoost: 'service', boost: 4 },
    { patterns: [/where.*located/, /where.*office/, /where are you/, /your.*address/, /how.*find.*you/], intentBoost: 'location', boost: 6 },
    { patterns: [/how.*contact/, /how.*reach/, /can i call/, /phone number/, /email address/], intentBoost: 'contact', boost: 5 },
    { patterns: [/are you.*open/, /what.*hours/, /when.*available/, /do you work.*weekend/, /after hours/], intentBoost: 'hours', boost: 5 },
    { patterns: [/why.*choose/, /why should i/, /what makes you/, /how.*different/, /why.*better/], intentBoost: 'why', boost: 5 },
    { patterns: [/are you.*certified/, /do you have.*certification/, /what.*certification/, /are you.*insured/, /are you.*compliant/], intentBoost: 'certification', boost: 5 },
    { patterns: [/are you.*hiring/, /do you have.*job/, /can i.*work/, /any.*opening/, /any.*position/, /join.*team/], intentBoost: 'job', boost: 5 },
    { patterns: [/how does.*work/, /how do.*start/, /what.*process/, /what.*happen/, /what.*step/, /how to.*begin/], intentBoost: 'process', boost: 5 },
    { patterns: [/do you.*clean.*office/, /can you.*clean.*office/, /office.*clean/], intentBoost: 'commercial', boost: 6 },
    { patterns: [/do you.*clean.*hospital/, /can you.*clean.*hospital/, /hospital.*clean/, /medical.*clean/], intentBoost: 'healthcare', boost: 6 },
    { patterns: [/do you.*clean.*school/, /can you.*clean.*school/, /school.*clean/, /university.*clean/], intentBoost: 'education', boost: 6 },
    { patterns: [/do you.*clean.*warehouse/, /can you.*clean.*factory/, /industrial.*clean/], intentBoost: 'industrial', boost: 6 },
    { patterns: [/do you.*clean.*carpet/, /carpet.*clean/, /window.*clean/, /pressure.*wash/], intentBoost: 'specialized', boost: 6 },
    { patterns: [/do you.*clean.*bus/, /transport.*clean/, /vehicle.*clean/, /fleet.*clean/], intentBoost: 'transport', boost: 6 },
    { patterns: [/tell.*about.*you/, /who are you/, /what is auzclean/, /about.*company/, /company.*history/], intentBoost: 'about', boost: 5 },
    { patterns: [/see.*work/, /your.*work/, /past.*project/, /show.*photo/, /any.*photo/, /any.*picture/], intentBoost: 'gallery', boost: 5 },
    { patterns: [/eco.*friend/, /is it.*safe/, /are.*chemical.*safe/, /environment.*friend/, /do you.*recycle/], intentBoost: 'sustainability', boost: 5 },
    { patterns: [/satisfied.*customer/, /any.*review/, /any.*testimonial/, /what.*client.*say/, /client.*feedback/], intentBoost: 'review', boost: 5 },
    { patterns: [/who.*clients/, /who.*work.*with/, /who.*do you.*clean.*for/, /any.*reference/], intentBoost: 'trust', boost: 5 },
    { patterns: [/do you.*disinfect/, /can you.*sanitise/, /can you.*sanitize/, /covid.*clean/], intentBoost: 'hygiene', boost: 5 },
    { patterns: [/do you.*serve/, /do you.*come.*to/, /do you.*cover/, /available.*in/, /near me/], intentBoost: 'area', boost: 5 },
];

/* ─── Response database — multiple variants per intent ─── */
interface IntentResponse {
    texts: string[];
    links?: ChatLink[];
}

const intentResponses: Record<string, IntentResponse> = {
    greeting: {
        texts: [
            "👋 Hey there! Welcome to Auzclean Services. I'm here to help — whether it's about our cleaning services, getting a quote, or just a chat. What's on your mind?",
            "Hello! 😊 Great to have you here. I can help you with our cleaning services, pricing, locations, and more. What would you like to know?",
            "Hi! 👋 Welcome! Ask me anything about Auzclean — our services, how to get a quote, our eco-friendly approach, or anything else. I'm all ears!",
        ],
    },
    thanks: {
        texts: [
            "You're very welcome! 😊 Happy to help. If you have any more questions, feel free to ask anytime!",
            "Glad I could help! 🙌 Don't hesitate to reach out if you need anything else.",
            "Anytime! 😊 That's what I'm here for. Anything else you'd like to know?",
        ],
    },
    bye: {
        texts: [
            "Goodbye! 👋 It was great chatting. If you need anything in the future, we're just a click away. Have a wonderful day!",
            "See you later! 👋 Remember, you can always reach us at 1300 796 987 if you need anything. Take care!",
            "Bye for now! 😊 Hope I was helpful. Come back anytime. Have a great day!",
        ],
    },
    price: {
        texts: [
            "Every facility is different, so we tailor our pricing to your specific needs. Here's what factors into your quote:\n\n📐 Size and type of your space\n🔄 Frequency of cleaning\n🧹 Specific services required\n🔑 Access & scheduling preferences\n\nOur quotes are always **free** and **no-obligation**. We'll send a trained assessor to your site, and you'll have a detailed proposal within 48 hours!",
            "Great question! 💰 We don't have a one-size-fits-all price because every space is unique. Instead, we do a **free site assessment** and give you a customised proposal.\n\nWhat we can tell you:\n✅ Competitive rates\n✅ No hidden fees\n✅ Flexible payment terms\n✅ No lock-in contracts available\n\nWant us to prepare a quote for you?",
        ],
        links: [{ label: '📝 Get a Free Quote', href: '/contact' }],
    },
    quote: {
        texts: [
            "We'd love to prepare a quote for you! 📋 Here's how it works:\n\n1️⃣ Fill out our quick contact form (takes ~2 mins)\n2️⃣ Our team contacts you within 2 hours\n3️⃣ We arrange a free site inspection\n4️⃣ You receive a detailed, customised proposal\n\nIt's completely **free** and **no-obligation**. Sound good?",
            "Absolutely! Getting a quote is easy and free 🎉\n\nYou can either:\n📝 Fill out our online form\n📞 Call us at **1300 796 987**\n📧 Email **info@auzcleanfacility.com.au**\n\nWe respond within 2 business hours and can usually have a quote ready within 48 hours of a site visit!",
        ],
        links: [
            { label: '📝 Request a Quote', href: '/contact' },
            { label: '📞 Call 1300 796 987', href: 'tel:1300796987' },
        ],
    },
    service: {
        texts: [
            "We offer **7 comprehensive cleaning services** across Brisbane & Queensland:\n\n🏢 **Commercial** — Offices, retail & corporate spaces\n🏥 **Healthcare** — Hospitals, clinics & aged care\n🏭 **Industrial** — Warehouses & manufacturing\n🎓 **Education** — Schools, childcare & universities\n🔬 **GMP** — Pharmaceutical & food production\n🚌 **Transport** — Fleet, depot & public transport\n✨ **Specialized** — Carpet, window & post-construction\n\nEach service is fully customised. Which one interests you? I can go deeper on any of them!",
            "Here's a quick rundown of what we do:\n\n🏢 Commercial Cleaning\n🏥 Healthcare Cleaning\n🏭 Industrial Cleaning\n🎓 Education Cleaning\n🔬 GMP Cleaning\n🚌 Transport Cleaning\n✨ Specialized Cleaning\n\nWe've been doing this for **15+ years** with a **99% client retention rate**. Want details on a specific service?",
        ],
        links: [{ label: '🔍 View All Services', href: '/services' }],
    },
    commercial: {
        texts: [
            "🏢 **Commercial Cleaning** — our most popular service!\n\nPerfect for offices, retail spaces, and corporate environments. Here's what's included:\n\n• Daily, weekly, or fortnightly scheduling\n• Workstations, meeting rooms & common areas\n• Kitchen & amenity sanitisation\n• Waste management & recycling\n• After-hours & weekend options\n\nWe work **around your business hours** to minimise disruption. Many of our clients don't even notice we've been in — they just notice how clean everything is! 😄",
        ],
        links: [
            { label: 'Learn More', href: '/services#commercial' },
            { label: 'Get a Quote', href: '/contact' },
        ],
    },
    healthcare: {
        texts: [
            "🏥 **Healthcare Cleaning** — where quality literally saves lives.\n\nWe follow strict Australian healthcare standards:\n\n• Infection control compliant procedures\n• Terminal & discharge cleaning\n• Operating theatre & sterile areas\n• Aged care facility maintenance\n• Biohazard waste management\n\nOur team is specially trained in HIC protocols and uses hospital-grade disinfectants. We understand that in healthcare, \"clean\" isn't just about appearance — it's about safety.",
        ],
        links: [
            { label: 'Learn More', href: '/services#healthcare' },
            { label: 'Get a Quote', href: '/contact' },
        ],
    },
    industrial: {
        texts: [
            "🏭 **Industrial Cleaning** — no job too big or too tough!\n\nWe handle the heavy-duty stuff:\n\n• High-pressure washing & scrubbing\n• Factory floor degreasing\n• Warehouse & storage cleaning\n• Loading dock & yard maintenance\n• Height access & confined spaces\n\nWe've got specialised equipment and trained crews for facilities of any scale. From small workshops to massive warehouses — we've seen it all!",
        ],
        links: [
            { label: 'Learn More', href: '/services#industrial' },
            { label: 'Get a Quote', href: '/contact' },
        ],
    },
    education: {
        texts: [
            "🎓 **Education Cleaning** — creating safe spaces for learning.\n\nWe keep schools, childcare centres, and universities spotless:\n\n• Classrooms & laboratories\n• Playgrounds & outdoor areas\n• Child-safe, non-toxic products\n• Term-time & holiday deep cleans\n• Childcare-specialised cleaning\n\nWe exclusively use eco-friendly, child-safe products because your students' health always comes first! 🌿",
        ],
        links: [
            { label: 'Learn More', href: '/services#education' },
            { label: 'Get a Quote', href: '/contact' },
        ],
    },
    gmp: {
        texts: [
            "🔬 **GMP Cleaning** — precision cleaning for regulated environments.\n\n• Cleanroom & controlled environments\n• GMP documentation & audit trails\n• Pharmaceutical facility maintenance\n• Food production area sanitisation\n• Regulatory compliance support\n\nWe understand the strict standards required for pharmaceutical and food production facilities. Our protocols are fully documented and audit-ready.",
        ],
        links: [
            { label: 'Learn More', href: '/services#gmp' },
            { label: 'Get a Quote', href: '/contact' },
        ],
    },
    transport: {
        texts: [
            "🚌 **Transport Cleaning** — keeping fleets and facilities pristine.\n\n• Bus, train & ferry interiors\n• Depot & maintenance facilities\n• Fleet vehicle exterior washing\n• Station & terminal sanitisation\n• Biohazard & graffiti removal\n\nWe meet all public health standards and can work around your operational schedules for zero downtime.",
        ],
        links: [
            { label: 'Learn More', href: '/services#transport' },
            { label: 'Get a Quote', href: '/contact' },
        ],
    },
    specialized: {
        texts: [
            "✨ **Specialized Cleaning** — the expert stuff!\n\n• Carpet steam cleaning & stain removal\n• Window cleaning (internal & external)\n• High-pressure external washing\n• Post-construction & renovation cleanup\n• Event setup & pack-down cleaning\n\nThese can be one-off jobs or added to any regular cleaning program. Whatever your specialist need, we've got the right equipment and expertise!",
        ],
        links: [
            { label: 'Learn More', href: '/services#specialized' },
            { label: 'Get a Quote', href: '/contact' },
        ],
    },
    about: {
        texts: [
            "🏢 **About Auzclean Services**\n\nFounded in **2009** in Brisbane, we've grown into one of Queensland's most trusted commercial cleaning providers.\n\n📊 By the numbers:\n• **15+ years** of experience\n• **500+ active** contracts\n• **99% client retention** rate\n• **24/7** support available\n\nOur secret? We treat every client as a partner, not a contract number. Our values — Excellence, Integrity, Partnership, and People First — aren't just words on a wall. They drive every decision we make.\n\nWe're also CM3 compliant and GECA certified, meaning we meet the highest safety and environmental standards in the industry.",
            "We've been cleaning professionally since **2009** — that's over 15 years of experience! 🎉\n\nStarted as a small Brisbane operation, now we maintain 500+ contracts across Queensland with a 99% client retention rate. Our team is fully trained, vetted, and passionate about creating clean, healthy spaces.\n\nWhat sets us apart? We genuinely care about sustainability (GECA certified products) and safety (CM3 compliant). We don't just clean — we build lasting partnerships.",
        ],
        links: [{ label: '📖 Our Story', href: '/about' }],
    },
    location: {
        texts: [
            "📍 We're headquartered at:\n\n**Level 19, 10 Eagle Street**\nBrisbane CBD, QLD, Australia\n\nRight in the heart of the city! But our teams operate across all of Queensland — Brisbane metro, Gold Coast, Sunshine Coast, Ipswich, Logan, Toowoomba, and regional QLD.\n\nWant to arrange a site visit? We'll come to you!",
            "You can find us at **Level 19, 10 Eagle Street, Brisbane QLD** — right in the CBD! 🏙️\n\nBut don't worry about coming to us. Our teams service all of Brisbane & Queensland. We'll happily come to your facility for a free assessment!",
        ],
        links: [{ label: '📍 Contact & Map', href: '/contact' }],
    },
    contact: {
        texts: [
            "📞 Here's how to reach us:\n\n**Phone:** 1300 796 987\n📅 Mon – Fri, 7am – 6pm AEST\n\n**Email:** info@auzcleanfacility.com.au\n💌 Responses within 24 hours\n\n**Office:** Level 19, 10 Eagle St, Brisbane\n\n🚨 **24/7 emergency cleaning** available!\n\nOr just fill out our online form — we'll get back to you within 2 business hours!",
            "Getting in touch is easy!\n\n📞 **Call:** 1300 796 987 (Mon–Fri, 7am–6pm)\n📧 **Email:** info@auzcleanfacility.com.au\n📝 **Online form:** Takes just 2 minutes\n\nWe pride ourselves on fast responses — usually within 2 hours! And yes, we have 24/7 emergency cleaning available too.",
        ],
        links: [
            { label: '📞 Call Now', href: 'tel:1300796987' },
            { label: '📝 Contact Form', href: '/contact' },
        ],
    },
    hours: {
        texts: [
            "⏰ **Our Hours:**\n\n**Office/phone support:** Mon – Fri, 7am – 6pm AEST\n**Cleaning services:** Available **24/7** — including weekends & public holidays\n**Emergency cleaning:** On-call **24/7**\n**After-hours cleaning:** Absolutely — many of our clients prefer it!\n\nWe build our schedule around yours, not the other way around. 🕐",
        ],
    },
    sustainability: {
        texts: [
            "🌿 **Sustainability is in our DNA!**\n\nWe don't just talk green — we walk it:\n\n🏅 **GECA Certified** — All our products carry the Good Environmental Choice Australia certification\n💧 **60% less water** — Thanks to advanced cleaning tech\n♻️ **Zero-waste goal** — Comprehensive recycling, minimal single-use products\n🌍 **Carbon neutral path** — Route optimization, efficient equipment, local sourcing\n\nOur GECA products are:\n• Biodegradable formulations\n• Zero harmful chemicals or carcinogens\n• Reduced VOCs & aquatic toxicity\n• Sustainably sourced & packaged\n\nBecause cleaning shouldn't come at the planet's expense! 🌍",
        ],
        links: [{ label: '🌿 Sustainability Page', href: '/sustainability' }],
    },
    certification: {
        texts: [
            "🏅 **Our Certifications:**\n\n✅ **CM3 Compliant** — Health & safety contractor management\n✅ **GECA Certified** — Eco-friendly products\n✅ Fully insured & licensed\n✅ All staff trained, vetted & police-checked\n✅ OH&S workplace compliance\n✅ Regular quality audits & inspections\n\nThese aren't just badges — they represent our commitment to the highest standards in the industry. You can have complete peace of mind with Auzclean.",
        ],
    },
    gallery: {
        texts: [
            "📸 Absolutely! Check out our Gallery page to see real photos from our cleaning projects. We've got shots from commercial spaces, healthcare facilities, and more.\n\nSeeing is believing — our work speaks for itself! 💪",
            "Great idea! 📸 Our gallery showcases real projects we've completed. Take a browse and see the quality we bring to every space!",
        ],
        links: [{ label: '🖼️ View Gallery', href: '/gallery' }],
    },
    job: {
        texts: [
            "👥 **Careers at Auzclean**\n\nWe're always looking for great people! Here's what we offer:\n\n💰 Competitive pay rates\n📚 Ongoing training & development\n🤝 Supportive team culture\n📈 Real career growth opportunities\n🌿 Working with eco-friendly products\n\nWe believe our people are our greatest asset. Interested? Send your enquiry to **info@auzcleanfacility.com.au** or call **1300 796 987**!",
        ],
        links: [{ label: '📧 Enquire About Jobs', href: '/contact' }],
    },
    hygiene: {
        texts: [
            "🧼 **Hygiene & Disinfection**\n\nWe take hygiene extremely seriously:\n\n• Hospital-grade disinfectants\n• High-touch surface protocols\n• Infection control procedures\n• Deep-cleaning programs\n• GECA certified safe products\n\nOur healthcare-grade cleaning isn't just for hospitals — we bring these same rigorous standards to offices, schools, and any facility that wants the highest level of cleanliness. Your team's health matters!",
        ],
        links: [{ label: 'Get a Quote', href: '/contact' }],
    },
    area: {
        texts: [
            "📍 **Our Service Areas:**\n\n• Brisbane CBD & Metro\n• Gold Coast\n• Sunshine Coast\n• Ipswich & Western Corridor\n• Logan & Redlands\n• Toowoomba & Darling Downs\n• Regional Queensland (case by case)\n\nBased in Brisbane CBD, our teams operate right across the state. If you're in Queensland, chances are we can help! Not sure? Just ask — we love a challenge. 😄",
        ],
        links: [{ label: 'Contact Us', href: '/contact' }],
    },
    process: {
        texts: [
            "📋 **Getting started is easy — here's how it works:**\n\n1️⃣ **Enquiry** — Tell us about your facility (online form or call)\n2️⃣ **Free Site Visit** — We assess your space and understand your needs\n3️⃣ **Custom Proposal** — You receive a detailed, tailored quote within 48hrs\n4️⃣ **Onboarding** — We assign your dedicated team and start cleaning\n5️⃣ **Ongoing Quality** — Regular audits, feedback loops & 24/7 support\n\nNo lock-in contracts. No hidden fees. Just great cleaning! 🎯\n\nReady to take the first step?",
        ],
        links: [{ label: '🚀 Get Started', href: '/contact' }],
    },
    why: {
        texts: [
            "🌟 **Here's why 500+ organisations choose Auzclean:**\n\n1️⃣ **15+ years** of proven track record\n2️⃣ **99% client retention** — our clients stay with us\n3️⃣ **CM3 & GECA certified** — highest standards\n4️⃣ **24/7 availability** including emergencies\n5️⃣ **Tailored programs** — never one-size-fits-all\n6️⃣ **Technology-driven** — modern equipment & methods\n7️⃣ **Eco-friendly** — genuinely sustainable practices\n8️⃣ **Transparent pricing** — no hidden surprises\n\nBut the biggest reason? We actually **care**. We treat your space like it's our own. That's the Auzclean difference! 💙",
        ],
        links: [{ label: 'About Us', href: '/about' }],
    },
    trust: {
        texts: [
            "🤝 We're trusted by leading organisations across Queensland:\n\n• Journey Early Learning\n• South Brisbane District Cricket Club\n• BM Property Services\n• Bremer Medical Centre\n• Kuraby Mosque\n• Richard Crookes Constructions\n• ServiceFM\n• West Moreton Health\n\n...plus hundreds more! With a **99% client retention rate**, our clients don't just stay — they recommend us to others. 🌟",
        ],
        links: [{ label: 'Visit Homepage', href: '/' }],
    },
    review: {
        texts: [
            "⭐ Our reputation speaks for itself! With a **99% client retention rate**, clients trust us year after year.\n\nWe work with healthcare, education, government, and corporate clients — all of whom have stringent quality requirements. Check out our homepage for client testimonials!\n\nBest recommendation? Our clients rarely leave us. That says it all! 😊",
        ],
        links: [{ label: '⭐ See Testimonials', href: '/' }],
    },
    social: {
        texts: [
            "📱 **Follow us on social media!**\n\n🔵 **Facebook:** facebook.com/Auzclean\n🔵 **LinkedIn:** linkedin.com/company/auzcleanservices\n\nWe share cleaning tips, project highlights, team stories, and company updates. Give us a follow! 👍",
        ],
    },
};

/* ─── Casual / misc patterns ─── */
const miscPatterns: { patterns: RegExp[]; texts: string[]; links?: ChatLink[] }[] = [
    {
        patterns: [/who are you/, /what are you/, /are you.*bot/, /are you.*real/, /are you.*ai/, /are you.*human/],
        texts: [
            "I'm the Auzclean virtual assistant! 🤖 Not a human, but I know a LOT about Auzclean. I can help with services, pricing, locations, sustainability, and more. Try me with any question!",
            "I'm Auzclean's smart assistant! 🤖 I'm powered by a comprehensive knowledge base about everything Auzclean. Ask me anything — services, quotes, locations, eco practices — you name it!",
        ],
    },
    {
        patterns: [/lol/, /haha/, /funny/, /joke/, /laugh/, /humou?r/],
        texts: [
            "😄 Glad I can brighten your day! Here's a cleaning joke: Why did the janitor quit?\n\nBecause they felt swept aside! 🧹😂\n\nBut seriously, anything I can actually help you with?",
            "Ha! 😄 Here's one for you: What did the vacuum say to the broom? \"You really SUCK at this job!\" 🧹\n\nNow that we've had a laugh — what can I help you with? 😊",
        ],
    },
    {
        patterns: [/how are you/, /how r u/, /how you doin/, /how's it going/, /what'?s up/, /whats up/, /wassup/],
        texts: [
            "I'm doing great, thanks for asking! 😊 Always excited to chat about clean spaces. What can I help you with today?",
            "Wonderful, thanks! 😊 Living my best bot life, helping people find great cleaning services. What's on your mind?",
        ],
    },
    {
        patterns: [/^(ok|okay|cool|nice|great|awesome|sounds good|perfect|alright|sure|yep|yup|yeah|yes)$/],
        texts: [
            "Great! 😊 Is there anything else I can help you with? Feel free to ask about our services, pricing, or anything else!",
            "Awesome! Let me know if you have any other questions — I'm here to help! 😊",
        ],
    },
    {
        patterns: [/help/],
        texts: [
            "Of course! 🙋 Here's what I can help you with:\n\n🏢 Our 7 cleaning services\n💰 Pricing & quotes\n📍 Location & contact info\n🌿 Sustainability practices\n🏅 Certifications\n📸 Gallery of past work\n👥 Careers\n⏰ Operating hours\n\nJust ask about any of these, or type your question naturally!",
        ],
    },
    {
        patterns: [/what can you do/, /your capabilities/, /what do you know/],
        texts: [
            "I know quite a lot about Auzclean! 😊 I can help with:\n\n✅ All 7 cleaning service details\n✅ Getting a free quote\n✅ Contact info & location\n✅ Business hours & availability\n✅ Sustainability & eco practices\n✅ Certifications & compliance\n✅ Our gallery of completed projects\n✅ Career/job enquiries\n✅ Service areas across Queensland\n\nTry asking me anything — I'm smarter than I look! 🤖",
        ],
    },
];

/* ─── Smart fallback responses ─── */
const fallbacks: { text: string; links: ChatLink[] }[] = [
    {
        text: "That's a great question! I might not have the perfect answer, but our team definitely will. Here's how to reach them:\n\n📞 **1300 796 987** (Mon–Fri, 7am–6pm)\n📧 **info@auzcleanfacility.com.au** (24hr response)\n📝 Our online contact form\n\nOr try asking me about our services, pricing, location, or sustainability! 😊",
        links: [{ label: '📝 Contact Us', href: '/contact' }],
    },
    {
        text: "Hmm, I'm not 100% sure about that one! 🤔 But here are things I can definitely help with:\n\n🏢 Our 7 cleaning services\n💰 Getting a free quote\n📍 Where to find us\n🌿 Our eco-friendly approach\n🏅 Certifications & compliance\n📸 Gallery of our work\n\nJust ask, or call us at **1300 796 987** for a human touch!",
        links: [{ label: '📞 Call Us', href: 'tel:1300796987' }],
    },
    {
        text: "I appreciate the question! While that's a bit outside my expertise, I'd love to help with something else. Try asking me:\n\n• \"What services do you offer?\"\n• \"How much does cleaning cost?\"\n• \"Where are you located?\"\n• \"Are you eco-friendly?\"\n• \"Can I see your past work?\"\n\nOr our team is always ready to help at **1300 796 987**! 😊",
        links: [{ label: '📝 Contact Form', href: '/contact' }],
    },
];

/* ─── Context Manager ─── */
export class ConversationContext {
    private history: string[] = [];
    private lastIntent: string | null = null;

    addUserMessage(msg: string) {
        this.history.push(msg);
        if (this.history.length > 10) this.history.shift();
    }

    setLastIntent(intent: string) {
        this.lastIntent = intent;
    }

    getLastIntent(): string | null {
        return this.lastIntent;
    }

    getContextBoost(): Map<string, number> {
        const boosts = new Map<string, number>();
        // Boost follow-up intents based on last topic
        if (this.lastIntent) {
            const followUpMap: Record<string, string[]> = {
                service: ['price', 'quote', 'commercial', 'healthcare', 'industrial', 'education', 'gmp', 'transport', 'specialized'],
                commercial: ['price', 'quote', 'process'],
                healthcare: ['price', 'quote', 'certification', 'hygiene'],
                industrial: ['price', 'quote', 'process'],
                education: ['price', 'quote', 'sustainability'],
                gmp: ['price', 'quote', 'certification'],
                transport: ['price', 'quote'],
                specialized: ['price', 'quote'],
                price: ['quote', 'process', 'contact'],
                quote: ['process', 'contact', 'area'],
                about: ['why', 'certification', 'sustainability', 'trust'],
                sustainability: ['certification', 'about'],
                why: ['quote', 'contact', 'process'],
                gallery: ['service', 'quote'],
            };
            const related = followUpMap[this.lastIntent] || [];
            for (const r of related) {
                boosts.set(r, 2);
            }
        }
        return boosts;
    }
}

/* ─── Main response function ─── */
export function generateResponse(
    userInput: string,
    context: ConversationContext
): BotResponse {
    const normalised = normalise(userInput);
    const words = normalised.split(' ').filter(w => w.length > 0);
    context.addUserMessage(normalised);

    // 1. Check misc patterns first (greetings, jokes, etc.)
    for (const misc of miscPatterns) {
        for (const pattern of misc.patterns) {
            if (pattern.test(normalised)) {
                const text = misc.texts[Math.floor(Math.random() * misc.texts.length)];
                return { text, links: misc.links };
            }
        }
    }

    // 2. Expand words to intents via synonyms
    const intentScores = expandToIntents(words, normalised);

    // 3. Apply question pattern boosts
    for (const qp of questionPatterns) {
        for (const pattern of qp.patterns) {
            if (pattern.test(normalised)) {
                const current = intentScores.get(qp.intentBoost) || 0;
                intentScores.set(qp.intentBoost, current + qp.boost);
            }
        }
    }

    // 4. Apply context boosts
    const contextBoosts = context.getContextBoost();
    for (const [intent, boost] of contextBoosts) {
        const current = intentScores.get(intent) || 0;
        if (current > 0) {
            intentScores.set(intent, current + boost);
        }
    }

    // 5. Find the best intent
    let bestIntent: string | null = null;
    let bestScore = 0;
    for (const [intent, score] of intentScores) {
        if (score > bestScore && intentResponses[intent]) {
            bestScore = score;
            bestIntent = intent;
        }
    }

    // 6. If we have a match, return a random variant
    if (bestIntent && bestScore >= 3) {
        const entry = intentResponses[bestIntent];
        const text = entry.texts[Math.floor(Math.random() * entry.texts.length)];
        context.setLastIntent(bestIntent);
        return { text, links: entry.links };
    }

    // 7. Smart fallback
    const fb = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    return { text: fb.text, links: fb.links };
}
