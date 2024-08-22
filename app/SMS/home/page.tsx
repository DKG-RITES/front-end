'use client'

import logo from '@/assets/images/logo.svg'
import search from '@/assets/icons/search.svg'
import hamburger from '@/assets/icons/hamburger.svg'
import notepad from '@/assets/icons/notepad.svg'

import { zodResolver } from "@hookform/resolvers/zod"
import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form } from "@/components/ui/form"

import Image from 'next/image'

import { useEffect, useState } from 'react'
import CustomFormField from '@/components/CustomFormField'
import { FormFieldType } from '@/components/forms/VisualInspectionShiftDetailsForm'
import { Search } from '@/components/Search'
import SubmitButton from '@/components/SubmitButton'
import { useRouter } from 'next/navigation'
import { VisualHomeFormValidation } from '@/lib/validation'
import { roundToNearestHours } from 'date-fns'

interface UserData {
    sms: string
    id: number;
    date: string;
    shift: string;
    railGrade: string;
    mill: string;
    line: string;
    railSec: string;
    length: string;
  }
  

const VisualHome = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    
    const form = useForm<z.infer<typeof VisualHomeFormValidation>>({
        resolver: zodResolver(VisualHomeFormValidation),
        defaultValues: {
          shiftRemarks: "",
        },
      })
     
      async function onSubmit(values: z.infer<typeof VisualHomeFormValidation>) {
        setIsLoading(true);
        
        try {
            router.push('/login')
        } catch (error) {
            console.log(error)
        }
      }

      const handleSubmit = () => {
        router.push('/SMS/shiftSummary');
      }

      const handleSubmitSec = () => {
        router.push('/SMS/bloomInspection');
      }

      const handleSubmitTer = () => {
        router.push('/SMS/shiftReportHome');
      }

    const handleClick = () => {
        router.push('/')
    }

    const [data, setData] = useState<UserData[]>([]);

    useEffect(() => {
        fetch('/sampleData.json')
          .then((response) => response.json())
          .then((data: UserData[]) => setData(data))
          .catch((error) => console.error('Error fetching data:', error));
      }, []);
      
  return (
    <div className='flex h-screen max-h-screen'>
        <section className='remove-scrollbar container my-auto'>
            <div className='sub-container max-w-[720px] min-h-screen flex items-center justify-center'>
                <div className="flex flex-col items-center bg-gray-100 shadow-lg p-6 rounded-lg w-full max-w-2xl min-h-[600px]">
                    <h1 className="text-3xl font-bold mb-4">SMS - Home</h1>

                    <div className='w-full max-w-lg p-8 border border-gray-300 rounded-lg bg-white shadow-lg'>
                        <div className='flex justify-between items-center'>
                            <div>
                                <Image 
                                    src={logo}
                                    alt='ritesLogo'
                                    width={68}
                                    height={68}
                                />
                            </div>
                            
                            <div className='flex'>
                                <Image 
                                    src={search}
                                    alt='search'
                                    width={24}
                                    height={24}
                                    className='cursor-pointer'
                                />

                                <Image 
                                    src={hamburger}
                                    alt='search'
                                    width={24}
                                    height={24}
                                    className='ml-12 cursor-pointer'
                                />
                            </div>
                        </div>

                        <div className='mt-8 mb-6'>
                            <Search />
                        </div>

                        <hr />

                        <div className='flex items-end'>
                            <div className='flex mt-2'>
                            {data.map(( list ) => (
                                <div className='flex flex-wrap mb-4'>
                                    <h6 className='font-medium mr-5 mt-2'>Date - <span className='font-light'>{list.date}</span></h6>
                                    <h6 className='font-medium mr-5 mt-2'>Shift - <span className='font-light'>{list.shift}</span></h6>
                                    <h6 className='font-medium mr-5 mt-2'>SMS - <span className='font-light'>{list.sms}</span></h6>
                                    <h6 className='font-medium mr-5 mt-2'>Rail Grade - <span className='font-light'>{list.railGrade}</span></h6>
                                </div>
                                ))}
                            </div>
                            
                            <button className='mb-2' onClick={handleClick}>
                                <Image 
                                    src={notepad}
                                    alt='notepad'
                                    width={28}
                                    height={28}
                                />
                            </button>
                        </div>
                        

                        <hr />

                        <div className="mt-6 grid grid-cols-2 gap-4 mb-6">
                            <button onClick={handleSubmit} className='flex flex-col p-4 bg-slate-900 rounded-2xl rounded-br-md text-gray-300 shadow-lg'>
                                <div className="w-[1px] h-[1px] bg-gradient-to-br from-green-300 via-yellow-100 to-orange-300 p-6 rounded-2xl rounded-br-md" />

                                <p className='mt-3 text-gray-300 font-medium'>SMS Summary</p>
                            </button>

                            <button onClick={handleSubmitSec} className='flex flex-col p-4 bg-slate-900 rounded-2xl rounded-br-md text-gray-300 shadow-lg'>
                                <div className="w-[1px] h-[1px] bg-gradient-to-br from-blue-200 via-blue-400 to-blue-500 p-6 rounded-2xl rounded-br-md" />

                                <p className='mt-3 text-gray-300 text-left font-medium'>Bloom Inspection</p>
                            </button>

                            <button onClick={handleSubmitTer} className='flex flex-col p-4 bg-slate-900 rounded-2xl rounded-br-md text-gray-300 shadow-lg'>
                                <div className="w-[1px] h-[1px] bg-gradient-to-br from-blue-200 via-blue-400 to-blue-500 p-6 rounded-2xl rounded-br-md" />

                                <p className='mt-3 text-gray-300 text-left font-medium'>Shift Reports</p>
                            </button>
                        </div>

                        <hr />

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                                <div className="flex flex-col gap-6 mt-8 items-center">
                                    <div className='flex'>
                                        <CustomFormField 
                                            fieldType={FormFieldType.INPUT}
                                            control={form.control}
                                            name='shiftRemarks'
                                            placeholder='Shift Remarks'
                                        />
                                    </div>
                                </div>

                                <hr />

                                <div className="flex justify-center">
                                    <SubmitButton 
                                        isLoading={isLoading}
                                    >
                                        End Duty
                                    </SubmitButton>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    </div>               
  )
}

export default VisualHome