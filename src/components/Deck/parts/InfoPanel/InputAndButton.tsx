import React from 'react';
import CashService from '../../../../services/CashService';
import AjaxService from '../../../../services/AjaxService';
import Const from '../../../../services/Constants';
import "react-table/react-table.css";

function InputAndButton({ heading }: any) {

  let [clueValue, setInputValue] = React.useState("");

  function onKeyPress(e: any) {
    if (e.key !== 'Enter') {
      return;
    }
    setClue();
    setInputValue("");
  }

  function onChange(e: any) {
    var elem = e.srcElement || e.target;
    setInputValue(elem.value)
  }

  function setClue() {
    let promise = AjaxService.doPost(Const.URL.BASE + CashService.gameId + '/clue', {
      'json': clueValue
    }, {});

    setInputValue("");

    promise.then((data) => {
      console.log(data);

    }).catch((e) => {
      console.error(e);
    })

  }

  let inputProps = {
    placeholder: 'type......',
    value: clueValue,
    onChange: onChange,
    onKeyPress: onKeyPress
  }

  return (
    <div>
      <h6>{heading}</h6>
      <input {...inputProps} type="text" />
      <button type="button" onClick={setClue} className="btn btn-primary"> Go!  </button>
    </div >
  )

}

export default InputAndButton;
