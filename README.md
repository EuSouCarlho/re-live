# 🆘 Emergency QR Code Generator

A web application that generates unique QR codes containing personal emergency information for use in accident or emergency situations.

## Features

- **Personal Information Form**: Complete form to input emergency details including:
  - Name, age, sex, blood type
  - ID number, weight, height  
  - Address and photo
  - Emergency contact information
  - Medical notes and allergies

- **QR Code Generation**: Creates a unique, non-modifiable QR code that links to your emergency information

- **Emergency Display Page**: Clean, mobile-optimized page that emergency responders can quickly scan and read

- **Data Security**: Uses Netlify Blobs for secure data storage with unique IDs

- **Mobile Responsive**: Optimized for both desktop and mobile devices

## How It Works

1. **Fill Out Form**: Complete your personal and emergency contact information
2. **Generate QR**: Click "Generar QR de Emergencia" to create your unique QR code
3. **Save QR Code**: Save the generated QR code to your phone or print it
4. **Emergency Use**: In case of emergency, responders can scan the QR to access your information instantly

## Technical Implementation

### Frontend
- Pure HTML, CSS, and JavaScript
- QR code generation using `qrcode.js` library
- Responsive design with mobile-first approach
- Form validation and photo upload support

### Backend
- Netlify Functions for data persistence
- Netlify Blobs for secure data storage
- Environment-aware storage (production vs development)

### Files Structure
```
├── index.html              # Main form page
├── emergency.html          # Emergency information display
├── netlify.toml           # Netlify configuration
├── package.json           # Dependencies
└── netlify/functions/     # Serverless functions
    ├── save-emergency-data.js
    └── get-emergency-data.js
```

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start local development server:
   ```bash
   netlify dev
   ```

3. Access the application at `http://localhost:8888`

## Deployment

The application is designed to be deployed on Netlify with automatic:
- Function deployment
- Blob storage provisioning  
- SSL certificate management
- Global CDN distribution

## Security Considerations

- Emergency data is intentionally public once a QR is generated (for emergency access)
- Unique IDs prevent guessing of other people's emergency information
- Data cannot be modified once the QR is created
- No personally identifiable information is stored in logs

## Usage Tips

- Keep your QR code accessible (phone wallpaper, printed card in wallet)
- Update information periodically by generating a new QR
- Only include information you're comfortable sharing in emergencies
- Test the QR code after generation to ensure it works

## Emergency Response

Emergency responders can:
1. Scan the QR code with any smartphone
2. Instantly view critical medical information
3. Contact emergency contact with one tap
4. Access all relevant details without needing to unlock devices

This system provides critical information access when every second counts in emergency situations.