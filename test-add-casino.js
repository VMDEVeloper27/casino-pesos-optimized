const fs = require('fs').promises;
const path = require('path');

async function testAddCasino() {
  try {
    const dbPath = path.join(__dirname, 'data', 'casinos.json');
    
    // Read current casinos
    const data = await fs.readFile(dbPath, 'utf-8');
    const casinos = JSON.parse(data);
    
    console.log('Current number of casinos:', casinos.length);
    
    // Create test casino
    const testCasino = {
      id: 'test-casino',
      name: 'Test Casino',
      slug: 'test-casino',
      logo: '/images/test-logo.png',
      rating: 4.5,
      established: 2025,
      affiliateLink: 'https://test-casino.com',
      features: ['Test Feature 1', 'Test Feature 2'],
      bonus: {
        type: 'welcome',
        amount: 10000,
        percentage: 100,
        freeSpins: 100,
        minDeposit: 200,
        wageringRequirement: 30,
        code: 'TEST100'
      },
      games: {
        total: 1000,
        slots: 800,
        live: 100,
        table: 100
      },
      paymentMethods: ['OXXO', 'SPEI', 'Visa'],
      withdrawalTime: '24-48 horas',
      licenses: ['Test License'],
      currencies: ['MXN', 'USD'],
      pros: ['Test Pro 1', 'Test Pro 2'],
      cons: ['Test Con 1'],
      status: 'active',
      lastModified: new Date().toISOString()
    };
    
    // Add test casino
    casinos.push(testCasino);
    
    // Save back to file
    await fs.writeFile(dbPath, JSON.stringify(casinos, null, 2), 'utf-8');
    
    console.log('Test casino added successfully!');
    console.log('New number of casinos:', casinos.length);
    
  } catch (error) {
    console.error('Error adding test casino:', error);
  }
}

testAddCasino();