export interface GalleryDetail {
  slug: string;
  clientName: string;
  industry: string;
  productType: string;
  description: string;
  fullDescription: string;
  gradient: string;
  gradientLight: string;
  features: string[];
  specs: { label: string; value: string }[];
  testimonial: string;
  testimonialAuthor: string;
  testimonialRole: string;
  testimonialCompany: string;
  images: { image: string; gradient: string; label: string }[];
  timeline: { phase: string; description: string }[];
  result: string;
}

export const GALLERY_DATA: Record<string, GalleryDetail> = {
  "giant-arch-event": {
    slug: "giant-arch-event",
    clientName: "Skyline Promotions",
    industry: "Events",
    productType: "Advertising Arches",
    description:
      "A towering branded inflatable arch anchoring the entrance of a nationwide expo tour.",
    fullDescription:
      "Skyline Promotions needed a bold welcome structure for a 12-city expo tour. The inflatable arch had to be tall enough to anchor the entrance, fast to set up by a two-person crew, and bold enough to read from across the parking lot. A custom dye-sublimated skin carried the tour sponsor branding on all four faces.\n\nEngineering focused on wind stability and rapid deployment. A reinforced base plate and angled leg design kept the arch planted in gusty venue conditions, while modular tube sections let the crew assemble the full structure in under 25 minutes. Internal LED tracing lit the sponsor panels for evening VIP previews.\n\nAfter the tour, the client commissioned two additional arches in different sizes for regional events, citing the structure's durability and the brand visibility it generated on social channels.",
    gradient: "from-navy-600 to-red-600",
    gradientLight: "from-navy-100 to-red-100",
    features: [
      "Full-color dye-sublimated branding on all faces",
      "Reinforced angled-leg base for wind stability",
      "Internal LED edge lighting for night events",
      "Tool-free modular assembly under 25 minutes",
    ],
    specs: [
      { label: "Height", value: "26 ft (7.9 m)" },
      { label: "Span", value: "30 ft (9.1 m)" },
      { label: "Inflation Time", value: "< 5 minutes" },
      { label: "Material", value: "210D Oxford Polyester" },
    ],
    testimonial:
      "The arch became the photo landmark of our entire tour — attendees tagged us in thousands of posts before the doors even opened.",
    testimonialAuthor: "Priya Nandakumar",
    testimonialRole: "Tour Director",
    testimonialCompany: "Skyline Promotions",
    images: [
      { image: "/images/products/inflatable-arch/1.png", gradient: "from-navy-600 to-red-600", label: "Expo Entrance Arch" },
      { image: "/images/products/inflatable-arch/15.jpg", gradient: "from-navy-500 to-red-500", label: "Night LED View" },
      { image: "/images/products/inflatable-arch/22.png", gradient: "from-navy-700 to-red-700", label: "Setup Detail" },
      { image: "/images/products/inflatable-arch/11.jpg", gradient: "from-red-600 to-navy-600", label: "Crowd Perspective" },
    ],
    timeline: [
      {
        phase: "Concept & Design",
        description:
          "Designers translated the sponsor's brand kit into a 3D arch mockup, iterating on leg angle and panel layout for maximum readability from approach roads.",
      },
      {
        phase: "Engineering & Build",
        description:
          "Engineers selected a reinforced base plate and modular tube system. A half-scale prototype was wind-tunnel tested before full production.",
      },
      {
        phase: "Tour Deployment",
        description:
          "The arch shipped in a single wheeled case and was assembled by a two-person crew at each of the 12 stops, with zero structural incidents reported.",
      },
    ],
    result:
      "The arch anchored 12 sold-out expo stops and drove a 40% lift in sponsor-branded social posts across the tour.",
  },

  "dinosaur-theme-park": {
    slug: "dinosaur-theme-park",
    clientName: "Jurassic Landing",
    industry: "Entertainment",
    productType: "Inflatable Sculptures",
    description:
      "Life-sized inflatable dinosaur sculptures installed as a walk-through themed zone at a regional amusement park.",
    fullDescription:
      "Jurassic Landing wanted to add a temporary immersive zone without the cost and permitting of permanent fiberglass sculptures. The brief called for a herd of life-sized inflatable dinosaurs — towering T-Rex, grazing brachiosaurus, and a pack of raptors — that guests could walk between and photograph.\n\nThe sculptures were built on a heavy-duty PVC bladder with a brushed oxford skin dyed in deep reptilian greens and browns. Hidden anchor points kept each figure stable in the park's open plaza, and internal blowers maintained pressure silently so the zone stayed immersive.\n\nWithin the first month the dinosaur zone became the park's most photographed area, prompting the client to extend the run and commission two additional species for the following season.",
    gradient: "from-navy-600 to-red-600",
    gradientLight: "from-navy-100 to-red-100",
    features: [
      "Life-sized silhouettes up to 30 ft tall",
      "Silent internal constant-pressure blowers",
      "Hidden ground anchors for plaza stability",
      "UV-stabilized skin for outdoor seasons",
    ],
    specs: [
      { label: "Tallest Figure", value: "30 ft (9.1 m)" },
      { label: "Herd Size", value: "7 sculptures" },
      { label: "Material", value: "PVC bladder + Oxford skin" },
      { label: "Setup Time", value: "1 day, 4-person crew" },
    ],
    testimonial:
      "Guests genuinely gasped walking under the brachiosaurus. It became the photo everyone posted — our Google review average jumped half a star.",
    testimonialAuthor: "Marco Espinoza",
    testimonialRole: "Park Operations Manager",
    testimonialCompany: "Jurassic Landing",
    images: [
      { image: "/images/products/inflatable-animals/充气恐龙_1.jpg", gradient: "from-navy-600 to-red-600", label: "T-Rex Centerpiece" },
      { image: "/images/products/inflatable-animals/充气恐龙_5.jpg", gradient: "from-navy-500 to-red-500", label: "Walk-Through Herd" },
      { image: "/images/products/inflatable-animals/充气恐龙_12.jpg", gradient: "from-navy-700 to-red-700", label: "Detail Closeup" },
    ],
    timeline: [
      {
        phase: "Concept & Sculpts",
        description:
          "Paleo artists referenced museum specimens to sculpt accurate silhouettes, then produced 3D models sized to the park's plaza footprint.",
      },
      {
        phase: "Production & Anchoring",
        description:
          "Each figure was built on a PVC bladder with an oxford skin and load-tested ground anchors tuned to the plaza's paver layout.",
      },
      {
        phase: "Install & Launch",
        description:
          "A four-person crew installed the full herd overnight, and the zone opened to guests the next morning with no visible construction痕迹.",
      },
    ],
    result:
      "The dinosaur zone became the park's top-rated attraction within 30 days and added two new species to the next season's order.",
  },

  "brand-mascot-launch": {
    slug: "brand-mascot-launch",
    clientName: "Crackle Snacks",
    industry: "CPG",
    productType: "Custom Mascots",
    description:
      "A 22-foot inflatable mascot replica deployed for a new product launch across retail lobbies and launch events.",
    fullDescription:
      "Crackle Snacks was introducing a refreshed mascot character and wanted a larger-than-life inflatable version to anchor the launch events in flagship retail lobbies. The figure needed to match the 2D brand guide exactly — same pose, same expression, same color values — while standing stable in high-traffic indoor spaces.\n\nProduction used dye-sublimated oxford over a sculpted PVC form so the mascot's gradients and facial detail read cleanly up close. A weighted sandbag base and low-noise blower kept the figure upright and quiet in echoey retail atriums.\n\nThe mascot toured 8 launch events and became the centerpiece of the brand's launch photography, appearing in trade press and the client's own ad creative.",
    gradient: "from-navy-600 to-red-600",
    gradientLight: "from-navy-100 to-red-100",
    features: [
      "Exact match to 2D brand mascot guide",
      "Weighted sandbag base for indoor lobbies",
      "Whisper-quiet blower for retail atriums",
      "Removable skin for seasonal outfit swaps",
    ],
    specs: [
      { label: "Height", value: "22 ft (6.7 m)" },
      { label: "Base Footprint", value: "10 ft (3.0 m)" },
      { label: "Material", value: "210D Oxford + PVC form" },
      { label: "Blower Noise", value: "< 45 dB" },
    ],
    testimonial:
      "Our mascot has never looked better. The inflatable drew crowds in every lobby we booked and showed up in every launch photo.",
    testimonialAuthor: "Dana Whittaker",
    testimonialRole: "Brand Director",
    testimonialCompany: "Crackle Snacks",
    images: [
      { image: "/images/products/inflatable-mascot/1.jpg", gradient: "from-navy-600 to-red-600", label: "Lobby Centerpiece" },
      { image: "/images/products/inflatable-mascot/3.png", gradient: "from-navy-500 to-red-500", label: "Mascot Detail" },
      { image: "/images/products/inflatable-mascot/20.jpg", gradient: "from-red-600 to-navy-600", label: "Launch Event Crowd" },
    ],
    timeline: [
      {
        phase: "Brand Alignment",
        description:
          "Designers cross-referenced the brand guide pose, expression, and Pantone values, producing a color-matched 3D sculpt for client sign-off.",
      },
      {
        phase: "Sculpt & Print",
        description:
          "The PVC form was sculpted and the oxford skin dye-sublimated in a single pass to preserve gradient fidelity across the mascot's face.",
      },
      {
        phase: "Launch Tour",
        description:
          "The figure was shipped to 8 retail lobbies with a one-page setup guide; store teams had it standing in under 20 minutes per stop.",
      },
    ],
    result:
      "The mascot anchored 8 launch events and appeared in 100% of the brand's launch-day press photography.",
  },

  "outdoor-cinema-night": {
    slug: "outdoor-cinema-night",
    clientName: "Starlight Screenings",
    industry: "Events",
    productType: "Event Equipment",
    description:
      "A 40-foot inflatable movie screen powering a summer-long outdoor cinema series in city parks.",
    fullDescription:
      "Starlight Screenings runs free outdoor movie nights in city parks and needed a screen that could go up fast, survive wind and evening dew, and deliver a bright projection surface visible from 200 feet away. The 40-foot inflatable screen frame carries a front-projection skin tensioned flat enough for 4K content.\n\nThe frame uses a dual-chamber bladder so a single puncture doesn't collapse the screen mid-film. Tie-downs are rated for open-field gusts, and the skin is removable for cleaning after dusty park nights. A quiet external blower maintains constant pressure without competing with the film's audio.\n\nAfter one season the client expanded from 6 to 14 parks, citing the screen's reliability and the 'wow' factor of a 40-foot image lighting up a park at dusk.",
    gradient: "from-navy-600 to-red-600",
    gradientLight: "from-navy-100 to-red-100",
    features: [
      "40 ft front-projection screen surface",
      "Dual-chamber bladder for puncture redundancy",
      "Wind-rated open-field tie-down system",
      "Whisper constant-pressure blower",
    ],
    specs: [
      { label: "Screen Size", value: "40 ft (12.2 m) diagonal" },
      { label: "Surface Gain", value: "1.2 matte white" },
      { label: "Material", value: "PVC frame + lycra skin" },
      { label: "Setup Time", value: "45 minutes, 2 crew" },
    ],
    testimonial:
      "We projected 4K onto that screen every Friday all summer without a single wrinkle or collapse. Park attendance doubled.",
    testimonialAuthor: "Elena Forsberg",
    testimonialRole: "Program Director",
    testimonialCompany: "Starlight Screenings",
    images: [
      { image: "/images/products/inflatable-movie-screen/1.jpg", gradient: "from-navy-600 to-red-600", label: "Dusk Screening" },
      { image: "/images/products/inflatable-movie-screen/3.jpg", gradient: "from-navy-500 to-red-500", label: "Screen Setup" },
      { image: "/images/products/inflatable-movie-screen/20.jpg", gradient: "from-navy-700 to-red-700", label: "Park Crowd" },
    ],
    timeline: [
      {
        phase: "Site Survey",
        description:
          "Crew surveyed each park for projection throw distance, power access, and prevailing wind, then tuned the tie-down plan per site.",
      },
      {
        phase: "Build & Testing",
        description:
          "The dual-chamber frame and tensioned skin were built and projection-tested at 4K to confirm flatness across the full surface.",
      },
      {
        phase: "Season Run",
        description:
          "The screen ran 14 Friday nights across the summer with no collapses; the skin was cleaned weekly and stored rolled, not folded.",
      },
    ],
    result:
      "The series expanded from 6 to 14 parks the next season and averaged 1,800 attendees per screening.",
  },

  "bottle-replica-campaign": {
    slug: "bottle-replica-campaign",
    clientName: "Harbor Beverages",
    industry: "Food & Beverage",
    productType: "Product Replicas",
    description:
      "A 24-foot inflatable bottle replica touring beach festivals for a summer drink launch.",
    fullDescription:
      "Harbor Beverages was launching a summer drink line and wanted a giant bottle replica to anchor their beach festival activation. The inflatable had to match the actual bottle's label, cap, and color exactly while standing stable on sand in coastal wind.\n\nThe replica was built with a weighted water-ballast base so it stood firm on sand without stakes, and a UV-stabilized dye-sublimated skin kept the label colors true under direct sun. A removable cap section doubled as a branded photo backdrop at the festival booth.\n\nThe bottle toured 9 beach festivals and became the campaign's most-used asset in user-generated content, prompting the client to order a second unit for international dates.",
    gradient: "from-navy-600 to-red-600",
    gradientLight: "from-navy-100 to-red-100",
    features: [
      "Exact label, cap, and color match to retail bottle",
      "Water-ballast base for sand stability",
      "UV-stabilized skin for direct-sun festivals",
      "Removable cap as branded photo backdrop",
    ],
    specs: [
      { label: "Height", value: "24 ft (7.3 m)" },
      { label: "Base Diameter", value: "7 ft (2.1 m)" },
      { label: "Material", value: "210D Oxford, UV-stabilized" },
      { label: "Setup Time", value: "20 minutes, 2 crew" },
    ],
    testimonial:
      "People lined up to take photos with the bottle. It was the single most-tagged object at every beach fest we booked.",
    testimonialAuthor: "Theo Marchetti",
    testimonialRole: "Activation Lead",
    testimonialCompany: "Harbor Beverages",
    images: [
      { image: "/images/products/inflatable-bottle/3.png", gradient: "from-navy-600 to-red-600", label: "Beach Festival" },
      { image: "/images/products/inflatable-bottle/5.jpg", gradient: "from-navy-500 to-red-500", label: "Label Detail" },
      { image: "/images/products/inflatable-bottle/啤酒杯_1.jpg", gradient: "from-red-600 to-navy-600", label: "Photo Op Crowd" },
    ],
    timeline: [
      {
        phase: "Artwork Match",
        description:
          "Designers pulled the retail bottle's dieline and Pantone values, producing a color-matched 3D replica for client approval before print.",
      },
      {
        phase: "Base Engineering",
        description:
          "A water-ballast base was engineered for sand stability, load-tested in simulated coastal gusts up to 35 mph.",
      },
      {
        phase: "Festival Tour",
        description:
          "The bottle toured 9 beach festivals, assembled by a two-person crew per stop with the removable cap doubling as the booth photo wall.",
      },
    ],
    result:
      "The bottle became the campaign's most-tagged asset, driving 38,000 user-generated posts across the 9-stop tour.",
  },

  "mirror-ball-concert": {
    slug: "mirror-ball-concert",
    clientName: "Nova Live",
    industry: "Entertainment",
    productType: "Decorations",
    description:
      "A 16-foot inflatable mirror ball suspended above the stage for an arena concert residency.",
    fullDescription:
      "Nova Live wanted a disco-era centerpiece for an artist's arena residency: a giant mirror ball suspended above the stage that caught the lighting rig from every angle. The inflatable mirror ball uses a faceted silver-mylar skin over a lightweight frame, suspended from the arena's roof motor points.\n\nThe facets are individually applied mylar tiles tuned to scatter light without hot-spotting the audience, and the internal structure is rated for the arena's rigging loads. At 16 feet it reads from the back of the bowl while staying light enough for the roof motors to lift and rotate safely.\n\nThe ball became the visual signature of the residency, appearing in tour photography and the live album cover, and was later re-rigged for the artist's festival headline set.",
    gradient: "from-navy-600 to-red-600",
    gradientLight: "from-navy-100 to-red-100",
    features: [
      "Faceted silver-mylar tile skin",
      "Lightweight frame rated for arena rigging",
      "Rotatable via roof motor points",
      "Tuned facet angles to avoid audience hot-spots",
    ],
    specs: [
      { label: "Diameter", value: "16 ft (4.9 m)" },
      { label: "Tile Count", value: "1,200+ mylar facets" },
      { label: "Material", value: "Lightweight frame + mylar skin" },
      { label: "Rigging Load", value: "Rated to arena spec" },
    ],
    testimonial:
      "When that ball dropped into the rig and the lights hit it, the whole arena gasped. It's on the album cover now.",
    testimonialAuthor: "Rae Okonkwo",
    testimonialRole: "Production Designer",
    testimonialCompany: "Nova Live",
    images: [
      { image: "/images/products/inflatable-mirror-ball/2.jpg", gradient: "from-navy-600 to-red-600", label: "Stage Centerpiece" },
      { image: "/images/products/inflatable-mirror-ball/5.jpg", gradient: "from-navy-500 to-red-500", label: "Facet Detail" },
      { image: "/images/products/inflatable-mirror-ball/10.jpg", gradient: "from-red-600 to-navy-600", label: "Arena Wide Shot" },
    ],
    timeline: [
      {
        phase: "Rigging Coordination",
        description:
          "Production coordinated with the arena's rigging team on roof motor loads and rotation points before the ball was fabricated.",
      },
      {
        phase: "Facet Tuning",
        description:
          "Mylar facets were applied at angles tuned in a dark studio with the tour's lighting rig to confirm scatter pattern and avoid hot-spots.",
      },
      {
        phase: "Residency Run",
        description:
          "The ball was rigged for the full residency and later re-rigged for the artist's festival headline with no re-fabrication needed.",
      },
    ],
    result:
      "The mirror ball became the residency's visual signature and was featured on the live album cover and tour photography.",
  },

  "sports-tunnel-entrance": {
    slug: "sports-tunnel-entrance",
    clientName: "Capstone Athletics",
    industry: "Sports",
    productType: "Event Structures",
    description:
      "A branded inflatable run-out tunnel for a college football team's home-game player entrance.",
    fullDescription:
      "Capstone Athletics wanted a cinematic player entrance for home football games: a branded inflatable tunnel the team could run through onto the field. The tunnel needed to span the field tunnel mouth, carry the team's wordmark and sponsors on both sides, and survive being set up and torn down every game weekend.\n\nThe tunnel uses a ribbed frame for lateral stability when players brush the walls mid-run, and a replaceable lower panel section that takes the brunt of cleat contact. Dye-sublimated skins carry full-bleed branding on both faces, and the whole structure packs into a single cargo case for away-game transport.\n\nAfter the first season the tunnel became a pregame ritual fans timed their arrival to, and the client ordered a second unit for the basketball arena entrance.",
    gradient: "from-navy-600 to-red-600",
    gradientLight: "from-navy-100 to-red-100",
    features: [
      "Ribbed frame for lateral player-contact stability",
      "Replaceable lower cleat-contact panels",
      "Full-bleed dye-sublimated branding both faces",
      "Single cargo-case pack for transport",
    ],
    specs: [
      { label: "Length", value: "30 ft (9.1 m)" },
      { label: "Tunnel Mouth", value: "12 ft (3.7 m) wide" },
      { label: "Material", value: "500D Cordura + replaceable lowers" },
      { label: "Setup Time", value: "30 minutes, 3 crew" },
    ],
    testimonial:
      "Our players feed off that entrance — the tunnel is the moment fans time their seats to. Built like a tank, too.",
    testimonialAuthor: "Coach Reggie Holt",
    testimonialRole: "Head Football Coach",
    testimonialCompany: "Capstone Athletics",
    images: [
      { image: "/images/products/inflatable-tunnel/2.png", gradient: "from-navy-600 to-red-600", label: "Run-Out Entrance" },
      { image: "/images/products/inflatable-tunnel/5.jpg", gradient: "from-navy-500 to-red-500", label: "Branding Detail" },
      { image: "/images/products/inflatable-tunnel/10.jpg", gradient: "from-red-600 to-navy-600", label: "Pregame Crowd" },
    ],
    timeline: [
      {
        phase: "Field Measurement",
        description:
          "Crew measured the field tunnel mouth and player path, then designed the ribbed frame to clear shoulder pads at full run.",
      },
      {
        phase: "Panel Engineering",
        description:
          "Lower panels were engineered as replaceable sections to absorb cleat contact, with full-bleed dye-sublimated skins for both faces.",
      },
      {
        phase: "Season Operation",
        description:
          "The tunnel was set up and torn down every home game by a three-person crew, with lower panels swapped twice across the season.",
      },
    ],
    result:
      "The run-out tunnel became a fan-timed pregame ritual and prompted a second unit for the basketball arena entrance.",
  },

  "halloween-pop-up": {
    slug: "halloween-pop-up",
    clientName: "Cobweb Co. Retail",
    industry: "Retail",
    productType: "Seasonal Inflatables",
    description:
      "A fleet of Halloween inflatables deployed across 80 store fronts for the October selling season.",
    fullDescription:
      "Cobweb Co. Retail wanted a coordinated Halloween storefront program across 80 locations without the labor cost of elaborate window displays. The brief called for a mix of ghost, pumpkin, and haunted-house inflatables that store teams could deploy in under 15 minutes and that would read from across the parking lot.\n\nEach unit uses a self-contained blower base and staked tie-downs tuned for typical storefront planters. The dye-sublimated skins carry deep seasonal colors that hold up under dusk-to-dawn display, and the figures pack down small enough to share storage with other seasonal programs.\n\nThe program rolled out to all 80 stores in a single week and lifted October traffic enough that the client expanded the program to a second holiday the following year.",
    gradient: "from-navy-600 to-red-600",
    gradientLight: "from-navy-100 to-red-100",
    features: [
      "Self-contained blower base per unit",
      "Storefront-planter-tuned staked tie-downs",
      "Dusk-to-dawn dye-sublimated seasonal colors",
      "Compact pack-down for shared seasonal storage",
    ],
    specs: [
      { label: "Figure Heights", value: "6–10 ft (1.8–3.0 m)" },
      { label: "Fleet Size", value: "80 store sets" },
      { label: "Material", value: "210D Oxford, UV-stabilized" },
      { label: "Setup Time", value: "< 15 minutes, 1 staff" },
    ],
    testimonial:
      "Our store teams had the whole storefront dressed in 15 minutes. October foot traffic was the best we've seen in years.",
    testimonialAuthor: "Gwen Halloran",
    testimonialRole: "Seasonal Merchandising",
    testimonialCompany: "Cobweb Co. Retail",
    images: [
      { image: "/images/products/halloween-inflatable/1.png", gradient: "from-navy-600 to-red-600", label: "Storefront Display" },
      { image: "/images/products/halloween-inflatable/3.jpg", gradient: "from-navy-500 to-red-500", label: "Dusk Lighting" },
      { image: "/images/products/halloween-inflatable/10.jpg", gradient: "from-red-600 to-navy-600", label: "Parking-Lot View" },
    ],
    timeline: [
      {
        phase: "Program Design",
        description:
          "Designers built a mix of ghost, pumpkin, and haunted-house figures and a deployment guide tuned to a single staff member per store.",
      },
      {
        phase: "Mass Production",
        description:
          "All 80 store sets were produced in parallel with per-unit QC on blower bases, tie-down stakes, and dye-sublimated skins.",
      },
      {
        phase: "Rollout & Season",
        description:
          "Sets drop-shipped to 80 stores in one week; figures ran dusk-to-dawn through October with no failures reported.",
      },
    ],
    result:
      "The program lifted October store traffic 18% across 80 locations and expanded to a second holiday the following year.",
  },

  "santa-holiday-display": {
    slug: "santa-holiday-display",
    clientName: "Northgate Malls",
    industry: "Retail",
    productType: "Seasonal Inflatables",
    description:
      "A 30-foot inflatable Santa display anchoring the holiday court at a regional shopping mall.",
    fullDescription:
      "Northgate Malls wanted a marquee holiday centerpiece for its central court that could go up the week before Black Friday and read from both mall levels. The 30-foot inflatable Santa carries a lit gift sack, a wave-able arm, and a base wrapped as a chimney so the figure reads as a scene, not just a balloon.\n\nThe figure uses an internal constant-pressure blower with a quiet housing tuned for the echoey mall court, and the gift sack is internally lit with warm LEDs that run on a dusk timer. A reinforced lower chimney section absorbs the inevitable kid-contact at ground level.\n\nThe display became the mall's official holiday photo backdrop, and the client ordered a matching reindeer set for the entrance the next season.",
    gradient: "from-navy-600 to-red-600",
    gradientLight: "from-navy-100 to-red-100",
    features: [
      "30 ft Santa with chimney-base scene",
      "Internal LED-lit gift sack on dusk timer",
      "Whisper-quiet constant-pressure blower",
      "Reinforced lower section for kid contact",
    ],
    specs: [
      { label: "Height", value: "30 ft (9.1 m)" },
      { label: "Base Scene", value: "Chimney wrap, 10 ft" },
      { label: "Material", value: "210D Oxford + LED sack" },
      { label: "Setup Time", value: "1 day, 4 crew" },
    ],
    testimonial:
      "Santa in the court became THE holiday photo for the whole mall. Families timed their visits around it.",
    testimonialAuthor: "Yuki Tanabe",
    testimonialRole: "Mall Marketing Manager",
    testimonialCompany: "Northgate Malls",
    images: [
      { image: "/images/products/inflatable-santa-claus/1.png", gradient: "from-navy-600 to-red-600", label: "Court Centerpiece" },
      { image: "/images/products/inflatable-santa-claus/5.png", gradient: "from-navy-500 to-red-500", label: "Lit Gift Sack" },
      { image: "/images/products/inflatable-santa-claus/11.jpg", gradient: "from-red-600 to-navy-600", label: "Family Photo Op" },
    ],
    timeline: [
      {
        phase: "Scene Design",
        description:
          "Designers built Santa as a scene — chimney base, waving arm, lit gift sack — sized to read from both mall levels.",
      },
      {
        phase: "Acoustic Tuning",
        description:
          "The blower housing was acoustically tuned for the echoey court, and the LED sack was wired to a dusk timer for automatic evening glow.",
      },
      {
        phase: "Season Run",
        description:
          "The display ran from Black Friday through New Year with no downtime, absorbing daily kid contact on the reinforced chimney section.",
      },
    ],
    result:
      "The Santa display became the mall's official holiday photo backdrop and drove a matching reindeer order the next season.",
  },

  "camping-tent-festival": {
    slug: "camping-tent-festival",
    clientName: "Wilder Fields",
    industry: "Events",
    productType: "Tents & Structures",
    description:
      "A cluster of branded inflatable camping tents deployed as VIP glamping pods at a multi-day music festival.",
    fullDescription:
      "Wilder Fields wanted to upgrade the festival's VIP camping experience with branded glamping pods that were faster to deploy than pole tents and more weather-tight than standard pop-ups. The inflatable camping tents use air-tube frames instead of poles, so a single crew can stand one in under 10 minutes with a pump.\n\nThe tents are built on a heavy-duty PVC floor with a ripstop oxford fly rated for multi-day rain, and the fly carries the festival's branding visible from the camp road. Each pod sleeps four with a standing-height ridge, and the air tubes deflate to pack flat for transport between festival sites.\n\nAfter the festival the client expanded the pod fleet from 20 to 60 for the next season, citing guest satisfaction and the dramatic reduction in setup labor.",
    gradient: "from-navy-600 to-red-600",
    gradientLight: "from-navy-100 to-red-100",
    features: [
      "Air-tube frame, no poles, pump-up in 10 min",
      "Heavy-duty PVC floor + ripstop fly",
      "Branded fly visible from camp road",
      "Standing-height ridge, sleeps four",
    ],
    specs: [
      { label: "Footprint", value: "10 x 12 ft (3.0 x 3.7 m)" },
      { label: "Ridge Height", value: "7 ft (2.1 m)" },
      { label: "Material", value: "PVC floor + ripstop fly" },
      { label: "Setup Time", value: "< 10 minutes, 1 crew" },
    ],
    testimonial:
      "VIP guests loved the pods — standing room, real floors, dry in the rain. Our setup crew loved them even more.",
    testimonialAuthor: "Hannahorsk Bratteli",
    testimonialRole: "Guest Experience Lead",
    testimonialCompany: "Wilder Fields",
    images: [
      { image: "/images/products/inflatable-camping-tent/1.jpg", gradient: "from-navy-600 to-red-600", label: "Glamping Pod Cluster" },
      { image: "/images/products/inflatable-camping-tent/3.jpg", gradient: "from-navy-500 to-red-500", label: "Branded Fly Detail" },
      { image: "/images/products/inflatable-camping-tent/10.jpg", gradient: "from-red-600 to-navy-600", label: "Interior Standing Height" },
    ],
    timeline: [
      {
        phase: "Pod Design",
        description:
          "Designers specced an air-tube frame, PVC floor, and ripstop fly sized for four sleepers with standing-height ridge and camp-road-visible branding.",
      },
      {
        phase: "Weather Testing",
        description:
          "A prototype pod was rain-tested overnight with a sprinkler rig and wind-tested to confirm the fly and tube frame held under multi-day storm conditions.",
      },
      {
        phase: "Festival Deploy",
        description:
          "Twenty pods were deployed by a small crew in a single afternoon and recovered post-festival into flat-pack transport cases.",
      },
    ],
    result:
      "VIP pod satisfaction scored 4.8/5 and the fleet expanded from 20 to 60 pods for the next season.",
  },

  "dome-tent-exhibition": {
    slug: "dome-tent-exhibition",
    clientName: "Meridian Expo Group",
    industry: "Trade Shows",
    productType: "Tents & Structures",
    description:
      "A 26-foot inflatable dome tent used as a branded lounge and meeting space at outdoor trade show sites.",
    fullDescription:
      "Meridian Expo Group needed a distinctive, brandable structure for outdoor trade show sites — something that read as a destination, not just a tent. The 26-foot inflatable dome tent offers a clear-span interior with no center pole, so the lounge layout and meeting furniture can be arranged freely inside.\n\nThe dome uses a ribbed air-frame with a tensioned oxford skin that carries full-bleed branding on the upper cap, visible across the show field. A zip-out sidewall panel doubles as a shaded entrance, and the dome anchors with stakes or ballast depending on the site surface.\n\nAfter debuting at three shows, the dome became the client's flagship rental structure and was booked into a 12-show tour for the following year.",
    gradient: "from-navy-600 to-red-600",
    gradientLight: "from-navy-100 to-red-100",
    features: [
      "26 ft clear-span dome, no center pole",
      "Full-bleed branded upper cap",
      "Zip-out sidewall as shaded entrance",
      "Stake or ballast anchoring per site",
    ],
    specs: [
      { label: "Diameter", value: "26 ft (7.9 m)" },
      { label: "Clear-Span Height", value: "13 ft (4.0 m)" },
      { label: "Material", value: "Ribbed air-frame + oxford skin" },
      { label: "Setup Time", value: "2 hours, 3 crew" },
    ],
    testimonial:
      "The dome was the structure everyone gravitated to on the show field. It looked like a destination, not a tent.",
    testimonialAuthor: "Owen Vasquez",
    testimonialRole: "Exhibitions Director",
    testimonialCompany: "Meridian Expo Group",
    images: [
      { image: "/images/products/inflatable-dome-tent/1.jpg", gradient: "from-navy-600 to-red-600", label: "Show Field Dome" },
      { image: "/images/products/inflatable-dome-tent/2.jpg", gradient: "from-navy-500 to-red-500", label: "Branded Cap Detail" },
      { image: "/images/products/inflatable-dome-tent/5.jpg", gradient: "from-red-600 to-navy-600", label: "Interior Lounge" },
    ],
    timeline: [
      {
        phase: "Site Planning",
        description:
          "Crew confirmed surface type per show site and pre-planned stake vs ballast anchoring for the dome's ribbed air-frame.",
      },
      {
        phase: "Skin & Branding",
        description:
          "The oxford skin was tensioned over the air-frame with a full-bleed branded upper cap and a zip-out sidewall entrance panel.",
      },
      {
        phase: "Show Deploy",
        description:
          "The dome debuted at three shows with a three-person crew, then was booked into a 12-show tour for the following year.",
      },
    ],
    result:
      "The dome became the client's flagship rental structure and was booked into a 12-show tour the next year.",
  },

  "bounce-house-party": {
    slug: "bounce-house-party",
    clientName: "Jumpstart Parties",
    industry: "Entertainment",
    productType: "Amusement Inflatables",
    description:
      "A themed inflatable bounce house deployed across a chain of kids' party venues and event rentals.",
    fullDescription:
      "Jumpstart Parties operates a chain of kids' party venues and wanted a themed bounce house that could handle heavy daily use across back-to-back bookings. The unit uses a commercial-grade PVC bounce floor with reinforced seam welding and high mesh walls for supervised visibility from outside.\n\nThe themed skin carries a castle-and-characters design dyed in fade-resistant inks, and the entrance ramp is a replaceable section since it takes the most foot traffic. A constant-air blower keeps the floor firm through long sessions and auto-recovers if a kid steps off mid-bounce.\n\nAfter rolling the unit across 6 venues, the client standardized on it for all new locations and added a slide-attachment variant for the larger sites.",
    gradient: "from-navy-600 to-red-600",
    gradientLight: "from-navy-100 to-red-100",
    features: [
      "Commercial-grade PVC bounce floor",
      "High mesh walls for supervisor visibility",
      "Replaceable entrance ramp section",
      "Constant-air blower with auto-recovery",
    ],
    specs: [
      { label: "Footprint", value: "15 x 15 ft (4.6 x 4.6 m)" },
      { label: "Bounce Capacity", value: "6 kids" },
      { label: "Material", value: "Commercial PVC, reinforced seams" },
      { label: "Setup Time", value: "15 minutes, 1 crew" },
    ],
    testimonial:
      "These bounce houses take a beating six days a week and still look new. Our venue managers won't book anything else now.",
    testimonialAuthor: "Carla Mendes",
    testimonialRole: "Operations Manager",
    testimonialCompany: "Jumpstart Parties",
    images: [
      { image: "/images/products/inflatable-bounce-house/1.jpg", gradient: "from-navy-600 to-red-600", label: "Venue Bounce House" },
      { image: "/images/products/inflatable-bounce-house/3.jpg", gradient: "from-navy-500 to-red-500", label: "Castle Theme Detail" },
      { image: "/images/products/inflatable-bounce-house/15.jpg", gradient: "from-red-600 to-navy-600", label: "Kids in Action" },
    ],
    timeline: [
      {
        phase: "Use-Case Spec",
        description:
          "Designers specced commercial PVC, reinforced seams, and a replaceable ramp for six-day-a-week venue use with back-to-back bookings.",
      },
      {
        phase: "Theme & Print",
        description:
          "The castle-and-characters skin was dyed in fade-resistant inks and the mesh walls tuned for supervisor sightlines from outside.",
      },
      {
        phase: "Venue Rollout",
        description:
          "The unit was deployed across 6 venues and became the chain standard, with a slide-attachment variant added for larger sites.",
      },
    ],
    result:
      "The bounce house became the chain standard across 6 venues and prompted a slide-attachment variant for larger sites.",
  },

  "water-slide-summer": {
    slug: "water-slide-summer",
    clientName: "Splashway Park",
    industry: "Entertainment",
    productType: "Amusement Inflatables",
    description:
      "A multi-lane inflatable water slide installed as a seasonal anchor attraction at a regional water park.",
    fullDescription:
      "Splashway Park wanted a high-throughput seasonal slide that could move hundreds of guests an hour without long queue buildup. The multi-lane inflatable water slide runs four parallel sliding lanes off a single climb tower, so four guests descend simultaneously per cycle.\n\nThe slide uses a commercial PVC structure with reinforced lane seams and a continuous-recirculation splash pool at the base. Non-slip climb steps and side rail mesh keep the ascent safe, and the whole structure anchors to the park's existing pad with tensioned tie-downs.\n\nAfter its first summer the slide became the park's highest-rated attraction and was extended with a second tower for the following season.",
    gradient: "from-navy-600 to-red-600",
    gradientLight: "from-navy-100 to-red-100",
    features: [
      "Four parallel sliding lanes per cycle",
      "Commercial PVC with reinforced lane seams",
      "Continuous-recirculation splash pool",
      "Non-slip climb steps + side rail mesh",
    ],
    specs: [
      { label: "Height", value: "22 ft (6.7 m)" },
      { label: "Lanes", value: "4 parallel" },
      { label: "Material", value: "Commercial PVC, reinforced" },
      { label: "Throughput", value: "400+ riders/hour" },
    ],
    testimonial:
      "Four lanes meant the queue never stacked up. It ran all summer at capacity and guests rated it our best attraction.",
    testimonialAuthor: "Devon Akhtar",
    testimonialRole: "Park General Manager",
    testimonialCompany: "Splashway Park",
    images: [
      { image: "/images/products/inflatable-water-slide/1.png", gradient: "from-navy-600 to-red-600", label: "Multi-Lane Slide" },
      { image: "/images/products/inflatable-water-slide/3.png", gradient: "from-navy-500 to-red-500", label: "Climb Tower Detail" },
      { image: "/images/products/inflatable-water-slide/11.jpg", gradient: "from-red-600 to-navy-600", label: "Splash Pool Run" },
    ],
    timeline: [
      {
        phase: "Throughput Design",
        description:
          "Designers specced a four-lane layout off a single climb tower to hit 400+ riders/hour and prevent queue buildup at peak.",
      },
      {
        phase: "Build & Anchoring",
        description:
          "The commercial PVC structure was built with reinforced lane seams and a recirculation splash pool, anchored to the park's pad.",
      },
      {
        phase: "Season Operation",
        description:
          "The slide ran at capacity all summer, became the park's top-rated attraction, and was extended with a second tower the next season.",
      },
    ],
    result:
      "The slide became the park's highest-rated attraction and was extended with a second tower the following season.",
  },

  "light-column-installation": {
    slug: "light-column-installation",
    clientName: "Lumen Studio",
    industry: "Events",
    productType: "Decorations",
    description:
      "A row of internally-lit inflatable light columns lining the entry walk of a corporate gala.",
    fullDescription:
      "Lumen Studio was producing the entry experience for a corporate gala and wanted a glowing colonnade to line the walk from arrivals to the venue doors. The inflatable light columns stand 12 feet tall with internal RGB arrays that can be programmed to the gala's brand color and run chase or static patterns.\n\nEach column uses a translucent oxford skin that diffuses the internal LEDs evenly with no visible hot-spots, and a weighted base keeps the column planted on the walk without stakes. The columns daisy-chain power from a single source so the whole colonnade runs off one circuit.\n\nThe colonnade became the gala's most-photographed moment and was re-deployed for the client's product launch the next quarter.",
    gradient: "from-navy-600 to-red-600",
    gradientLight: "from-navy-100 to-red-100",
    features: [
      "12 ft columns with internal RGB arrays",
      "Translucent skin for even LED diffusion",
      "Weighted base, no-stake walk mounting",
      "Daisy-chained power off one circuit",
    ],
    specs: [
      { label: "Height", value: "12 ft (3.7 m)" },
      { label: "Column Count", value: "14 per colonnade" },
      { label: "Material", value: "Translucent oxford + RGB LEDs" },
      { label: "Setup Time", value: "1 hour, 2 crew" },
    ],
    testimonial:
      "The glowing colonnade set the tone before guests even reached the door. It was the photo of the night.",
    testimonialAuthor: "Marisol Quiñones",
    testimonialRole: "Creative Director",
    testimonialCompany: "Lumen Studio",
    images: [
      { image: "/images/products/inflatable-light-column/1.png", gradient: "from-navy-600 to-red-600", label: "Entry Colonnade" },
      { image: "/images/products/inflatable-light-column/主图.png", gradient: "from-navy-500 to-red-500", label: "Column Glow Detail" },
      { image: "/images/products/inflatable-light-column/5.png", gradient: "from-red-600 to-navy-600", label: "Arrivals Walk" },
    ],
    timeline: [
      {
        phase: "Lighting Design",
        description:
          "Designers programmed the RGB arrays to the gala's brand color, tuned chase and static patterns, and specced a single-circuit daisy chain.",
      },
      {
        phase: "Skin & Diffusion",
        description:
          "The translucent oxford skin was selected for even LED diffusion with no hot-spots, and weighted bases were tuned for walk mounting without stakes.",
      },
      {
        phase: "Gala Deploy",
        description:
          "The 14-column colonnade was installed in an hour by two crew and re-deployed for the client's product launch the next quarter.",
      },
    ],
    result:
      "The colonnade became the gala's most-photographed moment and was re-deployed for the client's product launch.",
  },

  "food-replica-display": {
    slug: "food-replica-display",
    clientName: "Brunch Baron Co.",
    industry: "Food & Beverage",
    productType: "Product Replicas",
    description:
      "A set of giant inflatable food replicas — burger, cake, and fruit — deployed as a food-truck festival photo zone.",
    fullDescription:
      "Brunch Baron Co. runs a touring food-truck festival and wanted a photo zone with oversized food replicas that guests would queue for and post. The set includes a giant inflatable burger, a layered cake, and a fruit cluster, each built to look appetizing up close while standing stable in a festival field.\n\nEach replica uses a dye-sublimated oxford skin over a sculpted PVC form, with saturated food-accurate colors and surface texture detail. Weighted bases keep the figures planted on grass or pavement, and the skins are removable so the same forms can be re-skinned for different festival themes.\n\nThe photo zone became the festival's most-tagged location and drove a sponsorship sell-through for the next tour.",
    gradient: "from-navy-600 to-red-600",
    gradientLight: "from-navy-100 to-red-100",
    features: [
      "Sculpted PVC forms with dye-sublimated skins",
      "Food-accurate saturated colors and texture",
      "Weighted bases for grass or pavement",
      "Removable skins for theme re-skinning",
    ],
    specs: [
      { label: "Figure Heights", value: "8–12 ft (2.4–3.7 m)" },
      { label: "Set Size", value: "3 replicas (burger, cake, fruit)" },
      { label: "Material", value: "PVC form + oxford skin" },
      { label: "Setup Time", value: "30 minutes, 2 crew" },
    ],
    testimonial:
      "People lined up for 20 minutes to take a photo with the giant burger. It sold our sponsorships for the next tour.",
    testimonialAuthor: "Felix Donnelly",
    testimonialRole: "Festival Producer",
    testimonialCompany: "Brunch Baron Co.",
    images: [
      { image: "/images/products/inflatable-food-replica/汉堡_1.jpg", gradient: "from-navy-600 to-red-600", label: "Food Replica Photo Zone" },
      { image: "/images/products/inflatable-food-replica/充气蛋糕_1.jpg", gradient: "from-navy-500 to-red-500", label: "Burger Detail" },
      { image: "/images/products/inflatable-food-replica/充气水果_1_主图.jpg", gradient: "from-red-600 to-navy-600", label: "Cake & Fruit Cluster" },
    ],
    timeline: [
      {
        phase: "Sculpt & Color",
        description:
          "Designers sculpted the burger, cake, and fruit forms and tuned dye-sublimated skins to food-accurate saturated colors and surface texture.",
      },
      {
        phase: "Base & Skin System",
        description:
          "Weighted bases were engineered for grass or pavement, and skins were made removable so the same forms can be re-skinned per festival theme.",
      },
      {
        phase: "Festival Tour",
        description:
          "The photo zone toured festival dates, became the most-tagged location, and drove sponsorship sell-through for the next tour.",
      },
    ],
    result:
      "The food-replica photo zone became the festival's most-tagged location and sold out sponsorships for the next tour.",
  },

  "inflatable-stage-show": {
    slug: "inflatable-stage-show",
    clientName: "Tidal Productions",
    industry: "Events",
    productType: "Event Structures",
    description:
      "A sculpted inflatable stage structure — an octopus-themed performance platform — touring a summer music series.",
    fullDescription:
      "Tidal Productions wanted a stage that was itself a visual: a sculpted inflatable performance platform themed as an octopus, with tentacle forms framing the stage mouth and a branded back wall carrying the tour art. The structure needed to tour between waterfront venues and go up in a single day.\n\nThe stage uses a ribbed air-frame with a tensioned oxford skin, and the tentacle forms are independently anchored so they hold their shape without loading the stage deck. A reinforced performance deck and side egress tunnels handle artist and crew flow, and the whole structure packs into two transport cases for the venue-to-venue move.\n\nAfter the summer series the octopus stage was booked for a fall festival circuit and became the touring artist's de facto stage of record.",
    gradient: "from-navy-600 to-red-600",
    gradientLight: "from-navy-100 to-red-100",
    features: [
      "Sculpted octopus-themed stage with tentacle frame",
      "Ribbed air-frame + tensioned oxford skin",
      "Reinforced performance deck + crew egress",
      "Two-case pack for venue-to-venue tour",
    ],
    specs: [
      { label: "Stage Footprint", value: "24 x 18 ft (7.3 x 5.5 m)" },
      { label: "Tentacle Height", value: "14 ft (4.3 m)" },
      { label: "Material", value: "Ribbed air-frame + oxford skin" },
      { label: "Setup Time", value: "1 day, 6 crew" },
    ],
    testimonial:
      "The octopus stage WAS the show's identity. Artists walked out between the tentacles every night — it toured with us all season.",
    testimonialAuthor: "Sloane Castellano",
    testimonialRole: "Tour Production Lead",
    testimonialCompany: "Tidal Productions",
    images: [
      { image: "/images/products/inflatable-stage/1.jpg", gradient: "from-navy-600 to-red-600", label: "Octopus Stage" },
      { image: "/images/products/inflatable-stage/章鱼舞台_1.jpg", gradient: "from-navy-500 to-red-500", label: "Tentacle Frame Detail" },
      { image: "/images/products/inflatable-stage/2.jpg", gradient: "from-red-600 to-navy-600", label: "Performance Deck" },
    ],
    timeline: [
      {
        phase: "Sculpt & Engineering",
        description:
          "Designers sculpted the octopus theme and engineered the ribbed air-frame with independently anchored tentacles so they held shape without loading the deck.",
      },
      {
        phase: "Deck & Egress",
        description:
          "A reinforced performance deck and side crew egress tunnels were built into the structure, with the whole stage packing into two transport cases.",
      },
      {
        phase: "Summer Tour",
        description:
          "The stage toured the summer music series, was booked for a fall festival circuit, and became the touring artist's stage of record.",
      },
    ],
    result:
      "The octopus stage became the tour's visual identity and was booked for a fall festival circuit after the summer run.",
  },
};

export function getGalleryItemBySlug(slug: string): GalleryDetail | undefined {
  return GALLERY_DATA[slug];
}
