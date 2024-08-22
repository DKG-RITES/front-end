'use client'

import home from '@/assets/icons/home.svg'

import { zodResolver } from "@hookform/resolvers/zod"
import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"


import { Form } from "@/components/ui/form"
import { bloomIdentifications } from "@/constants"
import Image from 'next/image'

import { useEffect, useState } from 'react'
import CustomFormField from '@/components/CustomFormField'
import { FormFieldType } from '@/components/forms/VisualInspectionShiftDetailsForm'
import { SelectItem } from '@/components/ui/select'
import SubmitButton from '@/components/SubmitButton'
import { useRouter } from 'next/navigation'
import { SMSBloomInspectionFormValidation } from '@/lib/validation'

interface UserData {
    sms: string;
    id: number;
    date: string;
    shift: string;
    railGrade: string;
    mill: string;
    line: string;
    railSec: string;
    length: string;
  }

const bloomInspection = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof SMSBloomInspectionFormValidation>>({
        resolver: zodResolver(SMSBloomInspectionFormValidation),
        defaultValues: {
          castNumber: '',
          primeBlooms: '',
          COBlooms: '',
          bloomIdentification: '',
          bloomsLength: '',
          bloomsSurfaceCondition: '',
          primeBloomsRejected: '',
          COBloomsRejected: '',
          remark: '',
        },
      })
     
      async function onSubmit(values: z.infer<typeof SMSBloomInspectionFormValidation>) {
        setIsLoading(true);
        
        try {
            router.push('/SMS/home')
        } catch (error) {
            console.log(error)
        }
      }

      const handleSubmit = () => {
        router.push('/SMS/home');
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
                    <h1 className="text-3xl font-bold mb-4">SMS - Bloom Inspection</h1>

                    <div className='w-full max-w-lg p-8 border border-gray-300 rounded-lg bg-white shadow-lg'>
                      <div className='flex'>
                        <div className='flex'>
                            {data.map(( list ) => (
                                <div className='flex flex-wrap mb-4'>
                                    <h6 className='font-medium mr-5 mt-2'>Date - <span className='font-light'>{list.date}</span></h6>
                                    <h6 className='font-medium mr-5 mt-2'>Shift - <span className='font-light'>{list.shift}</span></h6>
                                    <h6 className='font-medium mr-5 mt-2'>SMS - <span className='font-light'>{list.sms}</span></h6>
                                    <h6 className='font-medium mr-5 mt-2'>Rail Grade - <span className='font-light'>{list.railGrade}</span></h6>
                                </div>
                            ))}
                        </div>

                        <button className='flex gap-2 sm:flex-row mb-5 cursor-pointer items-end' onClick={handleSubmit}>
                            <Image 
                                src={home}
                                alt='home'
                                height={28}
                                width={28}
                            />
                        </button>
                      </div> 

                        <hr />

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                                <div className="flex flex-col gap-6 mt-4">
                                    <div className='flex flex-wrap sm:ml-4'>
                                      <div className='mb-6 mr-6'>
                                        <CustomFormField 
                                            fieldType={FormFieldType.INPUT}
                                            control={form.control}
                                            name='castNumber'
                                            label='Cast Number'
                                        />
                                      </div>
                                        
                                      <div className='mb-6 mr-2'>
                                        <CustomFormField 
                                            fieldType={FormFieldType.INPUT}
                                            control={form.control}
                                            name='primeBlooms'
                                            label='No. of Prime Blooms'
                                        />
                                      </div>
                                        
                                      <div className='mb-6 mr-6'>
                                        <CustomFormField 
                                            fieldType={FormFieldType.INPUT}
                                            control={form.control}
                                            name='COBlooms'
                                            label='No. of CO Blooms'
                                        />
                                      </div>
                                        
                                      <div className='mb-6 mr-2'>
                                        <CustomFormField 
                                            fieldType={FormFieldType.SELECT}
                                            control={form.control}
                                            name='bloomIdentification'
                                            label='Bloom Identification'
                                            placeholder='Select Bloom Identification'
                                        >
                                            {bloomIdentifications.map(( bloomIdentification ) => (
                                                <SelectItem key={bloomIdentification.name} value={bloomIdentification.name}>
                                                    <div className="flex cursor-pointer items-start gap-2">
                                                        <p>{bloomIdentification.name}</p>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </CustomFormField>
                                      </div>
                                        
                                      <div className='mb-6 mr-6'>
                                        <CustomFormField 
                                            fieldType={FormFieldType.INPUT}
                                            control={form.control}
                                            name='bloomsLength'
                                            label='Length of Blooms'
                                        />
                                      </div>
                                        
                                      <div className='mb-6 mr-2'>
                                        <CustomFormField 
                                            fieldType={FormFieldType.INPUT}
                                            control={form.control}
                                            name='bloomsSurfaceCondition'
                                            label='Surface Condition of Blooms'
                                        />
                                      </div>

                                      <div className='mb-6 mr-6'>
                                        <CustomFormField 
                                            fieldType={FormFieldType.INPUT}
                                            control={form.control}
                                            name='primeBloomsRejected'
                                            label='No. of Prime Blooms Rejected'
                                        />
                                      </div>

                                      <div className='mb-6 mr-2'>
                                        <CustomFormField 
                                            fieldType={FormFieldType.INPUT}
                                            control={form.control}
                                            name='COBloomsRejected'
                                            label='No. of CO Blooms Rejected'
                                        />
                                      </div>
                                        
                                      <div className='mb-6 mr-6'>
                                        <CustomFormField 
                                            fieldType={FormFieldType.INPUT}
                                            control={form.control}
                                            name='remark'
                                            label='Remark'
                                        />
                                      </div>  
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <SubmitButton 
                                        isLoading={isLoading}
                                    >
                                        Save
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

export default bloomInspection