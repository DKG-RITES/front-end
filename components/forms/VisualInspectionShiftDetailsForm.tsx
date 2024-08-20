'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import { IEs, Mills, Shifts, railGrades, railLengths, railSections } from "@/constants"
import { SelectItem } from "../ui/select"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { ShiftDetailsFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"

export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton',
}


const VisualInspectionShiftDetailsForm = () => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false)
    
    const form = useForm<z.infer<typeof ShiftDetailsFormValidation>>({
        resolver: zodResolver(ShiftDetailsFormValidation),
        defaultValues: {
          date: new Date(Date.now()),
          shift: "",
          mill: "",
          lineNumber: "",
          railGrade: "",
          railSection: "",
          railLength: "",
          IE: "",
          RCLIE: "",
        },
      })
     
      async function onSubmit(values: z.infer<typeof ShiftDetailsFormValidation>) {
        setIsLoading(true);
        
        try {
            router.push('/visual/home')
        } catch (error) {
            console.log(error)
        }
      }
      
  return (
    <div className="flex flex-col justify-evenly items-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold">Visual Inspection - Shift Details</h1>
        <div className="w-full max-w-lg p-8 border border-gray-300 rounded-lg bg-white shadow-lg">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                    {/* <section>

                    </section> */}
                    <div className="flex flex-col gap-6 sm:flex-row">
                        <CustomFormField 
                            fieldType={FormFieldType.DATE_PICKER}
                            control={form.control}
                            name='date'
                            label='Date'
                            placeholder='Date'
                            iconSrc='../assets/calendar.svg'
                            iconAlt='calendar'
                        />

                        <CustomFormField 
                            fieldType={FormFieldType.SELECT}
                            control={form.control}
                            name='shift'
                            label='Shift'
                            placeholder='Select a shift'
                        >
                            {Shifts.map(( shift ) => (
                                <SelectItem key={shift.name} value={shift.name}>
                                    <div className="flex cursor-pointer items-start gap-2">
                                        <p>{shift.name}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </CustomFormField>
                    </div>

                    <div className="flex flex-col gap-6 sm:flex-row">
                        <CustomFormField 
                            fieldType={FormFieldType.SELECT}
                            control={form.control}
                            name='mill'
                            label='Mill'
                            placeholder='Select a mill'
                        >
                            {Mills.map(( mill ) => (
                                <SelectItem key={mill.name} value={mill.name}>
                                    <div className="flex cursor-pointer items-start gap-2">
                                        <p>{mill.name}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </CustomFormField>

                        <CustomFormField 
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name='lineNumber'
                            label='Line Number'
                            placeholder='Category' //DD -->  if URM --> 1/2/3/4/5/6   if RSM --> 1 / 2
                        />
                    </div>

                    <div className="flex flex-col gap-6 sm:flex-row">
                        <CustomFormField 
                            fieldType={FormFieldType.SELECT}
                            control={form.control}
                            name='railGrade'
                            label='Rail Grade'
                            placeholder='Select Rail Grade'
                        >
                            {railGrades.map(( railGrade ) => (
                                <SelectItem key={railGrade.name} value={railGrade.name}>
                                    <div className="flex cursor-pointer items-start gap-2">
                                        <p>{railGrade.name}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </CustomFormField>

                        <CustomFormField 
                            fieldType={FormFieldType.SELECT}
                            control={form.control}
                            name='railSection'
                            label='Rail Section'
                            placeholder='Select Rail Section'
                        >
                            {railSections.map(( railSection ) => (
                                <SelectItem key={railSection.name} value={railSection.name}>
                                    <div className="flex cursor-pointer items-start gap-2">
                                        <p>{railSection.name}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </CustomFormField>
                    </div>

                    <div className="flex flex-col gap-6 sm:flex-row">
                        <CustomFormField 
                            fieldType={FormFieldType.SELECT}
                            control={form.control}
                            name='railLength'
                            label='Standard offered Rail Length'
                            placeholder='Std. offered length (m)'
                        >
                            {railLengths.map(( railLength ) => (
                                <SelectItem key={railLength.number} value={railLength.number}>
                                    <div className="flex cursor-pointer items-start gap-2">
                                        <p>{railLength.number}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </CustomFormField>

                        <CustomFormField 
                            fieldType={FormFieldType.SELECT}
                            control={form.control}
                            name='IE'
                            label='Add IE'
                            placeholder='Select IE'
                        >
                            {IEs.map(( IE ) => (
                                <SelectItem key={IE.number} value={IE.number}>
                                    <div className="flex cursor-pointer items-start gap-2">
                                        <p>{IE.number}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </CustomFormField>
                    </div>

                    <div className="flex flex-col gap-6 sm:flex-row">
                        <CustomFormField 
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name='RCLIE'
                            label='Add Name of RCL IE / Rep'
                            placeholder='Category'
                        >
                        </CustomFormField>
                    </div>

                    <hr />

                    <div className="flex justify-center">
                        <SubmitButton 
                            isLoading={isLoading}
                        >
                            Start Inspection
                        </SubmitButton>
                    </div>
                </form>
            </Form>
        </div>
    </div>

  )
}

export default VisualInspectionShiftDetailsForm