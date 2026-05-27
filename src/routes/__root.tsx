import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import AgeGate from "@/components/AgeGate";
import CustomCursor from "@/components/CustomCursor";

import "../styles.css";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-[var(--text)] font-[Bodoni_Moda]">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-[var(--text)]">Page not found</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-white px-6 py-3 text-sm font-medium transition-all duration-300 hover:translate-y-[-2px]"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-[var(--text)]">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-white px-4 py-2 text-sm font-medium transition-all duration-300 hover:translate-y-[-2px]"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center border border-[rgba(var(--border-rgb),0.35)] bg-white px-4 py-2 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--accent)]"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "OnlyLiyah" },
      { name: "description", content: "Hot just for you" },
      { name: "author", content: "OnlyLiyah" },
      { property: "og:title", content: "OnlyLiyah" },
      { property: "og:description", content: "Hot just for you" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "OnlyLiyah" },
      { name: "twitter:description", content: "Hot just for you" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/26fa8395-0e27-44af-a77b-892f60b9ef65/id-preview-340ae3d1--68fea179-0d7d-46a7-836f-f5aacb677e4f.lovable.app-1779711402924.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/26fa8395-0e27-44af-a77b-892f60b9ef65/id-preview-340ae3d1--68fea179-0d7d-46a7-836f-f5aacb677e4f.lovable.app-1779711402924.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,300;0,6..96,400;0,6..96,700;1,6..96,300;1,6..96,400;1,6..96,700&family=DM+Mono:wght@300;400&family=Outfit:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="day" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('onlyliyah-theme');if(t==='night'||t==='day')document.documentElement.setAttribute('data-theme',t)}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CartProvider>
          <CustomCursor />
          <AgeGate />
          <Outlet />
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
