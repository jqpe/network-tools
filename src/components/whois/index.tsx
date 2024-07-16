import { Ban } from 'lucide-react'
import { Alert, AlertTitle } from '~/components/ui/alert'

export const MissingDataAlert = (props: { title: string }) => (
  <Alert>
    <Ban className="w-4 h-4" />
    <AlertTitle>{props.title}</AlertTitle>
  </Alert>
)
