import axiosInstance from '@/api/axios-customize';
import { useQuery } from '@tanstack/react-query';

export type BaseLocationType = {
  name: string;
  id: number;
};

const useProvinces = () => {
  const { data: provinces } = useQuery<BaseLocationType[]>({
    queryKey: ['province'],
    queryFn: async () => {
      const response = await axiosInstance.get('/provinces');
      return response.data;
    }
  });

  return { provinces };
};

const useDistricts = (provinceId: number) => {
  const { data: districts } = useQuery<BaseLocationType[]>({
    queryKey: ['districts', provinceId],
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
    queryKey: ['wards', districtId],
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
