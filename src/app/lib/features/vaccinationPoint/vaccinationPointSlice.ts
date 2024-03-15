import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

type TableDataType = {
  id: number;
  name: string;
  address: string;
  ward: string;
  district: string;
  province: string;
  manager: string;
  tableNumber: number;
};
export type QueryParamsType = {
  city: string;
  district: string;
  ward: string;
};
// Define a type for the slice state
type VaccinationPointState = {
  tableData: TableDataType[];
  queryParams: QueryParamsType;
  rowsPerPage: number;
  page: number;
};

// Define the initial state using that type
const initialState: VaccinationPointState = {
  tableData: [],
  queryParams: {
    city: '',
    district: '',
    ward: ''
  },
  page: 1,
  rowsPerPage: 2
};

export const searchVaccinationPoints = createAsyncThunk(
  // Tên action
  'vaccinationPoint/search',

  // Code async logic, tham số đầu tiên data là dữ liệu truyền vào khi gọi action
  async (queryObj: QueryParamsType, { rejectWithValue }) => {
    const { city, district, ward } = queryObj;

    const response = await fetch(
      `http://localhost:3000/api/vaccinationPoint?city=${city}&district=${district}&ward=${ward}&page=${1}&rowsPerPage=${10}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const jsonData = await response.json();
    // Nếu bị lỗi thì reject
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(jsonData);
    }
    return jsonData;
  }
);

type SearchResponseType = {
  data: TableDataType[];
};

export const vaccinationPointSlice = createSlice({
  name: 'vaccinationPoint',
  initialState,
  reducers: {},
  // Code logic xử lý async action
  extraReducers: (builder) => {
    builder.addCase(searchVaccinationPoints.pending, (state) => {
      // Bật trạng thái loading
      //   state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(
      searchVaccinationPoints.fulfilled,
      (state, action: PayloadAction<SearchResponseType>) => {
        state.tableData = action.payload.data;
      }
    );

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(searchVaccinationPoints.rejected, (state, action) => {
      console.log(action.error);
    });
  }
});

// export const {} = vaccinationPointSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default vaccinationPointSlice.reducer;
