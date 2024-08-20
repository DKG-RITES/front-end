'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"

  interface AlertDialogProps {
    id: string,
  }
  
  export function AlertDialogDemo({ id }: AlertDialogProps) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="border-none bg-blue-600 rounded-xl text-white h-0.5 w-0.5 text-xs hover:bg-red-500">{id}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Input1 - Copy 4 - copy 1 - copy 1 - copy 1 - copy 1...</AlertDialogTitle>
            <AlertDialogDescription>
              Type of Defect - (Dimensional / End Straightness / Body Straightness / Visual)
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-black text-white">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  