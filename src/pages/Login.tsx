import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Lock, 
  Loader2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  ArrowRight 
} from "lucide-react";
import api from "@/lib/api";

export default function Login() {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // 3D Tilt State
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/login", {
        email,
        password,
      });

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      console.log("✅ LOGIN SUCCESS");
      navigate("/dashboard");
    } catch (err: any) {
      console.error("❌ LOGIN FAILED", err?.response || err);
      setError(err?.response?.data?.message || "Email atau password salah.");
    } finally {
      setLoading(false);
    }
  };

  // GLOBAL MOUSE TRACKING
  // We use useEffect + window.addEventListener so it works even outside the card
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;

      // Get center of the screen
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Calculate mouse position relative to center
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      // Calculate rotation (divide by large number for smooth, subtle tilt)
      // Note: We invert MouseY for rotation so it feels natural
      const rotateXValue = (mouseY / 40) * -1;
      const rotateYValue = mouseX / 40;

      setRotateX(rotateXValue);
      setRotateY(rotateYValue);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Calculate Shadow Position (Opposite to the light source/cursor)
  // Light at Mouse (X, Y) -> Shadow at (-X, -Y)
  const shadowX = -(rotateY * 2); 
  const shadowY = -(rotateX * 2);

  return (
    // Plain background, removed decorative blobs
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 relative overflow-hidden">
      
      {/* WRAPPER: Handles Entrance Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
        style={{ perspective: "1000px" }}
      >
        {/* 
           INNER CARD: 
           - Rotates based on global mouse position
           - Shadow casts opposite to rotation
        */}
        <motion.div
          ref={cardRef}
          className="bg-white rounded-2xl border border-slate-100 overflow-hidden relative w-full"
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
            boxShadow: `${shadowX}px ${shadowY}px 25px rgba(0,0,0,0.15)`,
            transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out',
          }}
        >
          {/* Header Section */}
          <div className="pt-8 pb-6 px-8 text-center relative z-20">
            <Link to="/" className="inline-block mb-6 group">
              <span className="text-3xl font-bold tracking-tight flex items-center justify-center">
                MOFY<span className="text-slate-400">.</span>
              </span>
            </Link>
            <h2 className="text-2xl font-bold text-slate-900">Selamat Datang Admin Fuu</h2>
            <p className="text-slate-500 mt-2 text-sm">Silakan masuk untuk perang kubu mafia</p>
          </div>

          {/* Form Section */}
          <div className="px-8 pb-8 relative z-20">
            <form onSubmit={handleLogin} className="space-y-5">
              
              {/* Email Input */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-black transition-colors" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="nama@perusahaan.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label htmlFor="password" className="text-sm font-medium text-slate-700">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-black transition-colors" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message Alert */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100"
                  >
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-lg font-medium shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    Masuk Sekarang
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}