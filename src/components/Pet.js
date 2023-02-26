import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { updatePet, deletePet } from "../slices/Pets";
import PetDataService from "../services/PetService";

const Pet = (props) => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialPetState = {
    id: null,
    name: "",
    owner: "",
    species: "",
    sex:"",
    birth:"",
    death:""

  };
  const [currentPet, setCurrentPet] = useState(initialPetState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getPet= id => {
    PetDataService.get(id)
      .then(response => {
        setCurrentPet(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getPet(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentPet({ ...currentPet, [name]: value });
  };

  const updateSpecies = species => {
    const data = {
      id: currentPet.id,
      name: currentPet.title,
      owner: currentPet.owner,
      species: currentPet.species,
      sex: currentPet.sex,
      birth: currentPet.birth,
      death: currentPet.death



    };

    dispatch(updatePet({ id: currentPet.id, data }))
      .unwrap()
      .then(response => {
        console.log(response);
        setCurrentPet({ ...currentPet, species: species });
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateContent = () => {
    dispatch(updatePet({ id: currentPet.id, data: currentPet }))
      .unwrap()
      .then(response => {
        console.log(response);
        setMessage("The pet was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removePet = () => {
    dispatch(deletePet({ id: currentPet.id }))
      .unwrap()
      .then(() => {
        navigate("/pets");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentPet ? (
        <div className="edit-form">
          <h4>Pet</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentPet.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="owner">Owner</label>
              <input
                type="text"
                className="form-control"
                id="owner"
                name="owner"
                value={currentPet.owner}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="species">Specie</label>
              <input
                  type="text"
                  className="form-control"
                  id="specie"
                  name="specie"
                  value={currentPet.species}
                  onChange={handleInputChange}
              />
            </div>


            <div className="form-group">
              <label htmlFor="sex">Owner</label>
              <input
                  type="text"
                  className="form-control"
                  id="sex"
                  name="sex"
                  value={currentPet.owner}
                  onChange={handleInputChange}
              />
            </div>
          </form>

          {currentPet.species ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateSpecies(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateSpecies(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={removePet}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateContent}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Pet...</p>
        </div>
      )}
    </div>
  );
};

export default Pet;
