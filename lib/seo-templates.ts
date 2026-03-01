import { type Part, getPartType } from './parts-types';

interface SEOContent {
  description: string;
  faq: { question: string; answer: string }[];
}

const typeDescriptions: Record<string, string[]> = {
  bushing: [
    "This precision-machined bushing is a critical wear component in the Sandvik {model} drilling system. Bushings reduce friction between rotating and stationary parts, significantly extending the service life of the entire {group} assembly. Regular inspection and timely replacement of worn bushings prevents costly damage to mating components and reduces unplanned downtime in mining operations.",
    "Engineered for the demanding conditions of the Sandvik {model}, this bushing provides essential support and alignment for rotating shafts and moving components within the {group}. Manufactured to OEM specifications, it ensures precise fit and optimal load distribution throughout its operational life.",
    "A vital component in the {group} of the Sandvik {model}, this bushing acts as a sacrificial wear element designed to protect more expensive surrounding components. Its precise dimensional tolerances ensure smooth operation and minimal vibration during drilling operations.",
  ],
  bearing: [
    "Engineered to withstand the extreme loads and vibrations encountered in drilling operations, this bearing maintains precise alignment of rotating components in the Sandvik {model}. As part of the {group}, proper bearing maintenance is essential for optimal drill performance and reduced machine downtime.",
    "This high-performance bearing is designed for the Sandvik {model} and serves a critical role in the {group}. It supports rotating elements under heavy axial and radial loads typical in underground and surface drilling applications, ensuring smooth and reliable machine operation.",
    "Precision-manufactured for the Sandvik {model}, this bearing component in the {group} provides reliable rotational support even under the harsh vibration and impact conditions of rock drilling. Timely replacement prevents cascading damage to adjacent drivetrain components.",
  ],
  seal: [
    "This sealing component prevents hydraulic fluid leakage and contamination ingress in the Sandvik {model} hydraulic system. Located within the {group}, compromised seals lead to reduced drilling pressure, increased oil consumption, and potential damage to hydraulic pumps and valves.",
    "Critical for maintaining system pressure integrity in the Sandvik {model}, this seal is part of the {group} and provides a reliable barrier against fluid loss and external contamination. Regular seal replacement is a cost-effective maintenance practice that prevents major hydraulic system failures.",
    "Designed specifically for the Sandvik {model} {group}, this seal ensures leak-free operation of hydraulic circuits. Mining environments expose seals to extreme temperatures, pressure spikes, and abrasive particles, making periodic replacement essential for uninterrupted drilling operations.",
  ],
  oring: [
    "This O-ring provides critical sealing in the hydraulic or pneumatic circuits of the Sandvik {model}. Part of the {group}, it prevents fluid leakage at connection points and maintains system pressure integrity essential for efficient drilling operations.",
    "A precision-molded sealing element for the Sandvik {model}, this O-ring is used in the {group} to create a reliable static or dynamic seal. Even minor O-ring deterioration can lead to system pressure loss, so scheduled replacement during routine maintenance is strongly recommended.",
  ],
  piston: [
    "A critical hydraulic component in the Sandvik {model} percussion mechanism, this piston converts hydraulic pressure into the powerful impact force needed for rock breaking. Located in the {group}, worn pistons cause reduced penetration rate, increased energy consumption, and decreased overall drilling efficiency.",
    "This piston is a key element of the {group} in the Sandvik {model}. It operates under extreme cyclic loading and high-pressure hydraulic conditions. Maintaining OEM-specification pistons ensures optimal percussion energy transfer and maximizes rock-breaking performance.",
  ],
  shaft: [
    "This shaft transmits rotational force within the {group} of the Sandvik {model}. Precision-ground to tight tolerances, it ensures smooth power delivery and minimal vibration during drilling operations. Shaft wear can lead to misalignment and accelerated wear of connected bearings and gears.",
    "An essential drivetrain component in the Sandvik {model}, this shaft serves the {group} by reliably transferring torque and rotational motion. Manufactured from high-strength alloy steel, it withstands the continuous mechanical stress of mining and drilling applications.",
  ],
  fastener: [
    "This fastener is used in the {group} of the Sandvik {model}. High-strength fasteners in drilling equipment must withstand extreme vibration, cyclic loading, and environmental exposure. Using OEM-specification fasteners ensures proper clamping force and joint integrity in critical assemblies.",
    "Designed for the demanding environment of the Sandvik {model}, this fastening component secures critical elements within the {group}. Mining equipment fasteners are subject to strict torque specifications and material requirements to maintain structural safety during operation.",
  ],
  cylinder: [
    "This hydraulic cylinder is a core actuator component in the Sandvik {model}, operating within the {group}. It converts hydraulic fluid pressure into linear mechanical force for positioning, clamping, or feed operations essential to the drilling process.",
    "Engineered for the Sandvik {model}, this cylinder is part of the {group} and provides precise hydraulic actuation under the heavy loads and harsh conditions of mining operations. Cylinder rebuild or replacement restores full force output and positional accuracy.",
  ],
  plate: [
    "This plate component serves a structural or protective function in the {group} of the Sandvik {model}. Plates in drilling equipment must resist wear, impact, and environmental corrosion while maintaining dimensional accuracy for proper assembly alignment.",
    "Part of the {group} in the Sandvik {model}, this plate provides essential mounting, wear protection, or structural support. Regular inspection for wear, cracking, or deformation helps prevent unexpected equipment failure during drilling operations.",
  ],
  motor: [
    "This motor is a primary drive component in the Sandvik {model}, powering elements within the {group}. Whether hydraulic or electric, motor performance directly impacts drilling speed, torque output, and overall machine productivity in mining applications.",
    "A critical power source within the {group} of the Sandvik {model}, this motor converts energy into mechanical motion for drilling operations. Proper motor maintenance, including regular fluid changes and seal inspection, ensures maximum equipment uptime and efficiency.",
  ],
  valve: [
    "This valve controls fluid flow and pressure within the hydraulic or pneumatic system of the Sandvik {model}. Part of the {group}, it ensures precise regulation of drilling parameters including feed force, percussion frequency, and rotation speed.",
  ],
  pump: [
    "This pump is a critical hydraulic component in the Sandvik {model}, providing the pressurized fluid flow required by the {group}. Pump efficiency directly affects drilling speed and energy consumption, making timely replacement of worn pumps essential for cost-effective operations.",
  ],
  filter: [
    "This filter protects the hydraulic and lubrication systems of the Sandvik {model} by removing contaminants from fluid circuits. As part of the {group}, clean filtration extends the life of pumps, valves, and cylinders throughout the machine.",
  ],
  component: [
    "This component is part of the {group} assembly in the Sandvik {model}. Maintaining OEM-compatible replacement parts ensures reliable machine performance and minimizes downtime in demanding mining and drilling operations.",
    "An essential element of the {group} in the Sandvik {model}, this part is designed to meet the exacting standards required for underground and surface drilling equipment. Timely replacement prevents costly cascading failures in critical machine systems.",
  ],
};

const typeFAQs: Record<string, { question: string; answer: string }[]> = {
  bushing: [
    { question: "What does a bushing do in a drilling machine?", answer: "A bushing acts as a wear-resistant liner that reduces friction between moving and stationary parts. It protects more expensive components from direct contact wear, extends service intervals, and maintains precise alignment of rotating elements in drilling equipment." },
    { question: "How often should bushings be replaced?", answer: "Bushing replacement intervals depend on operating conditions, but typical mining applications require inspection every 500-1000 operating hours. Signs of wear include increased play or vibration, unusual noise, and visible scoring or deformation of the bushing surface." },
  ],
  bearing: [
    { question: "Why are bearings critical in drilling equipment?", answer: "Bearings support rotating shafts and components under extreme loads and vibrations. Failed bearings can cause catastrophic damage to gearboxes, drive trains, and drilling mechanisms, leading to extended downtime and costly repairs." },
    { question: "What causes premature bearing failure in mining equipment?", answer: "Common causes include contamination from dust and water ingress, misalignment during installation, excessive loads, inadequate lubrication, and operating beyond rated temperature ranges. Proper sealing and regular lubrication schedules are essential preventive measures." },
  ],
  seal: [
    { question: "What happens when a hydraulic seal fails?", answer: "A failed hydraulic seal causes fluid leakage, leading to reduced system pressure, loss of machine force and speed, increased oil consumption, environmental contamination, and potential damage to pumps and valves operating without adequate fluid supply." },
    { question: "How can I identify worn seals in my drilling equipment?", answer: "Signs of seal wear include visible fluid leaks around cylinders and connections, reduced hydraulic system pressure, slower machine movements, increased oil consumption, and contaminated hydraulic fluid appearing milky or discolored." },
  ],
  oring: [
    { question: "Why do O-rings fail in drilling equipment?", answer: "O-rings fail due to chemical degradation from hydraulic fluid, extreme temperature cycling, excessive pressure spikes, improper installation (twisting or pinching), and age-related hardening. Using the correct material compound for each application is critical." },
  ],
  piston: [
    { question: "How does a worn piston affect drilling performance?", answer: "A worn piston reduces percussion energy transfer, decreasing penetration rate and increasing the time and energy required to drill each hole. This directly impacts productivity and operating costs in mining operations." },
  ],
  shaft: [
    { question: "What are signs of shaft wear in drilling machines?", answer: "Symptoms include increased vibration during operation, unusual noise from the drivetrain, visible wear marks or scoring on shaft surfaces, and difficulty maintaining proper alignment of connected components." },
  ],
  cylinder: [
    { question: "When should a hydraulic cylinder be rebuilt or replaced?", answer: "Rebuild or replace when you observe fluid leakage past seals, reduced force output, sluggish or inconsistent movement, visible scoring on the cylinder rod, or when the machine cannot maintain required feed pressure during drilling." },
  ],
  component: [
    { question: "Why use OEM-compatible parts for Sandvik drilling equipment?", answer: "OEM-compatible parts are manufactured to the same dimensional tolerances and material specifications as original components, ensuring proper fit, reliable performance, and maintaining the designed safety margins of the drilling machine." },
  ],
};

export function generateSEOContent(part: Part): SEOContent {
  const partType = getPartType(part.name);
  const descriptions = typeDescriptions[partType] || typeDescriptions.component;

  // Use part code hash to select a consistent but varied template
  const codeNum = parseInt(part.code.replace(/\D/g, '').slice(0, 6)) || 0;
  const templateIndex = codeNum % descriptions.length;
  const template = descriptions[templateIndex];

  const description = template
    .replace(/\{model\}/g, part.model)
    .replace(/\{group\}/g, part.group);

  const faqs = typeFAQs[partType] || typeFAQs.component;

  return { description, faq: faqs };
}

export function generateMetaTitle(part: Part): string {
  return `${part.codeFormatted} ${part.name} - Sandvik ${part.model} Spare Part`;
}

export function generateMetaDescription(part: Part): string {
  return `Buy Sandvik ${part.codeFormatted} ${part.name} for ${part.model}. OEM compatible aftermarket spare part for drilling machines. Fast worldwide shipping. Request a quote from BK Drilling.`;
}
