"use client"

import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

const data = [
  { date: "1月", weight: 85 },
  { date: "2月", weight: 90 },
  { date: "3月", weight: 90 },
  { date: "4月", weight: 95 },
  { date: "5月", weight: 100 },
  { date: "6月", weight: 105 },
]

export function TrainingProgressChart() {
  return (
    <Card className="w-full h-full">
      <CardHeader className="text-center p-4">
        <CardTitle className="text-sm sm:text-base">トレーニング進捗</CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-4">
        <ChartContainer
          config={{
            weight: {
              label: "重量 (kg)",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="w-full h-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              width={200}
              height={500}
              data={data} 
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                dy={10}
              />
              <YAxis 
                width={30}
                height={20}
                tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `${value}`}
                domain={[80, 110]}
                ticks={[80, 90, 95, 100, 105]}
                tickCount={5}
              />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              重量
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[0].value}kg
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              日付
                            </span>
                            <span className="font-bold">
                              {payload[0].payload.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line 
                type="monotone" 
                dataKey="weight" 
                strokeWidth={2} 
                dot={{ r: 2 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

