import { Navbar } from "./navbar";
import { Footer } from "./footer";

export function BasicLayout({ children, user = null }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={user} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}