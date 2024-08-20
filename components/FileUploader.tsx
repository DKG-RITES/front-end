'use client'

import upload from '@/assets/icons/upload.svg'

import { convertFileToUrl } from '@/lib/utils'
import Image from 'next/image'
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

interface FileUploaderProps {
    files: File[] | undefined,
    onChange: (files: File[]) => void
}

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className='file-upload'>
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image 
            src={convertFileToUrl(files[0])}
            width={80} 
            height={80}
            alt='uploaded image'
            className='max-h-[50px] overflow-hidden object-cover'
        />
      ) : (
        <div className='flex'>
            <Image 
                src={upload}
                width={25}
                height={25}
                alt='upload'
                className='mr-4'
            />

            <div className='file-upload_label'>
                <p className='text-14-regular'>
                    Click to Upload
                </p>
            </div>
        </div>
      )}
    </div>
  )
}

export default FileUploader