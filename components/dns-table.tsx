"use client"

import { motion } from "framer-motion"
import { Server } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DnsRecord {
  type: string
  value: string
}

interface DnsTableProps {
  records: DnsRecord[]
}

const typeColorMap: Record<string, string> = {
  A:     "border-primary/30 bg-primary/10 text-primary",
  AAAA:  "border-chart-5/30 bg-chart-5/10 text-chart-5",
  CNAME: "border-success/30 bg-success/10 text-success",
  MX:    "border-chart-3/30 bg-chart-3/10 text-chart-3",
  TXT:   "border-chart-4/30 bg-chart-4/10 text-chart-4",
  NS:    "border-muted-foreground/30 bg-muted-foreground/10 text-muted-foreground",
  SOA:   "border-destructive/30 bg-destructive/10 text-destructive",
  SRV:   "border-chart-1/30 bg-chart-1/10 text-chart-1",
  PTR:   "border-chart-2/30 bg-chart-2/10 text-chart-2",
  CAA:   "border-primary/30 bg-primary/10 text-primary",
}

export function DnsTable({ records }: DnsTableProps) {
  if (!records || records.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      whileHover={{ y: -1 }}
    >
      <Card className="border-border/60 bg-card/80 backdrop-blur-sm transition-shadow hover:shadow-lg hover:shadow-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-card-foreground">
            <span className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
                <Server className="h-4 w-4 text-primary" />
              </span>
              DNS Configurations
            </span>
            <span className="font-mono text-xs font-normal text-muted-foreground/50">
              {records.length} record{records.length !== 1 ? "s" : ""}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Scrollable container for unlimited rows */}
          <div className="overflow-hidden rounded-xl border border-border/40">
            <div className="max-h-[420px] overflow-y-auto scrollbar-thin">
              <Table>
                <TableHeader className="sticky top-0 z-10">
                  <TableRow className="border-border/40 bg-secondary/60 hover:bg-secondary/60">
                    <TableHead className="w-[140px] pl-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                      Type
                    </TableHead>
                    <TableHead className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                      Value
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((record, index) => (
                    <motion.tr
                      key={`${record.type}-${index}`}
                      data-slot="table-row"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.08 }}
                      className="border-b border-border/30 transition-colors hover:bg-secondary/30"
                    >
                      <TableCell className="pl-4">
                        <span
                          className={`inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wider ${
                            typeColorMap[record.type] || typeColorMap.NS
                          }`}
                        >
                          {record.type}
                        </span>
                      </TableCell>
                      <TableCell className="font-mono text-sm text-card-foreground/90 break-all">
                        {record.value}
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
