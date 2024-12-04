import React from 'react'
import Image from 'next/image'
import Logo from "@/public/logo.svg"
import Link from 'next/link'
import {Sheet,SheetContent,SheetHeader,SheetTitle,SheetTrigger} from "@/components/ui/sheet"
import { Menu } from 'lucide-react';
import { Button } from './ui/button'
import { MoveRight } from 'lucide-react';

export default function Nav() {

  const navItem = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
  ]


  return (
    <nav className='py-5 px-6 flex justify-between items-center border-b'>

      <Image src={Logo} width={30} height={30} alt='Logo application' />

      <div className="hidden md:flex justify-center items-center gap-4 text-sm ">
        {navItem.map((item, index) => (
          <Link key={index} href={item.path} className='hover:text-blue-500'>
            {item.name}
          </Link>
        ))}
        <Button className='bg-blue-500 hover:bg-blue-400 my-4 group shadow-lg'>
          <Link href="/blog/add" className='flex items-center gap-2'>
            <span>Get Started</span>
            <MoveRight className=' hidden group-hover:block '/>
          </Link>
        </Button>
      </div>

      <Sheet>
        <SheetTrigger className='md:hidden'><Menu /></SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>

            <div className="flex flex-col gap-4 text-sm text-left">

            <Button className='bg-blue-500 hover:bg-blue-400 my-4 group shadow-lg'>
              <Link href="/blog/add" className='flex items-center gap-2'>
                <span>Get Started</span>
                <MoveRight className=' hidden group-hover:block '/>
              </Link>
            </Button>

              {navItem.map((item, index) => (
                <Link key={index} href={item.path} className='border-l-2 hover:text-blue-500  hover:border-l-blue-500 pl-2 transition-all'>
                  {item.name}
                </Link>
              ))}

            </div>

          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  )
}
