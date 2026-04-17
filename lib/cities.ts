/**
 * City expansion data layer.
 *
 * Powers programmatic generation of:
 *   - /[city]                       -> 4 hub pages
 *   - /[city]/[area]                -> ~49 area pages
 *   - /[city]/[area]/[service]      -> ~528 service x area pages
 *
 * Total: ~581 new SEO-optimised pages targeting "[service] [area], [city]"
 * long-tail keywords (KD typically 5-20 outside London).
 */

export type CityArea = {
  slug: string;
  name: string;
  postcodes: string[];
  hub: string;
  industries: string[];
  tagline: string;
  intro: string;
};

export type City = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  areas: CityArea[];
};

export const CITIES: City[] = [
  // ==================== MANCHESTER ====================
  {
    slug: 'manchester',
    name: 'Manchester',
    metaTitle: 'Digital Marketing Agency Manchester | SEO, PPC, Web & App | Meridian',
    metaDescription: 'Manchester digital marketing agency for SEO, PPC, web design, app development and social media. Free instant SEO audit. Trusted by 200+ UK brands.',
    intro: 'Manchester is the UK\'s second digital economy. From MediaCityUK to the Northern Quarter, we help Manchester businesses ship faster, rank higher and convert more.',
    areas: [
      { slug: 'city-centre', name: 'City Centre', postcodes: ['M1', 'M2', 'M3', 'M4'], hub: 'Business & commercial', industries: ['Fintech', 'SaaS', 'Professional services', 'Hospitality'], tagline: 'Manchester\'s commercial core', intro: 'Manchester City Centre is the beating heart of the Northern Powerhouse — home to major corporates, fast-growing SaaS companies and a thriving hospitality scene. We deliver digital that competes with London.' },
      { slug: 'ancoats', name: 'Ancoats', postcodes: ['M4', 'M11'], hub: 'Creative & hospitality', industries: ['Hospitality', 'Creative', 'Tech', 'E-commerce'], tagline: 'Manchester\'s coolest neighbourhood', intro: 'Ancoats has been transformed from cotton mills to coffee shops, restaurants and creative studios. We help Ancoats businesses build the digital presence their product deserves.' },
      { slug: 'northern-quarter', name: 'Northern Quarter', postcodes: ['M1', 'M4'], hub: 'Creative & indie', industries: ['Creative', 'Retail', 'Hospitality', 'Music'], tagline: 'Indie Manchester\'s HQ', intro: 'The Northern Quarter is Manchester\'s creative district — independent retailers, bars, music venues and design studios. We deliver digital marketing with the same point of view.' },
      { slug: 'deansgate', name: 'Deansgate', postcodes: ['M3', 'M15'], hub: 'Finance & professional', industries: ['Finance', 'Legal', 'Property', 'Professional services'], tagline: 'Manchester\'s professional spine', intro: 'Deansgate runs from the city centre to Castlefield, lined with law firms, financial services and professional services. We deliver the digital that fills their pipeline.' },
      { slug: 'salford-quays', name: 'Salford Quays', postcodes: ['M50', 'M5'], hub: 'Media & tech', industries: ['Media', 'Tech', 'Creative', 'B2B'], tagline: 'Where the BBC meets the tech scene', intro: 'Salford Quays has become Manchester\'s media and tech hub — home to the BBC, ITV, dock10 and a growing digital economy. We help businesses here compete nationally.' },
      { slug: 'media-city', name: 'MediaCityUK', postcodes: ['M50'], hub: 'Broadcast & digital', industries: ['Media', 'Broadcast', 'Tech', 'Creative'], tagline: 'UK broadcast and digital hub', intro: 'MediaCityUK is home to the BBC, ITV Studios, and hundreds of digital and creative businesses. We deliver performance marketing for the companies shaping UK media.' },
      { slug: 'didsbury', name: 'Didsbury', postcodes: ['M20'], hub: 'Affluent suburban', industries: ['Healthcare', 'Professional services', 'Hospitality', 'Education'], tagline: 'South Manchester\'s affluent hub', intro: 'Didsbury\'s affluent catchment supports a thriving local commercial base. We deliver hyper-local SEO, paid media and web design for Didsbury businesses.' },
      { slug: 'chorlton', name: 'Chorlton', postcodes: ['M21'], hub: 'Lifestyle & indie', industries: ['Hospitality', 'Retail', 'Wellness', 'Creative'], tagline: 'South Manchester\'s village vibe', intro: 'Chorlton\'s independent spirit and affluent family catchment make it one of Manchester\'s most interesting commercial zones. We help businesses here stand out.' },
      { slug: 'altrincham', name: 'Altrincham', postcodes: ['WA14', 'WA15'], hub: 'Market town & affluent', industries: ['Retail', 'Hospitality', 'Professional services', 'Property'], tagline: 'Greater Manchester\'s market town success', intro: 'Altrincham\'s market-led regeneration is a national model. We deliver digital marketing for the independent retailers, restaurants and professional services that make it work.' },
      { slug: 'stockport', name: 'Stockport', postcodes: ['SK1', 'SK2', 'SK3'], hub: 'Regeneration & SME', industries: ['Tech', 'B2B', 'Retail', 'Healthcare'], tagline: 'Greater Manchester\'s regeneration story', intro: 'Stockport\'s town-centre regeneration and growing SME base make it one of the most dynamic commercial zones in Greater Manchester. We deliver digital that matches the ambition.' },
      { slug: 'trafford-park', name: 'Trafford Park', postcodes: ['M17', 'M41'], hub: 'Industrial & e-commerce', industries: ['E-commerce', 'B2B', 'Logistics', 'Manufacturing'], tagline: 'Europe\'s largest industrial estate', intro: 'Trafford Park houses thousands of businesses from e-commerce fulfilment centres to advanced manufacturing. We deliver B2B and e-commerce digital marketing that drives revenue.' },
      { slug: 'spinningfields', name: 'Spinningfields', postcodes: ['M3'], hub: 'Financial & legal', industries: ['Finance', 'Legal', 'Professional services', 'Hospitality'], tagline: 'Manchester\'s financial district', intro: 'Spinningfields is Manchester\'s answer to Canary Wharf — home to Barclays, HSBC, DLA Piper and dozens of professional services firms. We deliver digital that fills their pipeline.' },
      { slug: 'castlefield', name: 'Castlefield', postcodes: ['M3', 'M15'], hub: 'Heritage & lifestyle', industries: ['Hospitality', 'Property', 'Creative', 'Tourism'], tagline: 'Manchester\'s heritage quarter', intro: 'Castlefield\'s canal-side setting combines heritage tourism with a growing lifestyle commercial base. We deliver digital that captures the local and visitor audience.' },
      { slug: 'moss-side', name: 'Moss Side', postcodes: ['M14', 'M16'], hub: 'Community & enterprise', industries: ['Retail', 'Hospitality', 'Healthcare', 'Education'], tagline: 'South Manchester community hub', intro: 'Moss Side\'s diverse community and growing enterprise base need digital marketing that works. We deliver practical, ROI-focused digital for local businesses.' },
      { slug: 'levenshulme', name: 'Levenshulme', postcodes: ['M19'], hub: 'Indie & community', industries: ['Hospitality', 'Retail', 'Creative', 'Wellness'], tagline: 'Manchester\'s up-and-coming indie quarter', intro: 'Levenshulme\'s independent market, growing restaurant scene and creative businesses are putting it on the map. We deliver digital that accelerates the momentum.' },
    ],
  },

  // ==================== EDINBURGH ====================
  {
    slug: 'edinburgh',
    name: 'Edinburgh',
    metaTitle: 'Digital Marketing Agency Edinburgh | SEO, PPC, Web & App | Meridian',
    metaDescription: 'Edinburgh digital marketing agency for SEO, PPC, web design, app development and social media. Free instant SEO audit. Trusted by 200+ UK brands.',
    intro: 'Edinburgh is Scotland\'s capital and a growing tech hub. From the Old Town to Leith, we help Edinburgh businesses dominate search and convert more customers.',
    areas: [
      { slug: 'old-town', name: 'Old Town', postcodes: ['EH1', 'EH8'], hub: 'Tourism & heritage', industries: ['Tourism', 'Hospitality', 'Cultural', 'Retail'], tagline: 'Edinburgh\'s historic heart', intro: 'Edinburgh\'s Old Town is a UNESCO World Heritage Site and Scotland\'s tourism epicentre. We deliver digital marketing for the hospitality, retail and cultural businesses that serve millions of visitors.' },
      { slug: 'new-town', name: 'New Town', postcodes: ['EH1', 'EH2', 'EH3'], hub: 'Finance & professional', industries: ['Finance', 'Legal', 'Professional services', 'Property'], tagline: 'Edinburgh\'s professional core', intro: 'Edinburgh\'s New Town is home to the city\'s financial services, legal firms and professional services. We deliver the digital programmes that generate qualified leads.' },
      { slug: 'leith', name: 'Leith', postcodes: ['EH6', 'EH7'], hub: 'Creative & tech', industries: ['Tech', 'Creative', 'Hospitality', 'E-commerce'], tagline: 'Edinburgh\'s creative waterfront', intro: 'Leith has transformed from working port to Edinburgh\'s creative and tech hub. Michelin-starred restaurants sit alongside startups and creative agencies. We deliver digital that matches the ambition.' },
      { slug: 'stockbridge', name: 'Stockbridge', postcodes: ['EH3', 'EH4'], hub: 'Affluent indie', industries: ['Retail', 'Hospitality', 'Professional services', 'Wellness'], tagline: 'Edinburgh\'s affluent village', intro: 'Stockbridge\'s affluent catchment supports independent retailers, restaurants and professional services. We deliver hyper-local SEO and digital marketing that converts.' },
      { slug: 'morningside', name: 'Morningside', postcodes: ['EH10'], hub: 'Affluent suburban', industries: ['Healthcare', 'Professional services', 'Retail', 'Education'], tagline: 'South Edinburgh\'s affluent hub', intro: 'Morningside\'s affluent family catchment supports a thriving local commercial base. We deliver digital that owns the local search results.' },
      { slug: 'haymarket', name: 'Haymarket', postcodes: ['EH12', 'EH3'], hub: 'Business & transport', industries: ['B2B', 'Hospitality', 'Professional services', 'Tech'], tagline: 'Edinburgh\'s west-end business hub', intro: 'Haymarket\'s position as Edinburgh\'s second main station makes it a natural business hub. Conference venues, hotels and office buildings need digital that delivers.' },
      { slug: 'grassmarket', name: 'Grassmarket', postcodes: ['EH1'], hub: 'Hospitality & tourism', industries: ['Hospitality', 'Tourism', 'Retail', 'Entertainment'], tagline: 'Edinburgh\'s hospitality quarter', intro: 'The Grassmarket is one of Edinburgh\'s most vibrant areas — packed with pubs, restaurants, boutiques and festival venues. We deliver digital that drives footfall.' },
      { slug: 'tollcross', name: 'Tollcross', postcodes: ['EH3'], hub: 'Lifestyle & student', industries: ['Hospitality', 'Retail', 'Education', 'Creative'], tagline: 'Central Edinburgh lifestyle hub', intro: 'Tollcross sits at the junction of Edinburgh\'s south side and city centre. A mix of independent businesses, students and residents make it commercially diverse.' },
      { slug: 'bruntsfield', name: 'Bruntsfield', postcodes: ['EH10'], hub: 'Independent retail', industries: ['Retail', 'Hospitality', 'Wellness', 'Professional services'], tagline: 'Edinburgh\'s indie high street', intro: 'Bruntsfield\'s independent shops, cafes and restaurants serve an affluent, discerning catchment. We deliver digital that matches the quality of the product.' },
      { slug: 'portobello', name: 'Portobello', postcodes: ['EH15'], hub: 'Seaside & family', industries: ['Hospitality', 'Retail', 'Property', 'Wellness'], tagline: 'Edinburgh\'s seaside quarter', intro: 'Portobello\'s beach, promenade and growing café culture make it Edinburgh\'s lifestyle destination. We deliver digital for the businesses capitalising on the revival.' },
      { slug: 'corstorphine', name: 'Corstorphine', postcodes: ['EH12'], hub: 'Suburban & business park', industries: ['B2B', 'Healthcare', 'Retail', 'Tech'], tagline: 'West Edinburgh business corridor', intro: 'Corstorphine\'s proximity to Edinburgh Airport and the Gyle business park makes it a major commercial zone. We deliver B2B and local digital marketing.' },
      { slug: 'south-queensferry', name: 'South Queensferry', postcodes: ['EH30'], hub: 'Tourism & community', industries: ['Tourism', 'Hospitality', 'Property', 'Retail'], tagline: 'Edinburgh\'s Forth Bridge gateway', intro: 'South Queensferry\'s stunning setting beneath the three Forth bridges draws visitors and supports a growing local economy. We deliver digital that captures both audiences.' },
    ],
  },

  // ==================== BIRMINGHAM ====================
  {
    slug: 'birmingham',
    name: 'Birmingham',
    metaTitle: 'Digital Marketing Agency Birmingham | SEO, PPC, Web & App | Meridian',
    metaDescription: 'Birmingham digital marketing agency for SEO, PPC, web design, app development and social media. Free instant SEO audit. Trusted by 200+ UK brands.',
    intro: 'Birmingham is the UK\'s second city and a powerhouse of industry, tech and culture. We help Birmingham businesses compete nationally with London-grade digital marketing.',
    areas: [
      { slug: 'city-centre', name: 'City Centre', postcodes: ['B1', 'B2', 'B3', 'B4', 'B5'], hub: 'Business & retail', industries: ['Finance', 'Retail', 'Professional services', 'Hospitality'], tagline: 'Birmingham\'s commercial core', intro: 'Birmingham City Centre is the Midlands\' commercial capital — home to major banks, Big Four firms, and a rapidly growing tech scene anchored by the HS2 development.' },
      { slug: 'digbeth', name: 'Digbeth', postcodes: ['B5', 'B9', 'B12'], hub: 'Creative & tech', industries: ['Creative', 'Tech', 'Music', 'Hospitality'], tagline: 'Birmingham\'s creative quarter', intro: 'Digbeth is Birmingham\'s answer to Shoreditch — an industrial area transformed into the city\'s creative and tech hub. Custard Factory, Fazeley Studios and a booming food scene.' },
      { slug: 'jewellery-quarter', name: 'Jewellery Quarter', postcodes: ['B1', 'B18'], hub: 'Creative & professional', industries: ['Creative', 'Professional services', 'Property', 'Hospitality'], tagline: 'Heritage meets modern business', intro: 'The Jewellery Quarter blends Birmingham\'s industrial heritage with a thriving modern business and hospitality scene. Independent studios, agencies and restaurants.' },
      { slug: 'edgbaston', name: 'Edgbaston', postcodes: ['B15', 'B16'], hub: 'Healthcare & education', industries: ['Healthcare', 'Education', 'Professional services', 'Property'], tagline: 'Birmingham\'s medical and academic hub', intro: 'Edgbaston houses the QE Hospital, University of Birmingham and the private healthcare cluster along Harborne Road. We deliver compliant, high-performing digital.' },
      { slug: 'moseley', name: 'Moseley', postcodes: ['B13'], hub: 'Indie & lifestyle', industries: ['Hospitality', 'Retail', 'Creative', 'Wellness'], tagline: 'Birmingham\'s village of the year', intro: 'Moseley\'s award-winning independent high street supports a vibrant mix of restaurants, bars, shops and creative businesses. We deliver digital that brings in customers.' },
      { slug: 'harborne', name: 'Harborne', postcodes: ['B17'], hub: 'Affluent suburban', industries: ['Professional services', 'Healthcare', 'Retail', 'Hospitality'], tagline: 'South Birmingham\'s affluent hub', intro: 'Harborne\'s affluent family catchment and thriving high street make it one of Birmingham\'s strongest local commercial markets. We deliver digital that converts.' },
      { slug: 'solihull', name: 'Solihull', postcodes: ['B90', 'B91', 'B92', 'B93'], hub: 'Business & affluent', industries: ['Automotive', 'B2B', 'Professional services', 'Retail'], tagline: 'West Midlands\' business park corridor', intro: 'Solihull is home to JLR, the NEC, Birmingham Airport and the UK\'s largest concentration of business parks. HS2 Interchange will accelerate growth further.' },
      { slug: 'sutton-coldfield', name: 'Sutton Coldfield', postcodes: ['B72', 'B73', 'B74', 'B75', 'B76'], hub: 'Affluent family', industries: ['Healthcare', 'Retail', 'Professional services', 'Education'], tagline: 'North Birmingham\'s affluent town', intro: 'Sutton Coldfield\'s affluent catchment, royal town status and strong local economy need digital marketing that matches the demographic. We deliver.' },
      { slug: 'kings-heath', name: 'Kings Heath', postcodes: ['B14'], hub: 'Indie & community', industries: ['Hospitality', 'Retail', 'Creative', 'Wellness'], tagline: 'South Birmingham indie quarter', intro: 'Kings Heath\'s independent businesses, thriving market and community spirit make it one of Birmingham\'s most characterful commercial districts. We deliver practical digital.' },
      { slug: 'selly-oak', name: 'Selly Oak', postcodes: ['B29'], hub: 'Student & healthcare', industries: ['Education', 'Healthcare', 'Retail', 'Hospitality'], tagline: 'University of Birmingham\'s neighbourhood', intro: 'Selly Oak\'s proximity to the University of Birmingham and QE Hospital creates a unique commercial mix. Student businesses, healthcare services and local retail.' },
      { slug: 'aston', name: 'Aston', postcodes: ['B6', 'B7'], hub: 'Enterprise & industry', industries: ['Manufacturing', 'B2B', 'Education', 'Retail'], tagline: 'Birmingham\'s enterprise zone', intro: 'Aston\'s mix of Aston University, industry and enterprise makes it one of Birmingham\'s most commercially diverse areas. We deliver digital for businesses of all sizes.' },
      { slug: 'erdington', name: 'Erdington', postcodes: ['B23', 'B24'], hub: 'Local commerce', industries: ['Retail', 'Healthcare', 'Hospitality', 'B2B'], tagline: 'North Birmingham commercial hub', intro: 'Erdington\'s high street and surrounding commercial zones serve a large north Birmingham catchment. We deliver hyper-local SEO and digital that drives footfall.' },
    ],
  },

  // ==================== BRISTOL ====================
  {
    slug: 'bristol',
    name: 'Bristol',
    metaTitle: 'Digital Marketing Agency Bristol | SEO, PPC, Web & App | Meridian',
    metaDescription: 'Bristol digital marketing agency for SEO, PPC, web design, app development and social media. Free instant SEO audit. Trusted by 200+ UK brands.',
    intro: 'Bristol is the South West\'s tech capital and one of the UK\'s most creative cities. We help Bristol businesses grow with London-grade digital marketing at 40% below market rate.',
    areas: [
      { slug: 'city-centre', name: 'City Centre', postcodes: ['BS1', 'BS2'], hub: 'Business & finance', industries: ['Finance', 'Professional services', 'Tech', 'Hospitality'], tagline: 'Bristol\'s commercial core', intro: 'Bristol City Centre is the South West\'s financial and professional services capital. From Temple Meads to the Broadmead, we deliver digital that drives revenue.' },
      { slug: 'clifton', name: 'Clifton', postcodes: ['BS8'], hub: 'Affluent & academic', industries: ['Education', 'Professional services', 'Hospitality', 'Property'], tagline: 'Bristol\'s premium neighbourhood', intro: 'Clifton combines the University of Bristol, Brunel\'s Suspension Bridge and some of the city\'s most affluent postcodes. We deliver digital that matches the prestige.' },
      { slug: 'stokes-croft', name: 'Stokes Croft', postcodes: ['BS1', 'BS2'], hub: 'Creative & indie', industries: ['Creative', 'Hospitality', 'Retail', 'Music'], tagline: 'Bristol\'s cultural quarter', intro: 'Stokes Croft is Bristol\'s creative heartland — street art, independent bars, music venues and design studios. Banksy territory. We deliver digital with the same independence.' },
      { slug: 'harbourside', name: 'Harbourside', postcodes: ['BS1'], hub: 'Leisure & business', industries: ['Hospitality', 'Tourism', 'Tech', 'Creative'], tagline: 'Bristol\'s waterfront destination', intro: 'Bristol Harbourside combines cultural institutions (Arnolfini, M Shed, We The Curious) with restaurants, bars and growing tech businesses. We deliver digital across the mix.' },
      { slug: 'redcliffe', name: 'Redcliffe', postcodes: ['BS1'], hub: 'Tech & professional', industries: ['Tech', 'Finance', 'Professional services', 'B2B'], tagline: 'Bristol\'s Temple Quarter tech hub', intro: 'Redcliffe and Temple Quarter are Bristol\'s fastest-growing business district — anchored by Temple Meads, Engine Shed and a booming tech scene. Enterprise Zone ambition.' },
      { slug: 'bedminster', name: 'Bedminster', postcodes: ['BS3'], hub: 'Creative & community', industries: ['Creative', 'Hospitality', 'Retail', 'Wellness'], tagline: 'South Bristol\'s rising star', intro: 'Bedminster\'s independent businesses, growing food scene and creative community are transforming south Bristol. We deliver digital that supports the growth.' },
      { slug: 'montpelier', name: 'Montpelier', postcodes: ['BS6'], hub: 'Indie & lifestyle', industries: ['Hospitality', 'Creative', 'Wellness', 'Retail'], tagline: 'Bristol\'s bohemian quarter', intro: 'Montpelier\'s colourful houses, independent cafes and bohemian spirit make it one of Bristol\'s most distinctive neighbourhoods. We deliver digital with character.' },
      { slug: 'easton', name: 'Easton', postcodes: ['BS5'], hub: 'Community & enterprise', industries: ['Hospitality', 'Retail', 'Creative', 'Wellness'], tagline: 'East Bristol\'s diverse heart', intro: 'Easton\'s diverse community, independent food scene and growing creative economy need digital marketing that works. We deliver practical, ROI-focused digital.' },
      { slug: 'southville', name: 'Southville', postcodes: ['BS3'], hub: 'Lifestyle & family', industries: ['Hospitality', 'Retail', 'Creative', 'Education'], tagline: 'North Street and beyond', intro: 'Southville\'s North Street is one of Bristol\'s strongest independent high streets. Restaurants, shops, studios and family businesses need digital that brings in customers.' },
      { slug: 'bishopston', name: 'Bishopston', postcodes: ['BS7'], hub: 'Affluent family', industries: ['Professional services', 'Retail', 'Healthcare', 'Education'], tagline: 'North Bristol\'s family hub', intro: 'Bishopston\'s affluent family catchment and Gloucester Road\'s mile-long independent high street create a strong local commercial market. We deliver digital that converts.' },
    ],
  },

  // ==================== LEEDS ====================
  {
    slug: 'leeds',
    name: 'Leeds',
    metaTitle: 'Digital Marketing Agency Leeds | SEO, PPC, Web Design | Meridian',
    metaDescription: 'Leeds digital marketing agency for SEO, PPC, web design, app development and social media. Free instant SEO audit. Trusted by 200+ UK brands.',
    intro: 'Leeds is Yorkshire\'s commercial capital and the UK\'s fastest-growing fintech and legal hub outside London. From the waterfront to Headingley, we help Leeds businesses rank higher, ship faster and convert more.',
    areas: [
      { slug: 'city-centre', name: 'City Centre', postcodes: ['LS1', 'LS2'], hub: 'Finance & legal', industries: ['Fintech', 'Legal', 'Professional services', 'Retail'], tagline: 'Leeds\' commercial core', intro: 'Leeds City Centre is home to the Leeds legal quarter, ITV\'s northern HQ, and one of the UK\'s fastest-growing fintech clusters. We deliver digital that competes with London on quality at Yorkshire prices.' },
      { slug: 'headingley', name: 'Headingley', postcodes: ['LS6'], hub: 'Student & lifestyle', industries: ['Hospitality', 'Retail', 'Education', 'Wellness'], tagline: 'Leeds\' student and sports heartland', intro: 'Headingley combines two universities, the iconic cricket ground and one of the most vibrant local high streets in the city. We deliver digital for the independents, hospitality venues and services that serve it.' },
      { slug: 'hyde-park', name: 'Hyde Park', postcodes: ['LS6'], hub: 'Student & community', industries: ['Hospitality', 'Retail', 'Education', 'Creative'], tagline: 'Leeds\' student village', intro: 'Hyde Park\'s student population drives a vibrant independent food, retail and nightlife scene. We deliver hyper-local digital for the businesses that serve it year-round.' },
      { slug: 'chapel-allerton', name: 'Chapel Allerton', postcodes: ['LS7'], hub: 'Indie & lifestyle', industries: ['Hospitality', 'Retail', 'Wellness', 'Creative'], tagline: 'North Leeds\' indie high street', intro: 'Chapel Allerton\'s independent restaurants, boutiques and bars serve an affluent, discerning catchment. We deliver digital that matches the quality of the product.' },
      { slug: 'roundhay', name: 'Roundhay', postcodes: ['LS8'], hub: 'Affluent suburban', industries: ['Professional services', 'Healthcare', 'Retail', 'Property'], tagline: 'North Leeds\' affluent hub', intro: 'Roundhay\'s park, affluent catchment and strong local high street make it one of Leeds\' most valuable local markets. We deliver digital that owns the local search results.' },
      { slug: 'kirkstall', name: 'Kirkstall', postcodes: ['LS5'], hub: 'Retail & community', industries: ['Retail', 'Hospitality', 'B2B', 'Wellness'], tagline: 'West Leeds commercial corridor', intro: 'Kirkstall\'s retail park, abbey heritage and growing residential base create a diverse commercial zone. We deliver digital that drives footfall and bookings.' },
      { slug: 'holbeck', name: 'Holbeck', postcodes: ['LS11'], hub: 'Tech & enterprise', industries: ['Tech', 'Creative', 'B2B', 'SaaS'], tagline: 'Leeds\' urban innovation district', intro: 'Holbeck Urban Village is Leeds\' tech and creative cluster — home to Platform, Futurelabs and a fast-growing startup scene. We deliver digital that helps them scale.' },
      { slug: 'beeston', name: 'Beeston', postcodes: ['LS11'], hub: 'Community & enterprise', industries: ['Retail', 'Healthcare', 'Hospitality', 'B2B'], tagline: 'South Leeds commercial hub', intro: 'Beeston\'s proximity to Elland Road and the M621 corridor makes it a strong local and regional commercial zone. We deliver practical, ROI-focused digital.' },
      { slug: 'horsforth', name: 'Horsforth', postcodes: ['LS18'], hub: 'Affluent suburban', industries: ['Professional services', 'Retail', 'Hospitality', 'Education'], tagline: 'North West Leeds\' market town', intro: 'Horsforth\'s strong high street, affluent catchment and growing professional services base make it a commercial success story. We deliver digital that converts.' },
      { slug: 'morley', name: 'Morley', postcodes: ['LS27'], hub: 'Market town & SME', industries: ['Retail', 'B2B', 'Manufacturing', 'Hospitality'], tagline: 'South Leeds market town', intro: 'Morley\'s town centre, business parks and strong SME base make it one of the most commercially diverse zones in the Leeds region. We deliver digital that drives revenue.' },
      { slug: 'pudsey', name: 'Pudsey', postcodes: ['LS28'], hub: 'Local commerce', industries: ['Retail', 'Professional services', 'Hospitality', 'B2B'], tagline: 'Between Leeds and Bradford', intro: 'Pudsey\'s position between Leeds and Bradford gives its businesses access to two major catchments. We deliver hyper-local SEO and paid media that works for both.' },
      { slug: 'wetherby', name: 'Wetherby', postcodes: ['LS22'], hub: 'Affluent market town', industries: ['Retail', 'Hospitality', 'Professional services', 'Property'], tagline: 'North Yorkshire\'s affluent gateway', intro: 'Wetherby\'s affluent catchment, market town high street and proximity to the A1(M) make it one of the strongest local commercial markets in West Yorkshire. We deliver premium digital.' },
    ],
  },

  // ==================== LIVERPOOL ====================
  {
    slug: 'liverpool',
    name: 'Liverpool',
    metaTitle: 'Digital Marketing Agency Liverpool | SEO, PPC, Web Design | Meridian',
    metaDescription: 'Liverpool digital marketing agency for SEO, PPC, web design, app development and social media. Free instant SEO audit. Trusted by 200+ UK brands.',
    intro: 'Liverpool is one of the UK\'s most creative cities, with a fast-growing tech scene and world-class cultural institutions. We help Liverpool businesses grow with London-grade digital marketing at Merseyside prices.',
    areas: [
      { slug: 'city-centre', name: 'City Centre', postcodes: ['L1', 'L2', 'L3'], hub: 'Business & retail', industries: ['Finance', 'Professional services', 'Retail', 'Hospitality'], tagline: 'Liverpool\'s commercial core', intro: 'Liverpool City Centre combines the commercial district, Liverpool ONE and the cultural quarter. We deliver digital for the corporates, retailers and professional services that power the city.' },
      { slug: 'baltic-triangle', name: 'Baltic Triangle', postcodes: ['L1', 'L8'], hub: 'Creative & tech', industries: ['Tech', 'Creative', 'Music', 'Hospitality'], tagline: 'Liverpool\'s digital quarter', intro: 'Liverpool\'s creative and digital quarter, packed with studios, agencies, and tech startups. From Camp & Furnace to Cains Brewery, we deliver digital that matches the ambition of the Baltic.' },
      { slug: 'ropewalks', name: 'Ropewalks', postcodes: ['L1'], hub: 'Hospitality & indie', industries: ['Hospitality', 'Retail', 'Creative', 'Music'], tagline: 'Liverpool\'s indie hospitality quarter', intro: 'Ropewalks is the heart of independent Liverpool — Bold Street, Duke Street and a dense cluster of restaurants, bars and boutiques. We deliver digital that drives bookings and footfall.' },
      { slug: 'georgian-quarter', name: 'Georgian Quarter', postcodes: ['L7', 'L8'], hub: 'Heritage & professional', industries: ['Professional services', 'Healthcare', 'Creative', 'Education'], tagline: 'Liverpool\'s elegant heart', intro: 'The Georgian Quarter\'s elegant terraces house professional services, healthcare practices and creative studios. We deliver digital that matches the quality of the architecture.' },
      { slug: 'knowledge-quarter', name: 'Knowledge Quarter', postcodes: ['L3', 'L7'], hub: 'Science & education', industries: ['Education', 'Healthcare', 'Biotech', 'Tech'], tagline: 'Liverpool\'s innovation district', intro: 'The Knowledge Quarter houses the University of Liverpool, LJMU, the Royal Hospital and a growing life sciences cluster. We deliver compliant, high-performing digital for science-led businesses.' },
      { slug: 'waterfront', name: 'Waterfront', postcodes: ['L3'], hub: 'Tourism & culture', industries: ['Tourism', 'Hospitality', 'Cultural', 'Property'], tagline: 'Liverpool\'s UNESCO waterfront', intro: 'The Liverpool waterfront — Albert Dock, Pier Head, Royal Liver Building — is one of the UK\'s most recognisable destinations. We deliver digital for the businesses serving millions of visitors a year.' },
      { slug: 'toxteth', name: 'Toxteth', postcodes: ['L8'], hub: 'Community & enterprise', industries: ['Hospitality', 'Creative', 'Retail', 'Wellness'], tagline: 'South Liverpool\'s cultural heart', intro: 'Toxteth\'s diverse community and growing independent food and creative scene need digital marketing that works. We deliver practical, ROI-focused digital.' },
      { slug: 'allerton', name: 'Allerton', postcodes: ['L18'], hub: 'Affluent suburban', industries: ['Professional services', 'Retail', 'Healthcare', 'Hospitality'], tagline: 'South Liverpool\'s affluent hub', intro: 'Allerton Road\'s strong high street and affluent south Liverpool catchment create a valuable local commercial market. We deliver digital that owns the local search results.' },
      { slug: 'woolton', name: 'Woolton', postcodes: ['L25'], hub: 'Affluent village', industries: ['Retail', 'Hospitality', 'Professional services', 'Wellness'], tagline: 'Liverpool\'s village high street', intro: 'Woolton village\'s affluent catchment and character high street support independent retailers, restaurants and professional services. We deliver digital that matches the demographic.' },
      { slug: 'crosby', name: 'Crosby', postcodes: ['L22', 'L23'], hub: 'Coastal & family', industries: ['Retail', 'Hospitality', 'Professional services', 'Property'], tagline: 'North Merseyside coastal town', intro: 'Crosby\'s beach, Antony Gormley\'s Another Place and a strong local high street make it one of Merseyside\'s most commercially distinctive areas. We deliver digital that captures local and visitor demand.' },
    ],
  },

  // ==================== GLASGOW ====================
  {
    slug: 'glasgow',
    name: 'Glasgow',
    metaTitle: 'Digital Marketing Agency Glasgow | SEO, PPC, Web Design | Meridian',
    metaDescription: 'Glasgow digital marketing agency for SEO, PPC, web design, app development and social media. Free instant SEO audit. Trusted by 200+ UK brands.',
    intro: 'Glasgow is Scotland\'s largest city and commercial capital. From the Merchant City to Finnieston, we help Glasgow businesses compete with Edinburgh and London on digital quality.',
    areas: [
      { slug: 'city-centre', name: 'City Centre', postcodes: ['G1', 'G2'], hub: 'Business & retail', industries: ['Finance', 'Retail', 'Professional services', 'Hospitality'], tagline: 'Glasgow\'s commercial core', intro: 'Glasgow City Centre is Scotland\'s largest retail destination and a major finance and professional services hub. We deliver digital for the banks, firms and brands that anchor the Style Mile.' },
      { slug: 'merchant-city', name: 'Merchant City', postcodes: ['G1'], hub: 'Lifestyle & creative', industries: ['Hospitality', 'Creative', 'Retail', 'Legal'], tagline: 'Glasgow\'s cultural quarter', intro: 'The Merchant City mixes legal firms, creative studios, restaurants and boutiques in one of Glasgow\'s most atmospheric quarters. We deliver digital with the same character.' },
      { slug: 'west-end', name: 'West End', postcodes: ['G11', 'G12'], hub: 'Academic & affluent', industries: ['Education', 'Hospitality', 'Retail', 'Professional services'], tagline: 'Glasgow\'s academic heartland', intro: 'The West End is home to the University of Glasgow, Kelvingrove, and a dense cluster of restaurants, bars and independent retailers. We deliver digital that converts an affluent, educated audience.' },
      { slug: 'east-end', name: 'East End', postcodes: ['G31', 'G40'], hub: 'Regeneration & enterprise', industries: ['Retail', 'B2B', 'Hospitality', 'Creative'], tagline: 'Glasgow\'s regeneration zone', intro: 'The East End\'s Commonwealth Games legacy, Barras Market and growing creative scene make it one of Glasgow\'s most dynamic commercial zones. We deliver digital that supports the growth.' },
      { slug: 'south-side', name: 'South Side', postcodes: ['G41', 'G42'], hub: 'Community & indie', industries: ['Hospitality', 'Retail', 'Professional services', 'Wellness'], tagline: 'Glasgow\'s diverse south', intro: 'Glasgow\'s South Side covers Shawlands, Pollokshields and Strathbungo — a diverse, food-loving, independently-minded catchment. We deliver digital that works across it.' },
      { slug: 'finnieston', name: 'Finnieston', postcodes: ['G3'], hub: 'Hospitality & creative', industries: ['Hospitality', 'Creative', 'Retail', 'Tech'], tagline: 'Glasgow\'s hippest postcode', intro: 'Finnieston has been named one of the UK\'s coolest neighbourhoods — packed with independent restaurants, bars and creative businesses. We deliver digital that matches the energy.' },
      { slug: 'partick', name: 'Partick', postcodes: ['G11'], hub: 'Community & retail', industries: ['Retail', 'Hospitality', 'Professional services', 'B2B'], tagline: 'West Glasgow commercial hub', intro: 'Partick combines a traditional high street, a major transport interchange and a growing residential base. We deliver digital that drives footfall and leads.' },
      { slug: 'dennistoun', name: 'Dennistoun', postcodes: ['G31'], hub: 'Indie & lifestyle', industries: ['Hospitality', 'Creative', 'Retail', 'Wellness'], tagline: 'East Glasgow\'s rising neighbourhood', intro: 'Dennistoun\'s independent cafes, bars and creative businesses have turned it into one of Glasgow\'s most talked-about neighbourhoods. We deliver digital that accelerates the momentum.' },
      { slug: 'shawlands', name: 'Shawlands', postcodes: ['G41'], hub: 'Affluent indie', industries: ['Hospitality', 'Retail', 'Wellness', 'Professional services'], tagline: 'South Side\'s indie high street', intro: 'Shawlands\' independent businesses, growing food scene and affluent catchment make it one of Glasgow\'s strongest local markets. We deliver digital that matches the quality of the product.' },
      { slug: 'govan', name: 'Govan', postcodes: ['G51'], hub: 'Heritage & enterprise', industries: ['Manufacturing', 'B2B', 'Healthcare', 'Creative'], tagline: 'Glasgow\'s shipbuilding heartland', intro: 'Govan\'s shipbuilding heritage sits alongside the Queen Elizabeth University Hospital and a growing enterprise base. We deliver digital for businesses driving the regeneration.' },
      { slug: 'hillhead', name: 'Hillhead', postcodes: ['G12'], hub: 'Student & academic', industries: ['Education', 'Hospitality', 'Retail', 'Creative'], tagline: 'West End student quarter', intro: 'Hillhead\'s proximity to the University of Glasgow drives a dense, year-round student economy. We deliver hyper-local digital that reaches them where they search.' },
      { slug: 'byres-road', name: 'Byres Road', postcodes: ['G12'], hub: 'Retail & hospitality', industries: ['Retail', 'Hospitality', 'Wellness', 'Creative'], tagline: 'The West End\'s main artery', intro: 'Byres Road is the West End\'s commercial spine — boutiques, restaurants, bars and cafes serving students, academics and affluent locals. We deliver digital that drives bookings and footfall.' },
    ],
  },

  // ==================== NEWCASTLE ====================
  {
    slug: 'newcastle',
    name: 'Newcastle',
    metaTitle: 'Digital Marketing Agency Newcastle | SEO, PPC, Web Design | Meridian',
    metaDescription: 'Newcastle digital marketing agency for SEO, PPC, web design, app development and social media. Free instant SEO audit. Trusted by 200+ UK brands.',
    intro: 'Newcastle is the North East\'s commercial capital and a fast-growing tech and fintech hub. From the Quayside to Gosforth, we help Newcastle businesses punch above their weight online.',
    areas: [
      { slug: 'city-centre', name: 'City Centre', postcodes: ['NE1'], hub: 'Business & retail', industries: ['Finance', 'Retail', 'Professional services', 'Hospitality'], tagline: 'Newcastle\'s commercial core', intro: 'Newcastle City Centre is the North East\'s retail and professional services capital. Grey Street, Eldon Square and a dense hospitality scene anchor a genuinely national city centre. We deliver digital that drives revenue.' },
      { slug: 'quayside', name: 'Quayside', postcodes: ['NE1'], hub: 'Tech & creative', industries: ['Tech', 'Creative', 'Hospitality', 'Tourism'], tagline: 'Newcastle\'s iconic waterfront', intro: 'The Newcastle Quayside — Tyne Bridge, BALTIC, Sage Gateshead — combines tourism, hospitality and a growing tech cluster at Newcastle Helix. We deliver digital across the mix.' },
      { slug: 'jesmond', name: 'Jesmond', postcodes: ['NE2'], hub: 'Affluent & student', industries: ['Hospitality', 'Retail', 'Education', 'Professional services'], tagline: 'Newcastle\'s premium neighbourhood', intro: 'Jesmond combines affluent professionals and a large student population — supporting one of the UK\'s most vibrant suburban high streets. We deliver digital that converts both audiences.' },
      { slug: 'gosforth', name: 'Gosforth', postcodes: ['NE3'], hub: 'Affluent suburban', industries: ['Professional services', 'Retail', 'Healthcare', 'Hospitality'], tagline: 'North Newcastle\'s affluent hub', intro: 'Gosforth High Street\'s strong independents, Regent Centre business park and affluent family catchment make it a valuable local commercial market. We deliver digital that owns local search.' },
      { slug: 'heaton', name: 'Heaton', postcodes: ['NE6'], hub: 'Community & indie', industries: ['Hospitality', 'Retail', 'Creative', 'Wellness'], tagline: 'East Newcastle\'s indie quarter', intro: 'Heaton\'s Chillingham Road and surrounding streets have become one of Newcastle\'s most interesting independent commercial zones. We deliver digital with the same independence.' },
      { slug: 'ouseburn', name: 'Ouseburn', postcodes: ['NE1', 'NE6'], hub: 'Creative & cultural', industries: ['Creative', 'Hospitality', 'Music', 'Retail'], tagline: 'Newcastle\'s cultural valley', intro: 'Ouseburn is Newcastle\'s creative quarter — studios, breweries, music venues and independent restaurants packed into a Victorian industrial valley. We deliver digital that matches the ambition.' },
      { slug: 'gateshead', name: 'Gateshead', postcodes: ['NE8'], hub: 'Business & regeneration', industries: ['B2B', 'Retail', 'Creative', 'Manufacturing'], tagline: 'South bank of the Tyne', intro: 'Gateshead\'s commercial base spans BALTIC, Sage, the Metrocentre and a large SME economy. We deliver digital for the businesses powering the Tyneside regeneration.' },
      { slug: 'sandyford', name: 'Sandyford', postcodes: ['NE2'], hub: 'Professional & healthcare', industries: ['Healthcare', 'Professional services', 'Education', 'B2B'], tagline: 'Newcastle\'s professional fringe', intro: 'Sandyford sits between the city centre and Jesmond, home to professional services, healthcare practices and the Northumbria University campus. We deliver digital that generates qualified leads.' },
    ],
  },

  // ==================== SHEFFIELD ====================
  {
    slug: 'sheffield',
    name: 'Sheffield',
    metaTitle: 'Digital Marketing Agency Sheffield | SEO, PPC, Web Design | Meridian',
    metaDescription: 'Sheffield digital marketing agency for SEO, PPC, web design, app development and social media. Free instant SEO audit. Trusted by 200+ UK brands.',
    intro: 'Sheffield combines a proud manufacturing heritage with a fast-growing tech and creative sector. From Kelham Island to Ecclesall Road, we help Sheffield businesses compete nationally.',
    areas: [
      { slug: 'city-centre', name: 'City Centre', postcodes: ['S1'], hub: 'Business & retail', industries: ['Professional services', 'Retail', 'Finance', 'Hospitality'], tagline: 'Sheffield\'s commercial core', intro: 'Sheffield City Centre\'s professional services, retail and growing digital sector anchor South Yorkshire\'s biggest economy. We deliver digital that competes at national level.' },
      { slug: 'kelham-island', name: 'Kelham Island', postcodes: ['S3'], hub: 'Creative & tech', industries: ['Tech', 'Creative', 'Hospitality', 'Manufacturing'], tagline: 'Sheffield\'s post-industrial star', intro: 'Kelham Island has gone from foundries to food halls — one of the UK\'s most acclaimed urban regeneration stories. Breweries, restaurants, tech startups and creative studios. We deliver digital that matches the transformation.' },
      { slug: 'ecclesall-road', name: 'Ecclesall Road', postcodes: ['S11'], hub: 'Affluent & hospitality', industries: ['Hospitality', 'Retail', 'Wellness', 'Professional services'], tagline: 'Sheffield\'s hospitality spine', intro: 'Ecclesall Road is Sheffield\'s strongest suburban high street — restaurants, bars, boutiques and professional services serving an affluent, discerning catchment. We deliver digital that converts.' },
      { slug: 'broomhill', name: 'Broomhill', postcodes: ['S10'], hub: 'Student & academic', industries: ['Education', 'Hospitality', 'Retail', 'Healthcare'], tagline: 'Sheffield\'s university village', intro: 'Broomhill\'s proximity to the University of Sheffield and a large student and academic population creates a unique commercial mix. We deliver digital for independents, healthcare and services.' },
      { slug: 'sharrow', name: 'Sharrow', postcodes: ['S7', 'S11'], hub: 'Indie & creative', industries: ['Hospitality', 'Creative', 'Retail', 'Wellness'], tagline: 'Sheffield\'s bohemian quarter', intro: 'Sharrow\'s independent food, creative businesses and Abbeydale Road high street make it one of Sheffield\'s most characterful commercial districts. We deliver digital with character to match.' },
      { slug: 'nether-edge', name: 'Nether Edge', postcodes: ['S7'], hub: 'Affluent village', industries: ['Hospitality', 'Retail', 'Professional services', 'Wellness'], tagline: 'Sheffield\'s village in the city', intro: 'Nether Edge\'s leafy streets, independent high street and affluent catchment support a strong local commercial base. We deliver digital that matches the demographic.' },
      { slug: 'hillsborough', name: 'Hillsborough', postcodes: ['S6'], hub: 'Community & retail', industries: ['Retail', 'Hospitality', 'Professional services', 'B2B'], tagline: 'North West Sheffield hub', intro: 'Hillsborough\'s town centre, stadium and strong residential catchment create a commercially dense zone. We deliver digital that drives footfall and local leads.' },
      { slug: 'meadowhall', name: 'Meadowhall', postcodes: ['S9'], hub: 'Retail & business', industries: ['Retail', 'B2B', 'Hospitality', 'Manufacturing'], tagline: 'Yorkshire\'s retail destination', intro: 'Meadowhall is one of the UK\'s biggest shopping destinations, surrounded by business parks and the Advanced Manufacturing Park. We deliver digital for consumer and B2B brands alike.' },
    ],
  },

  // ==================== NOTTINGHAM ====================
  {
    slug: 'nottingham',
    name: 'Nottingham',
    metaTitle: 'Digital Marketing Agency Nottingham | SEO, PPC, Web Design | Meridian',
    metaDescription: 'Nottingham digital marketing agency for SEO, PPC, web design, app development and social media. Free instant SEO audit. Trusted by 200+ UK brands.',
    intro: 'Nottingham is one of the UK\'s most creative cities with a strong legal, tech and gaming sector. From the Lace Market to West Bridgford, we help Nottingham businesses grow with London-grade digital at Midlands prices.',
    areas: [
      { slug: 'city-centre', name: 'City Centre', postcodes: ['NG1'], hub: 'Business & retail', industries: ['Retail', 'Professional services', 'Hospitality', 'Finance'], tagline: 'Nottingham\'s commercial core', intro: 'Nottingham City Centre\'s Old Market Square, intu Victoria Centre and growing professional services base make it the East Midlands\' commercial capital. We deliver digital that drives revenue.' },
      { slug: 'lace-market', name: 'Lace Market', postcodes: ['NG1'], hub: 'Creative & professional', industries: ['Creative', 'Legal', 'Tech', 'Hospitality'], tagline: 'Nottingham\'s heritage creative quarter', intro: 'The Lace Market\'s Victorian warehouses now house law firms, design studios, tech businesses and independent restaurants. We deliver digital that matches the quality of the quarter.' },
      { slug: 'hockley', name: 'Hockley', postcodes: ['NG1'], hub: 'Indie & lifestyle', industries: ['Hospitality', 'Retail', 'Creative', 'Music'], tagline: 'Nottingham\'s independent quarter', intro: 'Hockley is Nottingham\'s indie heartland — vintage stores, independent restaurants, bars and creative studios. We deliver digital that has the same point of view.' },
      { slug: 'park-estate', name: 'The Park', postcodes: ['NG7'], hub: 'Affluent & professional', industries: ['Professional services', 'Healthcare', 'Property', 'Finance'], tagline: 'Nottingham\'s prestigious private estate', intro: 'The Park Estate is Nottingham\'s most exclusive address — Victorian villas, professional services and healthcare practices. We deliver digital that matches the prestige.' },
      { slug: 'west-bridgford', name: 'West Bridgford', postcodes: ['NG2'], hub: 'Affluent suburban', industries: ['Hospitality', 'Retail', 'Professional services', 'Wellness'], tagline: 'Nottingham\'s premium suburb', intro: 'West Bridgford\'s Central Avenue, strong independents and affluent family catchment make it Nottingham\'s most valuable local commercial market. We deliver digital that owns local search.' },
      { slug: 'beeston', name: 'Beeston', postcodes: ['NG9'], hub: 'Student & suburban', industries: ['Education', 'Retail', 'Hospitality', 'Healthcare'], tagline: 'University town on the tram line', intro: 'Beeston\'s proximity to the University of Nottingham and growing high street create a distinctive commercial mix. We deliver digital for independents, services and student-facing brands.' },
      { slug: 'sherwood', name: 'Sherwood', postcodes: ['NG5'], hub: 'Local commerce', industries: ['Retail', 'Hospitality', 'Professional services', 'B2B'], tagline: 'North Nottingham commercial hub', intro: 'Sherwood\'s Mansfield Road high street serves a strong north Nottingham catchment. We deliver hyper-local SEO and paid media that drives footfall.' },
      { slug: 'mapperley', name: 'Mapperley', postcodes: ['NG3', 'NG5'], hub: 'Suburban & family', industries: ['Retail', 'Healthcare', 'Hospitality', 'Professional services'], tagline: 'North East Nottingham hub', intro: 'Mapperley\'s strong local high street and family catchment create a valuable suburban market. We deliver digital that brings in customers from the wider area.' },
    ],
  },

  // ==================== CARDIFF ====================
  {
    slug: 'cardiff',
    name: 'Cardiff',
    metaTitle: 'Digital Marketing Agency Cardiff | SEO, PPC, Web Design | Meridian',
    metaDescription: 'Cardiff digital marketing agency for SEO, PPC, web design, app development and social media. Free instant SEO audit. Trusted by 200+ UK brands.',
    intro: 'Cardiff is the Welsh capital and a growing media, tech and financial services hub. From Cardiff Bay to Pontcanna, we help Cardiff businesses grow with digital marketing that competes nationally.',
    areas: [
      { slug: 'city-centre', name: 'City Centre', postcodes: ['CF10'], hub: 'Business & retail', industries: ['Retail', 'Professional services', 'Finance', 'Hospitality'], tagline: 'Cardiff\'s commercial core', intro: 'Cardiff City Centre combines St David\'s, the castle and Wales\' largest professional services cluster. We deliver digital for the brands and firms that anchor the capital.' },
      { slug: 'cardiff-bay', name: 'Cardiff Bay', postcodes: ['CF10', 'CF11'], hub: 'Media & tourism', industries: ['Media', 'Tourism', 'Tech', 'Hospitality'], tagline: 'Cardiff\'s waterfront quarter', intro: 'Cardiff Bay is home to the Senedd, BBC Wales, Wales Millennium Centre and a major tourism and hospitality economy. We deliver digital across the media, tourism and tech mix.' },
      { slug: 'cathays', name: 'Cathays', postcodes: ['CF24'], hub: 'Student & academic', industries: ['Education', 'Hospitality', 'Retail', 'Creative'], tagline: 'Cardiff University\'s neighbourhood', intro: 'Cathays\' student density drives a dense, year-round hospitality and retail economy. We deliver hyper-local digital that reaches students and academics where they search.' },
      { slug: 'roath', name: 'Roath', postcodes: ['CF23', 'CF24'], hub: 'Indie & community', industries: ['Hospitality', 'Retail', 'Creative', 'Wellness'], tagline: 'Cardiff\'s diverse heart', intro: 'Roath\'s Albany Road, City Road and surrounding streets are among Cardiff\'s most independently-minded commercial zones. We deliver digital with character to match.' },
      { slug: 'canton', name: 'Canton', postcodes: ['CF5', 'CF11'], hub: 'Community & indie', industries: ['Hospitality', 'Retail', 'Creative', 'Professional services'], tagline: 'West Cardiff\'s rising quarter', intro: 'Canton\'s Cowbridge Road East has become one of Cardiff\'s strongest independent high streets. Restaurants, bars, boutiques and professional services. We deliver digital that drives footfall.' },
      { slug: 'pontcanna', name: 'Pontcanna', postcodes: ['CF11'], hub: 'Affluent & lifestyle', industries: ['Hospitality', 'Retail', 'Wellness', 'Media'], tagline: 'Cardiff\'s premium village', intro: 'Pontcanna combines leafy streets, Cardiff\'s media professionals and a strong independent food and retail scene. We deliver digital that matches the quality of the neighbourhood.' },
      { slug: 'penarth', name: 'Penarth', postcodes: ['CF64'], hub: 'Coastal & affluent', industries: ['Retail', 'Hospitality', 'Professional services', 'Property'], tagline: 'Cardiff\'s seaside suburb', intro: 'Penarth\'s Victorian pier, affluent catchment and strong town centre make it one of South Wales\' most valuable local markets. We deliver digital that captures both local and visitor demand.' },
      { slug: 'splott', name: 'Splott', postcodes: ['CF24'], hub: 'Enterprise & regeneration', industries: ['B2B', 'Manufacturing', 'Retail', 'Creative'], tagline: 'East Cardiff\'s enterprise zone', intro: 'Splott\'s mix of industry, enterprise and a growing residential base make it one of Cardiff\'s most dynamic regeneration zones. We deliver digital for B2B and local brands.' },
      { slug: 'llandaff', name: 'Llandaff', postcodes: ['CF5'], hub: 'Affluent & historic', industries: ['Professional services', 'Retail', 'Healthcare', 'Education'], tagline: 'Cardiff\'s cathedral village', intro: 'Llandaff\'s cathedral, BBC Wales campus and affluent village high street create a commercially distinctive neighbourhood. We deliver digital that matches the demographic.' },
      { slug: 'whitchurch', name: 'Whitchurch', postcodes: ['CF14'], hub: 'Suburban & family', industries: ['Retail', 'Healthcare', 'Professional services', 'Hospitality'], tagline: 'North Cardiff\'s family hub', intro: 'Whitchurch\'s strong high street and family catchment support a thriving local commercial base. We deliver hyper-local digital that owns the local search results.' },
    ],
  },

  // ==================== CAMBRIDGE ====================
  {
    slug: 'cambridge',
    name: 'Cambridge',
    metaTitle: 'Digital Marketing Agency Cambridge | SEO, PPC, Web Design | Meridian',
    metaDescription: 'Cambridge digital marketing agency for SEO, PPC, web design, app development and social media. Free instant SEO audit. Trusted by 200+ UK brands.',
    intro: 'Cambridge is home to the UK\'s most important deep-tech cluster — AI, biotech, quantum and medtech. We help Cambridge businesses turn world-class science into world-class digital growth.',
    areas: [
      { slug: 'city-centre', name: 'City Centre', postcodes: ['CB1', 'CB2'], hub: 'Academic & retail', industries: ['Education', 'Retail', 'Hospitality', 'Tourism'], tagline: 'Cambridge\'s historic core', intro: 'Cambridge City Centre combines the university colleges, the Grand Arcade and one of the UK\'s most visited tourist economies. We deliver digital for the retailers, hospitality venues and services that serve it.' },
      { slug: 'silicon-fen', name: 'Silicon Fen', postcodes: ['CB3', 'CB4'], hub: 'Deep tech & AI', industries: ['Tech', 'AI', 'Biotech', 'SaaS'], tagline: 'Britain\'s deep-tech corridor', intro: 'The beating heart of Britain\'s deep-tech corridor — AI, biotech, and quantum computing companies cluster here. We deliver digital that speaks the language of science-led B2B.' },
      { slug: 'trumpington', name: 'Trumpington', postcodes: ['CB2'], hub: 'Biomedical & residential', industries: ['Biotech', 'Healthcare', 'Property', 'Retail'], tagline: 'Cambridge Biomedical Campus gateway', intro: 'Trumpington\'s proximity to the Cambridge Biomedical Campus and AstraZeneca\'s global HQ makes it one of the UK\'s most valuable life sciences neighbourhoods. We deliver compliant, technical digital.' },
      { slug: 'cherry-hinton', name: 'Cherry Hinton', postcodes: ['CB1'], hub: 'Suburban & enterprise', industries: ['Retail', 'B2B', 'Healthcare', 'Education'], tagline: 'East Cambridge commercial hub', intro: 'Cherry Hinton\'s high street, proximity to the Cambridge Leisure Park and growing residential base create a valuable local market. We deliver digital that drives local leads.' },
      { slug: 'arbury', name: 'Arbury', postcodes: ['CB4'], hub: 'Community & retail', industries: ['Retail', 'Healthcare', 'Hospitality', 'B2B'], tagline: 'North Cambridge residential hub', intro: 'Arbury\'s strong residential catchment and local high street support a range of retail, healthcare and service businesses. We deliver hyper-local digital that works.' },
      { slug: 'chesterton', name: 'Chesterton', postcodes: ['CB4'], hub: 'Transport & enterprise', industries: ['B2B', 'Tech', 'Retail', 'Hospitality'], tagline: 'Cambridge North\'s growth corridor', intro: 'Chesterton\'s Cambridge North station and the Cambridge Business Park are anchoring one of the city\'s fastest-growing commercial zones. We deliver digital for the tech and B2B businesses driving it.' },
      { slug: 'romsey', name: 'Romsey', postcodes: ['CB1'], hub: 'Indie & community', industries: ['Hospitality', 'Retail', 'Creative', 'Wellness'], tagline: 'Cambridge\'s independent quarter', intro: 'Romsey\'s Mill Road is Cambridge\'s most diverse and independently-minded street — restaurants, specialist retailers, creative studios. We deliver digital with the same character.' },
      { slug: 'cambridge-science-park', name: 'Cambridge Science Park', postcodes: ['CB4'], hub: 'Science & tech', industries: ['Tech', 'Biotech', 'SaaS', 'AI'], tagline: 'Europe\'s oldest science park', intro: 'Cambridge Science Park, founded by Trinity College in 1970, is home to hundreds of the world\'s most innovative technology and life sciences companies. We deliver digital that matches the ambition.' },
    ],
  },

  // ==================== OXFORD ====================
  {
    slug: 'oxford',
    name: 'Oxford',
    metaTitle: 'Digital Marketing Agency Oxford | SEO, PPC, Web Design | Meridian',
    metaDescription: 'Oxford digital marketing agency for SEO, PPC, web design, app development and social media. Free instant SEO audit. Trusted by 200+ UK brands.',
    intro: 'Oxford combines a world-class academic ecosystem with a fast-growing science, healthcare and tech sector. From Jericho to the Science Park, we help Oxford businesses turn expertise into growth.',
    areas: [
      { slug: 'city-centre', name: 'City Centre', postcodes: ['OX1'], hub: 'Academic & retail', industries: ['Education', 'Retail', 'Tourism', 'Hospitality'], tagline: 'Oxford\'s historic core', intro: 'Oxford City Centre\'s colleges, Westgate shopping quarter and millions of annual visitors create a unique commercial mix. We deliver digital for the brands, retailers and services that compete here.' },
      { slug: 'jericho', name: 'Jericho', postcodes: ['OX1', 'OX2'], hub: 'Indie & lifestyle', industries: ['Hospitality', 'Retail', 'Creative', 'Wellness'], tagline: 'Oxford\'s bohemian quarter', intro: 'Jericho\'s independent restaurants, cafes, bookshops and boutiques make it one of Oxford\'s most characterful commercial zones. We deliver digital with the same independence.' },
      { slug: 'summertown', name: 'Summertown', postcodes: ['OX2'], hub: 'Affluent suburban', industries: ['Professional services', 'Retail', 'Healthcare', 'Hospitality'], tagline: 'North Oxford\'s affluent hub', intro: 'Summertown\'s strong high street, affluent catchment and professional services cluster make it one of Oxford\'s most valuable local markets. We deliver digital that converts.' },
      { slug: 'cowley', name: 'Cowley', postcodes: ['OX4'], hub: 'Enterprise & diverse', industries: ['Manufacturing', 'Retail', 'Hospitality', 'Creative'], tagline: 'East Oxford\'s commercial spine', intro: 'Cowley Road\'s diverse food scene, independent retail and proximity to the BMW Mini plant create one of Oxford\'s most commercially dynamic zones. We deliver digital that works across it.' },
      { slug: 'headington', name: 'Headington', postcodes: ['OX3'], hub: 'Healthcare & academic', industries: ['Healthcare', 'Education', 'Professional services', 'Biotech'], tagline: 'Oxford\'s hospital and research hub', intro: 'Headington houses the John Radcliffe, Churchill and Nuffield Orthopaedic hospitals plus Oxford Brookes University. One of the UK\'s densest healthcare and research clusters. We deliver compliant, high-performing digital.' },
      { slug: 'east-oxford', name: 'East Oxford', postcodes: ['OX4'], hub: 'Community & indie', industries: ['Hospitality', 'Retail', 'Creative', 'Wellness'], tagline: 'Oxford\'s diverse east', intro: 'East Oxford\'s diverse community, independent food scene and creative businesses need digital marketing that works. We deliver practical, ROI-focused digital.' },
      { slug: 'north-oxford', name: 'North Oxford', postcodes: ['OX2'], hub: 'Affluent & academic', industries: ['Professional services', 'Education', 'Healthcare', 'Property'], tagline: 'Oxford\'s most prestigious postcode', intro: 'North Oxford\'s Victorian villas, academic families and professional services cluster create one of the UK\'s most affluent suburban markets. We deliver digital that matches the demographic.' },
      { slug: 'science-park', name: 'Oxford Science Park', postcodes: ['OX4'], hub: 'Science & tech', industries: ['Tech', 'Biotech', 'AI', 'Healthcare'], tagline: 'Oxford\'s innovation campus', intro: 'Oxford Science Park is home to more than 100 high-growth science and technology companies, from quantum to therapeutics. We deliver digital that helps them reach technical buyers.' },
    ],
  },

  // ==================== BRIGHTON ====================
  {
    slug: 'brighton',
    name: 'Brighton',
    metaTitle: 'Digital Marketing Agency Brighton | SEO, PPC, Web Design | Meridian',
    metaDescription: 'Brighton digital marketing agency for SEO, PPC, web design, app development and social media. Free instant SEO audit. Trusted by 200+ UK brands.',
    intro: 'Brighton is the UK\'s original "Silicon Beach" — a creative, digital and lifestyle capital with more agencies per head than anywhere outside London. We help Brighton businesses scale with digital that matches the city\'s ambition.',
    areas: [
      { slug: 'city-centre', name: 'City Centre', postcodes: ['BN1'], hub: 'Retail & hospitality', industries: ['Retail', 'Hospitality', 'Tourism', 'Creative'], tagline: 'Brighton\'s commercial core', intro: 'Brighton City Centre combines the seafront, the Churchill Square retail quarter and a dense hospitality and tourism economy. We deliver digital for the brands that compete here year-round.' },
      { slug: 'kemptown', name: 'Kemptown', postcodes: ['BN2'], hub: 'Indie & community', industries: ['Hospitality', 'Retail', 'Creative', 'Wellness'], tagline: 'Brighton\'s indie east', intro: 'Kemptown\'s St James\'s Street and surrounding lanes are home to some of Brighton\'s most distinctive independents. We deliver digital with the same point of view.' },
      { slug: 'hove', name: 'Hove', postcodes: ['BN3'], hub: 'Affluent & professional', industries: ['Professional services', 'Retail', 'Healthcare', 'Hospitality'], tagline: 'Brighton\'s elegant west', intro: 'Hove\'s Regency terraces, Church Road high street and affluent catchment support a strong professional services and independent retail base. We deliver digital that matches the quality.' },
      { slug: 'north-laines', name: 'North Laine', postcodes: ['BN1'], hub: 'Indie retail & creative', industries: ['Retail', 'Creative', 'Hospitality', 'Music'], tagline: 'Brighton\'s bohemian shopping quarter', intro: 'The North Laine\'s independent boutiques, vintage stores, cafes and creative studios make it one of the UK\'s most distinctive shopping destinations. We deliver digital that drives footfall.' },
      { slug: 'the-lanes', name: 'The Lanes', postcodes: ['BN1'], hub: 'Retail & tourism', industries: ['Retail', 'Hospitality', 'Jewellery', 'Tourism'], tagline: 'Brighton\'s historic shopping maze', intro: 'The Lanes\' narrow alleyways pack Brighton\'s densest cluster of jewellers, boutiques and restaurants. We deliver digital that captures tourists, locals and the national destination audience.' },
      { slug: 'seven-dials', name: 'Seven Dials', postcodes: ['BN1'], hub: 'Lifestyle & hospitality', industries: ['Hospitality', 'Retail', 'Wellness', 'Professional services'], tagline: 'Brighton\'s village hub', intro: 'Seven Dials combines strong independents, affluent local residents and proximity to Brighton station. We deliver digital that converts both commuter and local audiences.' },
      { slug: 'preston-park', name: 'Preston Park', postcodes: ['BN1'], hub: 'Affluent suburban', industries: ['Professional services', 'Retail', 'Healthcare', 'Wellness'], tagline: 'North Brighton\'s family hub', intro: 'Preston Park\'s affluent family catchment and strong local services economy need digital marketing that matches. We deliver digital that owns local search and converts.' },
      { slug: 'hanover', name: 'Hanover', postcodes: ['BN2'], hub: 'Community & creative', industries: ['Hospitality', 'Creative', 'Wellness', 'Retail'], tagline: 'Brighton\'s creative village', intro: 'Hanover\'s colourful streets, creative community and neighbourhood pubs make it one of Brighton\'s most characterful postcodes. We deliver digital that matches the character.' },
      { slug: 'portslade', name: 'Portslade', postcodes: ['BN41'], hub: 'Enterprise & community', industries: ['B2B', 'Manufacturing', 'Retail', 'Hospitality'], tagline: 'West Brighton enterprise zone', intro: 'Portslade\'s industrial estates, port and growing residential catchment create one of Brighton & Hove\'s most commercially diverse zones. We deliver digital for B2B and local brands.' },
      { slug: 'fiveways', name: 'Fiveways', postcodes: ['BN1'], hub: 'Indie & family', industries: ['Hospitality', 'Retail', 'Wellness', 'Professional services'], tagline: 'North Brighton indie village', intro: 'Fiveways\' independent food, neighbourhood shops and affluent family catchment support a strong, character-led commercial base. We deliver digital that fits the neighbourhood.' },
    ],
  },
];

// ==================== EXPORTS & HELPERS ====================

export const ALL_CITY_SLUGS = CITIES.map(c => c.slug);

/** Get all area slugs for a given city */
export function getCityAreaSlugs(citySlug: string): string[] {
  const city = CITIES.find(c => c.slug === citySlug);
  return city ? city.areas.map(a => a.slug) : [];
}

/** Get all areas across all cities (for sitemap generation) */
export function getAllCityAreas(): Array<{ citySlug: string; areaSlug: string }> {
  const results: Array<{ citySlug: string; areaSlug: string }> = [];
  for (const city of CITIES) {
    for (const area of city.areas) {
      results.push({ citySlug: city.slug, areaSlug: area.slug });
    }
  }
  return results;
}

export function getCity(slug: string): City | undefined {
  return CITIES.find(c => c.slug === slug);
}

export function getCityArea(citySlug: string, areaSlug: string): CityArea | undefined {
  const city = getCity(citySlug);
  if (!city) return undefined;
  return city.areas.find(a => a.slug === areaSlug);
}
