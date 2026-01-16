# Reusable Components Kit

## QR Photo Sync

A drop-in feature that lets users scan a QR code with their phone and instantly upload photos to the desktop app in real-time.

---

### Step 1: Database Migration

Run this SQL in your new project's database:

```sql
-- Create upload sessions table
CREATE TABLE public.upload_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '1 hour')
);

-- Create uploaded photos table
CREATE TABLE public.uploaded_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.upload_sessions(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.upload_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.uploaded_photos ENABLE ROW LEVEL SECURITY;

-- RLS Policies (public access for anonymous uploads)
CREATE POLICY "Anyone can create sessions" ON public.upload_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view sessions" ON public.upload_sessions FOR SELECT USING (true);
CREATE POLICY "Anyone can upload photos" ON public.uploaded_photos FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view photos" ON public.uploaded_photos FOR SELECT USING (true);

-- Enable realtime for instant photo sync
ALTER PUBLICATION supabase_realtime ADD TABLE public.uploaded_photos;

-- Create storage bucket for photos
INSERT INTO storage.buckets (id, name, public) VALUES ('photos', 'photos', true);

-- Storage policies
CREATE POLICY "Public photo uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'photos');
CREATE POLICY "Public photo access" ON storage.objects FOR SELECT USING (bucket_id = 'photos');
```

---

### Step 2: Install Dependency

```bash
npm install qrcode.react
```

---

### Step 3: Copy Components

Copy these files to your new project:

1. **`src/components/QRPhotoSync.tsx`** - The floating QR button + modal
2. **`src/pages/Upload.tsx`** - The mobile upload page

---

### Step 4: Add Route

In your `App.tsx`, add the upload route:

```tsx
import Upload from "@/pages/Upload";

// Inside your Routes:
<Route path="/upload/:sessionCode" element={<Upload />} />
```

---

### Step 5: Use the Component

Add the QR button anywhere in your app:

```tsx
import { QRPhotoSync } from "@/components/QRPhotoSync";

// In your JSX:
<QRPhotoSync />
```

---

### How It Works

1. User clicks the floating QR button (bottom-right corner)
2. A unique session code is generated and stored in the database
3. QR code displays with a link to `/upload/{sessionCode}`
4. Phone scans QR → opens upload page → takes/selects photos
5. Photos upload to storage, URL saved to database
6. Desktop receives real-time updates via Supabase Realtime
7. Photos appear instantly in the modal grid

---

### Customization

- **Button position**: Edit the `fixed bottom-6 right-6` classes in QRPhotoSync.tsx
- **Session duration**: Change `interval '1 hour'` in the SQL migration
- **Styling**: Update Tailwind classes to match your design system
- **Photo grid**: Modify the grid layout in QRPhotoSync.tsx

---

### Requirements

- Supabase project with Storage enabled
- App must be **published** (not just preview) for phones to access without login
