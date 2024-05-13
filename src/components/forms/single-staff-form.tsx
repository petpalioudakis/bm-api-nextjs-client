'use client';
import AlertBox from '@/components/alert-box';
import { JobPositionType } from '@/types/jobPositionType.enum';
import { Staff } from '@/types/staff.type';
import * as actions from '@/actions/business';
import { redirect } from 'next/navigation';
import * as Yup from 'yup';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function SingleStaffForm({
  staff,
  businessId,
}: {
  staff: Staff | null;
  businessId: number;
}) {
  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState<
    boolean | null
  >(null);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required(),
    last_name: Yup.string().required(),
    email: Yup.string().email().required(),
    phone_number: Yup.string().optional(),
    job_position: Yup.string().required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      first_name: staff?.first_name,
      last_name: staff?.last_name,
      phone_number: staff?.phone_number!,
      email: staff?.email,
      job_position: staff?.job_position,
    },
    resolver: yupResolver(validationSchema),
  });
  const errorMessage = 'This field is required';

  const onSubmit: SubmitHandler<any> = async (data) => {
    setIsSuccessfullySubmitted(null);
    setSubmitMessage(null);
    let response: { result: boolean; message: string | undefined };
    if (staff?.id) {
      response = await actions.updateStaff(staff, data);
    } else {
      response = await actions.createStaff(businessId, data);
    }
    setIsSuccessfullySubmitted(response.result);
    setSubmitMessage(response.message!);
    if (response.result) {
      setTimeout(() => {
        redirect(`/business/${businessId}/staff`);
      }, 2000);
    }
  };

  const mutationReset = () => {
    setIsSuccessfullySubmitted(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isSuccessfullySubmitted !== null && (
        <AlertBox
          theme={isSuccessfullySubmitted ? 'success' : 'danger'}
          initiallyOpen={true}
          onClickHandler={mutationReset}
        >
          <p>{submitMessage}</p>
        </AlertBox>
      )}
      <div className={'mb-10 grid grid-cols-1 gap-6'}>
        <div className={'field-group'}>
          <label htmlFor='first_name'>First Name</label>
          <input
            id='first_name'
            type='text'
            {...register('first_name')}
            className={'w-full '}
          />
          {errors.first_name && (
            <span className={'text-red-500'}>{errorMessage}</span>
          )}
        </div>
        <div className={'field-group'}>
          <label htmlFor='last_name'>Last Name</label>
          <input
            id={'last_name'}
            type='text'
            {...register('last_name')}
            className={'w-full'}
          />
          {errors.last_name && (
            <span className={'text-red-500'}>{errorMessage}</span>
          )}
        </div>
        <div className={'field-group'}>
          <label htmlFor='email'>Email</label>
          <input
            id={'email'}
            type='email'
            {...register('email')}
            className={'w-full'}
          />
          {errors.email && (
            <span className={'text-red-500'}>{errorMessage}</span>
          )}
        </div>
        <div className={'field-group'}>
          <label htmlFor='phone_number'>Phone Number</label>
          <input
            id={'phone_number'}
            type='text'
            {...register('phone_number')}
            className={'w-full'}
          />
          {errors.phone_number && (
            <span className={'text-red-500'}>{errorMessage}</span>
          )}
        </div>
        <div className={'field-group'}>
          <label htmlFor='job_position'>Job Position</label>
          <select
            id={'job_position'}
            {...register('job_position')}
            value={staff?.job_position}
          >
            <option value={''}>Select Job Position</option>
            {Object.values(JobPositionType).map((key) => (
              <option key={key} value={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </option>
            ))}
          </select>
          {errors.job_position && (
            <span className={'text-red-500'}>{errorMessage}</span>
          )}
        </div>
      </div>
      <div className={'text-right'}>
        <button
          type='submit'
          disabled={isSubmitting}
          className='m-5 mx-auto w-2/3 bg-gray-950 px-4 py-2 text-white transition-all hover:bg-gray-700'
        >
          Save
        </button>
      </div>
    </form>
  );
}
