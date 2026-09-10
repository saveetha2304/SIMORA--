require('dotenv').config();

const supabase = require('./config/supabase');

async function testConnection() {
  const { data, error } = await supabase
    .from('test')
    .select('*')
    .limit(1);

  if (error) {
    console.log('Supabase connected, but table test does not exist.');
    console.log(error.message);
  } else {
    console.log('Supabase connection successful!');
    console.log(data);
  }
}

testConnection();