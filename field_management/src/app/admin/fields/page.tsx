"use client";

import { Field } from "@/types/interfaces/field";
import { getFullAddress, removeFieldById } from "../../../utils/helpers";

import fieldServices from "@/services/field.services";
import { useEffect, useState } from "react";

function Admin_Field() {
  const [fields, setFields] = useState<Field[]>([]);
  async function getAllField() {
    const res = await fieldServices.getAll();
    setFields(res);
  }

  async function removeField(id: string) {
    await removeFieldById(id);
    getAllField();
  }

  useEffect(() => {
    getAllField();
  }, []);

  return (
    <div>
      Lovely
      <ul className="mt-4 grid grid-rows-1 gap-3">
        {fields.map((field: Field, index: number) => {
          return (
            <li key={index} className="border border-4 border-y-amber-700">
              <h1>
                {field.fieldName}{" "}
                <button
                  type="button"
                  onClick={() => {
                    removeField(field._id);
                  }}
                  className="float-right mb-2 me-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Xóa
                </button>
              </h1>{" "}
              <h3>{getFullAddress(field.fieldAddress)}</h3>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Admin_Field;
