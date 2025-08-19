const fs = require('fs');
const path = require('path');

// Read the real casinos data
const casinosData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/real-casinos-data.json'), 'utf8')
);

// Read existing casinos file
const existingCasinosPath = path.join(__dirname, '../data/casinos.json');
let existingData = [];

if (fs.existsSync(existingCasinosPath)) {
  existingData = JSON.parse(fs.readFileSync(existingCasinosPath, 'utf8'));
}

// Transform the data to match the EXACT existing format
const transformedCasinos = casinosData.casinos.map(casino => ({
  id: casino.id,
  name: casino.name,
  slug: casino.id,
  logo: `/images/casinos/${casino.id}-logo.png`,
  rating: casino.rating,
  established: casino.established,
  affiliateLink: casino.url,
  features: [
    ...(casino.games.liveDealer > 0 ? ['Live Casino'] : []),
    ...(casino.supportLanguages.includes('es') ? ['24/7 Support'] : []),
    ...(casino.currencies.some(c => ['BTC', 'ETH'].includes(c)) ? ['Crypto'] : []),
    ...(casino.payoutTime.includes('24') || casino.payoutTime.includes('Instant') ? ['Quick Payouts'] : [])
  ].slice(0, 4), // Limit to 4 features like existing format
  bonus: {
    type: 'welcome',
    amount: casino.welcomeBonus.amount,
    percentage: casino.welcomeBonus.percentage,
    freeSpins: casino.bonuses.find(b => b.type === 'free-spins')?.amount || 0,
    minDeposit: casino.minDeposit,
    wageringRequirement: casino.welcomeBonus.wagering,
    code: casino.welcomeBonus.code || ''
  },
  games: {
    total: casino.games.total,
    slots: casino.games.slots,
    live: casino.games.liveDealer,
    table: casino.games.tableGames
  },
  paymentMethods: casino.paymentMethods.slice(0, 5), // Limit to 5 payment methods
  withdrawalTime: casino.payoutTime,
  licenses: Array.isArray(casino.license) ? casino.license : [casino.license],
  currencies: casino.currencies.slice(0, 3), // Limit to 3 currencies
  pros: casino.pros.slice(0, 4), // Limit to 4 pros
  cons: casino.cons.slice(0, 2), // Limit to 2 cons
  status: 'active',
  lastModified: new Date().toISOString()
}));

// Merge with existing casinos (avoiding duplicates)
const existingIds = existingData.map(c => c.id);
const newCasinos = transformedCasinos.filter(c => !existingIds.includes(c.id));
const updatedCasinos = [...existingData, ...newCasinos];

// Sort by rating
updatedCasinos.sort((a, b) => b.rating - a.rating);

// Write the updated data (as array, like the original format)
fs.writeFileSync(
  existingCasinosPath,
  JSON.stringify(updatedCasinos, null, 2),
  'utf8'
);

console.log(`✅ Successfully imported ${newCasinos.length} new casinos`);
console.log(`📊 Total casinos in database: ${updatedCasinos.length}`);
console.log(`📁 Data saved to: ${existingCasinosPath}`);
console.log('\n✅ Import completed successfully!');