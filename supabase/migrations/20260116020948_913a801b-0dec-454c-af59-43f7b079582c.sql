-- Create upload_sessions table for QR code photo sync
CREATE TABLE public.upload_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '1 hour')
);

-- Create uploaded_photos table
CREATE TABLE public.uploaded_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.upload_sessions(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.upload_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.uploaded_photos ENABLE ROW LEVEL SECURITY;

-- Public access policies (no auth needed for this feature)
CREATE POLICY "Anyone can create sessions" ON public.upload_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view sessions" ON public.upload_sessions FOR SELECT USING (true);

CREATE POLICY "Anyone can upload photos to valid sessions" ON public.uploaded_photos FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view photos" ON public.uploaded_photos FOR SELECT USING (true);

-- Enable realtime for instant sync
ALTER PUBLICATION supabase_realtime ADD TABLE public.uploaded_photos;

-- Create storage bucket for photos
INSERT INTO storage.buckets (id, name, public) VALUES ('photos', 'photos', true);

-- Storage policies
CREATE POLICY "Anyone can upload photos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'photos');
CREATE POLICY "Anyone can view photos" ON storage.objects FOR SELECT USING (bucket_id = 'photos');