import axiosInstance from '@/api/axios-customize';
import { useQuery } from '@tanstack/react-query';

export type BaseLocationType = {
  name: string;
  id: number;
};

enum QueryKeys {
  Provinces = 'province',
  Districts = 'districts',
  Wards = 'wards'
}

const useProvinces = () => {
  const { data: provinces } = useQuery<BaseLocationType[]>({
    queryKey: [QueryKeys.Provinces],
    queryFn: async () => {
      const response = await axiosInstance.get('/provinces');
      return response.data;
    }
  });

  return { provinces };
};

const useDistricts = (provinceId: number) => {
  const { data: districts } = useQuery<BaseLocationType[]>({
    queryKey: [QueryKeys.Districts, provinceId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/districts/by-province/${provinceId}`
      );
      return response.data;
    }
  });

  return {
    districts
  };
};

const useWards = (districtId: number) => {
  const { data: wards } = useQuery<BaseLocationType[]>({
    queryKey: [QueryKeys.Wards, districtId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/wards/by-district/${districtId}`
      );
      return response.data;
    }
  });

  return {
    wards
  };
};

export { useProvinces, useDistricts, useWards };
