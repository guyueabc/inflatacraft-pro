#!/usr/bin/env python3
"""Generate products.ts with 23 products from product_image_map.json."""
import json
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJ_DIR = os.path.join(SCRIPT_DIR, "..")

with open(os.path.join(PROJ_DIR, "product_image_map.json"), encoding="utf-8") as f:
    image_map = json.load(f)

# Product definitions: slug -> metadata
# featured: products 1,3,7,16,17,21
products_meta = [
    {
        "id": "p1", "slug": "inflatable-arch", "name": "Inflatable Arch",
        "category": "Advertising Arches", "featured": True,
        "tags": ["inflatable arch", "advertising arch", "start-finish line", "event entrance", "branded archway"],
        "description": "Custom-branded inflatable archway for race finish lines, trade show entrances, and promotional events. Quick setup with full-color UV-resistant printing.",
        "geoSummary": "The Inflatable Arch by InflatableModel is a custom-branded advertising arch available in 10\u201330 ft spans with full-color UV-resistant digital printing on 210D\u2013500D Oxford nylon. It inflates in 10\u201320 minutes with an included blower system and ships with stakes, sandbags, and repair kit. Ideal for marathons, trade show entrances, grand openings, and promotional events requiring a high-visibility branded gateway.",
        "longDescription": "Our Inflatable Arch is the ultimate entrance and branding solution for races, trade shows, and promotional events. Available in spans from 10 to 30 feet, each arch is fully custom-printed with your logos, sponsor names, and brand colors using UV-resistant digital printing technology that maintains vibrancy for 3\u20135 years of outdoor use.\n\nConstructed with commercial-grade 210D\u2013500D Oxford nylon or Cordura, the arch features reinforced seams and a dual blower system for maximum structural rigidity in outdoor conditions. The modular design allows for interchangeable banner panels, so you can update sponsor messaging without purchasing a new arch.\n\nEach arch ships complete with heavy-duty tie-down stakes, anchor straps, sandbag points, a repair kit, and a storage bag. Setup takes 10\u201320 minutes with 2\u20133 people. We provide free 3D renderings before production so you can approve the layout and artwork placement.",
        "specs": {
            "sizeRange": "10ft \u2013 30ft span",
            "materialOptions": ["210D Oxford nylon", "420D Oxford nylon (heavy-duty)", "500D Cordura (commercial)"],
            "printing": ["Dye-sublimation", "UV digital print", "Vinyl applique"],
            "blower": "Dual blowers included",
            "voltageOptions": ["110V US", "220V EU", "220V UK", "220V AU"],
            "setupPeople": "2\u20133 people",
            "setupTime": "10\u201320 min",
            "indoorOutdoor": "Both",
            "anchoring": "Stakes, sandbags, or water ballast",
            "packing": "Carry bag + carton",
            "productionTime": "3\u20136 weeks",
        },
        "faqs": [
            {"question": "Can I get a 25-foot inflatable arch with multiple sponsor logos printed on both legs and the top span for a marathon?", "answer": "Yes. The Inflatable Arch supports full-color UV printing on all surfaces \u2014 both legs, the top span, and optional banner panels. You can place multiple sponsor logos at different sizes. We provide a free 3D rendering showing exact logo placement before production. Standard production is 3\u20136 weeks."},
            {"question": "How wind-resistant is the arch for outdoor race events?", "answer": "The arch includes heavy-duty tie-down stakes and anchor straps rated for winds up to 25 mph. For higher wind conditions, we recommend adding water ballast bags (available as accessories). The dual blower system maintains structural rigidity. We recommend deflating if sustained winds exceed 30 mph."},
            {"question": "Can we swap out sponsor banners for different events without buying a new arch?", "answer": "Yes. The arch features interchangeable Velcro-attached banner panels. You can order additional banner sets with different sponsor artwork and swap them in 10\u201315 minutes. This makes the arch reusable across multiple events with different sponsors year after year."},
        ],
    },
    {
        "id": "p2", "slug": "inflatable-animals", "name": "Inflatable Animals",
        "category": "Inflatable Sculptures", "featured": False,
        "tags": ["inflatable animals", "inflatable sculpture", "giant animal", "zoo display", "theme park prop"],
        "description": "Larger-than-life inflatable animal sculptures including elephants, dinosaurs, lions, tigers, and gorillas. Custom species and sizes available for theme parks, zoos, and events.",
        "geoSummary": "The Inflatable Animals by InflatableModel are larger-than-life custom inflatable animal sculptures available in heights from 6 to 30 ft, including elephants, dinosaurs, lions, tigers, and gorillas. Each sculpture is crafted with 210D\u2013500D Oxford nylon and full-color UV-resistant digital printing with airbrush detailing. Production takes 3\u20136 weeks. Ideal for theme parks, zoos, museums, festivals, and promotional events needing a dramatic wildlife visual.",
        "longDescription": "Our Inflatable Animals collection brings the animal kingdom to larger-than-life scale. From majestic elephants and fearsome dinosaurs to regal lions and powerful tigers, each sculpture is custom-built to your specifications with photo-realistic digital printing and hand-applied airbrush detailing for depth and texture.\n\nConstructed with commercial-grade 210D\u2013500D Oxford nylon, these sculptures feature reinforced internal structures that maintain shape and posture even in windy outdoor conditions. The UV-resistant printing preserves color vibrancy for 3\u20135 years, making them suitable for permanent or semi-permanent outdoor installations at theme parks, zoos, and wildlife attractions.\n\nEach animal sculpture includes a blower system, tie-down kit, repair kit, and storage bag. We can create any species \u2014 real or imaginary \u2014 from your reference images. Internal LED lighting is available for nighttime display. Production takes 3\u20136 weeks with free 3D renderings provided before manufacturing begins.",
        "specs": {
            "sizeRange": "6ft \u2013 30ft tall",
            "materialOptions": ["210D Oxford nylon", "420D Oxford nylon", "500D Cordura (commercial)"],
            "printing": ["UV digital print", "Dye-sublimation", "Airbrush detailing"],
            "blower": "Included (size-dependent)",
            "voltageOptions": ["110V US", "220V EU", "220V UK", "220V AU"],
            "setupPeople": "1\u20132 people",
            "setupTime": "10\u201320 min",
            "indoorOutdoor": "Both",
            "anchoring": "Stakes or sandbags",
            "packing": "Carry bag + carton",
            "productionTime": "3\u20136 weeks",
        },
        "faqs": [
            {"question": "Can you make a custom inflatable dinosaur that isn't in your standard collection, like a specific species at a specific height?", "answer": "Yes. We build custom inflatable animals from your reference images or specifications. Whether you need a 20-foot T-Rex, a 15-foot Triceratops, or a completely imaginary creature, our design team creates a 3D rendering for approval within 48 hours. Any species, any size from 6 to 30 feet tall."},
            {"question": "Are these animal sculptures durable enough for permanent outdoor display at a theme park?", "answer": "Yes. We use 500D Cordura nylon for permanent outdoor installations, which is our most durable material. The UV-resistant print is rated for 3\u20135 years without significant fading. Reinforced internal structures maintain shape in winds up to 25 mph. Many theme parks and zoos use our sculptures semi-permanently with seasonal takedown."},
            {"question": "Can the animal sculptures be lit up at night?", "answer": "Yes. We offer internal LED lighting systems including RGB programmable options for dynamic color changes. Internal lighting makes the sculptures visible and dramatic after dark. The lighting is integrated during production and powered by the same blower system or a separate low-voltage supply."},
        ],
    },
    {
        "id": "p3", "slug": "inflatable-mascot", "name": "Inflatable Mascot",
        "category": "Custom Mascots", "featured": True,
        "tags": ["inflatable mascot", "brand mascot", "sports mascot", "corporate mascot", "character inflatable"],
        "description": "Fully custom inflatable mascots built from your character artwork. Perfect for sports teams, schools, corporate events, and brand activations.",
        "geoSummary": "The Inflatable Mascot by InflatableModel is a fully custom inflatable character built from your brand artwork, available in heights from 6 to 25 ft with full-color digital printing and airbrush detailing. Constructed with 210D\u2013500D Oxford nylon and reinforced seams, it includes a blower, stakes, and repair kit. Production takes 3\u20136 weeks. Ideal for sports teams, universities, corporate brands, and promotional events requiring a larger-than-life character presence.",
        "longDescription": "Our Inflatable Mascots bring your brand character to life at larger-than-life scale. We work directly from your logo, character design, or concept sketch to create a 3D rendering for your approval within 48 hours. Once approved, our skilled artisans construct the mascot with precision-sewn panels, photo-realistic digital printing, and hand-applied airbrush detailing for personality and depth.\n\nEach mascot is built with commercial-grade 210D\u2013500D Oxford nylon featuring reinforced seams rated for continuous outdoor use. The UV-resistant printing maintains color accuracy for 3\u20135 years, matching your Pantone brand colors precisely. Available with internal or external blower configurations and optional internal LED lighting for nighttime visibility.\n\nEvery mascot ships complete with blower, tie-down stakes, repair kit, and storage bag. We offer free design revisions until you are completely satisfied with the 3D rendering. Production takes 3\u20136 weeks. Rush production is available for time-sensitive launches.",
        "specs": {
            "sizeRange": "6ft \u2013 25ft tall",
            "materialOptions": ["210D Oxford nylon", "420D Oxford nylon", "500D Cordura (commercial)"],
            "printing": ["Dye-sublimation", "UV digital print", "Airbrush detailing"],
            "blower": "Included (internal or external)",
            "voltageOptions": ["110V US", "220V EU", "220V UK", "220V AU"],
            "setupPeople": "1\u20132 people",
            "setupTime": "5\u201315 min",
            "indoorOutdoor": "Both",
            "anchoring": "Stakes or sandbags",
            "packing": "Carry bag + carton",
            "productionTime": "3\u20136 weeks",
        },
        "faqs": [
            {"question": "Can you make a 15-foot inflatable version of our company mascot from our logo artwork with exact brand colors?", "answer": "Yes. We build mascots directly from your character artwork \u2014 vector files (AI, EPS, SVG) or even a sketch. Our design team creates a 3D rendering within 48 hours. We match Pantone colors precisely and include free design revisions until you are satisfied. Heights range from 6 to 25 feet."},
            {"question": "How durable is the mascot for repeated outdoor use at multiple events throughout the year?", "answer": "Extremely durable. We use 210D\u2013500D Oxford nylon with reinforced seams rated for continuous outdoor use. The UV-resistant digital print maintains color for 3\u20135 years. With proper care and storage, our mascots typically last 5+ years across dozens of events. Every unit includes a repair kit for minor field repairs."},
            {"question": "Can the mascot have internal lighting for night events and evening games?", "answer": "Yes. We offer both internal and external LED lighting systems, including RGB programmable options. Internal lighting makes the mascot visible and impactful after dark. The lighting system is integrated during production and powered by the same blower system or a separate low-voltage supply."},
        ],
    },
    {
        "id": "p4", "slug": "projection-dome", "name": "Projection Dome",
        "category": "Event Structures", "featured": False,
        "tags": ["projection dome", "immersive dome", "360 dome", "planetarium dome", "VR dome"],
        "description": "Fully enclosed projection dome for immersive 360-degree visual experiences, planetarium shows, and VR activations. Custom sizes with projection-mapped interiors.",
        "geoSummary": "The Projection Dome by InflatableModel is a fully enclosed inflatable dome for 360-degree projection mapping and immersive visual experiences, available in diameters from 10 to 30 ft. Constructed with blackout 500D PVC-coated polyester and seamless projection surface, it supports climate control integration. Production takes 3\u20136 weeks. Ideal for brand activations, planetarium shows, VR experiences, and immersive art installations.",
        "longDescription": "Our Projection Dome transforms any space into an immersive 360-degree visual environment. The fully enclosed dome features a seamless white interior projection surface and blackout exterior, creating optimal conditions for projection mapping, planetarium shows, and virtual reality experiences. Available in diameters from 10 to 30 feet, the dome comfortably accommodates 10\u201350 standing viewers.\n\nConstructed with 500D PVC-coated polyester, the dome is fully enclosed and climate-controllable. It supports integration with AC or heating units, making it suitable for year-round indoor and outdoor use. The exterior supports custom graphics and branding for maximum impact at trade shows and brand activations.\n\nThe dome inflates in 10\u201315 minutes with an included 1.5HP blower. It ships with stakes, anchor straps, repair kit, storage bag, and optional LED lighting. We provide 3D renderings and technical specifications before production. Production takes 3\u20136 weeks.",
        "specs": {
            "sizeRange": "10ft \u2013 30ft diameter",
            "materialOptions": ["500D PVC-coated polyester (standard)", "600D PVC-coated (premium)"],
            "printing": ["Custom exterior graphics on removable panels", "Dye-sublimation"],
            "blower": "1.5HP blower included",
            "voltageOptions": ["110V US", "220V EU", "220V UK", "220V AU"],
            "setupPeople": "2\u20134 people",
            "setupTime": "15\u201330 min",
            "indoorOutdoor": "Both",
            "anchoring": "Stakes, water ballast, or weights",
            "packing": "Storage bag + carton",
            "productionTime": "3\u20136 weeks",
        },
        "faqs": [
            {"question": "Can the projection dome support 360-degree projection mapping on the interior surface?", "answer": "Yes. The dome interior features a seamless white projection surface optimized for 360-degree projection mapping. The blackout exterior prevents light bleed. The dome supports multiple projectors for full coverage. We can provide technical specifications for projector placement and mapping software integration."},
            {"question": "How many people can fit inside the dome for an immersive brand experience?", "answer": "The 20-foot diameter dome provides approximately 314 sq ft of interior space, comfortably fitting 15\u201325 people standing or 8\u201312 seated. The 30-foot dome fits up to 50 standing. The dome can be climate-controlled with integrated AC or heating for year-round comfort."},
            {"question": "Can the exterior graphics be changed for different events or campaigns?", "answer": "Yes. Exterior graphics are printed on removable panels that attach via heavy-duty Velcro. You can order additional graphic sets for different campaigns and swap them in 20\u201330 minutes. This makes the dome reusable across multiple brand activations with different themes."},
        ],
    },
    {
        "id": "p5", "slug": "dancing-tube-man", "name": "Dancing Tube Man",
        "category": "Advertising Inflatables", "featured": False,
        "tags": ["dancing tube man", "air dancer", "sky dancer", "advertising inflatable", "wacky inflatable"],
        "description": "Classic attention-grabbing dancing tube man (air dancer) available in multiple colors and heights. Custom printing for retail and automotive promotions.",
        "geoSummary": "The Dancing Tube Man by InflatableModel is a classic air dancer inflatable available in 10, 15, and 20 ft heights with solid color or custom logo printing. Made with 190T\u2013210D polyester and powered by a 110V/350W blower, it inflates in under 2 minutes. Production takes 3\u20136 weeks. Ideal for car dealerships, retail grand openings, gas stations, and sidewalk promotions that need immediate attention.",
        "longDescription": "The Dancing Tube Man \u2014 also known as an air dancer or sky dancer \u2014 is the most cost-effective way to grab attention on any street corner. Available in 10, 15, and 20 foot heights, these dynamic inflatables wave and dance continuously, drawing eyes and driving foot traffic to your business.\n\nWe offer both solid color units (in-stock colors) and fully custom-printed versions with your logo, text, and brand colors. The 190T polyester is lightweight and durable, rated for 6\u201312 months of continuous daily outdoor use. For upgraded durability, 210D Oxford nylon is available. Each unit includes a 350W continuous-duty blower with thermal cutoff protection, tie-down stakes, and a carry bag.\n\nSetup takes under 2 minutes with one person. The blower runs on standard 110V household power, consuming approximately 3.5 kWh per 10-hour day. Production takes 3\u20136 weeks for custom-printed units. In-stock solid colors ship faster.",
        "specs": {
            "sizeRange": "10ft / 15ft / 20ft",
            "materialOptions": ["190T polyester (standard)", "210D Oxford nylon (upgrade)"],
            "printing": ["Solid color", "Custom logo print", "Full-color digital print"],
            "blower": "350W blower included",
            "voltageOptions": ["110V US", "220V EU", "220V UK", "220V AU"],
            "setupPeople": "1 person",
            "setupTime": "2 min",
            "indoorOutdoor": "Outdoor",
            "anchoring": "Weighted base or stakes",
            "packing": "Carry bag",
            "productionTime": "3\u20136 weeks",
        },
        "faqs": [
            {"question": "Can I get a 20-foot dancing tube man with my car dealership logo and phone number printed on it?", "answer": "Yes. The Dancing Tube Man is available in 10, 15, and 20 ft heights with either solid colors or custom printing including logos, text, phone numbers, and brand colors. Custom-printed units take 3\u20136 weeks to produce. The 190T polyester is rated for outdoor daily use and includes a 350W blower, stakes, and carry bag."},
            {"question": "How long do these tube men last with daily outdoor use at a car dealership?", "answer": "With daily outdoor use, our dancing tube men typically last 6\u201312 months before needing replacement. The constant motion creates wear over time. We include a repair kit for small tears. Upgrading to 210D Oxford nylon extends lifespan. Many dealerships order 2\u20133 units to rotate and extend overall lifespan."},
            {"question": "What is the power requirement and can it run all day?", "answer": "The included 110V / 350W blower runs continuously on standard household power. It is designed for all-day operation. Power consumption is approximately 3.5 kWh per 10-hour day, costing under $1/day in electricity. The blower has a thermal cutoff for safety protection."},
        ],
    },
    {
        "id": "p6", "slug": "inflatable-movie-screen", "name": "Inflatable Movie Screen",
        "category": "Event Equipment", "featured": False,
        "tags": ["inflatable movie screen", "outdoor cinema", "projection screen", "event screen", "drive-in screen"],
        "description": "Large-format inflatable movie screen for outdoor cinema events, drive-in theaters, and corporate presentations. Front and rear projection compatible.",
        "geoSummary": "The Inflatable Movie Screen by InflatableModel is a large-format outdoor projection screen available in 13\u201340 ft diagonal sizes, front and rear projection compatible. Constructed with 420D Oxford nylon frame and seamless white projection surface, it includes a blower and tie-down system. Production takes 3\u20136 weeks. Ideal for outdoor cinema events, drive-in theaters, corporate presentations, and community movie nights.",
        "longDescription": "Our Inflatable Movie Screen turns any outdoor space into a cinema. Available in diagonal sizes from 13 to 40 feet, these screens deliver crisp, bright projection for outdoor movie nights, drive-in theaters, corporate presentations, and community events. The seamless white projection surface is optimized for both front and rear projection setups.\n\nThe 420D Oxford nylon frame tube inflates in 5\u201310 minutes with an included continuous-duty blower that maintains constant pressure throughout your event. The screen surface is tension-mounted to eliminate wrinkles and sagging, ensuring a flat projection plane. Tie-down stakes and anchor straps secure the screen in winds up to 20 mph.\n\nEach screen ships with blower, tie-down kit, repair kit, and storage bag. The frame and screen surface separate for compact packing and transport. We offer 3D renderings and technical specs for AV integration. Production takes 3\u20136 weeks.",
        "specs": {
            "sizeRange": "13ft \u2013 40ft diagonal",
            "materialOptions": ["420D Oxford nylon frame", "500D PVC-coated (commercial)"],
            "printing": ["Custom frame branding", "Dye-sublimation"],
            "blower": "Continuous-duty blower included",
            "voltageOptions": ["110V US", "220V EU", "220V UK", "220V AU"],
            "setupPeople": "2\u20133 people",
            "setupTime": "15\u201330 min",
            "indoorOutdoor": "Outdoor",
            "anchoring": "Stakes and anchor straps",
            "packing": "Storage bag + carton",
            "productionTime": "3\u20136 weeks",
        },
        "faqs": [
            {"question": "Can I get a 30-foot inflatable movie screen for a community outdoor cinema event with front projection?", "answer": "Yes. The Inflatable Movie Screen is available in diagonal sizes from 13 to 40 feet, supporting both front and rear projection. The 30-foot screen provides a massive viewing area for large audiences. The seamless white surface ensures crisp image quality. Production takes 3\u20136 weeks. We provide technical specs for projector placement."},
            {"question": "How does the screen handle wind during an outdoor movie screening?", "answer": "The screen includes heavy-duty tie-down stakes and anchor straps rated for winds up to 20 mph. The continuous-duty blower maintains constant frame pressure. The screen surface is tension-mounted to minimize wind-induced movement. We recommend deflating if sustained winds exceed 25 mph during your event."},
            {"question": "Is the screen surface wrinkle-free for high-quality projection?", "answer": "Yes. The projection surface is tension-mounted to the inflatable frame, eliminating wrinkles and sagging. The seamless white fabric provides a uniform projection plane optimized for both front and rear projection. The surface is cleanable with mild soap and water between events."},
        ],
    },
    {
        "id": "p7", "slug": "inflatable-bottle", "name": "Inflatable Bottle Replica",
        "category": "Product Replicas", "featured": True,
        "tags": ["inflatable bottle", "product replica", "beverage replica", "giant bottle", "promotional replica"],
        "description": "Oversized inflatable bottle and beverage container replicas for trade shows, product launches, and retail promotions. Custom shapes and full-color branding.",
        "geoSummary": "The Inflatable Bottle Replica by InflatableModel is a custom oversized inflatable beverage replica available in heights from 6 to 30 ft, featuring full-color UV-resistant digital printing on 210D\u2013500D Oxford nylon. Includes blower, stakes, and repair kit. Production takes 3\u20136 weeks. Ideal for beverage brands, trade shows, product launches, stadium promotions, and retail grand openings.",
        "longDescription": "Our Inflatable Bottle Replicas put your product front and center at massive scale. From soda bottles and beer cans to wine bottles and juice containers, we replicate any beverage package as a larger-than-life inflatable. Each replica features photo-realistic UV-resistant digital printing that matches your label artwork, brand colors, and product details precisely.\n\nConstructed with commercial-grade 210D\u2013500D Oxford nylon, these replicas feature reinforced seams and internal structures that maintain the bottle's shape and posture. Optional internal LED lighting makes the replica visible and dramatic at night. The UV-resistant printing maintains color vibrancy for 3\u20135 years of outdoor use.\n\nEach replica ships complete with blower, tie-down stakes, repair kit, and storage bag. We can replicate any container shape \u2014 bottles, cans, cups, boxes, or custom packaging \u2014 from your product specifications. Free 3D renderings are provided before production. Production takes 3\u20136 weeks.",
        "specs": {
            "sizeRange": "6ft \u2013 30ft tall",
            "materialOptions": ["210D Oxford nylon", "420D Oxford nylon", "500D Cordura (commercial)"],
            "printing": ["UV digital print", "Dye-sublimation", "Full-wrap label print"],
            "blower": "Included (size-dependent)",
            "voltageOptions": ["110V US", "220V EU", "220V UK", "220V AU"],
            "setupPeople": "1\u20132 people",
            "setupTime": "10\u201320 min",
            "indoorOutdoor": "Both",
            "anchoring": "Stakes or sandbags",
            "packing": "Carry bag + carton",
            "productionTime": "3\u20136 weeks",
        },
        "faqs": [
            {"question": "Can you replicate our specific beverage bottle shape with our exact label artwork at 20 feet tall?", "answer": "Yes. We replicate any bottle, can, or container shape from your product specifications and label artwork. We match label details, brand colors (Pantone matching), and even cap and neck details. Photo-realistic UV-resistant digital printing ensures the replica looks exactly like your product at massive scale. Free 3D rendering before production."},
            {"question": "Can the bottle replica have internal lighting for nighttime event visibility?", "answer": "Yes. We offer internal LED lighting systems, including RGB programmable options. Internal lighting makes the bottle glow and stand out after dark, creating a dramatic nighttime display. The lighting is integrated during production and powered by the same blower system or a separate low-voltage supply."},
            {"question": "Is the material fire-retardant for indoor trade show and convention center use?", "answer": "Yes. Our Oxford nylon materials are fire-retardant certified, meeting NFPA 701 standards required by most convention centers. We can provide material certification documents for venue compliance on request. The material is also phthalate-free and safe for indoor use."},
        ],
    },
    {
        "id": "p8", "slug": "inflatable-mirror-ball", "name": "Inflatable Mirror Ball",
        "category": "Decorations", "featured": False,
        "tags": ["inflatable mirror ball", "disco ball", "mirror ball", "party decoration", "event decoration"],
        "description": "Giant inflatable mirror ball for dance floors, nightclubs, festivals, and event decorations. Reflective mirror tile surface with optional LED lighting.",
        "geoSummary": "The Inflatable Mirror Ball by InflatableModel is a giant reflective inflatable disco ball available in diameters from 3 to 15 ft, featuring genuine mirror tile surface or silver reflective coating. Constructed with 210D Oxford nylon and optional internal LED lighting, it includes a blower and mounting hardware. Production takes 3\u20136 weeks. Ideal for dance floors, nightclubs, music festivals, weddings, and event decorations.",
        "longDescription": "Our Inflatable Mirror Ball brings the disco era to larger-than-life scale. Available in diameters from 3 to 15 feet, these giant mirror balls create stunning light reflections across any venue. The surface features genuine reflective mirror tiles or a seamless silver reflective coating, depending on your preference and budget.\n\nConstructed with a 210D Oxford nylon inflatable core, the mirror ball is significantly lighter than traditional glass mirror balls of equivalent size. It can be suspended from ceilings, trusses, or freestanding supports. Optional internal LED lighting creates a glowing effect even without external spotlights, making it visible and dramatic in any lighting condition.\n\nEach mirror ball ships with blower (for inflatable core), mounting hardware, repair kit, and storage bag. The inflatable core allows for compact transport and quick setup. Production takes 3\u20136 weeks with free 3D renderings provided before manufacturing.",
        "specs": {
            "sizeRange": "3ft \u2013 15ft diameter",
            "materialOptions": ["210D Oxford nylon core with mirror tiles", "420D Oxford nylon with reflective coating"],
            "printing": ["Genuine mirror tile surface", "Silver reflective coating", "Custom color tiles"],
            "blower": "Included (for inflatable core)",
            "voltageOptions": ["110V US", "220V EU", "220V UK", "220V AU"],
            "setupPeople": "1\u20132 people",
            "setupTime": "10\u201320 min",
            "indoorOutdoor": "Both",
            "anchoring": "Suspension mount or freestanding base",
            "packing": "Carry bag + carton",
            "productionTime": "3\u20136 weeks",
        },
        "faqs": [
            {"question": "Can I get a 10-foot inflatable mirror ball with real mirror tiles for a music festival stage?", "answer": "Yes. We offer mirror balls up to 15 feet in diameter with genuine reflective mirror tiles. The inflatable core makes it far lighter than a traditional glass mirror ball of the same size, allowing safe suspension from trusses and stage rigging. Optional internal LED lighting creates a glowing effect. Production takes 3\u20136 weeks."},
            {"question": "How is the mirror ball suspended and is it safe for overhead installation?", "answer": "The inflatable core is significantly lighter than traditional glass mirror balls, making it safer for overhead suspension. We provide mounting hardware rated for the ball's weight. For ceiling or truss mounting, we recommend a minimum 4-point suspension. A freestanding base option is available for floor placement. Always follow the included rigging guide."},
            {"question": "Can the mirror ball be used outdoors and will the mirror tiles withstand weather?", "answer": "Yes. The mirror tiles are weather-resistant and suitable for outdoor use. However, we recommend taking the ball down in heavy rain or winds exceeding 20 mph to protect the tiles. The inflatable core should be deflated and stored in the included bag when not in use. With proper care, the mirror surface lasts 3\u20135 years."},
        ],
    },
    {
        "id": "p9", "slug": "inflatable-tunnel", "name": "Inflatable Tunnel",
        "category": "Event Structures", "featured": False,
        "tags": ["inflatable tunnel", "player tunnel", "sports tunnel", "event tunnel", "entrance tunnel"],
        "description": "Custom-branded inflatable tunnel for sports team entrances, trade show walkways, and event corridors. Full-color printing and modular lengths.",
        "geoSummary": "The Inflatable Tunnel by InflatableModel is a custom-branded inflatable walkway tunnel available in lengths from 15 to 50 ft with heights from 8 to 15 ft. Featuring full-color UV-resistant printing on 210D\u2013500D Oxford nylon and an industrial blower system, it inflates in 10\u201320 minutes. Production takes 3\u20136 weeks. Ideal for sports team entrances, trade show corridors, red carpet events, and branded walkways.",
        "longDescription": "Our Inflatable Tunnel creates a dramatic branded walkway for sports team entrances, trade show aisles, and event corridors. Available in lengths from 15 to 50 feet and heights from 8 to 15 feet, each tunnel is fully custom-printed with your logos, team colors, sponsor messaging, and graphics on all interior and exterior surfaces.\n\nConstructed with commercial-grade 210D\u2013500D Oxford nylon or Cordura, the tunnel features reinforced seams and an industrial blower system that maintains constant pressure for structural rigidity. The modular design allows for length customization by adding or removing sections. Inflated side walls ensure safety for high-energy team runs and crowded walk-throughs.\n\nEach tunnel ships with industrial blower(s), tie-down stakes, anchor straps, repair kit, and storage bags. Setup takes 10\u201320 minutes with 2\u20133 people. We provide free 3D renderings showing your branding before production. Production takes 3\u20136 weeks.",
        "specs": {
            "sizeRange": "15ft \u2013 50ft long, 8\u201315ft tall",
            "materialOptions": ["210D Oxford nylon", "420D Oxford nylon", "500D Cordura (commercial)"],
            "printing": ["UV digital print", "Dye-sublimation", "Full-wrap interior and exterior"],
            "blower": "Industrial blower system included",
            "voltageOptions": ["110V US", "220V EU", "220V UK", "220V AU"],
            "setupPeople": "2\u20133 people",
            "setupTime": "10\u201320 min",
            "indoorOutdoor": "Both",
            "anchoring": "Heavy-duty stakes and anchor straps",
            "packing": "Multiple storage bags + carton",
            "productionTime": "3\u20136 weeks",
        },
        "faqs": [
            {"question": "Can you build a 40-foot inflatable tunnel with our football team colors and logo for player entrances?", "answer": "Yes. The Inflatable Tunnel is fully custom \u2014 we build it in your team colors with your logo, mascot, and sponsor messaging on all surfaces. At 40 feet long with 500D Cordura nylon, it handles high-energy team runs. Production takes 3\u20136 weeks. Free 3D renderings are provided before production showing your exact branding."},
            {"question": "How many blowers does a 40-foot tunnel need and what power is required?", "answer": "A 40-foot tunnel typically requires 2\u20133 industrial blowers running on 110V power. Most stadiums and fields have appropriate power available. We provide all blower systems, stakes, and anchor straps. The blower system inflates the tunnel in 8\u201310 minutes. A dedicated 20A circuit is recommended for each blower."},
            {"question": "Can the tunnel be modular so we can adjust the length for different venues?", "answer": "Yes. The tunnel features a modular section design that allows you to add or remove lengths to fit different venues. Sections connect via heavy-duty zippers. You can order additional sections separately. This makes the tunnel versatile for both small indoor events and large stadium entrances."},
        ],
    },
    {
        "id": "p10", "slug": "halloween-inflatable", "name": "Halloween Inflatable",
        "category": "Seasonal Inflatables", "featured": False,
        "tags": ["halloween inflatable", "spooky inflatable", "ghost inflatable", "pumpkin inflatable", "seasonal decoration"],
        "description": "Spooky Halloween-themed inflatables including ghosts, pumpkins, witches, and haunted house displays. Custom designs for haunted attractions and retail.",
        "geoSummary": "The Halloween Inflatable by InflatableModel is a custom spooky-themed inflatable available in heights from 6 to 25 ft, featuring full-color UV-resistant printing on 210D\u2013420D Oxford nylon with optional internal LED lighting. Includes blower, stakes, and repair kit. Production takes 3\u20136 weeks. Ideal for haunted attractions, retail seasonal displays, theme parks, and community Halloween events.",
        "longDescription": "Our Halloween Inflatables bring spooky spectacle to any seasonal display. From giant ghosts and grinning pumpkins to looming witches and haunted house facades, we create custom Halloween inflatables that delight and frighten in equal measure. Each piece features full-color UV-resistant digital printing with rich, dark color palettes and glow-in-the-dark accents.\n\nConstructed with 210D\u2013420D Oxford nylon, these inflatables are rated for seasonal outdoor use throughout October weather. Optional internal LED lighting creates an eerie nighttime glow, with color-changing RGB options for dynamic effects. The reinforced seams and tie-down system ensure stability in autumn winds.\n\nEach Halloween inflatable ships with blower, tie-down stakes, repair kit, and storage bag. We can create any spooky character or scene from your concept. Many haunted attractions and theme parks order custom pieces annually to refresh their displays. Production takes 3\u20136 weeks \u2014 order by August for October delivery.",
        "specs": {
            "sizeRange": "6ft \u2013 25ft tall",
            "materialOptions": ["210D Oxford nylon", "420D Oxford nylon (heavy-duty)"],
            "printing": ["UV digital print", "Dye-sublimation", "Glow-in-the-dark accents"],
            "blower": "Included (size-dependent)",
            "voltageOptions": ["110V US", "220V EU", "220V UK", "220V AU"],
            "setupPeople": "1\u20132 people",
            "setupTime": "5\u201315 min",
            "indoorOutdoor": "Both",
            "anchoring": "Stakes or sandbags",
            "packing": "Carry bag + carton",
            "productionTime": "3\u20136 weeks",
        },
        "faqs": [
            {"question": "Can you make a custom 20-foot Halloween inflatable of our haunted attraction's signature character?", "answer": "Yes. We build custom Halloween inflatables from your character concept, sketch, or reference images. Our design team creates a 3D rendering for approval within 48 hours. We can add glow-in-the-dark accents, internal LED lighting, and custom color palettes. Heights range from 6 to 25 feet. Order by August for October delivery."},
            {"question": "Do the Halloween inflatables have internal lighting for nighttime display?", "answer": "Yes. We offer internal LED lighting systems including RGB programmable options for dynamic color changes and eerie effects. Internal lighting makes the inflatables visible and dramatic after dark, which is essential for Halloween displays. The lighting is integrated during production and powered by the same blower system or a separate low-voltage supply."},
            {"question": "Are these durable enough for a full month of outdoor October weather?", "answer": "Yes. The 210D\u2013420D Oxford nylon construction is water-repellent and rated for seasonal outdoor use throughout October. UV-resistant printing maintains color even on sunny autumn days. The tie-down system secures the inflatable in typical autumn winds. We recommend deflating during severe storms. With proper storage, the inflatable can be reused for multiple Halloween seasons."},
        ],
    },
    {
        "id": "p11", "slug": "inflatable-santa-claus", "name": "Inflatable Santa Claus",
        "category": "Seasonal Inflatables", "featured": False,
        "tags": ["inflatable santa", "christmas inflatable", "santa claus", "holiday decoration", "seasonal inflatable"],
        "description": "Giant inflatable Santa Claus and Christmas-themed displays for shopping malls, city squares, and holiday events. Custom designs with LED lighting.",
        "geoSummary": "The Inflatable Santa Claus by InflatableModel is a giant holiday-themed inflatable available in heights from 6 to 30 ft, featuring full-color UV-resistant printing on 210D\u2013420D Oxford nylon with internal LED lighting. Includes blower, stakes, and repair kit. Production takes 3\u20136 weeks. Ideal for shopping malls, city squares, holiday parades, and Christmas-themed events.",
        "longDescription": "Our Inflatable Santa Claus and Christmas collection brings holiday magic to any venue at larger-than-life scale. From jolly Santas and reindeer to snowmen and giant gift boxes, each piece features vibrant full-color UV-resistant digital printing with rich reds, greens, and golds that capture the holiday spirit.\n\nConstructed with 210D\u2013420D Oxford nylon, these inflatables are rated for seasonal winter outdoor use. Internal LED lighting creates a warm nighttime glow that makes the displays visible and festive after dark \u2014 essential for holiday lighting displays. The water-repellent material handles light snow and winter moisture.\n\nEach inflatable ships with blower, tie-down stakes, repair kit, and storage bag. We can create any Christmas character or scene from your concept. Many shopping malls and municipalities order custom pieces annually to refresh their holiday displays. Production takes 3\u20136 weeks \u2014 order by September for December delivery.",
        "specs": {
            "sizeRange": "6ft \u2013 30ft tall",
            "materialOptions": ["210D Oxford nylon", "420D Oxford nylon (heavy-duty)"],
            "printing": ["UV digital print", "Dye-sublimation", "Metallic gold/silver accents"],
            "blower": "Included (size-dependent)",
            "voltageOptions": ["110V US", "220V EU", "220V UK", "220V AU"],
            "setupPeople": "1\u20132 people",
            "setupTime": "5\u201315 min",
            "indoorOutdoor": "Both",
            "anchoring": "Stakes or sandbags",
            "packing": "Carry bag + carton",
            "productionTime": "3\u20136 weeks",
        },
        "faqs": [
            {"question": "Can you make a 25-foot inflatable Santa Claus with internal LED lighting for a city square holiday display?", "answer": "Yes. We build custom Santa Claus inflatables up to 30 feet tall with internal LED lighting for warm nighttime glow. The 210D\u2013420D Oxford nylon is rated for winter outdoor use. We can add reindeer, sleighs, gift boxes, and custom holiday messaging. Production takes 3\u20136 weeks \u2014 order by September for December delivery."},
            {"question": "Will the inflatable withstand winter weather including snow and freezing temperatures?", "answer": "Yes. The Oxford nylon material is water-repellent and rated for winter conditions including light snow and freezing temperatures. The internal LED lighting creates warmth that helps prevent ice accumulation. We recommend deflating during severe winter storms. The tie-down system secures the inflatable in typical winter winds. With proper storage, it can be reused for multiple holiday seasons."},
            {"question": "Can we get a complete Christmas display set with Santa, reindeer, and a sleigh?", "answer": "Yes. We can create a complete holiday display set with multiple coordinated pieces \u2014 Santa, reindeer, sleigh, snowmen, elves, gift boxes, and more. Each piece is designed to complement the others in scale and style. We provide a 3D layout rendering showing how the pieces will look together at your venue. Volume pricing is available for multi-piece sets."},
        ],
    },
    {
        "id": "p12", "slug": "inflatable-camping-tent", "name": "Inflatable Camping Tent",
        "category": "Tents & Structures", "featured": False,
        "tags": ["inflatable camping tent", "inflatable tent", "camping tent", "outdoor shelter", "glamping tent"],
        "description": "Inflatable camping tent with air-beam structure \u2014 no poles required. Quick setup for camping, glamping, and outdoor expeditions. Custom sizes available.",
        "geoSummary": "The Inflatable Camping Tent by InflatableModel is a pole-free air-beam inflatable tent available in 4\u201312 person capacities, featuring 420D Oxford nylon construction with UV-resistant coating and waterproof seams. It inflates in 5\u201310 minutes with an included pump. Production takes 3\u20136 weeks. Ideal for camping, glamping, outdoor expeditions, and rental businesses needing quick-setup shelters.",
        "longDescription": "Our Inflatable Camping Tent revolutionizes outdoor shelter with air-beam technology \u2014 no poles, no assembly, no frustration. Simply inflate the air beams with the included pump and the tent is ready in 5\u201310 minutes. Available in 4 to 12 person capacities, these tents offer spacious interiors with standing height and multiple room configurations.\n\nConstructed with 420D Oxford nylon with UV-resistant coating and fully taped waterproof seams, the tent handles rain, wind, and sun with confidence. The air-beam structure is more flexible and wind-resistant than rigid poles, absorbing gusts without breaking. Large mesh windows provide ventilation while keeping insects out.\n\nEach tent ships with inflation pump, repair kit, stakes, guy lines, and storage bag. The deflated tent packs compactly for transport. Custom branding is available for rental businesses and glamping operators. Production takes 3\u20136 weeks.",
        "specs": {
            "sizeRange": "4-person \u2013 12-person",
            "materialOptions": ["420D Oxford nylon (standard)", "500D PVC-coated (heavy-duty)"],
            "printing": ["Custom branding on exterior", "Dye-sublimation"],
            "blower": "Inflation pump included",
            "voltageOptions": ["Manual pump", "110V electric pump", "220V electric pump"],
            "setupPeople": "1\u20132 people",
            "setupTime": "5\u201310 min",
            "indoorOutdoor": "Outdoor",
            "anchoring": "Stakes and guy lines",
            "packing": "Storage bag",
            "productionTime": "3\u20136 weeks",
        },
        "faqs": [
            {"question": "How does the air-beam structure compare to traditional pole tents in wind and storms?", "answer": "Air-beam structures are actually more wind-resistant than rigid poles because they flex and absorb gusts rather than breaking. The 420D Oxford nylon with taped waterproof seams handles rain confidently. The tent is rated for winds up to 30 mph when properly staked and guy-lined. In extreme conditions, the air beams can be deflated quickly for safety."},
            {"question": "Can I get a custom-branded inflatable camping tent for my glamping rental business?", "answer": "Yes. We offer custom exterior branding with your company logo, colors, and messaging. The 420D Oxford nylon supports dye-sublimation and UV digital printing. Many glamping operators order branded tents to create a cohesive, professional look across their rental fleet. Volume pricing is available for multi-unit orders."},
            {"question": "What happens if an air beam gets punctured \u2014 can it be repaired in the field?", "answer": "Yes. Each tent includes a comprehensive repair kit with patches, adhesive, and spare air valves. Small punctures can be patched in 10\u201315 minutes without deflating the entire tent. The air beams are independent, so a puncture in one beam doesn't deflate the whole structure. For major damage, spare beam sections are available for purchase."},
        ],
    },
    {
        "id": "p13", "slug": "inflatable-dome-tent", "name": "Inflatable Dome Tent",
        "category": "Tents & Structures", "featured": False,
        "tags": ["inflatable dome tent", "dome tent", "geodesic dome", "event dome", "glamping dome"],
        "description": "Geodesic inflatable dome tent for events, exhibitions, and glamping. Fully enclosed with optional clear windows and climate control integration.",
        "geoSummary": "The Inflatable Dome Tent by InflatableModel is a geodesic inflatable dome available in diameters from 10 to 30 ft, constructed with 500D PVC-coated polyester with optional clear PVC windows and climate control integration. It inflates in 10\u201315 minutes with an included blower. Production takes 3\u20136 weeks. Ideal for exhibitions, VIP lounges, glamping sites, and immersive brand experiences.",
        "longDescription": "Our Inflatable Dome Tent combines striking geodesic aesthetics with practical shelter. Available in diameters from 10 to 30 feet, these domes create a distinctive visual presence at any event or location. The fully enclosed design with optional clear PVC windows provides natural light while maintaining climate control.\n\nConstructed with 500D PVC-coated polyester, the dome is fully waterproof, wind-resistant, and suitable for year-round use. It supports integration with AC or heating units for climate control. The interior is open-span with no center pole, maximizing usable space. Optional interior lighting and flooring are available.\n\nEach dome ships with blower, stakes, anchor straps, repair kit, and storage bag. The dome can be branded with custom exterior graphics on removable panels. Production takes 3\u20136 weeks with free 3D renderings provided before manufacturing.",
        "specs": {
            "sizeRange": "10ft \u2013 30ft diameter",
            "materialOptions": ["500D PVC-coated polyester (standard)", "600D PVC-coated (premium)"],
            "printing": ["Custom exterior graphics on removable panels", "Dye-sublimation"],
            "blower": "1.5HP blower included",
            "voltageOptions": ["110V US", "220V EU", "220V UK", "220V AU"],
            "setupPeople": "2\u20134 people",
            "setupTime": "15\u201330 min",
            "indoorOutdoor": "Both",
            "anchoring": "Stakes, water ballast, or weights",
            "packing": "Storage bag + carton",
            "productionTime": "3\u20136 weeks",
        },
        "faqs": [
            {"question": "Can the dome tent be fully enclosed with climate control for winter glamping?", "answer": "Yes. The dome is fully enclosed with 500D PVC-coated polyester walls and supports climate control integration including AC and heating units. Optional clear PVC windows provide natural light. The dome is rated for year-round use including winter conditions. This makes it ideal for glamping sites operating in all seasons."},
            {"question": "How many people can fit inside the 20-foot dome for an event?", "answer": "The 20-foot diameter dome provides approximately 314 sq ft of interior space with no center pole. It comfortably fits 15\u201325 people standing for an event, or 8\u201312 people seated. The 30-foot dome fits up to 50 standing. The open-span interior maximizes usable space."},
            {"question": "Can the exterior graphics be changed for different events?", "answer": "Yes. The exterior graphics are printed on removable panels that attach via heavy-duty Velcro. You can order additional graphic sets for different events and swap them in 20\u201330 minutes. This makes the dome reusable across multiple activations with different branding or themes."},
        ],
    },
    {
        "id": "p14", "slug": "inflatable-spider-tent", "name": "Inflatable Spider Tent",
        "category": "Tents & Structures", "featured": False,
        "tags": ["inflatable spider tent", "spider tent", "event tent", "promotional tent", "outdoor canopy"],
        "description": "Eye-catching inflatable spider tent with multi-leg design for maximum visual impact at outdoor events. Custom branding on all surfaces.",
        "geoSummary": "The Inflatable Spider Tent by InflatableModel is a multi-leg inflatable canopy tent available in spans from 10 to 25 ft, featuring full-color UV-resistant printing on 420D Oxford nylon with a distinctive spider-leg design. It inflates in 10\u201315 minutes with an included blower. Production takes 3\u20136 weeks. Ideal for outdoor promotions, trade shows, sporting events, and brand activations needing a unique visual presence.",
        "longDescription": "Our Inflatable Spider Tent stands out from conventional canopy tents with its distinctive multi-leg spider design. The dramatic arched legs create a visually striking silhouette that draws attention at any event. Available in spans from 10 to 25 feet, the tent provides ample covered space with standing height throughout.\n\nConstructed with 420D Oxford nylon, the spider tent features full-color UV-resistant digital printing on all surfaces \u2014 legs, canopy, and optional side walls. The material is water-repellent and rated for outdoor use. The multi-leg design provides excellent stability without the need for center poles, maximizing usable interior space.\n\nEach tent ships with blower, tie-down stakes, anchor straps, repair kit, and storage bag. Setup takes 10\u201315 minutes with 2\u20133 people. We provide free 3D renderings showing your branding before production. Production takes 3\u20136 weeks.",
        "specs": {
            "sizeRange": "10ft \u2013 25ft span",
            "materialOptions": ["420D Oxford nylon (standard)", "500D PVC-coated (commercial)"],
            "printing": ["UV digital print", "Dye-sublimation", "Full-wrap branding"],
            "blower": "Included",
            "voltageOptions": ["110V US", "220V EU", "220V UK", "220V AU"],
            "setupPeople": "2\u20133 people",
            "setupTime": "10\u201315 min",
            "indoorOutdoor": "Outdoor",
            "anchoring": "Stakes and anchor straps",
            "packing": "Storage bag + carton",
            "productionTime": "3\u20136 weeks",
        },
        "faqs": [
            {"question": "Can I get a spider tent with our company logo printed on all the legs and canopy for trade shows?", "answer": "Yes. The spider tent supports full-color UV printing on all surfaces including every leg, the canopy, and optional side walls. The multi-leg design actually provides more branding area than a standard canopy tent. We provide free 3D renderings showing exactly how your branding will appear. Production takes 3\u20136 weeks."},
            {"question": "How does the spider tent compare to a standard pop-up canopy tent?", "answer": "The spider tent offers significantly higher visual impact with its distinctive multi-leg design, more branding surface area, and no center pole (maximizing interior space). It inflates in 10\u201315 minutes vs 5 minutes for a pop-up, and weighs more, but the branding and visual presence is far superior. Ideal for brands wanting to stand out."},
            {"question": "Can the spider tent withstand wind at outdoor events?", "answer": "Yes. The multi-leg design provides excellent stability, and the tent includes heavy-duty stakes and anchor straps rated for winds up to 20 mph. The 420D Oxford nylon is water-repellent. The continuous-duty blower maintains constant pressure. We recommend deflating if sustained winds exceed 25 mph."},
        ],
    },
    {
        "id": "p15", "slug": "inflatable-bubble-house", "name": "Inflatable Bubble House",
        "category": "Tents & Structures", "featured": False,
        "tags": ["inflatable bubble house", "bubble tent", "transparent dome", "glamping bubble", "clear inflatable"],
        "description": "Transparent inflatable bubble house for stargazing, glamping, and unique event experiences. Clear PVC construction with optional privacy panels.",
        "geoSummary": "The Inflatable Bubble House by InflatableModel is a transparent inflatable dome available in diameters from 10 to 20 ft, constructed with clear PVC and 420D Oxford nylon base. It features 360-degree transparent walls for stargazing and panoramic views, with an included air circulation system. Production takes 3\u20136 weeks. Ideal for glamping sites, luxury camping, event installations, and unique hospitality experiences.",
        "longDescription": "Our Inflatable Bubble House creates a one-of-a-kind transparent living space for stargazing, glamping, and immersive outdoor experiences. The 360-degree clear PVC walls provide unobstructed panoramic views of the surrounding landscape and night sky while protecting occupants from weather and insects.\n\nConstructed with high-clarity transparent PVC and a 420D Oxford nylon base, the bubble house features a continuous air circulation system that maintains fresh air and prevents condensation buildup. The entrance uses an airlock-style double-zipper system to maintain inflation. Optional privacy panels and interior curtains are available.\n\nEach bubble house ships with blower/air circulation system, repair kit, stakes, and storage bag. The bubble deflates compactly for transport. Custom sizes and configurations are available. Production takes 3\u20136 weeks.",
        "specs": {
            "sizeRange": "10ft \u2013 20ft diameter",
            "materialOptions": ["Clear PVC with 420D Oxford nylon base", "Tinted PVC (upgrade)"],
            "printing": ["Optional privacy panels", "Base branding"],
            "blower": "Air circulation blower included",
            "voltageOptions": ["110V US", "220V EU", "220V UK", "220V AU"],
            "setupPeople": "1\u20132 people",
            "setupTime": "10\u201320 min",
            "indoorOutdoor": "Outdoor",
            "anchoring": "Stakes or weighted base",
            "packing": "Storage bag",
            "productionTime": "3\u20136 weeks",
        },
        "faqs": [
            {"question": "Does the bubble house get condensation buildup inside and how is it managed?", "answer": "The bubble house includes a continuous air circulation system that exchanges air 4\u20136 times per hour, preventing condensation buildup. The system runs quietly on the included blower. For humid climates, we recommend keeping the airlock entrance zipped and running the circulation system continuously. Optional dehumidifier integration is available."},
            {"question": "Can the bubble house be used in rain and wind?", "answer": "Yes. The clear PVC is fully waterproof and the 420D Oxford nylon base is water-repellent. The bubble is rated for light to moderate rain. For wind, the included stakes and guy lines secure the bubble in winds up to 20 mph. We recommend deflating during severe storms. The air circulation system prevents rain from pooling on the surface."},
            {"question": "Is there a privacy option for the transparent bubble house?", "answer": "Yes. We offer optional privacy panels that can be attached to portions of the bubble for sleeping or changing areas. Interior curtains are also available. Some clients order a partially tinted version that reduces visibility from outside while maintaining natural light. Custom configurations are available."},
        ],
    },
    {
        "id": "p16", "slug": "inflatable-bounce-house", "name": "Inflatable Bounce House",
        "category": "Amusement Inflatables", "featured": True,
        "tags": ["inflatable bounce house", "bounce house", "jumping castle", "moonwalk", "party rental"],
        "description": "Commercial-grade inflatable bounce house for party rentals, festivals, and event entertainment. Custom branding and themed designs available.",
        "geoSummary": "The Inflatable Bounce House by InflatableModel is a commercial-grade jumping castle available in sizes from 10x10 to 20x20 ft, featuring 500D PVC-coated polyester construction with full-color UV-resistant printing and reinforced stitching. It inflates in 5\u201310 minutes with an included blower. Production takes 3\u20136 weeks. Ideal for party rental businesses, festivals, corporate events, and family entertainment centers.",
        "longDescription": "Our Inflatable Bounce House is built for commercial rental use, with durability and safety as top priorities. Available in sizes from 10x10 to 20x20 feet, each bounce house features 500D PVC-coated polyester construction with double and quadruple stitching at all stress points. The inflatable safety walls, non-slip bottom surface, and soft-landing zones meet industry safety standards.\n\nEach bounce house supports full-color UV-resistant digital printing for custom themes \u2014 princess castles, pirate ships, superhero themes, or your company branding. The material is fire-retardant certified and lead-free, meeting safety requirements for children's amusement equipment. The reinforced construction handles continuous use by children and adults.\n\nEach unit ships with commercial blower, stakes, repair kit, and storage bag. We provide safety and setup guides with every order. Production takes 3\u20136 weeks. Volume pricing is available for rental fleet orders.",
        "specs": {
            "sizeRange": "10x10ft \u2013 20x20ft",
            "materialOptions": ["500D PVC-coated polyester (commercial)", "600D PVC-coated (heavy use)"],
            "printing": ["UV digital print", "Dye-sublimation", "Custom themes"],
            "blower": "Commercial blower included",
            "voltageOptions": ["110V US", "220V EU", "220V UK", "220V AU"],
            "setupPeople": "1\u20132 people",
            "setupTime": "5\u201310 min",
            "indoorOutdoor": "Both",
            "anchoring": "Heavy-duty stakes",
            "packing": "Storage bag",
            "productionTime": "3\u20136 weeks",
        },
        "faqs": [
            {"question": "Can I get a custom-themed bounce house with our party rental company branding for our rental fleet?", "answer": "Yes. We offer full-color UV-resistant digital printing with any theme \u2014 princess castles, pirate ships, superheroes, or your company logo and colors. The 500D PVC-coated polyester is commercial-grade for rental use. Volume pricing is available for fleet orders. Production takes 3\u20136 weeks per unit."},
            {"question": "What safety features are included with the bounce house?", "answer": "Safety features include: inflated safety walls on all sides, non-slip bottom surface, soft-landing zones, reinforced double and quadruple stitching at stress points, fire-retardant certified material (NFPA 701), lead-free construction, anchor stakes rated for high winds, and GFCI-protected blower. We provide a safety and setup guide with every order."},
            {"question": "How many children can use the bounce house at once and what is the weight limit?", "answer": "A standard 15x15 ft bounce house safely accommodates 6\u20138 children (ages 3\u201312) simultaneously, with a total weight capacity of approximately 800 lbs. The 20x20 ft model accommodates 10\u201312 children. Adult supervision is required at all times. We provide capacity guidelines based on size and age group with every unit."},
        ],
    },
    {
        "id": "p17", "slug": "inflatable-water-slide", "name": "Inflatable Water Slide",
        "category": "Amusement Inflatables", "featured": True,
        "tags": ["inflatable water slide", "water slide", "pool slide", "summer inflatable", "party rental"],
        "description": "Large inflatable water slide for summer events, pool parties, and water parks. Multiple lane configurations with splash pools and custom branding.",
        "geoSummary": "The Inflatable Water Slide by InflatableModel is a commercial-grade inflatable water slide available in heights from 15 to 40 ft with single, dual, or triple lane configurations. Constructed with 500D PVC-coated polyester with full-color UV-resistant printing and integrated splash pool. It inflates in 10\u201320 minutes with an included blower. Production takes 3\u20136 weeks. Ideal for water parks, party rentals, summer festivals, and corporate events.",
        "longDescription": "Our Inflatable Water Slide delivers summer thrills at any event. Available in heights from 15 to 40 feet with single, dual, or triple lane configurations, each slide features a smooth, fast sliding surface with integrated splash pool or runoff lane. The 500D PVC-coated polyester construction with reinforced heat-welded seams handles continuous water flow and heavy use.\n\nEach water slide supports full-color UV-resistant digital printing for custom themes \u2014 tropical, pirate, ocean, or your company branding. Safety features include inflated side walls, non-slip climb steps with handles, soft-landing zones, and anchor systems rated for outdoor stability. The material is fire-retardant certified and lead-free.\n\nEach unit ships with commercial blower, water pump connection kit, stakes, repair kit, and storage bag. We provide safety and setup guides with every order. Production takes 3\u20136 weeks. Volume pricing is available for rental fleet orders.",
        "specs": {
            "sizeRange": "15ft \u2013 40ft tall",
            "materialOptions": ["500D PVC-coated polyester (commercial)", "600D PVC-coated (heavy use)"],
            "printing": ["UV digital print", "Dye-sublimation", "Custom themes"],
            "blower": "Commercial blower included",
            "voltageOptions": ["110V US", "220V EU", "220V UK", "220V AU"],
            "setupPeople": "2\u20133 people",
            "setupTime": "10\u201320 min",
            "indoorOutdoor": "Outdoor",
            "anchoring": "Heavy-duty stakes",
            "packing": "Storage bag",
            "productionTime": "3\u20136 weeks",
        },
        "faqs": [
            {"question": "Can I get a 30-foot dual-lane inflatable water slide with our company branding for summer party rentals?", "answer": "Yes. We offer custom-branded water slides in heights from 15 to 40 feet with single, dual, or triple lanes. The 500D PVC-coated polyester is commercial-grade for rental use. Full-color UV printing with your logo and theme. Volume pricing is available for fleet orders. Production takes 3\u20136 weeks."},
            {"question": "Does the water slide need a continuous water supply or does it recirculate?", "answer": "The water slide requires a continuous water supply from a standard garden hose connection. Water flows down the sliding surface and into the splash pool, then drains. There is no recirculation system \u2014 this is standard for inflatable water slides and ensures hygiene. Water consumption is approximately 2\u20134 gallons per minute during operation."},
            {"question": "What safety features are included with the water slide?", "answer": "Safety features include: inflated side walls along the entire slide path, non-slip climb steps with safety handles, soft-landing splash pool, reinforced heat-welded seams, fire-retardant certified material, lead-free construction, anchor stakes rated for high winds, and GFCI-protected blower. We provide capacity guidelines and a safety setup guide with every unit."},
        ],
    },
    {
        "id": "p18", "slug": "inflatable-light-column", "name": "Inflatable Light Column",
        "category": "Decorations", "featured": False,
        "tags": ["inflatable light column", "LED column", "light tower", "event lighting", "decorative inflatable"],
        "description": "Illuminated inflatable light columns for event lighting, stage decoration, and architectural accents. RGB LED with programmable color changing.",
        "geoSummary": "The Inflatable Light Column by InflatableModel is an illuminated inflatable tower available in heights from 6 to 20 ft, featuring internal RGB LED lighting with programmable color changing and DMX compatibility. Constructed with translucent 210D Oxford nylon, it inflates in 3\u20135 minutes. Production takes 3\u20136 weeks. Ideal for stage decoration, event lighting, trade show booths, and architectural accents.",
        "longDescription": "Our Inflatable Light Column creates dramatic vertical lighting at any event. Available in heights from 6 to 20 feet, each column features an internal RGB LED system with programmable color changing, DMX compatibility, and remote control operation. The translucent 210D Oxford nylon diffuses light evenly for a soft, glowing effect.\n\nThe columns can be programmed to display solid colors, slow fades, color cycles, or synchronized patterns across multiple units. They are DMX-compatible for integration with professional lighting control systems. The inflatable design makes them far lighter and more portable than traditional LED towers, with setup in 3\u20135 minutes per column.\n\nEach column ships with blower, LED system, power supply, remote control, stakes, and storage bag. Indoor and outdoor models are available. Production takes 3\u20136 weeks.",
        "specs": {
            "sizeRange": "6ft \u2013 20ft tall",
            "materialOptions": ["Translucent 210D Oxford nylon (standard)", "Translucent 420D Oxford nylon (upgrade)"],
            "printing": ["Custom branding on base", "Color-matched translucent panels"],
            "blower": "Included (internal)",
            "voltageOptions": ["110V US", "220V EU", "220V UK", "220V AU"],
            "setupPeople": "1 person",
            "setupTime": "3\u20135 min",
            "indoorOutdoor": "Both",
            "anchoring": "Weighted base or stakes",
            "packing": "Carry bag",
            "productionTime": "3\u20136 weeks",
        },
        "faqs": [
            {"question": "Can I get a set of inflatable light columns with DMX-controlled RGB lighting for a stage production?", "answer": "Yes. Our light columns feature internal RGB LED systems with DMX compatibility for integration with professional lighting controllers. You can program solid colors, fades, cycles, or synchronized patterns across multiple columns. We can provide DMX channel maps and setup guides. Multiple columns can be linked for coordinated shows."},
            {"question": "How bright are the LED columns and can they be seen in daylight?", "answer": "The internal RGB LEDs are high-output and clearly visible in low-light and indoor conditions. In direct sunlight, the glow effect is less pronounced \u2014 they are primarily designed for evening, indoor, or dimly-lit environments. For daylight events, we recommend pairing with exterior-printed graphics. The columns are most dramatic after dark."},
            {"question": "Can multiple light columns be synchronized to change colors together?", "answer": "Yes. Multiple columns can be synchronized via DMX controller or wireless remote. You can program coordinated color changes, chases, and patterns across all columns simultaneously. We provide setup guides for multi-unit synchronization. Many clients order sets of 4\u20138 columns for coordinated stage and event lighting."},
        ],
    },
    {
        "id": "p19", "slug": "inflatable-flower", "name": "Inflatable Flower",
        "category": "Decorations", "featured": False,
        "tags": ["inflatable flower", "giant flower", "event decoration", "garden decoration", "floral inflatable"],
        "description": "Oversized inflatable flower sculptures for garden displays, event decoration, and themed environments. Custom species and colors available.",
        "geoSummary": "The Inflatable Flower by InflatableModel is an oversized decorative inflatable flower sculpture available in heights from 4 to 20 ft, featuring full-color UV-resistant printing on 210D\u2013420D Oxford nylon with optional internal LED lighting. Includes blower, stakes, and repair kit. Production takes 3\u20136 weeks. Ideal for garden festivals, spring events, themed parties, retail displays, and event decorations.",
        "longDescription": "Our Inflatable Flower sculptures bring vibrant botanical beauty to any event at larger-than-life scale. From giant roses and sunflowers to tropical hibiscus and custom fantasy blooms, each flower is crafted with full-color UV-resistant digital printing that captures petal textures, color gradients, and natural detail.\n\nConstructed with 210D\u2013420D Oxford nylon, these flower sculptures feature reinforced internal structures that maintain petal shape and posture. Optional internal LED lighting creates a stunning nighttime glow, with color-matched LEDs that enhance the flower's natural coloring. The UV-resistant printing maintains vibrancy for 3\u20135 years of outdoor use.\n\nEach flower ships with blower, tie-down stakes, repair kit, and storage bag. We can create any flower species from your reference images, or design custom fantasy blooms. Multiple flowers can be grouped for garden installations and themed displays. Production takes 3\u20136 weeks.",
        "specs": {
            "sizeRange": "4ft \u2013 20ft tall",
            "materialOptions": ["210D Oxford nylon", "420D Oxford nylon (heavy-duty)"],
            "printing": ["UV digital print", "Dye-sublimation", "Airbrush petal detailing"],
            "blower": "Included (size-dependent)",
            "voltageOptions": ["110V US", "220V EU", "220V UK", "220V AU"],
            "setupPeople": "1\u20132 people",
            "setupTime": "5\u201315 min",
            "indoorOutdoor": "Both",
            "anchoring": "Stakes or weighted base",
            "packing": "Carry bag + carton",
            "productionTime": "3\u20136 weeks",
        },
        "faqs": [
            {"question": "Can you make a custom 15-foot inflatable sunflower with internal LED lighting for a garden festival?", "answer": "Yes. We build custom inflatable flowers from your reference images or specifications. Our design team creates a 3D rendering for approval within 48 hours. We can match any flower species and color palette. Optional internal LED lighting creates a nighttime glow. Heights range from 4 to 20 feet. Production takes 3\u20136 weeks."},
            {"question": "Can I order a set of different flowers for a themed garden display?", "answer": "Yes. We can create a coordinated set of different flower species and sizes for a garden installation. Each flower is designed to complement the others in style and scale. We provide a 3D layout rendering showing how the flowers will look together. Volume pricing is available for multi-flower sets."},
            {"question": "Are the flowers suitable for permanent outdoor garden display?", "answer": "The 420D Oxford nylon option is suitable for semi-permanent outdoor display with UV-resistant printing rated for 3\u20135 years. However, for longevity we recommend taking flowers down during severe weather and storing them in the included bags. With proper care, the flowers can be reused across multiple seasons and events for 5+ years."},
        ],
    },
    {
        "id": "p20", "slug": "inflatable-tree", "name": "Inflatable Tree",
        "category": "Decorations", "featured": False,
        "tags": ["inflatable tree", "giant tree", "event decoration", "themed environment", "props"],
        "description": "Large-scale inflatable tree sculptures for themed environments, holiday displays, and event decoration. Custom species including palm, oak, and Christmas trees.",
        "geoSummary": "The Inflatable Tree by InflatableModel is a large-scale decorative inflatable tree sculpture available in heights from 10 to 40 ft, featuring full-color UV-resistant printing on 210D\u2013500D Oxford nylon with optional internal LED lighting. Includes blower, stakes, and repair kit. Production takes 3\u20136 weeks. Ideal for themed events, holiday displays, stage productions, and immersive environment design.",
        "longDescription": "Our Inflatable Tree sculptures create dramatic vertical presence at any event or themed environment. From majestic oaks and tropical palms to winter pines and fantasy trees, each sculpture is crafted with full-color UV-resistant digital printing that captures bark texture, leaf detail, and natural color gradients.\n\nConstructed with 210D\u2013500D Oxford nylon, these tree sculptures feature reinforced internal structures that maintain trunk and canopy shape in outdoor conditions. Optional internal LED lighting creates a dramatic nighttime presence, with color-matched LEDs in the canopy. The UV-resistant printing maintains vibrancy for 3\u20135 years of outdoor use.\n\nEach tree ships with blower, tie-down stakes, anchor straps, repair kit, and storage bag. We can create any tree species from your reference images, or design custom fantasy trees for themed productions. Multiple trees can be grouped for forest installations. Production takes 3\u20136 weeks.",
        "specs": {
            "sizeRange": "10ft \u2013 40ft tall",
            "materialOptions": ["210D Oxford nylon", "420D Oxford nylon", "500D Cordura (commercial)"],
            "printing": ["UV digital print", "Dye-sublimation", "Airbrush bark and leaf detailing"],
            "blower": "Included (size-dependent)",
            "voltageOptions": ["110V US", "220V EU", "220V UK", "220V AU"],
            "setupPeople": "1\u20132 people",
            "setupTime": "10\u201320 min",
            "indoorOutdoor": "Both",
            "anchoring": "Stakes and anchor straps",
            "packing": "Carry bag + carton",
            "productionTime": "3\u20136 weeks",
        },
        "faqs": [
            {"question": "Can you make a 30-foot inflatable palm tree for a tropical-themed corporate event?", "answer": "Yes. We build custom inflatable trees from your reference images or specifications, including palm trees, oaks, pines, and fantasy trees. Our design team creates a 3D rendering for approval within 48 hours. Heights range from 10 to 40 feet. Optional internal LED lighting for nighttime display. Production takes 3\u20136 weeks."},
            {"question": "Can the trees be used for permanent outdoor installation at a theme park?", "answer": "For semi-permanent outdoor installation, we recommend 500D Cordura nylon with UV-resistant printing rated for 3\u20135 years. The reinforced internal structure maintains shape in winds up to 25 mph. While suitable for extended outdoor display, we recommend seasonal takedown during extreme weather. Many theme parks use our trees semi-permanently."},
            {"question": "Can I get a set of different trees for a forest-themed event installation?", "answer": "Yes. We can create a coordinated set of different tree species and sizes for a forest installation. Each tree is designed to complement the others in style and scale. We provide a 3D layout rendering showing how the trees will look together at your venue. Volume pricing is available for multi-tree sets."},
        ],
    },
    {
        "id": "p21", "slug": "inflatable-food-replica", "name": "Inflatable Food Replica",
        "category": "Product Replicas", "featured": True,
        "tags": ["inflatable food replica", "giant food", "food inflatable", "product replica", "promotional food"],
        "description": "Oversized inflatable food replicas including burgers, ice cream, cakes, fruit, and bread. Custom food items for restaurant promotions and food brand marketing.",
        "geoSummary": "The Inflatable Food Replica by InflatableModel is a custom oversized inflatable food sculpture available in sizes from 3 to 20 ft, featuring full-color UV-resistant digital printing on 210D\u2013420D Oxford nylon with airbrush detailing and optional internal LED lighting. Includes blower, stakes, and repair kit. Production takes 3\u20136 weeks. Ideal for restaurant promotions, food brand marketing, trade shows, and food festival displays.",
        "longDescription": "Our Inflatable Food Replicas make mouths water at larger-than-life scale. From giant burgers and towering ice cream cones to massive birthday cakes and oversized fruit, we replicate any food item as a eye-catching promotional inflatable. Each replica features photo-realistic UV-resistant digital printing with hand-applied airbrush detailing for texture and depth.\n\nConstructed with 210D\u2013420D Oxford nylon, these food replicas feature reinforced internal structures that maintain shape and detail. Optional internal LED lighting creates an appetizing nighttime glow. The UV-resistant printing maintains color vibrancy for 3\u20135 years, making them suitable for both indoor and outdoor promotional use.\n\nEach replica ships with blower, tie-down stakes, repair kit, and storage bag. We can replicate any food item from your product specifications or reference images. Free 3D renderings are provided before production. Production takes 3\u20136 weeks.",
        "specs": {
            "sizeRange": "3ft \u2013 20ft",
            "materialOptions": ["210D Oxford nylon", "420D Oxford nylon (heavy-duty)"],
            "printing": ["UV digital print", "Dye-sublimation", "Airbrush detailing"],
            "blower": "Included (size-dependent)",
            "voltageOptions": ["110V US", "220V EU", "220V UK", "220V AU"],
            "setupPeople": "1\u20132 people",
            "setupTime": "5\u201315 min",
            "indoorOutdoor": "Both",
            "anchoring": "Stakes or sandbags",
            "packing": "Carry bag + carton",
            "productionTime": "3\u20136 weeks",
        },
        "faqs": [
            {"question": "Can you make a 10-foot inflatable replica of our restaurant's signature burger for a grand opening promotion?", "answer": "Yes. We replicate any food item from your product specifications, reference photos, or actual product. Our design team creates a 3D rendering for approval within 48 hours. We match colors, textures, and details precisely with UV-resistant digital printing and airbrush detailing. Optional internal LED lighting for nighttime visibility. Production takes 3\u20136 weeks."},
            {"question": "Can I order multiple food replicas for a food festival display \u2014 like a burger, ice cream, and fries set?", "answer": "Yes. We can create a coordinated set of different food replicas for a festival or promotional display. Each piece is designed to complement the others in style and scale. We provide a 3D layout rendering showing how the pieces will look together. Volume pricing is available for multi-item sets."},
            {"question": "Are the food replicas suitable for outdoor use at food festivals and street fairs?", "answer": "Yes. The 210D\u2013420D Oxford nylon construction is rated for outdoor use with UV-resistant printing that maintains color for 3\u20135 years. The water-repellent material handles light rain. Tie-down stakes secure the replica in typical outdoor winds. We recommend deflating during severe weather. With proper storage, replicas can be reused across multiple events."},
        ],
    },
    {
        "id": "p22", "slug": "inflatable-stage", "name": "Inflatable Stage",
        "category": "Event Structures", "featured": False,
        "tags": ["inflatable stage", "event stage", "portable stage", "concert stage", "performance stage"],
        "description": "Custom inflatable stage and performance platform for concerts, festivals, and corporate presentations. Full-color branding and integrated canopy.",
        "geoSummary": "The Inflatable Stage by InflatableModel is a custom inflatable performance stage with integrated canopy, available in sizes from 15x15 to 40x30 ft. Constructed with 500D PVC-coated polyester with full-color UV-resistant printing and an industrial blower system. Production takes 3\u20136 weeks. Ideal for concerts, festivals, corporate presentations, and outdoor performances requiring a portable branded stage.",
        "longDescription": "Our Inflatable Stage provides a portable, visually striking performance platform for any event. Available in stage sizes from 15x15 to 40x30 feet, each stage features an integrated inflatable canopy that provides shade and weather protection while serving as a massive branding surface. The stage deck is elevated and stable, suitable for performers, speakers, and equipment.\n\nConstructed with 500D PVC-coated polyester, the stage and canopy feature full-color UV-resistant digital printing on all visible surfaces. The industrial blower system maintains constant pressure for structural rigidity. The canopy can be configured in various shapes including traditional, spider, and custom designs. The stage includes cable management routing for AV equipment.\n\nEach stage ships with industrial blower system, tie-down stakes, anchor straps, repair kit, and storage bags. Setup takes 30\u201360 minutes with 3\u20134 people depending on size. We provide free 3D renderings and technical specifications before production. Production takes 3\u20136 weeks.",
        "specs": {
            "sizeRange": "15x15ft \u2013 40x30ft",
            "materialOptions": ["500D PVC-coated polyester (standard)", "600D PVC-coated (heavy use)"],
            "printing": ["UV digital print", "Dye-sublimation", "Full-wrap canopy and stage branding"],
            "blower": "Industrial blower system included",
            "voltageOptions": ["110V US", "220V EU", "220V UK", "220V AU"],
            "setupPeople": "3\u20134 people",
            "setupTime": "30\u201360 min",
            "indoorOutdoor": "Outdoor",
            "anchoring": "Heavy-duty stakes and anchor straps",
            "packing": "Multiple storage bags + cartons",
            "productionTime": "3\u20136 weeks",
        },
        "faqs": [
            {"question": "Can you build a 30x20 inflatable stage with our festival branding on the canopy for an outdoor concert?", "answer": "Yes. The Inflatable Stage is fully custom \u2014 we build it to your required dimensions with full-color UV printing on the canopy and all visible surfaces. The 500D PVC-coated polyester handles outdoor conditions. The integrated canopy provides weather protection and massive branding space. Production takes 3\u20136 weeks. Free 3D renderings before production."},
            {"question": "How stable is the inflatable stage for performers and equipment?", "answer": "The stage deck is elevated and structurally stable, suitable for performers, speakers, and AV equipment. The 500D PVC-coated polyester construction with industrial blower system maintains constant rigidity. Heavy-duty stakes and anchor straps secure the stage. We provide load specifications and setup guides. The stage handles normal performance activity confidently."},
            {"question": "Can the stage canopy be configured in different shapes and designs?", "answer": "Yes. The canopy can be configured in various shapes including traditional flat, arched, spider-leg, and custom designs. We can design a unique canopy shape to match your event theme. The canopy serves as both weather protection and a massive branding surface. We provide 3D renderings showing different canopy options during the design phase."},
        ],
    },
    {
        "id": "p23", "slug": "inflatable-costume", "name": "Inflatable Costume",
        "category": "Wearables", "featured": False,
        "tags": ["inflatable costume", "wearable inflatable", "costume", "mascot costume", "party costume"],
        "description": "Wearable inflatable costumes with integrated battery-powered fan. Custom character designs for mascot appearances, parades, and promotional events.",
        "geoSummary": "The Inflatable Costume by InflatableModel is a wearable inflatable character costume with integrated battery-powered fan, fitting heights from 5'2\" to 6'4\". Made with ripstop polyester and full-color digital print, it runs 4\u20136 hours on a rechargeable Li-Ion battery. Production takes 3\u20136 weeks. Ideal for mascot appearances, parades, trade show attractions, and promotional events requiring an interactive character presence.",
        "longDescription": "Our Inflatable Costume brings character interaction to a personal scale. These wearable inflatables feature an integrated battery-powered fan that keeps the costume inflated and the wearer cool. Available as standard character designs (animals, superheroes, novelty characters) or fully custom builds from your brand artwork. Each costume fits wearers from 5'2\" to 6'4\" with adjustable internals.\n\nConstructed with lightweight ripstop polyester and full-color digital printing, the costumes are comfortable for extended wear (4\u20136 hours per battery charge). The integrated fan provides continuous air circulation, preventing heat buildup. A spare battery is included for all-day events. The fan is quiet and will not interfere with conversations.\n\nEach costume ships with battery-powered fan, rechargeable Li-Ion battery, spare battery, charger, and carry bag. The costume is spot-cleanable with mild soap and water. Production takes 3\u20136 weeks for custom designs.",
        "specs": {
            "sizeRange": "One size (fits 5'2\" \u2013 6'4\")",
            "materialOptions": ["Ripstop polyester (standard)", "Nylon packcloth (upgrade)"],
            "printing": ["Full-color digital print", "Dye-sublimation"],
            "blower": "Battery-powered fan (not continuous blower)",
            "voltageOptions": ["110V US charger", "220V EU charger", "220V UK charger", "220V AU charger"],
            "setupPeople": "1 person (self-donning)",
            "setupTime": "2 min",
            "indoorOutdoor": "Both",
            "anchoring": "Worn by user \u2014 no anchoring needed",
            "packing": "Carry bag",
            "productionTime": "3\u20136 weeks",
        },
        "faqs": [
            {"question": "Can I get a custom wearable inflatable costume of our brand character for a trade show booth?", "answer": "Yes. The Inflatable Costume is custom-printed with your brand character design. We work from your artwork, logo, or concept sketch to create a 3D rendering for approval. The costume fits wearers from 5'2\" to 6'4\" and runs 4\u20136 hours on the rechargeable battery. Ripstop polyester with full-color digital print. Production takes 3\u20136 weeks."},
            {"question": "How hot does it get inside the costume during a multi-hour event?", "answer": "The integrated battery-powered fan provides continuous air circulation, keeping the wearer comfortable for 4\u20136 hours. The ripstop polyester is breathable. For longer events, we include a spare battery so you can swap without interruption. The fan is quiet and will not interfere with conversations or interactions."},
            {"question": "Is the costume washable after events?", "answer": "The ripstop polyester exterior can be spot-cleaned with mild soap and warm water. Do not machine wash or dry clean. Allow to air dry completely before storing. With proper care, the costume will last through many events. A carry bag is included for transport and storage. A repair kit is also included for minor tears."},
        ],
    },
]

# Build the comparison (3 rows)
COMPARISON = [
    {"feature": "Material Quality", "inflatablemodel": "210D\u2013500D Oxford/Cordura nylon (commercial grade)", "budgetAlternative": "70D thin polyester (single-season)"},
    {"feature": "Print Durability", "inflatablemodel": "UV-resistant digital print, 3\u20135 yr fade resistance", "budgetAlternative": "Basic silk-screen, fades in 3\u20136 months"},
    {"feature": "Lead Time", "inflatablemodel": "3\u20136 weeks with 98% on-time delivery", "budgetAlternative": "6\u201316 weeks, frequent delays"},
]

# All categories
ALL_CATEGORIES = sorted(list(set(p["category"] for p in products_meta)))

def ts_string(s):
    """Escape a string for TypeScript."""
    return s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")

def ts_array(items):
    """Format a string array for TypeScript."""
    return "[" + ", ".join(f'"{ts_string(i)}"' for i in items) + "]"

def ts_specs(specs):
    lines = []
    for key, val in specs.items():
        if isinstance(val, list):
            lines.append(f'      {key}: {ts_array(val)},')
        else:
            lines.append(f'      {key}: "{ts_string(val)}",')
    return "\n".join(lines)

def ts_faqs(faqs):
    lines = []
    for faq in faqs:
        lines.append("      {")
        lines.append(f'        question: "{ts_string(faq["question"])}",')
        lines.append(f'        answer: "{ts_string(faq["answer"])}",')
        lines.append("      },")
    return "\n".join(lines)

def ts_comparison(comp):
    lines = []
    for row in comp:
        lines.append("    {")
        lines.append(f'      feature: "{ts_string(row["feature"])}",')
        lines.append(f'      inflatablemodel: "{ts_string(row["inflatablemodel"])}",')
        lines.append(f'      budgetAlternative: "{ts_string(row["budgetAlternative"])}",')
        lines.append("    },")
    return "\n".join(lines)

def ts_images(images):
    lines = []
    for img in images:
        lines.append(f'      "{ts_string(img)}",')
    return "\n".join(lines)

# Generate product objects
product_blocks = []
for meta in products_meta:
    slug = meta["slug"]
    images = image_map.get(slug, [])
    if not images:
        print(f"WARNING: No images found for slug '{slug}'")

    block = f'''  {{
    id: "{meta["id"]}",
    name: "{ts_string(meta["name"])}",
    slug: "{slug}",
    category: "{ts_string(meta["category"])}",
    description: "{ts_string(meta["description"])}",
    geoSummary: "{ts_string(meta["geoSummary"])}",
    longDescription: "{ts_string(meta["longDescription"])}",
    price: 0,
    isCustom: true,
    featured: {"true" if meta["featured"] else "false"},
    inStock: true,
    leadTime: "3-6 weeks",
    tags: {ts_array(meta["tags"])},
    images: [
{ts_images(images)}
    ],
    specs: {{
{ts_specs(meta["specs"])}
    }},
    comparison: [
{ts_comparison(COMPARISON)}
    ],
    faqs: [
{ts_faqs(meta["faqs"])}
    ],
  }}'''
    product_blocks.append(block)

# Category type
category_union = " | ".join(f'"{c}"' for c in ALL_CATEGORIES)

# Assemble the full file
header = f'''export interface ProductSpecs {{
  height?: string;
  width?: string;
  depth?: string;
  weight?: string;
  material?: string;
  printType?: string;
  turnaround?: string;
  includes?: string;
  power?: string;
  // Purchasing-decision fields
  sizeRange?: string;
  materialOptions?: string[];
  printing?: string[];
  blower?: string;
  voltageOptions?: string[];
  setupPeople?: string;
  setupTime?: string;
  indoorOutdoor?: string;
  anchoring?: string;
  packing?: string;
  productionTime?: string;
  tags?: string[];
  [key: string]: string | string[] | undefined;
}}

export interface ProductFAQ {{
  question: string;
  answer: string;
}}

export interface ComparisonRow {{
  feature: string;
  inflatablemodel: string;
  budgetAlternative: string;
}}

export interface Product {{
  id: string;
  name: string;
  slug: string;
  description: string;
  price?: number;
  category: ProductCategory;
  images: string[];
  specs: ProductSpecs;
  inStock: boolean;
  leadTime?: string;
  featured: boolean;
  isCustom: boolean;
  longDescription?: string;
  // GEO fields
  geoSummary?: string;
  faqs?: ProductFAQ[];
  comparison?: ComparisonRow[];
  tags?: string[];
}}

export type ProductCategory =
  | {" | ".join(f'"{c}"' for c in ALL_CATEGORIES)};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
{chr(10).join(f'  "{c}",' for c in ALL_CATEGORIES)}
];

// Legacy alias
export const CATEGORIES = PRODUCT_CATEGORIES;

export const SORT_OPTIONS = [
  {{ label: "Featured", value: "featured" }},
  {{ label: "Newest", value: "newest" }},
] as const;

export const LEAD_TIMES = [
  {{ label: "1-2 Weeks", value: "1-2" }},
  {{ label: "3-4 Weeks", value: "3-4" }},
  {{ label: "5-6 Weeks", value: "5-6" }},
  {{ label: "Custom", value: "custom" }},
] as const;

// Shared comparison data for all products (3 rows: material, print, lead time)
const STANDARD_COMPARISON: ComparisonRow[] = [
{ts_comparison(COMPARISON)}
];

export const products: Product[] = [
'''

footer = '''];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, count)
    .concat(
      products
        .filter(
          (p) =>
            p.id !== product.id &&
            p.category !== product.category
        )
        .slice(0, Math.max(0, count - products.filter((p) => p.id !== product.id && p.category === product.category).length))
    );
}
'''

full_content = header + ",\n".join(product_blocks) + ",\n" + footer

output_path = os.path.join(PROJ_DIR, "src", "lib", "data", "products.ts")
with open(output_path, "w", encoding="utf-8") as f:
    f.write(full_content)

# Stats
total_images = sum(len(image_map.get(p["slug"], [])) for p in products_meta)
print(f"Generated {output_path}")
print(f"Products: {len(products_meta)}")
print(f"Total images: {total_images}")
print(f"Categories: {len(ALL_CATEGORIES)}")
for p in products_meta:
    imgs = len(image_map.get(p["slug"], []))
    print(f"  {p['id']} {p['slug']}: {imgs} images, featured={p['featured']}")
