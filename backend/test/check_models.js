import { CohereClient } from 'cohere-ai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '../.env' });

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY
});

async function run() {
  try {
    const response = await cohere.models.list();
    console.log('Available Cohere models:');
    response.models.forEach(m => {
      console.log(`- ${m.name} (endpoints: ${m.endpoints.join(', ')})`);
    });
  } catch (err) {
    console.error('Error fetching Cohere models:', err);
  }
}

run();
