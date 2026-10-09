"use client"

import { useState, useEffect, useMemo } from "react"
import { 
  FileText, Upload, Plus, PenTool, FileSignature, CheckSquare, LayoutTemplate, 
  Activity, FolderOpen, Folder, ShieldAlert, FileWarning, Search, Filter,
  MoreVertical, Eye, Download, Share2, Archive, Trash2, ArrowUpDown, Clock,
  File, FileType2, Image as ImageIcon, Link as LinkIcon, CheckCircle2,
  AlertTriangle, XCircle, LayoutGrid, List, FileClock
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { Drawer, Modal, ConfirmDialog, EmptyState } from "@/components/ui/Feedback"
import { 
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, 
  DropdownMenuItem, DropdownMenuSeparator 
} from "@/components/ui/DropdownMenu"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useTenant } from "@/providers/TenantProvider"
import { mockDocuments, mockDocumentTemplates, mockSignatures, mockAcknowledgments, mockStaff } from "@/lib/mock-data"
import { formatDistanceToNow, parseISO, isBefore, addDays } from "date-fns"
import { } from "@/lib/formatters" // assuming formatBytes doesn't exist, I'll provide an inline one or just format number

// Helper for file size formatting
function formatFileSize(bytes: number) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

const ALL_CATEGORIES = [
  { id: "all", label: "All Documents", icon: FolderOpen },
  { id: "Standard Operating Procedures", label: "Standard Operating Procedures", icon: Folder },
  { id: "Policies", label: "Policies", icon: Folder },
  { id: "Contracts", label: "Contracts", icon: Folder },
  { id: "Guest Forms & Terms", label: "Guest Forms & Terms", icon: Folder },
  { id: "Compliance & Licenses", label: "Compliance & Licenses", icon: Folder },
  { id: "Property Guides", label: "Property Guides", icon: Folder },
  { id: "Vendor & Asset Manuals", label: "Vendor & Asset Manuals", icon: Folder },
  { id: "Templates", label: "Templates", icon: LayoutTemplate },
  { id: "HR", label: "HR", icon: Folder, restricted: true },
  { id: "archive", label: "Archive", icon: Archive }
]

export default function DocumentsPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tabParam = searchParams?.get("tab") || "library"
  const docParam = searchParams?.get("doc")
  
  const { role } = useTenant()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState(tabParam)
  
  // Library State
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [isDragging, setIsDragging] = useState(false)
  
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [docDrawerOpen, setDocDrawerOpen] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState<any>(null)
  
  useEffect(() => {
    setMounted(true)
    if (tabParam) setActiveTab(tabParam)
    if (docParam) {
      const target = mockDocuments.find(d => d.id === docParam)
      if (target) {
        setSelectedDoc(target)
        setDocDrawerOpen(true)
      }
    }
  }, [tabParam, searchParams])

  const setTab = (tab: string) => {
    setActiveTab(tab)
    router.replace(`${pathname}?tab=${tab}`)
  }
  
  const closeDrawer = () => {
    setDocDrawerOpen(false)
    setSelectedDoc(null)
    router.replace(`${pathname}?tab=${activeTab}`)
  }

  if (!mounted) return null

  // Role Permissions Filtering
  let visibleDocs = mockDocuments.filter(d => d.status !== "Archived" || activeCategory === "archive")
  
  if (role === "Front Desk") {
    visibleDocs = visibleDocs.filter(d => d.category !== "HR" && d.category !== "Contracts" && d.category !== "Vendor & Asset Manuals")
  } else if (role === "Housekeeping") {
    visibleDocs = visibleDocs.filter(d => d.category === "Standard Operating Procedures")
  }

  const handleDragOver = (e: any) => { e.preventDefault(); setIsDragging(true) }
  const handleDragLeave = (e: any) => { e.preventDefault(); setIsDragging(false) }
  const handleDrop = (e: any) => { e.preventDefault(); setIsDragging(false); setUploadModalOpen(true) }

  return (
    <div className="flex flex-col h-full overflow-hidden" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      
      {isDragging && (
        <div className="absolute inset-0 z-50 bg-primary/20 backdrop-blur-sm border-4 border-dashed border-primary flex items-center justify-center pointer-events-none">
          <div className="bg-card p-6 rounded-xl shadow-2xl flex flex-col items-center">
            <Upload className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-2xl font-bold text-primary">Drop files to upload</h2>
            <p className="text-muted-foreground mt-2">PDF, DOCX, XLSX, PNG, JPG supported</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-border shrink-0">
        <div>
          <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
            Dashboard <span className="text-border">/</span> Documents
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Documents</h1>
          <p className="text-sm text-muted-foreground mt-1">Store SOPs, contracts, and policies. Track versions and signatures.</p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" className="h-9 bg-card"><PenTool className="w-4 h-4 mr-2" /> Request Signature</Button>
            <Button variant="outline" className="h-9 bg-card"><LayoutTemplate className="w-4 h-4 mr-2" /> New from Template</Button>
            <Button variant="default" className="h-9 bg-primary text-primary-foreground font-bold" onClick={() => setUploadModalOpen(true)}>
              <Upload className="w-4 h-4 mr-2" /> Upload Document
            </Button>
          </div>
          
          <div className="flex gap-4 border-b border-border/50 overflow-x-auto w-full md:w-auto scrollbar-hide">
            {[
              { id: "library", label: "Library" },
              { id: "signatures", label: "Signatures" },
              { id: "acknowledgments", label: "Acknowledgments" },
              { id: "templates", label: "Templates" },
              { id: "activity", label: "Activity" }
            ].map(tab => (
              <button 
                key={tab.id} 
                onClick={() => setTab(tab.id)} 
                className={`pb-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Summary Strip */}
      <div className="flex gap-4 py-4 overflow-x-auto scrollbar-hide shrink-0 border-b border-border/50">
        <SummaryBadge label="Total Documents" val={visibleDocs.length} />
        <SummaryBadge label="Expiring in 30 days" val={visibleDocs.filter(d => d.status === "Expiring soon").length} variant="warning" />
        <SummaryBadge label="Expired" val={visibleDocs.filter(d => d.status === "Expired").length} variant="destructive" />
        <SummaryBadge label="Awaiting Signature" val={mockSignatures.filter(s => s.status === "Awaiting signature").length} />
        <SummaryBadge label="Storage Used" val="4.2 GB of 10 GB" />
      </div>

      <div className="flex-1 overflow-auto relative flex">
        {activeTab === "library" && <LibraryTab docs={visibleDocs} role={role} activeCategory={activeCategory} setActiveCategory={setActiveCategory} searchQuery={searchQuery} setSearchQuery={setSearchQuery} viewMode={viewMode} setViewMode={setViewMode} onOpen={(d:any) => { setSelectedDoc(d); setDocDrawerOpen(true); }} />}
        {activeTab === "signatures" && <SignaturesTab />}
        {activeTab === "acknowledgments" && <AcknowledgmentsTab />}
        {activeTab === "templates" && <TemplatesTab />}
        {activeTab === "activity" && <ActivityTab />}
      </div>
      
      <DocumentDrawer open={docDrawerOpen} onClose={closeDrawer} doc={selectedDoc} />
      <UploadModal open={uploadModalOpen} onClose={() => setUploadModalOpen(false)} />
    </div>
  )
}

function SummaryBadge({ label, val, variant = "default" }: any) {
  const colors = {
    default: "bg-muted text-foreground border-border",
    warning: "bg-warning/10 text-warning border-warning/30",
    destructive: "bg-destructive/10 text-destructive border-destructive/30"
  }[variant as string]
  
  return (
    <div className={`px-3 py-1.5 rounded-lg border text-sm flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors hover:brightness-95 ${colors}`}>
      <span className="font-semibold">{val}</span> <span className="text-xs opacity-80">{label}</span>
    </div>
  )
}

function LibraryTab({ docs, role, activeCategory, setActiveCategory, searchQuery, setSearchQuery, viewMode, setViewMode, onOpen }: any) {
  
  const allowedCategories = ALL_CATEGORIES.filter(c => {
    if (c.restricted && role !== "Owner" && role !== "Manager") return false;
    if (role === "Housekeeping" && c.id !== "all" && c.id !== "Standard Operating Procedures") return false;
    return true;
  })
  
  const filteredDocs = docs.filter((d: any) => {
    if (activeCategory !== "all" && activeCategory !== "archive") {
      if (d.category !== activeCategory) return false;
    }
    if (activeCategory === "archive" && d.status !== "Archived") return false;
    if (searchQuery && !d.name.toLowerCase().includes(searchQuery.toLowerCase()) && !d.tags.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()))) return false;
    return true;
  })

  return (
    <div className="flex flex-1 w-full h-full pt-4">
      
      {/* Left Panel: Categories */}
      <div className="w-64 shrink-0 pr-4 border-r border-border hidden md:flex flex-col gap-1 overflow-y-auto">
        <div className="font-bold text-sm mb-2 px-2">Document Categories</div>
        {allowedCategories.map(cat => {
          const count = cat.id === "all" ? docs.length : cat.id === "archive" ? mockDocuments.filter(d => d.status === "Archived").length : docs.filter((d:any) => d.category === cat.id).length
          const isActive = activeCategory === cat.id
          
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center justify-between px-2 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-primary/10 text-primary font-bold' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
            >
              <div className="flex items-center gap-2">
                <cat.icon className={`w-4 h-4 ${isActive ? 'fill-primary/20' : ''}`} />
                <span className="truncate max-w-[140px] text-left">{cat.label}</span>
              </div>
              <span className="text-xs opacity-70">{count}</span>
            </button>
          )
        })}
      </div>

      {/* Right Panel: Document List */}
      <div className="flex-1 pl-0 md:pl-6 flex flex-col h-full overflow-hidden pb-8">
        <div className="flex items-center justify-between mb-4 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name, tag, or content..." 
              className="pl-9 h-9 bg-card" 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="h-9 w-9"><Filter className="w-4 h-4" /></Button>
            <div className="flex bg-muted rounded-md border border-border p-0.5">
              <button className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`} onClick={() => setViewMode('list')}><List className="w-4 h-4" /></button>
              <button className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`} onClick={() => setViewMode('grid')}><LayoutGrid className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {filteredDocs.length === 0 ? (
          <EmptyState title="No documents found" description="Adjust your filters or upload a new document." icon={FileText} />
        ) : viewMode === 'list' ? (
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col flex-1">
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/30 text-xs uppercase text-muted-foreground border-b border-border sticky top-0 backdrop-blur-md">
                  <tr>
                    <th className="px-4 py-3 font-medium w-8"><input type="checkbox" className="accent-primary" /></th>
                    <th className="px-4 py-3 font-medium min-w-[200px]">Name <ArrowUpDown className="inline w-3 h-3 ml-1" /></th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Author/Owner</th>
                    <th className="px-4 py-3 font-medium">Last Modified</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocs.map((doc: any) => {
                    const author = mockStaff.find(s => s.id === doc.owner)?.name || "Unknown"
                    return (
                      <tr key={doc.id} className="border-b border-border hover:bg-muted/30 cursor-pointer" onClick={() => onOpen(doc)}>
                        <td className="px-4 py-3" onClick={e => e.stopPropagation()}><input type="checkbox" className="accent-primary" /></td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <div className="font-semibold text-foreground flex items-center gap-2">
                              <DocIcon type={doc.type} />
                              <span className="truncate max-w-[200px]" title={doc.name}>{doc.name}</span>
                            </div>
                            <div className="flex gap-1 mt-1">
                              {doc.tags.slice(0, 2).map((t: string) => <span key={t} className="text-[9px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{t}</span>)}
                              {doc.tags.length > 2 && <span className="text-[9px] text-muted-foreground">+{doc.tags.length - 2}</span>}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{doc.category}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{author}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{formatDistanceToNow(parseISO(doc.lastModified), {addSuffix: true})}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{formatFileSize(doc.size)}</td>
                        <td className="px-4 py-3"><DocStatusBadge status={doc.status} /></td>
                        <td className="px-4 py-3 text-right" onClick={e => e.stopPropagation()}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="w-4 h-4" /></Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => onOpen(doc)}><Eye className="w-4 h-4 mr-2"/> Preview</DropdownMenuItem>
                              <DropdownMenuItem><Download className="w-4 h-4 mr-2"/> Download</DropdownMenuItem>
                              <DropdownMenuItem><PenTool className="w-4 h-4 mr-2"/> Request Signature</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive"><Trash2 className="w-4 h-4 mr-2"/> Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className="p-3 border-t border-border flex justify-between items-center text-xs text-muted-foreground bg-muted/10">
              <div>Showing {filteredDocs.length} documents</div>
              <div className="flex items-center gap-2">
                <span>Rows per page: 25</span>
                <span>Page 1 of 1</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto pb-4">
            {filteredDocs.map((doc: any) => (
              <div key={doc.id} className="bg-card border border-border rounded-xl p-3 flex flex-col hover:border-primary/40 cursor-pointer shadow-sm" onClick={() => onOpen(doc)}>
                <div className="h-32 bg-muted rounded-lg mb-3 flex items-center justify-center border border-border/50">
                  <DocIcon type={doc.type} size="lg" />
                </div>
                <div className="font-bold text-sm line-clamp-1" title={doc.name}>{doc.name}</div>
                <div className="text-xs text-muted-foreground mt-1 mb-2 line-clamp-1">{doc.category}</div>
                <div className="mt-auto pt-2 border-t border-border flex justify-between items-center">
                  <DocStatusBadge status={doc.status} />
                  <span className="text-[10px] text-muted-foreground">{formatFileSize(doc.size)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function DocIcon({ type, size = "sm" }: { type: string, size?: "sm" | "lg" }) {
  const cn = size === "sm" ? "w-4 h-4" : "w-12 h-12"
  if (type === "PDF") return <FileText className={`${cn} text-destructive`} />
  if (type === "DOCX") return <File className={`${cn} text-blue-500`} />
  if (type === "XLSX") return <FileType2 className={`${cn} text-success`} />
  if (type === "Image" || type === "PNG" || type === "JPG") return <ImageIcon className={`${cn} text-purple-500`} />
  if (type === "Link") return <LinkIcon className={`${cn} text-muted-foreground`} />
  return <File className={`${cn} text-muted-foreground`} />
}

function DocStatusBadge({ status }: { status: string }) {
  if (status === 'Current') return <Badge variant="outline" className="bg-success/10 text-success border-success/30 text-[10px]"><CheckCircle2 className="w-3 h-3 mr-1"/> Current</Badge>
  if (status === 'Expiring soon') return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30 text-[10px]"><FileWarning className="w-3 h-3 mr-1"/> Expiring soon</Badge>
  if (status === 'Expired') return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30 text-[10px]"><ShieldAlert className="w-3 h-3 mr-1"/> Expired</Badge>
  if (status === 'Draft') return <Badge variant="outline" className="bg-muted text-muted-foreground border-border text-[10px]"><PenTool className="w-3 h-3 mr-1"/> Draft</Badge>
  if (status === 'In review') return <Badge variant="outline" className="bg-brand-gold/10 text-brand-gold border-brand-gold/30 text-[10px]"><Clock className="w-3 h-3 mr-1"/> In review</Badge>
  if (status === 'Archived') return <Badge variant="outline" className="bg-muted/50 text-muted-foreground border-transparent text-[10px]"><Archive className="w-3 h-3 mr-1"/> Archived</Badge>
  return <Badge variant="outline">{status}</Badge>
}

function DocumentDrawer({ open, onClose, doc }: any) {
  const [tab, setTab] = useState("preview")
  
  if (!doc) return null
  
  const author = mockStaff.find(s => s.id === doc.owner)?.name || "Unknown"

  return (
    <Drawer open={open} onClose={onClose} title="Document Details">
      <div className="flex flex-col h-full space-y-4">
        
        {/* Header Info */}
        <div className="flex gap-4 items-start">
          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0 border border-border">
            <DocIcon type={doc.type} size="lg" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-foreground">{doc.name}</h2>
            <div className="text-sm text-muted-foreground">{doc.category} • {doc.version}</div>
            <div className="flex gap-2 mt-2">
              <DocStatusBadge status={doc.status} />
              <Badge variant="secondary" className="text-[10px]">{formatFileSize(doc.size)}</Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8"><Download className="w-4 h-4 mr-2" /> Download</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="outline" size="icon" className="h-8 w-8"><MoreVertical className="w-4 h-4" /></Button></DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem><Share2 className="w-4 h-4 mr-2"/> Share Link</DropdownMenuItem>
                <DropdownMenuItem><PenTool className="w-4 h-4 mr-2"/> Request Signature</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Upload className="w-4 h-4 mr-2"/> Upload New Version</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Drawer Tabs */}
        <div className="flex gap-4 border-b border-border">
          {['preview', 'details', 'versions', 'signatures', 'activity'].map(t => (
            <button 
              key={t} 
              onClick={() => setTab(t)}
              className={`pb-2 text-sm font-medium border-b-2 capitalize ${tab === t ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          {tab === 'preview' && (
            <div className="w-full h-[500px] bg-muted/30 border border-border rounded-lg flex items-center justify-center">
              <div className="text-center">
                <FileText className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground font-semibold">Preview not available for mock document</p>
                <Button variant="outline" className="mt-4"><Download className="w-4 h-4 mr-2" /> Download to view</Button>
              </div>
            </div>
          )}

          {tab === 'details' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card border border-border p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground">Owner</div>
                  <div className="font-semibold text-sm mt-1">{author}</div>
                </div>
                <div className="bg-card border border-border p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground">Effective Date</div>
                  <div className="font-semibold text-sm mt-1">{doc.effectiveDate ? formatDistanceToNow(parseISO(doc.effectiveDate), {addSuffix:true}) : 'N/A'}</div>
                </div>
                <div className="bg-card border border-border p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground">Expiry Date</div>
                  <div className="font-semibold text-sm mt-1">{doc.expiryDate ? formatDistanceToNow(parseISO(doc.expiryDate), {addSuffix:true}) : 'N/A'}</div>
                </div>
                <div className="bg-card border border-border p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground">Visibility</div>
                  <div className="font-semibold text-sm mt-1">All Staff</div>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-sm mb-2">Tags</h4>
                <div className="flex gap-2">
                  {doc.tags.map((t: string) => <Badge key={t} variant="secondary">{t}</Badge>)}
                </div>
              </div>
            </div>
          )}

          {tab === 'versions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-card">
                <div>
                  <div className="font-bold flex items-center gap-2">{doc.version} <Badge className="bg-success/20 text-success hover:bg-success/20">Current</Badge></div>
                  <div className="text-xs text-muted-foreground mt-1">Uploaded by {author} • {formatDistanceToNow(parseISO(doc.lastModified), {addSuffix:true})}</div>
                  <div className="text-xs mt-2 italic">"Updated clause 4.2 for new compliance rules"</div>
                </div>
                <Button variant="outline" size="sm">Download</Button>
              </div>
              <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-card opacity-70">
                <div>
                  <div className="font-bold text-muted-foreground">v1.0</div>
                  <div className="text-xs text-muted-foreground mt-1">Uploaded by {author} • 1 year ago</div>
                  <div className="text-xs mt-2 italic">"Initial upload"</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-7 text-xs">Restore</Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">Download</Button>
                </div>
              </div>
            </div>
          )}

          {tab === 'signatures' && (
            <EmptyState title="No Signatures" description="This document hasn't been sent for signature." icon={FileSignature} />
          )}
          
          {tab === 'activity' && (
            <EmptyState title="No Recent Activity" description="Audit log will appear here." icon={FileClock} />
          )}
        </div>
      </div>
    </Drawer>
  )
}

function UploadModal({ open, onClose }: any) {
  /* NOTE FOR FUTURE IMPLEMENTATION:
   * Real upload logic must implement encrypted storage, virus scanning, 
   * signed expiring download URLs, and server-side permission checks.
   * File contents should never be stored in local storage.
   * A tamper-evident audit log must record all accesses. 
   */
  return (
    <Modal open={open} onClose={onClose} title="Upload Document">
      <div className="space-y-4">
        <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:bg-muted/30 transition-colors cursor-pointer">
          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-bold mb-1">Click or drag files here</h3>
          <p className="text-xs text-muted-foreground">Max size 25MB. PDF, DOCX, XLSX, PNG.</p>
        </div>
        
        <div className="bg-warning/10 border border-warning/30 p-3 rounded-lg text-xs text-warning flex gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>Note: Uploads are mocked for this demo. Metadata will not persist to the database.</span>
        </div>

        <div className="pt-4 border-t border-border flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Done</Button>
        </div>
      </div>
    </Modal>
  )
}

function SignaturesTab() {
  return (
    <div className="flex flex-col h-full w-full pt-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-lg">Signature Requests</h2>
        <Button size="sm"><PenTool className="w-4 h-4 mr-2" /> New Request</Button>
      </div>
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex-1">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/30 text-xs uppercase text-muted-foreground border-b border-border">
            <tr>
              <th className="px-4 py-3 font-medium">Document</th>
              <th className="px-4 py-3 font-medium">Signer</th>
              <th className="px-4 py-3 font-medium">Sent</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {mockSignatures.map(sig => {
              const doc = mockDocuments.find(d => d.id === sig.docId)
              return (
                <tr key={sig.id} className="border-b border-border">
                  <td className="px-4 py-3 font-semibold">{doc?.name}</td>
                  <td className="px-4 py-3">{sig.signer}</td>
                  <td className="px-4 py-3 text-muted-foreground">{formatDistanceToNow(parseISO(sig.sentAt), {addSuffix:true})}</td>
                  <td className="px-4 py-3">
                    {sig.status === 'Signed' ? <Badge className="bg-success/10 text-success border-success/30 hover:bg-success/10">Signed</Badge> : <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">Awaiting</Badge>}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm">Remind</Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AcknowledgmentsTab() {
  return (
    <div className="flex flex-col h-full w-full pt-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-lg">Policy Acknowledgments</h2>
      </div>
      <div className="bg-card border border-border rounded-xl shadow-sm p-6 flex flex-col items-center justify-center text-center h-64">
        <CheckSquare className="w-12 h-12 text-muted-foreground/30 mb-4" />
        <h3 className="font-bold text-lg">Tracker Active</h3>
        <p className="text-muted-foreground max-w-sm mt-2">Staff members have 2 pending acknowledgments for the Employee Handbook 2024.</p>
        <Button variant="outline" className="mt-4">Send Reminders</Button>
      </div>
    </div>
  )
}

function TemplatesTab() {
  return (
    <div className="flex flex-col h-full w-full pt-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-lg">Document Templates</h2>
        <Button size="sm"><Plus className="w-4 h-4 mr-2" /> Create Template</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {mockDocumentTemplates.map(tpl => (
          <div key={tpl.id} className="bg-card border border-border rounded-xl p-4 shadow-sm hover:border-primary/40 flex flex-col">
            <Badge variant="secondary" className="w-fit text-[10px] mb-2">{tpl.category}</Badge>
            <h3 className="font-bold text-sm mb-1">{tpl.name}</h3>
            <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{tpl.description}</p>
            <div className="mt-auto flex justify-between items-center border-t border-border pt-3">
              <span className="text-[10px] text-muted-foreground">Contains merge fields</span>
              <Button size="sm" className="h-7 text-xs">Use Template</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ActivityTab() {
  return (
    <div className="flex flex-col h-full w-full pt-4">
      <EmptyState title="Audit Log" description="All document creations, views, downloads, and signature events are logged securely here for compliance." icon={Activity} />
    </div>
  )
}
