import ModeToggle from '@/components/mode-toggle';
import { UserButton } from '@clerk/nextjs';

export default function HomePage() {
  return (
    <div>
      <UserButton
        afterSignOutUrl='/'
      />
      <ModeToggle />
    </div>
  )
}
