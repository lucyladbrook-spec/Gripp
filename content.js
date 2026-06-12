/* ============================================================
   GRIPP CONTENT STORE
   ============================================================
   This is the ONLY file you need to edit to change content.
   It is plain JSON inside a JS wrapper (window.GRIPP = {...})
   so the site works both on GitHub Pages AND when you open
   the HTML files directly from your computer (fetch() of a
   .json file fails on file://, this approach never does).

   HOW ENTRIES WORK
   ----------------
   Every piece of content is one object in the "entries" list.

   Shared fields (all entry types):
     id          unique string, anything you like
     type        "resource" | "activity" | "idea" | "product"
     subject     "maths" | "english" | "science" | "geography"
     title       shown as the card heading
     description shown as the card body
     audience    array — any of "teacher", "parent", "student",
                 or ["all"]. Controls which views show the card.
     years       array — ["KS1"], ["Y1"], ["Y2"], or combos.
                 Adding Y3–Y6 later: just add "Y3" etc. here and
                 to the YEAR_GROUPS list at the bottom. Nothing
                 else changes.

   Type-specific fields:
     resource →  downloadUrl  (link to your PDF/file)
     activity →  either  quiz: {...}  (uses the built-in quiz
                 engine — see examples) or  url  (link out to
                 an activity hosted elsewhere, e.g. one of your
                 microsites or games)
     idea     →  text: { teacher: "...", parent: "...",
                 student: "..." } — the SAME entry reads
                 differently per audience. Omit a key to hide
                 the entry from that audience.
     product  →  url          plain product page (fallback)
                 affiliateUrl YOUR affiliate link — swap freely;
                              if present it is used instead of
                              url. NEVER shown in student view.
                 framing: { teacher: "...", parent: "..." }
                              optional per-audience pitch line
                              shown under the description.
   ============================================================ */

window.GRIPP = {

  site: {
    name: "Gripp",
    tagline: "Get a grip on learning.",
    promise: "Curriculum resources, activities and ideas for KS1 — shaped around whoever's looking."
  },

  /* Subject metadata — controls the hub tiles and microsite headers.
     "blurb" adapts per audience just like idea entries. */
  subjects: {
    maths: {
      name: "Maths",
      emoji: "🔢",
      strap: {
        teacher: "Fluency, reasoning and problem-solving resources mapped to the KS1 programme of study.",
        parent: "What your child is learning in maths this year, and easy ways to back it up at home.",
        student: "Numbers, shapes and puzzles. Let's go!"
      }
    },
    english: {
      name: "English",
      emoji: "📖",
      strap: {
        teacher: "Phonics, reading, writing and oracy resources for Years 1 and 2.",
        parent: "How reading and writing are taught now — and how ten minutes a day makes a difference.",
        student: "Stories, sounds and words. Ready to read?"
      }
    },
    science: {
      name: "Science",
      emoji: "🔬",
      strap: {
        teacher: "Working scientifically resources and enquiry-led units for KS1.",
        parent: "Kitchen-table science: real investigations with things you already have at home.",
        student: "Be a scientist! What will you discover?"
      }
    },
    geography: {
      name: "Geography",
      emoji: "🌍",
      strap: {
        teacher: "Place knowledge, fieldwork and map skills units for KS1.",
        parent: "Maps, seasons and the wider world — geography is everywhere once you start looking.",
        student: "Explore the world without leaving your seat!"
      }
    }
  },

  /* ============================================================
     ENTRIES — replace the placeholders below with real content.
     Each one shows the exact shape to copy.
     ============================================================ */
  entries: [

    /* ---------------- MATHS ---------------- */
    {
      id: "maths-res-1",
      type: "resource",
      subject: "maths",
      title: "Adding 9 and 11 strategy worksheets",
      description: "Differentiated worksheets using the 'add 10, adjust by 1' strategy, three ability levels with visual scaffolds.",
      downloadUrl: "#REPLACE-with-link-to-your-PDF",
      audience: ["teacher", "parent"],
      years: ["Y2"]
    },
    {
      id: "maths-res-2",
      type: "resource",
      subject: "maths",
      title: "Part-whole model templates",
      description: "Blank part-whole models in three sizes for number bonds work, ready to laminate.",
      downloadUrl: "#REPLACE-with-link-to-your-PDF",
      audience: ["teacher"],
      years: ["Y1", "Y2"]
    },
    {
      id: "maths-act-1",
      type: "activity",
      subject: "maths",
      title: "Number bonds to 10",
      description: "Quick-fire pairs that make 10. How many can you get right?",
      audience: ["all"],
      years: ["Y1"],
      quiz: {
        intro: "Find the missing number to make 10!",
        questions: [
          { q: "7 + ? = 10", options: ["2", "3", "4"], answer: "3" },
          { q: "5 + ? = 10", options: ["5", "6", "4"], answer: "5" },
          { q: "9 + ? = 10", options: ["1", "2", "0"], answer: "1" },
          { q: "2 + ? = 10", options: ["7", "8", "9"], answer: "8" },
          { q: "6 + ? = 10", options: ["3", "4", "5"], answer: "4" }
        ]
      }
    },
    {
      id: "maths-act-2",
      type: "activity",
      subject: "maths",
      title: "2D shape spotter",
      description: "Can you name the shape from its sides and corners?",
      audience: ["all"],
      years: ["Y1", "Y2"],
      quiz: {
        intro: "Read the clue. Which shape is it?",
        questions: [
          { q: "I have 3 sides and 3 corners.", options: ["Square", "Triangle", "Circle"], answer: "Triangle" },
          { q: "I have 4 equal sides.", options: ["Square", "Rectangle", "Pentagon"], answer: "Square" },
          { q: "I have no corners at all.", options: ["Hexagon", "Triangle", "Circle"], answer: "Circle" },
          { q: "I have 6 sides.", options: ["Pentagon", "Hexagon", "Octagon"], answer: "Hexagon" }
        ]
      }
    },
    {
      id: "maths-idea-1",
      type: "idea",
      subject: "maths",
      title: "Number bonds with real objects",
      description: "",
      audience: ["all"],
      years: ["Y1"],
      text: {
        teacher: "Use tens frames with double-sided counters for a CPA progression: concrete partitioning first, then pictorial recording, then the abstract number sentence. Stem sentence: '__ and __ makes 10.'",
        parent: "Grab 10 of anything — pasta shells, Lego bricks, socks. Split the pile in two and ask 'how many in each hand?' Five minutes while dinner cooks is genuinely enough.",
        student: "Get 10 toys. Hide some behind your back. Can someone guess how many are hiding? Swap and play again!"
      }
    },
    {
      id: "maths-prod-1",
      type: "product",
      subject: "maths",
      title: "Numicon starter set",
      description: "Tactile number shapes for early number sense, place value and bonds.",
      url: "https://example.com/numicon",
      affiliateUrl: "#REPLACE-with-your-affiliate-link",
      audience: ["teacher", "parent"],
      years: ["KS1"],
      framing: {
        teacher: "A staple for CPA teaching — ideal for intervention groups and whole-class modelling under a visualiser.",
        parent: "One of the few maths toys that genuinely matches how school teaches number. Brilliant for the kitchen table."
      }
    },
    {
      id: "maths-prod-2",
      type: "product",
      subject: "maths",
      title: "Times Tables Rock Stars subscription",
      description: "Game-based times tables and number facts practice, used by thousands of UK schools.",
      url: "https://ttrockstars.com",
      affiliateUrl: "#REPLACE-with-your-affiliate-link",
      audience: ["teacher", "parent"],
      years: ["Y2"],
      framing: {
        teacher: "School subscriptions include class data dashboards — useful evidence of fluency progress over time.",
        parent: "If your child's school already uses it, ask for their login — daily five-minute sessions beat one long weekend slog."
      }
    },

    /* ---------------- ENGLISH ---------------- */
    {
      id: "eng-res-1",
      type: "resource",
      subject: "english",
      title: "'Talk Like a...' oracy prompt cards",
      description: "Role-based sentence stems (storyteller, scientist, historian) for structured classroom talk.",
      downloadUrl: "#REPLACE-with-link-to-your-PDF",
      audience: ["teacher"],
      years: ["Y1", "Y2"]
    },
    {
      id: "eng-res-2",
      type: "resource",
      subject: "english",
      title: "Phase 5 phonics sound mat",
      description: "Child-friendly sound mat with mnemonics, printable at A4 or A5 for book bags.",
      downloadUrl: "#REPLACE-with-link-to-your-PDF",
      audience: ["teacher", "parent"],
      years: ["Y1"]
    },
    {
      id: "eng-act-1",
      type: "activity",
      subject: "english",
      title: "Real word or alien word?",
      description: "Some of these words are real. Some are alien words! Can you tell?",
      audience: ["all"],
      years: ["Y1"],
      quiz: {
        intro: "Sound it out... is it a REAL word or an ALIEN word?",
        questions: [
          { q: "chip", options: ["Real", "Alien"], answer: "Real" },
          { q: "vop", options: ["Real", "Alien"], answer: "Alien" },
          { q: "rain", options: ["Real", "Alien"], answer: "Real" },
          { q: "quemp", options: ["Real", "Alien"], answer: "Alien" },
          { q: "shark", options: ["Real", "Alien"], answer: "Real" }
        ]
      }
    },
    {
      id: "eng-idea-1",
      type: "idea",
      subject: "english",
      title: "Reading aloud, every day",
      description: "",
      audience: ["all"],
      years: ["KS1"],
      text: {
        teacher: "Protect a daily read-aloud slot beyond the reading scheme — vocabulary-rich texts above decoding level build the Tier 2 vocabulary (Beck et al.) that independent reading can't yet reach.",
        parent: "Keep reading TO your child even once they can read themselves. They can understand far richer stories than they can decode, and it keeps reading feeling like a treat, not a test.",
        student: "Ask a grown-up to read you a story tonight. You choose the book — even one you've heard a hundred times!"
      }
    },
    {
      id: "eng-prod-1",
      type: "product",
      subject: "english",
      title: "Julia Donaldson story collection",
      description: "Rhyme-rich picture books that KS1 children ask for again and again.",
      url: "https://example.com/donaldson-collection",
      affiliateUrl: "#REPLACE-with-your-affiliate-link",
      audience: ["teacher", "parent"],
      years: ["KS1"],
      framing: {
        teacher: "Strong for performance reading, rhyme prediction and 'magpie' vocabulary in shared writing.",
        parent: "Repetition and rhyme do real work here — being able to join in is what hooks reluctant readers."
      }
    },

    /* ---------------- SCIENCE ---------------- */
    {
      id: "sci-res-1",
      type: "resource",
      subject: "science",
      title: "Plant growth observation diary",
      description: "Weekly recording booklet for the borlotti bean unit — drawing frames, measurement track and sentence stems.",
      downloadUrl: "#REPLACE-with-link-to-your-PDF",
      audience: ["teacher", "parent"],
      years: ["Y2"]
    },
    {
      id: "sci-act-1",
      type: "activity",
      subject: "science",
      title: "What do plants need?",
      description: "A quick quiz about growing healthy plants.",
      audience: ["all"],
      years: ["Y2"],
      quiz: {
        intro: "Help the bean grow! Pick the right answers.",
        questions: [
          { q: "Which of these does a plant NEED to grow?", options: ["Water", "Sweets", "Music"], answer: "Water" },
          { q: "Where does a seed start growing?", options: ["In the soil", "In the sky", "In the fridge"], answer: "In the soil" },
          { q: "What do leaves use to make food?", options: ["Sunlight", "Moonlight", "Torchlight"], answer: "Sunlight" },
          { q: "What grows DOWN from the seed first?", options: ["The root", "The flower", "The leaf"], answer: "The root" }
        ]
      }
    },
    {
      id: "sci-idea-1",
      type: "idea",
      subject: "science",
      title: "Grow a bean in a jar",
      description: "",
      audience: ["all"],
      years: ["Y2"],
      text: {
        teacher: "Germinate beans in clear jars with damp kitchen roll so root and shoot growth is visible — pair with a working-scientifically focus on observing over time and measuring with non-standard then standard units.",
        parent: "A bean, a jam jar, damp kitchen roll on a windowsill. Check it together each morning — the day the root appears is genuinely exciting, and it's the whole Y2 plants unit in miniature.",
        student: "Plant a bean in a see-through jar and check it every morning. Which comes first — the root or the shoot? Draw what you see!"
      }
    },
    {
      id: "sci-prod-1",
      type: "product",
      subject: "science",
      title: "Kids' magnifying glass set",
      description: "Chunky, drop-proof magnifiers sized for small hands.",
      url: "https://example.com/magnifiers",
      affiliateUrl: "#REPLACE-with-your-affiliate-link",
      audience: ["teacher", "parent"],
      years: ["KS1"],
      framing: {
        teacher: "A class set turns any outdoor area into a minibeast fieldwork session with zero prep.",
        parent: "Garden, park, pavement cracks — everything is more interesting magnified. Great for screen-free afternoons."
      }
    },

    /* ---------------- GEOGRAPHY ---------------- */
    {
      id: "geo-res-1",
      type: "resource",
      subject: "geography",
      title: "St Ives seaside vocabulary cards",
      description: "Tier 2 and Tier 3 vocabulary cards (harbour, coastline, cliff, bay) with photos and child-friendly definitions.",
      downloadUrl: "#REPLACE-with-link-to-your-PDF",
      audience: ["teacher"],
      years: ["Y2"]
    },
    {
      id: "geo-act-1",
      type: "activity",
      subject: "geography",
      title: "UK Seaside explorer",
      description: "Visit the interactive seaside site — 11 sections and 6 games about the UK coast.",
      url: "https://lucyladbrook-spec.github.io/seaside/",
      audience: ["all"],
      years: ["Y2"]
    },
    {
      id: "geo-act-2",
      type: "activity",
      subject: "geography",
      title: "Hot or cold?",
      description: "Around the world we go — is it hot or cold there?",
      audience: ["all"],
      years: ["Y1"],
      quiz: {
        intro: "Pack your suitcase! Is this place HOT or COLD?",
        questions: [
          { q: "The North Pole", options: ["Hot", "Cold"], answer: "Cold" },
          { q: "The Sahara Desert", options: ["Hot", "Cold"], answer: "Hot" },
          { q: "Antarctica", options: ["Hot", "Cold"], answer: "Cold" },
          { q: "A rainforest near the Equator", options: ["Hot", "Cold"], answer: "Hot" }
        ]
      }
    },
    {
      id: "geo-idea-1",
      type: "idea",
      subject: "geography",
      title: "Maps start at the front door",
      description: "",
      audience: ["all"],
      years: ["KS1"],
      text: {
        teacher: "Begin map skills with the immediately familiar: plan views of the classroom, then the school grounds, before zooming out to UK maps — concrete to abstract applies to space as much as number.",
        parent: "Draw a wobbly map of the walk to school together, marking three landmarks. Next walk, let your child navigate from their own map.",
        student: "Draw a map of your bedroom from above, like a bird looking down. Can someone find your favourite toy using only your map?"
      }
    },
    {
      id: "geo-prod-1",
      type: "product",
      subject: "geography",
      title: "Children's atlas of the UK",
      description: "Picture-led first atlas covering countries, capitals, seas and landmarks.",
      url: "https://example.com/uk-atlas",
      affiliateUrl: "#REPLACE-with-your-affiliate-link",
      audience: ["teacher", "parent"],
      years: ["KS1"],
      framing: {
        teacher: "Useful as a reference station during place-knowledge units — children locate each place you study.",
        parent: "Keep it within reach of the sofa. 'Where's that?' moments during TV are the best geography lessons going."
      }
    }
  ],

  /* Year groups shown in the filter. To expand to KS2 later,
     just add "Y3", "Y4"... here and start tagging entries. */
  YEAR_GROUPS: ["KS1", "Y1", "Y2"]
};
