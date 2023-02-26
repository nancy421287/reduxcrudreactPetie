import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {createPet} from "../slices/Pets";

const AddPet = () => {
    const initialPetState = {
        id: null,
        name: "",
        owner: "",
        species: "",
        sex: "",
        birth: "",
        death: "",

    };
    const [pet, setPet] = useState(initialPetState);
    const [submitted, setSubmitted] = useState(false);

    const dispatch = useDispatch();

    const handleInputChange = event => {
        const {name, value} = event.target;
        setPet({...pet, [name]: value});
    };

    const savePet = () => {
        const {name, owner, species, sex, birth, death} = pet;

        dispatch(createPet({name, owner, species, sex, birth, death}))
            .unwrap()
            .then(data => {
                console.log(data);
                setPet({
                    id: data.id,
                    name: data.name,
                    owner: data.owner,
                    species: data.species,
                    sex: data.sex,
                    birth: data.birth,
                    death: data.death
                });
                setSubmitted(true);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newPet = () => {
        setPet(initialPetState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newPet}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={pet.name || ''}
                            onChange={handleInputChange}
                            name="name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="owner">Owner</label>
                        <input
                            type="text"
                            className="form-control"
                            id="owner"
                            required
                            value={pet.owner || ''}
                            onChange={handleInputChange}
                            name="owner"
                        />
                    </div>

                    <button onClick={savePet} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddPet;
