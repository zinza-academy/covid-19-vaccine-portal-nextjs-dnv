import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

type TableDataType = {
  id: number;
  name: string;
  address: string;
  ward: string;
  district: string;
  city: string;
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
  total: number;
};

// Define the initial state using that type
const initialState: VaccinationPointState = {
  tableData: [],
  queryParams: {
    city: '',
    district: '',
    ward: ''
  },
  page: 0,
  rowsPerPage: 10,
  total: 0
};

export const searchVaccinationPoints = createAsyncThunk(
  // Tên action
  'vaccinationPoint/search',

  async (queryObj: QueryParamsType, { rejectWithValue, getState }) => {
    const {
      vaccinationPoint: {
        queryParams: { city, district, ward }
      }
    } = getState() as RootState; // Explicitly cast to RootState
    const {
      vaccinationPoint: { page, rowsPerPage }
    } = getState() as RootState; // Explicitly cast to RootState

    const response = await fetch(
      `http://localhost:3000/api/vaccinationPoint?city=${city}&district=${district}&ward=${ward}&page=${page}&rowsPerPage=${rowsPerPage}`,
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
  total: number;
};

export const vaccinationPointSlice = createSlice({
  name: 'vaccinationPoint',
  initialState,
  reducers: {
    handleChangePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    handleChangeRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
    },
    updateQueryParams: (state, action: PayloadAction<QueryParamsType>) => {
      state.queryParams = action.payload;
    },
    updatePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    }
  },
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
        state.total = action.payload.total;
      }
    );

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(searchVaccinationPoints.rejected, (state, action) => {
      console.log(action.error);
    });
  }
});

export const {
  handleChangePage,
  handleChangeRowsPerPage,
  updateQueryParams,
  updatePage
} = vaccinationPointSlice.actions;

export default vaccinationPointSlice.reducer;
