import axiosInstance from './axiosInstance';

export const getTours = async () => {
  try {
    const res = await axiosInstance('/api/v1/tours');
    const data = res?.data?.data;
    return data;
  } catch (err) {
    // console.error(err?.response);
  }
};

export async function getTourBySlug(slug) {
  try {
    const res = await axiosInstance(`/api/v1/tours/tour/${slug}`);
    const tour = res?.data?.data;
    return tour;
  } catch (err) {
    // console.error(err?.response);
  }
}
