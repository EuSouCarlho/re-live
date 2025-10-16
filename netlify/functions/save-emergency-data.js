import { getStore } from "@netlify/blobs";

export default async (request, context) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { id, data } = await request.json();
    
    if (!id || !data) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate required fields
    const requiredFields = ['nombre', 'edad', 'sexo', 'grupoSanguineo', 'cedula', 'contactoNombre', 'contactoTelefono'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return new Response(JSON.stringify({ error: `Missing required field: ${field}` }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Use global store for production, deploy store for development
    const isProduction = context.deploy?.context === 'production';
    const store = isProduction ? getStore("emergency-data") : getStore("emergency-data-dev");
    
    // Store the emergency data
    await store.setJSON(id, data, {
      metadata: {
        createdAt: new Date().toISOString(),
        environment: isProduction ? 'production' : 'development'
      }
    });

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Emergency data saved successfully',
      id: id 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error saving emergency data:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      message: 'Failed to save emergency data'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};