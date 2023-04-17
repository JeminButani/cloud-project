// import axios from 'axios'
import Select from 'react-select'
import React, { useState } from 'react'
import { Original } from './data'
import { options } from './selectData'

// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];

function App () {
  const [selectedOption, setSelectedOption] = useState([])
  const [answer, setAnswer] = useState('')

  var handleChange = opt => {
    setSelectedOption(opt)
    // console.log(opt)
    // console.log(selectedOption)
  }

  const convertToArr = slopts => {
    var arr = []
    for (var i = 0; i < 17; i++) {
      if (slopts.length > i) {
        let temp1 = selectedOption[i]
        Original.forEach(element => {
          if (temp1.label === element.label) {
            arr.push(Number(element.value))
          }
        })
      } else {
        arr.push(0)
      }
    }
    return arr
  }

  const handleSubmit = async e => {
    e.preventDefault()

    // console.log(arr);
    await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      mode:"cors",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ arr: convertToArr(selectedOption) })
    })
      .then(response => response.json())
      .then(responseJson => {
        setAnswer(responseJson.answer)
        console.log(responseJson)
      })
      .catch(error => {
        console.error(error)
      })

    // axios.get('http://127.0.0.1:5000/',{headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    // }})
    //   .then(function (response) {
    //     response.json()
    //   })
    //   .then(function(responseJson){
    //     console.log(responseJson)
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    // axios.post('http://127.0.0.1:5000/predict',{data:{arr:convertToArr(selectedOption)}}, {
    //         headers: {
    //             'Content-Type': 'application/json;charset=UTF-8',
    //             "Access-Control-Allow-Origin": "*",
    //         }
    //     })
    //     .then(function(response) {
    //         response.json()
    //     })
    //     .then(function(responseJson) {
    //         console.log(responseJson)
    //     })
    //     .catch(function(error) {
    //         console.log(error);
    //     });
  }

  return (
    <>
      <form
        style={{
          width: '80%',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '5%'
        }}
        onSubmit={handleSubmit}
      >
        <h3>Please enter the symptoms below:</h3>
        <Select
          onChange={handleChange}
          isMulti
          name='diseases'
          options={options}
          className='w-75 basic-multi-select mt-3'
          classNamePrefix='select Diseases'
        />
        <button type='submit' className='btn btn-primary mt-5'>
          Submit
        </button>
        <h1 className='mt-4'>Predicted Disease: {answer}</h1>
      </form>
    </>
  )
}

export default App
