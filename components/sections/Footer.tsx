import Link from "next/link"
import { siteConfig } from "@/config/site"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="font-heading text-xl font-bold">
              {siteConfig.name}
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              {siteConfig.description}
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#features" className="hover:text-foreground">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground">Pricing</Link></li>
              <li><Link href="#!" className="hover:text-foreground">Integrations</Link></li>
              <li><Link href="#!" className="hover:text-foreground">Changelog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#!" className="hover:text-foreground">About Us</Link></li>
              <li><Link href="#!" className="hover:text-foreground">Careers</Link></li>
              <li><Link href="#!" className="hover:text-foreground">Contact</Link></li>
              <li><Link href="#!" className="hover:text-foreground">Partners</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#!" className="hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="#!" className="hover:text-foreground">Terms of Service</Link></li>
              <li><Link href="#!" className="hover:text-foreground">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <p>Designed for Envato Market</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
