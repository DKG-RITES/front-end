'use client'

import home from '@/assets/icons/home.svg'
import summary from '@/assets/icons/summary.svg'

import { zodResolver } from "@hookform/resolvers/zod"
import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"


import { Form, FormControl } from "@/components/ui/form"
import { defectTypes, defects, positions, railClasses, railLengths } from "@/constants"
import Image from 'next/image'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import { useEffect, useState } from 'react'
import CustomFormField from '@/components/CustomFormField'
import { FormFieldType } from '@/components/forms/VisualInspectionShiftDetailsForm'
import { SelectItem } from '@/components/ui/select'
import { AlertDialogDemo } from '@/components/AlertDialogDemo'
import SubmitButton from '@/components/SubmitButton'
import { useRouter } from 'next/navigation'
import FileUploader from '@/components/FileUploader'
import { VisualInspectionFormValidation } from '@/lib/validation'

interface FormRow {
    id: number;
    select1: string;
    textInput: string;
    select2: string;
  }

interface UserData {
    id: number;
    date: string;
    shift: string;
    railGrade: string;
    mill: string;
    line: string;
    railSec: string;
    length: string;
  }

const VisualInspectionForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof VisualInspectionFormValidation>>({
        resolver: zodResolver(VisualInspectionFormValidation),
        defaultValues: {
            date: new Date(Date.now()).toISOString().split('T')[0],
            shift: "",
            serialNumber: "",
            heatNumber: "",
            heatStatus: "",
            railLength: "",
            railAcceptanceLength: "",
            number: "",
            railClass: "",
            defect: "",
            type: "",
            location: "",
            position: ""
        },
      })
     
      async function onSubmit(values: z.infer<typeof VisualInspectionFormValidation>) {
        setIsLoading(true);
        
        try {
            router.push('/visual/home')
        } catch (error) {
            console.log(error)
        }
      }

      const handleSubmit = () => {
        router.push('/visual/home');
      }

      const handleSubmitSec = () => {
        router.push('/visual/shiftSummary');
      }

    const [data, setData] = useState<UserData[]>([]);

    const [formRows, setFormRows] = useState<FormRow[]>([
        { id: 1, select1: '130m', textInput: 'No. 2', select2: 'A' }
      ]);

    useEffect(() => {
        fetch('/sampleData.json')
          .then((response) => response.json())
          .then((data: UserData[]) => setData(data))
          .catch((error) => console.error('Error fetching data:', error));
      }, []);

    //   const addFormRow = () => {
    //     const newRow: FormRow = {
    //       id: formRows.length + 1,
    //       select1: '130m',
    //       textInput: `No. ${formRows.length + 2}`,
    //       select2: 'A',
    //     };
    //     setFormRows([...formRows, newRow]);
    //   };
      
  return (
    <div className='flex h-screen max-h-screen'>
        <section className='remove-scrollbar container my-auto'>
            <div className='sub-container max-w-[720px] min-h-screen flex items-center justify-center'>
                <div className="flex flex-col items-center bg-gray-100 shadow-lg p-6 rounded-lg w-full max-w-2xl min-h-[600px]">
                    <h1 className="text-3xl font-bold mb-4">Visual - Inspection</h1>

                    <div className='w-full max-w-lg p-8 border border-gray-300 rounded-lg bg-white shadow-lg'>
                        <div className='flex justify-between'>
                            <button className='flex gap-2 sm:flex-row mb-12 cursor-pointer items-center' onClick={handleSubmit}>
                                <Image 
                                    src={home}
                                    alt='home'
                                    height={24}
                                    width={24}
                                />

                                <p className='font-semibold mt-1'>Home</p>
                            </button> 

                            <button className='flex gap-2 sm:flex-row mb-12 cursor-pointer items-center' onClick={handleSubmitSec}>
                                <Image 
                                    src={summary}
                                    alt='summary'
                                    height={22}
                                    width={22}
                                />

                                <p className='font-semibold mt-1'>Summary</p>
                            </button>
                        </div>

                        <div className='flex'>
                            {data.map(( list ) => (
                                <div className='flex flex-wrap mb-4'>
                                    <h6 className='font-medium mr-5 mt-2'>Date - <span className='font-light'>{list.date}</span></h6>
                                    <h6 className='font-medium mr-5 mt-2'>Shift - <span className='font-light'>{list.shift}</span></h6>
                                    <h6 className='font-medium mr-5 mt-2'>Rail Grade - <span className='font-light'>{list.railGrade}</span></h6>
                                    <h6 className='font-medium mr-5 mt-2'>Mill - <span className='font-light'>{list.mill}</span></h6>
                                    <h6 className='font-medium mr-5 mt-2'>Line - <span className='font-light'>{list.line}</span></h6>
                                    <h6 className='font-medium mr-5 mt-2'>Rail Sec. - <span className='font-light'>{list.railSec}</span></h6>
                                    <h6 className='font-medium mr-5 mt-2'>Length - <span className='font-light'>{list.length}</span></h6>
                                </div>
                            ))}
                        </div>

                        <hr />

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                                <div className="flex flex-col gap-6 mt-2">
                                    <h6 className='font-semibold'>Rail ID - U110324B034</h6>

                                    <div className='flex flex-wrap sm:ml-4'>
                                        <CustomFormField 
                                            fieldType={FormFieldType.INPUT}
                                            control={form.control}
                                            name='date'
                                            placeholder='Date'
                                        />

                                        <CustomFormField 
                                            fieldType={FormFieldType.INPUT}
                                            control={form.control}
                                            name='shift'
                                            placeholder='Shift'
                                        />

                                        <CustomFormField 
                                            fieldType={FormFieldType.INPUT}
                                            control={form.control}
                                            name='serialNumber'
                                            placeholder='S. No.'
                                        />
                                    </div>
                                </div>

                                <div className='flex justify-between'>
                                    <div className='flex flex-col mt-2'>
                                        <h6 className='font-semibold'>Heat Number</h6>

                                        <CustomFormField 
                                            fieldType={FormFieldType.INPUT}
                                            control={form.control}
                                            name='heatNumber'
                                            placeholder='Heat No.'
                                        />
                                    </div>

                                    <div className='flex flex-col mt-2'>
                                        <h6 className='font-semibold'>Heat Pass Status</h6>

                                        <CustomFormField 
                                            fieldType={FormFieldType.INPUT}
                                            control={form.control}
                                            name='heatStatus'
                                            placeholder='Auto Check (Pass / Fail)'
                                        />
                                    </div>
                                </div>

                                <div className='flex items-center'>
                                    <div className='mt-2'>
                                        <h6 className='font-semibold'>Actual Off. Rail Length (m)</h6>
                                    </div>

                                    <div className='ml-6 items-center'>
                                        <CustomFormField 
                                            fieldType={FormFieldType.INPUT}
                                            control={form.control}
                                            name='railLength'
                                            placeholder='Actual offered rail length'
                                        />
                                    </div>
                                </div>

                                <hr />

                                <div className='flex flex-col'>
                                    <h6 className='font-semibold'>Feed back from AI System for Dim. & Visual</h6>

                                    <div className='flex items-center'>
                                        <h6 className='font-semibold mt-4'>UT - </h6>

                                        <CustomFormField 
                                            fieldType={FormFieldType.TEXTAREA}
                                            control={form.control}
                                            name='ut'
                                            placeholder='Feedback'
                                        />
                                    </div>

                                    <div className='flex items-center mt-2'>
                                        <h6 className='font-semibold mt-4 mr-2'>Dim - </h6>

                                        <CustomFormField 
                                            fieldType={FormFieldType.INPUT}
                                            control={form.control}
                                            name='dim'
                                            placeholder='Defect Type / Loc. / Pos.'
                                        />
                                    </div>

                                    <div className='flex items-center mt-2'>
                                        <h6 className='font-semibold mt-4 mr-2'>Visual - </h6>

                                        <CustomFormField 
                                            fieldType={FormFieldType.INPUT}
                                            control={form.control}
                                            name='visual'
                                            placeholder='Defect Type / Loc. / Pos.'
                                        />
                                    </div>

                                    <div className='flex justify-between'>
                                        <a href='#' className='text-blue-500 mt-6 underline'>Hyperlink to AI Photo</a>
                                        <a href='#' className='text-blue-500 mt-6 underline'>Hyperlink to NDT Report</a>
                                    </div>
                                </div>

                                <hr />

                                <div className='flex ml-1'>
                                    <CustomFormField 
                                        fieldType={FormFieldType.CHECKBOX}
                                        control={form.control}
                                        name='gaugingStraightness'
                                        placeholder='Gauging & End Straightness Checked at both the ends'
                                    />
                                </div>

                                <hr />

                                <div className='flex flex-col'>
                                    <h6 className='font-semibold underline mb-4'>Add Acceptance Data</h6>

                                    <div className='flex items-center justify-between flex-wrap'>
                                        <div className='mt-2'>
                                            <CustomFormField 
                                                fieldType={FormFieldType.SELECT}
                                                control={form.control}
                                                name='railAcceptanceLength'
                                                placeholder='Select rail length'
                                            >
                                                {railLengths.map(( railLength ) => (
                                                    <SelectItem key={railLength.number} value={railLength.number}>
                                                        <div className="flex cursor-pointer items-start gap-2">
                                                            <p>{railLength.number}</p>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </CustomFormField>
                                        </div>

                                        <div className='flex mt-2'>
                                            <CustomFormField 
                                                fieldType={FormFieldType.INPUT}
                                                control={form.control}
                                                name='number'
                                                placeholder='Category'
                                            />

                                            <AlertDialogDemo id='2'/>
                                        </div>

                                        <div className='sm:mt-2 mt-2'>
                                            <CustomFormField 
                                                fieldType={FormFieldType.SELECT}
                                                control={form.control}
                                                name='railClass'
                                                placeholder='Select rail class'
                                            >
                                                {railClasses.map(( railClass ) => (
                                                    <SelectItem key={railClass.number} value={railClass.number}>
                                                        <div className="flex cursor-pointer items-start gap-2">
                                                            <p>{railClass.number}</p>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </CustomFormField>
                                        </div>
                                    </div>
                                    
                                    <div className='flex ml-2 mt-6'>
                                        <p className='text-blue-500 cursor-pointer'>&#8853;</p>
                                        <p className='ml-3 font-medium'>Add More Acceptance Data</p>
                                    </div>
                                </div>

                                <hr />

                                <div className='flex flex-col'>
                                    <h6 className='font-semibold underline mb-4'>Add Defect Data</h6>

                                    <div className='flex items-center justify-between flex-wrap'>
                                        <div className='mt-2'>
                                            <CustomFormField 
                                                fieldType={FormFieldType.SELECT}
                                                control={form.control}
                                                name='defect'
                                                placeholder='Defect'
                                            >
                                                {defects.map(( defect ) => (
                                                    <SelectItem key={defect.name} value={defect.name}>
                                                        <div className="flex cursor-pointer items-start gap-2">
                                                            <p>{defect.name}</p>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </CustomFormField>
                                        </div>

                                        <div className='mt-2'>
                                            <CustomFormField 
                                                fieldType={FormFieldType.SELECT}
                                                control={form.control}
                                                name='type'
                                                placeholder='Type'
                                            >
                                                {defectTypes.map(( defectType ) => (
                                                    <SelectItem key={defectType.name} value={defectType.name}>
                                                        <div className="flex cursor-pointer items-start gap-2">
                                                            <p>{defectType.name}</p>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </CustomFormField>
                                        </div>

                                        <div className='flex mt-2'>
                                            <CustomFormField 
                                                fieldType={FormFieldType.INPUT}
                                                control={form.control}
                                                name='location'
                                                placeholder='Location'
                                            />

                                            <AlertDialogDemo id='1'/>
                                        </div>

                                        <div className='sm:mt-2 mt-2'>
                                            <CustomFormField 
                                                fieldType={FormFieldType.SELECT}
                                                control={form.control}
                                                name='position'
                                                placeholder='Pos.'
                                            >
                                                {positions.map(( position ) => (
                                                    <SelectItem key={position.name} value={position.name}>
                                                        <div className="flex cursor-pointer items-start gap-2">
                                                            <p>{position.name}</p>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </CustomFormField>
                                        </div>
                                    </div>

                                    <div className='flex ml-2 mt-6'>
                                        <p className='text-blue-500 cursor-pointer'>&#8853;</p>
                                        <p className='ml-3 font-medium'>Add More Defect Data</p>
                                    </div>
                                </div>

                                <hr />

                                <div className='flex flex-col'>
                                    <div className='flex mb-4'>
                                        <h6 className='font-semibold underline'>Rejection Details</h6>
                                        <p className='ml-6'>min (std. off len , off. len) - acp. len.</p>
                                    </div>

                                    <div>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="font-medium">Length</TableHead>
                                                    <TableHead className="font-medium">13m</TableHead>
                                                    <TableHead className="font-medium">12m</TableHead>
                                                    <TableHead className="font-medium">11m</TableHead>
                                                    <TableHead className="font-medium">10m</TableHead>
                                                    <TableHead className="font-medium">Comp. len.</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell className="font-medium">No. of Pcs</TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>

                                <hr />

                                <div className='flex flex-col'>
                                    <h6 className='font-semibold underline'>Remarks</h6>

                                    <div className='flex justify-between items-center'>
                                        <div className='mt-4'>
                                            <CustomFormField 
                                                fieldType={FormFieldType.INPUT}
                                                control={form.control}
                                                name='remarks'
                                                placeholder='Enter Remarks'
                                            />
                                        </div>

                                        <div>
                                            <CustomFormField 
                                                fieldType={FormFieldType.SKELETON}
                                                control={form.control}
                                                name='uploadedDocument'
                                                renderSkeleton={( field ) => (
                                                    <FormControl>
                                                        <FileUploader 
                                                            files={field.value}
                                                            onChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <hr />

                                <div className="flex justify-center">
                                    <SubmitButton 
                                        isLoading={isLoading}
                                    >
                                        Save Inspection Data
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

export default VisualInspectionForm