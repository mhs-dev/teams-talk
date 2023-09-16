"use client";

import * as z from 'zod';
import axios from 'axios';
import qs from 'query-string';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import FileUpload from '../file-upload';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-modal-store';

const formSchema = z.object({
  fileUrl: z.string().min(1, {
    message: "Attachment is required."
  }),
})

interface MessageFileModalProps {}

export default function MessageFileModal({}: MessageFileModalProps) {
  const { isOpen, onClose, type, data: { apiUrl, query } } = useModal();
  const isModalOpen = isOpen && type === 'messageFile';
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileUrl: "",
    }
  });
  const router = useRouter();
  const isLoading = form.formState.isSubmitting;
  const handleClose = () => {
    form.reset();
    onClose();
  }
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl ?? "",
        query
      })
      await axios.post(url, {
        ...values,
        content: values.fileUrl
      });
      form.reset();
      router.refresh();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={handleClose}
    >
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Add an attachment
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Send a file as a message 
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
            <div className='space-y-8 px-6'>
              <div className='flex items-center justify-center text-center'>
                <FormField 
                  control={form.control}
                  name='fileUrl'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="messageFile"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter className='bg-gray-100 px-6 py-4'>
              <Button disabled={isLoading} variant='primary'>Send</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}