import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PetDataService from "../services/PetService";

const initialState = [];

export const createPet = createAsyncThunk(
  "pets/create",
  async ({ name, owner,species,sex,birth,death }) => {
    const res = await PetDataService.create({ name, owner,species,sex,birth,death });
    return res.data;
  }
);

export const retrievePets = createAsyncThunk(
  "pets/retrieve",
  async () => {
    const res = await PetDataService.getAll();
    return res.data;
  }
);

export const updatePet = createAsyncThunk(
  "pets/update",
  async ({ id, data }) => {
    const res = await PetDataService.update(id, data);
    return res.data;
  }
);

export const deletePet = createAsyncThunk(
  "pets/delete",
  async ({ id }) => {
    await PetDataService.remove(id);
    return { id };
  }
);

export const deleteAllPets = createAsyncThunk(
  "pets/deleteAll",
  async () => {
    const res = await PetDataService.removeAll();
    return res.data;
  }
);

export const findPetsByName = createAsyncThunk(
  "pets/findByName",
  async ({ name }) => {
    const res = await PetDataService.findByName(name);
    return res.data;
  }
);

const petSlice = createSlice({
  name: "Pet",
  initialState,
  extraReducers: {
    [createPet.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrievePets.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updatePet.fulfilled]: (state, action) => {
      const index = state.findIndex(pet => pet.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deletePet.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllPets.fulfilled]: (state, action) => {
      return [];
    },
    [findPetsByName.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

const { reducer } = petSlice;
export default reducer;