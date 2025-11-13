import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sessionApi } from "../api/sessions";
import { useAuth } from "@clerk/clerk-react";   // ✅ ADD THIS

// ---------------- 1. CREATE SESSION ----------------
export const useCreateSession = () => {
  return useMutation({
    mutationKey: ["createSession"],
    mutationFn: sessionApi.createSession,
    onSuccess: () => toast.success("Session created successfully!"),
    onError: (error) =>
      toast.error(error.response?.data?.message || "Failed to create room"),
  });
};

// ---------------- 2. GET ACTIVE SESSIONS ----------------
export const useActiveSessions = () => {
  const { isLoaded, isSignedIn } = useAuth();    // ✅ add

  return useQuery({
    queryKey: ["activeSessions"],
    queryFn: sessionApi.getActiveSessions,
    enabled: isLoaded && isSignedIn,             // ⭐ FIX
  });
};

// ---------------- 3. GET MY RECENT SESSIONS ----------------
export const useMyRecentSessions = () => {
  const { isLoaded, isSignedIn } = useAuth();    // ✅ add

  return useQuery({
    queryKey: ["myRecentSessions"],
    queryFn: sessionApi.getMyRecentSessions,
    enabled: isLoaded && isSignedIn,             // ⭐ FIX
  });
};

// ---------------- 4. GET SESSION BY ID ----------------
export const useSessionById = (id) => {
  const { isLoaded, isSignedIn } = useAuth();    // ✅ add

  return useQuery({
    queryKey: ["session", id],
    queryFn: () => sessionApi.getSessionById(id),
    enabled: !!id && isLoaded && isSignedIn,     // ⭐ FIX
    refetchInterval: 5000,
  });
};

// ---------------- 5. JOIN SESSION ----------------
export const useJoinSession = () => {
  return useMutation({
    mutationKey: ["joinSession"],
    mutationFn: sessionApi.joinSession,
    onSuccess: () => toast.success("Joined session successfully!"),
    onError: (error) =>
      toast.error(error.response?.data?.message || "Failed to join session"),
  });
};

// ---------------- 6. END SESSION ----------------
export const useEndSession = () => {
  return useMutation({
    mutationKey: ["endSession"],
    mutationFn: sessionApi.endSession,
    onSuccess: () => toast.success("Session ended successfully!"),
    onError: (error) =>
      toast.error(error.response?.data?.message || "Failed to end session"),
  });
};
