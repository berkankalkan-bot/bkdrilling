// Mock data - Gerçek projede backend/database'den gelecek
export const allProducts = [
  // Atlas Copco - COP Serisi
  { id: 1, name: "COP 1032HD Piston Kit", brand: "Atlas Copco", model: "COP 1032HD", category: "Rock Drills", partNumber: "AC-1032-001", price: 850 },
  { id: 2, name: "COP 1032HD Front Head", brand: "Atlas Copco", model: "COP 1032HD", category: "Rock Drills", partNumber: "AC-1032-002", price: 1200 },
  { id: 3, name: "COP 1132 Cylinder", brand: "Atlas Copco", model: "COP 1132", category: "Rock Drills", partNumber: "AC-1132-003", price: 950 },
  { id: 4, name: "COP 1238 Chuck Bushing", brand: "Atlas Copco", model: "COP 1238", category: "Rock Drills", partNumber: "AC-1238-004", price: 350 },
  { id: 5, name: "COP 1238HE Valve", brand: "Atlas Copco", model: "COP 1238HE", category: "Rock Drills", partNumber: "AC-1238HE-005", price: 420 },
  
  // Atlas Copco - ROC Serisi
  { id: 6, name: "ROC D7 Feed Beam", brand: "Atlas Copco", model: "ROC D7", category: "Surface Drill Rigs", partNumber: "AC-D7-010", price: 3200 },
  { id: 7, name: "ROC L8 Hydraulic Motor", brand: "Atlas Copco", model: "ROC L8", category: "Surface Drill Rigs", partNumber: "AC-L8-011", price: 2850 },
  { id: 8, name: "ROC 442 Drill String", brand: "Atlas Copco", model: "ROC 442", category: "Surface Drill Rigs", partNumber: "AC-442-012", price: 1950 },
  { id: 9, name: "ROC F7 Rotation Unit", brand: "Atlas Copco", model: "ROC F7", category: "Surface Drill Rigs", partNumber: "AC-F7-013", price: 2100 },
  
  // Sandvik - HL Serisi
  { id: 10, name: "HL1000 Drill Bit Adapter", brand: "Sandvik", model: "HL1000", category: "Rock Drills", partNumber: "SV-1000-020", price: 680 },
  { id: 11, name: "HL1060T Seal Kit", brand: "Sandvik", model: "HL1060T", category: "Rock Drills", partNumber: "SV-1060T-021", price: 290 },
  { id: 12, name: "HL1500 Backhead", brand: "Sandvik", model: "HL1500", category: "Rock Drills", partNumber: "SV-1500-022", price: 1150 },
  { id: 13, name: "HL510 O-Ring Set", brand: "Sandvik", model: "HL510", category: "Rock Drills", partNumber: "SV-510-023", price: 85 },
  { id: 14, name: "HL700 Chuck", brand: "Sandvik", model: "HL700", category: "Rock Drills", partNumber: "SV-700-024", price: 520 },
  
  // Sandvik - Ranger Serisi
  { id: 15, name: "RANGER 500 Feed Motor", brand: "Sandvik", model: "RANGER 500", category: "Surface Drill Rigs", partNumber: "SV-R500-030", price: 2650 },
  { id: 16, name: "RANGER 700 Damper", brand: "Sandvik", model: "RANGER 700", category: "Surface Drill Rigs", partNumber: "SV-R700-031", price: 890 },
  { id: 17, name: "RANGER DX800 Control Valve", brand: "Sandvik", model: "RANGER DX800", category: "Surface Drill Rigs", partNumber: "SV-DX800-032", price: 1450 },
  
  // Atlas Copco - Boomer Serisi
  { id: 18, name: "BOOMER M2C Boom Cylinder", brand: "Atlas Copco", model: "BOOMER M2C", category: "Underground Drill Rigs", partNumber: "AC-M2C-040", price: 3100 },
  { id: 19, name: "BOOMER L2D Feed Holder", brand: "Atlas Copco", model: "BOOMER L2D", category: "Underground Drill Rigs", partNumber: "AC-L2D-041", price: 1850 },
  { id: 20, name: "BOOMER 281 Hose Assembly", brand: "Atlas Copco", model: "BOOMER 281", category: "Underground Drill Rigs", partNumber: "AC-281-042", price: 420 },
  
  // Ek ürünler - Çeşitli kategoriler
  { id: 21, name: "Drill Rod 3m T38", brand: "Generic", model: "T38", category: "Drilling Tools", partNumber: "DR-T38-3M", price: 650 },
  { id: 22, name: "Drill Rod 4.5m T45", brand: "Generic", model: "T45", category: "Drilling Tools", partNumber: "DR-T45-4.5M", price: 890 },
  { id: 23, name: "Coupling Sleeve T38", brand: "Generic", model: "T38", category: "Drilling Tools", partNumber: "CS-T38", price: 120 },
  { id: 24, name: "Shank Adapter R32", brand: "Generic", model: "R32", category: "Drilling Tools", partNumber: "SA-R32", price: 280 },
  { id: 25, name: "Button Bit 76mm", brand: "Generic", model: "76mm", category: "Drilling Tools", partNumber: "BB-76", price: 450 },
  
  // Atlas Copco - SIMBA Serisi
  { id: 26, name: "SIMBA M7C Rotation Motor", brand: "Atlas Copco", model: "SIMBA M7C", category: "Underground Drill Rigs", partNumber: "AC-M7C-050", price: 2950 },
  { id: 27, name: "SIMBA H1354 Drill String", brand: "Atlas Copco", model: "SIMBA H1354", category: "Underground Drill Rigs", partNumber: "AC-H1354-051", price: 2100 },
  
  // Sandvik - Pantera Serisi
  { id: 28, name: "PANTERA 1500 Percussion Unit", brand: "Sandvik", model: "PANTERA 1500", category: "Surface Drill Rigs", partNumber: "SV-P1500-060", price: 3850 },
  { id: 29, name: "PANTERA DP1100i Hydraulic Pump", brand: "Sandvik", model: "PANTERA DP1100i", category: "Surface Drill Rigs", partNumber: "SV-DP1100-061", price: 2750 },
  
  // COP Serisi devam
  { id: 30, name: "COP 1638HD Piston", brand: "Atlas Copco", model: "COP 1638HD", category: "Rock Drills", partNumber: "AC-1638HD-070", price: 920 },
  { id: 31, name: "COP 1838ME Cylinder Tube", brand: "Atlas Copco", model: "COP 1838ME", category: "Rock Drills", partNumber: "AC-1838ME-071", price: 1080 },
  { id: 32, name: "COP 2238HD+ Valve Block", brand: "Atlas Copco", model: "COP 2238HD+", category: "Rock Drills", partNumber: "AC-2238HD-072", price: 1350 },
  { id: 33, name: "COP 3060 Front Cover", brand: "Atlas Copco", model: "COP 3060", category: "Rock Drills", partNumber: "AC-3060-073", price: 1150 },
  
  // Hidrolik parçalar
  { id: 34, name: "Hydraulic Hose 1/2 inch", brand: "Generic", model: "Standard", category: "Hydraulic Parts", partNumber: "HH-12", price: 45 },
  { id: 35, name: "Hydraulic Filter", brand: "Generic", model: "Standard", category: "Hydraulic Parts", partNumber: "HF-001", price: 85 },
  { id: 36, name: "Hydraulic Oil Seal Kit", brand: "Generic", model: "Standard", category: "Hydraulic Parts", partNumber: "HOS-KIT", price: 120 },
  
  // Daha fazla COP modelleri
  { id: 37, name: "COP 1440 Chuck Bushing", brand: "Atlas Copco", model: "COP 1440", category: "Rock Drills", partNumber: "AC-1440-080", price: 380 },
  { id: 38, name: "COP 1840EX Backhead", brand: "Atlas Copco", model: "COP 1840EX", category: "Rock Drills", partNumber: "AC-1840EX-081", price: 1280 },
  { id: 39, name: "COP 2550 Bearing", brand: "Atlas Copco", model: "COP 2550", category: "Rock Drills", partNumber: "AC-2550-082", price: 240 },
  { id: 40, name: "COP MD20 Seal Ring", brand: "Atlas Copco", model: "COP MD20", category: "Rock Drills", partNumber: "AC-MD20-083", price: 65 },
  
  // Sandvik HLX Serisi
  { id: 41, name: "HLX 5 Piston Assembly", brand: "Sandvik", model: "HLX 5", category: "Rock Drills", partNumber: "SV-HLX5-090", price: 1050 },
  { id: 42, name: "HLX 2 Valve Housing", brand: "Sandvik", model: "HLX 2", category: "Rock Drills", partNumber: "SV-HLX2-091", price: 890 },
  
  // FlexiROC Serisi
  { id: 43, name: "FlexiROC D60 Feed Beam", brand: "Atlas Copco", model: "FlexiROC D60", category: "Surface Drill Rigs", partNumber: "AC-D60-100", price: 4200 },
  { id: 44, name: "FlexiROC T35 Damper Kit", brand: "Atlas Copco", model: "FlexiROC T35", category: "Surface Drill Rigs", partNumber: "AC-T35-101", price: 920 },
  
  // BOLTEC Serisi
  { id: 45, name: "BOLTEC 235 Rotation Unit", brand: "Atlas Copco", model: "BOLTEC 235", category: "Underground Drill Rigs", partNumber: "AC-BT235-110", price: 2850 },
  { id: 46, name: "BOLTEC MC Feed Motor", brand: "Atlas Copco", model: "BOLTEC MC", category: "Underground Drill Rigs", partNumber: "AC-BTMC-111", price: 2150 },
  
  // Yedek parça seti
  { id: 47, name: "Universal Seal Kit", brand: "Generic", model: "Universal", category: "Seal Kits", partNumber: "USK-001", price: 95 },
  { id: 48, name: "Universal O-Ring Set", brand: "Generic", model: "Universal", category: "Seal Kits", partNumber: "UOR-001", price: 55 },
  { id: 49, name: "Maintenance Kit Standard", brand: "Generic", model: "Standard", category: "Maintenance", partNumber: "MK-STD", price: 180 },
  { id: 50, name: "Bearing Set Complete", brand: "Generic", model: "Standard", category: "Bearings", partNumber: "BS-COMP", price: 320 },
  
  // SmartROC Serisi
  { id: 51, name: "SmartROC D65 Control Panel", brand: "Atlas Copco", model: "SmartROC D65", category: "Surface Drill Rigs", partNumber: "AC-SD65-120", price: 5200 },
  { id: 52, name: "SmartROC T35 Sensor Assembly", brand: "Atlas Copco", model: "SmartROC T35", category: "Surface Drill Rigs", partNumber: "AC-ST35-121", price: 1850 },
  
  // Sandvik AXERA Serisi
  { id: 53, name: "AXERA D07 Boom Cylinder", brand: "Sandvik", model: "AXERA D07", category: "Underground Drill Rigs", partNumber: "SV-AXD07-130", price: 3350 },
  { id: 54, name: "AXERA 6 Hydraulic Valve", brand: "Sandvik", model: "AXERA 6", category: "Underground Drill Rigs", partNumber: "SV-AX6-131", price: 1250 },
  
  // Daha fazla drill bits ve toollar
  { id: 55, name: "Button Bit 89mm Retrac", brand: "Generic", model: "89mm", category: "Drilling Tools", partNumber: "BB-89R", price: 520 },
  { id: 56, name: "Extension Rod 1.2m T38", brand: "Generic", model: "T38", category: "Drilling Tools", partNumber: "ER-T38-1.2", price: 280 },
  { id: 57, name: "Drill Bit 102mm Ballistic", brand: "Generic", model: "102mm", category: "Drilling Tools", partNumber: "DB-102B", price: 680 },
  { id: 58, name: "Shank Adapter R38", brand: "Generic", model: "R38", category: "Drilling Tools", partNumber: "SA-R38", price: 310 },
  { id: 59, name: "Thread Adapter T45-T51", brand: "Generic", model: "T45-T51", category: "Drilling Tools", partNumber: "TA-4551", price: 195 },
  { id: 60, name: "Cross Bit 76mm", brand: "Generic", model: "76mm", category: "Drilling Tools", partNumber: "CB-76", price: 380 },
];

export const categories = [
  { name: "Rock Drills", count: 156, icon: "🔨" },
  { name: "Surface Drill Rigs", count: 89, icon: "🚜" },
  { name: "Underground Drill Rigs", count: 67, icon: "⛏️" },
  { name: "Drilling Tools", count: 234, icon: "🔧" },
  { name: "Hydraulic Parts", count: 178, icon: "💧" },
  { name: "Seal Kits", count: 92, icon: "⭕" },
  { name: "Bearings", count: 145, icon: "⚙️" },
  { name: "Maintenance", count: 78, icon: "🛠️" },
];

export const brands = [
  { name: "Atlas Copco", models: 145 },
  { name: "Sandvik", models: 98 },
  { name: "Epiroc", models: 76 },
  { name: "Tamrock", models: 54 },
  { name: "Generic", models: 267 },
];
