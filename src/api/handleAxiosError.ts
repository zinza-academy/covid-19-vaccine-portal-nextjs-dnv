import axios from 'axios';
import toast from 'react-hot-toast';

export const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.code === 'ERR_NETWORK') {
      toast.error('Lỗi mạng!');
    } else if (error?.response?.status === 409) {
      toast.error('Email này đã được sử dụng.');
    } else {
      toast.error('Đăng ký thất bại!');
    }
  } else {
    toast.error('Có lỗi xảy ra, vui lòng thử lại');
  }
};
