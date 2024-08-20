'use client'

import filter from '@/assets/icons/filter.svg'
import home from '@/assets/icons/home.svg'

import { zodResolver } from "@hookform/resolvers/zod"
import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form } from "@/components/ui/form"

import Image from 'next/image'

import { useEffect, useState } from 'react'
import CustomFormField from '@/components/CustomFormField'
import { FormFieldType } from '@/components/forms/VisualInspectionShiftDetailsForm'
import { useRouter } from 'next/navigation'
import { VisualHomeFormValidation } from '@/lib/validation'
import { lineNumbers } from '@/constants'
import { SelectItem } from '@/components/ui/select'
import Table from '@/components/Table'

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
  

const acceptanceSummary = () => {
  const headers = ['', 'Length Wise Acceptance Summary'];
  const colSpans = [1, 9]; 
  const rows = [
    ['', 'Insp.', '130', '117', '87', '65', '52', '26', '13'],
    ['A', '', '', '', '', '', '', '', ''],
    ['+0.1', '', '', '', '', '', '', '', ''],
    ['Tot.', '', '', '', '', '', '', '', ''],
  ];

  const headersSec = ['Rejection Summary'];
  const colSpansSec = [5];
  const rowsSec = [
    ['13', '12', '11', '10', 'Component'],
    ['', '', '', '', ''],
  ];

  const headerTer = ['Compiled Summary'];
  const colSpansTer = [5];
  const rowsTer = [
    ['', 'No.', 'Tonnes'],
    ['Rails Inspected', '', ''],
    ['Rails Accepted (A)', '', ''],
    ['Rails Accepted (A + 0.1)', '', ''],
    ['Rails Accepted (Total)', '', ''],
    ['Rails Rejected', '', ''],
  ]

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [selectedOption, setSelectedOption] = useState<string>('');
    
    const form = useForm<z.infer<typeof VisualHomeFormValidation>>({
        resolver: zodResolver(VisualHomeFormValidation),
        defaultValues: {
          shiftRemarks: "",
        },
      })
     
      async function onSubmit(values: z.infer<typeof VisualHomeFormValidation>) {
        setIsLoading(true);

        try {
          router.push('/visual/home')
        } catch (error) {
          console.log(error);
        }
      
      }

      const handleSubmit = () => {
        router.push('/visual/home');
      }

      const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedOption(value);

        switch (value) {
            case 'acceptance-summary':
              router.push('/visual/shiftSummary/acceptanceSummary');
              break;
            case 'defect-analysis':
              router.push('/visual/shiftSummary/defectAnalysisSummary');
              break;
            case 'inspected-railwise-summary':
              router.push('/visual/shiftSummary/inspectedRailwiseSummary');
              break;
            default:
              break;
          }
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
                    <h1 className="text-3xl font-bold mb-4">Visual - Acceptance Summary</h1>

                    <div className='w-full max-w-lg p-8 border border-gray-300 rounded-lg bg-white shadow-lg'>
                        <div className='flex mt-2'>
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

                        <div className='flex items-center justify-between mb-6'>
                            <div className='flex items-center'>
                                <div>
                                    <Image 
                                        src={filter}
                                        alt='filter'
                                        width={24}
                                        height={24}
                                    />
                                </div>

                                <div className='ml-2'>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                                            <div className="flex flex-col gap-6 mt-4 items-center">
                                                <div>
                                                    <CustomFormField 
                                                        fieldType={FormFieldType.SELECT}
                                                        control={form.control}
                                                        name='lineNumber'
                                                        placeholder='Select Line No.'
                                                    >
                                                        {lineNumbers.map(( lineNumber ) => (
                                                            <SelectItem key={lineNumber.name} value={lineNumber.name}>
                                                                <div className="flex cursor-pointer items-start gap-2">
                                                                    <p>{lineNumber.name}</p>
                                                                </div>
                                                            </SelectItem>
                                                        ))}
                                                    </CustomFormField>
                                                </div>
                                            </div>
                                        </form>
                                    </Form>
                                </div>
                            </div>

                            <button onClick={handleSubmit}>
                                <Image 
                                    src={home}
                                    alt='home'
                                    height={24}
                                    width={24}
                                />
                            </button>
                        </div>

                        <hr />

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                                <div className="flex flex-col gap-6 mt-4 items-center">
                                    <select value='Acceptance Summary' onChange={handleSelectChange} className='border h-11 w-44 text-sm rounded-xl border-black pl-2'>
                                        <option value="Select a summary" disabled>Select a summary</option>
                                        <option value="acceptance-summary">Acceptance Summary</option>
                                        <option value="defect-analysis">Defect Analysis Summary</option>
                                        <option value="inspected-railwise-summary">Inspected Railwise Summary</option>
                                    </select>
                                </div>
                            </form>
                        </Form>

                        <div className='mt-4 mb-4'>
                          <Table headers={headers} colSpans={colSpans} rows={rows} />
                        </div>

                        <hr />

                        <div className='mt-4 mb-4'>
                          <Table headers={headersSec} colSpans={colSpansSec} rows={rowsSec} />
                        </div>

                        <hr />

                        <div className='mt-4 mb-4'>
                          <Table headers={headerTer} colSpans={colSpansTer} rows={rowsTer} />
                        </div>

                        <hr />

                        <div className="flex justify-center mt-4">
                          <button 
                              onClick={handleSubmit}
                              className='bg-yellow-600 w-[80px] rounded-xl h-[35px] text-sm hover:bg-yellow-600'
                          >
                              OK
                          </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
                  
  )
}

export default acceptanceSummary