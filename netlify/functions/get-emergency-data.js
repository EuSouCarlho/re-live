import { getStore } from "@netlify/blobs";

export default async (request, context) => {
  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing emergency ID parameter' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Try both production and development stores
    const stores = [
      getStore("emergency-data"),
      getStore("emergency-data-dev")
    ];
    
    let emergencyData = null;
    
    for (const store of stores) {
      try {
        emergencyData = await store.get(id, { type: 'json' });
        if (emergencyData) break;
      } catch (error) {
        console.warn(`Failed to retrieve from store:`, error);
        continue;
      }
    }

    if (!emergencyData) {
      return new Response(JSON.stringify({ 
        error: 'Emergency data not found',
        message: 'The requested emergency information could not be found or has expired.'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Return the emergency data (this is intentionally public as it's for emergency use)
    return new Response(JSON.stringify(emergencyData), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
      }
    });

  } catch (error) {
    console.error('Error retrieving emergency data:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      message: 'Failed to retrieve emergency data'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};