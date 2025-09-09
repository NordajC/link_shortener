import "./App.css";
import Form from "./components/form";
import AuthForm from "./components/authForm";
import { Route, Link, Routes } from "react-router-dom";
import { Navbar01 } from "./components/ui/shadcn-io/navbar-01/index";
import { Toaster } from "sonner";
import Home from "./pages/home";
import ProtectedRoute from "./routes/protectedRoute";
import Dashboard from "./pages/dashboard";
import NavbarWrapper from "./components/ui/navbarWrapper";

function App() {
  return (
    <>
      <NavbarWrapper />
      <main className="dark min-h-screen bg-background flex items-center justify-center p-0 w-full sm:p-0 lg:p-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthForm />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </main>
      <Toaster
        position="bottom-right"
        richColors
        expand
        closeButton
        className="toaster z-[9999]"
        toastOptions={{
          classNames: {
            toast:
              "bg-background border border-border text-foreground shadow-lg",
            title: "text-sm font-semibold",
            description: "text-xs text-muted-foreground",
            actionButton:
              "bg-primary text-primary-foreground hover:bg-primary/90 transition",
            cancelButton:
              "bg-muted text-muted-foreground hover:bg-accent transition",
          },
        }}
      />
    </>
  );
}

export default App;
