const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testCasinoFields() {
  try {
    // Get one casino to see its structure
    const { data, error } = await supabase
      .from('casinos')
      .select('*')
      .limit(1)
      .single();
    
    if (error) {
      console.error('Error:', error);
      return;
    }
    
    console.log('Casino fields in database:');
    console.log('=========================');
    if (data) {
      Object.keys(data).forEach(key => {
        console.log(`- ${key}: ${typeof data[key]}`);
      });
    }
    
    console.log('\n\nFull casino data:');
    console.log(JSON.stringify(data, null, 2));
    
  } catch (err) {
    console.error('Error:', err);
  }
}

testCasinoFields();