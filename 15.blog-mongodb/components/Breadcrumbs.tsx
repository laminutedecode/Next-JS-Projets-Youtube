"use client"

import { usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


import React from 'react'

export default function Breadcrumbs() {

  const pathname = usePathname()
  const segmentPath = pathname.split('/')
  const URL_APP = process.env.NEXT_PUBLIC_URL_APP



  return (
    <Breadcrumb className='py-4'>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      {segmentPath.map((segment, index)=> {
        if(segment === "") return null 
        const isLast = index === segmentPath.length - 1
        return (
          <React.Fragment key={segment}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {isLast ? (
                <BreadcrumbPage>{segment}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={`${URL_APP}/${segmentPath.slice(0, index + 1).join('/')}`}>{segment}</BreadcrumbLink>
              )}
            </BreadcrumbItem>


          </React.Fragment>
        )
      })}


      
    </BreadcrumbList>
</Breadcrumb>

  )
}
