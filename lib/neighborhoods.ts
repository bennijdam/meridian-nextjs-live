/**
 * London sub-neighborhoods — granular search clusters nested inside boroughs.
 *
 * These pages target hyper-specific "[service] [neighborhood]" queries like
 * "seo agency hoxton" or "web design brick lane". Each entry is linked to a
 * parent borough (slug from lib/boroughs.ts) so cross-linking and breadcrumb
 * hierarchy stays intact.
 */

export type Neighborhood = {
  slug: string;
  name: string;
  borough: string; // matches a slug from lib/boroughs.ts
  postcodes: string[];
  description: string; // 1-2 sentences
  nearestStation: string;
  industries: string[];
};

export const NEIGHBORHOODS: Neighborhood[] = [
  // ===== Shoreditch (borough: shoreditch) =====
  { slug: 'hoxton', name: 'Hoxton', borough: 'shoreditch', postcodes: ['N1', 'EC2A'], description: "Hoxton Square is the creative backbone of Silicon Roundabout — a dense cluster of startups, design studios and independent hospitality.", nearestStation: 'Hoxton (Overground)', industries: ['Tech', 'Creative', 'Hospitality'] },
  { slug: 'old-street', name: 'Old Street', borough: 'shoreditch', postcodes: ['EC1V', 'EC1Y'], description: "Silicon Roundabout itself — the highest density of fintech, SaaS and venture offices in Europe.", nearestStation: 'Old Street', industries: ['Fintech', 'SaaS', 'Tech'] },
  { slug: 'brick-lane', name: 'Brick Lane', borough: 'shoreditch', postcodes: ['E1'], description: "Brick Lane combines independent retail, restaurants and a long-standing creative scene — a high-footfall East End commercial street.", nearestStation: 'Shoreditch High Street (Overground)', industries: ['Hospitality', 'Retail', 'Creative'] },
  { slug: 'spitalfields', name: 'Spitalfields', borough: 'shoreditch', postcodes: ['E1'], description: "Spitalfields Market anchors a weekend retail economy plus a growing weekday professional services cluster bordering the City.", nearestStation: 'Liverpool Street', industries: ['Retail', 'Professional services', 'Hospitality'] },
  { slug: 'liverpool-street', name: 'Liverpool Street', borough: 'shoreditch', postcodes: ['EC2M'], description: "Liverpool Street is the City-Shoreditch border — insurance, banks and trading desks meet startup offices in Broadgate.", nearestStation: 'Liverpool Street', industries: ['Banking', 'Insurance', 'B2B'] },

  // ===== Soho (borough: soho) =====
  { slug: 'golden-square', name: 'Golden Square', borough: 'soho', postcodes: ['W1F'], description: "Golden Square concentrates advertising, media and production companies around a listed Georgian garden square.", nearestStation: 'Piccadilly Circus', industries: ['Advertising', 'Media', 'Production'] },
  { slug: 'carnaby', name: 'Carnaby', borough: 'soho', postcodes: ['W1F'], description: "Carnaby Street is a pedestrianised retail spine — fashion, lifestyle, flagship DTC shops.", nearestStation: 'Oxford Circus', industries: ['Retail', 'Fashion', 'Hospitality'] },
  { slug: 'chinatown', name: 'Chinatown', borough: 'soho', postcodes: ['W1D'], description: "Chinatown has Soho's highest hospitality density — restaurants, bakeries, supermarkets, a saturated local search market.", nearestStation: 'Leicester Square', industries: ['Hospitality', 'Retail', 'Tourism'] },
  { slug: 'wardour-street', name: 'Wardour Street', borough: 'soho', postcodes: ['W1F', 'W1D'], description: "Wardour Street is Soho's production corridor — film post-production, ad agencies and the restaurants that feed them.", nearestStation: 'Tottenham Court Road', industries: ['Production', 'Advertising', 'Hospitality'] },

  // ===== Mayfair (borough: mayfair) =====
  { slug: 'bond-street', name: 'Bond Street', borough: 'mayfair', postcodes: ['W1S'], description: "Bond Street is the densest luxury retail strip in Europe — flagship stores, jewellery houses, auction rooms.", nearestStation: 'Bond Street', industries: ['Luxury retail', 'Fashion', 'Art'] },
  { slug: 'berkeley-square', name: 'Berkeley Square', borough: 'mayfair', postcodes: ['W1J'], description: "Berkeley Square is hedge fund and private equity HQ — discreet, high-AUM financial services.", nearestStation: 'Green Park', industries: ['Hedge funds', 'Private equity', 'Asset management'] },
  { slug: 'park-lane', name: 'Park Lane', borough: 'mayfair', postcodes: ['W1K'], description: "Park Lane hotels, luxury car showrooms and the embassy belt line Mayfair's Hyde Park edge.", nearestStation: 'Marble Arch', industries: ['Hospitality', 'Luxury retail', 'Tourism'] },
  { slug: 'grosvenor-square', name: 'Grosvenor Square', borough: 'mayfair', postcodes: ['W1K'], description: "Grosvenor Square is the Mayfair diplomatic and legal quarter — former US Embassy, Grosvenor Estate offices.", nearestStation: 'Bond Street', industries: ['Legal', 'Professional services', 'Private equity'] },

  // ===== Canary Wharf (borough: canary-wharf) =====
  { slug: 'west-india-quay', name: 'West India Quay', borough: 'canary-wharf', postcodes: ['E14'], description: "West India Quay's warehouse conversions house challenger banks, fintech offices and Wharf-side hospitality.", nearestStation: 'West India Quay (DLR)', industries: ['Fintech', 'Banking', 'Hospitality'] },
  { slug: 'south-quay', name: 'South Quay', borough: 'canary-wharf', postcodes: ['E14'], description: "South Quay's residential towers sit alongside scale-up fintech and consulting practices.", nearestStation: 'South Quay (DLR)', industries: ['Fintech', 'B2B', 'Property'] },
  { slug: 'canary-riverside', name: 'Canary Riverside', borough: 'canary-wharf', postcodes: ['E14'], description: "Canary Riverside covers the Wharf's north-west frontage — hotels, fine dining and waterside offices.", nearestStation: 'Canary Wharf', industries: ['Hospitality', 'Banking', 'Tourism'] },

  // ===== King's Cross (borough: kings-cross) =====
  { slug: 'knowledge-quarter', name: 'Knowledge Quarter', borough: 'kings-cross', postcodes: ['N1C', 'NW1'], description: "The Knowledge Quarter bundles the British Library, Crick Institute and dozens of research-led institutions.", nearestStation: "King's Cross St Pancras", industries: ['AI', 'Healthtech', 'Deeptech'] },
  { slug: 'granary-square', name: 'Granary Square', borough: 'kings-cross', postcodes: ['N1C'], description: "Granary Square is Google UK HQ and the Coal Drops Yard retail cluster.", nearestStation: "King's Cross St Pancras", industries: ['Tech', 'Retail', 'Hospitality'] },
  { slug: 'regents-quarter', name: "Regent's Quarter", borough: 'kings-cross', postcodes: ['N1'], description: "Regent's Quarter covers the south side of the station — media, design agencies, small tech studios.", nearestStation: "King's Cross St Pancras", industries: ['Media', 'Design', 'Tech'] },

  // ===== Camden (borough: camden) =====
  { slug: 'camden-town', name: 'Camden Town', borough: 'camden', postcodes: ['NW1'], description: "Camden Town's market and music venues drive one of North London's highest footfall economies.", nearestStation: 'Camden Town', industries: ['Retail', 'Music', 'Hospitality'] },
  { slug: 'primrose-hill', name: 'Primrose Hill', borough: 'camden', postcodes: ['NW1', 'NW3'], description: "Primrose Hill serves an affluent residential catchment with independent retail and restaurants.", nearestStation: 'Chalk Farm', industries: ['Hospitality', 'Retail', 'Property'] },
  { slug: 'chalk-farm', name: 'Chalk Farm', borough: 'camden', postcodes: ['NW1'], description: "Chalk Farm blends Roundhouse-driven music culture with studios and creative offices.", nearestStation: 'Chalk Farm', industries: ['Music', 'Creative', 'Hospitality'] },
  { slug: 'kentish-town', name: 'Kentish Town', borough: 'camden', postcodes: ['NW5'], description: "Kentish Town's high street supports independent hospitality, wellness and service businesses.", nearestStation: 'Kentish Town', industries: ['Hospitality', 'Wellness', 'Retail'] },

  // ===== Hackney (borough: hackney) =====
  { slug: 'dalston', name: 'Dalston', borough: 'hackney', postcodes: ['E8'], description: "Dalston's nightlife-led hospitality scene anchors one of London's most culturally dense high streets.", nearestStation: 'Dalston Junction (Overground)', industries: ['Hospitality', 'Music', 'Creative'] },
  { slug: 'shoreditch-high-street', name: 'Shoreditch High Street', borough: 'hackney', postcodes: ['E1', 'E2'], description: "Shoreditch High Street spans the Hackney-Tower Hamlets border — tech, DTC brands, restaurants.", nearestStation: 'Shoreditch High Street (Overground)', industries: ['Tech', 'E-commerce', 'Hospitality'] },
  { slug: 'stoke-newington', name: 'Stoke Newington', borough: 'hackney', postcodes: ['N16'], description: "Stoke Newington Church Street supports a concentrated independent retail and hospitality scene.", nearestStation: 'Stoke Newington', industries: ['Retail', 'Hospitality', 'Wellness'] },
  { slug: 'clapton', name: 'Clapton', borough: 'hackney', postcodes: ['E5'], description: "Clapton's emerging commercial strip serves a young professional catchment north of Hackney Central.", nearestStation: 'Clapton', industries: ['Hospitality', 'Creative', 'Retail'] },
  { slug: 'london-fields', name: 'London Fields', borough: 'hackney', postcodes: ['E8'], description: "London Fields and Broadway Market are Hackney's DTC and independent food retail heartland.", nearestStation: 'London Fields (Overground)', industries: ['E-commerce', 'Hospitality', 'Retail'] },

  // ===== Islington (borough: islington) =====
  { slug: 'angel', name: 'Angel', borough: 'islington', postcodes: ['N1'], description: "Angel's Upper Street south end concentrates restaurants, bars and tech offices around the station.", nearestStation: 'Angel', industries: ['Hospitality', 'Tech', 'Retail'] },
  { slug: 'upper-street', name: 'Upper Street', borough: 'islington', postcodes: ['N1'], description: "Upper Street is Islington's commercial spine — independent retail, restaurants, theatres, professional services.", nearestStation: 'Highbury & Islington', industries: ['Retail', 'Hospitality', 'Professional services'] },
  { slug: 'highbury', name: 'Highbury', borough: 'islington', postcodes: ['N5'], description: "Highbury supports a mix of lifestyle retail, wellness and professional services serving an affluent residential catchment.", nearestStation: 'Highbury & Islington', industries: ['Wellness', 'Professional services', 'Hospitality'] },
  { slug: 'archway', name: 'Archway', borough: 'islington', postcodes: ['N19'], description: "Archway's regenerated town centre supports healthcare, education and growing independent hospitality.", nearestStation: 'Archway', industries: ['Healthcare', 'Education', 'Hospitality'] },

  // ===== Fitzrovia (borough: fitzrovia) =====
  { slug: 'goodge-street', name: 'Goodge Street', borough: 'fitzrovia', postcodes: ['W1T'], description: "Goodge Street's media agencies and tech consultancies sit across Charlotte Street's restaurant scene.", nearestStation: 'Goodge Street', industries: ['Advertising', 'Media', 'Tech'] },
  { slug: 'warren-street', name: 'Warren Street', borough: 'fitzrovia', postcodes: ['W1T', 'NW1'], description: "Warren Street borders Euston and houses clinics, professional services and a growing consulting cluster.", nearestStation: 'Warren Street', industries: ['Healthcare', 'Professional services', 'Tech'] },
  { slug: 'great-portland-street', name: 'Great Portland Street', borough: 'fitzrovia', postcodes: ['W1W'], description: "Great Portland Street connects Fitzrovia to Marylebone — medical, broadcast and advertising businesses.", nearestStation: 'Great Portland Street', industries: ['Healthcare', 'Media', 'Advertising'] },

  // ===== Bloomsbury (borough: bloomsbury) =====
  { slug: 'russell-square', name: 'Russell Square', borough: 'bloomsbury', postcodes: ['WC1B', 'WC1N'], description: "Russell Square is UCL and SOAS territory — universities, academic publishers, museums.", nearestStation: 'Russell Square', industries: ['Education', 'Publishing', 'Cultural'] },
  { slug: 'holborn-east', name: 'Holborn East', borough: 'bloomsbury', postcodes: ['WC1V'], description: "East Bloomsbury borders Holborn's legal district and hosts law-adjacent professional services.", nearestStation: 'Holborn', industries: ['Legal', 'Professional services', 'Publishing'] },
  { slug: 'tottenham-court-road', name: 'Tottenham Court Road', borough: 'bloomsbury', postcodes: ['W1T', 'WC1A'], description: "Tottenham Court Road is central London's consumer electronics spine plus an Elizabeth-line-driven office market.", nearestStation: 'Tottenham Court Road', industries: ['Retail', 'Tech', 'Media'] },

  // ===== Notting Hill (borough: notting-hill) =====
  { slug: 'portobello', name: 'Portobello', borough: 'notting-hill', postcodes: ['W11'], description: "Portobello Road's market, antiques and independent retail drive weekend footfall across W11.", nearestStation: 'Notting Hill Gate', industries: ['Retail', 'Hospitality', 'Creative'] },
  { slug: 'ladbroke-grove', name: 'Ladbroke Grove', borough: 'notting-hill', postcodes: ['W10', 'W11'], description: "Ladbroke Grove combines studios, creative businesses and a strong independent hospitality scene.", nearestStation: 'Ladbroke Grove', industries: ['Creative', 'Hospitality', 'Retail'] },
  { slug: 'westbourne-grove', name: 'Westbourne Grove', borough: 'notting-hill', postcodes: ['W11', 'W2'], description: "Westbourne Grove is a premium lifestyle retail street serving Notting Hill's affluent residential catchment.", nearestStation: 'Royal Oak', industries: ['Retail', 'Hospitality', 'Wellness'] },

  // ===== Kensington (borough: kensington) =====
  { slug: 'south-kensington', name: 'South Kensington', borough: 'kensington', postcodes: ['SW7'], description: "South Kensington houses the V&A, Science Museum, Natural History Museum and Imperial College.", nearestStation: 'South Kensington', industries: ['Cultural', 'Education', 'Hospitality'] },
  { slug: 'high-street-ken', name: 'High Street Kensington', borough: 'kensington', postcodes: ['W8'], description: "Kensington High Street is a premium retail spine with flagships and professional services offices.", nearestStation: 'High Street Kensington', industries: ['Retail', 'Fashion', 'Professional services'] },
  { slug: 'earls-court', name: "Earl's Court", borough: 'kensington', postcodes: ['SW5'], description: "Earl's Court is a hospitality-led district with strong hotel, short-stay and restaurant concentration.", nearestStation: "Earl's Court", industries: ['Hospitality', 'Tourism', 'Property'] },

  // ===== Chelsea (borough: chelsea) =====
  { slug: 'sloane-square', name: 'Sloane Square', borough: 'chelsea', postcodes: ['SW1W', 'SW3'], description: "Sloane Square anchors Chelsea's luxury retail, restaurant and theatre scene.", nearestStation: 'Sloane Square', industries: ['Fashion', 'Hospitality', 'Retail'] },
  { slug: 'kings-road', name: "King's Road", borough: 'chelsea', postcodes: ['SW3', 'SW10'], description: "The King's Road is one of London's premier lifestyle retail strips with boutique and flagship stores.", nearestStation: 'Sloane Square', industries: ['Fashion', 'Retail', 'Beauty'] },
  { slug: 'chelsea-harbour', name: 'Chelsea Harbour', borough: 'chelsea', postcodes: ['SW10'], description: "Chelsea Harbour is a design-led mixed-use district with showrooms and riverside hospitality.", nearestStation: 'Imperial Wharf (Overground)', industries: ['Design', 'Hospitality', 'Property'] },

  // ===== Marylebone (borough: marylebone) =====
  { slug: 'baker-street', name: 'Baker Street', borough: 'marylebone', postcodes: ['NW1', 'W1U'], description: "Baker Street combines corporate HQs, clinics and a landmark tourist economy.", nearestStation: 'Baker Street', industries: ['Healthcare', 'Professional services', 'Tourism'] },
  { slug: 'wigmore-street', name: 'Wigmore Street', borough: 'marylebone', postcodes: ['W1U', 'W1G'], description: "Wigmore Street is the Harley Street medical belt's retail frontage — clinics, pharmacies, cafés.", nearestStation: 'Bond Street', industries: ['Healthcare', 'Retail', 'Professional services'] },
  { slug: 'manchester-square', name: 'Manchester Square', borough: 'marylebone', postcodes: ['W1U'], description: "Manchester Square covers the Wallace Collection area — cultural and high-end professional services.", nearestStation: 'Bond Street', industries: ['Cultural', 'Professional services', 'Luxury retail'] },

  // ===== Hammersmith (borough: hammersmith) =====
  { slug: 'ravenscourt-park', name: 'Ravenscourt Park', borough: 'hammersmith', postcodes: ['W6'], description: "Ravenscourt Park serves an affluent family catchment with local retail and professional services.", nearestStation: 'Ravenscourt Park', industries: ['Professional services', 'Healthcare', 'Retail'] },
  { slug: 'stamford-brook', name: 'Stamford Brook', borough: 'hammersmith', postcodes: ['W6', 'W4'], description: "Stamford Brook bridges Hammersmith and Chiswick — schools, clinics and local SME offices.", nearestStation: 'Stamford Brook', industries: ['Education', 'Healthcare', 'B2B'] },
  { slug: 'barons-court', name: "Baron's Court", borough: 'hammersmith', postcodes: ['W14'], description: "Baron's Court combines residential density with local hospitality and professional services.", nearestStation: "Baron's Court", industries: ['Hospitality', 'Property', 'Professional services'] },

  // ===== Clerkenwell (borough: clerkenwell) =====
  { slug: 'exmouth-market', name: 'Exmouth Market', borough: 'clerkenwell', postcodes: ['EC1R'], description: "Exmouth Market's independent hospitality and studios sit at the heart of London's design district.", nearestStation: 'Farringdon', industries: ['Hospitality', 'Design', 'Creative'] },
  { slug: 'smithfield', name: 'Smithfield', borough: 'clerkenwell', postcodes: ['EC1A'], description: "Smithfield's market district is regenerating around the new Museum of London and Elizabeth line access.", nearestStation: 'Farringdon', industries: ['Hospitality', 'Cultural', 'B2B'] },
  { slug: 'st-pauls', name: "St Paul's", borough: 'clerkenwell', postcodes: ['EC4M'], description: "St Paul's district borders the City — professional services, law, accountancy, hospitality.", nearestStation: "St Paul's", industries: ['Legal', 'Professional services', 'Hospitality'] },

  // ===== Farringdon (borough: farringdon) =====
  { slug: 'barbican', name: 'Barbican', borough: 'farringdon', postcodes: ['EC2Y'], description: "The Barbican anchors a concentrated cultural, legal and corporate office cluster.", nearestStation: 'Barbican', industries: ['Legal', 'Cultural', 'B2B'] },
  { slug: 'cripplegate', name: 'Cripplegate', borough: 'farringdon', postcodes: ['EC1Y', 'EC2Y'], description: "Cripplegate's City edge mixes law firms, insurance and emerging tech tenants.", nearestStation: 'Barbican', industries: ['Legal', 'Insurance', 'Tech'] },
  { slug: 'aldersgate', name: 'Aldersgate', borough: 'farringdon', postcodes: ['EC1A'], description: "Aldersgate serves the Museum of London area with professional services and hospitality.", nearestStation: 'Barbican', industries: ['Professional services', 'Cultural', 'Hospitality'] },

  // ===== Stratford (borough: stratford) =====
  { slug: 'westfield', name: 'Westfield Stratford', borough: 'stratford', postcodes: ['E20'], description: "Westfield Stratford is Europe's largest urban shopping centre — flagship retail, DTC pop-ups, hospitality.", nearestStation: 'Stratford', industries: ['Retail', 'E-commerce', 'Hospitality'] },
  { slug: 'olympic-park', name: 'Olympic Park', borough: 'stratford', postcodes: ['E20'], description: "Queen Elizabeth Olympic Park supports sport venues, BBC/V&A East Bank, and the Here East tech campus.", nearestStation: 'Stratford International', industries: ['Sport', 'Tech', 'Cultural'] },
  { slug: 'east-village', name: 'East Village', borough: 'stratford', postcodes: ['E20'], description: "East Village is a rapidly growing residential and commercial zone built on the Olympic athletes' village.", nearestStation: 'Stratford International', industries: ['Property', 'Hospitality', 'Retail'] },

  // ===== Greenwich (borough: greenwich) =====
  { slug: 'blackheath', name: 'Blackheath', borough: 'greenwich', postcodes: ['SE3'], description: "Blackheath village serves an affluent family catchment with independent retail and restaurants.", nearestStation: 'Blackheath', industries: ['Retail', 'Hospitality', 'Education'] },
  { slug: 'north-greenwich', name: 'North Greenwich', borough: 'greenwich', postcodes: ['SE10'], description: "North Greenwich is anchored by The O2 — entertainment, hospitality and tech tenants around the peninsula.", nearestStation: 'North Greenwich', industries: ['Hospitality', 'Tech', 'Tourism'] },
  { slug: 'greenwich-peninsula', name: 'Greenwich Peninsula', borough: 'greenwich', postcodes: ['SE10'], description: "Greenwich Peninsula is a regenerating waterfront mixed-use district with growing creative and tech tenants.", nearestStation: 'North Greenwich', industries: ['Tech', 'Creative', 'Property'] },

  // ===== Wimbledon (borough: wimbledon) =====
  { slug: 'wimbledon-park', name: 'Wimbledon Park', borough: 'wimbledon', postcodes: ['SW19'], description: "Wimbledon Park serves an affluent residential catchment bordering the All England Club.", nearestStation: 'Wimbledon Park', industries: ['Professional services', 'Property', 'Wellness'] },
  { slug: 'south-wimbledon', name: 'South Wimbledon', borough: 'wimbledon', postcodes: ['SW19'], description: "South Wimbledon supports independent retail, wellness and service businesses along Merton High Street.", nearestStation: 'South Wimbledon', industries: ['Retail', 'Wellness', 'Hospitality'] },
  { slug: 'raynes-park', name: 'Raynes Park', borough: 'wimbledon', postcodes: ['SW20'], description: "Raynes Park is a family-dense commuter hub with local retail, healthcare and professional services.", nearestStation: 'Raynes Park', industries: ['Healthcare', 'Professional services', 'Retail'] },

  // ===== Clapham (borough: clapham) =====
  { slug: 'clapham-common', name: 'Clapham Common', borough: 'clapham', postcodes: ['SW4'], description: "Clapham Common's restaurant and bar scene drives one of South London's highest hospitality densities.", nearestStation: 'Clapham Common', industries: ['Hospitality', 'Wellness', 'Retail'] },
  { slug: 'clapham-north', name: 'Clapham North', borough: 'clapham', postcodes: ['SW4'], description: "Clapham North blends residential density with a growing independent hospitality and service economy.", nearestStation: 'Clapham North', industries: ['Hospitality', 'Property', 'Wellness'] },
  { slug: 'clapham-junction', name: 'Clapham Junction', borough: 'clapham', postcodes: ['SW11'], description: "Clapham Junction is the UK's busiest station — a magnet for commuter-oriented retail and hospitality.", nearestStation: 'Clapham Junction', industries: ['Retail', 'Hospitality', 'Property'] },

  // ===== Brixton (borough: brixton) =====
  { slug: 'brixton-village', name: 'Brixton Village', borough: 'brixton', postcodes: ['SW9'], description: "Brixton Village is the cultural and culinary heart of SW9 — independent restaurants, music, retail.", nearestStation: 'Brixton', industries: ['Hospitality', 'Music', 'Retail'] },
  { slug: 'herne-hill', name: 'Herne Hill', borough: 'brixton', postcodes: ['SE24'], description: "Herne Hill supports a family-affluent catchment with strong independent retail and hospitality.", nearestStation: 'Herne Hill', industries: ['Hospitality', 'Retail', 'Wellness'] },
  { slug: 'streatham-hill', name: 'Streatham Hill', borough: 'brixton', postcodes: ['SW2'], description: "Streatham Hill is a growing South London high street with independent hospitality and service businesses.", nearestStation: 'Streatham Hill', industries: ['Hospitality', 'Retail', 'Property'] },

  // ===== Richmond (borough: richmond) =====
  { slug: 'richmond-park', name: 'Richmond Park', borough: 'richmond', postcodes: ['TW10'], description: "Richmond Park's surrounding streets serve one of London's most affluent catchments.", nearestStation: 'Richmond', industries: ['Professional services', 'Property', 'Hospitality'] },
  { slug: 'east-sheen', name: 'East Sheen', borough: 'richmond', postcodes: ['SW14'], description: "East Sheen's Upper Richmond Road supports local retail, professional services and hospitality.", nearestStation: 'Mortlake', industries: ['Retail', 'Professional services', 'Healthcare'] },
  { slug: 'north-sheen', name: 'North Sheen', borough: 'richmond', postcodes: ['TW9'], description: "North Sheen bridges Kew and Richmond with family-focused retail and local service businesses.", nearestStation: 'North Sheen', industries: ['Retail', 'Healthcare', 'Education'] },
];

export const ALL_NEIGHBORHOOD_SLUGS = NEIGHBORHOODS.map(n => n.slug);

export function getNeighborhood(slug: string): Neighborhood | undefined {
  return NEIGHBORHOODS.find(n => n.slug === slug);
}
