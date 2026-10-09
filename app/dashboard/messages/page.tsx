"use client"

import { useState, useEffect, useRef } from "react"
import { 
  MessageSquare, Mail, Phone, Globe, Lock, Search, Filter, MoreVertical, 
  Send, Paperclip, Smile, AlignLeft, Bold, Italic, Link2, List as ListIcon,
  CheckCircle2, AlertCircle, User, Calendar, CreditCard, ChevronDown, Check,
  Clock, CheckCheck, X, FileText, Wrench, Settings, Plus, RotateCw, Hash
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { Drawer, Modal, ConfirmDialog, Skeleton, EmptyState } from "@/components/ui/Feedback"
import { 
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, 
  DropdownMenuItem, DropdownMenuSeparator 
} from "@/components/ui/DropdownMenu"
import { 
  mockConversations, mockChannels, mockTemplates, mockGuests, mockRooms, 
  mockStaff, mockReservations, mockAutomations
} from "@/lib/mock-data"
import { formatDate, formatDateTime, formatCurrency } from "@/lib/formatters"
import { formatDistanceToNow, isToday, isYesterday, parseISO } from "date-fns"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useTenant } from "@/providers/TenantProvider"

const CHANNEL_ICONS: Record<string, any> = {
  "all": MessageSquare,
  "sms": MessageSquare,
  "email": Mail,
  "whatsapp": Phone,
  "booking": Globe,
  "airbnb": Globe,
  "expedia": Globe,
  "direct": Globe
}

function formatMsgTime(iso: string, mounted: boolean) {
  if (!mounted) return ""
  const date = parseISO(iso)
  if (isToday(date)) return formatDate(iso).split(", ")[1] || "Today"
  if (isYesterday(date)) return "Yesterday"
  return formatDate(iso).split(",")[0]
}

export default function MessagesPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { role } = useTenant()
  const convIdParam = searchParams?.get("conversation")
  const guestIdParam = searchParams?.get("guest")

  const [mounted, setMounted] = useState(false)
  const [activeMode, setActiveMode] = useState<"Inbox" | "Automations">("Inbox")
  const [activeChannel, setActiveChannel] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null)
  
  // Composer state
  const [composerText, setComposerText] = useState("")
  const [isInternal, setIsInternal] = useState(false)
  const [conversations, setConversations] = useState<any[]>(mockConversations)
  
  // UI Panels
  const [detailsOpen, setDetailsOpen] = useState(true)
  const [mobileView, setMobileView] = useState<"list" | "thread" | "details">("list")
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    if (convIdParam) {
      setSelectedConvId(convIdParam)
      setMobileView("thread")
    } else if (guestIdParam) {
      const conv = mockConversations.find(c => c.guestId === guestIdParam)
      if (conv) {
        setSelectedConvId(conv.id)
        setMobileView("thread")
      } else {
        setSelectedConvId(mockConversations[0]?.id || null)
      }
    } else if (mockConversations.length > 0) {
      setSelectedConvId(mockConversations[0].id)
    }
  }, [convIdParam, guestIdParam])

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [selectedConvId, conversations])

  const filteredConvs = conversations.filter(c => {
    if (role === "Housekeeping" && !c.tags.includes("Housekeeping") && c.assigneeId !== "S-03" && c.assigneeId !== "S-02") return false;
    
    if (activeChannel !== "all" && c.channel !== activeChannel) return false
    
    if (searchQuery) {
      const guest = mockGuests.find(g => g.id === c.guestId)
      const matchesName = guest?.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesMsg = c.messages.some((m: any) => m.text.toLowerCase().includes(searchQuery.toLowerCase()))
      if (!matchesName && !matchesMsg) return false
    }
    return true
  }).sort((a, b) => {
    const aLast = a.messages[a.messages.length - 1].time
    const bLast = b.messages[b.messages.length - 1].time
    return new Date(bLast).getTime() - new Date(aLast).getTime()
  })

  const selectedConv = conversations.find(c => c.id === selectedConvId)
  const selectedGuest = selectedConv ? mockGuests.find(g => g.id === selectedConv.guestId) : null
  const selectedRes = selectedConv ? mockReservations.find(r => r.guestId === selectedConv.guestId) : null
  const selectedRoom = selectedRes ? mockRooms.find(r => r.id === selectedRes.roomId) : null

  const handleSendMessage = () => {
    if (!composerText.trim() || !selectedConvId) return
    
    setConversations(prev => prev.map(c => {
      if (c.id === selectedConvId) {
        return {
          ...c,
          status: isInternal ? c.status : "Pending",
          messages: [...c.messages, {
            id: `M-${Date.now()}`,
            senderType: isInternal ? "system" : "staff",
            text: composerText,
            time: new Date().toISOString(),
            read: true,
            delivery: "Sent",
            staffId: "S-01",
            isInternal
          }]
        }
      }
      return c
    }))
    setComposerText("")
    
    // Simulate delivery update
    setTimeout(() => {
      setConversations(prev => prev.map(c => {
        if (c.id === selectedConvId) {
          const msgs = [...c.messages]
          const lastMsg = msgs[msgs.length - 1]
          if (lastMsg && lastMsg.delivery === "Sent") {
            lastMsg.delivery = "Delivered"
          }
          return { ...c, messages: msgs }
        }
        return c
      }))
    }, 1500)
  }

  const handleTemplateInsert = (templateContent: string) => {
    let text = templateContent
    if (selectedGuest) text = text.replace(/{guest_name}/g, selectedGuest.name.split(" ")[0])
    text = text.replace(/{hotel_name}/g, "vProfessional")
    if (selectedRoom) text = text.replace(/{room}/g, selectedRoom.number)
    if (selectedRes) {
      text = text.replace(/{checkin_date}/g, formatDate(selectedRes.checkIn))
      text = text.replace(/{checkout_date}/g, formatDate(selectedRes.checkOut))
    }
    setComposerText(text)
  }

  const markConvRead = (id: string) => {
    setConversations(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, messages: c.messages.map((m: any) => ({ ...m, read: true })) }
      }
      return c
    }))
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-border shrink-0">
        <div>
          <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">Dashboard <span className="text-border">/</span> Guest Messages</div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Guest Messages</h1>
          <p className="text-sm text-muted-foreground mt-1">Communicate directly with guests across multiple channels.</p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" className="h-9">Mark all as read</Button>
            <Button variant="default" className="h-9 bg-[var(--primary)] text-[var(--primary-foreground)]">
              <Plus className="w-4 h-4 mr-2" /> New Message
            </Button>
          </div>
          
          <div className="flex gap-4 border-b border-border/50">
            {["Inbox", "Automations"].map(mode => (
              <button 
                key={mode} 
                onClick={() => setActiveMode(mode as any)} 
                className={`pb-2 text-sm font-medium border-b-2 transition-colors ${activeMode === mode ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeMode === "Inbox" && (
        <div className="flex-1 overflow-hidden flex pt-4 gap-4 h-full relative">
          
          {/* Channel Rail */}
          <div className="w-[60px] md:w-[160px] shrink-0 flex flex-col gap-2 overflow-y-auto scrollbar-hide border-r border-border pr-2">
            {mockChannels.map(ch => {
              const Icon = CHANNEL_ICONS[ch.id] || Globe
              const unreadCount = conversations.filter(c => (ch.id === "all" || c.channel === ch.id) && c.messages.some((m: any) => !m.read && m.senderType === "guest")).length
              
              return (
                <button 
                  key={ch.id}
                  onClick={() => { if (ch.connected) setActiveChannel(ch.id) }}
                  className={`flex flex-col md:flex-row items-center md:justify-between p-2 md:px-3 md:py-2.5 rounded-lg transition-all group ${!ch.connected ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${activeChannel === ch.id ? 'bg-primary/10 text-primary border border-primary/20 font-semibold' : 'hover:bg-muted text-muted-foreground'}`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className="hidden md:block text-sm">{ch.name}</span>
                  </div>
                  {ch.connected ? (
                    unreadCount > 0 && <Badge className="mt-1 md:mt-0 px-1.5 h-5 text-[10px] md:text-xs bg-primary text-primary-foreground">{unreadCount}</Badge>
                  ) : (
                    <div className="hidden md:flex items-center gap-1.5">
                      <Lock className="w-3 h-3 text-muted-foreground" />
                      <button onClick={(e) => { e.stopPropagation(); window.location.href = "/dashboard/integrations" }} className="text-[10px] text-primary hover:underline">Connect</button>
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Conversation List */}
          <div className={`w-full md:w-[320px] shrink-0 flex flex-col border-r border-border pr-4 gap-3 overflow-hidden ${mobileView !== 'list' ? 'hidden md:flex' : 'flex'}`}>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search Inbox..." 
                  className="pl-9 h-9 bg-card text-sm" 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="h-9 w-9 shrink-0"><Filter className="w-4 h-4" /></Button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pb-4 scrollbar-hide">
              {filteredConvs.length === 0 && (
                <EmptyState title="No messages" description="You're all caught up in this channel." icon={MessageSquare} />
              )}
              {filteredConvs.map(conv => {
                const guest = mockGuests.find(g => g.id === conv.guestId)
                const res = mockReservations.find(r => r.guestId === conv.guestId)
                const room = res ? mockRooms.find(r => r.id === res.roomId) : null
                const lastMsg = conv.messages[conv.messages.length - 1]
                const isUnread = conv.messages.some((m: any) => !m.read && m.senderType === "guest")
                const assignee = mockStaff.find(s => s.id === conv.assigneeId)
                const ChannelIcon = CHANNEL_ICONS[conv.channel] || Globe
                const isSelected = selectedConvId === conv.id
                
                return (
                  <div 
                    key={conv.id}
                    onClick={() => { setSelectedConvId(conv.id); markConvRead(conv.id); setMobileView("thread") }}
                    className={`p-3 rounded-lg border cursor-pointer transition-all relative ${isSelected ? 'bg-card border-primary/50 shadow-sm ring-1 ring-primary/20' : 'bg-transparent border-transparent hover:bg-muted/50'}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2 overflow-hidden">
                        {isUnread && <div className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                        <span className={`font-semibold text-sm truncate ${isUnread ? 'text-foreground' : 'text-foreground/80'}`}>{guest?.name}</span>
                        <Badge variant="outline" className="text-[9px] h-4 px-1">{room ? `Rm ${room.number}` : 'Upcoming'}</Badge>
                      </div>
                      <span className="text-[10px] text-muted-foreground shrink-0 ml-2 whitespace-nowrap">{formatMsgTime(lastMsg.time, mounted)}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-1.5">
                      <ChannelIcon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <p className={`text-xs truncate ${isUnread ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{lastMsg.senderType === "staff" ? "You: " : ""}{lastMsg.text}</p>
                    </div>
                    
                    {assignee && (
                      <div className="absolute bottom-2 right-2 flex items-center justify-center w-5 h-5 rounded-full bg-muted text-[9px] font-bold border border-border" title={`Assigned to ${assignee.name}`}>
                        {assignee.avatar}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Message Thread */}
          <div className={`flex-1 flex flex-col overflow-hidden bg-card border border-border rounded-xl shadow-sm relative ${mobileView !== 'thread' ? 'hidden md:flex' : 'flex z-10'}`}>
            {selectedConv && selectedGuest ? (
              <>
                {/* Thread Header */}
                <div className="h-[60px] border-b border-border flex items-center justify-between px-4 shrink-0 bg-muted/10">
                  <div className="flex items-center gap-3">
                    <button className="md:hidden p-2 -ml-2 text-muted-foreground" onClick={() => setMobileView("list")}><ChevronDown className="w-5 h-5 rotate-90" /></button>
                    <div>
                      <div className="font-bold text-sm flex items-center gap-2">
                        {selectedGuest.name}
                        {selectedRoom && <Badge variant="outline" className="h-5 text-[10px]">Rm {selectedRoom.number}</Badge>}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                        <Badge variant="secondary" className="h-4 text-[9px] px-1 bg-muted">{selectedConv.channel.toUpperCase()}</Badge>
                        <span>•</span>
                        <span className={selectedConv.status === "Resolved" ? "text-success" : "text-warning"}>{selectedConv.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="w-4 h-4" /></Button>
                    <button className="md:hidden p-2 text-muted-foreground" onClick={() => setMobileView("details")}><Settings className="w-5 h-5" /></button>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedConv.messages.map((msg: any, i: number) => {
                    const isStaff = msg.senderType === "staff"
                    const isInternal = msg.isInternal
                    const staff = msg.staffId ? mockStaff.find(s => s.id === msg.staffId) : null
                    
                    return (
                      <div key={msg.id} className={`flex flex-col max-w-[85%] ${isStaff || isInternal ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
                        {isInternal && <div className="text-[10px] uppercase font-bold text-warning mb-1 flex items-center"><Lock className="w-3 h-3 mr-1"/> Internal Note</div>}
                        
                        <div className={`p-3 rounded-2xl text-sm shadow-sm relative group
                          ${isInternal ? 'bg-warning/10 border border-warning/30 text-warning-foreground rounded-br-sm' : 
                            isStaff ? 'bg-primary text-primary-foreground rounded-br-sm' : 
                            'bg-muted/50 border border-border text-foreground rounded-bl-sm'}`}
                        >
                          {msg.text}
                          {msg.hasAttachment && (
                            <div className="mt-2 p-2 bg-background/20 rounded flex items-center gap-2 cursor-pointer border border-border/20">
                              <FileText className="w-4 h-4" />
                              <span className="text-xs underline">Folio.pdf</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1.5 mt-1 text-[10px] text-muted-foreground px-1">
                          {isStaff || isInternal ? (
                            <>
                              <span>{formatMsgTime(msg.time, mounted)}</span>
                              <span>•</span>
                              <span>{staff?.name || "Staff"}</span>
                              {!isInternal && msg.delivery && (
                                <>
                                  <span>•</span>
                                  {msg.delivery === "Sent" ? <Check className="w-3 h-3" /> : <CheckCheck className={`w-3 h-3 ${msg.delivery === "Read" ? "text-primary" : ""}`} />}
                                </>
                              )}
                            </>
                          ) : (
                            <span>{formatMsgTime(msg.time, mounted)}</span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Composer */}
                <div className="p-3 border-t border-border bg-card shrink-0">
                  <div className={`border border-border rounded-xl flex flex-col overflow-hidden focus-within:ring-1 focus-within:ring-primary ${isInternal ? 'bg-warning/5 border-warning/30' : 'bg-background'}`}>
                    {/* Toolbar */}
                    <div className="flex items-center gap-1 p-1.5 border-b border-border/50 bg-muted/20">
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground"><Bold className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground"><Italic className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground"><Link2 className="w-3.5 h-3.5" /></Button>
                      <div className="w-px h-4 bg-border mx-1" />
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground"><ListIcon className="w-3.5 h-3.5" /></Button>
                      
                      <div className="flex-1" />
                      
                      <div className="flex bg-muted/50 rounded-lg p-0.5 border border-border">
                        <button onClick={() => setIsInternal(false)} className={`px-2 py-1 text-[10px] font-bold rounded ${!isInternal ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}>Reply</button>
                        <button onClick={() => setIsInternal(true)} className={`px-2 py-1 text-[10px] font-bold rounded ${isInternal ? 'bg-warning/20 text-warning shadow-sm' : 'text-muted-foreground'}`}>Internal</button>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <textarea 
                        value={composerText}
                        onChange={e => setComposerText(e.target.value)}
                        onKeyDown={e => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage() } }}
                        placeholder={isInternal ? "Write an internal note..." : `Reply to ${selectedGuest.name}...`}
                        className="w-full min-h-[80px] p-3 text-sm bg-transparent resize-none focus:outline-none pb-8"
                      />
                      {!isInternal && !composerText && (
                        <button 
                          onClick={() => setComposerText("Hi there! I'd be happy to help with that right away. Is there anything else you need?")} 
                          className="absolute bottom-2 left-3 text-[10px] bg-primary/10 text-primary border border-primary/20 px-2 py-1 rounded-md hover:bg-primary/20 transition-colors flex items-center gap-1"
                        >
                          <Smile className="w-3 h-3" /> Suggest reply
                        </button>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between p-2 border-t border-border/50 bg-muted/10">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><Paperclip className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><Smile className="w-4 h-4" /></Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 text-xs font-medium px-2"><FileText className="w-3.5 h-3.5 mr-1.5" /> Templates</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="w-64 max-h-[300px] overflow-y-auto">
                            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Quick-Reply Templates</div>
                            <DropdownMenuSeparator />
                            {mockTemplates.map(t => (
                              <DropdownMenuItem key={t.id} onClick={() => handleTemplateInsert(t.content)} className="flex flex-col items-start p-2 cursor-pointer">
                                <span className="font-bold text-sm">{t.title}</span>
                                <span className="text-[10px] text-muted-foreground line-clamp-1">{t.content}</span>
                              </DropdownMenuItem>
                            ))}
                            {(role === "Owner" || role === "Manager") && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-primary justify-center font-semibold cursor-pointer">
                                  Manage Templates
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-muted-foreground">{composerText.length} chars</span>
                        <Button onClick={handleSendMessage} disabled={!composerText.trim()} size="sm" className={`h-8 ${isInternal ? 'bg-warning text-warning-foreground hover:bg-warning/90' : 'bg-primary text-primary-foreground'}`}>
                          {isInternal ? "Add Note" : "Send"} <Send className="w-3 h-3 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <EmptyState title="No conversation selected" description="Select a thread from the inbox to start messaging." icon={MessageSquare} />
            )}
          </div>

          {/* Details Panel */}
          {detailsOpen && selectedGuest && selectedConv && (
            <div className={`w-[280px] xl:w-[320px] shrink-0 overflow-y-auto bg-card border-l border-border pl-4 space-y-6 pb-6 scrollbar-hide ${mobileView !== 'details' ? 'hidden lg:block' : 'block absolute inset-0 bg-background z-20 px-4'}`}>
              
              {mobileView === 'details' && (
                <div className="h-[60px] border-b border-border flex items-center mb-4">
                  <button className="p-2 -ml-2 text-muted-foreground" onClick={() => setMobileView("thread")}><ChevronDown className="w-5 h-5 rotate-90" /> Back to Thread</button>
                </div>
              )}

              {/* Guest Card */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xl font-bold border border-primary/30">
                    {selectedGuest.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-base leading-tight hover:underline cursor-pointer">{selectedGuest.name}</h3>
                    <div className="text-xs text-muted-foreground mt-0.5">{selectedGuest.status} Tier</div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground"><Mail className="w-4 h-4 shrink-0" /> <span className="truncate">{selectedGuest.email}</span></div>
                  <div className="flex items-center gap-2 text-muted-foreground"><Phone className="w-4 h-4 shrink-0" /> <span>{selectedGuest.phone}</span></div>
                  <div className="flex items-center gap-2 text-muted-foreground"><Globe className="w-4 h-4 shrink-0" /> <span>Language: English</span></div>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-3">
                  {selectedGuest.tags.map(tag => <Badge key={tag} variant="secondary" className="text-[10px] font-medium">{tag}</Badge>)}
                </div>
              </div>

              <div className="h-px bg-border w-full" />

              {/* Booking Summary */}
              <div>
                <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3 flex items-center justify-between">
                  Current Booking {selectedRes && <Badge variant="outline" className="text-[9px] font-normal">{selectedRes.id}</Badge>}
                </h4>
                
                {selectedRes ? (
                  <div className="bg-muted/20 border border-border rounded-lg p-3 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-sm">Room {selectedRoom?.number}</div>
                        <div className="text-[10px] text-muted-foreground uppercase">{selectedRoom?.type}</div>
                      </div>
                      <Badge className={selectedRes.status.includes('Check') ? 'bg-green-500/20 text-green-600' : 'bg-primary/20 text-primary'}>{selectedRes.status}</Badge>
                    </div>
                    
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between"><span className="text-muted-foreground">In:</span> <span className="font-semibold">{formatDate(selectedRes.checkIn)}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Out:</span> <span className="font-semibold">{formatDate(selectedRes.checkOut)}</span></div>
                    </div>
                    
                    <div className="pt-2 border-t border-border flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 h-7 text-[10px]">View Booking</Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm italic text-muted-foreground border border-dashed border-border rounded p-3 text-center">No active booking</div>
                )}
              </div>

              {/* Thread Controls */}
              <div>
                <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3">Conversation</h4>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-muted-foreground font-medium">Status</label>
                    <select className="w-full h-8 text-xs bg-card border border-border rounded-md px-2 focus:ring-1 focus:ring-primary outline-none">
                      <option>Open</option>
                      <option>Pending</option>
                      <option>Resolved</option>
                      <option>Snoozed</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-muted-foreground font-medium">Assignee</label>
                    <select className="w-full h-8 text-xs bg-card border border-border rounded-md px-2 focus:ring-1 focus:ring-primary outline-none">
                      <option>Unassigned</option>
                      {mockStaff.map(s => <option key={s.id}>{s.name}</option>)}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Button variant="outline" size="sm" className="h-8 text-[10px] bg-muted/30"><Wrench className="w-3 h-3 mr-1.5" /> Maint. Ticket</Button>
                  <Button variant="outline" size="sm" className="h-8 text-[10px] bg-muted/30"><CheckCircle2 className="w-3 h-3 mr-1.5" /> Task</Button>
                </div>
              </div>

            </div>
          )}
        </div>
      )}

      {/* Automations Tab Placeholder */}
      {activeMode === "Automations" && (
        <div className="flex-1 overflow-auto p-6 flex flex-col max-w-4xl mx-auto w-full">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold">Message Automations</h2>
              <p className="text-sm text-muted-foreground">Automatically send messages to guests based on booking lifecycle events.</p>
            </div>
            <Button>Create Rule</Button>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/30 text-xs uppercase text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-4 py-3 font-medium">Rule Name</th>
                  <th className="px-4 py-3 font-medium">Trigger</th>
                  <th className="px-4 py-3 font-medium">Template</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockAutomations.map(auto => (
                  <tr key={auto.id} className="border-b border-border hover:bg-muted/20">
                    <td className="px-4 py-4 font-semibold">{auto.name}</td>
                    <td className="px-4 py-4 text-muted-foreground flex items-center gap-2"><Clock className="w-4 h-4"/> {auto.trigger}</td>
                    <td className="px-4 py-4"><Badge variant="outline">{mockTemplates.find(t=>t.id === auto.templateId)?.title || "Custom"}</Badge></td>
                    <td className="px-4 py-4">
                      {auto.enabled ? <Badge className="bg-success text-success-foreground">Active</Badge> : <Badge variant="secondary">Disabled</Badge>}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  )
}
