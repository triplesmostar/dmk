// React
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

// MUI
import { Box } from "@material-ui/core";

// Atoms
import Button from "Components/atoms/buttons/Button";
import Title from "Components/atoms/UI/Title";

// Molecules
import InputForm from "Components/molecules/InputForm"

// Model
import { DistrictForm } from 'Pages/districts/model/district'

// Organisms
import EditModal from 'Components/organisms/districts/EditModal'

// Action
import { postData } from "Modules/units/Districts";

const AddForm = () => {
  const [inputs, setInputs] = useState(DistrictForm);
  const dispatch = useDispatch();
  const [item, setItem] = useState([]);
  const [itemId, setItemId] = useState('');
  const [open, setOpen] = useState(false);

  const newItem = useSelector(state => state.districts.oneItem);
  const items = useSelector(state => state.districts);

  useEffect(() => {
    if(newItem)
    setItemId(newItem.id)
  }, [newItem])

  const addItem = e => {
    e.preventDefault();

    const body = {};
    const arr = []

    inputs.forEach(input => {
      body[input.name_in_db] = input.value.hasOwnProperty('id') ? { id: input.value['id'] } : input.value;;
      arr.push(body[input.name_in_db])
    })
    setItem(arr)
    console.log(item)
    dispatch(postData(`district`, body));

    let clearVal = inputs.filter(input => {
      input.value = '';
      return input;
    });

    if (!items.data.some(item => body.name === item.name)) {
      setTimeout(() => {
        setOpen(true)
      }, 500);
    }
    setInputs(clearVal)
  };

  const closeModal = () => {
    setOpen(false);
    setItem([]);
  }

  return (
    <>
      <Box mb={3}>
        <Title
          variant="h5"
          align={'left'}
          title={'Dodaj župu'}
        />
      </Box>
      <form>
        <InputForm inputs={inputs} setInputs={setInputs}></InputForm>
        <Box mt={2}>
          <Button
            label="+ Dodaj župu"
            onClick={addItem}
          />
        </Box>
      </form>

      <EditModal
        onOpen={open}
        closeModal={closeModal}
        item={item}
        itemId={itemId}
      ></EditModal>
    </>
  );
};

export default AddForm;
