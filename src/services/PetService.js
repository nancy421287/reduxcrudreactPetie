import http from "../http-common";

const getAll = () => {
  return http.get("/allPets");
};

const get = id => {
  return http.get(`/pet/${id}`);
};

const create = data => {
  return http.post("/pets", data);
};

const update = (id, data) => {
  return http.put(`/pets/${id}`, data);
};

const remove = id => {
  return http.delete(`/pets/${id}`);
};

const removeAll = () => {
  return http.delete(`/pets`);
};

const findByName = name => {
  return http.get(`/pets?name=${name}`);
};

const PetService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
};

export default PetService;