"use client"

import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/useAuth'; 


export default function PageSignInAndUp() {


 

const { redirectIfAuthenticated, loginWithGoogle, loginWithGithub } = useAuth(); 

  

  redirectIfAuthenticated();

  return (
    <section className="w-full h-screen flex items-center justify-center flex-col gap-2 ">
    
          <Button variant={"outline"} type="button" onClick={loginWithGoogle}>
            Continuer avec Google
          </Button>
          <Button variant={"outline"} type="button" onClick={loginWithGithub}>
          Continuer avec Github
          </Button>
   
    </section>
  );
}
