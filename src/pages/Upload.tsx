import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Check, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const UploadPage = () => {
  const { sessionCode } = useParams<{ sessionCode: string }>();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Validate session on load
  useEffect(() => {
    if (sessionCode) {
      validateSession();
    }
  }, [sessionCode]);

  const validateSession = async () => {
    const { data, error } = await supabase
      .from("upload_sessions")
      .select("id, expires_at")
      .eq("session_code", sessionCode?.toUpperCase())
      .single();

    if (error || !data) {
      setIsValid(false);
      return;
    }

    // Check if expired
    if (new Date(data.expires_at) < new Date()) {
      setIsValid(false);
      setError("This session has expired");
      return;
    }

    setSessionId(data.id);
    setIsValid(true);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !sessionId) return;

    setUploading(true);
    setError(null);

    for (const file of Array.from(files)) {
      try {
        // Upload to storage
        const fileName = `${sessionId}/${Date.now()}-${file.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("photos")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: urlData } = supabase.storage
          .from("photos")
          .getPublicUrl(uploadData.path);

        // Save to database
        const { error: dbError } = await supabase
          .from("uploaded_photos")
          .insert({
            session_id: sessionId,
            file_url: urlData.publicUrl,
            file_name: file.name,
          });

        if (dbError) throw dbError;

        setUploadedCount((prev) => prev + 1);
      } catch (err) {
        console.error("Upload error:", err);
        setError("Failed to upload photo");
      }
    }

    setUploading(false);
    // Reset input
    e.target.value = "";
  };

  if (isValid === null) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-charcoal/20 border-t-charcoal rounded-full animate-spin" />
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-terracotta/10 p-4 rounded-full mb-4">
          <X className="w-8 h-8 text-terracotta" />
        </div>
        <h1 className="font-display text-2xl text-charcoal mb-2">
          Invalid Session
        </h1>
        <p className="text-charcoal/60">
          {error || "This upload link is invalid or has expired."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm text-center"
      >
        <h1 className="font-display text-3xl text-charcoal mb-2">
          Upload Photos
        </h1>
        <p className="text-charcoal/60 mb-8">
          Photos will appear on your desktop instantly
        </p>

        <div className="space-y-4">
          {/* Camera Button */}
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            onClick={() => cameraInputRef.current?.click()}
            disabled={uploading}
            className="w-full bg-charcoal hover:bg-charcoal/90 text-cream py-6 text-lg"
          >
            {uploading ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <Camera className="w-5 h-5 mr-2" />
            )}
            Take Photo
          </Button>

          {/* Gallery Button */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            variant="outline"
            className="w-full border-charcoal/20 text-charcoal py-6 text-lg"
          >
            <Upload className="w-5 h-5 mr-2" />
            Choose from Gallery
          </Button>
        </div>

        {/* Upload Status */}
        <AnimatePresence>
          {uploadedCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex items-center justify-center gap-2 text-sage"
            >
              <Check className="w-5 h-5" />
              <span>
                {uploadedCount} photo{uploadedCount > 1 ? "s" : ""} sent!
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <p className="mt-4 text-terracotta text-sm">{error}</p>
        )}
      </motion.div>
    </div>
  );
};

export default UploadPage;
