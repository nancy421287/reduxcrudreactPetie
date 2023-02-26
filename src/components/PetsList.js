import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrievePets,
  findPetsByName,
  deleteAllPets,
} from "../slices/Pets";
import { Link } from "react-router-dom";

const PetsList = () => {
  const [currentPet, setCurrentPet] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  const pets = useSelector(state => state.pets);
  const dispatch = useDispatch();

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const initFetch = useCallback(() => {
    dispatch(retrievePets());
  }, [dispatch])

  useEffect(() => {
    initFetch()
  }, [initFetch])

  const refreshData = () => {
    setCurrentPet(null);
    setCurrentIndex(-1);
  };

  const setActivePet = (pet, index) => {
    setCurrentPet(pet);
    setCurrentIndex(index);
  };

  const removeAllPets = () => {
    dispatch(deleteAllPets())
      .then(response => {
        refreshData();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    refreshData();
    dispatch(findPetsByName({ name: searchName }));
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Pets List</h4>

        <ul className="list-group">
          {pets &&
            pets.map((pet, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActivePet(pet, index)}
                key={index}
              >
                {pet.name}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllPets}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentPet ? (
          <div>
            <h4>Pet</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentPet.name}
            </div>
            <div>
              <label>
                <strong>Owner:</strong>
              </label>{" "}
              {currentPet.owner}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentPet.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/pets/" + currentPet.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Pet...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetsList;
