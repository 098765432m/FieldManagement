import React from "react";

import { Field } from "@/types/interfaces/field";
import { getFullAddress } from "../../utils/helpers";

interface props {
  FieldInfo: Field;
  onRemoveField: () => void;
}

{
  /* Display field information in a card */
}
export default function CardFieldInManager(props: props) {
  // send FieldId back to Parent Component through onRemoveField()
  async function RemoveField() {
    try {
      props.onRemoveField();
    } catch (error) {
      console.error(error);
    }
  }

  async function updateField() {}

  return (
    <>
      <div className="mb-10 w-[880px] overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
        <div className="p-6">
          <header className="mb-4">
            <h3 className="text-xl font-medium text-slate-700">
              {props.FieldInfo.fieldName}{" "}
              <div className="float-right">
                <button
                  type="button"
                  className="mb-2 me-2 rounded-lg bg-orange-500  px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800"
                  onClick={RemoveField}
                >
                  Remove
                </button>
              </div>
            </h3>

            <p className="text-sm text-slate-400">By George Johnson, jun3 28</p>
          </header>
          <p>{getFullAddress(props.FieldInfo.fieldAddress)}</p>
        </div>
      </div>
    </>
  );
}
