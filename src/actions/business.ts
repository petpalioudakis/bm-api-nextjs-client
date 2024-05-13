'use server';
import { Business } from '@/types/business.type';
import { Staff } from '@/types/staff.type';
import * as auth from '@/utils/auth';
import { revalidatePath } from 'next/cache';

/**
 * Fetches all businesses.
 */
export async function getAllBusinesses(): Promise<Business[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/business/`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch staff');
    }

    return await response.json();
  } catch (e) {
    console.log('getStaff', e);
    return [];
  }
}

/**
 * Fetches a business by ID.
 * @param {number} id
 */
export async function getBusiness(id: number): Promise<Business | null> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/business/${id}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch staff');
    }

    return await response.json();
  } catch (e) {
    console.log('getStaff', e);
    return null;
  }
}

/**
 * Creates a new business.
 * @param data
 */
export async function createBusiness(data: any) {
  try {
    const session = await auth.auth();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/business`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok && response.status === 201) {
      revalidatePath('/business');
      return {
        result: true,
        message: 'Business created successfully',
      };
    } else {
      const errors = await response.text();
      console.log('errors', errors);
      return {
        result: false,
        message: JSON.parse(errors).message.toString(),
      };
    }
  } catch (e) {
    return {
      result: false,
      message: e?.toString(),
    };
  }
}

/**
 * Updates a business.
 * @param businessId
 * @param data
 */
export async function updateBusiness(businessId: number, data: any) {
  try {
    const session = await auth.auth();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/business/${businessId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (response.ok && response.status === 200) {
      revalidatePath('/business');
      revalidatePath(`/business/edit/${businessId}`);
      return {
        result: true,
        message: 'Business updated successfully',
      };
    } else {
      const errors = await response.text();
      return {
        result: false,
        message: JSON.parse(errors).message.toString(),
      };
    }
  } catch (e) {
    console.log('updateStaff', e);
    return {
      result: false,
      message: e?.toString(),
    };
  }
}

/**
 * Deletes a business.
 * @param {number} id
 */
export async function deleteBusiness(id: number): Promise<boolean | any> {
  try {
    const session = await auth.auth();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/business/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );

    if (response.ok && response.status === 204) {
      revalidatePath('/business');
    } else {
      throw new Error('Failed to delete staff member');
    }
  } catch (e) {
    console.log('deleteAccount', e);
    return false;
  }
}

/**
 * Fetches all staff members.
 * @param {number} businessId
 */
export async function getAllStaff(businessId?: number): Promise<Staff[]> {
  try {
    const session = await auth.auth();
    const url = businessId
      ? `${process.env.NEXT_PUBLIC_API_URL}/business/${businessId}/staff`
      : `${process.env.NEXT_PUBLIC_API_URL}/staff`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch staff');
    }

    return await response.json();
  } catch (e) {
    console.log('getAllStaff', e);
    return [];
  }
}

/**
 * Fetches a single staff member.
 * @param {number} id
 * @param {number} businessId
 */
export async function getSingleStaff(
  id: number,
  businessId: number
): Promise<Staff | null> {
  try {
    const session = await auth.auth();
    const url = `${process.env.NEXT_PUBLIC_API_URL}/business/${businessId}/staff/${id}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch staff');
    }

    return await response.json();
  } catch (e) {
    console.log('getSingleStaff', e);
    return null;
  }
}

/**
 * Updates a staff member.
 * @param {Staff} staff
 * @param data
 */
export async function updateStaff(staff: Staff, data: any) {
  try {
    const session = await auth.auth();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/business/${staff.business?.id}/staff/${staff.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (response.ok && response.status === 200) {
      revalidatePath('/staff');
      revalidatePath(`/business/${staff.business?.id}/staff`);
      return {
        result: true,
        message: 'Staff member updated successfully',
      };
    } else {
      const errors = await response.text();
      console.log('errors', errors);
      return {
        result: false,
        message: JSON.parse(errors).message.toString(),
      };
    }
  } catch (e) {
    console.log('updateStaff', e);
    return {
      result: false,
      message: e?.toString(),
    };
  }
}

/**
 * Creates a new staff member.
 * @param {number} businessId
 * @param data
 */
export async function createStaff(businessId: number, data: any) {
  try {
    const session = await auth.auth();
    if (data.phone_number === '') {
      delete data.phone_number;
    }
    console.log('data', data);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/business/${businessId}/staff`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok && response.status === 201) {
      console.log('response', response);
      revalidatePath(`/business/${businessId}/staff`);
      return {
        result: true,
        message: 'Staff member created successfully',
      };
    } else {
      const errors = await response.text();
      console.log('errors', errors);
      return {
        result: false,
        message: JSON.parse(errors).message.toString(),
      };
    }
  } catch (e) {
    return {
      result: false,
      message: e?.toString(),
    };
  }
}

/**
 * Deletes a staff member.
 *
 * @param {number} staffId
 * @param {number} businessId
 */
export async function deleteStaff(staffId: number, businessId: number) {
  const defaultErrorMessage = { message: 'Failed to delete staff member' };
  try {
    const session = await auth.auth();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/business/${businessId}/staff/${staffId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );

    if (response.ok && response.status === 204) {
      revalidatePath(`/staff/${businessId}/edit/${staffId}`);
      return {
        message: 'Staff member deleted successfully',
      };
    }
    return defaultErrorMessage;
  } catch (e) {
    console.log('deleteStaff', e);
    return defaultErrorMessage;
  }
}
