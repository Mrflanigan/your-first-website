import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { X, QrCode, Image } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UploadedPhoto {
  id: string;
  file_url: string;
  file_name: string | null;
  created_at: string;
}

export const QRPhotoSync = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionCode, setSessionCode] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [uploadUrl, setUploadUrl] = useState<string>("");

  // Create a new session when opened
  useEffect(() => {
    if (isOpen && !sessionCode) {
      createSession();
    }
  }, [isOpen]);

  // Subscribe to real-time photo uploads
  useEffect(() => {
    if (!sessionId) return;

    const channel = supabase
      .channel(`photos-${sessionId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "uploaded_photos",
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          console.log("New photo received!", payload);
          const newPhoto = payload.new as UploadedPhoto;
          setPhotos((prev) => [...prev, newPhoto]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  const createSession = async () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const { data, error } = await supabase
      .from("upload_sessions")
      .insert({ session_code: code })
      .select()
      .single();

    if (error) {
      console.error("Error creating session:", error);
      return;
    }

    setSessionCode(code);
    setSessionId(data.id);
    
    // Build the upload URL
    const baseUrl = window.location.origin;
    setUploadUrl(`${baseUrl}/upload/${code}`);
  };

  const closeAndReset = () => {
    setIsOpen(false);
    setSessionCode(null);
    setSessionId(null);
    setPhotos([]);
    setUploadUrl("");
  };

  return (
    <>
      {/* Floating QR Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-sage to-charcoal text-cream p-5 rounded-2xl shadow-2xl hover:shadow-sage/30 transition-all border-2 border-cream/20"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        title="Upload photos from phone"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <QrCode className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-terracotta rounded-full animate-pulse" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeAndReset}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-cream rounded-2xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-2xl text-charcoal">Phone → Desktop</h2>
                <button
                  onClick={closeAndReset}
                  className="text-charcoal/60 hover:text-charcoal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {sessionCode ? (
                <div className="text-center">
                  <p className="text-charcoal/70 mb-4">
                    Scan this QR code with your phone to upload photos
                  </p>
                  
                  <div className="bg-white p-4 rounded-xl inline-block mb-4">
                    <QRCodeSVG
                      value={uploadUrl}
                      size={200}
                      level="H"
                      includeMargin
                    />
                  </div>

                  <p className="text-sm text-charcoal/50 mb-6">
                    Session Code: <span className="font-mono font-bold">{sessionCode}</span>
                  </p>

                  {/* Uploaded Photos Grid */}
                  {photos.length > 0 && (
                    <div className="mt-6">
                      <p className="text-sm text-charcoal/70 mb-3 flex items-center justify-center gap-2">
                        <Image className="w-4 h-4" />
                        {photos.length} photo{photos.length > 1 ? "s" : ""} received
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {photos.map((photo) => (
                          <motion.img
                            key={photo.id}
                            src={photo.file_url}
                            alt={photo.file_name || "Uploaded photo"}
                            className="w-full aspect-square object-cover rounded-lg"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", bounce: 0.4 }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {photos.length === 0 && (
                    <div className="flex items-center justify-center gap-2 text-charcoal/40">
                      <div className="w-2 h-2 bg-sage rounded-full animate-pulse" />
                      <span className="text-sm">Waiting for photos...</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center py-8">
                  <div className="w-8 h-8 border-2 border-charcoal/20 border-t-charcoal rounded-full animate-spin" />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
