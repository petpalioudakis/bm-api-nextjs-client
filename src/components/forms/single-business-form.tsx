'use client';
import AlertBox from '@/components/alert-box';
import { Business } from '@/types/business.type';
import { BusinessType } from '@/types/bussinessType';
import * as actions from '@/actions/business';
import { redirect } from 'next/navigation';
import * as Yup from 'yup';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function SingleBusinessForm({
  business,
}: {
  business: Business | null;
}) {
  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState<
    boolean | null
  >(null);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    location: Yup.string().required(),
    business_type: Yup.string().optional(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: business?.name,
      location: business?.location,
      business_type: business?.business_type!,
    },
    resolver: yupResolver(validationSchema),
  });
  const errorMessage = 'This field is required';

  const onSubmit: SubmitHandler<any> = async (data) => {
    setIsSuccessfullySubmitted(null);
    setSubmitMessage(null);
    let response: { result: boolean; message: string | undefined };

    if (business?.id) {
      response = await actions.updateBusiness(business.id, data);
    } else {
      response = await actions.createBusiness(data);
    }
    setIsSuccessfullySubmitted(response.result);
    setSubmitMessage(response.message!);
    if (response.result) {
      setTimeout(() => {
        redirect(`/business`);
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
          <label htmlFor='name'>Business Name</label>
          <input
            id='name'
            type='text'
            {...register('name')}
            className={'w-full'}
          />
          {errors.name && (
            <span className={'text-red-500'}>{errorMessage}</span>
          )}
        </div>
        <div className={'field-group'}>
          <label htmlFor='last_name'>Business Location</label>
          <input
            id={'location'}
            type='text'
            {...register('location')}
            className={'w-full'}
          />
          {errors.location && (
            <span className={'text-red-500'}>{errorMessage}</span>
          )}
        </div>

        <div className={'field-group'}>
          <label htmlFor='business_type'>Business Type</label>
          <select
            id={'business_type'}
            {...register('business_type')}
            value={business?.business_type}
          >
            <option value={''}>Select Business Type</option>
            {Object.values(BusinessType).map((key) => (
              <option key={key} value={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </option>
            ))}
          </select>
          {errors.business_type && (
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
