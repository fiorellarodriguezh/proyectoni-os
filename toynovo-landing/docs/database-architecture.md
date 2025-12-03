# Database Architecture - Toynovo Interested Parties

## Overview

This document describes the database schema for capturing interested parties (leads) for the Toynovo toy rental platform.

## Tables

### `interested_parties`

Primary table for storing lead information from the interest form.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique identifier |
| `full_name` | VARCHAR(255) | NOT NULL | Full name of the interested party |
| `email` | VARCHAR(255) | NOT NULL, UNIQUE | Email address for contact |
| `phone` | VARCHAR(20) | NOT NULL | Phone number with country code |
| `party_type` | ENUM | NOT NULL | Type: 'family', 'school', 'kindergarten', 'other' |
| `district` | VARCHAR(100) | NOT NULL | District/neighborhood in Lima |
| `children_count` | INTEGER | NULL | Number of children (for families) |
| `children_ages` | VARCHAR(100) | NULL | Age range of children (e.g., "0-2, 3-5") |
| `institution_name` | VARCHAR(255) | NULL | Name of school/kindergarten (if applicable) |
| `how_found_us` | ENUM | NULL | Source: 'social_media', 'referral', 'search', 'other' |
| `message` | TEXT | NULL | Additional comments or questions |
| `newsletter_consent` | BOOLEAN | DEFAULT false | Consent to receive newsletter |
| `terms_accepted` | BOOLEAN | NOT NULL, DEFAULT false | Acceptance of terms and conditions |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Record creation timestamp |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Last update timestamp |
| `status` | ENUM | DEFAULT 'new' | Lead status: 'new', 'contacted', 'converted', 'inactive' |
| `notes` | TEXT | NULL | Internal notes for follow-up |

### Indexes

```sql
CREATE INDEX idx_interested_parties_email ON interested_parties(email);
CREATE INDEX idx_interested_parties_party_type ON interested_parties(party_type);
CREATE INDEX idx_interested_parties_status ON interested_parties(status);
CREATE INDEX idx_interested_parties_created_at ON interested_parties(created_at DESC);
CREATE INDEX idx_interested_parties_district ON interested_parties(district);
```

## Enums

### `party_type_enum`

```sql
CREATE TYPE party_type_enum AS ENUM (
  'family',      -- Familia individual
  'school',      -- Colegio
  'kindergarten', -- Jardín de infancia
  'other'        -- Otro tipo de institución
);
```

### `lead_source_enum`

```sql
CREATE TYPE lead_source_enum AS ENUM (
  'social_media', -- Redes sociales
  'referral',     -- Referido por otro usuario
  'search',       -- Búsqueda en Google
  'other'         -- Otro medio
);
```

### `lead_status_enum`

```sql
CREATE TYPE lead_status_enum AS ENUM (
  'new',       -- Nuevo registro
  'contacted', -- Ya fue contactado
  'converted', -- Convertido a cliente
  'inactive'   -- Sin interés/inactivo
);
```

## SQL Migration Script

```sql
-- Create enums
CREATE TYPE party_type_enum AS ENUM ('family', 'school', 'kindergarten', 'other');
CREATE TYPE lead_source_enum AS ENUM ('social_media', 'referral', 'search', 'other');
CREATE TYPE lead_status_enum AS ENUM ('new', 'contacted', 'converted', 'inactive');

-- Create table
CREATE TABLE interested_parties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  party_type party_type_enum NOT NULL,
  district VARCHAR(100) NOT NULL,
  children_count INTEGER,
  children_ages VARCHAR(100),
  institution_name VARCHAR(255),
  how_found_us lead_source_enum,
  message TEXT,
  newsletter_consent BOOLEAN DEFAULT false,
  terms_accepted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status lead_status_enum DEFAULT 'new',
  notes TEXT
);

-- Create indexes
CREATE INDEX idx_interested_parties_email ON interested_parties(email);
CREATE INDEX idx_interested_parties_party_type ON interested_parties(party_type);
CREATE INDEX idx_interested_parties_status ON interested_parties(status);
CREATE INDEX idx_interested_parties_created_at ON interested_parties(created_at DESC);
CREATE INDEX idx_interested_parties_district ON interested_parties(district);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_interested_parties_updated_at
  BEFORE UPDATE ON interested_parties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## Lima Districts Reference

Common districts for the `district` field:

- Miraflores
- San Isidro
- San Borja
- Surco
- La Molina
- Barranco
- Pueblo Libre
- Jesús María
- Magdalena
- San Miguel
- Lince
- Surquillo
- Chorrillos
- Lima Centro
- Otro

## TypeScript Interface

```typescript
interface InterestedParty {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  partyType: 'family' | 'school' | 'kindergarten' | 'other';
  district: string;
  childrenCount?: number;
  childrenAges?: string;
  institutionName?: string;
  howFoundUs?: 'social_media' | 'referral' | 'search' | 'other';
  message?: string;
  newsletterConsent: boolean;
  termsAccepted: boolean;
  createdAt: Date;
  updatedAt: Date;
  status: 'new' | 'contacted' | 'converted' | 'inactive';
  notes?: string;
}
```

## Form Validation Rules

| Field | Validation |
|-------|------------|
| `full_name` | Required, min 2 chars, max 255 chars |
| `email` | Required, valid email format |
| `phone` | Required, valid phone format (+51 XXX XXX XXX) |
| `party_type` | Required, must be valid enum value |
| `district` | Required |
| `children_count` | Optional, integer >= 1 |
| `children_ages` | Optional, max 100 chars |
| `institution_name` | Required if party_type is 'school' or 'kindergarten' |
| `terms_accepted` | Must be true |

## Future Considerations

1. **Supabase Integration**: Use Supabase for database hosting with Row Level Security
2. **Analytics Table**: Track form conversion rates and source effectiveness
3. **Email Integration**: Automated welcome emails via Resend/SendGrid
4. **CRM Integration**: Sync with HubSpot or similar CRM
5. **Geolocation**: Store coordinates for delivery zone optimization
