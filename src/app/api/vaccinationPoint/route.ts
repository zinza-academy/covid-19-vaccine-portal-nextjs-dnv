import { NextRequest, NextResponse } from 'next/server';

const tableData = [
  {
    id: 1,
    name: 'Bệnh viện Đa khoa Medlatec',
    address: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Cầu Giấy',
    city: 'Hà Nội',
    manager: 'Nguyễn Thị Kim Liên',
    tableNumber: 1
  },
  {
    id: 2,
    name: 'Bệnh viện Đa khoa Medlatec',
    address: '42-44 Nghĩa Dũng',
    ward: 'Mai Dịch',
    district: 'Cầu Giấy',
    city: 'Hà Nội',
    manager: 'Nguyễn Thị Kim Liên',
    tableNumber: 1
  },
  {
    id: 3,
    name: 'Bệnh viện Đa khoa Medlatec',
    address: '42-44 Nghĩa Dũng',
    ward: 'Mai Dịch',
    district: 'Cầu Giấy',
    city: 'Hưng Yên',
    manager: 'Nguyễn Thị Kim Liên',
    tableNumber: 1
  },
  {
    id: 4,
    name: 'Bệnh viện Đa khoa Medlatec',
    address: '42-44 Nghĩa Dũng',
    ward: 'Mai Dịch',
    district: 'Quận Ba Đình',
    city: 'Hà Nội',
    manager: 'Nguyễn Thị Kim Liên',
    tableNumber: 1
  },
  {
    id: 5,
    name: 'Bệnh viện Đa khoa Medlatec',
    address: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    city: 'Hưng Yên',
    manager: 'Nguyễn Thị Kim Liên',
    tableNumber: 1
  },
  {
    id: 6,
    name: 'Bệnh viện Đa khoa Medlatec',
    address: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    city: 'Hà Nội',
    manager: 'Nguyễn Thị Kim Liên',
    tableNumber: 1
  }
];

export function GET(request: NextRequest, response: NextResponse) {
  const searchParams = new URLSearchParams(request.nextUrl.search);
  const city = searchParams.get('city');
  const district = searchParams.get('district');
  const ward = searchParams.get('ward');

  const page = parseInt(searchParams.get('page')!);
  const rowsPerPage = parseInt(searchParams.get('rowsPerPage')!);

  // Áp dụng lọc dữ liệu
  let filteredData = tableData;
  if (city) {
    filteredData = filteredData.filter((item) => {
      return item.city === city;
    });
  }
  if (district) {
    filteredData = filteredData.filter((item) => item.district === district);
  }
  if (ward) {
    filteredData = filteredData.filter((item) => item.ward === ward);
  }

  // Áp dụng phân trang
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return Response.json(
    {
      data: paginatedData
    },
    { status: 200 }
  );
}
