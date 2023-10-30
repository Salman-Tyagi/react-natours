import axiosInstance from './axiosInstance';

export async function getAllBookings(userId) {
  try {
    const res = await axiosInstance(`/api/v1/bookings/${userId}`);
    const data = res?.data;
    return data;
  } catch (err) {
    // console.error(err?.response);
    return err?.response?.data;
  }
}
