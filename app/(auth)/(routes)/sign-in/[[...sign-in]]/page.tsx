import { SignIn } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import { ClerkProvider } from '@clerk/nextjs'

export default function Page() {
  return ( 
    <ClerkProvider localization={ptBR}>
      <SignIn />
    </ClerkProvider>
  )
}