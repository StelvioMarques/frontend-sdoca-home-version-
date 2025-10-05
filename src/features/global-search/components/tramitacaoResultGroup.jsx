import { Timeline, TimelineItem, TimelineSeparator, TimelineIndicator, TimelineHeader, TimelineTitle, TimelineContent, TimelineDate } from "@/components/ui/timeline"

export default function TramitationResult({ title, Icon, steps }) {
  return (
    <div className="mb-10 md:px-5">
      {/* Cabeçalho */}
      <div className="flex items-center gap-2 mb-5">
        {Icon && <Icon className="w-5 h-5 text-accent-foreground" />}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      <Timeline>
        {steps.map((step, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineIndicator />
            </TimelineSeparator>
            <TimelineHeader>
              <TimelineTitle>{step.status_tramitacao}</TimelineTitle>
              <TimelineDate>{step.date}</TimelineDate>
            </TimelineHeader>
            <TimelineContent>
              <p className="text-sm text-muted-foreground">{step.by}</p>
              {step.descricao && <p className="text-xs italic">{step.descricao}</p>}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}
