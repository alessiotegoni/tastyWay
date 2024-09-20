import { CommandGroup } from "@/components/ui/command"
import LatestResearchItem from "./LatestResearchItem"

interface LatestResearchListProps {
  latestResearchs: string[]
  hasSeparator: boolean
}

const LatestResearchsList = ({ latestResearchs, hasSeparator }: LatestResearchListProps) => {
  return  <CommandGroup
  heading="Recenti"
  className={`text-left font-semibold text-[13px] m-[15px] ${
    hasSeparator && "mb-3"
  }`}
>
  {latestResearchs.map((sl, i) => (
    <LatestResearchItem key={i} latestResearch={sl} />
  ))}
</CommandGroup>
}
export default LatestResearchsList
