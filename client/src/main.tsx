import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/contexts/ThemeContext.jsx";
import { AuthProvider } from "@/contexts/AuthContext.jsx";
import { Toaster } from "@/components/ui/toaster.jsx";
import Layout from "@/components/layout/Layout.jsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Home from "@/pages/Home.jsx";
import Search from "./pages/Search.tsx";
import Notifications from "./pages/Notifications.tsx";
import Messages from "./pages/Messages.tsx";
import Bookmarks from "./pages/Bookmarks.tsx";
import Profile from "./pages/Profile.tsx";
import Post from "./pages/Post.tsx";
import Settings from "./pages/Settings.tsx";
import { ModalProvider } from "./contexts/ModalContext.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/:username" element={<Profile />} />
        <Route path="/:username/post/:id" element={<Post />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <AuthProvider>
          <ModalProvider>
            <RouterProvider router={router} />
          </ModalProvider>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
